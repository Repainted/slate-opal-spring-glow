import * as THREE from "three";
import { ALBERI, makeAlbero, type AlberoId } from "./alberi";
import { makeRenderer, resizeRenderer } from "./geo";
import { OrbitCam } from "./view";

export function startGrove(
  canvas: HTMLCanvasElement,
  opts: { reduced: boolean; onPick: (id: AlberoId) => void },
) {
  const renderer = makeRenderer(canvas);
  renderer.setClearColor(0x121410, 1);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x121410, 0.06);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
  scene.add(new THREE.AmbientLight(0xc9c4b0, 0.75));
  const key = new THREE.DirectionalLight(0xf2e6c9, 1.5);
  key.position.set(-4, 8, 5);
  scene.add(key);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(8, 32),
    new THREE.MeshStandardMaterial({ color: 0x1a1814, roughness: 1 }),
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const pickables: THREE.Object3D[] = [];
  const ids = Object.keys(ALBERI) as AlberoId[];
  ids.forEach((id, i) => {
    const t = makeAlbero(id, 1.15);
    t.position.set((i - (ids.length - 1) / 2) * 4.4, 0, 0);
    t.rotation.y = i * 0.4;
    t.userData.albero = id;
    scene.add(t);
    pickables.push(t);
    t.traverse((o) => {
      o.userData.albero = id;
    });
  });

  const parent = canvas.parentElement ?? canvas;
  const resize = () => resizeRenderer(renderer, camera, parent);
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(parent);

  const orbit = new OrbitCam({ radius: 11, minR: 5, maxR: 22, rotY: 0.4, rotX: 0.28, auto: !opts.reduced });
  orbit.look.set(0, 1.2, 0);
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const bound = orbit.bind(canvas, {
    onTap: (e) => {
      const r = canvas.getBoundingClientRect();
      ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(pickables, true)[0];
      const id = hit?.object.userData.albero as AlberoId | undefined;
      if (id) opts.onPick(id);
    },
  });

  let last = performance.now();
  let alive = true;
  let raf = 0;
  const loop = (now: number) => {
    if (!alive) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    orbit.step(dt, camera, 0.4);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    bound.dispose();
    ro.disconnect();
    pickables.forEach((t) => t.userData.dispose?.());
    ground.geometry.dispose();
    (ground.material as THREE.Material).dispose();
    renderer.dispose();
  };
}
