import * as THREE from "three";
import { HABITAT, SPECIE } from "@/data/natura";
import { stratoOf, type Strato } from "@/data/strati";
import type { Specie } from "@/data/types";
import { makeRenderer, resizeRenderer } from "./geo";
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
  const fill = new THREE.PointLight(0xb5713a, 2.2, 40);
  fill.position.set(3, 2, -4);
  scene.add(fill);

  const coreGeo = new THREE.IcosahedronGeometry(1.35, 1);
  const core = new THREE.Mesh(coreGeo, new THREE.MeshBasicMaterial({ color: 0x6c7a4b, wireframe: true }));
  scene.add(core);
  const inner = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.9, 0),
    new THREE.MeshBasicMaterial({ color: 0xb5713a, transparent: true, opacity: 0.45 }),
  );
  scene.add(inner);

  const pickables: THREE.Object3D[] = [];
  const nodes: { mesh: THREE.Object3D; strato: Strato; line: THREE.Line }[] = [];
  const geoms: THREE.BufferGeometry[] = [coreGeo];

  const byStrato = new Map<Exclude<Strato, "habitat">, Specie[]>();
  for (const s of SPECIE) {
    const st = stratoOf(s);
    const list = byStrato.get(st) ?? [];
    list.push(s);
    byStrato.set(st, list);
  }

  for (const [st, list] of byStrato) {
    const ring = RING[st];
    const geo = geomFor(st);
    geoms.push(geo);
    list.forEach((s, i) => {
      const t = (i / list.length) * Math.PI * 2 - Math.PI / 2;
      const y = Math.sin(i * 1.37 + ring.r) * 0.55;
      const mat = new THREE.MeshBasicMaterial({ color: ring.color });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(Math.cos(t) * ring.r, y, Math.sin(t) * ring.r);
      m.userData.pick = { kind: "specie", specie: s } satisfies BioPick;
      m.userData.strato = st;
      pickables.push(m);
      scene.add(m);
      const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), m.position.clone()]);
      const line = new THREE.Line(lg, new THREE.LineBasicMaterial({ color: ring.color, transparent: true, opacity: 0.22 }));
      scene.add(line);
      nodes.push({ mesh: m, strato: st, line });
    });
  }

  const habGeo = new THREE.OctahedronGeometry(0.34, 0);
  geoms.push(habGeo);
  HABITAT.forEach((h, i) => {
    const t = (i / HABITAT.length) * Math.PI * 2;
    const m = new THREE.Mesh(
      habGeo,
      new THREE.MeshBasicMaterial({ color: 0xede0c8 }),
    );
    m.position.set(Math.cos(t) * 2.15, Math.sin(t * 0.5) * 0.35, Math.sin(t) * 2.15);
    m.userData.pick = { kind: "habitat", titolo: h.titolo, testo: h.testo } satisfies BioPick;
    m.userData.strato = "habitat" satisfies Strato;
    pickables.push(m);
    scene.add(m);
    const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), m.position.clone()]);
    const line = new THREE.Line(lg, new THREE.LineBasicMaterial({ color: 0xede0c8, transparent: true, opacity: 0.2 }));
    scene.add(line);
    nodes.push({ mesh: m, strato: "habitat", line });
  });

  const dustGeo = new THREE.BufferGeometry();
  const dp = new Float32Array(240);
  for (let i = 0; i < 80; i++) {
    const u = Math.random() * Math.PI * 2;
    const v = Math.acos(2 * Math.random() - 1);
    const rr = 2.2 + Math.random() * 5.5;
    dp[i * 3] = rr * Math.sin(v) * Math.cos(u);
    dp[i * 3 + 1] = rr * Math.cos(v);
    dp[i * 3 + 2] = rr * Math.sin(v) * Math.sin(u);
  }
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dp, 3));
  geoms.push(dustGeo);
  scene.add(
    new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: 0xede0c8,
        size: 0.06,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    ),
  );

  const parent = canvas.parentElement ?? canvas;
  const resize = () => resizeRenderer(renderer, camera, parent);
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(parent);

  const orbit = new OrbitCam({ radius: 15, minR: 5, maxR: 36, rotY: 0.4, rotX: 0.35, auto: !opts.reduced });
  orbit.look.set(0, 0.4, 0);
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let picked: THREE.Object3D | null = null;

  const bound = orbit.bind(canvas, {
    pan: false,
    onZoom: (f) => {
      opts.view.zoom = THREE.MathUtils.clamp(opts.view.zoom * f, 0.35, 2.4);
    },
    onTap: (e) => {
      const r = canvas.getBoundingClientRect();
      ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(ndc, camera);
      const visible = pickables.filter((o) => o.visible);
      const hits = ray.intersectObjects(visible);
      if (picked) picked.scale.setScalar(1);
      picked = hits[0]?.object ?? null;
      if (picked) {
        picked.scale.setScalar(1.7);
        opts.onPick(picked.userData.pick as BioPick);
      } else opts.onPick(null);
    },
  });

  let last = performance.now();
  let alive = true;
  let raf = 0;

  const loop = (now: number) => {
    if (!alive) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    const layers = opts.filter.layers;
    for (const n of nodes) {
      const on = layers.has(n.strato);
      n.mesh.visible = on;
      n.line.visible = on;
    }
    orbit.radius = THREE.MathUtils.damp(
      orbit.radius,
      THREE.MathUtils.clamp(15 * opts.view.zoom, orbit.minR, orbit.maxR),
      5,
      dt,
    );
    orbit.step(dt, camera, 0.4);
    core.rotation.y += dt * 0.15;
    inner.rotation.y -= dt * 0.22;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    ro.disconnect();
    bound.dispose();
    for (const g of geoms) g.dispose();
    renderer.dispose();
  };
}
