import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { SPECIE } from "@/data/natura";
import { Carta2D } from "@/lab/Carta2D";
import { LabNav, LabTop, PlayGate, Telemetry, WebGLHost, useLabView, useReducedMotion } from "@/lab/LabStage";
import { SchedaSpecie } from "@/lab/Schede";
import { startFaggeta } from "@/lab/faggeta";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/lab/faggeta")({
  head: () => ({
    meta: [
      { title: titleFor("Lab · Faggeta") },
      { name: "description", content: "Cammino in prima persona nella faggeta dei Monti Lepini." },
    ],
  }),
  component: FaggetaPage,
});

function FaggetaPage() {
  const keys = useRef(new Set<string>());
  const move = useRef({ x: 0, y: 0 });
  const look = useRef({ dx: 0, dy: 0 });
  const playing = useRef(false);
  const reduced = useReducedMotion();
  const { view, carta, setCarta, zoomIn, zoomOut } = useLabView();
  const [open, setOpen] = useState(true);
  const [hud, setHud] = useState({ fps: 0, heading: "N" });
  const [map2d, setMap2d] = useState(false);
  const drag = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => keys.current.add(e.code);
    const up = (e: KeyboardEvent) => keys.current.delete(e.code);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  const start = useCallback(
    (canvas: HTMLCanvasElement) =>
      startFaggeta(canvas, {
        keys: keys.current,
        move: move.current,
        look: look.current,
        getPlaying: () => playing.current,
        reduced: reduced.current,
        onHud: setHud,
        view: view.current,
      }),
    [reduced],
  );

  return (
    <div
      ref={host}
      className="relative h-dvh overflow-hidden bg-navy-deep text-cream"
      onPointerDown={(e) => {
        if (open) return;
        drag.current = true;
        last.current = { x: e.clientX, y: e.clientY };
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        look.current.dx += e.clientX - last.current.x;
        look.current.dy += e.clientY - last.current.y;
        last.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={() => {
        drag.current = false;
      }}
    >
      <WebGLHost start={start} />
      <LabTop code="02" title="Faggeta" />
      <LabNav zoomIn={zoomIn} zoomOut={zoomOut} carta={carta} setCarta={setCarta} onMap2d={() => setMap2d(true)} />
      <PlayGate
        open={open}
        kicker="Esperimento 02"
        title="Entra nella faggeta"
        hint="Trascina per guardare. WASD per camminare. A e D sono laterali, non virate."
        onPlay={() => {
          playing.current = true;
          setOpen(false);
        }}
      />
      {!open ? (
        <>
          <div className="absolute bottom-28 left-4 z-20 max-w-sm md:bottom-16">
            <SchedaSpecie s={SPECIE.find((s) => s.scientifico === "Fagus sylvatica")!} />
            <p className="mt-2 px-1 font-mono text-[0.68rem] text-muted">
              In queste faggete: {SPECIE.find((s) => s.scientifico === "Dryocopus martius")?.comune}
            </p>
          </div>
          <Telemetry items={[`${hud.fps} fps`, hud.heading, "Fagus sylvatica"]} />
          <div className="absolute bottom-16 left-4 z-10 md:hidden">
            <Stick onVec={(x, y) => Object.assign(move.current, { x, y })} />
          </div>
        </>
      ) : null}
      <Carta2D open={map2d} onClose={() => setMap2d(false)} carta={carta} />
    </div>
  );
}

function Stick({ onVec }: { onVec: (x: number, y: number) => void }) {
  const origin = useRef({ x: 0, y: 0 });
  return (
    <div
      className="relative size-28 rounded-full border border-cream/20 bg-navy-deep/60"
      onPointerDown={(e) => {
        origin.current = { x: e.clientX, y: e.clientY };
        e.stopPropagation();
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (e.buttons === 0 && e.pointerType !== "touch") return;
        const dx = e.clientX - origin.current.x;
        const dy = e.clientY - origin.current.y;
        const m = Math.hypot(dx, dy) || 1;
        const s = Math.min(1, m / 48);
        onVec((dx / m) * s, (-dy / m) * s);
      }}
      onPointerUp={() => onVec(0, 0)}
      onPointerCancel={() => onVec(0, 0)}
    />
  );
}
