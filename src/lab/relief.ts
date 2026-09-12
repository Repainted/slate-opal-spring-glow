import {
  DEM_B64,
  DEM_EAST,
  DEM_H,
  DEM_NORTH,
  DEM_SOUTH,
  DEM_W,
  DEM_WEST,
} from "./demData";
import { LEPINI } from "./tiles";

/** World Y per metre. Lepini max ~1536 m → ~12.8 units. Esagerazione ~1.3×, non aghi. */
export const Y_PER_M = 1 / 120;
const VETTA_M = 1536;

const DEM = decodeDem(DEM_B64);

function decodeDem(b64: string): Int16Array {
  const bin = typeof atob === "function" ? atob(b64) : Buffer.from(b64, "base64").toString("binary");
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return new Int16Array(u8.buffer, u8.byteOffset, u8.byteLength / 2);
}

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function lngLatFromWorld(x: number, z: number) {
  return {
    lng: LEPINI.west + clamp01((x + 100) / 200) * (LEPINI.east - LEPINI.west),
    lat: LEPINI.north - clamp01((z + 80) / 160) * (LEPINI.north - LEPINI.south),
  };
}

function sampleDem(lng: number, lat: number): number {
  const u = clamp01((lng - DEM_WEST) / (DEM_EAST - DEM_WEST)) * (DEM_W - 1);
  const v = clamp01((DEM_NORTH - lat) / (DEM_NORTH - DEM_SOUTH)) * (DEM_H - 1);
  const x0 = Math.floor(u);
  const y0 = Math.floor(v);
  const x1 = Math.min(x0 + 1, DEM_W - 1);
  const y1 = Math.min(y0 + 1, DEM_H - 1);
  const tx = u - x0;
  const ty = v - y0;
  const a = DEM[y0 * DEM_W + x0]!;
  const b = DEM[y0 * DEM_W + x1]!;
  const c = DEM[y1 * DEM_W + x0]!;
  const d = DEM[y1 * DEM_W + x1]!;
  return a * (1 - tx) * (1 - ty) + b * tx * (1 - ty) + c * (1 - tx) * ty + d * tx * ty;
}

/** Quote EU-DEM in metri, ritagliate al comprensorio lepino. Semprevisa 1536 m è il tetto. */
export function metersAt(x: number, z: number): number {
  const { lng, lat } = lngLatFromWorld(x, z);
  return Math.max(0, Math.min(VETTA_M, sampleDem(lng, lat)));
}

export function heightAt(x: number, z: number): number {
  return metersAt(x, z) * Y_PER_M;
}

export function projectComune(lng: number, lat: number) {
  return {
    x: ((lng - LEPINI.west) / (LEPINI.east - LEPINI.west)) * 200 - 100,
    z: ((LEPINI.north - lat) / (LEPINI.north - LEPINI.south)) * 160 - 80,
  };
}

export const DEM_INFO = {
  source: "EU-DEM via Mapzen terrarium tiles z12 · ritaglio Monti Lepini",
  west: LEPINI.west,
  east: LEPINI.east,
  south: LEPINI.south,
  north: LEPINI.north,
  min: 0,
  max: VETTA_M,
  cellM: 160,
} as const;
