import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { SENTIERI } from "@/data/sentieri";
import { getTraccia, profilo } from "@/data/tracce";
import { LabNav, LabTop, Telemetry, WebGLHost, useLabView, useReducedMotion } from "@/lab/LabStage";
import { SchedaSentiero } from "@/lab/Schede";
import { startSentieri3d } from "@/lab/sentieri3d";
import { titleFor } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lab/sentieri")({
  head: () => ({
    meta: [
      { title: titleFor("Lab · Sentieri 3D") },
      {
        name: "description",
        content:
          "Modellazione 3D schematica dei sentieri dei Monti Lepini. Tubi drappeggiati sul crinale, non GPX CAI.",
      },
    ],
  }),
  component: SentieriLab,
});

function SentieriLab() {
  const reduced = useReducedMotion();
  const { view, carta, setCarta, zoomIn, zoomOut } = useLabView();
  const slugRef = useRef("cai-701");
  const walkRef = useRef(false);
  const [slug, setSlug] = useState("cai-701");
  const [walk, setWalk] = useState(false);
  const [along, setAlong] = useState({ t: 0, alt: 0 });

  const sentiero = SENTIERI.find((s) => s.slug === slug) ?? SENTIERI[1]!;
  const traccia = getTraccia(slug);
  const stats = useMemo(() => (traccia ? profilo(traccia.punti) : { km: 0, gain: 0, samples: [] }), [traccia]);

  const pick = (s: string) => {
    slugRef.current = s;
    setSlug(s);
    walkRef.current = false;
    setWalk(false);
  };

  const start = useCallback(
    (c: HTMLCanvasElement) =>
      startSentieri3d(c, {
        reduced: reduced.current,
        getSlug: () => slugRef.current,
        getWalk: () => walkRef.current,
        onPick: pick,
        onWalk: setAlong,
        view: view.current,
      }),
    [reduced],
  );

  return (
    <div className="relative h-dvh overflow-hidden bg-navy-deep text-cream">
      <WebGLHost start={start} />
      <LabTop code="04" title="Sentieri" />
      <LabNav zoomIn={zoomIn} zoomOut={zoomOut} carta={carta} setCarta={setCarta} />

      <p className="pointer-events-none absolute left-4 top-[22rem] z-10 max-w-sm font-mono text-[0.65rem] uppercase tracking-[0.14em] text-olive-light md:left-8">
        Traccia schematica sul modello · non è un GPX CAI
      </p>

      <div className="absolute bottom-28 left-4 z-20 md:bottom-8">
        <SchedaSentiero s={sentiero} />
        <Profilo samples={stats.samples} km={stats.km} gain={stats.gain} t={walk ? along.t : 0} />
        <button
          type="button"
          className="mt-3 inline-flex min-h-11 items-center rounded-full border border-copper/60 bg-navy-deep/80 px-5 text-sm text-cream hover:bg-copper/20"
          onClick={() => {
            walkRef.current = !walkRef.current;
            setWalk(walkRef.current);
          }}
        >
          {walk ? "Ferma il percorso" : "Percorri il modello"}
        </button>
      </div>

      <nav
        className="absolute bottom-4 left-0 right-0 z-20 flex flex-nowrap gap-2 overflow-x-auto px-4 pb-1 md:bottom-auto md:left-auto md:right-4 md:top-20 md:w-56 md:flex-col md:overflow-y-auto md:px-0"
        aria-label="Sentieri"
      >
        {SENTIERI.map((s) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => pick(s.slug)}
            className={cn(
              "min-h-10 shrink-0 rounded-full border px-3 text-left text-sm",
              s.slug === slug
                ? "border-copper bg-copper/20 text-cream"
                : "border-cream/15 bg-navy-deep/70 text-cream-soft",
            )}
          >
            {s.codice ?? s.nome}
          </button>
        ))}
      </nav>
      <Telemetry
        items={[
          sentiero.codice ?? sentiero.slug,
          `${stats.km.toFixed(1)} km modello`,
          `+${Math.round(stats.gain)} m`,
          walk ? `${along.alt} m` : traccia?.ridge ? "segue il crinale" : "itinerario",
        ]}
      />
    </div>
  );
}

function Profilo({ samples, km, gain, t }: { samples: number[]; km: number; gain: number; t: number }) {
  if (samples.length < 2) return null;
  const min = Math.min(...samples);
  const max = Math.max(...samples);
  const span = max - min || 1;
  const w = 220;
  const h = 48;
  const d = samples
    .map((y, i) => {
      const x = (i / (samples.length - 1)) * w;
      const py = h - 4 - ((y - min) / span) * (h - 8);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${py.toFixed(1)}`;
    })
    .join(" ");
  const cx = Number((t * w).toFixed(2));
  const yi = samples[Math.round(t * (samples.length - 1))] ?? min;
  const cy = Number((h - 4 - ((yi - min) / span) * (h - 8)).toFixed(2));
  return (
    <div className="mt-3 max-w-sm rounded-lg border border-cream/10 bg-navy/70 px-3 py-2">
      <p className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">
        Altimetria sul modello · {km.toFixed(1)} km · +{Math.round(gain)} m
      </p>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-1 h-12 w-full text-copper" aria-hidden>
        <path d={d} fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx={cx} cy={cy} r="3" fill="#ede0c8" />
      </svg>
    </div>
  );
}
