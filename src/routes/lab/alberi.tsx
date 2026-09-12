import { Link, createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { SPECIE } from "@/data/natura";
import { ALBERI, startAlbero, type AlberoId } from "@/lab/alberi";
import { LabTop, WebGLHost } from "@/lab/LabStage";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/lab/alberi")({
  head: () => ({
    meta: [
      { title: titleFor("Lab · Alberi") },
      {
        name: "description",
        content: "Sedici alberi 3D da three-d-stage: leccio, faggio, olivo, cerro e gli altri del comprensorio.",
      },
    ],
  }),
  component: AlberiLab,
});

const IDS = Object.keys(ALBERI) as AlberoId[];

function AlberiLab() {
  const [id, setId] = useState<AlberoId>("leccio");
  const spec = ALBERI[id];
  const scheda = SPECIE.find((s) => s.scientifico === spec.scientifico);
  const start = useCallback((c: HTMLCanvasElement) => startAlbero(c, id), [id]);

  return (
    <div className="relative h-dvh overflow-hidden bg-navy-deep text-cream">
      <WebGLHost start={start} />
      <LabTop code="06" title="Alberi" />

      <div className="absolute left-3 top-20 z-20 flex max-h-[48vh] flex-col gap-1 overflow-y-auto pr-1 md:top-24">
        {IDS.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setId(k)}
            className={
              id === k
                ? "min-h-10 rounded-full border border-copper bg-copper/25 px-3 text-left text-sm text-cream"
                : "min-h-10 rounded-full border border-cream/15 bg-navy-deep/80 px-3 text-left text-sm text-cream-soft"
            }
          >
            {ALBERI[k].comune}
          </button>
        ))}
      </div>

      <article className="absolute bottom-8 left-4 z-20 max-w-sm rounded-xl border border-cream/15 bg-navy-deep/90 p-5">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-copper-light">
          Flora · {spec.forma} · three-d-stage
        </p>
        <h2 className="mt-2 font-display text-2xl text-cream">{spec.comune}</h2>
        <p className="font-mono text-xs italic text-olive-light">{spec.scientifico}</p>
        <p className="mt-3 text-sm leading-relaxed text-cream-soft">{scheda?.habitat}</p>
        <Link to="/natura" className="mt-4 inline-block text-sm text-olive-light">
          Scheda nel Portale
        </Link>
      </article>
    </div>
  );
}
