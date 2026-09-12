import { Link, createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { SPECIE } from "@/data/natura";
import { LabNav, LabTop, Telemetry, WebGLHost, useLabView, useReducedMotion } from "@/lab/LabStage";
import { SchedaSpecie } from "@/lab/Schede";
import { startBiosfera, type BioPick } from "@/lab/biosfera";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/lab/biosfera")({
  head: () => ({
    meta: [
      { title: titleFor("Lab · Biosfera") },
      { name: "description", content: "Flora e fauna dei Monti Lepini in un campo 3D. Le schede sono le stesse del Portale." },
    ],
  }),
  component: BiosferaPage,
});

function BiosferaPage() {
  const reduced = useReducedMotion();
  const { view, zoomIn, zoomOut } = useLabView();
  const [pick, setPick] = useState<BioPick | null>(null);
  const start = useCallback(
    (c: HTMLCanvasElement) => startBiosfera(c, { reduced: reduced.current, onPick: setPick, view: view.current }),
    [reduced, view],
  );
  const flora = SPECIE.filter((s) => s.gruppo === "flora").length;
  const fauna = SPECIE.filter((s) => s.gruppo === "fauna").length;

  return (
    <div className="relative h-dvh overflow-hidden bg-navy-deep text-cream">
      <WebGLHost start={start} />
      <LabTop code="03" title="Biosfera" />
      <LabNav zoomIn={zoomIn} zoomOut={zoomOut} maps={false} />
      <div className="pointer-events-none absolute inset-x-0 top-20 z-10 px-6 text-center">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-copper-light">Esperimento 03</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">Flora e fauna</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-cream-soft">
          Anello interno oliva: piante. Anello rame: animali. Nucleo crema: i quattro habitat. Stesso schedario del
          Portale, con foto.
        </p>
      </div>
      {pick?.kind === "specie" ? (
        <div className="absolute bottom-16 left-4 z-10">
          <SchedaSpecie s={pick.specie} />
        </div>
      ) : null}
      {pick?.kind === "habitat" ? (
        <aside className="absolute bottom-16 left-4 z-10 max-w-sm rounded-xl border border-cream/15 bg-navy-deep/90 p-5">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-copper-light">Habitat</p>
          <h2 className="mt-1 font-display text-2xl">{pick.titolo}</h2>
          <p className="mt-3 text-sm text-cream-soft">{pick.testo}</p>
          <Link to="/natura" className="mt-4 inline-flex min-h-11 items-center text-sm text-olive-light">
            Schede nel Portale
          </Link>
        </aside>
      ) : null}
      <Telemetry
        items={[`${flora} flora`, `${fauna} fauna`, "4 habitat", pick?.kind === "specie" ? pick.specie.scientifico : "stesso dataset"]}
      />
    </div>
  );
}
