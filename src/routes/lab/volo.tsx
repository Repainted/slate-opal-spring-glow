import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Provincia } from "@/data/types";
import { LabNav, LabTop, PlayGate, Telemetry, TouchKeys, WebGLHost, useLabView, useReducedMotion } from "@/lab/LabStage";
import { SchedaComune } from "@/lab/Schede";
import { startVolo } from "@/lab/volo";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/lab/volo")({
  head: () => ({
    meta: [
      { title: titleFor("Lab · Volo") },
      { name: "description", content: "Volo 3D sul crinale dei Monti Lepini. WASD, 26 comuni come nodi-scheda." },
    ],
  }),
  component: VoloPage,
});

const EMPTY = {
  fps: 0,
  nearest: "—",
  slug: "sermoneta",
  headline: "",
  provincia: "Latina" as Provincia,
  altitudine: 0,
  tci: false,
  daVedere: [] as string[],
  dist: 99,
  alt: 0,
  calls: 0,
};

function VoloPage() {
  const keys = useRef(new Set<string>());
  const playing = useRef(false);
  const reduced = useReducedMotion();
  const { view, carta, setCarta, zoomIn, zoomOut } = useLabView();
  const [open, setOpen] = useState(true);
  const [hud, setHud] = useState(EMPTY);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keys.current.add(e.code);
      if (["Space", "ArrowUp", "ArrowDown"].includes(e.code)) e.preventDefault();
    };
    const up = (e: KeyboardEvent) => keys.current.delete(e.code);
    const blur = () => keys.current.clear();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, []);

  const start = useCallback(
    (canvas: HTMLCanvasElement) =>
      startVolo(canvas, {
        keys: keys.current,
        getPlaying: () => playing.current,
        reduced: reduced.current,
        onHud: setHud,
        view: view.current,
      }).dispose,
    [reduced],
  );

  return (
    <div className="relative h-dvh overflow-hidden bg-navy-deep text-cream">
      <WebGLHost start={start} />
      <LabTop code="01" title="Volo" />
      <LabNav zoomIn={zoomIn} zoomOut={zoomOut} carta={carta} setCarta={setCarta} />
      <PlayGate
        open={open}
        kicker="Esperimento 01"
        title="Prendi il drone"
        hint="W accelera, A/D virata (A naso a sinistra), Space sale, C scende. Vicino a un nodo appare la scheda del comune."
        onPlay={() => {
          playing.current = true;
          setOpen(false);
        }}
      />
      {!open ? (
        <>
          {hud.dist < 18 && hud.headline ? (
            <div className="absolute bottom-28 left-4 z-20 md:bottom-16">
              <SchedaComune
                c={{
                  slug: hud.slug,
                  nome: hud.nearest,
                  provincia: hud.provincia,
                  altitudine: hud.altitudine,
                  headline: hud.headline,
                  daVedere: hud.daVedere,
                  bandieraArancione: hud.tci,
                }}
              />
            </div>
          ) : null}
          <Telemetry items={[`${hud.fps} fps`, hud.nearest, `${hud.alt} m`, `${hud.calls} draw`]} />
          <TouchKeys
            keys={keys.current}
            extra={
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  className="min-h-12 rounded-full border border-cream/20 bg-navy-deep/70 px-4 text-sm"
                  onPointerDown={() => keys.current.add("Space")}
                  onPointerUp={() => keys.current.delete("Space")}
                >
                  Sale
                </button>
                <button
                  type="button"
                  className="min-h-12 rounded-full border border-cream/20 bg-navy-deep/70 px-4 text-sm"
                  onPointerDown={() => keys.current.add("KeyC")}
                  onPointerUp={() => keys.current.delete("KeyC")}
                >
                  Scende
                </button>
              </div>
            }
          />
        </>
      ) : null}
    </div>
  );
}
