import { useEffect, useRef } from "react";
import { COMUNI } from "@/data/comuni";
import { cn } from "@/lib/utils";
import { lat2y, lon2x, LEPINI, tileUrl, x2lon, y2lat } from "./tiles";
import type { Carta } from "./view";

type Kind = "sat" | "osm";

function kindOf(c: Carta): Kind {
  return c === "osm" ? "osm" : "sat";
}

const BAKED: Record<Kind, HTMLImageElement | null> = { sat: null, osm: null };
function bakedOf(kind: Kind) {
  if (typeof Image === "undefined") return null;
  if (!BAKED[kind]) {
    const im = new Image();
    im.src = kind === "osm" ? "/lab/osm.jpg" : "/lab/sat.jpg";
    BAKED[kind] = im;
  }
  return BAKED[kind];
}

export function Carta2D({
  open,
  onClose,
  carta,
  onPick,
  highlight,
}: {
  open: boolean;
  onClose: () => void;
  carta: Carta;
  onPick?: (slug: string) => void;
  highlight?: string | null;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    lon: 13.08,
    lat: 41.58,
    z: 11.2,
    drag: null as { x: number; y: number; sx: number; sy: number } | null,
    pinch: 0,
    cache: new Map<string, HTMLImageElement | "load">(),
  });

  useEffect(() => {
    if (!open) return;
    const canvas = ref.current;
    if (!canvas) return;
    const s = st.current;
    let raf = 0;
    let alive = true;
    bakedOf(kindOf(carta));

    const draw = () => {
      if (!alive) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      const g = canvas.getContext("2d");
      if (!g) return;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.fillStyle = "#17161a";
      g.fillRect(0, 0, w, h);
      const kind = kindOf(carta);
      const zi = Math.max(8, Math.min(16, Math.floor(s.z)));
      const world = 2 ** s.z * 256;
      const ts = 256 * 2 ** (s.z - zi);
      const n = 2 ** zi;
      const cx = lon2x(s.lon, s.z) * 256;
      const cy = lat2y(s.lat, s.z) * 256;
      const px = (lon: number) => w / 2 + (lon2x(lon, s.z) * 256 - cx);
      const py = (lat: number) => h / 2 + (lat2y(lat, s.z) * 256 - cy);
      const baked = bakedOf(kind);
      if (baked && baked.naturalWidth) {
        g.drawImage(
          baked,
          px(LEPINI.west),
          py(LEPINI.north),
          px(LEPINI.east) - px(LEPINI.west),
          py(LEPINI.south) - py(LEPINI.north),
        );
      }
      const x0 = Math.floor(((cx - w / 2) / world) * n);
      const x1 = Math.floor(((cx + w / 2) / world) * n);
      const y0 = Math.floor(((cy - h / 2) / world) * n);
      const y1 = Math.floor(((cy + h / 2) / world) * n);
      for (let x = x0; x <= x1; x++) {
        for (let y = y0; y <= y1; y++) {
          if (y < 0 || y >= n) continue;
          const xx = ((x % n) + n) % n;
          const key = `${kind}_${zi}_${xx}_${y}`;
          const rec = s.cache.get(key);
          const dx = ((xx + (x < 0 ? -n : 0)) / n) * world - cx + w / 2;
          const dy = (y / n) * world - cy + h / 2;
          if (rec && rec !== "load") g.drawImage(rec, dx, dy, ts + 0.5, ts + 0.5);
          else if (!rec) {
            s.cache.set(key, "load");
            const im = new Image();
            im.crossOrigin = "anonymous";
            im.onload = () => {
              s.cache.set(key, im);
            };
            im.onerror = () => s.cache.delete(key);
            im.src = tileUrl(kind, zi, xx, y);
          }
        }
      }
      g.font = "12px EB Garamond, Georgia, serif";
      g.textAlign = "center";
      for (const c of COMUNI) {
        const X = px(c.lng);
        const Y = py(c.lat);
        if (X < -40 || X > w + 40 || Y < -20 || Y > h + 20) continue;
        const hi = c.slug === highlight;
        g.fillStyle = hi ? "#ce8b4e" : "#ede0c8";
        g.beginPath();
        g.arc(X, Y, hi ? 5 : 3, 0, Math.PI * 2);
        g.fill();
        if (s.z >= 10.5) {
          g.lineWidth = 3;
          g.strokeStyle = "rgba(23,22,26,0.8)";
          g.strokeText(c.nome, X, Y - 8);
          g.fillStyle = hi ? "#ce8b4e" : "#ede0c8";
          g.fillText(c.nome, X, Y - 8);
        }
      }
      g.font = "10px ui-monospace, monospace";
      g.textAlign = "right";
      g.fillStyle = "rgba(237,224,200,0.55)";
      g.fillText(kind === "sat" ? "© Esri World Imagery" : "© OSM · CARTO", w - 8, h - 8);
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const zoomAt = (dz: number, cx: number, cy: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const lon = x2lon(lon2x(s.lon, s.z) + (cx - w / 2) / 256, s.z);
      const lat = y2lat(lat2y(s.lat, s.z) + (cy - h / 2) / 256, s.z);
      s.z = Math.max(8, Math.min(16.4, s.z + dz));
      s.lon = x2lon(lon2x(lon, s.z) - (cx - w / 2) / 256, s.z);
      s.lat = y2lat(lat2y(lat, s.z) - (cy - h / 2) / 256, s.z);
    };

    const pickAt = (cx: number, cy: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const lon = x2lon(lon2x(s.lon, s.z) + (cx - w / 2) / 256, s.z);
      const lat = y2lat(lat2y(s.lat, s.z) + (cy - h / 2) / 256, s.z);
      let best: { slug: string; d: number } | null = null;
      for (const c of COMUNI) {
        const d = (c.lng - lon) ** 2 + (c.lat - lat) ** 2;
        if (!best || d < best.d) best = { slug: c.slug, d };
      }
      if (best && best.d < 0.012) onPick?.(best.slug);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomAt(-e.deltaY * 0.002, e.offsetX, e.offsetY);
    };
    const onDown = (e: PointerEvent) => {
      s.drag = { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY };
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!s.drag) return;
      const dx = e.clientX - s.drag.x;
      const dy = e.clientY - s.drag.y;
      s.lon = x2lon(lon2x(s.lon, s.z) - dx / 256, s.z);
      s.lat = y2lat(lat2y(s.lat, s.z) - dy / 256, s.z);
      s.drag.x = e.clientX;
      s.drag.y = e.clientY;
    };
    const onUp = (e: PointerEvent) => {
      const moved = s.drag ? Math.hypot(e.clientX - s.drag.sx, e.clientY - s.drag.sy) : 99;
      s.drag = null;
      if (moved < 8) pickAt(e.offsetX, e.offsetY);
    };

    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
    };
  }, [open, carta, onPick]);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-40 bg-navy-deep">
      <canvas ref={ref} className="absolute inset-0 h-full w-full touch-none" />
      <div className="absolute left-1/2 top-4 z-50 flex -translate-x-1/2 gap-2">
        <button
          type="button"
          className="min-h-10 rounded-full border border-cream/20 bg-navy-deep/85 px-4 text-sm text-cream"
          onClick={onClose}
        >
          Chiudi carta
        </button>
      </div>
      <p className={cn("pointer-events-none absolute bottom-4 left-1/2 z-50 -translate-x-1/2 font-mono text-xs text-muted")}>
        Tessere vive · doppio tocco un comune · rotella per lo zoom
      </p>
    </div>
  );
}
