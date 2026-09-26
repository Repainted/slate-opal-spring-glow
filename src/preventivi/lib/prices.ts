import { getProduct } from "@/preventivi/lib/materials/catalog";
import type { Product } from "@/preventivi/lib/materials/types";
import { getWork } from "@/preventivi/lib/works/catalog";
import type { WorkTemplate } from "@/preventivi/lib/works/types";
import { round2 } from "@/preventivi/lib/format";

export function catalogProductPrice(id: string): number {
  return getProduct(id)?.unitPrice ?? 0;
}

export function catalogWorkPrice(id: string): number {
  return getWork(id)?.unitPrice ?? 0;
}

export function productPrice(id: string, overrides: Record<string, number>): number {
  const o = overrides[id];
  return typeof o === "number" && o >= 0 ? o : catalogProductPrice(id);
}

export function workPrice(id: string, overrides: Record<string, number>): number {
  const o = overrides[id];
  return typeof o === "number" && o >= 0 ? o : catalogWorkPrice(id);
}

export function productPriceUnit(p: Product): "m" | "sacco" | "pz" {
  if (p.kind === "linear") return "m";
  if (p.yieldUnit.startsWith("sacco")) return "sacco";
  return "pz";
}

export function workPriceUnit(w: WorkTemplate): string {
  return w.category === "labor" ? "h" : w.unit;
}

export function clampPrice(n: number): number {
  if (!Number.isFinite(n) || n < 0) return 0;
  return round2(n);
}

export function isCustomPrice(value: number, catalog: number): boolean {
  return Math.abs(value - catalog) > 0.005;
}
