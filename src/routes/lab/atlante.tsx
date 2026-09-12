import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { COMUNI } from "@/data/comuni";
import { Carta2D } from "@/lab/Carta2D";
import { LabNav, LabTop, Telemetry, WebGLHost, useLabView, useReducedMotion } from "@/lab/LabStage";
import { SchedaComune } from "@/lab/Schede";
import { startAtlante, type Label } from "@/lab/atlante";
import { titleFor } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lab/atlante")({
  head: () => ({
    meta: [
      { title: titleFor("Lab · Atlante") },
      {
        name: "description",
        content: "Atlante 3D dei 26 comuni dei Monti Lepini. Ogni nodo è una scheda del Portale.",
      },
    ],
  }),
  component: AtlantePage,
});

function AtlantePage() {
  const reduced = useReducedMotion();
  const { view, carta, setCarta, zoomIn, zoomOut } = useLabView();
  const slugRef = useRef<string | null>("sermoneta");
  const [slug, setSlug] = useState("sermoneta");
  const [labels, setLabels] = useState<Label[]>([]);
  const [map2d, setMap2d] = useState(false);
  const comune = COMUNI.find((c) => c.slug === slug) ?? COMUNI[0]!;

  const start = useCallback(
    (c: HTMLCanvasElement) =>
      startAtlante(c, {
        reduced: reduced.current,
        getSlug: () => slugRef.current,
        onPick: (s) => {
          slugRef.current = s;
          setSlug(s);
        },
        onHud: (h) => setLabels(h.labels),
        view: view.current,
      }),
    [reduced],
  );

  const pick = (s: string) => {
    slugRef.current = s;
    setSlug(s);
  };

  return (
    <div className="relative h-dvh overflow-hidden bg-navy-deep text-cream">
      <WebGLHost start={start} />
      <LabTop code="00" title="Atlante" />
      <LabNav zoomIn={zoomIn} zoomOut={zoomOut} carta={carta} setCarta={setCarta} onMap2d={() => setMap2d(true)} />
      {labels.map((l) => (
        <button
          key={l.slug}
          type="button"
          onClick={() => pick(l.slug)}
          className="pointer-events-auto absolute z-10 hidden -translate-x-1/2 font-mono text-[0.65rem] text-cream drop-shadow md:block"
          style={{ left: l.x, top: l.y }}
        >
          {l.nome}
          {l.tci ? " ·" : ""}
        </button>
      ))}

      <div className="absolute bottom-16 left-4 z-20 md:bottom-8">
        <SchedaComune c={comune} />
      </div>

      <nav
        className="absolute bottom-4 left-0 right-0 z-20 flex flex-nowrap gap-2 overflow-x-auto px-4 pb-1 md:bottom-auto md:left-auto md:right-4 md:top-20 md:w-52 md:flex-col md:flex-wrap md:overflow-y-auto md:px-0"
        aria-label="26 comuni"
      >
        {COMUNI.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => pick(c.slug)}
            className={cn(
              "min-h-10 shrink-0 rounded-full border px-3 text-left text-sm",
              c.slug === slug
                ? "border-copper bg-copper/20 text-cream"
                : "border-cream/15 bg-navy-deep/70 text-cream-soft",
            )}
          >
            {c.nome}
          </button>
        ))}
      </nav>
      <Telemetry items={["26 schede", "stesso dataset del Portale", comune.nome]} />
      <Carta2D open={map2d} onClose={() => setMap2d(false)} carta={carta} onPick={pick} highlight={slug} />
    </div>
  );
}
