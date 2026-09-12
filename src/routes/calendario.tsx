import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { EVENTI } from "@/data/eventi";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/calendario")({
  head: () => ({
    meta: [
      { title: titleFor("Calendario") },
      {
        name: "description",
        content: "Ritmi dell'anno sui Monti Lepini. Le sagre vive restano da Compagnia dei Lepini e dalla DMO.",
      },
    ],
  }),
  component: CalendarioPage,
});

function CalendarioPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-5 py-12 md:px-12">
        <p className="text-[0.75rem] uppercase tracking-[0.2em] text-copper-light">Calendario</p>
        <h1 className="mt-2 font-display text-5xl">Ritmi, non un feed</h1>
        <p className="mt-4 text-cream-soft">
          Le date puntuali di sagre e concerti le pubblica già{" "}
          <a href="https://www.compagniadeilepini.it/eventi-monti-lepini/" className="text-olive-light">
            Compagnia dei Lepini
          </a>{" "}
          e{" "}
          <a href="https://mybestlazio.it/" className="text-olive-light">
            MyBestLazio
          </a>
          . Qui teniamo i fenomeni ricorrenti, con nota di verifica. Copiare il calendario altrui è il modo più veloce
          per farlo morire.
        </p>
        <ol className="mt-10 space-y-5">
          {EVENTI.map((e) => (
            <li key={e.id} className="rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]">
              <p className="text-xs uppercase tracking-wider text-copper-light">{e.tipo}</p>
              <h2 className="mt-1 font-display text-2xl">{e.titolo}</h2>
              <p className="mt-1 text-sm text-muted">
                {e.quando} · {e.luogo}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream-soft">{e.nota}</p>
              {e.comuneSlug ? (
                <Link to="/comuni/$slug" params={{ slug: e.comuneSlug }} className="mt-3 inline-block text-sm text-olive-light">
                  Scheda comune
                </Link>
              ) : null}
            </li>
          ))}
        </ol>
        <p className="mt-10 text-sm text-muted">
          Per il ritmo naturale, non gli eventi:{" "}
          <Link to="/esperienze/calendario" className="text-olive-light">
            calendario stagionale
          </Link>
          .
        </p>
      </div>
    </SiteShell>
  );
}
