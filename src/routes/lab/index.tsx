import { Link, createFileRoute } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/lab/")({
  head: () => ({
    meta: [
      { title: titleFor("Lepini Lab") },
      {
        name: "description",
        content:
          "Lepini Lab: i progetti del laboratorio. Il Portale dei Monti Lepini è uno. Legno e drone stanno per conto loro.",
      },
    ],
  }),
  component: LabHome,
});

const PORTALE_APPS = [
  { to: "/lab/atlante", title: "Atlante", text: "I 26 comuni sul rilievo.", img: "/images/lab/atlante.jpg" },
  { to: "/lab/volo", title: "Volo", text: "Sopra il massiccio, verso un borgo.", img: "/images/lab/volo.jpg" },
  { to: "/lab/sentieri", title: "Sentieri", text: "701, 702, 736 sul rilievo vero.", img: "/images/lab/sentieri.jpg" },
  { to: "/lab/biosfera", title: "Biosfera", text: "Flora e fauna, le schede natura.", img: "/images/lab/biosfera.jpg" },
  { to: "/lab/faggeta", title: "Faggeta", text: "Tra i faggi, fino al picchio nero.", img: "/images/lab/faggeta.jpg" },
  { to: "/lab/parco", title: "Parco", text: "ZPS e siti Natura 2000.", img: "/images/lab/parco.jpg" },
  { to: "/lab/alberi", title: "Alberi", text: "Leccio e nocciolo, poi la scheda.", img: "/images/lab/alberi.jpg" },
  { to: "/lab/trama", title: "Trama", text: "I 26 nodi, orbite e popolazione.", img: "/images/lab/trama.jpg" },
] as const;

function LabHome() {
  return (
    <div className="lab-page relative min-h-screen">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Salta al contenuto
      </a>
      <LabHeader />
      <main id="contenuto" className="pt-20">
        <section className="mx-auto max-w-6xl px-5 pb-8 pt-16 md:px-12 md:pt-24">
          <p className="font-mono text-xs uppercase tracking-kicker text-copper">Lepini Lab · Lepini Digital</p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.8rem,7vw,5.2rem)] font-medium leading-[0.95]">
            I progetti del laboratorio.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Il Portale è uno. Accanto ci sono lavori che non gli appartengono: si aprono da soli, con una scheda propria.
          </p>
        </section>

        <section id="progetti" className="mx-auto max-w-6xl px-5 py-12 md:px-12 md:py-16">
          <p className="font-mono text-xs uppercase tracking-kicker text-copper">Progetti</p>
          <h2 className="mt-3 font-display text-4xl">Tre lavori, non un solo sito.</h2>

          <article className="mt-10 border border-ink/10 bg-paper-card">
            <div className="border-b border-ink/10 px-5 py-6 md:px-8">
              <p className="font-mono text-xs uppercase tracking-kicker text-copper">01 · Portale</p>
              <h3 className="mt-2 font-display text-3xl">Portale dei Monti Lepini</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
                Comuni, specie e sentieri. Queste app stanno dentro il Portale: leggono le stesse schede.
              </p>
              <Link to="/" className="mt-4 inline-block text-sm text-copper">
                Apri il Portale
              </Link>
            </div>
            <ul className="grid gap-px bg-ink/10 p-px sm:grid-cols-2 lg:grid-cols-4">
              {PORTALE_APPS.map((app) => (
                <li key={app.to} className="bg-paper-card">
                  <Link to={app.to} className="group block h-full p-4 hover:bg-paper">
                    <img src={app.img} alt="" className="aspect-[6/5] w-full object-cover" />
                    <h4 className="mt-3 font-display text-xl">{app.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{app.text}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </article>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Link to="/lab/legno" className="group border border-ink/10 bg-paper-card hover:border-copper">
              <img src="/images/lab/legno.jpg" alt="" className="aspect-[16/9] w-full object-cover" />
              <div className="p-5 md:p-6">
                <p className="font-mono text-xs uppercase tracking-kicker text-copper">02 · A parte</p>
                <h3 className="mt-2 font-display text-3xl">Legno</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Travi, pannelli e distinta d’acquisto. Non è un’app del Portale: è un progetto suo, per chi lavora il legno.
                </p>
              </div>
            </Link>
            <Link to="/lab/drone" className="group border border-ink/10 bg-paper-card hover:border-copper">
              <img src="/images/lab/drone.jpg" alt="" className="aspect-[16/9] w-full object-cover" />
              <div className="p-5 md:p-6">
                <p className="font-mono text-xs uppercase tracking-kicker text-copper">03 · A parte</p>
                <h3 className="mt-2 font-display text-3xl">Drone</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Volo sul rilievo reale, satellite e strade. Si può restare sui Lepini o cambiare zona.
                </p>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/10 px-5 py-12 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <BrandMark variant="lab" className="h-16 w-auto md:h-20" />
          <div className="text-sm text-ink-soft">
            <p>Costruito da Lepini Digital.</p>
            <Link to="/digitale" className="mt-2 inline-block text-ink hover:text-copper">
              Digital
            </Link>
            <Link to="/lab/area" className="mt-2 block text-ink hover:text-copper">
              Area
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LabHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-12">
        <Link to="/lab" className="flex items-center" aria-label="Lepini Lab">
          <BrandMark variant="labMark" className="h-11 w-auto md:h-12" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm tracking-wide text-ink-soft lg:flex" aria-label="Lab">
          <a href="#progetti" className="hover:text-ink">
            Progetti
          </a>
          <Link to="/" className="hover:text-ink">
            Portale
          </Link>
          <Link to="/digitale" className="hover:text-ink">
            Digital
          </Link>
          <Link to="/lab/area" className="hover:text-ink">
            Area
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="lab-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">Menu</span>
        </button>
      </div>
      {open ? (
        <div id="lab-nav" className="border-t border-ink/10 bg-paper px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-1 text-ink" aria-label="Lab mobile">
            <a href="#progetti" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Progetti
            </a>
            <Link to="/" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Portale
            </Link>
            <Link to="/digitale" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Digital
            </Link>
            <Link to="/lab/area" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Area
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
