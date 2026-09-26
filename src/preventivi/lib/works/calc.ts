import { round2 } from "@/preventivi/lib/format";
import type { LastMetrics } from "@/preventivi/lib/geometry/calc";
import type { ExtraLine, WorkInput, WorkResult, WorkTemplate } from "./types";

export function emptyWorkInput(work: WorkTemplate, qty = 0, days?: number): WorkInput {
  const isTime = work.category === "labor" || work.unit === "gg";
  return {
    people: work.category === "labor" ? 2 : 1,
    days: days ?? (isTime ? 5 : 1),
    hoursPerDay: work.hoursPerDay || 8,
    qty: qty || (work.unit === "cad" ? 1 : 0),
    unitPrice: work.unitPrice,
  };
}

export function autoQty(work: WorkTemplate, last: LastMetrics): number {
  if (!work.autoFrom) return 0;
  if (work.autoFrom === "wall") return last.wall;
  if (work.autoFrom === "roof") return last.roof;
  if (work.autoFrom === "floor") return last.floor;
  return last.volume;
}

export function suggestLaborDays(work: WorkTemplate, last: LastMetrics, people: number): number | null {
  if (work.category !== "labor" || !work.yieldPerDay) return null;
  const qty = autoQty(work, last);
  if (qty <= 0) return null;
  const p = Math.max(1, people);
  return Math.max(1, Math.ceil(qty / (work.yieldPerDay * p) - 1e-9));
}

export function computeWork(work: WorkTemplate, input: WorkInput): WorkResult {
  const price = Math.max(0, input.unitPrice);

  if (work.category === "labor") {
    const people = Math.max(0, input.people);
    const days = Math.max(0, input.days);
    const hpd = Math.max(0, input.hoursPerDay);
    const hours = round2(people * days * hpd);
    return { hours, qty: hours, unit: "h", total: round2(hours * price) };
  }

  const qty = Math.max(0, work.unit === "gg" ? input.days : input.qty);
  return { hours: 0, qty: round2(qty), unit: work.unit, total: round2(qty * price) };
}

export function computeExtra(line: ExtraLine): number {
  return round2(Math.max(0, line.qty) * Math.max(0, line.unitPrice));
}
