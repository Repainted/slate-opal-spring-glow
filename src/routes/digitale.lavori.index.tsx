import { Link, createFileRoute } from "@tanstack/react-router";
import { BrandMark } from "@/components/BrandMark";
import { LAVORI } from "@/data/lavori";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/digitale/lavori/")({
  head: () => ({
    meta: [
      { title: titleFor("Lavori") },
      {
        name: "description",
        content: "Lavori consegnati da Lepini Digital. Il primo è il magazzino F.lli Colaiacomo, a Montelanico.",
      },
    ],
  }),
  component: LavoriPage,
});

function LavoriPage() {
  return (
    <div className="studio-page relative min-h-screen">
      <header className="border-b border-ink/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-12">
          <Link to="/digitale" aria-label="Lepini Digital">
            <BrandMark variant="digitalMark" className="h-11 w-auto" />
          </Link>
          <Link to="/digitale" className="text-sm text-ink-soft hover:text-ink">
            Studio
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-16 md:px-12 md:py-24">
        <p className="font-mono text-xs uppercase tracking-kicker text-copper">Lepini Digital</p>
        <h1 className="mt-3 max-w-xl font-display text-5xl text-ink">Lavori consegnati.</h1>
        <p className="mt-4 max-w-xl text-ink-soft">
          Quello che è già online. Il prossimo cliente entra in questo elenco, con la sua scheda.
        </p>
        <ul className="mt-14 grid gap-10">
          {LAVORI.map((l) => (
            <li key={l.slug} className="border-t border-ink/10 pt-8">
              <Link
                to="/digitale/lavori/$slug"
                params={{ slug: l.slug }}
                className="grid items-center gap-6 md:grid-cols-12"
              >
                <img src={l.copertina} alt="" className="aspect-[16/9] w-full object-cover object-left md:col-span-7" />
                <div className="md:col-span-5">
                  <p className="font-mono text-xs uppercase tracking-kicker text-copper">
                    {l.settore} · {l.luogo}
                  </p>
                  <h2 className="mt-2 font-display text-4xl text-ink">{l.cliente}</h2>
                  <p className="mt-3 text-ink-soft">{l.lead}</p>
                  <p className="mt-4 text-sm text-copper">Apri la scheda</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
