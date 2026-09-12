import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { getComune } from "@/data/comuni";
import { getSentiero } from "@/data/sentieri";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/sentieri/$slug")({
  loader: ({ params }) => {
    const sentiero = getSentiero(params.slug);
    if (!sentiero) throw notFound();
    return { sentiero };
  },
  head: ({ loaderData }) => {
    const nome = loaderData?.sentiero.nome ?? "Sentiero";
    const desc = loaderData?.sentiero.descrizione ?? "";
    return {
      meta: [{ title: titleFor(nome) }, { name: "description", content: desc }],
    };
  },
  component: SentieroPage,
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-5 py-24">
        <h1 className="font-display text-4xl">Sentiero non in dataset</h1>
        <Link to="/sentieri" className="mt-6 inline-block text-olive-light">
          Tutti gli itinerari
        </Link>
      </div>
    </SiteShell>
  ),
});

function SentieroPage() {
  const { sentiero } = Route.useLoaderData();
  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-5 py-12 md:px-12">
        {sentiero.codice ? (
          <p className="font-mono text-sm text-copper-light">{sentiero.codice}</p>
        ) : (
          <p className="text-[0.75rem] uppercase tracking-[0.2em] text-muted">Itinerario culturale</p>
        )}
        <h1 className="mt-2 font-display text-4xl md:text-5xl">{sentiero.nome}</h1>
        <p className="mt-6 text-lg leading-relaxed text-cream-soft">{sentiero.descrizione}</p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 text-sm">
          <div>
            <dt className="text-muted">Partenza</dt>
            <dd className="mt-1">{sentiero.partenza}</dd>
          </div>
          <div>
            <dt className="text-muted">Arrivo</dt>
            <dd className="mt-1">{sentiero.arrivo}</dd>
          </div>
          <div>
            <dt className="text-muted">Difficoltà CAI</dt>
            <dd className="mt-1">{sentiero.difficolta}</dd>
          </div>
          <div>
            <dt className="text-muted">Tempo</dt>
            <dd className="mt-1">
              {sentiero.durata} · {sentiero.dislivello}
            </dd>
          </div>
        </dl>
        <h2 className="mt-10 font-display text-2xl">Comuni toccati</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {sentiero.comuni.map((slug) => {
            const c = getComune(slug);
            return (
              <li key={slug}>
                <Link
                  to="/comuni/$slug"
                  params={{ slug }}
                  className="inline-flex min-h-11 items-center rounded-full border border-cream/20 px-4 text-sm hover:border-copper-light"
                >
                  {c?.nome ?? slug}
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-10 border-t border-cream/10 pt-6 text-sm text-muted">Fonte: {sentiero.fonte}</p>
        <p className="mt-2 text-sm text-muted">
          Tracciato ufficiale e condizioni:{" "}
          <a href="https://www.compagniadeilepini.it/trekking-monti-lepini/" className="text-olive-light">
            Compagnia dei Lepini
          </a>
          . Questa scheda non sostituisce una carta.
        </p>
      </article>
    </SiteShell>
  );
}
