import type { WorkCat, WorkTemplate } from "./types";

export const WORKS: WorkTemplate[] = [
  { id: "lab-ope", category: "labor", unit: "h", unitPrice: 22, hoursPerDay: 8, autoFrom: "wall", yieldPerDay: 10 },
  { id: "lab-mur", category: "labor", unit: "h", unitPrice: 28, hoursPerDay: 8, autoFrom: "wall", yieldPerDay: 8 },
  { id: "lab-spe", category: "labor", unit: "h", unitPrice: 32, hoursPerDay: 8, autoFrom: "roof", yieldPerDay: 10 },
  { id: "lab-cap", category: "labor", unit: "h", unitPrice: 35, hoursPerDay: 8 },

  { id: "mez-fur", category: "mezzi", unit: "gg", unitPrice: 90, hoursPerDay: 8 },
  { id: "mez-cam", category: "mezzi", unit: "gg", unitPrice: 190, hoursPerDay: 8 },
  { id: "mez-esc", category: "mezzi", unit: "gg", unitPrice: 160, hoursPerDay: 8 },
  { id: "mez-pal", category: "mezzi", unit: "gg", unitPrice: 150, hoursPerDay: 8 },
  { id: "mez-pia", category: "mezzi", unit: "gg", unitPrice: 140, hoursPerDay: 8 },
  { id: "mez-gru", category: "mezzi", unit: "gg", unitPrice: 280, hoursPerDay: 8 },
  { id: "mez-bet", category: "mezzi", unit: "gg", unitPrice: 45, hoursPerDay: 8 },
  { id: "mez-pom", category: "mezzi", unit: "gg", unitPrice: 350, hoursPerDay: 8 },
  { id: "mez-com", category: "mezzi", unit: "gg", unitPrice: 55, hoursPerDay: 8 },

  { id: "pon-fac", category: "ponteggi", unit: "m²", unitPrice: 22, hoursPerDay: 8, autoFrom: "wall" },
  { id: "pon-tub", category: "ponteggi", unit: "m²", unitPrice: 16, hoursPerDay: 8, autoFrom: "wall" },
  { id: "pon-int", category: "ponteggi", unit: "m²", unitPrice: 14, hoursPerDay: 8, autoFrom: "wall" },
  { id: "pon-tra", category: "ponteggi", unit: "gg", unitPrice: 18, hoursPerDay: 8 },
  { id: "pon-mon", category: "ponteggi", unit: "m²", unitPrice: 8, hoursPerDay: 8, autoFrom: "wall" },

  { id: "sma-c5", category: "smaltimento", unit: "cad", unitPrice: 220, hoursPerDay: 8 },
  { id: "sma-c10", category: "smaltimento", unit: "cad", unitPrice: 320, hoursPerDay: 8 },
  { id: "sma-ine", category: "smaltimento", unit: "t", unitPrice: 90, hoursPerDay: 8 },
  { id: "sma-mac", category: "smaltimento", unit: "t", unitPrice: 140, hoursPerDay: 8 },
  { id: "sma-vol", category: "smaltimento", unit: "m³", unitPrice: 55, hoursPerDay: 8, autoFrom: "volume" },
  { id: "sma-leg", category: "smaltimento", unit: "t", unitPrice: 80, hoursPerDay: 8 },

  { id: "alt-all", category: "altro", unit: "cad", unitPrice: 450, hoursPerDay: 8 },
  { id: "alt-sgom", category: "altro", unit: "cad", unitPrice: 280, hoursPerDay: 8 },
  { id: "alt-tras", category: "altro", unit: "cad", unitPrice: 180, hoursPerDay: 8 },
  { id: "alt-dpi", category: "altro", unit: "cad", unitPrice: 160, hoursPerDay: 8 },
  { id: "alt-rec", category: "altro", unit: "ml", unitPrice: 8, hoursPerDay: 8 },
  { id: "alt-wc", category: "altro", unit: "gg", unitPrice: 12, hoursPerDay: 8 },
  { id: "alt-bar", category: "altro", unit: "gg", unitPrice: 25, hoursPerDay: 8 },
  { id: "dem-mur", category: "altro", unit: "m³", unitPrice: 85, hoursPerDay: 8, autoFrom: "volume" },
  { id: "dem-int", category: "altro", unit: "m²", unitPrice: 12, hoursPerDay: 8, autoFrom: "wall" },
  { id: "dem-pav", category: "altro", unit: "m²", unitPrice: 18, hoursPerDay: 8, autoFrom: "floor" },
  { id: "dem-cop", category: "altro", unit: "m²", unitPrice: 22, hoursPerDay: 8, autoFrom: "roof" },
];

export function worksIn(cat: WorkCat): WorkTemplate[] {
  return WORKS.filter((w) => w.category === cat);
}

export function getWork(id: string): WorkTemplate | undefined {
  return WORKS.find((w) => w.id === id);
}

export const WORK_CAT_ORDER: WorkCat[] = ["labor", "mezzi", "ponteggi", "smaltimento", "altro"];

export const WORK_UNITS: WorkTemplate["unit"][] = ["cad", "h", "gg", "m²", "m³", "t", "ml"];
