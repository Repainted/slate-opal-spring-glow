import { round2, round3 } from "@/preventivi/lib/format";
import { uid } from "@/preventivi/lib/utils";

export type MeasureKind = "room" | "wall" | "roof" | "porch";
export type RoofKind = "gable" | "shed" | "hip";
export type JobKind = "build" | "demo" | "reno";
export type OpeningKind = "door" | "window";
/** 0 Sud · 1 Est · 2 Nord · 3 Ovest */
export type WallFace = 0 | 1 | 2 | 3;

/** Nessun materiale in quella voce del pacchetto tetto. */
export const ROOF_NONE = "none";

export interface RoofPack {
  covering: string;
  timber: string;
  membrane: string;
  insulation: string;
  gutter: string;
}

export const DEFAULT_ROOF_PACK: RoofPack = {
  covering: "teg-mars",
  timber: "leg-1020",
  membrane: "gua-bit4",
  insulation: "iso-tetto8",
  gutter: "gro-pvc",
};

export interface Opening {
  id: string;
  kind: OpeningKind;
  width: number;
  height: number;
  qty: number;
  wall?: WallFace;
  sill?: number;
}

export interface Measure {
  id: string;
  kind: MeasureKind;
  length: number;
  width: number;
  height: number;
  /** Roof pitch in degrees. 0 = flat plan. */
  pitch: number;
  /** due falde, una falda, o quattro falde (padiglione). */
  roofKind?: RoofKind;
  /** Nuovo, demolizione, o ristruttura (demolizione + nuovo). */
  job?: JobKind;
  /** Pacchetto tetto: tegola/coppo, legno, guaina, isolante, grondaia. */
  roofPack?: Partial<RoofPack>;
  openings: Opening[];
}

export interface Metrics {
  floor: number;
  ceiling: number;
  wallGross: number;
  wallNet: number;
  openings: number;
  volume: number;
  roofPlan: number;
  roof: number;
  perimeter: number;
  joint: number;
  posts: number;
}

export interface LastMetrics {
  roof: number;
  wall: number;
  floor: number;
  volume: number;
}

export const EMPTY_METRICS: LastMetrics = { roof: 0, wall: 0, floor: 0, volume: 0 };

export const WALL_FACES: WallFace[] = [0, 1, 2, 3];

export function roofKindOf(m: Pick<Measure, "roofKind">): RoofKind {
  if (m.roofKind === "shed" || m.roofKind === "hip") return m.roofKind;
  return "gable";
}

export function roofKindLabelKey(rk: RoofKind): "geom.gable" | "geom.shed" | "geom.hip" {
  if (rk === "shed") return "geom.shed";
  if (rk === "hip") return "geom.hip";
  return "geom.gable";
}

export function jobOf(m: Pick<Measure, "job">): JobKind {
  return m.job === "demo" || m.job === "reno" ? m.job : "build";
}

function slotOrNone(value: string | undefined, fallback: string): string {
  if (value === ROOF_NONE || value === "") return ROOF_NONE;
  return value || fallback;
}

function slotRequired(value: string | undefined, fallback: string): string {
  if (!value || value === ROOF_NONE) return fallback;
  return value;
}

export function roofPackOf(m: Pick<Measure, "roofPack">): RoofPack {
  const p = m.roofPack;
  return {
    covering: slotRequired(p?.covering, DEFAULT_ROOF_PACK.covering),
    timber: slotRequired(p?.timber, DEFAULT_ROOF_PACK.timber),
    membrane: slotOrNone(p?.membrane, DEFAULT_ROOF_PACK.membrane),
    insulation: slotOrNone(p?.insulation, DEFAULT_ROOF_PACK.insulation),
    gutter: slotOrNone(p?.gutter, DEFAULT_ROOF_PACK.gutter),
  };
}

export type GutterSystem = "gro-pvc" | "gro-zn" | "gro-al" | "gro-cu";

export function gutterLabelKey(id: string): "geom.gutterPvc" | "geom.gutterZn" | "geom.gutterAl" | "geom.gutterCu" | "geom.none" {
  if (id === "gro-zn") return "geom.gutterZn";
  if (id === "gro-al") return "geom.gutterAl";
  if (id === "gro-cu") return "geom.gutterCu";
  if (id === "gro-pvc") return "geom.gutterPvc";
  return "geom.none";
}

export interface GutterQty {
  gutterMl: number;
  downMl: number;
  downspouts: number;
  brackets: number;
  ends: number;
  corners: number;
  outlets: number;
  elbows: number;
  collars: number;
  joints: number;
}

const EMPTY_GUTTER: GutterQty = {
  gutterMl: 0,
  downMl: 0,
  downspouts: 0,
  brackets: 0,
  ends: 0,
  corners: 0,
  outlets: 0,
  elbows: 0,
  collars: 0,
  joints: 0,
};

/** Canale in gronda, discendenti e pezzi accessori da pianta e falde. */
export function gutterQty(m: Pick<Measure, "kind" | "length" | "width" | "height" | "roofKind">): GutterQty {
  if (m.kind === "wall") return EMPTY_GUTTER;
  const L = Math.max(0, m.length);
  const W = Math.max(0, m.width);
  if (L < 0.4) return EMPTY_GUTTER;
  const H = Math.max(2.2, m.kind === "roof" ? 2.8 : m.height || 2.8);
  const rk = roofKindOf(m);
  let gutterMl: number;
  let ends: number;
  let corners: number;
  let runs: number;
  if (rk === "hip") {
    gutterMl = 2 * (L + Math.max(0.4, W));
    ends = 0;
    corners = 4;
    runs = 1;
  } else if (rk === "shed") {
    gutterMl = L;
    ends = 2;
    corners = 0;
    runs = 1;
  } else {
    gutterMl = 2 * L;
    ends = 4;
    corners = 0;
    runs = 2;
  }
  gutterMl = round3(gutterMl);
  const minSpouts = rk === "shed" ? 1 : 2;
  const downspouts = Math.max(minSpouts, Math.ceil(gutterMl / 8 - 1e-9));
  const downMl = round2(downspouts * H);
  const brackets = Math.max(runs * 2, Math.ceil(gutterMl / 0.6 - 1e-9));
  const bars = Math.max(runs, Math.ceil(gutterMl / 4 - 1e-9));
  const joints = rk === "hip" ? bars : Math.max(0, bars - runs);
  return {
    gutterMl,
    downMl,
    downspouts,
    brackets,
    ends,
    corners,
    outlets: downspouts,
    elbows: downspouts * 2,
    collars: downspouts * Math.max(2, Math.ceil(H / 1.5 - 1e-9)),
    joints,
  };
}

export function defaultOpening(kind: OpeningKind): Opening {
  return kind === "door"
    ? { id: uid("op"), kind: "door", width: 0.8, height: 2.1, qty: 1, wall: 0, sill: 0 }
    : { id: uid("op"), kind: "window", width: 1.2, height: 1.4, qty: 1, wall: 1, sill: 0.9 };
}

export function emptyMeasure(kind: MeasureKind): Measure {
  const roofPack = { ...DEFAULT_ROOF_PACK };
  if (kind === "wall") {
    return { id: uid("ms"), kind, length: 8, width: 0, height: 2.8, pitch: 0, roofKind: "gable", job: "build", roofPack, openings: [] };
  }
  if (kind === "roof") {
    return { id: uid("ms"), kind, length: 10, width: 8, height: 0, pitch: 30, roofKind: "gable", job: "build", roofPack, openings: [] };
  }
  if (kind === "porch") {
    return { id: uid("ms"), kind, length: 5, width: 3.2, height: 2.4, pitch: 15, roofKind: "shed", job: "build", roofPack, openings: [] };
  }
  return {
    id: uid("ms"),
    kind,
    length: 4.5,
    width: 3.5,
    height: 2.8,
    pitch: 25,
    roofKind: "gable",
    job: "build",
    roofPack,
    openings: [defaultOpening("door"), defaultOpening("window")],
  };
}

function openingsArea(openings: Opening[]): number {
  return openings.reduce((sum, o) => sum + Math.max(0, o.width) * Math.max(0, o.height) * Math.max(0, o.qty), 0);
}

export function openingsJoint(openings: Opening[]): number {
  return round3(
    openings.reduce(
      (sum, o) => sum + 2 * (Math.max(0, o.width) + Math.max(0, o.height)) * Math.max(0, o.qty),
      0,
    ),
  );
}

export function computeMetrics(m: Measure): Metrics {
  const L = Math.max(0, m.length);
  const W = Math.max(0, m.width);
  const H = Math.max(0, m.height);
  const pitch = Math.max(0, Math.min(60, m.pitch));
  const holes = round3(openingsArea(m.openings));
  const joint = openingsJoint(m.openings);
  const rk = roofKindOf(m);
  const rad = (pitch * Math.PI) / 180;
  const factor = pitch === 0 ? 1 : 1 / Math.cos(rad);
  const rise =
    pitch < 0.5
      ? 0
      : rk === "shed"
        ? W * Math.tan(rad)
        : rk === "hip"
          ? (Math.min(L, W) / 2) * Math.tan(rad)
          : (W / 2) * Math.tan(rad);

  if (m.kind === "wall") {
    const wallGross = round3(L * H);
    const wallNet = round3(Math.max(0, wallGross - holes));
    return {
      floor: 0,
      ceiling: 0,
      wallGross,
      wallNet,
      openings: holes,
      volume: 0,
      roofPlan: 0,
      roof: 0,
      perimeter: round3(L),
      joint,
      posts: 0,
    };
  }

  if (m.kind === "roof") {
    const roofPlan = round3(L * W);
    const roof = round3(roofPlan * factor);
    return {
      floor: 0,
      ceiling: 0,
      wallGross: 0,
      wallNet: 0,
      openings: 0,
      volume: 0,
      roofPlan,
      roof,
      perimeter: round3(2 * (L + W)),
      joint: 0,
      posts: 0,
    };
  }

  const floor = round3(L * W);
  const perimeter = round3(2 * (L + W));
  let wallGross = round3(perimeter * H);
  if (m.kind === "room" && rise > 0.02) {
    if (rk === "shed") wallGross = round3(perimeter * H + rise * (L + W));
    else if (rk === "hip") wallGross = round3(perimeter * H);
    else wallGross = round3(perimeter * H + W * rise);
  }
  const wallNet = m.kind === "porch" ? 0 : round3(Math.max(0, wallGross - holes));
  const roofPlan = floor;
  const roof = pitch > 0.5 || m.kind === "porch" || m.kind === "room" ? round3(roofPlan * factor) : 0;
  const posts = m.kind === "porch" ? Math.max(4, 2 * (Math.ceil(L / 2.5) + 1)) : 0;

  return {
    floor,
    ceiling: floor,
    wallGross: m.kind === "porch" ? 0 : wallGross,
    wallNet,
    openings: m.kind === "porch" ? 0 : holes,
    volume: round3(L * W * H),
    roofPlan,
    roof,
    perimeter,
    joint: m.kind === "porch" ? 0 : joint,
    posts,
  };
}

export function toLastMetrics(kind: MeasureKind, metrics: Metrics, prev: LastMetrics): LastMetrics {
  if (kind === "roof") return { ...prev, roof: metrics.roof };
  if (kind === "wall") return { ...prev, wall: metrics.wallNet };
  if (kind === "porch") return { ...prev, roof: metrics.roof, floor: metrics.floor, volume: metrics.volume };
  return { ...prev, floor: metrics.floor, wall: metrics.wallNet, volume: metrics.volume, roof: metrics.roof || prev.roof };
}

export function kindLabelKey(kind: MeasureKind): "geom.tetto" | "geom.stanza" | "geom.muro" | "geom.portico" {
  if (kind === "roof") return "geom.tetto";
  if (kind === "wall") return "geom.muro";
  if (kind === "porch") return "geom.portico";
  return "geom.stanza";
}

export function kindSlug(kind: MeasureKind): "tetto" | "stanza" | "muro" | "portico" {
  if (kind === "roof") return "tetto";
  if (kind === "wall") return "muro";
  if (kind === "porch") return "portico";
  return "stanza";
}

export function pitchFactor(deg: number): number {
  const pitch = Math.max(0, Math.min(60, deg));
  if (pitch === 0) return 1;
  return round2(1 / Math.cos((pitch * Math.PI) / 180));
}

