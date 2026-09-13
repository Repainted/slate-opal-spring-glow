import * as THREE from "three";
import { COMUNI } from "@/data/comuni";
import { addDuskLights, duskSky, projectComune, resizeRenderer } from "./geo";
import { OrbitCam, type ViewCtl } from "./view";

export type TramaMode = "trama" | "srotola" | "progressione" | "orbite" | "ecosistema" | "demografia";

export type TramaCtl = {
  mode: TramaMode;
  stretchXZ: number;
  stretchY: number;
};

export type TramaLabel = { slug: string; nome: string; x: number; y: number; abitanti: number };

export type TramaHud = { labels: TramaLabel[]; unfold: number };

const COPPER = 0xc4a07a;
const CREAM = 0xede0c8;
const OLIVE = 0x8b9a66;

type Node = {
  slug: string;
  nome: string;
  provincia: "Latina" | "Roma" | "Frosinone";
  altitudine: number;
  abitanti: number;
  tci: boolean;
  mesh: THREE.Mesh;
  bar: THREE.Mesh;
  popH: number;
  cur: THREE.Vector3;
  trama: THREE.Vector3;
  srotola: THREE.Vector3;
  progressione: THREE.Vector3;
  orbite: THREE.Vector3;
  eco: THREE.Vector3;
  demografia: THREE.Vector3;
  flat: THREE.Vector3;
  phase: number;
};

function colorOf(p: Node["provincia"]) {
  return p === "Roma" ? CREAM : p === "Frosinone" ? OLIVE : COPPER;
}

function layouts() {
  const lngs = COMUNI.map((c) => c.lng);
  const lats = COMUNI.map((c) => c.lat);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const alts = [...COMUNI].sort((a, b) => a.altitudine - b.altitudine);

  const byAlt = (m: number) => (m >= 500 ? 0 : m >= 320 ? 1 : 2);
  const rings: (typeof COMUNI)[] = [[], [], []];
  for (const c of COMUNI) rings[byAlt(c.altitudine)]!.push(c);

  return COMUNI.map((c) => {
    const u = (c.lng - minLng) / (maxLng - minLng || 1);
    const v = (c.lat - minLat) / (maxLat - minLat || 1);
    const { x: gx, z: gz } = projectComune(c.lng, c.lat);

    const peakL = Math.exp(-((u - 0.3) ** 2 / 0.045 + (v - 0.52) ** 2 / 0.09));
    const peakR = Math.exp(-((u - 0.63) ** 2 / 0.038 + (v - 0.46) ** 2 / 0.075)) * 1.38;

    const trama = new THREE.Vector3((u - 0.5) * 20, 8.4 + (peakL + peakR) * 6.2, (0.5 - v) * 11);
    const flat = new THREE.Vector3((u - 0.5) * 16.5, 9.1 + (peakL + peakR) * 4.8, 0.22);
    const srotola = new THREE.Vector3(gx * 0.2, 0.8 + (c.altitudine / 1536) * 14, gz * 0.2);

    const pi = alts.findIndex((x) => x.slug === c.slug);
    const t = pi / Math.max(1, alts.length - 1);
    const ang = t * Math.PI * 2.15;
    const pr = 5 + t * 11;
    const progressione = new THREE.Vector3(Math.cos(ang) * pr, 0.6 + t * 16, Math.sin(ang) * pr);

    const ring = byAlt(c.altitudine);
    const mates = rings[ring]!;
    const ri = mates.findIndex((x) => x.slug === c.slug);
    const n = mates.length;
    const a = (ri / n) * Math.PI * 2 - Math.PI / 2;
    const R = 5.2 + ring * 6.4;
    const orbite = new THREE.Vector3(Math.cos(a) * R, 7.2 - ring * 2.1, Math.sin(a) * R);

    const eco = srotola.clone();
    const popH = 1.4 + (c.abitanti / 24000) * 16;
    const demografia = new THREE.Vector3(srotola.x, popH * 0.5, srotola.z);

    return { c, trama, flat, srotola, progressione, orbite, eco, demografia, popH };
  });
}

export function startTrama(
  canvas: HTMLCanvasElement,
  opts: {
    reduced: boolean;
    getSlug: () => string | null;
    onPick: (slug: string) => void;
    onHud: (h: TramaHud) => void;
    view: ViewCtl;
    ctl: TramaCtl;
  },
) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: canvas.clientWidth > 700,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(0x0c0e12, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0c0e12, 0.004);
  const camera = new THREE.PerspectiveCamera(48, 1, 0.15, 180);
  const sky = duskSky();
  sky.visible = false;
  scene.add(sky);
  addDuskLights(scene);

  const PCOUNT = 160;
  const pPos = new Float32Array(PCOUNT * 3);
  const pVel = new Float32Array(PCOUNT * 3);
  for (let i = 0; i < PCOUNT; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 38;
    pPos[i * 3 + 1] = 2 + Math.random() * 22;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 28;
    pVel[i * 3] = (Math.random() - 0.5) * 0.55;
    pVel[i * 3 + 1] = 0.12 + Math.random() * 0.35;
    pVel[i * 3 + 2] = (Math.random() - 0.5) * 0.45;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0xd8b896,
    size: 0.22,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const dust = new THREE.Points(pGeo, pMat);
  scene.add(dust);

  const laid = layouts();
  const geo = new THREE.SphereGeometry(1, 14, 12);
  const barGeo = new THREE.CylinderGeometry(1, 1, 1, 12);
  const mats = {
    Latina: new THREE.MeshStandardMaterial({ color: COPPER, roughness: 0.28, metalness: 0.62, emissive: COPPER, emissiveIntensity: 0.32 }),
    Roma: new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.32, metalness: 0.4, emissive: CREAM, emissiveIntensity: 0.22 }),
    Frosinone: new THREE.MeshStandardMaterial({ color: OLIVE, roughness: 0.32, metalness: 0.38, emissive: OLIVE, emissiveIntensity: 0.2 }),
  };
  const barMats = {
    Latina: new THREE.MeshStandardMaterial({ color: COPPER, roughness: 0.4, metalness: 0.45, emissive: COPPER, emissiveIntensity: 0.12, transparent: true, opacity: 0.88 }),
    Roma: new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.42, metalness: 0.3, emissive: CREAM, emissiveIntensity: 0.08, transparent: true, opacity: 0.88 }),
    Frosinone: new THREE.MeshStandardMaterial({ color: OLIVE, roughness: 0.42, metalness: 0.3, emissive: OLIVE, emissiveIntensity: 0.08, transparent: true, opacity: 0.88 }),
  };

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(28, 48),
    new THREE.MeshBasicMaterial({ color: 0x1a1e26, transparent: true, opacity: 0.45, side: THREE.DoubleSide }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.visible = false;
  scene.add(floor);

  const nodes: Node[] = laid.map((row, i) => {
    const mesh = new THREE.Mesh(geo, mats[row.c.provincia]);
    const r = 0.4 + Math.sqrt(row.c.abitanti) * 0.005;
    mesh.scale.setScalar(r);
    mesh.userData.slug = row.c.slug;
    scene.add(mesh);
    const bar = new THREE.Mesh(barGeo, barMats[row.c.provincia]);
    bar.scale.set(0.22, 0.05, 0.22);
    bar.visible = false;
    bar.userData.slug = row.c.slug;
    scene.add(bar);
    return {
      slug: row.c.slug,
      nome: row.c.nome,
      provincia: row.c.provincia,
      altitudine: row.c.altitudine,
      abitanti: row.c.abitanti,
      tci: !!row.c.bandieraArancione,
      mesh,
      bar,
      popH: row.popH,
      cur: (opts.ctl.mode === "demografia" ? row.demografia : row.flat).clone(),
      trama: row.trama,
      flat: row.flat,
      srotola: row.srotola,
      progressione: row.progressione,
      orbite: row.orbite,
      eco: row.eco,
      demografia: row.demografia,
      phase: i * 0.47,
    };
  });

  const maxLines = nodes.length * 3 * 2;
  const linePos = new Float32Array(maxLines * 3);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
  lineGeo.setDrawRange(0, 0);
  const lines = new THREE.LineSegments(
    lineGeo,
    new THREE.LineBasicMaterial({ color: COPPER, transparent: true, opacity: 0.42, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  scene.add(lines);

  const ringGeo = new THREE.RingGeometry(15.4, 15.85, 96);
  const badgeMat = new THREE.MeshBasicMaterial({ color: COPPER, transparent: true, opacity: 0, side: THREE.DoubleSide });
  const badge = new THREE.Mesh(ringGeo, badgeMat);
  badge.position.set(0, 8, 0);
  badge.visible = false;
  scene.add(badge);

  const orbitRings: THREE.Mesh[] = [5.2, 11.6, 18].map((r, i) => {
    const g = new THREE.RingGeometry(r - 0.04, r + 0.04, 80);
    g.rotateX(-Math.PI / 2);
    const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: COPPER, transparent: true, opacity: 0.16 - i * 0.03, side: THREE.DoubleSide }));
    m.position.y = 7.2 - i * 2.1;
    m.visible = false;
    scene.add(m);
    return m;
  });

  const parent = canvas.parentElement ?? canvas;
  const resize = () => resizeRenderer(renderer, camera, parent);
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(parent);

  const orbit = new OrbitCam({ radius: 36, minR: 8, maxR: 90, rotY: 0, rotX: 0.05, auto: false });
  orbit.look.set(0, 8, 0);
  const startLook = new THREE.Vector3(0, 8, 0);
  const startR = 36;
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const want = new THREE.Vector3();
  const proj = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  const mid = new THREE.Vector3();

  const bound = orbit.bind(canvas, {
    wasd: true,
    onZoom: (f) => {
      opts.view.zoom = THREE.MathUtils.clamp(opts.view.zoom * f, 0.22, 3.2);
      orbit.radius = THREE.MathUtils.clamp(orbit.radius * f, orbit.minR, orbit.maxR);
    },
    onTap: (e) => {
      const r = canvas.getBoundingClientRect();
      ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(nodes.flatMap((n) => [n.mesh, n.bar]))[0];
      if (hit?.object.userData.slug) opts.onPick(hit.object.userData.slug as string);
    },
  });

  let last = performance.now();
  let alive = true;
  let lastHud = 0;

  const targetOf = (n: Node, mode: TramaMode, t: number, unfold: number) => {
    if (mode === "trama") {
      tmp.copy(n.flat).lerp(n.trama, unfold);
      return tmp;
    }
    if (mode === "srotola") return n.srotola;
    if (mode === "progressione") return n.progressione;
    if (mode === "orbite") return n.orbite;
    if (mode === "demografia") return n.demografia;
    tmp.copy(n.eco);
    tmp.x += Math.cos(t * 0.22 + n.phase) * 1.15;
    tmp.z += Math.sin(t * 0.18 + n.phase * 1.3) * 1.15;
    tmp.y += Math.sin(t * 0.7 + n.phase) * 0.55;
    return tmp;
  };

  const loop = (now: number) => {
    if (!alive) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    orbit.panKeys(bound.keys, dt);

    const mode = opts.ctl.mode;
    const sxz = opts.ctl.stretchXZ;
    const sy = opts.ctl.stretchY;
    const t = now * 0.001;

    const dAng = Math.abs(orbit.rotY) + Math.abs(orbit.rotX - 0.05) * 1.4;
    const dLook = orbit.look.distanceTo(startLook);
    const dR = Math.abs(orbit.radius - startR) / startR;
    let drift = dAng * 1.15 + dLook * 0.1 + dR * 0.85;
    if (mode !== "trama") drift = 1.4;
    const unfold = THREE.MathUtils.smoothstep(drift, 0.05, 0.62);
    renderer.setClearColor(0x0c0e12, unfold);
    sky.visible = unfold > 0.2;
    if (scene.fog) (scene.fog as THREE.FogExp2).density = 0.003 + unfold * 0.01;

    mid.set(0, 0, 0);
    for (const n of nodes) {
      const tgt = targetOf(n, mode, t, unfold);
      n.cur.lerp(tgt, 1 - Math.exp(-3.1 * dt));
      mid.add(n.cur);
    }
    mid.multiplyScalar(1 / nodes.length);

    const slug = opts.getSlug();
    for (const n of nodes) {
      const p = tmp.copy(n.cur).sub(mid);
      p.x *= sxz;
      p.z *= sxz;
      p.y *= sy;
      p.add(mid);
      n.mesh.position.copy(p);
      const demo = mode === "demografia";
      const base = demo ? 0.32 + Math.sqrt(n.abitanti) * 0.003 : 0.4 + Math.sqrt(n.abitanti) * 0.005;
      const hot = n.slug === slug ? 1.7 : 1;
      const pulse = 1 + Math.sin(t * 2.2 + n.phase) * (mode === "ecosistema" ? 0.12 : 0.05);
      n.mesh.scale.setScalar(base * hot * pulse);

      const wantH = demo ? n.popH * sy : 0.04;
      const curH = THREE.MathUtils.damp(n.bar.scale.y, wantH, 5, dt);
      const rad = demo ? 0.28 + Math.sqrt(n.abitanti) * 0.0022 : 0.05;
      n.bar.scale.set(rad, curH, rad);
      n.bar.position.set(p.x, demo ? (curH * 0.5) : p.y, p.z);
      n.bar.visible = curH > 0.08;
      if (demo) n.mesh.position.y = curH + base * hot * pulse;
    }

    // k-nearest trama that reweaves as nodes move
    let w = 0;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i]!;
      let d1 = Infinity,
        d2 = Infinity,
        j1 = -1,
        j2 = -1;
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const d = a.mesh.position.distanceToSquared(nodes[j]!.mesh.position);
        if (d < d1) {
          d2 = d1;
          j2 = j1;
          d1 = d;
          j1 = j;
        } else if (d < d2) {
          d2 = d;
          j2 = j;
        }
      }
      for (const j of [j1, j2]) {
        if (j < 0 || j <= i) continue;
        const b = nodes[j]!;
        linePos[w++] = a.mesh.position.x;
        linePos[w++] = a.mesh.position.y;
        linePos[w++] = a.mesh.position.z;
        linePos[w++] = b.mesh.position.x;
        linePos[w++] = b.mesh.position.y;
        linePos[w++] = b.mesh.position.z;
      }
    }
    lineGeo.attributes.position!.needsUpdate = true;
    lineGeo.setDrawRange(0, w / 3);
    (lines.material as THREE.LineBasicMaterial).opacity = mode === "trama" ? 0.55 : mode === "demografia" ? 0.18 : 0.38;

    const badgeOp = mode === "trama" ? unfold * 0.35 : 0;
    badgeMat.opacity = THREE.MathUtils.damp(badgeMat.opacity, badgeOp, 3, dt);
    badge.visible = badgeMat.opacity > 0.02;
    badge.scale.setScalar(sxz);
    for (const r of orbitRings) r.visible = mode === "orbite";
    floor.visible = mode === "demografia";

    for (let i = 0; i < PCOUNT; i++) {
      pPos[i * 3] += pVel[i * 3]! * dt;
      pPos[i * 3 + 1] += pVel[i * 3 + 1]! * dt + Math.sin(t * 0.7 + i) * 0.08 * dt;
      pPos[i * 3 + 2] += pVel[i * 3 + 2]! * dt;
      if (pPos[i * 3 + 1]! > 26) pPos[i * 3 + 1] = 1.5;
      if (pPos[i * 3]! > 22) pPos[i * 3] = -22;
      if (pPos[i * 3]! < -22) pPos[i * 3] = 22;
      if (pPos[i * 3 + 2]! > 16) pPos[i * 3 + 2] = -16;
      if (pPos[i * 3 + 2]! < -16) pPos[i * 3 + 2] = 16;
    }
    pGeo.attributes.position!.needsUpdate = true;
    pMat.opacity = 0.35 + unfold * 0.4;

    const focus = nodes.find((n) => n.slug === slug);
    const targetR = THREE.MathUtils.clamp((mode === "trama" ? 36 : 32) * opts.view.zoom, orbit.minR, orbit.maxR);
    orbit.radius = THREE.MathUtils.damp(orbit.radius, targetR, 3.2, dt);
    if (focus && mode !== "trama") want.copy(focus.mesh.position);
    else if (mode === "trama" && unfold < 0.25) want.copy(startLook);
    else want.copy(mid);
    if (!orbit.dragging) orbit.look.lerp(want, 1 - Math.exp(-2.4 * dt));
    orbit.step(dt, camera, 0);

    if (now - lastHud > 50) {
      lastHud = now;
      const labels: TramaLabel[] = [];
      if (!(mode === "trama" && unfold < 0.32)) {
        const rect = canvas.getBoundingClientRect();
        for (const n of nodes) {
          proj.copy(n.mesh.position).project(camera);
          if (proj.z > 1) continue;
          labels.push({
            slug: n.slug,
            nome: n.nome,
            abitanti: n.abitanti,
            x: (proj.x * 0.5 + 0.5) * rect.width,
            y: (-proj.y * 0.5 + 0.5) * rect.height,
          });
        }
      }
      opts.onHud({ labels, unfold: mode === "trama" ? unfold : 1 });
    }

    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  return () => {
    alive = false;
    bound.dispose();
    ro.disconnect();
    geo.dispose();
    barGeo.dispose();
    lineGeo.dispose();
    ringGeo.dispose();
    badgeMat.dispose();
    pGeo.dispose();
    pMat.dispose();
    for (const m of Object.values(mats)) m.dispose();
    for (const m of Object.values(barMats)) m.dispose();
    renderer.dispose();
  };
}
