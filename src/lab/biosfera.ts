import * as THREE from "three";
import { HABITAT, SPECIE } from "@/data/natura";
import { makeRenderer, resizeRenderer } from "./geo";
import type { Specie } from "@/data/types";
import { OrbitCam, type ViewCtl } from "./view";

export type BioPick =
  | { kind: "specie"; specie: Specie }
  | { kind: "habitat"; titolo: string; testo: string };

export function startBiosfera(
  canvas: HTMLCanvasElement,
  opts: {
    reduced: boolean;
    onPick: (s: BioPick | null) => void;
    view: ViewCtl;
  },
) {
  const renderer = makeRenderer(canvas);
  renderer.setClearColor(0x0e0d10, 1);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 80);
  camera.position.set(0, 2.2, 16);

  const coreGeo = new THREE.IcosahedronGeometry(1.35, 1);
  const core = new THREE.Mesh(coreGeo, new THREE.MeshBasicMaterial({ color: 0x6c7a4b, wireframe: true }));
  scene.add(core);
  const inner = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.9, 0),
    new THREE.MeshBasicMaterial({ color: 0xb5713a, transparent: true, opacity: 0.35 }),
  );
  scene.add(inner);

  const pickables: THREE.Object3D[] = [];
  const orbGeo = new THREE.SphereGeometry(0.24, 16, 12);
  const habGeo = new THREE.OctahedronGeometry(0.32, 0);
  const linePts: number[] = [];

  const placeRing = (list: Specie[], radius: number) => {
    list.forEach((s, i) => {
      const t = (i / list.length) * Math.PI * 2 - Math.PI / 2;
      const y = s.gruppo === "fauna" ? Math.sin(i * 1.7) * 0.8 : Math.cos(i * 1.3) * 0.55;
      const x = Math.cos(t) * radius;
      const z = Math.sin(t) * radius;
      const color = s.gruppo === "flora" ? 0x8b9a66 : 0xce8b4e;
      const m = new THREE.Mesh(orbGeo, new THREE.MeshBasicMaterial({ color }));
      m.position.set(x, y, z);
      m.userData.pick = { kind: "specie", specie: s } satisfies BioPick;
      pickables.push(m);
      scene.add(m);
      linePts.push(0, 0, 0, x, y, z);
    });
  };
  placeRing(
    SPECIE.filter((s) => s.gruppo === "flora"),
    4.1,
  );
  placeRing(
    SPECIE.filter((s) => s.gruppo === "fauna"),
    6.35,
  );

  HABITAT.forEach((h, i) => {
    const t = (i / HABITAT.length) * Math.PI * 2;
    const m = new THREE.Mesh(habGeo, new THREE.MeshBasicMaterial({ color: 0xede0c8 }));
    m.position.set(Math.cos(t) * 2.15, Math.sin(t * 0.5) * 0.4, Math.sin(t) * 2.15);
    m.userData.pick = { kind: "habitat", titolo: h.titolo, testo: h.testo } satisfies BioPick;
    pickables.push(m);
    scene.add(m);
  });

  const lg = new THREE.BufferGeometry();
  lg.setAttribute("position", new THREE.Float32BufferAttribute(linePts, 3));
  scene.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0xb5713a, transparent: true, opacity: 0.28 })));

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
  scene.add(
    new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: 0xede0c8,
        size: 0.06,
        transparent: true,
        opacity: 0.5,
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
      const hits = ray.intersectObjects(pickables);
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
    coreGeo.dispose();
    orbGeo.dispose();
    habGeo.dispose();
    lg.dispose();
    dustGeo.dispose();
    renderer.dispose();
  };
}
