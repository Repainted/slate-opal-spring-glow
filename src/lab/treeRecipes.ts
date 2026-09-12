import * as THREE from "three";
import { buildTree, makeClumpGeo, makeRandom, type ClumpKind, type TreeSpec } from "./treeBuilder";

function bark(name: string, color: number, roughness: number) {
  return new THREE.MeshStandardMaterial({ name, color, roughness, metalness: 0 });
}
function leaf(name: string, color: number, roughness: number, metalness = 0) {
  return new THREE.MeshStandardMaterial({ name, color, roughness, metalness });
}

function clumps(seed: number, kinds: [ClumpKind, number, number, number][]) {
  const rnd = makeRandom(seed);
  return kinds.map(([k, r, d, sq]) => makeClumpGeo(THREE, k, r, d, sq, rnd));
}

function recipe(spec: TreeSpec) {
  return () => buildTree(THREE, spec);
}

export const RECIPES: Record<string, () => THREE.Group> = {
  nocciolo: () => {
    const g = clumps(32, [
      ["broad", 0.4, 1, 0.5],
      ["broad", 0.26, 1, 0.55],
      ["ico", 0.15, 0, 0.55],
    ]);
    const stems = Array.from({ length: 5 }, (_, i) => {
      const ang = (i / 5) * Math.PI * 2 + 0.3;
      return {
        origin: new THREE.Vector3(Math.cos(ang) * 0.12, 0.05, Math.sin(ang) * 0.12),
        dir: new THREE.Vector3(Math.cos(ang) * 0.5, 1, Math.sin(ang) * 0.5),
        length: 1.9 + (i % 2) * 0.3,
        radius0: 0.09,
        radius1: 0.055,
      };
    });
    return buildTree(THREE, {
      seed: 32,
      name: "nocciolo",
      barkMat: bark("corteccia_nocciolo", 0x6b573f, 0.9),
      leafMats: [leaf("foglia_nocciolo_scura", 0x37481f, 0.8), leaf("foglia_nocciolo_media", 0x4a6027, 0.8), leaf("foglia_nocciolo_chiara", 0x5d7a34, 0.78)],
      rootFlare: { radius: 0.2, squash: 0.6 },
      stems,
      maxDepth: 3,
      branchesPerNode: 2,
      curviness: 0.18,
      lengthDecay: 0.68,
      radiusDecay: 0.62,
      foliageMode: "anchors",
      layers: [
        { geo: g[0]!, count: 4, scaleMin: 0.6, scaleMax: 0.95, spreadMul: 1.1, shellMin: 0.55, shellSpread: 0.35 },
        { geo: g[1]!, count: 7, scaleMin: 0.55, scaleMax: 0.9, spreadMul: 1, shellMin: 0.35, shellSpread: 0.5 },
        { geo: g[2]!, count: 10, scaleMin: 0.65, scaleMax: 1, spreadMul: 0.9, shellMin: 0.2, shellSpread: 0.6 },
      ],
    });
  },
  oleastro: () => {
    const g = clumps(44, [
      ["blade", 0.34, 1, 0.55],
      ["blade", 0.22, 1, 0.6],
      ["blade", 0.13, 0, 0.6],
    ]);
    const stems = Array.from({ length: 6 }, (_, i) => {
      const ang = (i / 6) * Math.PI * 2 + 0.15;
      const outward = 0.85 + (i % 3) * 0.1;
      return {
        origin: new THREE.Vector3(Math.cos(ang) * 0.28, 0.28, Math.sin(ang) * 0.28),
        dir: new THREE.Vector3(Math.cos(ang) * outward, 0.55, Math.sin(ang) * outward),
        length: 1.5 + (i % 2) * 0.25,
        radius0: 0.13,
        radius1: 0.08,
      };
    });
    return buildTree(THREE, {
      seed: 44,
      name: "oleastro",
      barkMat: bark("corteccia_oleastro", 0x7a6a52, 1),
      leafMats: [leaf("foglia_oleastro_scura", 0x5e6c46, 0.72), leaf("foglia_oleastro_argentata", 0x9fae86, 0.76), leaf("foglia_oleastro_media", 0x7c8c60, 0.74)],
      rootFlare: { radius: 0.62, squash: 0.7 },
      stems,
      maxDepth: 3,
      branchesPerNode: 2,
      curviness: 0.3,
      lengthDecay: 0.7,
      radiusDecay: 0.58,
      foliageMode: "anchors",
      layers: [
        { geo: g[0]!, count: 4, scaleMin: 0.5, scaleMax: 0.75, spreadMul: 1, shellMin: 0.6, shellSpread: 0.3 },
        { geo: g[1]!, count: 7, scaleMin: 0.45, scaleMax: 0.7, spreadMul: 0.95, shellMin: 0.4, shellSpread: 0.45 },
        { geo: g[2]!, count: 10, scaleMin: 0.55, scaleMax: 0.85, spreadMul: 0.9, shellMin: 0.25, shellSpread: 0.6 },
      ],
    });
  },
  mirto: () => {
    const g = clumps(55, [
      ["ico", 0.24, 1, 0.5],
      ["ico", 0.15, 1, 0.55],
      ["ico", 0.09, 0, 0.55],
    ]);
    const stems = Array.from({ length: 7 }, (_, i) => {
      const ang = (i / 7) * Math.PI * 2 + 0.4;
      return {
        origin: new THREE.Vector3(Math.cos(ang) * 0.1, 0.03, Math.sin(ang) * 0.1),
        dir: new THREE.Vector3(Math.cos(ang) * 0.45, 1, Math.sin(ang) * 0.45),
        length: 1.05 + (i % 2) * 0.2,
        radius0: 0.05,
        radius1: 0.03,
      };
    });
    return buildTree(THREE, {
      seed: 55,
      name: "mirto",
      barkMat: bark("corteccia_mirto", 0x6e5c47, 0.85),
      leafMats: [leaf("foglia_mirto_scura", 0x22421f, 0.55), leaf("foglia_mirto_media", 0x2f5230, 0.55), leaf("foglia_mirto_chiara", 0x3f6b3c, 0.55)],
      rootFlare: { radius: 0.12, squash: 0.55 },
      stems,
      maxDepth: 3,
      branchesPerNode: 3,
      curviness: 0.2,
      lengthDecay: 0.66,
      radiusDecay: 0.6,
      foliageMode: "anchors",
      layers: [
        { geo: g[0]!, count: 4, scaleMin: 0.6, scaleMax: 0.9, spreadMul: 1.1, shellMin: 0.55, shellSpread: 0.35 },
        { geo: g[1]!, count: 8, scaleMin: 0.55, scaleMax: 0.85, spreadMul: 1, shellMin: 0.35, shellSpread: 0.5 },
        { geo: g[2]!, count: 14, scaleMin: 0.6, scaleMax: 1, spreadMul: 0.9, shellMin: 0.2, shellSpread: 0.6 },
      ],
    });
  },
  magnolia: recipe({
    seed: 66,
    name: "magnolia_grandiflora",
    barkMat: bark("corteccia_magnolia", 0x4a4034, 0.88),
    leafMats: [leaf("foglia_magnolia_scura", 0x1f3d1f, 0.35, 0.05), leaf("foglia_magnolia_media", 0x2b4a2b, 0.35, 0.05), leaf("foglia_magnolia_chiara", 0x3c5c34, 0.4, 0.03)],
    rootFlare: { radius: 0.4, squash: 0.7 },
    stems: [{ origin: new THREE.Vector3(0, 0.05, 0), dir: new THREE.Vector3(0.06, 1, 0.03), length: 3.4, radius0: 0.34, radius1: 0.2 }],
    maxDepth: 3,
    branchesPerNode: (d) => (d === 0 ? 5 : 3),
    curviness: 0.12,
    lengthDecay: 0.62,
    radiusDecay: 0.55,
    foliageMode: "envelope",
    envelope: { center: new THREE.Vector3(0, 6.6, 0), radiusXZ: 2.3, radiusY: 3.3 },
    layers: [
      { geo: makeClumpGeo(THREE, "broad", 0.55, 1, 0.4, makeRandom(66)), count: 260, scaleMin: 0.5, scaleMax: 0.8, shellMin: 0.7, shellSpread: 0.3 },
      { geo: makeClumpGeo(THREE, "broad", 0.34, 1, 0.45, makeRandom(67)), count: 480, scaleMin: 0.45, scaleMax: 0.75, shellMin: 0.5, shellSpread: 0.45 },
      { geo: makeClumpGeo(THREE, "broad", 0.2, 0, 0.5, makeRandom(68)), count: 620, scaleMin: 0.55, scaleMax: 0.9, shellMin: 0.3, shellSpread: 0.65 },
    ],
  }),
  faggio: recipe({
    seed: 71,
    name: "faggio",
    barkMat: bark("corteccia_faggio", 0x8f867a, 0.65),
    leafMats: [leaf("foglia_faggio_scura", 0x33481f, 0.4, 0.03), leaf("foglia_faggio_media", 0x43581f, 0.4, 0.03), leaf("foglia_faggio_chiara", 0x556b2b, 0.42, 0.02)],
    rootFlare: { radius: 0.38, squash: 0.7 },
    stems: [{ origin: new THREE.Vector3(0, 0.05, 0), dir: new THREE.Vector3(0.04, 1, 0.02), length: 3.2, radius0: 0.32, radius1: 0.2 }],
    maxDepth: 3,
    branchesPerNode: (d) => (d === 0 ? 5 : 3),
    curviness: 0.12,
    lengthDecay: 0.63,
    radiusDecay: 0.56,
    foliageMode: "envelope",
    envelope: { center: new THREE.Vector3(0, 7.4, 0), radiusXZ: 2.6, radiusY: 3.0 },
    layers: [
      { geo: makeClumpGeo(THREE, "broad", 0.5, 1, 0.4, makeRandom(71)), count: 240, scaleMin: 0.5, scaleMax: 0.8, shellMin: 0.7, shellSpread: 0.3 },
      { geo: makeClumpGeo(THREE, "broad", 0.3, 1, 0.45, makeRandom(711)), count: 440, scaleMin: 0.45, scaleMax: 0.75, shellMin: 0.5, shellSpread: 0.45 },
      { geo: makeClumpGeo(THREE, "broad", 0.18, 0, 0.5, makeRandom(712)), count: 560, scaleMin: 0.55, scaleMax: 0.9, shellMin: 0.3, shellSpread: 0.65 },
    ],
  }),
  cerro: recipe({
    seed: 72,
    name: "cerro",
    barkMat: bark("corteccia_cerro", 0x5a4a3a, 0.95),
    leafMats: [leaf("foglia_cerro_scura", 0x33481f, 0.55), leaf("foglia_cerro_media", 0x435c29, 0.55), leaf("foglia_cerro_chiara", 0x516b34, 0.55)],
    rootFlare: { radius: 0.4, squash: 0.72 },
    stems: [{ origin: new THREE.Vector3(0, 0.05, 0), dir: new THREE.Vector3(0.08, 1, 0.05), length: 3.0, radius0: 0.34, radius1: 0.2 }],
    maxDepth: 3,
    branchesPerNode: (d) => (d === 0 ? 5 : 3),
    curviness: 0.16,
    lengthDecay: 0.65,
    radiusDecay: 0.56,
    foliageMode: "envelope",
    envelope: { center: new THREE.Vector3(0, 6.6, 0), radiusXZ: 2.8, radiusY: 2.6 },
    layers: [
      { geo: makeClumpGeo(THREE, "broad", 0.48, 1, 0.5, makeRandom(72)), count: 230, scaleMin: 0.5, scaleMax: 0.8, shellMin: 0.7, shellSpread: 0.3 },
      { geo: makeClumpGeo(THREE, "broad", 0.3, 1, 0.55, makeRandom(721)), count: 420, scaleMin: 0.45, scaleMax: 0.75, shellMin: 0.5, shellSpread: 0.45 },
      { geo: makeClumpGeo(THREE, "broad", 0.18, 0, 0.55, makeRandom(722)), count: 540, scaleMin: 0.55, scaleMax: 0.9, shellMin: 0.3, shellSpread: 0.65 },
    ],
  }),
  roverella: () => {
    const g = clumps(73, [
      ["broad", 0.4, 1, 0.55],
      ["broad", 0.25, 1, 0.6],
      ["broad", 0.15, 0, 0.6],
    ]);
    const stems = Array.from({ length: 4 }, (_, i) => {
      const ang = (i / 4) * Math.PI * 2 + 0.25;
      return {
        origin: new THREE.Vector3(Math.cos(ang) * 0.2, 0.15, Math.sin(ang) * 0.2),
        dir: new THREE.Vector3(Math.cos(ang) * 0.65, 0.9, Math.sin(ang) * 0.65),
        length: 1.9,
        radius0: 0.16,
        radius1: 0.1,
      };
    });
    return buildTree(THREE, {
      seed: 73,
      name: "roverella",
      barkMat: bark("corteccia_roverella", 0x7a6a52, 1),
      leafMats: [leaf("foglia_roverella_scura", 0x475c2c, 0.68), leaf("foglia_roverella_media", 0x5a6c3a, 0.68), leaf("foglia_roverella_chiara", 0x6c7c48, 0.68)],
      rootFlare: { radius: 0.36, squash: 0.7 },
      stems,
      maxDepth: 3,
      branchesPerNode: 2,
      curviness: 0.28,
      lengthDecay: 0.7,
      radiusDecay: 0.58,
      foliageMode: "anchors",
      layers: [
        { geo: g[0]!, count: 5, scaleMin: 0.55, scaleMax: 0.85, spreadMul: 1, shellMin: 0.6, shellSpread: 0.3 },
        { geo: g[1]!, count: 9, scaleMin: 0.5, scaleMax: 0.8, spreadMul: 0.95, shellMin: 0.4, shellSpread: 0.45 },
        { geo: g[2]!, count: 12, scaleMin: 0.6, scaleMax: 0.95, spreadMul: 0.9, shellMin: 0.25, shellSpread: 0.6 },
      ],
    });
  },
  sughera: recipe({
    seed: 74,
    name: "sughera",
    barkMat: bark("sughero", 0x8a7a5f, 1),
    leafMats: [leaf("foglia_sughera_scura", 0x2b3d22, 0.5), leaf("foglia_sughera_media", 0x3a4d2c, 0.5), leaf("foglia_sughera_chiara", 0x4a5d38, 0.5)],
    rootFlare: { radius: 0.46, squash: 0.75 },
    stems: [{ origin: new THREE.Vector3(0, 0.05, 0), dir: new THREE.Vector3(0.1, 1, 0.06), length: 2.8, radius0: 0.4, radius1: 0.26 }],
    maxDepth: 3,
    branchesPerNode: (d) => (d === 0 ? 4 : 3),
    curviness: 0.2,
    lengthDecay: 0.68,
    radiusDecay: 0.56,
    foliageMode: "envelope",
    envelope: { center: new THREE.Vector3(0, 6.0, 0), radiusXZ: 2.6, radiusY: 2.4 },
    layers: [
      { geo: makeClumpGeo(THREE, "ico", 0.42, 1, 0.55, makeRandom(74)), count: 220, scaleMin: 0.5, scaleMax: 0.8, shellMin: 0.7, shellSpread: 0.3 },
      { geo: makeClumpGeo(THREE, "ico", 0.26, 1, 0.6, makeRandom(741)), count: 400, scaleMin: 0.45, scaleMax: 0.75, shellMin: 0.5, shellSpread: 0.45 },
      { geo: makeClumpGeo(THREE, "ico", 0.15, 0, 0.6, makeRandom(742)), count: 520, scaleMin: 0.55, scaleMax: 0.9, shellMin: 0.3, shellSpread: 0.65 },
    ],
  }),
  castagno: recipe({
    seed: 75,
    name: "castagno",
    barkMat: bark("corteccia_castagno", 0x4a3c2e, 0.92),
    leafMats: [leaf("foglia_castagno_scura", 0x2f4a1f, 0.55), leaf("foglia_castagno_media", 0x3f5a2a, 0.55), leaf("foglia_castagno_chiara", 0x4f6a36, 0.55)],
    rootFlare: { radius: 0.42, squash: 0.72 },
    stems: [{ origin: new THREE.Vector3(0, 0.05, 0), dir: new THREE.Vector3(0.05, 1, 0.03), length: 3.6, radius0: 0.36, radius1: 0.22 }],
    maxDepth: 3,
    branchesPerNode: (d) => (d === 0 ? 5 : 3),
    curviness: 0.12,
    lengthDecay: 0.63,
    radiusDecay: 0.55,
    foliageMode: "envelope",
    envelope: { center: new THREE.Vector3(0, 7.8, 0), radiusXZ: 2.7, radiusY: 3.1 },
    layers: [
      { geo: makeClumpGeo(THREE, "broad", 0.55, 1, 0.4, makeRandom(75)), count: 260, scaleMin: 0.5, scaleMax: 0.8, shellMin: 0.7, shellSpread: 0.3 },
      { geo: makeClumpGeo(THREE, "broad", 0.34, 1, 0.45, makeRandom(751)), count: 480, scaleMin: 0.45, scaleMax: 0.75, shellMin: 0.5, shellSpread: 0.45 },
      { geo: makeClumpGeo(THREE, "broad", 0.2, 0, 0.5, makeRandom(752)), count: 620, scaleMin: 0.55, scaleMax: 0.9, shellMin: 0.3, shellSpread: 0.65 },
    ],
  }),
  olmo: recipe({
    seed: 76,
    name: "olmo",
    barkMat: bark("corteccia_olmo", 0x5a4a3a, 0.9),
    leafMats: [leaf("foglia_olmo_scura", 0x33481f, 0.55), leaf("foglia_olmo_media", 0x435c29, 0.55), leaf("foglia_olmo_chiara", 0x536c34, 0.55)],
    rootFlare: { radius: 0.34, squash: 0.68 },
    stems: [{ origin: new THREE.Vector3(0, 0.05, 0), dir: new THREE.Vector3(0.03, 1, 0.02), length: 3.0, radius0: 0.28, radius1: 0.17 }],
    maxDepth: 3,
    branchesPerNode: (d) => (d === 0 ? 4 : 3),
    curviness: 0.1,
    lengthDecay: 0.66,
    radiusDecay: 0.58,
    foliageMode: "envelope",
    envelope: { center: new THREE.Vector3(0, 7.4, 0), radiusXZ: 2.1, radiusY: 3.4 },
    layers: [
      { geo: makeClumpGeo(THREE, "broad", 0.4, 1, 0.5, makeRandom(76)), count: 220, scaleMin: 0.5, scaleMax: 0.8, shellMin: 0.7, shellSpread: 0.3 },
      { geo: makeClumpGeo(THREE, "broad", 0.25, 1, 0.55, makeRandom(761)), count: 400, scaleMin: 0.45, scaleMax: 0.75, shellMin: 0.5, shellSpread: 0.45 },
      { geo: makeClumpGeo(THREE, "broad", 0.15, 0, 0.55, makeRandom(762)), count: 520, scaleMin: 0.55, scaleMax: 0.9, shellMin: 0.3, shellSpread: 0.65 },
    ],
  }),
  acero: recipe({
    seed: 77,
    name: "acero_di_monte",
    barkMat: bark("corteccia_acero", 0x6a5f52, 0.85),
    leafMats: [leaf("foglia_acero_scura", 0x2f4a24, 0.5), leaf("foglia_acero_media", 0x3f5a30, 0.5), leaf("foglia_acero_chiara", 0x4f6a3c, 0.5)],
    rootFlare: { radius: 0.36, squash: 0.7 },
    stems: [{ origin: new THREE.Vector3(0, 0.05, 0), dir: new THREE.Vector3(0.06, 1, 0.04), length: 3.0, radius0: 0.3, radius1: 0.19 }],
    maxDepth: 3,
    branchesPerNode: (d) => (d === 0 ? 5 : 3),
    curviness: 0.14,
    lengthDecay: 0.64,
    radiusDecay: 0.56,
    foliageMode: "envelope",
    envelope: { center: new THREE.Vector3(0, 6.8, 0), radiusXZ: 2.5, radiusY: 2.7 },
    layers: [
      { geo: makeClumpGeo(THREE, "broad", 0.44, 1, 0.45, makeRandom(77)), count: 230, scaleMin: 0.5, scaleMax: 0.8, shellMin: 0.7, shellSpread: 0.3 },
      { geo: makeClumpGeo(THREE, "broad", 0.28, 1, 0.5, makeRandom(771)), count: 420, scaleMin: 0.45, scaleMax: 0.75, shellMin: 0.5, shellSpread: 0.45 },
      { geo: makeClumpGeo(THREE, "broad", 0.17, 0, 0.5, makeRandom(772)), count: 540, scaleMin: 0.55, scaleMax: 0.9, shellMin: 0.3, shellSpread: 0.65 },
    ],
  }),
  carpino: recipe({
    seed: 78,
    name: "carpino_nero",
    barkMat: bark("corteccia_carpino", 0x6e5c46, 0.85),
    leafMats: [leaf("foglia_carpino_scura", 0x3a4d24, 0.6), leaf("foglia_carpino_media", 0x4a5d30, 0.6), leaf("foglia_carpino_chiara", 0x5a6d3c, 0.6)],
    rootFlare: { radius: 0.22, squash: 0.65 },
    stems: [{ origin: new THREE.Vector3(0, 0.05, 0), dir: new THREE.Vector3(0.1, 1, 0.06), length: 2.4, radius0: 0.18, radius1: 0.11 }],
    maxDepth: 3,
    branchesPerNode: (d) => (d === 0 ? 4 : 3),
    curviness: 0.18,
    lengthDecay: 0.66,
    radiusDecay: 0.58,
    foliageMode: "envelope",
    envelope: { center: new THREE.Vector3(0, 5.6, 0), radiusXZ: 1.8, radiusY: 2.4 },
    layers: [
      { geo: makeClumpGeo(THREE, "ico", 0.3, 1, 0.5, makeRandom(78)), count: 200, scaleMin: 0.5, scaleMax: 0.8, shellMin: 0.7, shellSpread: 0.3 },
      { geo: makeClumpGeo(THREE, "ico", 0.19, 1, 0.55, makeRandom(781)), count: 360, scaleMin: 0.45, scaleMax: 0.75, shellMin: 0.5, shellSpread: 0.45 },
      { geo: makeClumpGeo(THREE, "ico", 0.11, 0, 0.55, makeRandom(782)), count: 460, scaleMin: 0.55, scaleMax: 0.9, shellMin: 0.3, shellSpread: 0.65 },
    ],
  }),
  tiglio: recipe({
    seed: 79,
    name: "tiglio",
    barkMat: bark("corteccia_tiglio", 0x574636, 0.85),
    leafMats: [leaf("foglia_tiglio_scura", 0x2f4a22, 0.5), leaf("foglia_tiglio_media", 0x3f5a2e, 0.5), leaf("foglia_tiglio_chiara", 0x4f6a3a, 0.5)],
    rootFlare: { radius: 0.36, squash: 0.7 },
    stems: [{ origin: new THREE.Vector3(0, 0.05, 0), dir: new THREE.Vector3(0.04, 1, 0.03), length: 3.4, radius0: 0.3, radius1: 0.19 }],
    maxDepth: 3,
    branchesPerNode: (d) => (d === 0 ? 5 : 3),
    curviness: 0.1,
    lengthDecay: 0.62,
    radiusDecay: 0.55,
    foliageMode: "envelope",
    envelope: { center: new THREE.Vector3(0, 7.6, 0), radiusXZ: 2.3, radiusY: 3.2 },
    layers: [
      { geo: makeClumpGeo(THREE, "broad", 0.42, 1, 0.45, makeRandom(79)), count: 250, scaleMin: 0.5, scaleMax: 0.8, shellMin: 0.7, shellSpread: 0.3 },
      { geo: makeClumpGeo(THREE, "broad", 0.26, 1, 0.5, makeRandom(791)), count: 460, scaleMin: 0.45, scaleMax: 0.75, shellMin: 0.5, shellSpread: 0.45 },
      { geo: makeClumpGeo(THREE, "broad", 0.16, 0, 0.5, makeRandom(792)), count: 600, scaleMin: 0.55, scaleMax: 0.9, shellMin: 0.3, shellSpread: 0.65 },
    ],
  }),
  agrifoglio: recipe({
    seed: 80,
    name: "agrifoglio",
    barkMat: bark("corteccia_agrifoglio", 0x6a6258, 0.7),
    leafMats: [leaf("foglia_agrifoglio_scura", 0x14301a, 0.3, 0.06), leaf("foglia_agrifoglio_media", 0x1f3d22, 0.3, 0.05), leaf("foglia_agrifoglio_chiara", 0x2a4a2c, 0.32, 0.04)],
    rootFlare: { radius: 0.16, squash: 0.6 },
    stems: [{ origin: new THREE.Vector3(0, 0.03, 0), dir: new THREE.Vector3(0.06, 1, 0.04), length: 1.6, radius0: 0.13, radius1: 0.08 }],
    maxDepth: 3,
    branchesPerNode: (d) => (d === 0 ? 4 : 2),
    curviness: 0.1,
    lengthDecay: 0.62,
    radiusDecay: 0.56,
    foliageMode: "envelope",
    envelope: { center: new THREE.Vector3(0, 3.0, 0), radiusXZ: 1.1, radiusY: 1.9 },
    layers: [
      { geo: makeClumpGeo(THREE, "ico", 0.24, 1, 0.5, makeRandom(80)), count: 200, scaleMin: 0.45, scaleMax: 0.7, shellMin: 0.65, shellSpread: 0.3 },
      { geo: makeClumpGeo(THREE, "ico", 0.15, 1, 0.55, makeRandom(801)), count: 380, scaleMin: 0.4, scaleMax: 0.65, shellMin: 0.45, shellSpread: 0.45 },
      { geo: makeClumpGeo(THREE, "ico", 0.09, 0, 0.55, makeRandom(802)), count: 500, scaleMin: 0.5, scaleMax: 0.8, shellMin: 0.3, shellSpread: 0.6 },
    ],
  }),
  olivo: () => {
    const g = clumps(21, [
      ["blade", 0.42, 1, 0.55],
      ["blade", 0.26, 1, 0.6],
      ["blade", 0.15, 0, 0.6],
    ]);
    return buildTree(THREE, {
      seed: 11,
      name: "olivo",
      barkMat: bark("corteccia_olivo", 0x8c8168, 0.95),
      leafMats: [leaf("foglia_olivo_verde", 0x6b7a52, 0.7), leaf("foglia_olivo_argentata", 0xafc0a0, 0.75), leaf("foglia_olivo_media", 0x8b9a72, 0.72)],
      rootFlare: { radius: 0.42, squash: 0.75 },
      stems: [
        { origin: new THREE.Vector3(-0.15, 0.1, 0.1), dir: new THREE.Vector3(0.4, 1, 0.15), length: 1.6, radius0: 0.22, radius1: 0.14 },
        { origin: new THREE.Vector3(0.1, 0.1, -0.15), dir: new THREE.Vector3(-0.3, 0.95, -0.35), length: 1.5, radius0: 0.19, radius1: 0.12 },
        { origin: new THREE.Vector3(0.05, 0.1, 0.2), dir: new THREE.Vector3(0.15, 1, 0.5), length: 1.3, radius0: 0.15, radius1: 0.09 },
      ],
      maxDepth: 4,
      branchesPerNode: 2,
      curviness: 0.22,
      lengthDecay: 0.72,
      radiusDecay: 0.6,
      foliageMode: "anchors",
      layers: [
        { geo: g[0]!, count: 5, scaleMin: 0.55, scaleMax: 0.85, spreadMul: 1, shellMin: 0.6, shellSpread: 0.3 },
        { geo: g[1]!, count: 9, scaleMin: 0.5, scaleMax: 0.8, spreadMul: 0.95, shellMin: 0.4, shellSpread: 0.45 },
        { geo: g[2]!, count: 12, scaleMin: 0.6, scaleMax: 0.95, spreadMul: 0.9, shellMin: 0.25, shellSpread: 0.6 },
      ],
    });
  },
};

/** Leccio: ricetta custom (Leccio Tree.html), chioma a ciuffi istanziata. */
export function buildLeccio() {
  let s = 1337;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const tree = new THREE.Group();
  tree.name = "leccio";
  const barkMat = bark("corteccia", 0x4a3b2c, 1);
  const leafMats = [leaf("foglia_scura", 0x39421f, 0.85), leaf("foglia_media", 0x54622c, 0.85), leaf("foglia_chiara", 0x6f7f3a, 0.8)];
  const geos: THREE.BufferGeometry[] = [];

  const trunkGeo = new THREE.CylinderGeometry(0.3, 0.42, 1.9, 16, 18);
  const pos = trunkGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const ang = Math.atan2(z, x);
    const bump = 0.035 * Math.sin(ang * 5 + y * 3) + 0.02 * Math.sin(ang * 11 - y * 2);
    pos.setX(i, x * (1 + bump));
    pos.setZ(i, z * (1 + bump));
  }
  trunkGeo.computeVertexNormals();
  geos.push(trunkGeo);
  const trunk = new THREE.Mesh(trunkGeo, barkMat);
  trunk.position.y = 0.95;
  tree.add(trunk);
  const flareGeo = new THREE.CylinderGeometry(0.42, 0.55, 0.35, 16);
  geos.push(flareGeo);
  const flare = new THREE.Mesh(flareGeo, barkMat);
  flare.position.y = 0.17;
  tree.add(flare);

  const anchors: { pos: THREE.Vector3; radius: number }[] = [];
  const addBranch = (
    start: THREE.Vector3,
    dir: THREE.Vector3,
    length: number,
    r0: number,
    r1: number,
    depth: number,
    maxDepth: number,
  ) => {
    const segs = 6;
    const points: THREE.Vector3[] = [];
    let p = start.clone();
    let d = dir.clone().normalize();
    for (let i = 0; i <= segs; i++) {
      points.push(p.clone());
      d.x += (rnd() - 0.5) * 0.25 * 0.15;
      d.z += (rnd() - 0.5) * 0.25 * 0.15;
      d.y += 0.08;
      d.normalize();
      p = p.clone().add(d.clone().multiplyScalar(length / segs));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const tube = new THREE.TubeGeometry(curve, segs * 2, r0, 8, false);
    geos.push(tube);
    tree.add(new THREE.Mesh(tube, barkMat));
    const end = points[points.length - 1]!;
    if (depth < maxDepth) {
      const n = depth === 0 ? 3 : 2;
      for (let i = 0; i < n; i++) {
        const spread = new THREE.Vector3((rnd() - 0.5) * 1.4, 0.3 + rnd() * 0.5, (rnd() - 0.5) * 1.4);
        addBranch(end, d.clone().add(spread).normalize(), length * (0.68 + rnd() * 0.12), r1, r1 * 0.62, depth + 1, maxDepth);
      }
    } else {
      anchors.push({ pos: end.clone(), radius: r1 * 3 + 0.3 });
    }
  };
  const top = new THREE.Vector3(0, 1.85, 0);
  [
    new THREE.Vector3(0.9, 0.55, 0.2),
    new THREE.Vector3(-0.7, 0.6, 0.55),
    new THREE.Vector3(0.15, 0.65, -0.9),
    new THREE.Vector3(-0.5, 0.5, -0.6),
  ].forEach((d) => addBranch(top, d, 2.1, 0.16, 0.1, 0, 3));

  const jagged = (radius: number, detail: number, jitter: number) => {
    const geo = new THREE.IcosahedronGeometry(radius, detail);
    const a = geo.attributes.position;
    for (let i = 0; i < a.count; i++) {
      const n = 1 + (rnd() - 0.5) * jitter;
      a.setXYZ(i, a.getX(i) * n, a.getY(i) * n, a.getZ(i) * n);
    }
    geo.computeVertexNormals();
    geos.push(geo);
    return geo;
  };
  const large = jagged(0.42, 1, 0.5);
  const mid = jagged(0.26, 1, 0.55);
  const small = jagged(0.14, 0, 0.6);
  const center = new THREE.Vector3(0, 4.6, 0);
  const rxz = 3.5;
  const ry = 2.7;
  const dummy = new THREE.Object3D();
  const scatter = (count: number, geo: THREE.BufferGeometry, mat: THREE.Material, scale: [number, number], shellMin: number, spread: number) => {
    const inst = new THREE.InstancedMesh(geo, mat, count);
    let w = 0;
    for (let i = 0; i < count; i++) {
      const theta = rnd() * Math.PI * 2;
      const phi = Math.acos(2 * rnd() - 1);
      const shell = shellMin + rnd() * spread;
      const y = Math.cos(phi) * ry * shell;
      if (y < -ry * 0.55) continue;
      dummy.position.set(
        center.x + Math.sin(phi) * Math.cos(theta) * rxz * shell,
        center.y + y,
        center.z + Math.sin(phi) * Math.sin(theta) * rxz * shell,
      );
      const sc = scale[0] + rnd() * (scale[1] - scale[0]);
      dummy.scale.set(sc, sc * (0.85 + rnd() * 0.3), sc);
      dummy.rotation.set(rnd() * Math.PI, rnd() * Math.PI, rnd() * Math.PI);
      dummy.updateMatrix();
      inst.setMatrixAt(w++, dummy.matrix);
    }
    inst.count = w;
    inst.instanceMatrix.needsUpdate = true;
    tree.add(inst);
  };
  scatter(420, large, leafMats[0]!, [0.45, 0.7], 0.72, 0.28);
  scatter(700, mid, leafMats[1]!, [0.4, 0.65], 0.55, 0.45);
  scatter(900, small, leafMats[2]!, [0.5, 0.85], 0.35, 0.65);

  tree.userData.dispose = () => {
    for (const g of geos) g.dispose();
    barkMat.dispose();
    for (const m of leafMats) m.dispose();
  };
  return tree;
}
