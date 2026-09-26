export const WORK_CATS = ["labor", "mezzi", "ponteggi", "smaltimento", "altro"] as const;
export type WorkCat = (typeof WORK_CATS)[number];

export type WorkUnit = "h" | "gg" | "cad" | "m²" | "m³" | "t" | "ml";

export type AutoFrom = "wall" | "roof" | "floor" | "volume";

export interface WorkTemplate {
  id: string;
  category: WorkCat;
  unit: WorkUnit;
  unitPrice: number;
  hoursPerDay: number;
  autoFrom?: AutoFrom;
  /** Output per person per day, same unit as autoFrom (m² or m³). Labor only. */
  yieldPerDay?: number;
}

export interface WorkInput {
  people: number;
  days: number;
  hoursPerDay: number;
  qty: number;
  unitPrice: number;
}

export interface WorkLine {
  id: string;
  workId: string;
  input: WorkInput;
  addedAt: string;
  source?: "3d";
}

export interface WorkResult {
  hours: number;
  qty: number;
  unit: WorkUnit;
  total: number;
}

export interface ExtraLine {
  id: string;
  name: string;
  unit: WorkUnit;
  qty: number;
  unitPrice: number;
  addedAt: string;
}

export interface QuoteMeta {
  site: string;
  client: string;
  date: string;
  notes: string;
}

export function emptyQuoteMeta(): QuoteMeta {
  const d = new Date();
  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return { site: "", client: "", date, notes: "" };
}
