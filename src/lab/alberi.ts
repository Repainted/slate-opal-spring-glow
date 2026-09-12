import * as THREE from "three";
import { makeRenderer, resizeRenderer } from "./geo";
import { buildLeccio, RECIPES } from "./treeRecipes";
import { OrbitCam } from "./view";

export type AlberoId =
  | "leccio"
  | "nocciolo"
  | "agrifoglio"
  | "oleastro"
  | "mirto"
  | "magnolia"
  | "faggio"
  | "cerro"
  | "roverella"
  | "sughera"
  | "castagno"
  | "olmo"
  | "acero"
  | "carpino"
  | "tiglio"
  | "olivo";

export const ALBERI: Record<
  AlberoId,
  { id: AlberoId; comune: string; scientifico: string; forma: string; tronco: number; chioma: number }
> = {
  leccio: { id: "leccio", comune: "Leccio", scientifico: "Quercus ilex", forma: "chioma tonda", tronco: 0x4a3b2c, chioma: 0x39421f },
  nocciolo: { id: "nocciolo", comune: "Nocciolo", scientifico: "Corylus avellana", forma: "cespuglio", tronco: 0x6b573f, chioma: 0x4a6027 },
  agrifoglio: { id: "agrifoglio", comune: "Agrifoglio", scientifico: "Ilex aquifolium", forma: "piramidale", tronco: 0x6a6258, chioma: 0x1f3d22 },
  oleastro: { id: "oleastro", comune: "Oleastro", scientifico: "Olea europaea var. sylvestris", forma: "cespuglio", tronco: 0x7a6a52, chioma: 0x7c8c60 },
  mirto: { id: "mirto", comune: "Mirto", scientifico: "Myrtus communis", forma: "cespuglio", tronco: 0x6e5c47, chioma: 0x2f5230 },
  magnolia: { id: "magnolia", comune: "Magnolia", scientifico: "Magnolia grandiflora", forma: "chioma ampia", tronco: 0x4a4034, chioma: 0x2b4a2b },
  faggio: { id: "faggio", comune: "Faggio", scientifico: "Fagus sylvatica", forma: "chioma ampia", tronco: 0x8f867a, chioma: 0x43581f },
  cerro: { id: "cerro", comune: "Cerro", scientifico: "Quercus cerris", forma: "chioma ampia", tronco: 0x5a4a3a, chioma: 0x435c29 },
  roverella: { id: "roverella", comune: "Roverella", scientifico: "Quercus pubescens", forma: "cespuglio", tronco: 0x7a6a52, chioma: 0x5a6c3a },
  sughera: { id: "sughera", comune: "Sughera", scientifico: "Quercus suber", forma: "chioma tonda", tronco: 0x8a7a5f, chioma: 0x3a4d2c },
  castagno: { id: "castagno", comune: "Castagno", scientifico: "Castanea sativa", forma: "chioma ampia", tronco: 0x4a3c2e, chioma: 0x3f5a2a },
  olmo: { id: "olmo", comune: "Olmo", scientifico: "Ulmus minor", forma: "chioma alta", tronco: 0x5a4a3a, chioma: 0x435c29 },
  acero: { id: "acero", comune: "Acero di monte", scientifico: "Acer opalus", forma: "chioma ampia", tronco: 0x6a5f52, chioma: 0x3f5a30 },
  carpino: { id: "carpino", comune: "Carpino nero", scientifico: "Ostrya carpinifolia", forma: "chioma ovale", tronco: 0x6e5c46, chioma: 0x4a5d30 },
  tiglio: { id: "tiglio", comune: "Tiglio", scientifico: "Tilia platyphyllos", forma: "chioma ampia", tronco: 0x574636, chioma: 0x3f5a2e },
  olivo: { id: "olivo", comune: "Olivo", scientifico: "Olea europaea", forma: "cespuglio", tronco: 0x8c8168, chioma: 0x6b7a52 },
};

function fitAlbero(root: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const s = 2.6 / Math.max(size.y, 0.01);
  root.position.sub(center);
  root.position.multiplyScalar(s);
  root.scale.multiplyScalar(s);
  root.position.y -= box.min.y * s;
}

export function makeAlbero(id: AlberoId, scale = 1) {
  const g = id === "leccio" ? buildLeccio() : RECIPES[id]!();
  fitAlbero(g);
  g.scale.multiplyScalar(scale);
  g.userData.albero = id;
  return g;
}

export const makeLeccio = (scale = 1) => makeAlbero("leccio", scale);

export function startAlbero(canvas: HTMLCanvasElement, id: AlberoId) {
  const renderer = makeRenderer(canvas);
  renderer.setClearColor(0x121410, 1);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x121410, 0.08);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
  scene.add(new THREE.AmbientLight(0xc9c4b0, 0.8));
  const key = new THREE.DirectionalLight(0xf2e6c9, 1.7);
  key.position.set(-3, 6, 4);
  scene.add(key);
  const fill = new THREE.PointLight(0xb5713a, 1.4, 18);
  fill.position.set(2.5, 1.2, 2);
  scene.add(fill);

  const tree = makeAlbero(id);
  scene.add(tree);
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(2.8, 28),
    new THREE.MeshStandardMaterial({ color: 0x1c1914, roughness: 1 }),
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const parent = canvas.parentElement ?? canvas;
  const resize = () => resizeRenderer(renderer, camera, parent);
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(parent);

  const orbit = new OrbitCam({ radius: 5.6, minR: 2.4, maxR: 12, rotY: 0.55, rotX: 0.34, auto: true });
  orbit.look.set(0, 1.3, 0);
  const bound = orbit.bind(canvas);

  let last = performance.now();
  let alive = true;
  let raf = 0;
  const loop = (now: number) => {
    if (!alive) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    orbit.step(dt, camera, 0.35);
    tree.rotation.z = Math.sin(now * 0.0011) * 0.025;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    bound.dispose();
    ro.disconnect();
    tree.userData.dispose?.();
    ground.geometry.dispose();
    (ground.material as THREE.Material).dispose();
    renderer.dispose();
  };
}

export const startLeccio = (c: HTMLCanvasElement) => startAlbero(c, "leccio");
