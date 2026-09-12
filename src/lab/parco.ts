import * as THREE from "three";
import { SITI, VETTE, type SitoNatura } from "@/data/parco";
import { loadCarta } from "./carta";
import { addDuskLights, buildTerrain, duskSky, heightAt, makeRenderer, resizeRenderer } from "./geo";
import { metersAt, projectComune } from "./relief";
import { OrbitCam, type ViewCtl } from "./view";

export type ParcoPick = SitoNatura;
export type ParcoLayer = "zps" | "siti" | "vette";

function overlayZps(segments: number) {
  const geo = new THREE.PlaneGeometry(200, 160, segments, Math.round(segments * 0.8));
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const col = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const m = metersAt(x, z);
    const on = m > 680;
    pos.setY(i, on ? heightAt(x, z) + 0.18 : -4);
    const t = Math.min(1, Math.max(0, (m - 680) / 800));
    col[i * 3] = 0.42 + t * 0.2;
    col[i * 3 + 1] = 0.48 + t * 0.12;
    col[i * 3 + 2] = 0.22;
  }
  pos.needsUpdate = true;
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  geo.computeVertexNormals();
  const mat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.38,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  return { mesh: new THREE.Mesh(geo, mat), geo, mat };
}

function marker(s: SitoNatura, color: number, yOff: number) {
  const { x, z } = projectComune(s.lng, s.lat);
  const y = heightAt(x, z) + yOff;
  const geo =
    s.tipo === "vetta"
      ? new THREE.ConeGeometry(0.38, 1.1, 5)
      : s.tipo === "ZPS"
        ? new THREE.TorusGeometry(s.r * 0.22, 0.12, 8, 48)
        : new THREE.TorusGeometry(Math.max(1.6, s.r * 0.45), 0.1, 8, 40);
  const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: s.tipo === "ZPS" ? 0.45 : 0.9 });
  const m = new THREE.Mesh(geo, mat);
  if (s.tipo === "vetta") {
    m.position.set(x, y + 0.55, z);
  } else {
    m.rotation.x = Math.PI / 2;
    m.position.set(x, y + 0.25, z);
  }
  m.userData.sito = s;
  return { mesh: m, geo, mat };
}

export function startParco(
  canvas: HTMLCanvasElement,
  opts: {
    reduced: boolean;
    onPick: (s: ParcoPick | null) => void;
    view: ViewCtl;
    layers: { current: Set<ParcoLayer> };
  },
) {
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x17161a, 0.014);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.2, 220);
  scene.add(duskSky());
  addDuskLights(scene);
  const maps = loadCarta();
  const terrain = buildTerrain(canvas.clientWidth < 640 ? 72 : 120, maps);
  scene.add(terrain.mesh);

  const zps = overlayZps(canvas.clientWidth < 640 ? 48 : 72);
  scene.add(zps.mesh);

  const pickables: THREE.Object3D[] = [];
  const marks: { mesh: THREE.Mesh; sito: SitoNatura; layer: ParcoLayer }[] = [];
  const geos: THREE.BufferGeometry[] = [zps.geo];
  const mats: THREE.Material[] = [zps.mat];

  for (const s of SITI) {
    const color = s.tipo === "ZPS" ? 0x8b9a66 : 0xce8b4e;
    const mk = marker(s, color, 0.2);
    scene.add(mk.mesh);
    pickables.push(mk.mesh);
    marks.push({ mesh: mk.mesh, sito: s, layer: s.tipo === "ZPS" ? "zps" : "siti" });
    geos.push(mk.geo);
    mats.push(mk.mat);
  }
  for (const v of VETTE) {
    const mk = marker(v, 0xede0c8, 0.3);
    scene.add(mk.mesh);
    pickables.push(mk.mesh);
    marks.push({ mesh: mk.mesh, sito: v, layer: "vette" });
    geos.push(mk.geo);
    mats.push(mk.mat);
  }

  const parent = canvas.parentElement ?? canvas;
  const resize = () => resizeRenderer(renderer, camera, parent);
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(parent);

  const orbit = new OrbitCam({ radius: 42, minR: 6, maxR: 90, rotY: 0.7, rotX: 0.42, auto: !opts.reduced });
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();

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
      const hit = ray.intersectObjects(pickables)[0];
      const sito = hit?.object.userData.sito as SitoNatura | undefined;
      opts.onPick(sito ?? null);
    },
  });

  let last = performance.now();
  let alive = true;
  let raf = 0;

  const loop = (now: number) => {
    if (!alive) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    maps.apply(terrain.mat, opts.view.carta);
    orbit.panKeys(bound.keys, dt);
    const targetR = THREE.MathUtils.clamp(42 * opts.view.zoom, orbit.minR, orbit.maxR);
    orbit.radius = THREE.MathUtils.damp(orbit.radius, targetR, 3.2, dt);
    orbit.step(dt, camera, 1);
    zps.mesh.visible = opts.layers.current.has("zps");
    for (const mk of marks) {
      mk.mesh.visible = opts.layers.current.has(mk.layer);
      if (mk.mesh.visible && mk.layer === "vette") mk.mesh.rotation.y += dt * 0.4;
    }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    bound.dispose();
    ro.disconnect();
    maps.dispose();
    terrain.geo.dispose();
    terrain.mat.dispose();
    for (const g of geos) g.dispose();
    for (const m of mats) m.dispose();
    renderer.dispose();
  };
}
