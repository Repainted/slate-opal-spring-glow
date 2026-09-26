export const CATEGORY_IDS = [
  "tegole",
  "coppi",
  "guaine",
  "gronde",
  "poroton",
  "cemento",
  "foratini",
  "mattoni",
  "legno",
  "isolanti",
  "intonaci",
  "sigillanti",
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export type ProductKind = "count-area" | "count-volume" | "linear" | "count";

export type AreaSurface = "roof" | "wall" | "floor" | "joint";

export interface Product {
  id: string;
  category: CategoryId;
  kind: ProductKind;
  /** cm, shown as-is (numbers are universal). */
  sizeLabel: string;
  /** Pieces per m², bags per m³, or bags per m² (massetto). */
  yieldPerUnit: number;
  yieldUnit: "pz/m²" | "sacco/m³" | "sacco/m²" | "ml" | "pz/ml" | "pz";
  packSize?: number;
  packKind?: "bancale" | "sacco" | "cartone" | "rotolo";
  kgEach?: number;
  bagKg?: number;
  defaultWaste: number;
  /** List price: € / piece, bag, or linear metre. */
  unitPrice: number;
  areaSurface?: AreaSurface;
  /** Wood section in cm. */
  sectionW?: number;
  sectionH?: number;
}

export interface CalcInput {
  useDims: boolean;
  area: number;
  length: number;
  width: number;
  volume: number;
  bars: number;
  waste: number;
  unitPrice: number;
}

export interface CalcResult {
  area?: number;
  volume?: number;
  pieces: number;
  packs?: number;
  weightKg?: number;
  meters?: number;
  volumeM3?: number;
  unit: "pz" | "sacco" | "ml";
  unitPrice: number;
  total: number;
}

export interface ListItem {
  id: string;
  productId: string;
  input: CalcInput;
  addedAt: string;
  source?: "3d";
}
