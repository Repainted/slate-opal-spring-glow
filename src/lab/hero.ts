import * as THREE from "three";
import {
  addDuskLights,
  buildTerrain,
  copperDust,
  duskSky,
  makeNodes,
  makeRenderer,
  resizeRenderer,
} from "./geo";

export function startHero(canvas: HTMLCanvasElement, reduced: boolean) {
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x17161a, 0.016);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.2, 220);
  const sky = duskSky();
  scene.add(sky);
  addDuskLights(scene);
  const terrain = buildTerrain(canvas.clientWidth < 640 ? 56 : 96);
  scene.add(terrain.mesh);
  const nodes = makeNodes();
  scene.add(nodes.group);
  const dust = copperDust(56);
  scene.add(dust);

  const parent = canvas.parentElement ?? canvas;
  const resize = () => resizeRenderer(renderer, camera, parent);
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(parent);

  let t = 0.8;
  let last = performance.now();
  let alive = true;
  let raf = 0;

  const loop = (now: number) => {
    if (!alive) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    if (!reduced) t += dt * 0.08;
    const r = 46;
    camera.position.set(Math.sin(t) * r, 18, Math.cos(t) * r);
    camera.lookAt(0, 4.5, 0);
    const pulse = 1 + Math.sin(now * 0.003) * 0.14;
    for (const m of nodes.meshes) m.scale.setScalar(pulse);
    dust.rotation.y += dt * 0.04;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    ro.disconnect();
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
