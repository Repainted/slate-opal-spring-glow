import * as THREE from "three";

/** Gold of the Lab mark — the dotted radar. */
export const LOGO_GOLD = 0xc9a05a;
export const LOGO_CREAM = 0xede0c8;
export const LOGO_NAVY = 0x0e0d10;

function wordTexture() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 256;
  const g = c.getContext("2d")!;
  g.clearRect(0, 0, 1024, 256);
  g.fillStyle = "#c9a05a";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = "600 78px Georgia, 'Times New Roman', serif";
  g.fillText("LEPINI LAB", 512, 100);
  g.font = "500 22px system-ui, sans-serif";
  g.fillText("LABORATORIO SCIENTIFICO", 512, 168);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/** Concentric dotted radar + wordmark — the Lab mark in the scene. */
export function makeLabLogo3D() {
  const group = new THREE.Group();
  const geoms: THREE.BufferGeometry[] = [];
  const mats: THREE.Material[] = [];

  const gold = new THREE.MeshBasicMaterial({ color: LOGO_GOLD });
  const cream = new THREE.MeshBasicMaterial({ color: LOGO_CREAM });
  mats.push(gold, cream);

  const core = new THREE.Mesh(new THREE.CircleGeometry(0.48, 48), new THREE.MeshBasicMaterial({ color: LOGO_NAVY, side: THREE.DoubleSide }));
  geoms.push(core.geometry);
  mats.push(core.material as THREE.Material);
  core.rotation.x = -Math.PI / 2;
  group.add(core);

  const disc = new THREE.Mesh(
    new THREE.RingGeometry(0.48, 0.56, 48),
    new THREE.MeshBasicMaterial({ color: LOGO_GOLD, side: THREE.DoubleSide, transparent: true, opacity: 0.85 }),
  );
  geoms.push(disc.geometry);
  mats.push(disc.material as THREE.Material);
  disc.rotation.x = -Math.PI / 2;
  group.add(disc);

  const dotGeo = new THREE.SphereGeometry(0.028, 8, 6);
  geoms.push(dotGeo);
  const rings = [
    { r: 0.72, n: 18, mat: gold },
    { r: 1.02, n: 26, mat: cream },
    { r: 1.32, n: 34, mat: gold },
    { r: 1.62, n: 42, mat: cream },
  ];
  for (const ring of rings) {
    for (let i = 0; i < ring.n; i++) {
      const a = (i / ring.n) * Math.PI * 2;
      const m = new THREE.Mesh(dotGeo, ring.mat);
      m.position.set(Math.cos(a) * ring.r, 0.02, Math.sin(a) * ring.r);
      group.add(m);
    }
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(ring.r, 0.006, 6, 64),
      new THREE.MeshBasicMaterial({ color: LOGO_GOLD, transparent: true, opacity: 0.22 }),
    );
    geoms.push(torus.geometry);
    mats.push(torus.material as THREE.Material);
    torus.rotation.x = Math.PI / 2;
    group.add(torus);
  }

  const tex = wordTexture();
  const wordMat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
    opacity: 1,
  });
  mats.push(wordMat);
  const word = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 1.15), wordMat);
  geoms.push(word.geometry);
  word.position.set(0, -2.35, 0);
  group.add(word);

  return {
    group,
    word,
    wordMat,
    step(awake: number, camera: THREE.Camera) {
      const k = 1 - awake;
      group.scale.setScalar(THREE.MathUtils.lerp(0.55, 1, k));
      wordMat.opacity = k * k;
      word.visible = k > 0.04;
      word.quaternion.copy(camera.quaternion);
    },
    dispose() {
      tex.dispose();
      for (const g of geoms) g.dispose();
      for (const m of mats) m.dispose();
    },
  };
}
