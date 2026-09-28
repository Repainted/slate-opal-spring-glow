import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { Eyebrow } from "@/components/SectionHead";
import { MESI } from "@/data/natura";
import { titleFor } from "@/lib/seo";
import { cn } from "@/lib/utils";

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
        <Eyebrow>Esperienze</Eyebrow>
        <h1 className="mt-2 font-display text-5xl">Calendario stagionale</h1>
        <p className="mt-4 max-w-2xl text-cream-soft">
          Non è il calendario eventi della DMO. È il ritmo del crinale: orchidee, carciofo, foliage, olio nuovo.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MESI.map((m, i) => (
            <article
              key={m.n}
              className={cn(
                "overflow-hidden rounded-xl bg-navy-card shadow-[var(--shadow-border)]",
                i === now && "ring-1 ring-copper/70",
              )}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={m.foto} alt="" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-card via-navy-card/20 to-transparent" />
                {i === now ? (
                  <p className="absolute left-4 top-4 rounded-full border border-copper/50 bg-navy-deep/80 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-copper-light">
                    Questo mese
                  </p>
                ) : null}
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="font-mono text-xs text-copper-light">{String(m.n).padStart(2, "0")}</p>
                  <h2 className="font-display text-3xl leading-none text-cream">{m.nome}</h2>
                </div>
              </div>
              <dl className="space-y-3 p-5 text-sm">
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">Clima</dt>
                  <dd className="mt-1 text-cream-soft">{m.clima}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">Natura</dt>
                  <dd className="mt-1 text-cream-soft">{m.natura}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">Tavola</dt>
                  <dd className="mt-1 text-cream-soft">{m.tavola}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">Uscita</dt>
                  <dd className="mt-1 text-cream-soft">{m.uscita}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
