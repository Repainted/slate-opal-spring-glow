import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { HABITAT, SPECIE, specieId } from "@/data/natura";
import { STATS } from "@/data/comuni";
import { ALBERI, startAlbero, type AlberoId } from "@/lab/alberi";
import { WebGLHost } from "@/lab/LabStage";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/natura")({
  head: () => ({
    meta: [
      { title: titleFor("Natura") },
      {
        name: "description",
        content:
          "Flora e fauna dei Monti Lepini: oltre 100 schede con foto recuperate dal Portale originale, binomi e habitat.",
      },
    ],
  }),
  component: NaturaPage,
});

type Filtro = "tutte" | "flora" | "fauna" | "orchidee";

const MODELLI = new Set(Object.values(ALBERI).map((a) => a.scientifico));

function NaturaPage() {
  const [filtro, setFiltro] = useState<Filtro>("tutte");
  const list = useMemo(() => {
    return SPECIE.filter((s) => {
      if (MODELLI.has(s.scientifico)) return false;
      if (filtro === "flora") return s.gruppo === "flora";
      if (filtro === "fauna") return s.gruppo === "fauna";
      if (filtro === "orchidee")
        return /orchid|ophrys|orchis|cephalanthera/i.test(s.scientifico + s.comune);
      return true;
    });
  }, [filtro]);
  const nFoto = SPECIE.filter((s) => s.foto).length;
  const nFauna = SPECIE.filter((s) => s.gruppo === "fauna").length;
  const nFlora = SPECIE.filter((s) => s.gruppo === "flora").length;

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-12">
        <p className="text-[0.75rem] uppercase tracking-[0.2em] text-copper-light">Natura</p>
        <h1 className="mt-2 font-display text-5xl text-cream">Il schedario vivo</h1>
        <p className="mt-4 max-w-2xl text-cream-soft">
          Recuperato dal Portale originale: {nFlora} schede di flora, {nFauna} di fauna, {nFoto} con fotografia.
          Non è la lista completa delle «168 specie di uccelli» né delle «~50 orchidee»: è tutto ciò che il sito
          aveva già nominato e illustrato. Le coltivate di Ninfa restano segnate come tali.
        </p>
        <p className="mt-3 text-sm text-muted">
          Vetta {STATS.vetta} m · {STATS.vettaNome}. In Lab la biosfera usa le stesse schede.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {HABITAT.map((h) => (
            <article key={h.titolo} className="rounded-xl bg-navy-card p-6 shadow-[var(--shadow-border)]">
              <h2 className="font-display text-2xl text-cream">{h.titolo}</h2>
              <p className="mt-3 leading-relaxed text-cream-soft">{h.testo}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {(
            [
              ["tutte", "Tutte"],
              ["flora", "Flora"],
              ["fauna", "Fauna"],
              ["orchidee", "Orchidee"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFiltro(id)}
              className={
                filtro === id
                  ? "rounded-full bg-copper px-4 py-2 text-sm text-cream"
                  : "rounded-full border border-cream/20 px-4 py-2 text-sm text-cream-soft"
              }
            >
              {label}
            </button>
          ))}
        </div>

        {(filtro === "tutte" || filtro === "flora") && <AlberoStudio />}

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <li key={specieId(s)} id={specieId(s)} className="scroll-mt-24 overflow-hidden rounded-xl bg-navy-card shadow-[var(--shadow-border)]">
              {s.foto ? (
                <img src={s.foto} alt={s.comune} className="h-44 w-full object-cover" loading="lazy" />
              ) : (
                <div className="h-16 bg-navy-deep" />
              )}
              <div className="p-4">
                <p className="font-mono text-[0.65rem] uppercase tracking-wider text-copper-light">{s.gruppo}</p>
                <h3 className="mt-1 font-display text-xl text-cream">{s.comune}</h3>
                <p className="font-mono text-xs italic text-olive-light">{s.scientifico}</p>
                <p className="mt-2 text-sm text-cream-soft">{s.habitat}</p>
                {s.comuni && s.comuni.length > 0 ? (
                  <p className="mt-3 flex flex-wrap gap-2">
                    {s.comuni.slice(0, 4).map((slug) => (
                      <Link key={slug} to="/comuni/$slug" params={{ slug }} className="text-xs text-olive-light">
                        {slug.replace(/-/g, " ")}
                      </Link>
                    ))}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SiteShell>
  );
}

function AlberoStudio() {
  const ids = Object.keys(ALBERI) as AlberoId[];
  const [id, setId] = useState<AlberoId>("leccio");
  const spec = ALBERI[id];
  const start = useCallback((c: HTMLCanvasElement) => startAlbero(c, id), [id]);
  const s = SPECIE.find((x) => x.scientifico === spec.scientifico);
  return (
    <article className="mt-8 overflow-hidden rounded-xl bg-navy-card shadow-[var(--shadow-border)] md:grid md:grid-cols-2">
      <div className="relative min-h-[320px] bg-navy-deep md:min-h-[420px]">
        <WebGLHost start={start} />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-1 p-4">
          {ids.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setId(k)}
              className={
                id === k
                  ? "rounded-full bg-copper px-3 py-1.5 text-xs text-cream"
                  : "rounded-full border border-cream/20 px-3 py-1.5 text-xs text-cream-soft"
              }
            >
              {ALBERI[k].comune}
            </button>
          ))}
        </div>
        {s?.foto ? <img src={s.foto} alt={spec.comune} className="h-36 w-full object-cover" /> : null}
        <div className="p-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-copper-light">
            Flora · 3D · {spec.forma} · trascina
          </p>
          <h2 className="mt-1 font-display text-3xl text-cream">{spec.comune}</h2>
          <p className="font-mono text-xs italic text-olive-light">{spec.scientifico}</p>
          <p className="mt-3 text-sm leading-relaxed text-cream-soft">{s?.habitat}</p>
        </div>
      </div>
    </article>
  );
}