import * as THREE from "three";
import { HABITAT, SPECIE } from "@/data/natura";
import { stratoOf, type Strato } from "@/data/strati";
import type { Specie } from "@/data/types";
import { makeRenderer, resizeRenderer } from "./geo";
import { LOGO_CREAM, LOGO_GOLD, makeLabLogo3D } from "./labLogo3d";
import { OrbitCam, type ViewCtl } from "./view";

export type BioPick =
  | { kind: "specie"; specie: Specie }
  | { kind: "habitat"; titolo: string; testo: string };

export type BioFilter = {
  layers: Set<Strato>;
};

const RING: Record<Exclude<Strato, "habitat">, { r: number; color: number }> = {
  alberi: { r: 3.2, color: 0x8b9a66 },
  macchia: { r: 3.9, color: 0x6c7a4b },
  fiori: { r: 4.6, color: 0xede0c8 },
  insetti: { r: 5.4, color: 0xc9a05a },
  rettili: { r: 6.0, color: 0x9a7a55 },
  acque: { r: 6.5, color: 0x7a8b9a },
  mammiferi: { r: 7.1, color: 0xb5713a },
  uccelli: { r: 7.8, color: 0xce8b4e },
};

function geomFor(strato: Exclude<Strato, "habitat">) {
  if (strato === "alberi") return new THREE.ConeGeometry(0.22, 0.62, 6);
  if (strato === "macchia") return new THREE.DodecahedronGeometry(0.22, 0);
  if (strato === "fiori") return new THREE.OctahedronGeometry(0.2, 0);
  if (strato === "uccelli") return new THREE.TetrahedronGeometry(0.26, 0);
  if (strato === "insetti") return new THREE.IcosahedronGeometry(0.16, 0);
  if (strato === "rettili") return new THREE.CapsuleGeometry(0.1, 0.28, 3, 6);
  if (strato === "acque") return new THREE.SphereGeometry(0.2, 10, 8);
  return new THREE.SphereGeometry(0.26, 12, 10);
}

type Node = {
  form: THREE.Object3D;
  dot: THREE.Object3D;
  line: THREE.Line;
  lineMat: THREE.LineBasicMaterial;
  strato: Strato;
  rest: THREE.Vector3;
  awakePos: THREE.Vector3;
};

export function startBiosfera(
  canvas: HTMLCanvasElement,
  opts: {
    reduced: boolean;
    onPick: (s: BioPick | null) => void;
    view: ViewCtl;
    filter: BioFilter;
  },
) {
  const renderer = makeRenderer(canvas);
  renderer.setClearColor(0x0e0d10, 1);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 80);
  camera.position.set(0, 2.2, 16);

  scene.add(new THREE.AmbientLight(0xede0c8, 0.85));
  const key = new THREE.DirectionalLight(0xede0c8, 1.4);
  key.position.set(-4, 8, 6);
  scene.add(key);

  const logo = makeLabLogo3D();
  scene.add(logo.group);

  const pickables: THREE.Object3D[] = [];
  const nodes: Node[] = [];
  const geoms: THREE.BufferGeometry[] = [];
  const mats: THREE.Material[] = [];

  const goldMat = new THREE.MeshBasicMaterial({ color: LOGO_GOLD });
  const creamMat = new THREE.MeshBasicMaterial({ color: LOGO_CREAM });
  mats.push(goldMat, creamMat);
  const dotGeo = new THREE.SphereGeometry(0.07, 10, 8);
  geoms.push(dotGeo);

  const byStrato = new Map<Exclude<Strato, "habitat">, Specie[]>();
  for (const s of SPECIE) {
    const st = stratoOf(s);
    const list = byStrato.get(st) ?? [];
    list.push(s);
    byStrato.set(st, list);
  }

  let di = 0;
  const place = (
    strato: Strato,
    r: number,
    color: number,
    formGeo: THREE.BufferGeometry,
    pick: BioPick,
    i: number,
    n: number,
    yAmp: number,
  ) => {
    const t = (i / n) * Math.PI * 2 - Math.PI / 2;
    const y = Math.sin(i * 1.37 + r) * yAmp;
    const rest = new THREE.Vector3(Math.cos(t) * r, 0, Math.sin(t) * r);
    const awakePos = new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r);
    const formMat = new THREE.MeshBasicMaterial({ color });
    mats.push(formMat);
    const form = new THREE.Mesh(formGeo, formMat);
    form.position.copy(rest);
    form.scale.setScalar(0.001);
    form.userData.pick = pick;
    const dot = new THREE.Mesh(dotGeo, di++ % 2 === 0 ? goldMat : creamMat);
    dot.position.copy(rest);
    dot.userData.pick = pick;
    pickables.push(form, dot);
    scene.add(form, dot);
    const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), rest.clone()]);
    geoms.push(lg);
    const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0 });
    mats.push(lineMat);
    const line = new THREE.Line(lg, lineMat);
    line.visible = false;
    scene.add(line);
    nodes.push({ form, dot, line, lineMat, strato, rest, awakePos });
  };

  for (const [st, list] of byStrato) {
    const ring = RING[st];
    const geo = geomFor(st);
    geoms.push(geo);
    list.forEach((s, i) => {
      place(st, ring.r, ring.color, geo, { kind: "specie", specie: s }, i, list.length, 1.15);
    });
  }

  const habGeo = new THREE.OctahedronGeometry(0.34, 0);
  geoms.push(habGeo);
  HABITAT.forEach((h, i) => {
    place(
      "habitat",
      2.15,
      0xede0c8,
      habGeo,
      { kind: "habitat", titolo: h.titolo, testo: h.testo },
      i,
      HABITAT.length,
      0.55,
    );
  });

  const parent = canvas.parentElement ?? canvas;
  const resize = () => resizeRenderer(renderer, camera, parent);
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(parent);

  const orbit = new OrbitCam({
    radius: 13,
    minR: 5,
    maxR: 36,
    rotY: 0.12,
    rotX: 0.16,
    auto: !opts.reduced,
  });
  orbit.look.set(0, 0.15, 0);

  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let picked: THREE.Object3D | null = null;
  let targetAwake = opts.reduced ? 1 : 0;
  let awake = targetAwake;
  let interact = false;

  const wake = () => {
    if (!interact) orbit.lift(0.48);
    interact = true;
    targetAwake = 1;
  };

  const bound = orbit.bind(canvas, {
    pan: false,
    onZoom: (f) => {
      wake();
      opts.view.zoom = THREE.MathUtils.clamp(opts.view.zoom * f, 0.35, 2.4);
    },
    onTap: (e) => {
      wake();
      const r = canvas.getBoundingClientRect();
      ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(ndc, camera);
      const visible = pickables.filter((o) => o.visible);
      const hits = ray.intersectObjects(visible);
      if (picked) picked.scale.setScalar(picked.userData.baseScale ?? 1);
      picked = hits[0]?.object ?? null;
      if (picked) {
        opts.onPick(picked.userData.pick as BioPick);
      } else opts.onPick(null);
    },
  });

  let last = performance.now();
  let alive = true;
  let raf = 0;
  const tmp = new THREE.Vector3();

  const loop = (now: number) => {
    if (!alive) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    if (orbit.dragging) wake();
    awake = THREE.MathUtils.damp(awake, targetAwake, interact ? 3.2 : 2.2, dt);

    const layers = opts.filter.layers;
    for (const n of nodes) {
      const on = layers.has(n.strato);
      tmp.lerpVectors(n.rest, n.awakePos, awake);
      n.form.position.copy(tmp);
      n.dot.position.copy(tmp);
      const formS = THREE.MathUtils.lerp(0.001, 1, awake);
      const dotS = THREE.MathUtils.lerp(1, 0.001, awake);
      n.form.userData.baseScale = formS;
      n.dot.userData.baseScale = dotS;
      const hi = picked === n.form || picked === n.dot ? 1.7 : 1;
      n.form.scale.setScalar(formS * (picked === n.form ? hi : 1));
      n.dot.scale.setScalar(dotS * (picked === n.dot ? hi : 1));
      n.form.visible = on && awake > 0.03;
      n.dot.visible = on && awake < 0.97;
      n.lineMat.opacity = 0.22 * awake;
      n.line.visible = on && awake > 0.06;
      const pos = n.line.geometry.getAttribute("position");
      pos.setXYZ(1, tmp.x, tmp.y, tmp.z);
      pos.needsUpdate = true;
    }

    logo.step(awake, camera);
    orbit.radius = THREE.MathUtils.damp(
      orbit.radius,
      THREE.MathUtils.clamp(13 * opts.view.zoom, orbit.minR, orbit.maxR),
      5,
      dt,
    );
    orbit.step(dt, camera, 0.15);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    ro.disconnect();
    bound.dispose();
    logo.dispose();
    for (const g of geoms) g.dispose();
    for (const m of mats) m.dispose();
    renderer.dispose();
  };
}
