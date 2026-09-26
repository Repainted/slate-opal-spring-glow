import { LOCALE_META } from "@/preventivi/lib/i18n/locales";
import { useI18nStore } from "@/preventivi/lib/i18n/store";

function bcp47(): string {
  return LOCALE_META[useI18nStore.getState().locale].bcp47;
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat(bcp47(), {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatQty(value: number, digits = 2): string {
  return new Intl.NumberFormat(bcp47(), {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatQtyFixed(value: number): string {
  return new Intl.NumberFormat(bcp47(), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat(bcp47(), {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

export function parseDecimal(raw: string): number {
  const n = Number.parseFloat(raw.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function round3(value: number): number {
  return Math.round((value + Number.EPSILON) * 1000) / 1000;
}
