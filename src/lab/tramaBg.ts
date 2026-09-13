import * as THREE from "three";
import { COMUNI } from "@/data/comuni";
import { addDuskLights, duskSky, projectComune, resizeRenderer } from "./geo";

const COPPER = 0xc4a07a;
const CREAM = 0xede0c8;
const OLIVE = 0x8b9a66;

function colorOf(p: "Latina" | "Roma" | "Frosinone") {
  return p === "Roma" ? CREAM : p === "Frosinone" ? OLIVE : COPPER;
}

function nodes3d() {
  const lngs = COMUNI.map((c) => c.lng);
  const lats = COMUNI.map((c) => c.lat);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  return COMUNI.map((c) => {
    const u = (c.lng - minLng) / (maxLng - minLng || 1);
    const v = (c.lat - minLat) / (maxLat - minLat || 1);
    const { x: gx, z: gz } = projectComune(c.lng, c.lat);
    const peakL = Math.exp(-((u - 0.3) ** 2 / 0.045 + (v - 0.52) ** 2 / 0.09));
    const peakR = Math.exp(-((u - 0.63) ** 2 / 0.038 + (v - 0.46) ** 2 / 0.075)) * 1.35;
    return {
      x: (u - 0.5) * 34 + gx * 0.02,
      y: 1.8 + (peakL + peakR) * 10.5 + (c.altitudine / 1536) * 2.2,
      z: (0.5 - v) * 14,
      provincia: c.provincia,
      tci: c.bandieraArancione,
    };
  });
}

/** Sfondo home: 26 nodi puntiformi, vista frontale, volume lento. */
export function startTramaBg(canvas: HTMLCanvasElement, reduced: boolean) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: canvas.clientWidth > 700,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x12151b, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x12151b, 0.022);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.2, 120);
  scene.add(duskSky());
  addDuskLights(scene);

  const pts = nodes3d();
  const pos = new Float32Array(pts.length * 3);
  const col = new Float32Array(pts.length * 3);
  const tmpC = new THREE.Color();
  pts.forEach((p, i) => {
    pos[i * 3] = p.x;
    pos[i * 3 + 1] = p.y;
    pos[i * 3 + 2] = p.z;
    tmpC.setHex(colorOf(p.provincia));
    col[i * 3] = tmpC.r;
    col[i * 3 + 1] = tmpC.g;
    col[i * 3 + 2] = tmpC.b;
  });
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  pGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const pMat = new THREE.PointsMaterial({
      size: 0.42,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      sizeAttenuation: true,
    });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  const linePos: number[] = [];
  for (let i = 0; i < pts.length; i++) {
    let d1 = Infinity,
      d2 = Infinity,
      j1 = -1,
      j2 = -1;
    for (let j = 0; j < pts.length; j++) {
      if (i === j) continue;
      const dx = pts[i]!.x - pts[j]!.x;
      const dy = pts[i]!.y - pts[j]!.y;
      const dz = pts[i]!.z - pts[j]!.z;
      const d = dx * dx + dy * dy + dz * dz;
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
      linePos.push(pts[i]!.x, pts[i]!.y, pts[i]!.z, pts[j]!.x, pts[j]!.y, pts[j]!.z);
    }
  }
  const lGeo = new THREE.BufferGeometry();
  lGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
  scene.add(
    new THREE.LineSegments(
      lGeo,
      new THREE.LineBasicMaterial({
        color: COPPER,
        transparent: true,
        opacity: 0.38,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    ),
  );

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(18.2, 18.55, 96),
    new THREE.MeshBasicMaterial({ color: COPPER, transparent: true, opacity: 0.18, side: THREE.DoubleSide }),
  );
  ring.position.set(1.5, 6.4, -0.6);
  scene.add(ring);

  const dustN = reduced ? 24 : 70;
  const dPos = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) {
    dPos[i * 3] = (Math.random() - 0.5) * 36;
    dPos[i * 3 + 1] = 1 + Math.random() * 16;
    dPos[i * 3 + 2] = (Math.random() - 0.5) * 18;
  }
  const dGeo = new THREE.BufferGeometry();
  dGeo.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
  const dust = new THREE.Points(
    dGeo,
    new THREE.PointsMaterial({
      color: 0xd8b896,
      size: 0.12,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  scene.add(dust);

  const parent = canvas.parentElement ?? canvas;
  const resize = () => resizeRenderer(renderer, camera, parent);
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(parent);

  let yaw = 0;
  let last = performance.now();
  let alive = true;
  const look = new THREE.Vector3(2.2, 6.2, 0);

  const loop = (now: number) => {
    if (!alive) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    if (!reduced) yaw += dt * 0.055;
    const r = 24;
    camera.position.set(Math.sin(yaw) * r * 0.22, 6.6, r);
    camera.lookAt(look);
    pMat.size = 0.38 + Math.sin(now * 0.0018) * 0.06;
    dust.rotation.y += dt * 0.03;
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  return () => {
    alive = false;
    ro.disconnect();
    pGeo.dispose();
    pMat.dispose();
    lGeo.dispose();
    dGeo.dispose();
    renderer.dispose();
  };
}
