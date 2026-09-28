import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { Eyebrow } from "@/components/SectionHead";
import { Button } from "@/components/ui/button";
import { PARCO, SITI, VETTE } from "@/data/parco";
import { titleFor } from "@/lib/seo";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/parco")({
  head: () => ({
    meta: [
      { title: titleFor("Parco") },
      {
        name: "description",
        content:
          "ZPS Monti Lepini IT6030043 e i siti Natura 2000. Non è un parco regionale istituito: è ciò che esiste sul crinale.",
      },
    ],
  }),
  component: ParcoPage,
});

function ParcoPage() {
  const tr = useT();
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-12 md:py-16">
        <Eyebrow>Natura 2000 · {PARCO.codice}</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] text-cream md:text-6xl">
          {tr("Il parco che non c’è.")}
          <span className="mt-3 block font-medium italic text-olive-light">{tr("E il crinale che sì.")}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream-soft">{tr(PARCO.nota)}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/lab/parco">
            <Button>{tr("Esplora in Lab")}</Button>
          </Link>
          <Link to="/natura" className="self-center text-sm text-olive-light">
            {tr("Schedario flora e fauna")}
          </Link>
        </div>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-xl bg-cream/10 sm:grid-cols-3">
          {[
            [PARCO.codice, tr("Codice ZPS")],
            [`${PARCO.ettari.toLocaleString("it-IT")} ha`, tr("Estensione")],
            [PARCO.atto, tr("Misure di conservazione")],
          ].map(([k, l]) => (
            <div key={l} className="bg-navy-card px-6 py-6">
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">{l}</dt>
              <dd className="mt-2 font-display text-2xl text-cream">{k}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-16 font-display text-3xl text-cream">Siti Natura 2000</h2>
        <p className="mt-3 max-w-xl text-cream-soft">
          Fonte: parchilazio.it e formulari standard. Ettari arrotondati. Le ZSC erano SIC, designate nel 2016.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {SITI.map((s) => (
            <li key={s.id} id={s.id} className="rounded-xl bg-navy-card p-6 shadow-[var(--shadow-border)]">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-copper-light">
                {s.tipo} · {s.codice} · {s.ha?.toLocaleString("it-IT")} ha
              </p>
              <h3 className="mt-2 font-display text-2xl text-cream">{s.nome}</h3>
              <p className="mt-3 leading-relaxed text-cream-soft">{s.testo}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-display text-3xl text-cream">Vette</h2>
        <ul className="mt-6 divide-y divide-cream/10 rounded-xl bg-navy-card">
          {VETTE.map((v) => (
            <li key={v.id} className="flex flex-wrap items-baseline justify-between gap-3 px-6 py-4">
              <div>
                <p className="font-display text-xl text-cream">{v.nome}</p>
                <p className="text-sm text-cream-soft">{v.testo}</p>
              </div>
              <p className="font-mono text-sm text-olive-light">{v.m} m</p>
            </li>
          ))}
        </ul>
      </div>
    </SiteShell>
  );
}
