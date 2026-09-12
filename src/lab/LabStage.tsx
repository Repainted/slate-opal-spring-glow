import { Link } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { BrandMark } from "@/components/BrandMark";
import { cn } from "@/lib/utils";
import { CARTA_NOTE } from "./carta";
import { makeView, type Carta, type ViewCtl } from "./view";

export function useLabView() {
  const view = useRef<ViewCtl>(makeView());
  const [carta, setCartaState] = useState<Carta>("rilievo");
  const setCarta = (c: Carta) => {
    view.current.carta = c;
    setCartaState(c);
  };
  const zoomIn = () => {
    view.current.zoom = Math.max(0.18, view.current.zoom * 0.72);
  };
  const zoomOut = () => {
    view.current.zoom = Math.min(3.6, view.current.zoom * 1.32);
  };
  return { view, carta, setCarta, zoomIn, zoomOut };
}

export function useReducedMotion() {
  const ref = useRef(false);
  useEffect(() => {
    ref.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  return ref;
}

export function WebGLHost({ start }: { start: (canvas: HTMLCanvasElement) => () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return start(el);
  }, [start]);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full touch-none" />;
}

export function LabTop({ code, title }: { code: string; title: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-4 md:px-8">
      <Link
        to="/lab"
        className="pointer-events-auto inline-flex min-h-11 items-center gap-2 rounded-full border border-cream/15 bg-navy-deep/70 px-4 text-sm text-cream"
      >
        <ArrowLeft className="size-4" />
        Lab
      </Link>
      <p className="pointer-events-none font-mono text-[0.7rem] uppercase tracking-[0.18em] text-copper-light">
        {code} · {title}
      </p>
      <BrandMark variant="labMark" className="h-9 w-auto opacity-90" />
    </div>
  );
}

export function PlayGate({
  open,
  kicker,
  title,
  hint,
  onPlay,
}: {
  open: boolean;
  kicker: string;
  title: string;
  hint: string;
  onPlay: () => void;
}) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-20 flex items-end bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent md:items-center">
      <div className="w-full px-6 py-16 md:mx-auto md:max-w-lg md:text-center">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-copper-light">{kicker}</p>
        <h1 className="mt-3 font-display text-4xl text-cream md:text-5xl">{title}</h1>
        <p className="mt-3 text-cream-soft">{hint}</p>
        <button
          type="button"
          onClick={onPlay}
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-cream px-8 font-semibold text-navy-deep hover:bg-copper hover:text-cream-soft"
        >
          Entra
        </button>
      </div>
    </div>
  );
}

export function Telemetry({ items }: { items: string[] }) {
  return (
    <p className="pointer-events-none absolute bottom-4 left-4 z-10 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-olive-light">
      {items.join(" · ")}
    </p>
  );
}

export function LabNav({
  zoomIn,
  zoomOut,
  carta,
  setCarta,
  maps = true,
}: {
  zoomIn: () => void;
  zoomOut: () => void;
  carta?: Carta;
  setCarta?: (c: Carta) => void;
  maps?: boolean;
}) {
  return (
    <div className="pointer-events-auto absolute left-3 top-20 z-20 flex flex-col items-start gap-2 md:left-8 md:top-24">
      <div className="flex gap-1">
        <button
          type="button"
          onClick={zoomOut}
          className="inline-flex size-11 items-center justify-center rounded-full border border-cream/20 bg-navy-deep/80 text-cream"
          aria-label="Zoom indietro"
        >
          <Minus className="size-4" />
        </button>
        <button
          type="button"
          onClick={zoomIn}
          className="inline-flex size-11 items-center justify-center rounded-full border border-cream/20 bg-navy-deep/80 text-cream"
          aria-label="Zoom avanti"
        >
          <Plus className="size-4" />
        </button>
      </div>
      {maps && setCarta && carta ? (
        <div className="flex flex-col gap-1">
          {(
            [
              ["rilievo", "Rilievo"],
              ["sat", "Satellite"],
              ["osm", "Strade"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setCarta(id)}
              className={cn(
                "min-h-10 rounded-full border px-3 text-left text-sm",
                carta === id
                  ? "border-copper bg-copper/25 text-cream"
                  : "border-cream/15 bg-navy-deep/80 text-cream-soft",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}
      <p className="max-w-48 text-left font-mono text-[0.62rem] leading-relaxed text-muted">
        {carta && maps ? CARTA_NOTE[carta] : "Trascina · rotella · +/-"}
        <span className="mt-1 hidden md:block">
          Trascina per girare. Shift+trascina o WASD per spostarti. Rotella o +/− per lo zoom.
        </span>
      </p>
    </div>
  );
}

export function TouchKeys({
  keys,
  extra,
}: {
  keys: Set<string>;
  extra?: ReactNode;
}) {
  const hold = (code: string) => ({
    onPointerDown: (e: PointerEvent) => {
      e.preventDefault();
      keys.add(code);
    },
    onPointerUp: () => keys.delete(code),
    onPointerCancel: () => keys.delete(code),
    onPointerLeave: () => keys.delete(code),
  });
  const btn = "min-h-12 min-w-12 rounded-full border border-cream/20 bg-navy-deep/70 text-cream";
  return (
    <div className="absolute bottom-16 right-4 z-10 flex flex-col items-end gap-2 md:hidden">
      <div className="flex gap-2">
        <button type="button" className={btn} {...hold("KeyW")}>
          W
        </button>
      </div>
      <div className="flex gap-2">
        <button type="button" className={btn} {...hold("KeyA")}>
          A
        </button>
        <button type="button" className={btn} {...hold("KeyS")}>
          S
        </button>
        <button type="button" className={btn} {...hold("KeyD")}>
          D
        </button>
      </div>
      {extra}
    </div>
  );
}
