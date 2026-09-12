import { Link, createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { BrandMark } from "@/components/BrandMark";
import { WebGLHost, useReducedMotion } from "@/lab/LabStage";
import { startHero } from "@/lab/hero";
import { Eyebrow } from "@/components/SectionHead";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/lab/")({
  head: () => ({
    meta: [
      { title: titleFor("Lepini Lab") },
      {
        name: "description",
        content: "Lepini Lab: i 26 comuni, i sentieri e le specie dei Monti Lepini in 3D. Costruito da Lepini Digital.",
      },
    ],
  }),
  component: LabHome,
});

const EXPERIMENTS = [
  {
    to: "/lab/atlante" as const,
    code: "00",
    title: "Atlante",
    text: "I 26 comuni sul rilievo. Tocca un nodo: si apre la scheda del Portale.",
  },
  {
    to: "/lab/volo" as const,
    code: "01",
    title: "Volo",
    text: "Sopra il massiccio. Avvicinati a un borgo e compare la scheda.",
  },
  {
    to: "/lab/faggeta" as const,
    code: "02",
    title: "Faggeta",
    text: "Cammini tra i faggi. Picchio nero e faggete: le stesse schede natura.",
  },
  {
    to: "/lab/biosfera" as const,
    code: "03",
    title: "Biosfera",
    text: "Flora e fauna su due anelli. Tocca aquila, lupo, istrice: scheda e Portale.",
  },
  {
    to: "/lab/sentieri" as const,
    code: "04",
    title: "Sentieri",
    text: "I sentieri sul rilievo vero. 701, 702, 736: gli stessi numeri del Portale.",
  },
  {
    to: "/lab/parco" as const,
    code: "05",
    title: "Parco",
    text: "ZPS e siti Natura 2000 sul crinale. Non è un parco regionale: è ciò che esiste.",
  },
  {
    to: "/lab/alberi" as const,
    code: "06",
    title: "Alberi",
    text: "Leccio e nocciolo da three-d-stage. Tocca un esemplare: si apre la scheda.",
  },
];

function LabHome() {
  const reduced = useReducedMotion();
  const start = useCallback((c: HTMLCanvasElement) => startHero(c, reduced.current), [reduced]);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-navy-deep text-cream">
      <WebGLHost start={start} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/25 to-navy-deep/40" />

      <header className="pointer-events-auto absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-5 md:px-10">
        <Link to="/lab" className="flex items-center text-cream" aria-label="Lepini Lab">
          <BrandMark variant="lab" className="h-16 w-auto md:h-[4.5rem]" />
        </Link>
        <div className="flex gap-2">
          <Link
            to="/"
            className="rounded-full border border-cream/20 px-4 py-2 text-sm text-cream-soft hover:border-copper-light"
          >
            Portale
          </Link>
          <Link
            to="/digitale"
            className="rounded-full border border-cream/20 px-4 py-2 text-sm text-cream-soft hover:border-copper-light"
          >
            Digital
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-5 pb-10 pt-28 md:px-12 md:pb-14">
        <Eyebrow>Laboratorio scientifico · Lepini Digital</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[0.92] text-cream">
          Vedere il crinale
          <span className="mt-3 block font-medium italic text-olive-light">come un modello vivo.</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream-soft">
          Le schede del Portale — comuni, flora, fauna, sentieri — in tre dimensioni. Per mostrare alle imprese cosa si
          può fare con gli stessi strumenti.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIMENTS.map((e, i) => (
            <Link
              key={e.code}
              to={e.to}
              className={`bg-navy-deep/80 p-6 backdrop-blur-sm hover:bg-navy-card ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <p className="font-display text-3xl leading-none text-copper-light">{e.code}</p>
              <h2 className="mt-3 font-display text-2xl">{e.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{e.text}</p>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Le schede sono sul Portale:{" "}
          <Link to="/comuni" className="text-olive-light">
            26 comuni
          </Link>
          ,{" "}
          <Link to="/natura" className="text-olive-light">
            natura
          </Link>
          ,{" "}
          <Link to="/sentieri" className="text-olive-light">
            sentieri
          </Link>
          ,{" "}
          <Link to="/esperienze/timeline" className="text-olive-light">
            timeline
          </Link>
          ,{" "}
          <Link to="/esperienze/planner" className="text-olive-light">
            planner
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
