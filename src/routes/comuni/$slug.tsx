import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { JsonLd } from "@/components/JsonLd";
import { ComuneMap } from "@/components/comuni/ComuneMap";
import { ComuneTabs } from "@/components/comuni/ComuneTabs";
import { SiteShell } from "@/components/layout/SiteShell";
import { getComune, fotoComune } from "@/data/comuni";
import { EVENTI } from "@/data/eventi";
import { speciePerComune } from "@/data/natura";
import { getScheda } from "@/data/schede";
import { sentieriPerComune } from "@/data/sentieri";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/comuni/$slug")({
  loader: ({ params }) => {
    const comune = getComune(params.slug);
    if (!comune) throw notFound();
    return { comune, scheda: getScheda(comune.slug) };
  },
  head: ({ loaderData }) => {
    const nome = loaderData?.comune.nome ?? "Comune";
    const desc = loaderData?.comune.sommario ?? "";
    return {
      meta: [{ title: titleFor(nome) }, { name: "description", content: desc }],
    };
  },
  component: ComunePage,
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-5 py-24">
        <h1 className="font-display text-4xl">Comune non in dataset</h1>
        <Link to="/comuni" className="mt-6 inline-block text-olive-light">
          Torna all'elenco
        </Link>
      </div>
    </SiteShell>
  ),
});

function ComunePage() {
  const { comune, scheda } = Route.useLoaderData();
  const sentieri = sentieriPerComune(comune.slug);
  const eventi = EVENTI.filter((e) => e.comuneSlug === comune.slug);
  const specie = speciePerComune(comune.slug);
  const foto = fotoComune(comune.slug);

  return (
    <SiteShell>
      <JsonLd
        data={{
          "@type": "TouristDestination",
          name: comune.nome,
          description: comune.sommario,
          geo: { "@type": "GeoCoordinates", latitude: comune.lat, longitude: comune.lng },
          containedInPlace: { "@type": "Mountain", name: "Monti Lepini" },
        }}
      />
      {foto ? (
        <div className="relative h-[42vh] min-h-[240px] overflow-hidden border-b-[3px] border-copper">
          <img src={foto} alt={`Veduta di ${comune.nome}`} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
          <div className="absolute bottom-6 left-0 right-0 px-5 md:px-12">
            <p className="text-[0.75rem] uppercase tracking-[0.2em] text-copper-light">
              {comune.provincia} · {comune.altitudine} m s.l.m.
              {scheda?.cap ? ` · ${scheda.cap}` : ""}
            </p>
            <h1 className="mt-2 font-display text-5xl text-cream">{comune.nome}</h1>
          </div>
        </div>
      ) : null}
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[1.2fr_0.8fr] md:px-12">
        <article>
          {foto ? (
            <p className="font-display text-2xl italic text-olive-light">{comune.headline}</p>
          ) : (
            <>
              <p className="text-[0.75rem] uppercase tracking-[0.2em] text-copper-light">
                {comune.provincia} · {comune.altitudine} m s.l.m.
              </p>
              <h1 className="mt-2 font-display text-5xl text-cream">{comune.nome}</h1>
              <p className="mt-3 font-display text-2xl italic text-olive-light">{comune.headline}</p>
            </>
          )}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream-soft">{comune.sommario}</p>
          {comune.note ? <p className="mt-4 text-sm text-muted">{comune.note}</p> : null}

          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg bg-navy-card p-4">
              <dt className="text-muted">Abitanti (stima)</dt>
              <dd className="mt-1 font-display text-2xl tabular-nums">{comune.abitanti.toLocaleString("it-IT")}</dd>
            </div>
            <div className="rounded-lg bg-navy-card p-4">
              <dt className="text-muted">Patrono</dt>
              <dd className="mt-1 font-display text-2xl">{comune.patrono}</dd>
            </div>
            {scheda?.festaPatronale ? (
              <div className="rounded-lg bg-navy-card p-4">
                <dt className="text-muted">Festa patronale</dt>
                <dd className="mt-1 font-display text-xl">{scheda.festaPatronale}</dd>
              </div>
            ) : null}
            {scheda?.comunitaMontana ? (
              <div className="rounded-lg bg-navy-card p-4">
                <dt className="text-muted">Comunità montana</dt>
                <dd className="mt-1 font-display text-xl">{scheda.comunitaMontana}</dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-6 flex flex-wrap gap-2">
            {comune.tag.map((t) => (
              <span key={t} className="rounded-full border border-cream/15 px-3 py-1 text-xs uppercase tracking-wider text-muted">
                {t}
              </span>
            ))}
            {comune.bandieraArancione ? (
              <span className="rounded-full border border-copper/50 px-3 py-1 text-xs uppercase tracking-wider text-copper-light">
                Bandiera Arancione TCI
              </span>
            ) : null}
          </div>

          {scheda ? <ComuneTabs scheda={scheda} specie={specie} /> : null}
        </article>

        <aside className="flex flex-col gap-6">
          <ComuneMap active={comune.slug} />
          {sentieri.length > 0 ? (
            <div className="rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]">
              <h2 className="font-display text-xl">Sentieri in dataset</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {sentieri.map((s) => (
                  <li key={s.slug}>
                    <Link to="/sentieri/$slug" params={{ slug: s.slug }} className="text-olive-light hover:text-cream">
                      {s.codice ? `${s.codice} · ` : null}
                      {s.nome}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-muted">Nessun sentiero CAI in dataset per questo comune.</p>
          )}
          {eventi.length > 0 ? (
            <div className="rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]">
              <h2 className="font-display text-xl">Nel calendario</h2>
              <ul className="mt-3 space-y-3 text-sm text-cream-soft">
                {eventi.map((e) => (
                  <li key={e.id}>
                    <p className="text-cream">{e.titolo}</p>
                    <p className="text-muted">{e.quando}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
    </SiteShell>
  );
}
