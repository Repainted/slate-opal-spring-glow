export const LEPINI = {
  west: 12.87,
  east: 13.44,
  south: 41.38,
  north: 41.76,
  lat: 41.57,
  lon: 13.155,
} as const;

export function lon2x(lon: number, z: number) {
  return ((lon + 180) / 360) * 2 ** z;
}
export function lat2y(lat: number, z: number) {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** z;
}
export function x2lon(x: number, z: number) {
  return (x / 2 ** z) * 360 - 180;
}
export function y2lat(y: number, z: number) {
  const n = Math.PI - (2 * Math.PI * y) / 2 ** z;
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}

export function tileUrl(kind: "sat" | "osm", z: number, x: number, y: number) {
  if (kind === "sat") {
    return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
  }
  return `https://basemaps.cartocdn.com/rastertiles/voyager/${z}/${x}/${y}@2x.png`;
}

function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.onload = () => resolve(im);
    im.onerror = () => reject(new Error(src));
    im.src = src;
  });
}

/** Stitch a bbox at zoom z into a canvas (drone-style Esri / Carto tiles). */
export async function stitchBbox(
  kind: "sat" | "osm",
  bbox = LEPINI,
  z = 11,
  onProgress?: (d: number, t: number) => void,
): Promise<HTMLCanvasElement> {
  const x0 = Math.floor(lon2x(bbox.west, z));
  const x1 = Math.floor(lon2x(bbox.east, z));
  const y0 = Math.floor(lat2y(bbox.north, z));
  const y1 = Math.floor(lat2y(bbox.south, z));
  const cols = x1 - x0 + 1;
  const rows = y1 - y0 + 1;
  const ts = 256;
  const canvas = document.createElement("canvas");
  canvas.width = cols * ts;
  canvas.height = rows * ts;
  const g = canvas.getContext("2d")!;
  g.fillStyle = "#1a1814";
  g.fillRect(0, 0, canvas.width, canvas.height);
  const jobs: Promise<void>[] = [];
  let done = 0;
  const total = cols * rows;
  for (let x = x0; x <= x1; x++) {
    for (let y = y0; y <= y1; y++) {
      const url = tileUrl(kind, z, x, y);
      jobs.push(
        loadImg(url)
          .then((im) => {
            g.drawImage(im, (x - x0) * ts, (y - y0) * ts, ts, ts);
          })
          .catch(() => {
            /* tile missing */
          })
          .finally(() => {
            done += 1;
            onProgress?.(done, total);
          }),
      );
    }
  }
  await Promise.all(jobs);
  return canvas;
}
