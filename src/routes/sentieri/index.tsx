import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { SENTIERI } from "@/data/sentieri";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/sentieri/")({
  head: () => ({
    meta: [
      { title: titleFor("Sentieri") },
      {
        name: "description",
        content: "Itinerari dei Monti Lepini con codice CAI quando esiste una fonte. Semprevisa, Lupone, Fossanova.",
      },
    ],
  }),
  component: SentieriIndex,
});

export function SentieriIndex() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-12">
        <p className="text-[0.75rem] uppercase tracking-[0.2em] text-copper-light">Sentieri</p>
        <h1 className="mt-2 font-display text-5xl">Camminare con una fonte</h1>
        <p className="mt-4 max-w-2xl text-cream-soft">
          Compagnia dei Lepini ha già i PDF dei sentieri numerati. Qui non si ricopia la carta: si dà una scheda
          orientativa e si rimanda alla fonte. Nessun GPX inventato.{" "}
          <Link to="/lab/sentieri" className="text-olive-light">
            Sul crinale c'è un modello 3D schematico
          </Link>{" "}
          delle stesse schede.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {SENTIERI.map((s) => (
            <Link
              key={s.slug}
              to="/sentieri/$slug"
              params={{ slug: s.slug }}
              className="rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)] transition-transform hover:-translate-y-0.5"
            >
              {s.codice ? (
                <p className="font-mono text-xs text-copper-light">{s.codice}</p>
              ) : (
                <p className="text-xs uppercase tracking-wider text-muted">Itinerario</p>
              )}
              <h2 className="mt-2 font-display text-2xl text-cream">{s.nome}</h2>
              <p className="mt-2 text-sm text-cream-soft">
                {s.partenza} → {s.arrivo}
              </p>
              <p className="mt-3 text-xs text-muted">
                {s.difficolta} · {s.durata} · {s.dislivello}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
