import {
  DEM_B64,
  DEM_EAST,
  DEM_H,
  DEM_MAX,
  DEM_MIN,
  DEM_NORTH,
  DEM_SOUTH,
  DEM_W,
  DEM_WEST,
} from "./demData";

/** World Y per metre. ~80 m → 1 unit, so Semprevisa resta nel inquadratura. */
export const Y_PER_M = 1 / 80;

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

/** Quote EU-DEM (Mapzen terrarium, z12) in metri. */
export function metersAt(x: number, z: number): number {
  const u = clamp01((x + 100) / 200) * (DEM_W - 1);
  const v = clamp01((80 - z) / 160) * (DEM_H - 1);
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
  return Math.max(0, a * (1 - tx) * (1 - ty) + b * tx * (1 - ty) + c * (1 - tx) * ty + d * tx * ty);
}

export function heightAt(x: number, z: number): number {
  return metersAt(x, z) * Y_PER_M;
}

export function projectComune(lng: number, lat: number) {
  return {
    x: (lng - 13.08) * 180,
    z: (41.58 - lat) * 220,
  };
}

export const DEM_INFO = {
  source: "EU-DEM via Mapzen terrarium tiles z12",
  west: DEM_WEST,
  east: DEM_EAST,
  south: DEM_SOUTH,
  north: DEM_NORTH,
  min: DEM_MIN,
  max: DEM_MAX,
  cellM: 360,
} as const;
