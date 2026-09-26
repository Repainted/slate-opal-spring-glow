import { round2 } from "@/preventivi/lib/format";
import { compute } from "@/preventivi/lib/materials/calc";
import { getProduct } from "@/preventivi/lib/materials/catalog";
import type { ListItem } from "@/preventivi/lib/materials/types";
import { computeExtra, computeWork } from "@/preventivi/lib/works/calc";
import { getWork } from "@/preventivi/lib/works/catalog";
import type { ExtraLine, WorkCat, WorkLine } from "@/preventivi/lib/works/types";

export interface QuoteTotals {
  materials: number;
  works: number;
  extras: number;
  byCat: Record<WorkCat, number>;
  hours: number;
  taxable: number;
  vat: number;
  total: number;
}

export function quoteTotals(
  items: ListItem[],
  works: WorkLine[],
  extras: ExtraLine[],
  vatRate: number,
): QuoteTotals {
  const byCat: Record<WorkCat, number> = {
    labor: 0,
    mezzi: 0,
    ponteggi: 0,
    smaltimento: 0,
    altro: 0,
  };
  let hours = 0;
  let worksSum = 0;
  for (const line of works) {
    const w = getWork(line.workId);
    if (!w) continue;
    const r = computeWork(w, line.input);
    byCat[w.category] += r.total;
    worksSum += r.total;
    if (w.category === "labor") hours += r.hours;
  }
  let materials = 0;
  for (const item of items) {
    const p = getProduct(item.productId);
    if (!p) continue;
    materials += compute(p, { ...item.input, unitPrice: item.input.unitPrice ?? p.unitPrice }).total;
  }
  const extrasSum = extras.reduce((s, e) => s + computeExtra(e), 0);
  const taxable = round2(materials + worksSum + extrasSum);
  const vat = round2(taxable * (Math.max(0, vatRate) / 100));
  return {
    materials: round2(materials),
    works: round2(worksSum),
    extras: round2(extrasSum),
    byCat: {
      labor: round2(byCat.labor),
      mezzi: round2(byCat.mezzi),
      ponteggi: round2(byCat.ponteggi),
      smaltimento: round2(byCat.smaltimento),
      altro: round2(byCat.altro),
    },
    hours: round2(hours),
    taxable,
    vat,
    total: round2(taxable + vat),
  };
}
