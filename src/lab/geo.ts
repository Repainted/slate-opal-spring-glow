import * as THREE from "three";
import { COMUNI } from "@/data/comuni";
import { heightAt, projectComune } from "./relief";

export { heightAt, projectComune };

export const NODE_POINTS = COMUNI.map((c) => {
  const { x, z } = projectComune(c.lng, c.lat);
  return { ...c, x, z, y: heightAt(x, z) + 0.9 };
});

export function buildTerrain(segments = 128, maps?: { sat: THREE.Texture; osm: THREE.Texture }) {
  const geo = new THREE.PlaneGeometry(200, 160, segments, Math.round(segments * 0.8));
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setY(i, heightAt(pos.getX(i), pos.getZ(i)));
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  const dummy = maps?.sat ?? new THREE.Texture();
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uSat: { value: maps?.sat ?? dummy },
      uOsm: { value: maps?.osm ?? dummy },
      uLayer: { value: 0 },
    },
    vertexShader: `
      varying vec3 vW;
      varying vec3 vN;
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        vW = w.xyz;
        vN = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * w;
      }
    `,
    fragmentShader: `
      uniform sampler2D uSat;
      uniform sampler2D uOsm;
      uniform float uLayer;
      varying vec3 vW;
      varying vec3 vN;
      void main() {
        float slope = 1.0 - abs(vN.y);
        vec3 rock = vec3(0.145, 0.132, 0.122);
        vec3 grass = vec3(0.27, 0.31, 0.175);
        vec3 copper = vec3(0.71, 0.44, 0.227);
        vec3 col = mix(grass, rock, smoothstep(0.12, 0.52, slope));
        vec3 plain = vec3(0.16, 0.17, 0.13);
        col = mix(plain, col, smoothstep(1.2, 6.0, vW.y));
        col = mix(col, copper, smoothstep(10.0, 19.0, vW.y) * 0.45);
        float ndl = clamp(dot(vN, normalize(vec3(-0.45, 0.72, 0.28))), 0.18, 1.0);
        col *= ndl;
        vec2 uv = vec2((vW.x + 100.0) / 200.0, (80.0 - vW.z) / 160.0);
        vec3 sat = texture2D(uSat, uv).rgb;
        vec3 osm = texture2D(uOsm, uv).rgb;
        vec3 mapped = mix(sat, osm, step(1.5, uLayer));
        mapped *= 0.78 + ndl * 0.45;
        col = mix(col, mapped, step(0.5, uLayer));
        float fog = smoothstep(22.0, 110.0, length(vW.xz));
        col = mix(col, vec3(0.09, 0.086, 0.102), fog * (uLayer > 0.5 ? 0.45 : 1.0));
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = false;
  return { mesh, geo, mat };
}

export function duskSky() {
  const geo = new THREE.SphereGeometry(140, 24, 16);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: `
      varying vec3 vP;
      void main() {
        vP = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vP;
      void main() {
        float h = normalize(vP).y;
        vec3 top = vec3(0.07, 0.07, 0.09);
        vec3 hor = vec3(0.42, 0.26, 0.16);
        vec3 col = mix(hor, top, smoothstep(-0.15, 0.55, h));
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  return new THREE.Mesh(geo, mat);
}

export function copperDust(count = 80) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 90;
    pos[i * 3 + 1] = 4 + Math.random() * 22;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 70;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xce8b4e,
    size: 0.35,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Points(geo, mat);
}

export function makeNodes() {
  const geo = new THREE.SphereGeometry(0.28, 10, 8);
  const mat = new THREE.MeshBasicMaterial({ color: 0xce8b4e });
  const tci = new THREE.MeshBasicMaterial({ color: 0xede0c8 });
  const group = new THREE.Group();
  const meshes: THREE.Mesh[] = [];
  for (const n of NODE_POINTS) {
    const m = new THREE.Mesh(geo, n.bandieraArancione ? tci : mat);
    m.position.set(n.x, n.y, n.z);
    m.userData.slug = n.slug;
    m.userData.nome = n.nome;
    group.add(m);
    meshes.push(m);
  }
  const linePos: number[] = [];
  const sorted = [...NODE_POINTS].sort((a, b) => a.lng - b.lng);
  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i]!;
    const b = sorted[i + 1]!;
    if (Math.hypot(a.x - b.x, a.z - b.z) < 28) {
      linePos.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  const lg = new THREE.BufferGeometry();
  lg.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
  const lines = new THREE.LineSegments(
    lg,
    new THREE.LineBasicMaterial({ color: 0xb5713a, transparent: true, opacity: 0.35 }),
  );
  group.add(lines);
  return { group, meshes, geo, mat, tci, lg };
}

export function addDuskLights(scene: THREE.Scene) {
  const hemi = new THREE.HemisphereLight(0xede0c8, 0x23211e, 0.55);
  const dir = new THREE.DirectionalLight(0xce8b4e, 1.15);
  dir.position.set(-40, 28, 18);
  scene.add(hemi, dir);
  return { hemi, dir };
}

export function makeRenderer(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: canvas.clientWidth > 700,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(0x17161a, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  return renderer;
}

export function resizeRenderer(renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, el: HTMLElement) {
  const w = el.clientWidth || 1;
  const h = el.clientHeight || 1;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

export function nearestNode(x: number, z: number) {
  let best = NODE_POINTS[0]!;
  let d = Infinity;
  for (const n of NODE_POINTS) {
    const dd = (n.x - x) ** 2 + (n.z - z) ** 2;
    if (dd < d) {
      d = dd;
      best = n;
    }
  }
  return best;
}
