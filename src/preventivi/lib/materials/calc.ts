import { round2, round3 } from "@/preventivi/lib/format";
import type { CalcInput, CalcResult, Product } from "./types";

export function emptyInput(product: Pick<Product, "defaultWaste" | "unitPrice">): CalcInput {
  return {
    useDims: false,
    area: 0,
    length: 0,
    width: 0,
    volume: 0,
    bars: 1,
    waste: product.defaultWaste,
    unitPrice: product.unitPrice,
  };
}

export function inputArea(input: CalcInput): number {
  if (input.useDims) return Math.max(0, input.length) * Math.max(0, input.width);
  return Math.max(0, input.area);
}

function ceilQty(raw: number): number {
  if (raw <= 0) return 0;
  return Math.ceil(raw - 1e-9);
}

export function compute(product: Product, input: CalcInput): CalcResult {
  const wasteMul = 1 + Math.max(0, input.waste) / 100;
  const unitPrice = Math.max(0, input.unitPrice ?? product.unitPrice ?? 0);

  if (product.kind === "linear") {
    const n = Math.max(0, input.bars);
    const len = Math.max(0, input.length);
    const meters = round2(n * len * wasteMul);
    const w = product.sectionW ?? 0;
    const h = product.sectionH ?? 0;
    const volumeM3 = w && h ? round3((w / 100) * (h / 100) * meters) : undefined;
    return {
      pieces: n,
      meters,
      volumeM3,
      unit: "ml",
      unitPrice,
      total: round2(meters * unitPrice),
    };
  }

  if (product.kind === "count") {
    const pieces = ceilQty(Math.max(0, input.bars) * wasteMul);
    const packs = product.packSize ? ceilQty(pieces / product.packSize) : undefined;
    const weightKg = product.kgEach ? round2(pieces * product.kgEach) : undefined;
    return { pieces, packs, weightKg, unit: "pz", unitPrice, total: round2(pieces * unitPrice) };
  }

  if (product.kind === "count-volume") {
    const volume = Math.max(0, input.volume);
    const pieces = ceilQty(volume * product.yieldPerUnit * wasteMul);
    const packs = product.packSize ? ceilQty(pieces / product.packSize) : undefined;
    const weightKg = product.kgEach ? round2(pieces * product.kgEach) : undefined;
    return { volume, pieces, packs, weightKg, unit: "sacco", unitPrice, total: round2(pieces * unitPrice) };
  }

  const area = round3(inputArea(input));
  const pieces = ceilQty(area * product.yieldPerUnit * wasteMul);
  const packs = product.packSize ? ceilQty(pieces / product.packSize) : undefined;
  const weightKg = product.kgEach ? round2(pieces * product.kgEach) : undefined;
  const unit = product.yieldUnit.startsWith("sacco") ? "sacco" : "pz";
  return { area, pieces, packs, weightKg, unit, unitPrice, total: round2(pieces * unitPrice) };
}

export function formatWeight(kg: number): { value: number; unit: "kg" | "t" } {
  if (kg >= 1000) return { value: round2(kg / 1000), unit: "t" };
  return { value: round2(kg), unit: "kg" };
}
