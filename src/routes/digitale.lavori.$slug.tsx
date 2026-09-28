import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { BrandMark } from "@/components/BrandMark";
import { getLavoro } from "@/data/lavori";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/digitale/lavori/$slug")({
  loader: ({ params }) => {
    const lavoro = getLavoro(params.slug);
    if (!lavoro) throw notFound();
    return { lavoro };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: titleFor(loaderData?.lavoro.cliente ?? "Lavoro") },
      { name: "description", content: loaderData?.lavoro.lead ?? "" },
    ],
  }),
  component: SchedaLavoro,
});

function SchedaLavoro() {
  const { lavoro } = Route.useLoaderData();
  return (
    <div className="studio-page relative min-h-screen">
      <header className="border-b border-ink/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-12">
          <Link to="/digitale" aria-label="Lepini Digital">
            <BrandMark variant="digitalMark" className="h-11 w-auto" />
          </Link>
          <Link to="/digitale/lavori" className="text-sm text-ink-soft hover:text-ink">
            Lavori
          </Link>
        </div>
      </header>
      <main>
        <section className="mx-auto max-w-6xl px-5 pb-8 pt-16 md:px-12 md:pt-24">
          <p className="font-mono text-xs uppercase tracking-kicker text-copper">
            {lavoro.settore} · {lavoro.luogo}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-ink md:text-6xl">{lavoro.cliente}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{lavoro.lead}</p>
          {lavoro.url ? (
            <a
              href={lavoro.url}
              className="mt-6 inline-flex min-h-11 items-center text-sm text-copper hover:text-ink"
              rel="noopener noreferrer"
            >
              Apri il sito
            </a>
          ) : null}
        </section>
        <ol>
          {lavoro.pezzi.map((p, i) => (
            <li key={p.titolo} className="grid border-t border-ink/10 md:grid-cols-2">
              <img
                src={p.src}
                alt={p.alt}
                className={`aspect-[16/10] h-full w-full ${p.fit === "contain" ? "object-contain bg-ink p-10" : "object-cover object-left-top"} ${i % 2 === 1 ? "md:order-2" : ""}`}
              />
              <div className="flex flex-col justify-center px-5 py-10 md:px-14 md:py-16">
                <p className="font-display text-3xl text-copper">0{i + 1}</p>
                <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">{p.titolo}</h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">{p.testo}</p>
              </div>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
