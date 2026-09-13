import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { COMUNI } from "@/data/comuni";
import { LabNav, LabTop, Telemetry, WebGLHost, useLabView, useReducedMotion } from "@/lab/LabStage";
import { SchedaComune } from "@/lab/Schede";
import { startTrama, type TramaCtl, type TramaLabel, type TramaMode } from "@/lab/trama";
import { titleFor } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lab/trama")({
  head: () => ({
    meta: [
      { title: titleFor("Lab · Trama") },
      {
        name: "description",
        content: "Il logo Lepini Digital come rete 3D dei 26 comuni: trama, srotolamento, orbite, ecosistema.",
      },
    ],
  }),
  component: TramaPage,
});

const MODI: { id: TramaMode; t: string; d: string }[] = [
  { id: "trama", t: "Trama", d: "Il logo, i 26 punti sopra. Muovi: lo sfondo svanisce, i nodi prendono volume." },
  { id: "demografia", t: "Demografia", d: "L’altezza è la popolazione. Sezze 24 mila, Gorga 800." },
  { id: "srotola", t: "Srotola", d: "Si apre sulla geografia reale." },
  { id: "progressione", t: "Progressione", d: "Dal più basso al crinale, in elica." },
  { id: "orbite", t: "Orbite", d: "Tre anelli: piana, collina, crinale." },
  { id: "ecosistema", t: "Ecosistema", d: "La rete respira. I link si riannodano." },
];

const TOT = COMUNI.reduce((s, c) => s + c.abitanti, 0);
const BY_P = {
  Latina: COMUNI.filter((c) => c.provincia === "Latina").reduce((s, c) => s + c.abitanti, 0),
  Roma: COMUNI.filter((c) => c.provincia === "Roma").reduce((s, c) => s + c.abitanti, 0),
  Frosinone: COMUNI.filter((c) => c.provincia === "Frosinone").reduce((s, c) => s + c.abitanti, 0),
};

function DemoLegend() {
  return (
    <p className="text-center font-mono text-[0.68rem] uppercase tracking-[0.12em] text-cream-soft">
      {TOT.toLocaleString("it-IT")} abitanti · Latina {BY_P.Latina.toLocaleString("it-IT")} · Roma{" "}
      {BY_P.Roma.toLocaleString("it-IT")} · Frosinone {BY_P.Frosinone.toLocaleString("it-IT")}
    </p>
  );
}

function TramaPage() {
  const reduced = useReducedMotion();
  const { view, zoomIn, zoomOut } = useLabView();
  const slugRef = useRef<string | null>("montelanico");
  const [slug, setSlug] = useState("montelanico");
  const [labels, setLabels] = useState<TramaLabel[]>([]);
  const [unfold, setUnfold] = useState(0);
  const [mode, setMode] = useState<TramaMode>("trama");
  const ctl = useRef<TramaCtl>({ mode: "trama", stretchXZ: 1, stretchY: 1 });
  const comune = COMUNI.find((c) => c.slug === slug) ?? COMUNI[0]!;
  const hint = MODI.find((m) => m.id === mode)?.d ?? "";

  const start = useCallback(
    (c: HTMLCanvasElement) =>
      startTrama(c, {
        reduced: reduced.current,
        getSlug: () => slugRef.current,
        onPick: (s) => {
          slugRef.current = s;
          setSlug(s);
        },
        onHud: (h) => {
          setLabels(h.labels);
          setUnfold(h.unfold);
        },
        view: view.current,
        ctl: ctl.current,
      }),
    [reduced, view],
  );

  const pick = (s: string) => {
    slugRef.current = s;
    setSlug(s);
  };

  const setM = (id: TramaMode) => {
    ctl.current.mode = id;
    setMode(id);
  };

  const stretch = (axis: "stretchXZ" | "stretchY", dir: number) => {
    const next = Math.min(2.4, Math.max(0.45, ctl.current[axis] * (dir > 0 ? 1.18 : 0.85)));
    ctl.current[axis] = next;
  };

  return (
    <div className="relative h-dvh overflow-hidden bg-[#0c0e12] text-cream">
      <img
        src="/images/brand/digital-lockup.png"
        alt=""
        className="pointer-events-none absolute left-1/2 top-[46%] z-0 w-[min(82vmin,40rem)] -translate-x-1/2 -translate-y-1/2 select-none object-contain"
        style={{ opacity: mode === "trama" ? Math.max(0, 1 - unfold) : 0 }}
      />
      <WebGLHost start={start} />
      <LabTop code="08" title="Trama" />
      <LabNav zoomIn={zoomIn} zoomOut={zoomOut} maps={false} />

      <div className="pointer-events-none absolute inset-x-0 top-16 z-20 px-3 md:top-20 md:px-6">
        <div className="pointer-events-auto mx-auto flex max-w-5xl flex-col items-center gap-2">
          <div className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-copper/30 bg-navy-deep/85 p-1">
            {MODI.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setM(m.id)}
                className={cn(
                  "min-h-10 shrink-0 rounded-full px-3 text-sm md:px-4",
                  mode === m.id ? "bg-copper/35 text-cream" : "text-cream-soft",
                )}
              >
                {m.t}
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-muted">{hint}</p>
          {mode === "demografia" ? <DemoLegend /> : null}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => stretch("stretchXZ", 1)}
              className="min-h-10 rounded-full border border-cream/15 bg-navy-deep/80 px-3 text-sm text-cream-soft"
            >
              Allunga
            </button>
            <button
              type="button"
              onClick={() => stretch("stretchXZ", -1)}
              className="min-h-10 rounded-full border border-cream/15 bg-navy-deep/80 px-3 text-sm text-cream-soft"
            >
              Stringi
            </button>
            <button
              type="button"
              onClick={() => stretch("stretchY", 1)}
              className="min-h-10 rounded-full border border-cream/15 bg-navy-deep/80 px-3 text-sm text-cream-soft"
            >
              Alza
            </button>
            <button
              type="button"
              onClick={() => stretch("stretchY", -1)}
              className="min-h-10 rounded-full border border-cream/15 bg-navy-deep/80 px-3 text-sm text-cream-soft"
            >
              Schiaccia
            </button>
          </div>
        </div>
      </div>

      {labels.map((l) => (
        <button
          key={l.slug}
          type="button"
          onClick={() => pick(l.slug)}
          className={cn(
            "pointer-events-auto absolute z-10 hidden -translate-x-1/2 font-mono text-[0.62rem] drop-shadow md:block",
            l.slug === slug ? "text-copper-light" : "text-cream/80",
          )}
          style={{ left: l.x, top: l.y - 18 }}
        >
          {l.nome}
          {mode === "demografia" ? ` · ${l.abitanti.toLocaleString("it-IT")}` : ""}
        </button>
      ))}

      <div className="absolute bottom-16 left-4 z-20 md:bottom-8">
        <SchedaComune c={comune} />
      </div>

      <nav
        className="absolute bottom-4 left-0 right-0 z-20 flex flex-nowrap gap-2 overflow-x-auto px-4 pb-1 md:bottom-auto md:left-auto md:right-4 md:top-20 md:w-48 md:flex-col md:overflow-y-auto md:px-0"
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
                ? "border-copper bg-copper/25 text-cream"
                : "border-cream/10 bg-navy-deep/70 text-cream-soft",
            )}
          >
            {c.nome}
            {mode === "demografia" ? (
              <span className="ml-2 font-mono text-[0.65rem] text-muted">{c.abitanti.toLocaleString("it-IT")}</span>
            ) : null}
          </button>
        ))}
      </nav>

      <Telemetry items={["26 nodi", comune.nome, `${comune.abitanti.toLocaleString("it-IT")} ab.`, mode]} />
    </div>
  );
}
