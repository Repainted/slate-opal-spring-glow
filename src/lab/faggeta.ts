import * as THREE from "three";
import { addDuskLights, buildTerrain, duskSky, heightAt, makeRenderer, resizeRenderer } from "./geo";
import { metersAt } from "./relief";
import { ALBERI } from "./alberi";
import { loadCarta } from "./carta";
import { bindZoom, type ViewCtl } from "./view";

type Tree = { x: number; z: number; r: number };

export function startFaggeta(
  canvas: HTMLCanvasElement,
  opts: {
    keys: Set<string>;
    move: { x: number; y: number };
    look: { dx: number; dy: number };
    getPlaying: () => boolean;
    reduced: boolean;
    onHud: (h: { fps: number; heading: string }) => void;
    view: ViewCtl;
  },
) {
  const mobile = (canvas.clientWidth || 800) < 640;
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x121410, 0.045);
  const camera = new THREE.PerspectiveCamera(68, 1, 0.12, 90);
  const sky = duskSky();
  scene.add(sky);
  addDuskLights(scene);
  const maps = loadCarta();
  const terrain = buildTerrain(mobile ? 56 : 80, maps);
  scene.add(terrain.mesh);

  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();

  const n = mobile ? 55 : 110;
  const trunkGeo = new THREE.CylinderGeometry(0.18, 0.28, 4.2, 6);
  const canopyGeo = new THREE.ConeGeometry(1.6, 5.4, 7);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3a3328, roughness: 0.9 });
  const canopyMat = new THREE.MeshStandardMaterial({ color: 0x4a5a32, roughness: 0.85 });
  const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, n);
  const canopies = new THREE.InstancedMesh(canopyGeo, canopyMat, n);
  const dummy = new THREE.Object3D();
  const trees: Tree[] = [];
  let placed = 0;
  let guard = 0;
  while (placed < n && guard < 800) {
    guard++;
    const x = (Math.random() - 0.5) * 70;
    const z = (Math.random() - 0.5) * 70;
    const y = heightAt(x, z);
    const m = metersAt(x, z);
    if (m < 850 || m > 1480) continue;
    dummy.position.set(x, y + 2.1, z);
    dummy.rotation.y = Math.random() * Math.PI;
    dummy.updateMatrix();
    trunks.setMatrixAt(placed, dummy.matrix);
    dummy.position.y = y + 5.4;
    dummy.scale.setScalar(0.75 + Math.random() * 0.5);
    dummy.updateMatrix();
    canopies.setMatrixAt(placed, dummy.matrix);
    trees.push({ x, z, r: 1.15 });
    placed++;
  }
  trunks.instanceMatrix.needsUpdate = true;
  canopies.instanceMatrix.needsUpdate = true;
  scene.add(trunks, canopies);

  const nLec = mobile ? 18 : 36;
  const nNoc = mobile ? 12 : 24;
  const lecTrunkGeo = new THREE.CylinderGeometry(0.14, 0.22, 2.4, 6);
  const lecCanopyGeo = new THREE.IcosahedronGeometry(1.15, 1);
  const nocTrunkGeo = new THREE.CylinderGeometry(0.07, 0.11, 1.4, 5);
  const nocCanopyGeo = new THREE.SphereGeometry(0.95, 8, 6);
  const lecT = new THREE.MeshStandardMaterial({ color: ALBERI.leccio.tronco, roughness: 0.95 });
  const lecC = new THREE.MeshStandardMaterial({ color: ALBERI.leccio.chioma, roughness: 0.82 });
  const nocT = new THREE.MeshStandardMaterial({ color: ALBERI.nocciolo.tronco, roughness: 0.95 });
  const nocC = new THREE.MeshStandardMaterial({ color: ALBERI.nocciolo.chioma, roughness: 0.8 });
  const lecTrunks = new THREE.InstancedMesh(lecTrunkGeo, lecT, nLec);
  const lecCans = new THREE.InstancedMesh(lecCanopyGeo, lecC, nLec);
  const nocTrunks = new THREE.InstancedMesh(nocTrunkGeo, nocT, nNoc);
  const nocCans = new THREE.InstancedMesh(nocCanopyGeo, nocC, nNoc);

  const placeBelt = (
    count: number,
    minM: number,
    maxM: number,
    trunksM: THREE.InstancedMesh,
    cans: THREE.InstancedMesh,
    trunkH: number,
    canopyH: number,
    canopyS: number,
  ) => {
    let k = 0;
    let g = 0;
    while (k < count && g < 900) {
      g++;
      const x = (Math.random() - 0.5) * 78;
      const z = (Math.random() - 0.5) * 78;
      const m = metersAt(x, z);
      if (m < minM || m > maxM) continue;
      const y = heightAt(x, z);
      dummy.position.set(x, y + trunkH / 2, z);
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      trunksM.setMatrixAt(k, dummy.matrix);
      dummy.position.y = y + canopyH;
      dummy.scale.setScalar(canopyS * (0.75 + Math.random() * 0.45));
      dummy.updateMatrix();
      cans.setMatrixAt(k, dummy.matrix);
      k++;
    }
    trunksM.instanceMatrix.needsUpdate = true;
    cans.instanceMatrix.needsUpdate = true;
    scene.add(trunksM, cans);
  };
  placeBelt(nLec, 180, 720, lecTrunks, lecCans, 2.4, 2.6, 1);
  placeBelt(nNoc, 380, 920, nocTrunks, nocCans, 1.4, 1.7, 0.9);

  let yaw = 0;
  let pitch = 0.12;
  const pos = new THREE.Vector3(2, heightAt(2, 12) + 1.7, 12);
  camera.position.copy(pos);

  const parent = canvas.parentElement ?? canvas;
  const resize = () => resizeRenderer(renderer, camera, parent);
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(parent);

  const unZoom = bindZoom(canvas, (f) => {
    opts.view.zoom = THREE.MathUtils.clamp(opts.view.zoom * f, 0.55, 1.8);
  });
  let last = performance.now();
  let fpsT = 0;
  let frames = 0;
  let hudFps = 60;
  let alive = true;
  let raf = 0;

  const loop = (now: number) => {
    if (!alive) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    frames++;
    fpsT += dt;
    if (fpsT >= 0.4) {
      hudFps = Math.round(frames / fpsT);
      frames = 0;
      fpsT = 0;
    }

    maps.apply(terrain.mat, opts.view.carta);
    camera.fov = THREE.MathUtils.damp(camera.fov, 68 * opts.view.zoom, 8, dt);
    camera.updateProjectionMatrix();

    if (opts.getPlaying()) {
      yaw -= opts.look.dx * 0.0022;
      pitch -= opts.look.dy * 0.002;
      pitch = Math.max(-1.2, Math.min(1.1, pitch));
      opts.look.dx = 0;
      opts.look.dy = 0;

      forward.set(-Math.sin(yaw), 0, -Math.cos(yaw));
      right.set(Math.cos(yaw), 0, -Math.sin(yaw));
      let mx = opts.move.x;
      let my = opts.move.y;
      if (opts.keys.has("KeyW") || opts.keys.has("ArrowUp")) my += 1;
      if (opts.keys.has("KeyS") || opts.keys.has("ArrowDown")) my -= 1;
      if (opts.keys.has("KeyD") || opts.keys.has("ArrowRight")) mx += 1;
      if (opts.keys.has("KeyA") || opts.keys.has("ArrowLeft")) mx -= 1;
      const mag = Math.hypot(mx, my);
      if (mag > 1) {
        mx /= mag;
        my /= mag;
      }
      const speed = 6.5;
      pos.addScaledVector(forward, my * speed * dt);
      pos.addScaledVector(right, mx * speed * dt);
      for (const t of trees) {
        const dx = pos.x - t.x;
        const dz = pos.z - t.z;
        const d = Math.hypot(dx, dz);
        if (d < t.r && d > 0.001) {
          pos.x = t.x + (dx / d) * t.r;
          pos.z = t.z + (dz / d) * t.r;
        }
      }
      pos.x = THREE.MathUtils.clamp(pos.x, -38, 38);
      pos.z = THREE.MathUtils.clamp(pos.z, -38, 38);
      pos.y = heightAt(pos.x, pos.z) + 1.7;
    }

    camera.position.copy(pos);
    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;

    renderer.render(scene, camera);
    const deg = ((yaw * 180) / Math.PI + 360) % 360;
    const dirs = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
    opts.onHud({ fps: hudFps, heading: dirs[Math.round(deg / 45) % 8]! });
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    ro.disconnect();
    unZoom();
    maps.dispose();
    terrain.geo.dispose();
    terrain.mat.dispose();
    sky.geometry.dispose();
    (sky.material as THREE.Material).dispose();
    trunkGeo.dispose();
    canopyGeo.dispose();
    trunkMat.dispose();
    canopyMat.dispose();
    lecTrunkGeo.dispose();
    lecCanopyGeo.dispose();
    nocTrunkGeo.dispose();
    nocCanopyGeo.dispose();
    lecT.dispose();
    lecC.dispose();
    nocT.dispose();
    nocC.dispose();
    renderer.dispose();
  };
}
