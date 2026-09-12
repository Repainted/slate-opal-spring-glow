import * as THREE from "three";
import type { Provincia } from "@/data/types";
import { loadCarta } from "./carta";
import {
  addDuskLights,
  buildTerrain,
  copperDust,
  duskSky,
  heightAt,
  makeNodes,
  makeRenderer,
  nearestNode,
  resizeRenderer,
} from "./geo";
import { bindZoom, type ViewCtl } from "./view";
import { Y_PER_M } from "./relief";

export type ControlsProbe = {
  getYaw: () => number;
  getSpeed: () => number;
  setKeys: (codes: string[]) => void;
};

export function startVolo(
  canvas: HTMLCanvasElement,
  opts: {
    keys: Set<string>;
    getPlaying: () => boolean;
    reduced: boolean;
    onHud: (h: {
      fps: number;
      nearest: string;
      slug: string;
      headline: string;
      provincia: Provincia;
      altitudine: number;
      tci: boolean;
      daVedere: string[];
      dist: number;
      alt: number;
      calls: number;
    }) => void;
    view: ViewCtl;
  },
) {
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x17161a, 0.018);
  const camera = new THREE.PerspectiveCamera(58, 1, 0.2, 220);
  const sky = duskSky();
  scene.add(sky);
  addDuskLights(scene);
  const maps = loadCarta();
  const terrain = buildTerrain(canvas.clientWidth < 640 ? 80 : 128, maps);
  scene.add(terrain.mesh);
  const nodes = makeNodes();
  scene.add(nodes.group);
  const dust = copperDust(70);
  scene.add(dust);

  const craft = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.ConeGeometry(0.28, 1.6, 6),
    new THREE.MeshStandardMaterial({ color: 0xede0c8, metalness: 0.4, roughness: 0.45 }),
  );
  body.rotation.x = Math.PI / 2;
  const wing = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.06, 0.35),
    new THREE.MeshStandardMaterial({ color: 0xb5713a, metalness: 0.5, roughness: 0.4 }),
  );
  craft.add(body, wing);
  craft.position.set(0, heightAt(0, 18) + 9, 18);
  scene.add(craft);

  let yaw = 0;
  let speed = 0;
  let altBias = 9;
  const injected = new Set<string>();
  const held = (c: string) => opts.keys.has(c) || injected.has(c);

  const probe: ControlsProbe = {
    getYaw: () => yaw,
    getSpeed: () => speed,
    setKeys: (codes) => {
      injected.clear();
      for (const k of codes) injected.add(k);
    },
  };
  window.__controlsTest = probe;

  const parent = canvas.parentElement ?? canvas;
  const resize = () => resizeRenderer(renderer, camera, parent);
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(parent);

  const unZoom = bindZoom(canvas, (f) => {
    opts.view.zoom = THREE.MathUtils.clamp(opts.view.zoom * f, 0.35, 2.6);
  });
  let last = performance.now();
  let fpsT = 0;
  let frames = 0;
  let hudFps = 60;
  let cinematic = 0;
  let raf = 0;
  let alive = true;
  let lastHud = 0;
  let lastSlug = "";
  let acc = 0;

  const fx = () => -Math.sin(yaw);
  const fz = () => -Math.cos(yaw);

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

    const playing = opts.getPlaying();
    if (!playing || opts.reduced) {
      cinematic += dt * (opts.reduced ? 0 : 0.12);
      const r = 42;
      camera.position.set(Math.sin(cinematic) * r, 20, Math.cos(cinematic) * r);
      camera.lookAt(0, 5, 0);
      craft.position.set(Math.sin(cinematic + 0.4) * 18, 14, Math.cos(cinematic + 0.4) * 18);
      craft.lookAt(craft.position.x - Math.sin(cinematic + 0.4), 14, craft.position.z - Math.cos(cinematic + 0.4));
    } else {
      let steer = 0;
      if (held("KeyA") || held("ArrowLeft")) steer += 1;
      if (held("KeyD") || held("ArrowRight")) steer -= 1;
      yaw += steer * 1.35 * dt;

      let throttle = 0;
      if (held("KeyW") || held("ArrowUp")) throttle += 1;
      if (held("KeyS") || held("ArrowDown")) throttle -= 0.6;
      speed += (throttle * 18 - speed) * Math.min(1, dt * 2.2);

      if (held("Space")) altBias += 8 * dt;
      if (held("KeyC") || held("ShiftLeft")) altBias -= 8 * dt;

      const fxx = fx();
      const fzz = fz();
      craft.position.x += fxx * speed * dt;
      craft.position.z += fzz * speed * dt;
      const floor = heightAt(craft.position.x, craft.position.z) + 2.2;
      altBias = Math.max(2.2, Math.min(28, altBias));
      craft.position.y = THREE.MathUtils.damp(craft.position.y, floor + (altBias - 2.2), 4, dt);

      craft.rotation.y = yaw;
      craft.rotation.z = THREE.MathUtils.damp(craft.rotation.z, steer * 0.35, 8, dt);

      const follow = 9 * opts.view.zoom;
      const camX = craft.position.x - fxx * follow;
      const camZ = craft.position.z - fzz * follow;
      camera.position.x = THREE.MathUtils.damp(camera.position.x, camX, 5, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, craft.position.y + 2.4 + follow * 0.22, 5, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, camZ, 5, dt);
      camera.lookAt(craft.position.x, craft.position.y + 0.4, craft.position.z);
    }

    acc += dt;
    const near = nearestNode(craft.position.x, craft.position.z);
    const dist = Math.hypot(near.x - craft.position.x, near.z - craft.position.z);
    const pulse = 1 + Math.sin(acc * 3) * 0.12;
    for (const m of nodes.meshes) {
      m.scale.setScalar((m.userData.slug === near.slug && dist < 16 ? 2 : 1) * pulse);
    }

    dust.rotation.y += dt * 0.03;
    renderer.render(scene, camera);
    if (near.slug !== lastSlug || now - lastHud > 200) {
      lastSlug = near.slug;
      lastHud = now;
      opts.onHud({
        fps: hudFps,
        nearest: near.nome,
        slug: near.slug,
        headline: near.headline,
        provincia: near.provincia,
        altitudine: near.altitudine,
        tci: near.bandieraArancione,
        daVedere: near.daVedere,
        dist,
        alt: Math.round(craft.position.y / Y_PER_M),
        calls: renderer.info.render.calls,
      });
    }
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return {
    probe,
    dispose: () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      unZoom();
      maps.dispose();
      if (window.__controlsTest === probe) delete window.__controlsTest;
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
      body.geometry.dispose();
      (body.material as THREE.Material).dispose();
      wing.geometry.dispose();
      (wing.material as THREE.Material).dispose();
      renderer.dispose();
    },
  };
}

declare global {
  interface Window {
    __controlsTest?: ControlsProbe;
  }
}
