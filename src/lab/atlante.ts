import * as THREE from "three";
import { loadCarta } from "./carta";
import {
  addDuskLights,
  buildTerrain,
  copperDust,
  duskSky,
  makeNodes,
  makeRenderer,
  NODE_POINTS,
  resizeRenderer,
} from "./geo";
import { OrbitCam, type ViewCtl } from "./view";

export type Label = { slug: string; nome: string; x: number; y: number; tci: boolean };

export function startAtlante(
  canvas: HTMLCanvasElement,
  opts: {
    reduced: boolean;
    getSlug: () => string | null;
    onPick: (slug: string) => void;
    onHud: (h: { labels: Label[] }) => void;
    view: ViewCtl;
  },
) {
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x17161a, 0.012);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.2, 220);
  const sky = duskSky();
  scene.add(sky);
  addDuskLights(scene);
  const maps = loadCarta();
  const terrain = buildTerrain(canvas.clientWidth < 640 ? 72 : 128, maps);
  scene.add(terrain.mesh);
  const nodes = makeNodes();
  scene.add(nodes.group);
  const dust = copperDust(50);
  scene.add(dust);

  const parent = canvas.parentElement ?? canvas;
  const resize = () => resizeRenderer(renderer, camera, parent);
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(parent);

  const orbit = new OrbitCam({ radius: 46, minR: 4, maxR: 100, rotY: 0.55, rotX: 0.38, auto: !opts.reduced });
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const want = new THREE.Vector3();
  const proj = new THREE.Vector3();
  let lastHud = 0;

  const bound = orbit.bind(canvas, {
    wasd: true,
    onZoom: (f) => {
      opts.view.zoom = THREE.MathUtils.clamp(opts.view.zoom * f, 0.22, 3.2);
    },
    onTap: (e) => {
      const r = canvas.getBoundingClientRect();
      ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(nodes.meshes)[0];
      if (hit?.object.userData.slug) opts.onPick(hit.object.userData.slug as string);
    },
  });

  let last = performance.now();
  let alive = true;
  let raf = 0;
  let lastSlug: string | null = null;

  const loop = (now: number) => {
    if (!alive) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    maps.apply(terrain.mat, opts.view.carta);
    orbit.panKeys(bound.keys, dt);

    const slug = opts.getSlug();
    const focus = NODE_POINTS.find((n) => n.slug === slug);
    const base = focus ? 14 : 48;
    const targetR = THREE.MathUtils.clamp(base * opts.view.zoom, orbit.minR, orbit.maxR);
    if (slug !== lastSlug) {
      orbit.radius = targetR;
      lastSlug = slug;
    } else {
      orbit.radius = THREE.MathUtils.damp(orbit.radius, targetR, 3.2, dt);
    }
    if (focus) want.set(focus.x, focus.y + 0.6, focus.z);
    else want.set(0, 5, 0);
    if (!orbit.dragging) orbit.look.lerp(want, 1 - Math.exp(-2.2 * dt));
    orbit.step(dt, camera, 1);

    const pulse = 1 + Math.sin(now * 0.003) * 0.1;
    for (const m of nodes.meshes) {
      m.scale.setScalar((m.userData.slug === slug ? 2.1 : 1) * pulse);
    }
    dust.rotation.y += dt * 0.03;
    renderer.render(scene, camera);

    if (now - lastHud > 180) {
      lastHud = now;
      const w = parent.clientWidth || 1;
      const h = parent.clientHeight || 1;
      const labels: Label[] = [];
      for (const n of NODE_POINTS) {
        if (slug && n.slug !== slug) {
          const d = (n.x - orbit.look.x) ** 2 + (n.z - orbit.look.z) ** 2;
          if (d > 380) continue;
        }
        proj.set(n.x, n.y + 1.4, n.z).project(camera);
        if (proj.z > 1) continue;
        labels.push({
          slug: n.slug,
          nome: n.nome,
          x: (proj.x * 0.5 + 0.5) * w,
          y: (-proj.y * 0.5 + 0.5) * h,
          tci: n.bandieraArancione,
        });
      }
      if (!slug) {
        labels.sort((a, b) => a.nome.localeCompare(b.nome));
        opts.onHud({ labels: labels.slice(0, 8) });
      } else opts.onHud({ labels });
    }
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    ro.disconnect();
    bound.dispose();
    maps.dispose();
    terrain.geo.dispose();
    terrain.mat.dispose();
    nodes.geo.dispose();
    nodes.mat.dispose();
    nodes.tci.dispose();
    nodes.lg.dispose();
    (dust.geometry as THREE.BufferGeometry).dispose();
    (dust.material as THREE.Material).dispose();
    sky.geometry.dispose();
    (sky.material as THREE.Material).dispose();
    renderer.dispose();
  };
}
