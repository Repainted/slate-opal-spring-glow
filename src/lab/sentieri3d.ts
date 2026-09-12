import * as THREE from "three";
import { SENTIERI } from "@/data/sentieri";
import { QUOTE, TRACCE, type Punto3 } from "@/data/tracce";
import { loadCarta } from "./carta";
import {
  addDuskLights,
  buildTerrain,
  copperDust,
  duskSky,
  heightAt,
  makeNodes,
  makeRenderer,
  projectComune,
  resizeRenderer,
} from "./geo";
import { metersAt } from "./relief";
import { OrbitCam, type ViewCtl } from "./view";

const COL: Record<string, number> = { T: 0xede0c8, E: 0xce8b4e, EE: 0x8b9a66 };

function curveOf(punti: Punto3[], closed: boolean) {
  const vecs = punti.map((p) => new THREE.Vector3(p.x, p.y, p.z));
  return new THREE.CatmullRomCurve3(vecs, closed, "catmullrom", 0.35);
}

export function startSentieri3d(
  canvas: HTMLCanvasElement,
  opts: {
    reduced: boolean;
    getSlug: () => string;
    getWalk: () => boolean;
    onPick: (slug: string) => void;
    onWalk: (u: { t: number; alt: number }) => void;
    view: ViewCtl;
  },
) {
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x17161a, 0.015);
  const camera = new THREE.PerspectiveCamera(54, 1, 0.2, 220);
  const sky = duskSky();
  scene.add(sky);
  addDuskLights(scene);
  const maps = loadCarta();
  const terrain = buildTerrain(canvas.clientWidth < 640 ? 72 : 120, maps);
  scene.add(terrain.mesh);
  const nodes = makeNodes();
  scene.add(nodes.group);
  const dust = copperDust(40);
  scene.add(dust);

  const tubes: { slug: string; mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; mat: THREE.MeshBasicMaterial }[] = [];
  const geos: THREE.BufferGeometry[] = [];

  for (const tr of TRACCE) {
    const sent = SENTIERI.find((s) => s.slug === tr.slug);
    const curve = curveOf(tr.punti, tr.closed);
    const geo = new THREE.TubeGeometry(curve, Math.max(48, tr.punti.length * 2), 0.55, 6, tr.closed);
    geos.push(geo);
    const mat = new THREE.MeshBasicMaterial({
      color: COL[sent?.difficolta ?? "E"] ?? 0xb5713a,
      transparent: true,
      opacity: 0.32,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData.slug = tr.slug;
    scene.add(mesh);
    tubes.push({ slug: tr.slug, mesh, curve, mat });
  }

  const walkerGeo = new THREE.SphereGeometry(0.55, 12, 10);
  const walkerMat = new THREE.MeshBasicMaterial({ color: 0xede0c8 });
  const walker = new THREE.Mesh(walkerGeo, walkerMat);
  scene.add(walker);

  const peakGeo = new THREE.OctahedronGeometry(0.7, 0);
  const peakMat = new THREE.MeshBasicMaterial({ color: 0xede0c8 });
  const peaks: THREE.Mesh[] = [];
  for (const q of Object.values(QUOTE)) {
    const p = projectComune(q.lng, q.lat);
    const m = new THREE.Mesh(peakGeo, peakMat);
    m.position.set(p.x, heightAt(p.x, p.z) + 1.4, p.z);
    scene.add(m);
    peaks.push(m);
  }

  const parent = canvas.parentElement ?? canvas;
  const resize = () => resizeRenderer(renderer, camera, parent);
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(parent);

  const orbit = new OrbitCam({ radius: 20, minR: 4, maxR: 80, rotY: 0.7, rotX: 0.38, auto: !opts.reduced });
  const tmp = new THREE.Vector3();
  const tan = new THREE.Vector3();
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let walkT = 0;
  let walkDir = 1;

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
      const hit = ray.intersectObjects(tubes.map((t) => t.mesh))[0];
      if (hit?.object.userData.slug) opts.onPick(hit.object.userData.slug as string);
    },
  });

  let last = performance.now();
  let alive = true;
  let raf = 0;
  let lastHud = 0;

  const loop = (now: number) => {
    if (!alive) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    maps.apply(terrain.mat, opts.view.carta);
    orbit.panKeys(bound.keys, dt);
    if (opts.getWalk()) orbit.auto = false;

    const slug = opts.getSlug();
    const active = tubes.find((t) => t.slug === slug) ?? tubes[0]!;
    for (const t of tubes) {
      const on = t.slug === slug;
      t.mat.opacity = on ? 1 : 0.38;
      t.mesh.scale.setScalar(on ? 1.55 : 1);
    }

    const mid = active.curve.getPointAt(0.5, tmp);
    if (!orbit.dragging && !opts.getWalk()) orbit.look.lerp(mid, 1 - Math.exp(-2.2 * dt));
    orbit.radius = THREE.MathUtils.damp(
      orbit.radius,
      THREE.MathUtils.clamp(20 * opts.view.zoom, orbit.minR, orbit.maxR),
      4,
      dt,
    );

    const walking = opts.getWalk();
    if (walking) {
      if (active.curve.closed) {
        walkT = (walkT + dt * 0.055) % 1;
      } else {
        walkT += dt * 0.07 * walkDir;
        if (walkT > 0.999) {
          walkT = 0.999;
          walkDir = -1;
        }
        if (walkT < 0.001) {
          walkT = 0.001;
          walkDir = 1;
        }
      }
      const u = THREE.MathUtils.euclideanModulo(walkT, 1);
      active.curve.getPointAt(u, walker.position);
      active.curve.getTangentAt(u, tan);
      camera.position.copy(walker.position).addScaledVector(tan, -6.5 * opts.view.zoom);
      camera.position.y += 2.6;
      tmp.copy(walker.position).addScaledVector(tan, 4);
      camera.lookAt(tmp);
      if (now - lastHud > 120) {
        lastHud = now;
        opts.onWalk({ t: u, alt: Math.round(metersAt(walker.position.x, walker.position.z)) });
      }
    } else {
      walkT = 0;
      walkDir = 1;
      orbit.step(dt, camera, 1.1);
      active.curve.getPointAt(0, walker.position);
    }

    dust.rotation.y += dt * 0.03;
    renderer.render(scene, camera);
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
    walkerGeo.dispose();
    walkerMat.dispose();
    peakGeo.dispose();
    peakMat.dispose();
    for (const g of geos) g.dispose();
    for (const t of tubes) t.mat.dispose();
    (dust.geometry as THREE.BufferGeometry).dispose();
    (dust.material as THREE.Material).dispose();
    sky.geometry.dispose();
    (sky.material as THREE.Material).dispose();
    renderer.dispose();
  };
}
