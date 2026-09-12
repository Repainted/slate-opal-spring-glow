import { Link, createFileRoute } from "@tanstack/react-router";
import { CANTIERE_CONTENUTI, CANTIERE_TECH, PRINCIPI, type Stato } from "@/data/cantiere";
import { COMUNI } from "@/data/comuni";
import { SENTIERI } from "@/data/sentieri";
import { SPECIE } from "@/data/natura";
import { EVENTI } from "@/data/eventi";
import { SiteShell } from "@/components/layout/SiteShell";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/cantiere")({
  head: () => ({
    meta: [
      { title: titleFor("Cantiere") },
      {
        name: "description",
        content: "Basi tecniche e editoriali per il Portale Monti Lepini: dataset, SEO, gap, principi, 90 giorni.",
      },
    ],
  }),
  component: CantierePage,
});

function badge(stato: Stato) {
  if (stato === "fatto") return "text-olive-light border-olive-light/40";
  if (stato === "base") return "text-copper-light border-copper/40";
  return "text-muted border-cream/15";
}

function CantierePage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-5 py-12 md:px-12">
        <p className="text-[0.75rem] uppercase tracking-[0.2em] text-copper-light">Cantiere</p>
        <h1 className="mt-2 font-display text-5xl">Basi, non un restyling</h1>
        <p className="mt-4 text-lg leading-relaxed text-cream-soft">
          Il beta su Netlify era già un prodotto. Mancava il mestiere da portale italiano: dati con fonte, sentieri
          veri, SEO, partnership, un dominio. Questo prototipo è quella impalcatura. Si clicca. Si misura. Si
          sostituisce un campo alla volta.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            [COMUNI.length, "comuni"],
            [SENTIERI.length, "sentieri"],
            [SPECIE.length, "schede natura"],
            [EVENTI.length, "ritmi anno"],
          ].map(([n, l]) => (
            <div key={String(l)} className="rounded-lg bg-navy-card p-4 text-center">
              <p className="font-display text-3xl tabular-nums">{n}</p>
              <p className="text-xs text-muted">{l}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-display text-3xl">Principi editoriali</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-cream-soft">
          {PRINCIPI.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>

        <h2 className="mt-14 font-display text-3xl">Tecnica</h2>
        <ul className="mt-4 space-y-3">
          {CANTIERE_TECH.map((row) => (
            <li key={row.voce} className="rounded-xl bg-navy-card p-4 shadow-[var(--shadow-border)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-cream">{row.voce}</p>
                <span className={`rounded-full border px-2.5 py-0.5 text-[0.68rem] uppercase tracking-wider ${badge(row.stato)}`}>
                  {row.stato}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{row.nota}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-display text-3xl">Contenuti</h2>
        <ul className="mt-4 space-y-3">
          {CANTIERE_CONTENUTI.map((row) => (
            <li key={row.voce} className="rounded-xl bg-navy-card p-4 shadow-[var(--shadow-border)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-cream">{row.voce}</p>
                <span className={`rounded-full border px-2.5 py-0.5 text-[0.68rem] uppercase tracking-wider ${badge(row.stato)}`}>
                  {row.stato}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{row.nota}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-display text-3xl">Novanta giorni</h2>
        <ol className="mt-4 space-y-4 text-cream-soft">
          <li>
            <span className="text-copper-light">Mese 1.</span> Dominio, recapito unico, P.IVA in footer, ISTAT al posto
            delle stime, GPX solo se Compagnia o CAI li cedono.
          </li>
          <li>
            <span className="text-copper-light">Mese 2.</span> Quattro campagne fotografiche le abbiamo in campagna:
            prima una, fatta bene, su tre comuni. Schede imprese con consenso.
          </li>
          <li>
            <span className="text-copper-light">Mese 3.</span> Link reciproci con DMO e Compagnia. Inglese della home e
            delle 5 Bandiere Arancioni. Poi si ricollega il 3D di Lab.
          </li>
        </ol>

        <p className="mt-10 text-sm text-muted">
          Prova subito{" "}
          <Link to="/comuni/$slug" params={{ slug: "montelanico" }} className="text-olive-light">
            Montelanico
          </Link>
          , il{" "}
          <Link to="/sentieri/$slug" params={{ slug: "cai-701" }} className="text-olive-light">
            CAI 701
          </Link>{" "}
          e il{" "}
          <Link to="/esperienze/planner" className="text-olive-light">
            planner
          </Link>
          .
        </p>
      </div>
    </SiteShell>
  );
}
