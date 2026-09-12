import { Link, createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { SITI, type SitoNatura } from "@/data/parco";
import { Carta2D } from "@/lab/Carta2D";
import { LabNav, LabTop, WebGLHost, useLabView, useReducedMotion } from "@/lab/LabStage";
import { startParco, type ParcoLayer } from "@/lab/parco";
import { titleFor } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lab/parco")({
  head: () => ({
    meta: [
      { title: titleFor("Lab · Parco") },
      {
        name: "description",
        content:
          "ZPS Monti Lepini e siti Natura 2000 sul rilievo 3D. Non è un parco regionale istituito: è ciò che esiste.",
      },
    ],
  }),
  component: ParcoLab,
});

const LAYERS: { id: ParcoLayer; label: string }[] = [
  { id: "zps", label: "ZPS crinale" },
  { id: "siti", label: "Siti Natura 2000" },
  { id: "vette", label: "Vette" },
];

function ParcoLab() {
  const reduced = useReducedMotion();
  const { view, carta, setCarta, zoomIn, zoomOut } = useLabView();
  const layers = useRef(new Set<ParcoLayer>(["zps", "siti", "vette"]));
  const [, bump] = useState(0);
  const [pick, setPick] = useState<SitoNatura | null>(SITI[1] ?? null);
  const [map2d, setMap2d] = useState(false);

  const start = useCallback(
    (c: HTMLCanvasElement) =>
      startParco(c, {
        reduced: reduced.current,
        onPick: (s) => setPick(s),
        view: view.current,
        layers,
      }),
    [reduced, view],
  );

  const toggle = (id: ParcoLayer) => {
    if (layers.current.has(id)) layers.current.delete(id);
    else layers.current.add(id);
    bump((n) => n + 1);
  };

  return (
    <div className="relative h-dvh overflow-hidden bg-navy-deep text-cream">
      <WebGLHost start={start} />
      <LabTop code="05" title="Parco" />
      <LabNav zoomIn={zoomIn} zoomOut={zoomOut} carta={carta} setCarta={setCarta} onMap2d={() => setMap2d(true)} />

      <div className="absolute left-3 top-52 z-20 flex flex-col gap-1 md:left-auto md:right-4 md:top-24">
        {LAYERS.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => toggle(l.id)}
            className={cn(
              "min-h-10 rounded-full border px-3 text-left text-sm",
              layers.current.has(l.id)
                ? "border-copper bg-copper/25 text-cream"
                : "border-cream/15 bg-navy-deep/80 text-cream-soft",
            )}
          >
            {l.label}
          </button>
        ))}
      </div>

      {pick ? (
        <article className="absolute bottom-16 left-4 z-20 max-w-sm rounded-xl border border-cream/15 bg-navy-deep/90 p-5 md:bottom-8">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-copper-light">
            {pick.tipo}
            {pick.codice ? ` · ${pick.codice}` : ""}
            {pick.ha ? ` · ${pick.ha.toLocaleString("it-IT")} ha` : ""}
            {pick.m ? ` · ${pick.m} m` : ""}
          </p>
          <h2 className="mt-2 font-display text-2xl text-cream">{pick.nome}</h2>
          <p className="mt-3 text-sm leading-relaxed text-cream-soft">{pick.testo}</p>
          <Link to="/parco" className="mt-4 inline-block text-sm text-olive-light">
            Scheda del Portale
          </Link>
        </article>
      ) : null}

      <Carta2D open={map2d} onClose={() => setMap2d(false)} carta={carta} />
    </div>
  );
}
