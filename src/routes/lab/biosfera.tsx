import { Link, createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { ALL_STRATI, STRATI, type Strato } from "@/data/strati";
import { getComune } from "@/data/comuni";
import { speciePerComune } from "@/data/natura";
import { BiosferaDiagram } from "@/lab/BiosferaDiagram";
import { LabNav, LabTop, Telemetry, WebGLHost, useLabView, useReducedMotion } from "@/lab/LabStage";
import { SchedaSpecie } from "@/lab/Schede";
import { startBiosfera, type BioFilter, type BioPick } from "@/lab/biosfera";
import { titleFor } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lab/biosfera")({
  head: () => ({
    meta: [
      { title: titleFor("Lab · Biosfera") },
      { name: "description", content: "Flora e fauna dei Monti Lepini, per strato: alberi, insetti, uccelli. Stesse schede del Portale." },
    ],
  }),
  component: BiosferaPage,
});

function comuneFromUrl() {
  if (typeof window === "undefined") return null;
  const s = new URLSearchParams(window.location.search).get("comune");
  return s && getComune(s) ? s : null;
}

function BiosferaPage() {
  const reduced = useReducedMotion();
  const { view, zoomIn, zoomOut } = useLabView();
  const fromSlug = comuneFromUrl();
  const fromComune = fromSlug ? getComune(fromSlug) : null;
  const fromSpecie = fromSlug ? speciePerComune(fromSlug) : [];
  const [pick, setPick] = useState<BioPick | null>(() =>
    fromSpecie[0] ? { kind: "specie", specie: fromSpecie[0] } : null,
  );
  const [mode, setMode] = useState<"orbite" | "diagramma">("orbite");
  const [on, setOn] = useState<Set<Strato>>(() => new Set(ALL_STRATI));
  const filter = useRef<BioFilter>({ layers: new Set(ALL_STRATI) });
  filter.current.layers = on;

  const start = useCallback(
    (c: HTMLCanvasElement) =>
      startBiosfera(c, { reduced: reduced.current, onPick: setPick, view: view.current, filter: filter.current }),
    [reduced, view],
  );

  const toggle = (id: Strato) => {
    setOn((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      if (next.size === 0) next.add(id);
      filter.current.layers = next;
      return next;
    });
  };

  const solo = (id: Strato) => {
    const next = new Set<Strato>([id]);
    filter.current.layers = next;
    setOn(next);
  };

  const counts = on.size;

  return (
    <div className="relative h-dvh overflow-hidden bg-navy-deep text-cream">
      {mode === "orbite" ? <WebGLHost start={start} /> : <div className="absolute inset-0 bg-navy-deep" />}
      <LabTop code="03" title="Biosfera" />
      {mode === "orbite" ? <LabNav zoomIn={zoomIn} zoomOut={zoomOut} maps={false} /> : null}

      <div className="pointer-events-none absolute inset-x-0 top-16 z-20 px-4 md:top-20 md:px-6">
        <div className="pointer-events-auto mx-auto flex max-w-5xl flex-col items-center gap-3">
          <div className="flex gap-1 rounded-full border border-cream/15 bg-navy-deep/85 p-1">
            {(
              [
                ["orbite", "Orbite"],
                ["diagramma", "Diagramma"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                className={cn(
                  "min-h-10 rounded-full px-4 text-sm",
                  mode === id ? "bg-copper/30 text-cream" : "text-cream-soft",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          {fromComune ? (
            <p className="rounded-full border border-copper/40 bg-navy-deep/80 px-4 py-2 text-sm text-cream-soft">
              Dal Portale · {fromComune.nome}
              {fromSpecie.length ? ` · ${fromSpecie.length} specie` : ""}
            </p>
          ) : null}
          <div className="flex max-w-full flex-wrap justify-center gap-1">
            {STRATI.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => toggle(st.id)}
                onDoubleClick={() => solo(st.id)}
                className={cn(
                  "min-h-9 rounded-full border px-3 text-xs md:text-sm",
                  on.has(st.id)
                    ? "border-copper/70 bg-navy-deep/85 text-cream"
                    : "border-cream/10 bg-navy-deep/50 text-muted",
                )}
                aria-pressed={on.has(st.id)}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {mode === "diagramma" ? (
        <BiosferaDiagram
          layers={on}
          onSpecie={(s) => setPick({ kind: "specie", specie: s })}
          onHabitat={(h) => setPick({ kind: "habitat", titolo: h.titolo, testo: h.testo })}
          pickId={pick?.kind === "specie" ? pick.specie.scientifico : undefined}
        />
      ) : null}

      {pick?.kind === "specie" ? (
        <div className="absolute bottom-16 left-4 z-20">
          <SchedaSpecie s={pick.specie} />
        </div>
      ) : null}
      {pick?.kind === "habitat" ? (
        <aside className="absolute bottom-16 left-4 z-20 max-w-sm rounded-xl border border-cream/15 bg-navy-deep/90 p-5">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-copper-light">Habitat</p>
          <h2 className="mt-1 font-display text-2xl">{pick.titolo}</h2>
          <p className="mt-3 text-sm text-cream-soft">{pick.testo}</p>
          <Link to="/natura" className="mt-4 inline-flex min-h-11 items-center text-sm text-olive-light">
            Schede nel Portale
          </Link>
        </aside>
      ) : null}
      <Telemetry
        items={[
          `${counts} strati`,
          mode,
          mode === "orbite" ? "trascina: i puntini diventano sfere" : pick?.kind === "specie" ? pick.specie.comune : "tocca una specie",
        ]}
      />
    </div>
  );
}
