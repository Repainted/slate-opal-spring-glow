import { COMUNI } from "./comuni";
import { SENTIERI } from "./sentieri";
import { heightAt, projectComune } from "@/lab/relief";

/** Vette e luoghi che non sono un comune. Quote da cartografia; il modello ora drappeggia sull'EU-DEM. */
export const QUOTE = {
  semprevisa: { id: "semprevisa", nome: "Monte Semprevisa", lat: 41.575, lng: 13.115, m: 1536 },
  lupone: { id: "lupone", nome: "Monte Lupone", lat: 41.665, lng: 12.975, m: 1378 },
  ninfa: { id: "ninfa", nome: "Giardini di Ninfa", lat: 41.583, lng: 12.954, m: 30 },
  fossanova: { id: "fossanova", nome: "Abbazia di Fossanova", lat: 41.439, lng: 13.196, m: 18 },
} as const;

type Node = { nome: string; x: number; z: number };

function comuneNode(slug: string): Node {
  const c = COMUNI.find((n) => n.slug === slug);
  if (!c) throw new Error(`comune ${slug}`);
  const p = projectComune(c.lng, c.lat);
  return { nome: c.nome, x: p.x, z: p.z };
}

function quotaNode(id: keyof typeof QUOTE): Node {
  const q = QUOTE[id];
  const p = projectComune(q.lng, q.lat);
  return { nome: q.nome, x: p.x, z: p.z };
}

export type Punto3 = { x: number; y: number; z: number };

function drapeSegment(a: Node, b: Node, steps: number, ridge: boolean): Punto3[] {
  const pts: Punto3[] = [];
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const len = Math.hypot(dx, dz) || 1;
  const px = -dz / len;
  const pz = dx / len;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    let x = a.x + dx * t;
    let z = a.z + dz * t;
    if (ridge) {
      let bestH = heightAt(x, z);
      let bx = x;
      let bz = z;
      for (const s of [-3.2, -1.6, 0, 1.6, 3.2]) {
        const hx = x + px * s;
        const hz = z + pz * s;
        const h = heightAt(hx, hz);
        if (h > bestH) {
          bestH = h;
          bx = hx;
          bz = hz;
        }
      }
      x = bx;
      z = bz;
    }
    pts.push({ x, y: heightAt(x, z) + 0.85, z });
  }
  return pts;
}

function join(nodes: Node[], ridge: boolean, closed: boolean): Punto3[] {
  const steps = ridge ? 18 : 10;
  const out: Punto3[] = [];
  const n = closed ? nodes.length : nodes.length - 1;
  for (let i = 0; i < n; i++) {
    const a = nodes[i]!;
    const b = nodes[(i + 1) % nodes.length]!;
    const seg = drapeSegment(a, b, steps, ridge);
    if (out.length) seg.shift();
    out.push(...seg);
  }
  if (closed && out.length > 2) {
    const a = out[0]!;
    const b = out[out.length - 1]!;
    if (Math.hypot(a.x - b.x, a.z - b.z) < 0.2) out.pop();
  }
  return out;
}

function loopAround(center: Node, rx: number, rz: number, steps = 28): Punto3[] {
  const out: Punto3[] = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const x = center.x + Math.cos(t) * rx;
    const z = center.z + Math.sin(t) * rz;
    out.push({ x, y: heightAt(x, z) + 0.48, z });
  }
  return out;
}

export type TracciaModello = {
  slug: string;
  closed: boolean;
  ridge: boolean;
  schematic: true;
  punti: Punto3[];
  tappe: Node[];
};

const SPEC: Record<string, { ridge?: boolean; closed?: boolean; build: () => { tappe: Node[]; punti?: Punto3[] } }> = {
  semprevisa: {
    ridge: true,
    build: () => ({ tappe: [comuneNode("bassiano"), comuneNode("carpineto-romano"), quotaNode("semprevisa")] }),
  },
  "cai-701": {
    ridge: true,
    build: () => ({ tappe: [comuneNode("cori"), quotaNode("lupone")] }),
  },
  "cai-702": {
    ridge: true,
    build: () => ({ tappe: [comuneNode("segni"), quotaNode("lupone")] }),
  },
  "cai-736": {
    closed: true,
    build: () => {
      const c = comuneNode("rocca-massima");
      return { tappe: [c], punti: loopAround(c, 5.4, 4.1) };
    },
  },
  "norba-ninfa": {
    build: () => ({ tappe: [comuneNode("norma"), quotaNode("ninfa"), comuneNode("sermoneta")] }),
  },
  fossanova: {
    build: () => ({ tappe: [comuneNode("priverno"), quotaNode("fossanova")] }),
  },
  "mura-segni": {
    closed: true,
    build: () => {
      const c = comuneNode("segni");
      return { tappe: [c], punti: loopAround(c, 2.8, 2.2, 20) };
    },
  },
  "crinale-lento": {
    ridge: true,
    build: () => ({ tappe: [comuneNode("gorga"), comuneNode("montelanico"), comuneNode("bassiano")] }),
  },
};

export const TRACCE: TracciaModello[] = SENTIERI.map((s) => {
  const spec = SPEC[s.slug] ?? { build: () => ({ tappe: s.comuni.map(comuneNode) }) };
  const { tappe, punti } = spec.build();
  const closed = Boolean(spec.closed);
  const ridge = Boolean(spec.ridge);
  return {
    slug: s.slug,
    closed,
    ridge,
    schematic: true as const,
    tappe,
    punti: punti ?? join(tappe, ridge, closed),
  };
});

export function getTraccia(slug: string) {
  return TRACCE.find((t) => t.slug === slug);
}

export function profilo(punti: Punto3[]) {
  if (punti.length < 2) return { km: 0, gain: 0, samples: [] as number[] };
  let km = 0;
  let gain = 0;
  const samples: number[] = [punti[0]!.y];
  for (let i = 1; i < punti.length; i++) {
    const a = punti[i - 1]!;
    const b = punti[i]!;
    km += Math.hypot(b.x - a.x, b.z - a.z) * 0.46;
    const dy = b.y - a.y;
    if (dy > 0) gain += dy * 42;
    samples.push(b.y);
  }
  return { km, gain, samples };
}
