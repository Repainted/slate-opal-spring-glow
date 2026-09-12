import * as THREE from "three";

export function makeRandom(seed: number) {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type ClumpKind = "ico" | "sphere" | "broad" | "blade";

export function makeClumpGeo(
  THREELib: typeof THREE,
  kind: ClumpKind,
  radius: number,
  detail: number,
  squash: number,
  rnd: () => number,
) {
  let geo: THREE.BufferGeometry;
  if (kind === "blade") {
    geo = new THREELib.ConeGeometry(radius * 0.45, radius * 2.1, 5);
  } else if (kind === "broad") {
    geo = new THREELib.SphereGeometry(radius, 8, 6);
  } else if (kind === "ico") {
    geo = new THREELib.IcosahedronGeometry(radius, detail);
  } else {
    geo = new THREELib.SphereGeometry(radius, 7, 5);
  }
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);
    if (kind === "broad") {
      x *= 1.25;
      z *= 1.25;
      y *= squash;
    } else if (kind === "blade") {
      z *= 0.28;
      y *= squash;
    } else {
      y *= squash;
    }
    const j = 0.82 + rnd() * 0.36;
    pos.setXYZ(i, x * j, y * j, z * j);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

type Stem = {
  origin: THREE.Vector3;
  dir: THREE.Vector3;
  length: number;
  radius0: number;
  radius1: number;
};

export type TreeLayer = {
  geo: THREE.BufferGeometry;
  count: number;
  scaleMin: number;
  scaleMax: number;
  shellMin: number;
  shellSpread: number;
  spreadMul?: number;
};

export type TreeSpec = {
  seed: number;
  name: string;
  barkMat: THREE.Material;
  leafMats: THREE.Material[];
  rootFlare?: { radius: number; squash: number };
  stems: Stem[];
  maxDepth: number;
  branchesPerNode: number | ((d: number) => number);
  curviness: number;
  lengthDecay: number;
  radiusDecay: number;
  foliageMode: "envelope" | "anchors";
  envelope?: { center: THREE.Vector3; radiusXZ: number; radiusY: number };
  layers: TreeLayer[];
};

const UP = new THREE.Vector3(0, 1, 0);

export function buildTree(THREELib: typeof THREE, spec: TreeSpec) {
  const rnd = makeRandom(spec.seed);
  const root = new THREELib.Group();
  root.name = spec.name;
  const geos: THREE.BufferGeometry[] = [];
  const dummy = new THREELib.Object3D();
  const q = new THREELib.Quaternion();
  const anchors: THREE.Vector3[] = [];
  const nOf = (d: number) => (typeof spec.branchesPerNode === "number" ? spec.branchesPerNode : spec.branchesPerNode(d));

  const addBranch = (origin: THREE.Vector3, dir: THREE.Vector3, length: number, r0: number, r1: number) => {
    const geo = new THREELib.CylinderGeometry(r1, r0, length, 6);
    geos.push(geo);
    const mesh = new THREELib.Mesh(geo, spec.barkMat);
    const n = dir.clone().normalize();
    mesh.position.copy(origin).addScaledVector(n, length * 0.5);
    mesh.quaternion.copy(q.setFromUnitVectors(UP, n));
    root.add(mesh);
  };

  const grow = (origin: THREE.Vector3, dir: THREE.Vector3, length: number, r0: number, r1: number, depth: number) => {
    addBranch(origin, dir, length, r0, r1);
    const tip = origin.clone().addScaledVector(dir.clone().normalize(), length);
    if (depth >= spec.maxDepth) {
      anchors.push(tip);
      return;
    }
    const n = nOf(depth);
    for (let i = 0; i < n; i++) {
      const child = dir.clone().normalize();
      child.x += (rnd() - 0.5) * spec.curviness * 4;
      child.z += (rnd() - 0.5) * spec.curviness * 4;
      child.y += 0.15 + rnd() * 0.25;
      child.normalize();
      const along = 0.55 + rnd() * 0.4;
      const start = origin.clone().addScaledVector(dir.clone().normalize(), length * along);
      grow(depth === 0 ? tip : start, child, length * spec.lengthDecay * (0.85 + rnd() * 0.25), r1, r1 * spec.radiusDecay, depth + 1);
    }
  };

  for (const s of spec.stems) grow(s.origin.clone(), s.dir.clone(), s.length, s.radius0, s.radius1, 0);

  if (spec.rootFlare) {
    const flare = new THREELib.SphereGeometry(spec.rootFlare.radius, 10, 8);
    geos.push(flare);
    const mesh = new THREELib.Mesh(flare, spec.barkMat);
    mesh.scale.set(1.15, spec.rootFlare.squash, 1.15);
    mesh.position.y = spec.rootFlare.radius * spec.rootFlare.squash * 0.4;
    root.add(mesh);
  }

  const placeEnvelope = (layer: TreeLayer, mat: THREE.Material) => {
    const env = spec.envelope!;
    const inst = new THREELib.InstancedMesh(layer.geo, mat, layer.count);
    geos.push(layer.geo);
    let written = 0;
    for (let i = 0; i < layer.count; i++) {
      const theta = rnd() * Math.PI * 2;
      const phi = Math.acos(2 * rnd() - 1);
      const shell = layer.shellMin + rnd() * layer.shellSpread;
      dummy.position.set(
        env.center.x + Math.cos(theta) * Math.sin(phi) * env.radiusXZ * shell,
        env.center.y + Math.cos(phi) * env.radiusY * shell,
        env.center.z + Math.sin(theta) * Math.sin(phi) * env.radiusXZ * shell,
      );
      dummy.scale.setScalar(layer.scaleMin + rnd() * (layer.scaleMax - layer.scaleMin));
      dummy.rotation.set(rnd() * Math.PI, rnd() * Math.PI, rnd() * Math.PI);
      dummy.updateMatrix();
      inst.setMatrixAt(written++, dummy.matrix);
    }
    inst.count = written;
    inst.instanceMatrix.needsUpdate = true;
    root.add(inst);
  };

  const placeAnchors = (layer: TreeLayer, mat: THREE.Material) => {
    const total = Math.max(1, anchors.length * layer.count);
    const inst = new THREELib.InstancedMesh(layer.geo, mat, total);
    geos.push(layer.geo);
    let written = 0;
    const mul = layer.spreadMul ?? 1;
    for (const a of anchors) {
      for (let j = 0; j < layer.count; j++) {
        const theta = rnd() * Math.PI * 2;
        const phi = Math.acos(2 * rnd() - 1);
        const r = (layer.shellMin + rnd() * layer.shellSpread) * mul * 0.85;
        dummy.position.set(
          a.x + Math.cos(theta) * Math.sin(phi) * r,
          a.y + Math.cos(phi) * r * 0.85,
          a.z + Math.sin(theta) * Math.sin(phi) * r,
        );
        dummy.scale.setScalar(layer.scaleMin + rnd() * (layer.scaleMax - layer.scaleMin));
        dummy.rotation.set(rnd() * Math.PI, rnd() * Math.PI, rnd() * Math.PI);
        dummy.updateMatrix();
        inst.setMatrixAt(written++, dummy.matrix);
      }
    }
    inst.count = written;
    inst.instanceMatrix.needsUpdate = true;
    root.add(inst);
  };

  spec.layers.forEach((layer, li) => {
    const mat = spec.leafMats[li % spec.leafMats.length]!;
    if (spec.foliageMode === "anchors") placeAnchors(layer, mat);
    else placeEnvelope(layer, mat);
  });

  root.userData.dispose = () => {
    for (const g of geos) g.dispose();
    spec.barkMat.dispose();
    for (const m of spec.leafMats) m.dispose();
  };
  return root;
}
