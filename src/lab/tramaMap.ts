import * as THREE from "three";
import { COMUNI } from "@/data/comuni";
import { addDuskLights, duskSky, projectComune, resizeRenderer } from "./geo";

const COPPER = 0xc4a07a;
const CREAM = 0xede0c8;
const OLIVE = 0x8b9a66;

function colorOf(p: "Latina" | "Roma" | "Frosinone") {
  return p === "Roma" ? CREAM : p === "Frosinone" ? OLIVE : COPPER;
}

type Node = {
  slug: string;
  nome: string;
  mesh: THREE.Mesh;
  mat: THREE.MeshBasicMaterial;
  base: THREE.Color;
  x: number;
  y: number;
  z: number;
};

function layout() {
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
      slug: c.slug,
      nome: c.nome,
      provincia: c.provincia,
      tci: c.bandieraArancione,
      x: (u - 0.5) * 34 + gx * 0.02,
      y: 1.8 + (peakL + peakR) * 10.5 + (c.altitudine / 1536) * 2.2,
      z: (0.5 - v) * 14,
    };
  });
}

export function startTramaMap(
  canvas: HTMLCanvasElement,
  opts: {
    reduced: boolean;
    getActive: () => string | null;
    onPick: (slug: string) => void;
    onHover: (nome: string | null) => void;
  },
) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: canvas.clientWidth > 500,
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

  const pts = layout();
  const geo = new THREE.SphereGeometry(0.5, 16, 12);
  const pickGeo = new THREE.SphereGeometry(1.35, 10, 8);
  const pickMat = new THREE.MeshBasicMaterial({ visible: false });
  const nodes: Node[] = pts.map((p) => {
    const base = new THREE.Color(colorOf(p.provincia));
    const mat = new THREE.MeshBasicMaterial({ color: base.clone(), transparent: true, opacity: 0.96 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(p.x, p.y, p.z);
    mesh.userData.slug = p.slug;
    mesh.scale.setScalar(p.tci ? 1.15 : 1);
    const pick = new THREE.Mesh(pickGeo, pickMat);
    pick.userData.slug = p.slug;
    mesh.add(pick);
    scene.add(mesh);
    return { slug: p.slug, nome: p.nome, mesh, mat, base, x: p.x, y: p.y, z: p.z };
  });

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
        opacity: 0.4,
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

  const parent = canvas.parentElement ?? canvas;
  const resize = () => resizeRenderer(renderer, camera, parent);
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(parent);

  const ray = new THREE.Raycaster();
  ray.params.Points = { threshold: 0.6 };
  const ndc = new THREE.Vector2();
  const look = new THREE.Vector3(2.2, 6.4, 0);
  const hot = new THREE.Color(CREAM);

  const hitAt = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    ray.setFromCamera(ndc, camera);
    return ray.intersectObjects(
      nodes.map((n) => n.mesh),
      true,
    )[0];
  };

  let down: { x: number; y: number } | null = null;
  let hoverSlug: string | null = null;

  const onDown = (e: PointerEvent) => {
    down = { x: e.clientX, y: e.clientY };
  };
  const onMove = (e: PointerEvent) => {
    const hit = hitAt(e);
    const slug = hit?.object.userData.slug as string | undefined;
    canvas.style.cursor = slug ? "pointer" : "grab";
    if (slug !== hoverSlug) {
      hoverSlug = slug ?? null;
      const n = nodes.find((x) => x.slug === slug);
      opts.onHover(n?.nome ?? null);
    }
  };
  const onUp = (e: PointerEvent) => {
    if (!down) return;
    const dx = e.clientX - down.x;
    const dy = e.clientY - down.y;
    down = null;
    if (dx * dx + dy * dy > 64) return;
    const hit = hitAt(e);
    const slug = hit?.object.userData.slug as string | undefined;
    if (slug) opts.onPick(slug);
  };
  const onLeave = () => {
    hoverSlug = null;
    opts.onHover(null);
    canvas.style.cursor = "grab";
  };

  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointerleave", onLeave);

  let yaw = 0.15;
  let last = performance.now();
  let alive = true;

  const loop = (now: number) => {
    if (!alive) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    if (!opts.reduced) yaw += dt * 0.05;
    const r = 22;
    camera.position.set(Math.sin(yaw) * r * 0.22, 6.7, r);
    camera.lookAt(look);

    const active = opts.getActive();
    for (const n of nodes) {
      const on = n.slug === active;
      const over = n.slug === hoverSlug;
      n.mat.color.copy(on ? hot : n.base);
      n.mesh.scale.setScalar((on ? 1.7 : over ? 1.35 : 1) * (1 + Math.sin(now * 0.0018 + n.x) * 0.04));
    }

    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  return () => {
    alive = false;
    ro.disconnect();
    canvas.removeEventListener("pointerdown", onDown);
    canvas.removeEventListener("pointermove", onMove);
    canvas.removeEventListener("pointerup", onUp);
    canvas.removeEventListener("pointerleave", onLeave);
    geo.dispose();
    pickGeo.dispose();
    pickMat.dispose();
    lGeo.dispose();
    for (const n of nodes) n.mat.dispose();
    renderer.dispose();
  };
}
