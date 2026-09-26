import * as THREE from "three";
import type { BuildingSpec, CameraPreset, PlacedOpening, SceneLayers, WallFace } from "@/preventivi/lib/geometry/plan";
import { hipRidgePlan, postPositions, roofRise } from "@/preventivi/lib/geometry/plan";
import { SITE } from "./palette";
import type { SiteTextures } from "./textures";

export interface SiteBuildOpts {
  cutaway?: boolean;
  highlightFace?: WallFace | null;
  showDims?: boolean;
}

function clampHole(o: PlacedOpening, wallLen: number, height: number): PlacedOpening | null {
  const width = Math.min(o.width, wallLen - 0.16);
  const sill = Math.max(0, Math.min(o.sill, height - 0.4));
  const h = Math.min(o.height, height - sill - 0.1);
  if (width < 0.3 || h < 0.3) return null;
  const offset = Math.max(0.06, Math.min(o.offset, wallLen - width - 0.06));
  return { ...o, width, height: h, sill, offset };
}

function makeWallGeometry(
  len: number,
  height: number,
  thickness: number,
  holes: PlacedOpening[],
  gableRise: number,
  leftH = height,
  rightH = height,
): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(len, 0);
  shape.lineTo(len, rightH);
  if (gableRise > 0.04) {
    shape.lineTo(len / 2, height + gableRise);
  }
  shape.lineTo(0, leftH);
  shape.closePath();

  for (const h of holes) {
    const hole = new THREE.Path();
    const x0 = h.offset;
    const y0 = h.sill;
    const x1 = h.offset + h.width;
    const y1 = h.sill + h.height;
    hole.moveTo(x0, y0);
    hole.lineTo(x1, y0);
    hole.lineTo(x1, y1);
    hole.lineTo(x0, y1);
    hole.closePath();
    shape.holes.push(hole);
  }

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: false,
    curveSegments: 1,
    steps: 1,
  });
  geo.translate(0, 0, -thickness);
  return geo;
}

function mapped(tex: THREE.Texture, rx: number, ry: number): THREE.Texture {
  const t = tex.clone();
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  t.repeat.set(Math.max(0.01, rx), Math.max(0.01, ry));
  t.needsUpdate = true;
  return t;
}

function fmtM(n: number): string {
  return `${n.toFixed(2).replace(".", ",")} m`;
}

/** Outer-left origin, +X along wall, +Z outward. */
function wallBasis(face: WallFace, L: number, D: number) {
  if (face === 0) {
    return { origin: new THREE.Vector3(-L / 2, 0, D / 2), x: new THREE.Vector3(1, 0, 0), z: new THREE.Vector3(0, 0, 1), len: L };
  }
  if (face === 1) {
    return { origin: new THREE.Vector3(L / 2, 0, D / 2), x: new THREE.Vector3(0, 0, -1), z: new THREE.Vector3(1, 0, 0), len: D };
  }
  if (face === 2) {
    return { origin: new THREE.Vector3(L / 2, 0, -D / 2), x: new THREE.Vector3(-1, 0, 0), z: new THREE.Vector3(0, 0, -1), len: L };
  }
  return { origin: new THREE.Vector3(-L / 2, 0, -D / 2), x: new THREE.Vector3(0, 0, 1), z: new THREE.Vector3(-1, 0, 0), len: D };
}

function placeOnWall(obj: THREE.Object3D, face: WallFace, L: number, D: number) {
  const b = wallBasis(face, L, D);
  obj.matrix.makeBasis(b.x, new THREE.Vector3(0, 1, 0), b.z);
  obj.matrix.setPosition(b.origin.x, 0, b.origin.z);
  obj.matrixAutoUpdate = false;
}

export function buildSite(
  spec: BuildingSpec,
  layers: SceneLayers,
  textures: SiteTextures,
  opts: SiteBuildOpts = {},
): THREE.Group {
  const group = new THREE.Group();
  const geos: THREE.BufferGeometry[] = [];
  const mats: THREE.Material[] = [];
  const extraTex: THREE.Texture[] = [];

  const trackG = <T extends THREE.BufferGeometry>(g: T) => {
    geos.push(g);
    return g;
  };
  const trackM = <T extends THREE.Material>(m: T) => {
    mats.push(m);
    return m;
  };
  const trackT = (t: THREE.Texture) => {
    extraTex.push(t);
    return t;
  };

  const L = spec.length;
  const D = spec.kind === "wall" ? Math.max(spec.thickness, 0.2) : spec.depth;
  const H = spec.height;
  const T = spec.thickness;
  const pitch = spec.kind === "wall" ? 0 : spec.pitch;
  const rise = roofRise({ ...spec, depth: D, pitch });
  const shed = spec.roofKind === "shed" && rise > 0.04;
  const cutaway = Boolean(opts.cutaway) && spec.kind !== "wall";
  const highlight = opts.highlightFace ?? null;

  const plasterMap = trackT(mapped(textures.plaster, L / 2, H / 2));
  const wallMat = trackM(
    new THREE.MeshStandardMaterial({
      color: layers.masonry ? 0xffffff : SITE.plaster,
      roughness: 0.92,
      metalness: 0,
    }),
  );
  if (!layers.masonry) {
    wallMat.map = plasterMap;
    wallMat.needsUpdate = true;
  }

  const brickFor = (len: number, height: number) => {
    const map = trackT(mapped(textures.brick, len / 1.0, height / 0.32));
    return trackM(
      new THREE.MeshStandardMaterial({
        map,
        roughness: 0.88,
        metalness: 0,
      }),
    );
  };

  const hiMat = trackM(
    new THREE.MeshStandardMaterial({
      color: SITE.highlight,
      roughness: 0.7,
      metalness: 0.05,
      emissive: SITE.highlight,
      emissiveIntensity: 0.18,
    }),
  );

  const faces: WallFace[] = spec.kind === "wall" ? [0] : [0, 1, 2, 3];
  const byWall = new Map<WallFace, PlacedOpening[]>();
  for (const o of spec.openings) {
    const list = byWall.get(o.wall) ?? [];
    list.push(o);
    byWall.set(o.wall, list);
  }

  const glassMat = trackM(
    new THREE.MeshStandardMaterial({
      color: SITE.glass,
      transparent: true,
      opacity: 0.38,
      roughness: 0.06,
      metalness: 0.12,
    }),
  );
  const frameMat = trackM(
    new THREE.MeshStandardMaterial({ color: SITE.frame, roughness: 0.65, metalness: 0.08 }),
  );
  const doorMat = trackM(
    new THREE.MeshStandardMaterial({
      map: trackT(mapped(textures.wood, 1, 2)),
      color: SITE.wood,
      roughness: 0.78,
    }),
  );
  const sillMat = trackM(
    new THREE.MeshStandardMaterial({
      map: trackT(mapped(textures.concrete, 2, 0.4)),
      color: SITE.sill,
      roughness: 0.9,
    }),
  );
  const lintelMat = trackM(
    new THREE.MeshStandardMaterial({ color: SITE.lintel, roughness: 0.85 }),
  );

  addFoundation(group, spec, L, D, T, textures, trackG, trackM, trackT);

  if (spec.kind === "porch") {
    addPorchFrame(group, spec, L, D, H, rise, textures, trackG, trackM, trackT);
  } else {
    for (const face of faces) {
      if (cutaway && face === 0) continue;
      const b = spec.kind === "wall" ? wallBasis(0, L, D) : wallBasis(face, L, D);
      const holes = (byWall.get(face) ?? [])
        .map((o) => clampHole(o, b.len, H))
        .filter((x): x is PlacedOpening => x != null);

      let gable = 0;
      let leftH = H;
      let rightH = H;
      let wallH = H;
      if (spec.kind !== "wall" && rise > 0.04) {
        if (shed) {
          if (face === 0) {
            wallH = H;
          } else if (face === 2) {
            leftH = rightH = wallH = H + rise;
          } else if (face === 1) {
            leftH = H;
            rightH = wallH = H + rise;
          } else {
            leftH = H + rise;
            rightH = H;
            wallH = H + rise;
          }
        } else if (spec.roofKind !== "hip" && (face === 1 || face === 3)) {
          gable = rise;
          wallH = H + rise;
        }
      }
      const geo = trackG(makeWallGeometry(b.len, H, T, holes, gable, leftH, rightH));
      const mat = highlight === face ? hiMat : layers.masonry ? brickFor(b.len, wallH) : wallMat;
      const mesh = new THREE.Mesh(geo, mat);
      placeOnWall(mesh, spec.kind === "wall" ? 0 : face, L, D);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);

      for (const h of holes) {
        addOpeningJoinery(mesh, h, T, { glassMat, frameMat, doorMat, sillMat, lintelMat }, trackG);
      }
    }
  }

  if (spec.kind !== "wall") {
    const innerL = spec.kind === "porch" ? L : Math.max(0.2, L - T * 2);
    const innerD = spec.kind === "porch" ? D : Math.max(0.2, D - T * 2);
    const floorMap = trackT(mapped(textures.concrete, innerL / 2, innerD / 2));
    const floor = new THREE.Mesh(
      trackG(new THREE.BoxGeometry(innerL, 0.05, innerD)),
      trackM(new THREE.MeshStandardMaterial({ map: floorMap, color: SITE.plasterDark, roughness: 0.95 })),
    );
    floor.position.set(0, 0.025, 0);
    floor.receiveShadow = true;
    group.add(floor);
  }

  addRoof(group, spec, L, D, H, T, rise, layers, textures, trackG, trackM, trackT);

  if (layers.roofing && layers.gutterStyle !== "none" && spec.kind !== "wall") {
    addGutters(group, spec, L, D, H, rise, layers.gutterStyle, trackG, trackM);
  }

  if (spec.kind === "porch" || (layers.timber && spec.kind !== "wall")) {
    addTimber(group, spec, L, D, H, T, rise, textures, trackG, trackM, trackT);
  }

  if (layers.scaffold) {
    addScaffold(group, spec, L, D, H, rise, trackG, trackM);
  }

  if (layers.masonry && spec.kind !== "wall") {
    addBrickPallet(group, spec, L, D, textures, trackG, trackM, trackT);
  }

  addPerson(group, spec, L, D, trackG, trackM);

  if (opts.showDims !== false) {
    addDimensions(group, spec, L, D, H, rise, trackG, trackM, trackT);
  }

  group.userData.dispose = () => {
    geos.forEach((g) => g.dispose());
    mats.forEach((m) => m.dispose());
    extraTex.forEach((t) => t.dispose());
  };

  return group;
}

function addOpeningJoinery(
  mesh: THREE.Mesh,
  h: PlacedOpening,
  T: number,
  mats: {
    glassMat: THREE.Material;
    frameMat: THREE.Material;
    doorMat: THREE.Material;
    sillMat: THREE.Material;
    lintelMat: THREE.Material;
  },
  trackG: <T extends THREE.BufferGeometry>(g: T) => T,
) {
  const cx = h.offset + h.width / 2;
  const cy = h.sill + h.height / 2;
  const fw = 0.05;

  const lintel = new THREE.Mesh(
    trackG(new THREE.BoxGeometry(h.width + 0.16, 0.1, T + 0.06)),
    mats.lintelMat,
  );
  lintel.position.set(cx, h.sill + h.height + 0.05, -T / 2);
  mesh.add(lintel);

  if (h.kind === "window") {
    const glass = new THREE.Mesh(
      trackG(new THREE.PlaneGeometry(h.width * 0.78, h.height * 0.78)),
      mats.glassMat,
    );
    glass.position.set(cx, cy, -T / 2);
    mesh.add(glass);

    const mullionV = new THREE.Mesh(
      trackG(new THREE.BoxGeometry(fw * 0.7, h.height * 0.82, 0.04)),
      mats.frameMat,
    );
    mullionV.position.set(cx, cy, -T / 2);
    mesh.add(mullionV);
    const mullionH = new THREE.Mesh(
      trackG(new THREE.BoxGeometry(h.width * 0.82, fw * 0.7, 0.04)),
      mats.frameMat,
    );
    mullionH.position.set(cx, cy, -T / 2);
    mesh.add(mullionH);

    const sill = new THREE.Mesh(
      trackG(new THREE.BoxGeometry(h.width + 0.12, 0.05, T + 0.14)),
      mats.sillMat,
    );
    sill.position.set(cx, h.sill - 0.02, -T / 2 + 0.02);
    mesh.add(sill);
  } else {
    const leaf = new THREE.Mesh(
      trackG(new THREE.BoxGeometry(h.width * 0.92, h.height * 0.94, 0.045)),
      mats.doorMat,
    );
    const hingeX = h.offset + 0.04;
    leaf.position.set(h.width * 0.46, 0, 0);
    const pivot = new THREE.Group();
    pivot.position.set(hingeX, cy, 0.03);
    pivot.rotation.y = 0.28;
    pivot.add(leaf);
    mesh.add(pivot);

    const handle = new THREE.Mesh(
      trackG(new THREE.CylinderGeometry(0.015, 0.015, 0.1, 8)),
      mats.frameMat,
    );
    handle.rotation.z = Math.PI / 2;
    handle.position.set(h.width * 0.78, 0, 0.03);
    leaf.add(handle);

    const thresh = new THREE.Mesh(
      trackG(new THREE.BoxGeometry(h.width + 0.04, 0.04, T + 0.08)),
      mats.sillMat,
    );
    thresh.position.set(cx, 0.02, -T / 2);
    mesh.add(thresh);
  }

  const bars: Array<[number, number, number, number, number, number]> = [
    [cx, h.sill + fw / 2, -T / 2, h.width + fw, fw, T + 0.04],
    [cx, h.sill + h.height - fw / 2, -T / 2, h.width + fw, fw, T + 0.04],
    [h.offset + fw / 2, cy, -T / 2, fw, h.height, T + 0.04],
    [h.offset + h.width - fw / 2, cy, -T / 2, fw, h.height, T + 0.04],
  ];
  for (const [x, y, z, sx, sy, sz] of bars) {
    const bar = new THREE.Mesh(trackG(new THREE.BoxGeometry(sx, sy, sz)), mats.frameMat);
    bar.position.set(x, y, z);
    mesh.add(bar);
  }
}

function addFoundation(
  group: THREE.Group,
  spec: BuildingSpec,
  L: number,
  D: number,
  T: number,
  textures: SiteTextures,
  trackG: <G extends THREE.BufferGeometry>(g: G) => G,
  trackM: <M extends THREE.Material>(m: M) => M,
  trackT: (t: THREE.Texture) => THREE.Texture,
) {
  const mat = trackM(
    new THREE.MeshStandardMaterial({
      map: trackT(mapped(textures.concrete, L / 2, 1)),
      color: SITE.concrete,
      roughness: 0.95,
    }),
  );
  const h = 0.28;
  const pad = 0.08;
  if (spec.kind === "wall") {
    const beam = new THREE.Mesh(trackG(new THREE.BoxGeometry(L + pad * 2, h, T + pad * 2)), mat);
    beam.position.set(0, -h / 2, 0);
    beam.castShadow = true;
    beam.receiveShadow = true;
    group.add(beam);
    return;
  }
  if (spec.kind === "porch") {
    const slab = new THREE.Mesh(trackG(new THREE.BoxGeometry(L + 0.35, 0.14, D + 0.35)), mat);
    slab.position.set(0, -0.07, 0);
    slab.castShadow = true;
    slab.receiveShadow = true;
    group.add(slab);
    return;
  }
  const strips: Array<[number, number, number, number]> = [
    [L + pad * 2, T + pad * 2, 0, D / 2],
    [L + pad * 2, T + pad * 2, 0, -D / 2],
    [T + pad * 2, D + pad * 2, L / 2, 0],
    [T + pad * 2, D + pad * 2, -L / 2, 0],
  ];
  for (const [sx, sz, x, z] of strips) {
    const beam = new THREE.Mesh(trackG(new THREE.BoxGeometry(sx, h, sz)), mat);
    beam.position.set(x, -h / 2, z);
    beam.castShadow = true;
    beam.receiveShadow = true;
    group.add(beam);
  }
}

function addRoof(
  group: THREE.Group,
  spec: BuildingSpec,
  L: number,
  D: number,
  H: number,
  T: number,
  rise: number,
  layers: SceneLayers,
  textures: SiteTextures,
  trackG: <G extends THREE.BufferGeometry>(g: G) => G,
  trackM: <M extends THREE.Material>(m: M) => M,
  trackT: (t: THREE.Texture) => THREE.Texture,
) {
  if (spec.kind === "wall") {
    const cap = new THREE.Mesh(
      trackG(new THREE.BoxGeometry(L + 0.08, 0.06, T + 0.08)),
      trackM(new THREE.MeshStandardMaterial({ color: SITE.concreteDark, roughness: 0.9 })),
    );
    cap.position.set(0, H + 0.03, 0);
    cap.castShadow = true;
    group.add(cap);
    return;
  }

  const ov = 0.22;
  const tileSrc = layers.roofStyle === "coppo" ? textures.coppo : textures.tile;
  const roofMat = trackM(
    new THREE.MeshStandardMaterial({
      color: layers.roofing ? 0xffffff : SITE.roofFlat,
      roughness: 0.78,
      metalness: 0.02,
      side: THREE.DoubleSide,
    }),
  );

  if (rise < 0.04) {
    if (layers.roofing) {
      roofMat.map = trackT(mapped(tileSrc, (L + ov * 2) / 0.28, (D + ov * 2) / 0.36));
      roofMat.needsUpdate = true;
    }
    const flat = new THREE.Mesh(
      trackG(new THREE.BoxGeometry(L + ov * 2, 0.08, D + ov * 2)),
      layers.roofing
        ? roofMat
        : trackM(new THREE.MeshStandardMaterial({ color: SITE.roofFlat, roughness: 0.85 })),
    );
    flat.position.set(0, H + 0.04, 0);
    flat.castShadow = true;
    flat.receiveShadow = true;
    group.add(flat);
    return;
  }

  if (spec.roofKind === "shed") {
    const a = Math.atan2(rise, D);
    const tan = Math.tan(a);
    const yEaves = H - ov * tan;
    const yRidge = H + rise + ov * tan;
    const hyp = (D + ov * 2) / Math.cos(a);
    const yMid = (yEaves + yRidge) / 2;
    if (layers.roofing) {
      roofMat.map = trackT(mapped(tileSrc, (L + ov * 2) / 0.28, hyp / 0.36));
      roofMat.needsUpdate = true;
    }
    const slab = new THREE.Mesh(trackG(new THREE.BoxGeometry(L + ov * 2, 0.055, hyp)), roofMat);
    slab.rotation.x = a;
    slab.position.set(0, yMid, 0);
    slab.castShadow = true;
    slab.receiveShadow = true;
    group.add(slab);

    const fasciaMat = trackM(new THREE.MeshStandardMaterial({ color: SITE.woodDark, roughness: 0.7 }));
    const fasciaS = new THREE.Mesh(trackG(new THREE.BoxGeometry(L + ov * 2, 0.1, 0.04)), fasciaMat);
    fasciaS.position.set(0, yEaves - 0.02, D / 2 + ov);
    const fasciaN = new THREE.Mesh(trackG(new THREE.BoxGeometry(L + ov * 2, 0.1, 0.04)), fasciaMat);
    fasciaN.position.set(0, yRidge - 0.02, -(D / 2 + ov));
    group.add(fasciaS, fasciaN);

    const hypWall = Math.hypot(D, rise);
    const barge = trackG(new THREE.BoxGeometry(0.045, 0.09, hypWall + 0.04));
    for (const x of spec.kind === "porch" ? [-(L / 2), L / 2] : [-(L / 2) + T / 2, L / 2 - T / 2]) {
      const b = new THREE.Mesh(barge, fasciaMat);
      b.rotation.x = a;
      b.position.set(x, H + rise / 2, 0);
      group.add(b);
    }
    return;
  }

  if (spec.roofKind === "hip") {
    addHipRoof(group, L, D, H, rise, layers, roofMat, tileSrc, trackG, trackM, trackT);
    return;
  }

  // Same angle as the brick gables: tan a = rise / (D/2). Overhang continues that plane.
  const a = Math.atan2(rise, D / 2);
  const tan = Math.tan(a);
  const yEaves = H - ov * tan;
  const yRidge = H + rise;
  const hyp = (D / 2 + ov) / Math.cos(a);
  const yMid = (yEaves + yRidge) / 2;
  const zMid = (D / 2 + ov) / 2;

  if (layers.roofing) {
    roofMat.map = trackT(mapped(tileSrc, (L + ov * 2) / 0.28, hyp / 0.36));
    roofMat.needsUpdate = true;
  }

  const south = new THREE.Mesh(trackG(new THREE.BoxGeometry(L + ov * 2, 0.055, hyp)), roofMat);
  south.rotation.x = a;
  south.position.set(0, yMid, zMid);
  south.castShadow = true;
  south.receiveShadow = true;
  const north = new THREE.Mesh(trackG(new THREE.BoxGeometry(L + ov * 2, 0.055, hyp)), roofMat);
  north.rotation.x = -a;
  north.position.set(0, yMid, -zMid);
  north.castShadow = true;
  north.receiveShadow = true;
  group.add(south, north);

  const fasciaMat = trackM(new THREE.MeshStandardMaterial({ color: SITE.woodDark, roughness: 0.7 }));
  const fasciaS = new THREE.Mesh(trackG(new THREE.BoxGeometry(L + ov * 2, 0.1, 0.04)), fasciaMat);
  fasciaS.position.set(0, yEaves - 0.02, D / 2 + ov);
  const fasciaN = new THREE.Mesh(trackG(new THREE.BoxGeometry(L + ov * 2, 0.1, 0.04)), fasciaMat);
  fasciaN.position.set(0, yEaves - 0.02, -(D / 2 + ov));
  group.add(fasciaS, fasciaN);

  // Barge boards sit on the brick gable, not floating outside the volume.
  const hypWall = Math.hypot(D / 2, rise);
  const barge = trackG(new THREE.BoxGeometry(0.045, 0.09, hypWall + 0.04));
  for (const x of [-(L / 2) + T / 2, L / 2 - T / 2]) {
    const b1 = new THREE.Mesh(barge, fasciaMat);
    b1.rotation.x = a;
    b1.position.set(x, H + rise / 2, D / 4);
    const b2 = new THREE.Mesh(barge, fasciaMat);
    b2.rotation.x = -a;
    b2.position.set(x, H + rise / 2, -D / 4);
    group.add(b1, b2);
  }

  const ridge = new THREE.Mesh(
    trackG(new THREE.BoxGeometry(L + ov * 2, 0.08, 0.12)),
    trackM(new THREE.MeshStandardMaterial({ color: SITE.tileEdge, roughness: 0.7 })),
  );
  ridge.position.set(0, yRidge + 0.03, 0);
  ridge.castShadow = true;
  group.add(ridge);
}

function gutterColor(style: SceneLayers["gutterStyle"]): number {
  if (style === "cu") return SITE.gutterCu;
  if (style === "al") return SITE.gutterAl;
  if (style === "zn") return SITE.gutterZn;
  return SITE.gutterPvc;
}

function addGutters(
  group: THREE.Group,
  spec: BuildingSpec,
  L: number,
  D: number,
  H: number,
  rise: number,
  style: SceneLayers["gutterStyle"],
  trackG: <G extends THREE.BufferGeometry>(g: G) => G,
  trackM: <M extends THREE.Material>(m: M) => M,
) {
  const ov = 0.28;
  const shed = spec.roofKind === "shed" && rise > 0.04;
  const hip = spec.roofKind === "hip";
  let yEaves = H - 0.04;
  if (rise > 0.04) {
    if (shed) yEaves = H - ov * Math.tan(Math.atan2(rise, D));
    else if (!hip) yEaves = H - ov * Math.tan(Math.atan2(rise, D / 2));
  }
  const mat = trackM(
    new THREE.MeshStandardMaterial({
      color: gutterColor(style),
      roughness: style === "pvc" ? 0.55 : 0.35,
      metalness: style === "pvc" ? 0.05 : style === "cu" ? 0.7 : 0.45,
    }),
  );
  const troughH = 0.07;
  const troughW = 0.11;
  const zS = D / 2 + ov;
  const zN = -(D / 2 + ov);
  const xE = L / 2 + ov;
  const xW = -(L / 2 + ov);
  const y = yEaves - troughH / 2 - 0.02;

  const addTroughX = (z: number) => {
    const mesh = new THREE.Mesh(trackG(new THREE.BoxGeometry(L + ov * 2, troughH, troughW)), mat);
    mesh.position.set(0, y, z);
    mesh.castShadow = true;
    group.add(mesh);
  };
  const addTroughZ = (x: number) => {
    const mesh = new THREE.Mesh(trackG(new THREE.BoxGeometry(troughW, troughH, D + ov * 2)), mat);
    mesh.position.set(x, y, 0);
    mesh.castShadow = true;
    group.add(mesh);
  };
  const addDown = (x: number, z: number) => {
    const h = Math.max(1.4, y - 0.12);
    const mesh = new THREE.Mesh(trackG(new THREE.CylinderGeometry(0.035, 0.035, h, 8)), mat);
    mesh.position.set(x, h / 2, z);
    mesh.castShadow = true;
    group.add(mesh);
  };

  if (hip) {
    addTroughX(zS);
    addTroughX(zN);
    addTroughZ(xE);
    addTroughZ(xW);
    addDown(xE, zS);
    addDown(xW, zS);
    addDown(xE, zN);
    addDown(xW, zN);
    return;
  }
  if (shed) {
    addTroughX(zS);
    addDown(-L / 2, zS);
    addDown(L / 2, zS);
    return;
  }
  addTroughX(zS);
  addTroughX(zN);
  addDown(-L / 2, zS);
  addDown(L / 2, zS);
  addDown(-L / 2, zN);
  addDown(L / 2, zN);
}

function makeHipPlane(pts: THREE.Vector3[]): THREE.BufferGeometry | null {
  const unique: THREE.Vector3[] = [];
  for (const p of pts) {
    if (unique.some((q) => q.distanceToSquared(p) < 1e-8)) continue;
    unique.push(p.clone());
  }
  if (unique.length < 3) return null;
  const origin = unique[0];
  const e1 = new THREE.Vector3().subVectors(unique[1], origin);
  const e2 = new THREE.Vector3().subVectors(unique[Math.min(2, unique.length - 1)], origin);
  const nrm = new THREE.Vector3().crossVectors(e1, e2);
  if (nrm.lengthSq() < 1e-10) return null;
  nrm.normalize();
  const uDir = e1.clone().normalize();
  const vDir = new THREE.Vector3().crossVectors(nrm, uDir).normalize();
  const positions: number[] = [];
  const uvs: number[] = [];
  const normals: number[] = [];
  for (const p of unique) {
    positions.push(p.x, p.y, p.z);
    const rel = new THREE.Vector3().subVectors(p, origin);
    uvs.push(rel.dot(uDir) / 0.28, rel.dot(vDir) / 0.36);
    normals.push(nrm.x, nrm.y, nrm.z);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geo.setIndex(unique.length === 3 ? [0, 1, 2] : [0, 1, 2, 0, 2, 3]);
  return geo;
}

function addHipRoof(
  group: THREE.Group,
  L: number,
  D: number,
  H: number,
  rise: number,
  layers: SceneLayers,
  roofMat: THREE.MeshStandardMaterial,
  tileSrc: THREE.Texture,
  trackG: <G extends THREE.BufferGeometry>(g: G) => G,
  trackM: <M extends THREE.Material>(m: M) => M,
  trackT: (t: THREE.Texture) => THREE.Texture,
) {
  const ov = 0.22;
  const short = Math.min(L, D);
  const tan = rise / Math.max(0.08, short / 2);
  const yEaves = H - ov * tan;
  const yRidge = H + rise;
  const sw = new THREE.Vector3(-L / 2 - ov, yEaves, D / 2 + ov);
  const se = new THREE.Vector3(L / 2 + ov, yEaves, D / 2 + ov);
  const ne = new THREE.Vector3(L / 2 + ov, yEaves, -D / 2 - ov);
  const nw = new THREE.Vector3(-L / 2 - ov, yEaves, -D / 2 - ov);
  const ridge = hipRidgePlan(L, D);
  const rA = new THREE.Vector3(ridge.ax, yRidge, ridge.az);
  const rB = new THREE.Vector3(ridge.bx, yRidge, ridge.bz);

  if (layers.roofing) {
    const hyp = Math.hypot(short / 2 + ov, rise);
    roofMat.map = trackT(mapped(tileSrc, (Math.max(L, D) + ov * 2) / 0.28, hyp / 0.36));
    roofMat.needsUpdate = true;
  }

  const faces: THREE.Vector3[][] = ridge.alongX
    ? [
        [sw, se, rB, rA],
        [ne, nw, rA, rB],
        [se, ne, rB],
        [nw, sw, rA],
      ]
    : [
        [se, ne, rB, rA],
        [nw, sw, rA, rB],
        [sw, se, rA],
        [ne, nw, rB],
      ];

  for (const pts of faces) {
    const geo = makeHipPlane(pts);
    if (!geo) continue;
    const mesh = new THREE.Mesh(trackG(geo), roofMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  const fasciaMat = trackM(new THREE.MeshStandardMaterial({ color: SITE.woodDark, roughness: 0.7 }));
  const fasciaS = new THREE.Mesh(trackG(new THREE.BoxGeometry(L + ov * 2, 0.1, 0.04)), fasciaMat);
  fasciaS.position.set(0, yEaves - 0.02, D / 2 + ov);
  const fasciaN = new THREE.Mesh(trackG(new THREE.BoxGeometry(L + ov * 2, 0.1, 0.04)), fasciaMat);
  fasciaN.position.set(0, yEaves - 0.02, -(D / 2 + ov));
  const fasciaE = new THREE.Mesh(trackG(new THREE.BoxGeometry(0.04, 0.1, D + ov * 2)), fasciaMat);
  fasciaE.position.set(L / 2 + ov, yEaves - 0.02, 0);
  const fasciaW = new THREE.Mesh(trackG(new THREE.BoxGeometry(0.04, 0.1, D + ov * 2)), fasciaMat);
  fasciaW.position.set(-(L / 2 + ov), yEaves - 0.02, 0);
  group.add(fasciaS, fasciaN, fasciaE, fasciaW);

  const hips: Array<[THREE.Vector3, THREE.Vector3]> = ridge.alongX
    ? [
        [sw, rA],
        [se, rB],
        [ne, rB],
        [nw, rA],
      ]
    : [
        [sw, rA],
        [se, rA],
        [ne, rB],
        [nw, rB],
      ];
  for (const [a, b] of hips) {
    addBeam(group, a, b, 0.05, 0.08, fasciaMat, trackG);
  }

  const ridgeLen = rA.distanceTo(rB);
  if (ridgeLen > 0.08) {
    const cap = new THREE.Mesh(
      trackG(new THREE.BoxGeometry(ridge.alongX ? ridgeLen + 0.16 : 0.12, 0.08, ridge.alongX ? 0.12 : ridgeLen + 0.16)),
      trackM(new THREE.MeshStandardMaterial({ color: SITE.tileEdge, roughness: 0.7 })),
    );
    cap.position.set((rA.x + rB.x) / 2, yRidge + 0.03, (rA.z + rB.z) / 2);
    cap.castShadow = true;
    group.add(cap);
  } else {
    const peak = new THREE.Mesh(
      trackG(new THREE.BoxGeometry(0.16, 0.1, 0.16)),
      trackM(new THREE.MeshStandardMaterial({ color: SITE.tileEdge, roughness: 0.7 })),
    );
    peak.position.set(0, yRidge + 0.04, 0);
    peak.castShadow = true;
    group.add(peak);
  }
}

function addBeam(
  group: THREE.Group,
  a: THREE.Vector3,
  b: THREE.Vector3,
  w: number,
  h: number,
  mat: THREE.Material,
  trackG: <G extends THREE.BufferGeometry>(g: G) => G,
) {
  const len = a.distanceTo(b);
  if (len < 0.05) return;
  const mesh = new THREE.Mesh(trackG(new THREE.BoxGeometry(w, h, len)), mat);
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.lookAt(b);
  mesh.castShadow = true;
  group.add(mesh);
}

function addHipTimber(
  group: THREE.Group,
  spec: BuildingSpec,
  L: number,
  D: number,
  H: number,
  T: number,
  rise: number,
  woodMat: THREE.Material,
  trackG: <G extends THREE.BufferGeometry>(g: G) => G,
) {
  const inset = spec.kind === "porch" ? 0.12 : T / 2;
  const yEaves = H - 0.06;
  const yRidge = H + rise - 0.08;
  const ridge = hipRidgePlan(L, D);
  const rA = new THREE.Vector3(ridge.ax, yRidge, ridge.az);
  const rB = new THREE.Vector3(ridge.bx, yRidge, ridge.bz);
  addBeam(group, rA, rB, 0.12, 0.16, woodMat, trackG);

  const sw = new THREE.Vector3(-L / 2 + inset, yEaves, D / 2 - inset);
  const se = new THREE.Vector3(L / 2 - inset, yEaves, D / 2 - inset);
  const ne = new THREE.Vector3(L / 2 - inset, yEaves, -D / 2 + inset);
  const nw = new THREE.Vector3(-L / 2 + inset, yEaves, -D / 2 + inset);
  const hips: Array<[THREE.Vector3, THREE.Vector3]> = ridge.alongX
    ? [
        [sw, rA],
        [se, rB],
        [ne, rB],
        [nw, rA],
      ]
    : [
        [sw, rA],
        [se, rA],
        [ne, rB],
        [nw, rB],
      ];
  for (const [a, b] of hips) addBeam(group, a, b, 0.07, 0.14, woodMat, trackG);

  if (ridge.alongX) {
    const span = Math.max(0.05, rB.x - rA.x);
    const n = rA.distanceTo(rB) < 0.15 ? 0 : Math.max(1, Math.round(span / 0.8));
    for (let i = 0; i <= n; i++) {
      const x = n === 0 ? 0 : rA.x + (i / n) * span;
      addBeam(group, new THREE.Vector3(x, yEaves, D / 2 - inset), new THREE.Vector3(x, yRidge, 0), 0.07, 0.14, woodMat, trackG);
      addBeam(group, new THREE.Vector3(x, yEaves, -(D / 2 - inset)), new THREE.Vector3(x, yRidge, 0), 0.07, 0.14, woodMat, trackG);
    }
    const nEnd = Math.max(1, Math.round(D / 1.6));
    for (let i = 1; i < nEnd; i++) {
      const t = i / nEnd;
      const zS = D / 2 - inset - t * (D / 2 - inset);
      addBeam(group, new THREE.Vector3(L / 2 - inset, yEaves, zS), rB, 0.06, 0.12, woodMat, trackG);
      addBeam(group, new THREE.Vector3(-(L / 2 - inset), yEaves, zS), rA, 0.06, 0.12, woodMat, trackG);
      addBeam(group, new THREE.Vector3(L / 2 - inset, yEaves, -zS), rB, 0.06, 0.12, woodMat, trackG);
      addBeam(group, new THREE.Vector3(-(L / 2 - inset), yEaves, -zS), rA, 0.06, 0.12, woodMat, trackG);
    }
  } else {
    const span = Math.max(0.05, rA.z - rB.z);
    const n = rA.distanceTo(rB) < 0.15 ? 0 : Math.max(1, Math.round(span / 0.8));
    for (let i = 0; i <= n; i++) {
      const z = n === 0 ? 0 : rA.z - (i / n) * span;
      addBeam(group, new THREE.Vector3(L / 2 - inset, yEaves, z), new THREE.Vector3(0, yRidge, z), 0.07, 0.14, woodMat, trackG);
      addBeam(group, new THREE.Vector3(-(L / 2 - inset), yEaves, z), new THREE.Vector3(0, yRidge, z), 0.07, 0.14, woodMat, trackG);
    }
  }

  addBeam(group, sw, se, 0.1, 0.1, woodMat, trackG);
  addBeam(group, se, ne, 0.1, 0.1, woodMat, trackG);
  addBeam(group, ne, nw, 0.1, 0.1, woodMat, trackG);
  addBeam(group, nw, sw, 0.1, 0.1, woodMat, trackG);
}

function addTimber(
  group: THREE.Group,
  spec: BuildingSpec,
  L: number,
  D: number,
  H: number,
  T: number,
  rise: number,
  textures: SiteTextures,
  trackG: <G extends THREE.BufferGeometry>(g: G) => G,
  trackM: <M extends THREE.Material>(m: M) => M,
  trackT: (t: THREE.Texture) => THREE.Texture,
) {
  const woodMat = trackM(
    new THREE.MeshStandardMaterial({
      map: trackT(mapped(textures.wood, 1, spec.depth / 2)),
      color: SITE.wood,
      roughness: 0.8,
    }),
  );
  const n = Math.max(2, Math.round(L / 0.8));
  const bw = 0.07;
  const bh = 0.14;
  if (rise < 0.04) {
    for (let i = 0; i <= n; i++) {
      const x = -L / 2 + (i / n) * L;
      const beam = new THREE.Mesh(trackG(new THREE.BoxGeometry(bw, bh, D - T)), woodMat);
      beam.position.set(x, H - bh / 2 - 0.02, 0);
      beam.castShadow = true;
      group.add(beam);
    }
    return;
  }
  if (spec.roofKind === "shed") {
    const a = Math.atan2(rise, D);
    const hyp = Math.hypot(D, rise);
    for (let i = 0; i <= n; i++) {
      const x = -L / 2 + T / 2 + (i / n) * (L - T);
      const rafter = new THREE.Mesh(trackG(new THREE.BoxGeometry(bw, bh, hyp)), woodMat);
      rafter.rotation.x = a;
      rafter.position.set(x, H + rise / 2 - 0.08, 0);
      rafter.castShadow = true;
      group.add(rafter);
    }
    const plateS = new THREE.Mesh(trackG(new THREE.BoxGeometry(L - T, 0.1, 0.12)), woodMat);
    plateS.position.set(0, H - 0.06, D / 2 - T / 2);
    const plateN = new THREE.Mesh(trackG(new THREE.BoxGeometry(L - T, 0.1, 0.12)), woodMat);
    plateN.position.set(0, H + rise - 0.06, -(D / 2 - T / 2));
    group.add(plateS, plateN);
    return;
  }
  if (spec.roofKind === "hip") {
    addHipTimber(group, spec, L, D, H, T, rise, woodMat, trackG);
    return;
  }
  const run = D / 2;
  const a = Math.atan2(rise, run);
  const hyp = Math.hypot(run, rise);
  const ridge = new THREE.Mesh(trackG(new THREE.BoxGeometry(L - T, 0.16, 0.12)), woodMat);
  ridge.position.set(0, H + rise - 0.08, 0);
  ridge.castShadow = true;
  group.add(ridge);
  for (let i = 0; i <= n; i++) {
    const x = -L / 2 + T / 2 + (i / n) * (L - T);
    const rafterS = new THREE.Mesh(trackG(new THREE.BoxGeometry(bw, bh, hyp)), woodMat);
    rafterS.rotation.x = a;
    rafterS.position.set(x, H + rise / 2 - 0.08, run / 2);
    rafterS.castShadow = true;
    const rafterN = new THREE.Mesh(trackG(new THREE.BoxGeometry(bw, bh, hyp)), woodMat);
    rafterN.rotation.x = -a;
    rafterN.position.set(x, H + rise / 2 - 0.08, -run / 2);
    rafterN.castShadow = true;
    group.add(rafterS, rafterN);
  }
  const plateS = new THREE.Mesh(trackG(new THREE.BoxGeometry(L - T, 0.1, 0.12)), woodMat);
  plateS.position.set(0, H - 0.06, D / 2 - T / 2);
  const plateN = new THREE.Mesh(trackG(new THREE.BoxGeometry(L - T, 0.1, 0.12)), woodMat);
  plateN.position.set(0, H - 0.06, -(D / 2 - T / 2));
  group.add(plateS, plateN);
}

function addPorchFrame(
  group: THREE.Group,
  spec: BuildingSpec,
  L: number,
  D: number,
  H: number,
  rise: number,
  textures: SiteTextures,
  trackG: <G extends THREE.BufferGeometry>(g: G) => G,
  trackM: <M extends THREE.Material>(m: M) => M,
  trackT: (t: THREE.Texture) => THREE.Texture,
) {
  const woodMat = trackM(
    new THREE.MeshStandardMaterial({
      map: trackT(mapped(textures.wood, 0.4, 2)),
      color: SITE.wood,
      roughness: 0.78,
    }),
  );
  const postW = 0.14;
  const shed = spec.roofKind === "shed" && rise > 0.04;
  for (const p of postPositions(spec)) {
    const south = p.z > 0;
    const h = shed ? (south ? H : H + rise) : H;
    const post = new THREE.Mesh(trackG(new THREE.BoxGeometry(postW, h, postW)), woodMat);
    post.position.set(p.x, h / 2, p.z);
    post.castShadow = true;
    group.add(post);
  }
  const beamH = 0.16;
  const beamW = 0.12;
  const southY = H + beamH / 2;
  const northY = (shed ? H + rise : H) + beamH / 2;
  const bs = new THREE.Mesh(trackG(new THREE.BoxGeometry(L, beamH, beamW)), woodMat);
  bs.position.set(0, southY, D / 2 - 0.12);
  bs.castShadow = true;
  const bn = new THREE.Mesh(trackG(new THREE.BoxGeometry(L, beamH, beamW)), woodMat);
  bn.position.set(0, northY, -(D / 2 - 0.12));
  bn.castShadow = true;
  group.add(bs, bn);
  const a = shed ? Math.atan2(rise, D) : 0;
  const hyp = Math.hypot(D - 0.24, shed ? rise : 0);
  for (const x of [-L / 2 + 0.12, L / 2 - 0.12]) {
    const beam = new THREE.Mesh(trackG(new THREE.BoxGeometry(beamW, beamH, Math.max(0.4, hyp))), woodMat);
    if (a) {
      beam.rotation.x = a;
      beam.position.set(x, H + rise / 2 + beamH / 2, 0);
    } else {
      beam.position.set(x, southY, 0);
    }
    beam.castShadow = true;
    group.add(beam);
  }
}

function addScaffold(
  group: THREE.Group,
  spec: BuildingSpec,
  L: number,
  D: number,
  H: number,
  rise: number,
  trackG: <G extends THREE.BufferGeometry>(g: G) => G,
  trackM: <M extends THREE.Material>(m: M) => M,
) {
  const mat = trackM(
    new THREE.MeshStandardMaterial({ color: SITE.scaffold, roughness: 0.42, metalness: 0.58 }),
  );
  const plankMat = trackM(new THREE.MeshStandardMaterial({ color: SITE.wood, roughness: 0.9 }));
  const gap = 0.75;
  const bay = 2;
  const r = 0.03;
  const top = H + Math.min(rise, 0.6) + 0.4;
  const zS = D / 2 + gap;
  const xE = L / 2 + gap;
  const poles: Array<[number, number]> = [];
  for (let x = -L / 2; x <= L / 2 + 0.02; x += bay) poles.push([x, zS]);
  poles.push([L / 2, zS]);
  if (spec.kind !== "wall") {
    for (let z = -D / 2; z <= D / 2 + 0.02; z += bay) poles.push([xE, z]);
    poles.push([xE, D / 2]);
    poles.push([xE, zS]);
  }
  const seen = new Set<string>();
  for (const [x, z] of poles) {
    const k = `${x.toFixed(2)}:${z.toFixed(2)}`;
    if (seen.has(k)) continue;
    seen.add(k);
    const pole = new THREE.Mesh(trackG(new THREE.CylinderGeometry(r, r, top, 6)), mat);
    pole.position.set(x, top / 2, z);
    pole.castShadow = true;
    group.add(pole);
  }
  const lifts = Math.max(1, Math.ceil(H / 2));
  for (let i = 1; i <= lifts; i++) {
    const y = Math.min(H, i * 2);
    const ledger = new THREE.Mesh(trackG(new THREE.CylinderGeometry(r * 0.75, r * 0.75, L + 0.3, 6)), mat);
    ledger.rotation.z = Math.PI / 2;
    ledger.position.set(0, y, zS);
    group.add(ledger);
    const plank = new THREE.Mesh(trackG(new THREE.BoxGeometry(L + 0.25, 0.04, 0.38)), plankMat);
    plank.position.set(0, y + 0.04, zS - 0.08);
    plank.castShadow = true;
    group.add(plank);
    if (spec.kind !== "wall") {
      const ledgerE = new THREE.Mesh(trackG(new THREE.CylinderGeometry(r * 0.75, r * 0.75, D + 0.3, 6)), mat);
      ledgerE.rotation.x = Math.PI / 2;
      ledgerE.position.set(xE, y, 0);
      group.add(ledgerE);
      const plankE = new THREE.Mesh(trackG(new THREE.BoxGeometry(0.38, 0.04, D + 0.25)), plankMat);
      plankE.position.set(xE - 0.08, y + 0.04, 0);
      group.add(plankE);
    }
    for (let x = -L / 2; x < L / 2 - 0.4; x += bay) {
      const diag = new THREE.Mesh(trackG(new THREE.CylinderGeometry(r * 0.55, r * 0.55, 2.35, 6)), mat);
      diag.rotation.z = 0.55;
      diag.position.set(x + bay / 2, y - 0.85, zS);
      group.add(diag);
    }
  }
}

function addBrickPallet(
  group: THREE.Group,
  spec: BuildingSpec,
  L: number,
  D: number,
  textures: SiteTextures,
  trackG: <G extends THREE.BufferGeometry>(g: G) => G,
  trackM: <M extends THREE.Material>(m: M) => M,
  trackT: (t: THREE.Texture) => THREE.Texture,
) {
  const mat = trackM(
    new THREE.MeshStandardMaterial({
      map: trackT(mapped(textures.brick, 3, 2)),
      roughness: 0.9,
    }),
  );
  const wood = trackM(new THREE.MeshStandardMaterial({ color: SITE.woodDark, roughness: 0.85 }));
  const x = spec.kind === "wall" ? L / 2 + 0.7 : L / 2 + 1.15;
  const z = spec.kind === "wall" ? 0.9 : D / 2 + 1.15;
  const pallet = new THREE.Mesh(trackG(new THREE.BoxGeometry(0.9, 0.08, 0.7)), wood);
  pallet.position.set(x, 0.04, z);
  pallet.castShadow = true;
  group.add(pallet);
  const stack = new THREE.Mesh(trackG(new THREE.BoxGeometry(0.82, 0.55, 0.62)), mat);
  stack.position.set(x, 0.36, z);
  stack.castShadow = true;
  group.add(stack);
}

function addPerson(
  group: THREE.Group,
  spec: BuildingSpec,
  L: number,
  D: number,
  trackG: <G extends THREE.BufferGeometry>(g: G) => G,
  trackM: <M extends THREE.Material>(m: M) => M,
) {
  const cloth = trackM(new THREE.MeshStandardMaterial({ color: SITE.person, roughness: 0.75 }));
  const dark = trackM(new THREE.MeshStandardMaterial({ color: SITE.personDark, roughness: 0.75 }));
  const helm = trackM(new THREE.MeshStandardMaterial({ color: SITE.helmet, roughness: 0.45 }));
  const x = -L / 2 - 0.7;
  const z = spec.kind === "wall" ? D / 2 + 0.9 : D / 2 + 0.7;
  const legs = new THREE.Mesh(trackG(new THREE.CylinderGeometry(0.09, 0.1, 0.55, 8)), dark);
  legs.position.set(x, 0.28, z);
  const body = new THREE.Mesh(trackG(new THREE.CylinderGeometry(0.17, 0.2, 0.62, 8)), cloth);
  body.position.set(x, 0.84, z);
  const armL = new THREE.Mesh(trackG(new THREE.CylinderGeometry(0.045, 0.05, 0.5, 6)), cloth);
  armL.position.set(x - 0.22, 0.82, z);
  armL.rotation.z = 0.12;
  const armR = new THREE.Mesh(trackG(new THREE.CylinderGeometry(0.045, 0.05, 0.5, 6)), cloth);
  armR.position.set(x + 0.22, 0.82, z);
  armR.rotation.z = -0.12;
  const head = new THREE.Mesh(trackG(new THREE.SphereGeometry(0.11, 10, 8)), cloth);
  head.position.set(x, 1.28, z);
  const hat = new THREE.Mesh(trackG(new THREE.SphereGeometry(0.12, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2)), helm);
  hat.position.set(x, 1.34, z);
  const brim = new THREE.Mesh(trackG(new THREE.CylinderGeometry(0.16, 0.16, 0.02, 12)), helm);
  brim.position.set(x, 1.34, z);
  group.add(legs, body, armL, armR, head, hat, brim);
}

function makeDimSprite(text: string, trackT: (t: THREE.Texture) => THREE.Texture, trackM: <M extends THREE.Material>(m: M) => M) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 64;
  const ctx = c.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, 256, 64);
    ctx.fillStyle = "rgba(244,239,228,0.92)";
    ctx.fillRect(8, 8, 240, 48);
    ctx.fillStyle = "#161410";
    ctx.font = "600 28px IBM Plex Sans, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 128, 34);
  }
  const tex = trackT(new THREE.CanvasTexture(c));
  tex.colorSpace = THREE.SRGBColorSpace;
  const spr = new THREE.Sprite(
    trackM(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true })),
  );
  spr.scale.set(1.35, 0.34, 1);
  spr.renderOrder = 4;
  return spr;
}

function addDimensions(
  group: THREE.Group,
  spec: BuildingSpec,
  L: number,
  D: number,
  H: number,
  rise: number,
  trackG: <G extends THREE.BufferGeometry>(g: G) => G,
  trackM: <M extends THREE.Material>(m: M) => M,
  trackT: (t: THREE.Texture) => THREE.Texture,
) {
  const mat = trackM(new THREE.LineBasicMaterial({ color: SITE.dim, depthTest: false, transparent: true, opacity: 0.85 }));
  const line = (a: THREE.Vector3, b: THREE.Vector3) => {
    const g = trackG(new THREE.BufferGeometry().setFromPoints([a, b]));
    const l = new THREE.Line(g, mat);
    l.renderOrder = 3;
    group.add(l);
  };

  const zOff = D / 2 + 0.62;
  const xOff = L / 2 + 0.62;
  line(new THREE.Vector3(-L / 2, 0.05, zOff), new THREE.Vector3(L / 2, 0.05, zOff));
  line(new THREE.Vector3(-L / 2, 0.05, zOff - 0.12), new THREE.Vector3(-L / 2, 0.05, zOff + 0.12));
  line(new THREE.Vector3(L / 2, 0.05, zOff - 0.12), new THREE.Vector3(L / 2, 0.05, zOff + 0.12));
  const labL = makeDimSprite(fmtM(L), trackT, trackM);
  labL.position.set(0, 0.32, zOff);
  group.add(labL);

  if (spec.kind !== "wall") {
    line(new THREE.Vector3(xOff, 0.05, -D / 2), new THREE.Vector3(xOff, 0.05, D / 2));
    line(new THREE.Vector3(xOff - 0.12, 0.05, -D / 2), new THREE.Vector3(xOff + 0.12, 0.05, -D / 2));
    line(new THREE.Vector3(xOff - 0.12, 0.05, D / 2), new THREE.Vector3(xOff + 0.12, 0.05, D / 2));
    const labD = makeDimSprite(fmtM(D), trackT, trackM);
    labD.position.set(xOff, 0.32, 0);
    group.add(labD);
  }

  const hx = L / 2 + 0.18;
  const hz = D / 2 + 0.18;
  line(new THREE.Vector3(hx, 0, hz), new THREE.Vector3(hx, H, hz));
  line(new THREE.Vector3(hx - 0.1, 0, hz), new THREE.Vector3(hx + 0.1, 0, hz));
  line(new THREE.Vector3(hx - 0.1, H, hz), new THREE.Vector3(hx + 0.1, H, hz));
  const labH = makeDimSprite(fmtM(H), trackT, trackM);
  labH.position.set(hx + 0.35, H / 2, hz + 0.15);
  group.add(labH);

  if (rise > 0.04) {
    line(new THREE.Vector3(0, H, 0), new THREE.Vector3(0, H + rise, 0));
    const labP = makeDimSprite(`${spec.pitch}°`, trackT, trackM);
    labP.position.set(0.4, H + rise * 0.55, 0);
    group.add(labP);
  }
}

export function cameraFit(
  spec: BuildingSpec,
  preset: CameraPreset = "iso",
): { position: THREE.Vector3; target: THREE.Vector3 } {
  const H = spec.height;
  const L = spec.length;
  const D = spec.kind === "wall" ? Math.max(spec.thickness, 0.2) : spec.depth;
  const rise = roofRise({ ...spec, depth: D });
  const top = H + rise;
  const span = Math.max(L, D, 3);

  if (spec.kind === "wall" && preset === "iso") {
    return {
      position: new THREE.Vector3(L * 0.12, H * 0.7, D / 2 + Math.max(5, L * 0.55)),
      target: new THREE.Vector3(0, H * 0.45, 0),
    };
  }

  if (preset === "sud") {
    return {
      position: new THREE.Vector3(0, top * 0.55 + 0.5, D / 2 + span * 1.05),
      target: new THREE.Vector3(0, H * 0.45, 0),
    };
  }
  if (preset === "est") {
    return {
      position: new THREE.Vector3(L / 2 + span * 1.05, top * 0.55 + 0.5, 0),
      target: new THREE.Vector3(0, H * 0.45, 0),
    };
  }
  if (preset === "pianta") {
    return {
      position: new THREE.Vector3(0.05, span * 1.55 + top * 0.2, 0.05),
      target: new THREE.Vector3(0, 0, 0),
    };
  }
  return {
    position: new THREE.Vector3(span * 0.88, top * 0.55 + 2.4, span * 1.05),
    target: new THREE.Vector3(0, H * 0.42 + rise * 0.15, 0),
  };
}
