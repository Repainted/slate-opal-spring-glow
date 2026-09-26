import { emptyMeasure, roofKindOf, roofPackOf, type Measure, type Opening, type RoofKind, type WallFace } from "./calc";
export type { WallFace, RoofKind };
import type { ListItem } from "@/preventivi/lib/materials/types";
import { getProduct } from "@/preventivi/lib/materials/catalog";
import type { WorkLine } from "@/preventivi/lib/works/types";

export interface PlacedOpening {
  kind: Opening["kind"];
  wall: WallFace;
  offset: number;
  width: number;
  height: number;
  sill: number;
}

export interface BuildingSpec {
  id: string;
  kind: Measure["kind"];
  length: number;
  depth: number;
  height: number;
  pitch: number;
  thickness: number;
  roofKind: RoofKind;
  openings: PlacedOpening[];
}

export type RoofStyle = "tegola" | "coppo";
export type GutterStyle = "none" | "pvc" | "zn" | "al" | "cu";

export function roofStyleOfCovering(productId: string): RoofStyle {
  return getProduct(productId)?.category === "coppi" ? "coppo" : "tegola";
}

export function gutterStyleOf(systemId: string): GutterStyle {
  if (systemId === "gro-zn") return "zn";
  if (systemId === "gro-al") return "al";
  if (systemId === "gro-cu") return "cu";
  if (systemId === "gro-pvc") return "pvc";
  return "none";
}

export interface SceneLayers {
  masonry: boolean;
  roofing: boolean;
  timber: boolean;
  scaffold: boolean;
  roofStyle: RoofStyle;
  gutterStyle: GutterStyle;
}

export const EMPTY_LAYERS: SceneLayers = {
  masonry: false,
  roofing: false,
  timber: false,
  scaffold: false,
  roofStyle: "tegola",
  gutterStyle: "none",
};

export type CameraPreset = "iso" | "sud" | "est" | "pianta";

/**
 * World frame for a wall's outer face.
 * +X east, −X west, +Z south, −Z north (north-up plan).
 * Origin is the outer-left corner when facing the wall from outside.
 * Local +X runs left→right along the wall; local +Z is outward.
 */
export function wallFrame(
  face: WallFace,
  length: number,
  depth: number,
): { ox: number; oz: number; rotY: number; len: number } {
  const L = length;
  const D = depth;
  if (face === 0) return { ox: -L / 2, oz: D / 2, rotY: 0, len: L };
  if (face === 1) return { ox: L / 2, oz: D / 2, rotY: -Math.PI / 2, len: D };
  if (face === 2) return { ox: L / 2, oz: -D / 2, rotY: Math.PI, len: L };
  return { ox: -L / 2, oz: -D / 2, rotY: Math.PI / 2, len: D };
}

export function wallLocalToWorld(
  face: WallFace,
  length: number,
  depth: number,
  localX: number,
  localZ = 0,
): { x: number; z: number } {
  const f = wallFrame(face, length, depth);
  const c = Math.cos(f.rotY);
  const s = Math.sin(f.rotY);
  return {
    x: f.ox + localX * c - localZ * s,
    z: f.oz + localX * s + localZ * c,
  };
}

export function wallLength(spec: BuildingSpec, face: WallFace): number {
  return face === 0 || face === 2 ? spec.length : spec.depth;
}

export function placeOpenings(m: Measure): PlacedOpening[] {
  const L = Math.max(0.4, m.length);
  const D = m.kind === "wall" ? L : Math.max(0.4, m.width);
  const H = Math.max(0.8, m.kind === "roof" ? 2.8 : m.height || 2.8);
  const lens: number[] = m.kind === "wall" ? [L, L, L, L] : [L, D, L, D];
  const used = [0, 0, 0, 0];
  const out: PlacedOpening[] = [];

  for (const o of m.openings) {
    const qty = Math.max(1, Math.round(o.qty) || 1);
    const wall: WallFace = m.kind === "wall" ? 0 : ((o.wall ?? (o.kind === "door" ? 0 : 1)) as WallFace);
    const wallLen = lens[wall] ?? L;
    const width = Math.min(Math.max(0.4, o.width), wallLen - 0.2);
    const sill = o.kind === "door" ? 0 : Math.max(0, o.sill ?? 0.9);
    const height = Math.min(Math.max(0.4, o.height), Math.max(0.4, H - sill - 0.12));
    const total = qty * width + (qty - 1) * 0.45;
    let start = Math.max(0.2, (wallLen - total) / 2);
    if (used[wall] > 0) start = used[wall] + 0.45;

    for (let i = 0; i < qty; i++) {
      let offset = start + i * (width + 0.45);
      if (offset + width > wallLen - 0.08) offset = Math.max(0.12, wallLen - width - 0.12);
      out.push({ kind: o.kind, wall, offset, width, height, sill });
      used[wall] = offset + width;
    }
  }
  return out;
}

export function measureToBuilding(m: Measure, thickness = 0.25): BuildingSpec {
  const t = Math.max(0.08, Math.min(0.5, thickness));
  const rk = roofKindOf(m);
  if (m.kind === "wall") {
    return {
      id: m.id,
      kind: "wall",
      length: Math.max(0.6, m.length),
      depth: t,
      height: Math.max(0.8, m.height || 2.8),
      pitch: 0,
      thickness: t,
      roofKind: "gable",
      openings: placeOpenings(m),
    };
  }
  if (m.kind === "roof") {
    return {
      id: m.id,
      kind: "roof",
      length: Math.max(0.6, m.length),
      depth: Math.max(0.6, m.width),
      height: 2.8,
      pitch: Math.max(0, Math.min(60, m.pitch)),
      thickness: t,
      roofKind: rk,
      openings: [],
    };
  }
  if (m.kind === "porch") {
    return {
      id: m.id,
      kind: "porch",
      length: Math.max(1.2, m.length),
      depth: Math.max(1.2, m.width),
      height: Math.max(2, m.height || 2.4),
      pitch: Math.max(0, Math.min(60, m.pitch)),
      thickness: t,
      roofKind: rk,
      openings: [],
    };
  }
  return {
    id: m.id,
    kind: "room",
    length: Math.max(0.6, m.length),
    depth: Math.max(0.6, m.width),
    height: Math.max(0.8, m.height || 2.8),
    pitch: Math.max(0, Math.min(60, m.pitch)),
    thickness: t,
    roofKind: rk,
    openings: placeOpenings(m),
  };
}

export function composeBuilding(
  draft: Measure | null,
  measures: Measure[],
  selectedId: string | null,
  thickness = 0.25,
): BuildingSpec {
  const selected = selectedId ? measures.find((m) => m.id === selectedId) : undefined;
  let primary = selected ?? draft ?? measures[0] ?? emptyMeasure("room");

  if (primary.kind === "room") {
    const roof = measures.find((m) => m.kind === "roof");
    if (roof) {
      primary = {
        ...primary,
        pitch: roof.pitch,
        roofKind: roofKindOf(roof),
        length: primary.length,
        width: primary.width,
      };
    }
  }
  if (primary.kind === "roof" && measures.some((m) => m.kind === "room")) {
    const room = measures.find((m) => m.kind === "room")!;
    primary = {
      ...room,
      pitch: primary.pitch,
      roofKind: roofKindOf(primary),
      length: primary.length || room.length,
      width: primary.width || room.width,
    };
  }
  return measureToBuilding(primary, thickness);
}

export function inferLayers(items: ListItem[], works: WorkLine[]): SceneLayers {
  const layers: SceneLayers = { ...EMPTY_LAYERS };
  for (const it of items) {
    const p = getProduct(it.productId);
    if (!p) continue;
    if (p.category === "poroton" || p.category === "mattoni" || p.category === "foratini") layers.masonry = true;
    if (p.category === "tegole") {
      layers.roofing = true;
      layers.roofStyle = "tegola";
    }
    if (p.category === "coppi") {
      layers.roofing = true;
      layers.roofStyle = "coppo";
    }
    if (p.category === "legno") layers.timber = true;
  }
  for (const w of works) {
    if (w.workId.startsWith("pon-")) layers.scaffold = true;
  }
  return layers;
}

export function layersFromMeasure(m: Measure, items: ListItem[], works: WorkLine[]): SceneLayers {
  const inferred = inferLayers(items, works);
  const pack = roofPackOf(m);
  return {
    masonry: inferred.masonry || (m.kind !== "roof" && m.kind !== "porch"),
    roofing: inferred.roofing || m.kind !== "wall",
    timber: inferred.timber || m.kind === "porch" || m.kind === "roof" || roofKindOf(m) === "hip",
    scaffold: inferred.scaffold,
    roofStyle: roofStyleOfCovering(pack.covering),
    gutterStyle: gutterStyleOf(pack.gutter),
  };
}

export function thicknessFromItems(items: ListItem[]): number {
  for (const it of items) {
    const p = getProduct(it.productId);
    if (!p) continue;
    const m = /^por-(\d+)$/.exec(p.id);
    if (m) return Number(m[1]) / 100;
    if (p.id.startsWith("for-8")) return 0.08;
    if (p.id.startsWith("for-12")) return 0.12;
    if (p.category === "mattoni") return 0.12;
  }
  return 0.25;
}

export function roofRise(spec: Pick<BuildingSpec, "kind" | "pitch" | "depth" | "length" | "roofKind">): number {
  if (spec.kind === "wall" || spec.pitch < 0.5) return 0;
  const rad = (spec.pitch * Math.PI) / 180;
  if (spec.roofKind === "shed") return spec.depth * Math.tan(rad);
  const span = spec.roofKind === "hip" ? Math.min(spec.length, spec.depth) : spec.depth;
  return (span / 2) * Math.tan(rad);
}

/** Ridge of a hip roof in plan. Ends coincide when the plan is square. */
export function hipRidgePlan(length: number, depth: number): {
  ax: number;
  az: number;
  bx: number;
  bz: number;
  alongX: boolean;
} {
  if (length >= depth) {
    const half = Math.max(0, (length - depth) / 2);
    return { ax: -half, az: 0, bx: half, bz: 0, alongX: true };
  }
  const half = Math.max(0, (depth - length) / 2);
  return { ax: 0, az: half, bx: 0, bz: -half, alongX: false };
}

export function postPositions(spec: Pick<BuildingSpec, "kind" | "length" | "depth">): { x: number; z: number }[] {
  if (spec.kind !== "porch") return [];
  const L = spec.length;
  const D = spec.depth;
  const nX = Math.max(2, Math.ceil(L / 2.5) + 1);
  const inset = 0.12;
  const zs = [D / 2 - inset, -(D / 2 - inset)];
  const out: { x: number; z: number }[] = [];
  for (let i = 0; i < nX; i++) {
    const x = -L / 2 + inset + (i / (nX - 1)) * (L - 2 * inset);
    for (const z of zs) out.push({ x, z });
  }
  return out;
}
