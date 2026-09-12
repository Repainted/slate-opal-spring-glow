import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { MESI } from "@/data/natura";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/esperienze/calendario")({
  head: () => ({
    meta: [
      { title: titleFor("Calendario stagionale") },
      { name: "description", content: "Fioriture, raccolti e uscite sui Monti Lepini, mese per mese." },
    ],
  }),
  component: CalendarioStagionale,
});

function CalendarioStagionale() {
  const now = new Date().getMonth();
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-12">
        <p className="text-[0.75rem] uppercase tracking-[0.2em] text-copper-light">Esperienze</p>
        <h1 className="mt-2 font-display text-5xl">Calendario stagionale</h1>
        <p className="mt-4 max-w-2xl text-cream-soft">
          Non è il calendario eventi della DMO. È il ritmo del crinale: orchidee, carciofo, foliage, olio nuovo.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MESI.map((m, i) => (
            <article
              key={m.n}
              className={`rounded-xl p-5 shadow-[var(--shadow-border)] ${i === now ? "bg-navy-card ring-1 ring-copper/60" : "bg-navy-card"}`}
            >
              <p className="font-mono text-xs text-copper-light">{String(m.n).padStart(2, "0")}</p>
              <h2 className="mt-1 font-display text-2xl">{m.nome}</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div>
                  <dt className="text-muted">Clima</dt>
                  <dd>{m.clima}</dd>
                </div>
                <div>
                  <dt className="text-muted">Natura</dt>
                  <dd>{m.natura}</dd>
                </div>
                <div>
                  <dt className="text-muted">Tavola</dt>
                  <dd>{m.tavola}</dd>
                </div>
                <div>
                  <dt className="text-muted">Uscita</dt>
                  <dd>{m.uscita}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
