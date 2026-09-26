import { round2, round3 } from "@/preventivi/lib/format";
import { computeMetrics, jobOf, type JobKind, type Measure } from "@/preventivi/lib/geometry/calc";
import { emptyWorkInput } from "@/preventivi/lib/works/calc";
import { getWork } from "@/preventivi/lib/works/catalog";
import type { WorkInput } from "@/preventivi/lib/works/types";

/** Medie di cantiere italiano, squadra piccola. Rese a persona / giorno. */
const YIELD = {
  buildWall: 8,
  buildRoof: 10,
  buildFloor: 22,
  demoWall: 10,
  demoFloor: 16,
  demoRoof: 16,
} as const;

const CREW = 2;
const HPD = 8;

/** Poroton / muratura in opera, t/m³. */
const MASONRY_T_M3 = 1.2;
/** Rigonfiamento macerie. */
const SWELL = 1.4;
/** Intonaco una faccia, t/m². */
const PLASTER_T_M2 = 0.022;
/** Massetto 5 cm + pavimento, t/m². */
const FLOOR_T_M2 = 0.16;
const ROOF_TILE_T_M2 = 0.048;
const ROOF_WOOD_T_M2 = 0.018;
const PORCH_WOOD_T_M2 = 0.028;
/** Densità macerie sciolte in cassone, t/m³. */
const SKIP_T_M3 = 1.15;

export interface Debris {
  masonryM3: number;
  plasterM2: number;
  floorM2: number;
  roofM2: number;
  timberT: number;
  mixedT: number;
  tonnes: number;
  looseM3: number;
  bins10: number;
  bins5: number;
}

export interface CrewRole {
  workId: string;
  people: number;
  days: number;
}

export interface EngineResult {
  job: JobKind;
  people: number;
  days: number;
  hours: number;
  laborCost: number;
  roles: CrewRole[];
  debris: Debris;
}

function daysFor(qty: number, perPerson: number, people = CREW): number {
  if (qty < 0.25) return 0;
  return Math.max(1, Math.ceil(qty / (perPerson * Math.max(1, people)) - 1e-9));
}

function addRole(roles: Map<string, CrewRole>, workId: string, days: number, people = CREW) {
  if (days <= 0) return;
  const prev = roles.get(workId);
  if (prev) {
    prev.days += days;
    prev.people = Math.max(prev.people, people);
  } else {
    roles.set(workId, { workId, people, days });
  }
}

function emptyDebris(): Debris {
  return {
    masonryM3: 0,
    plasterM2: 0,
    floorM2: 0,
    roofM2: 0,
    timberT: 0,
    mixedT: 0,
    tonnes: 0,
    looseM3: 0,
    bins10: 0,
    bins5: 0,
  };
}

function packBins(looseM3: number): { bins10: number; bins5: number } {
  if (looseM3 < 0.4) return { bins10: 0, bins5: 0 };
  let bins10 = Math.floor(looseM3 / 10);
  let rest = round2(looseM3 - bins10 * 10);
  if (rest > 5.2) {
    bins10 += 1;
    rest = 0;
  }
  const bins5 = rest >= 0.4 ? 1 : 0;
  if (bins10 === 0 && bins5 === 0) return { bins10: 0, bins5: 1 };
  return { bins10, bins5 };
}

export function runEngine(m: Measure, thickness = 0.25, workPrices: Record<string, number> = {}): EngineResult {
  const r = computeMetrics(m);
  const job = jobOf(m);
  const t = Math.max(0.08, Math.min(0.5, thickness));
  const demo = job === "demo" || job === "reno";
  const build = job === "build" || job === "reno";

  const debris = emptyDebris();
  if (demo) {
    if (m.kind === "room" || m.kind === "wall") {
      debris.masonryM3 = round3(r.wallNet * t);
      debris.plasterM2 = round3(r.wallNet * 2);
    }
    if (m.kind === "room" || m.kind === "porch") debris.floorM2 = r.floor;
    if (m.kind !== "wall") debris.roofM2 = r.roof;
    const masonryT = debris.masonryM3 * MASONRY_T_M3;
    const plasterT = debris.plasterM2 * PLASTER_T_M2;
    const floorT = debris.floorM2 * FLOOR_T_M2;
    const tileT = debris.roofM2 * ROOF_TILE_T_M2;
    const woodT =
      debris.roofM2 * (m.kind === "porch" ? PORCH_WOOD_T_M2 : ROOF_WOOD_T_M2) +
      (m.kind === "porch" ? Math.max(4, r.posts) * Math.max(2, m.height) * 0.12 * 0.24 * 0.5 : 0);
    debris.timberT = round2(woodT);
    debris.mixedT = round2(masonryT + plasterT + floorT + tileT);
    debris.tonnes = round2(debris.mixedT + debris.timberT);
    const inSitu = debris.masonryM3 * SWELL + (plasterT + floorT + tileT + woodT) / SKIP_T_M3;
    debris.looseM3 = round2(Math.max(inSitu, debris.tonnes / SKIP_T_M3));
    const bins = packBins(debris.looseM3);
    debris.bins10 = bins.bins10;
    debris.bins5 = bins.bins5;
  }

  const roles = new Map<string, CrewRole>();
  if (demo) {
    addRole(roles, "lab-ope", daysFor(r.wallNet, YIELD.demoWall));
    addRole(roles, "lab-ope", daysFor(r.floor, YIELD.demoFloor));
    addRole(roles, "lab-ope", daysFor(r.roof, YIELD.demoRoof));
  }
  if (build) {
    if (m.kind === "room" || m.kind === "wall") addRole(roles, "lab-mur", daysFor(r.wallNet, YIELD.buildWall));
    if (m.kind !== "wall" && r.roof > 0.2) addRole(roles, "lab-spe", daysFor(r.roof, YIELD.buildRoof));
    if ((m.kind === "room" || m.kind === "porch") && r.floor > 0.2) {
      addRole(roles, "lab-ope", daysFor(r.floor, YIELD.buildFloor));
    }
  }

  const roleList = [...roles.values()];
  const days = roleList.reduce((s, x) => s + x.days, 0);
  const people = roleList.length ? Math.max(...roleList.map((x) => x.people)) : CREW;
  if (days >= 5) addRole(roles, "lab-cap", days, 1);
  const finalRoles = [...roles.values()];
  const hours = round2(finalRoles.reduce((s, x) => s + x.people * x.days * HPD, 0));
  let laborCost = 0;
  for (const role of finalRoles) {
    const w = getWork(role.workId);
    if (!w) continue;
    laborCost += role.people * role.days * HPD * (workPrices[role.workId] ?? w.unitPrice);
  }

  return {
    job,
    people,
    days: Math.max(days, finalRoles.reduce((s, x) => s + (x.workId === "lab-cap" ? 0 : x.days), 0)),
    hours,
    laborCost: round2(laborCost),
    roles: finalRoles,
    debris,
  };
}

export interface EngineWork {
  workId: string;
  input: WorkInput;
}

export function engineWorks(engine: EngineResult, wallNet: number): EngineWork[] {
  const works: EngineWork[] = [];
  for (const role of engine.roles) {
    const w = getWork(role.workId);
    if (!w) continue;
    works.push({
      workId: role.workId,
      input: { ...emptyWorkInput(w, 0, role.days), people: role.people, days: role.days, hoursPerDay: HPD },
    });
  }
  if (wallNet > 0.2) {
    const pon = getWork("pon-fac");
    if (pon) works.push({ workId: "pon-fac", input: { ...emptyWorkInput(pon, wallNet), qty: wallNet } });
  }
  const d = engine.debris;
  const pushQty = (id: string, qty: number) => {
    const w = getWork(id);
    if (!w || qty < 0.05) return;
    works.push({ workId: id, input: { ...emptyWorkInput(w, qty), qty } });
  };
  pushQty("dem-mur", d.masonryM3);
  pushQty("dem-int", d.plasterM2);
  pushQty("dem-pav", d.floorM2);
  pushQty("dem-cop", d.roofM2);
  pushQty("sma-mac", d.mixedT);
  pushQty("sma-leg", d.timberT);
  pushQty("sma-c10", d.bins10);
  pushQty("sma-c5", d.bins5);
  if (engine.job !== "build") {
    const sgom = getWork("alt-sgom");
    if (sgom) works.push({ workId: "alt-sgom", input: emptyWorkInput(sgom, 1) });
  }
  const allest = getWork("alt-all");
  if (allest) works.push({ workId: "alt-all", input: emptyWorkInput(allest, 1) });
  return works;
}

export function mergeWorks(lines: EngineWork[]): EngineWork[] {
  const map = new Map<string, WorkInput>();
  const once = new Set(["alt-all", "alt-sgom", "alt-dpi"]);
  for (const line of lines) {
    const prev = map.get(line.workId);
    if (!prev) {
      map.set(line.workId, { ...line.input });
      continue;
    }
    if (once.has(line.workId)) continue;
    prev.days += line.input.days;
    prev.qty += line.input.qty;
    prev.people = Math.max(prev.people, line.input.people);
  }
  return [...map.entries()].map(([workId, input]) => ({ workId, input }));
}

export function jobLabelKey(job: JobKind): "geom.build" | "geom.demo" | "geom.reno" {
  if (job === "demo") return "geom.demo";
  if (job === "reno") return "geom.reno";
  return "geom.build";
}
