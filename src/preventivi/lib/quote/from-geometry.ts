import { computeMetrics, gutterQty, jobOf, roofKindOf, roofPackOf, ROOF_NONE, type Measure } from "@/preventivi/lib/geometry/calc";
import { engineWorks, mergeWorks, runEngine } from "@/preventivi/lib/engine/site";
import { emptyInput } from "@/preventivi/lib/materials/calc";
import { getProduct, gutterPartId } from "@/preventivi/lib/materials/catalog";
import type { CalcInput } from "@/preventivi/lib/materials/types";
import type { WorkInput } from "@/preventivi/lib/works/types";

export interface BomMaterial {
  productId: string;
  input: CalcInput;
}

export interface BomWork {
  workId: string;
  input: WorkInput;
}

export interface GeometryQuote {
  materials: BomMaterial[];
  works: BomWork[];
}

function areaIn(productId: string, area: number): BomMaterial | null {
  const p = getProduct(productId);
  if (!p || area <= 0.05) return null;
  return { productId, input: { ...emptyInput(p), area } };
}

function countIn(productId: string, qty: number): BomMaterial | null {
  const p = getProduct(productId);
  if (!p || qty < 0.5) return null;
  return { productId, input: { ...emptyInput(p), bars: Math.round(qty) } };
}

function linIn(productId: string, bars: number, length: number): BomMaterial | null {
  const p = getProduct(productId);
  if (!p || bars <= 0 || length <= 0.05) return null;
  return { productId, input: { ...emptyInput(p), bars, length } };
}

function push(out: BomMaterial[], line: BomMaterial | null) {
  if (line) out.push(line);
}

export function quoteFromMeasure(m: Measure, thickness = 0.25): GeometryQuote {
  const r = computeMetrics(m);
  const materials: BomMaterial[] = [];
  const job = jobOf(m);
  const engine = runEngine(m, thickness);

  if (job !== "demo") {
    const rk = roofKindOf(m);
    const rad = (Math.max(0, m.pitch) * Math.PI) / 180;
    const short = Math.min(Math.max(0.4, m.length), Math.max(0.4, m.width));
    const hyp =
      m.pitch < 0.5
        ? Math.max(0.4, m.width)
        : rk === "shed"
          ? m.width / Math.cos(rad)
          : (rk === "hip" ? short : m.width) / 2 / Math.cos(rad);

    if (m.kind === "room" || m.kind === "wall") {
      push(materials, areaIn("por-25", r.wallNet));
      push(materials, areaIn("mal-m5", r.wallNet));
      push(materials, areaIn("int-civ", r.wallNet * 2));
      push(materials, areaIn("iso-eps10", r.wallNet));
      if (r.joint > 0) {
        push(materials, areaIn("sil-neu", r.joint));
        push(materials, areaIn("sch-pu", r.joint * 0.5));
      }
    }

    if (m.kind === "room" || m.kind === "porch") {
      push(materials, areaIn("cem-massetto", r.floor));
      push(materials, areaIn("col-c2", r.floor));
    }

    if (r.roof > 0.05 && m.kind !== "wall") {
      const pack = roofPackOf(m);
      push(materials, areaIn(pack.covering, r.roof));
      if (pack.insulation !== ROOF_NONE) push(materials, areaIn(pack.insulation, r.roof));
      if (pack.membrane !== ROOF_NONE) push(materials, areaIn(pack.membrane, r.roof));
      const n = Math.max(3, Math.round(m.length / 0.8) + 1);
      const nShort = Math.max(3, Math.round(short / 0.8) + 1);
      const rafterLen = Math.max(0.8, hyp);
      const rafterBars = rk === "shed" ? n : rk === "hip" ? n * 2 + nShort * 2 : n * 2;
      const timber = pack.timber;
      push(materials, linIn(timber, rafterBars, rafterLen));
      if (rk === "hip") {
        const rise = m.pitch < 0.5 ? 0 : (short / 2) * Math.tan(rad);
        const hipLen = Math.max(0.8, Math.hypot(short * Math.SQRT1_2, rise));
        push(materials, linIn(timber, 4, hipLen));
        push(materials, linIn(timber, 1, Math.max(0.4, Math.abs(m.length - m.width) || 0.4)));
        push(materials, linIn(timber, 2, Math.max(0.8, m.length)));
        push(materials, linIn(timber, 2, Math.max(0.8, m.width)));
      } else {
        push(materials, linIn(timber, 2, Math.max(0.8, m.length)));
      }

      if (pack.gutter !== ROOF_NONE) {
        const g = gutterQty(m);
        const sys = pack.gutter;
        const H = Math.max(2.2, m.kind === "roof" ? 2.8 : m.height || 2.8);
        push(materials, linIn(gutterPartId(sys, "can"), 1, g.gutterMl));
        push(materials, linIn(gutterPartId(sys, "dis"), g.downspouts, H));
        push(materials, countIn(gutterPartId(sys, "sta"), g.brackets));
        push(materials, countIn(gutterPartId(sys, "tes"), g.ends));
        push(materials, countIn(gutterPartId(sys, "ang"), g.corners));
        push(materials, countIn(gutterPartId(sys, "boc"), g.outlets));
        push(materials, countIn(gutterPartId(sys, "gom"), g.elbows));
        push(materials, countIn(gutterPartId(sys, "col"), g.collars));
        push(materials, countIn(gutterPartId(sys, "giu"), g.joints));
      }
    }

    if (m.kind === "porch") {
      const posts = Math.max(4, r.posts || 4);
      push(materials, linIn("leg-1224", posts, Math.max(2, m.height)));
    }
  }

  return { materials, works: engineWorks(engine, r.wallNet) };
}

export function quoteFromMeasures(measures: Measure[], thickness = 0.25): GeometryQuote {
  const materials: BomMaterial[] = [];
  const works: BomWork[] = [];
  for (const m of measures) {
    const q = quoteFromMeasure(m, thickness);
    materials.push(...q.materials);
    works.push(...q.works);
  }
  return { materials, works: mergeWorks(works) };
}
