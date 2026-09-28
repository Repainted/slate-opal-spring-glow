import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { LangToggle, useT } from "@/lib/i18n";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/lab/")({
  head: () => ({
    meta: [
      { title: titleFor("Lepini Lab") },
      {
        name: "description",
        content:
          "Lepini Lab: i progetti del laboratorio. Il Portale dei Monti Lepini è uno. Legno, drone, misure e lo scaffale cablato stanno per conto loro.",
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
  const tr = useT();
  const [appsOpen, setAppsOpen] = useState(false);
  const [toy, setToy] = useState(false);
  return (
    <div className="lab-page relative min-h-screen">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        {tr("Salta al contenuto")}
      </a>
      <LabHeader />
      <main id="contenuto" className="pt-20">
        <section className="mx-auto max-w-6xl px-5 pb-8 pt-16 md:px-12 md:pt-24">
          <p className="font-mono text-xs uppercase tracking-kicker text-copper">{tr("Lepini Lab · Lepini Digital")}</p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.8rem,7vw,5.2rem)] font-medium leading-[0.95]">
            {tr("I progetti del laboratorio.")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {tr("Il Portale è uno. Accanto ci sono lavori che non gli appartengono: si aprono da soli, con una scheda propria.")}
          </p>
        </section>

        <section id="progetti" className="mx-auto max-w-6xl px-5 py-12 md:px-12 md:py-16">
          <p className="font-mono text-xs uppercase tracking-kicker text-copper">{tr("Progetti")}</p>
          <h2 className="mt-3 font-display text-4xl">{tr("Sei lavori, non un solo sito.")}</h2>

          <div className="mt-8 -mx-5 overflow-x-auto px-5 pb-3 md:-mx-12 md:px-12" tabIndex={0}>
            <ul className="flex snap-x snap-mandatory gap-4">
              <li className="w-[min(85vw,32rem)] shrink-0 snap-start">
                <Link to="/lab/legno" className="group block h-full border border-ink/10 bg-paper-card hover:border-copper">
                  <img src="/images/lab/legno.jpg" alt="" className="aspect-[16/9] w-full object-cover" />
                  <div className="p-5 md:p-6">
                    <p className="font-mono text-xs uppercase tracking-kicker text-copper">{tr("02 · A parte")}</p>
                    <h3 className="mt-2 font-display text-3xl">Legno</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {tr("Travi, pannelli e distinta d’acquisto. Non è un’app del Portale: è un progetto suo, per chi lavora il legno.")}
                    </p>
                  </div>
                </Link>
              </li>
              <li className="w-[min(85vw,32rem)] shrink-0 snap-start">
                <Link to="/lab/drone" className="group block h-full border border-ink/10 bg-paper-card hover:border-copper">
                  <img src="/images/lab/drone.jpg" alt="" className="aspect-[16/9] w-full object-cover" />
                  <div className="p-5 md:p-6">
                    <p className="font-mono text-xs uppercase tracking-kicker text-copper">{tr("03 · A parte")}</p>
                    <h3 className="mt-2 font-display text-3xl">Drone</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {tr("Volo sul rilievo reale, satellite e strade. Si può restare sui Lepini o cambiare zona.")}
                    </p>
                  </div>
                </Link>
              </li>
              <li className="w-[min(85vw,32rem)] shrink-0 snap-start">
                <a href="/lab/misure/" className="group block h-full border border-ink/10 bg-paper-card hover:border-copper">
                  <img src="/images/lab/misure.jpg" alt="" className="aspect-[16/9] w-full object-cover" />
                  <div className="p-5 md:p-6">
                    <p className="font-mono text-xs uppercase tracking-kicker text-copper">{tr("04 · A parte")}</p>
                    <h3 className="mt-2 font-display text-3xl">Misure</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {tr("Tetto, stanza, muro o porticato. Planimetria, listino e preventivo. Non fa parte del Portale.")}
                    </p>
                  </div>
                </a>
              </li>
              <li className="w-[min(85vw,32rem)] shrink-0 snap-start">
                <Link to="/lab/scaffale" className="group block h-full border border-ink/10 bg-paper-card hover:border-copper">
                  <img src="/images/lab/scaffale-soglia.jpg" alt="" className="aspect-[16/9] w-full object-cover" />
                  <div className="p-5 md:p-6">
                    <p className="font-mono text-xs uppercase tracking-kicker text-copper">{tr("05 · A parte")}</p>
                    <h3 className="mt-2 font-display text-3xl">Scaffale</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {tr("Gondole con telecamere e LED nei porta-prezzi. Si gira il modello, esce la distinta. Non fa parte del Portale.")}
                    </p>
                  </div>
                </Link>
              </li>
              <li className="w-[min(85vw,32rem)] shrink-0 snap-start">
                <Link to="/lab/preventivi" className="group block h-full border border-ink/10 bg-paper-card hover:border-copper">
                  <div className="flex aspect-[16/9] w-full items-end bg-ink p-5 text-paper">
                    <p className="font-display text-4xl">Cantiere</p>
                  </div>
                  <div className="p-5 md:p-6">
                    <p className="font-mono text-xs uppercase tracking-kicker text-copper">{tr("06 · A parte")}</p>
                    <h3 className="mt-2 font-display text-3xl">Preventivi</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {tr("Tetto, muri, materiali, listino e PDF. Per chi fa i conti in cantiere.")}
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <article className="mt-8 border border-ink/10 bg-paper-card">
            <div className="px-5 py-6 md:px-8">
              <p className="font-mono text-xs uppercase tracking-kicker text-copper">{tr("01 · Portale")}</p>
              <h3 className="mt-2 font-display text-3xl">{tr("Portale dei Monti Lepini")}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
                {tr("Comuni, specie e sentieri. Queste app stanno dentro il Portale: leggono le stesse schede.")}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Link to="/" className="text-sm text-copper">
                  {tr("Apri il Portale")}
                </Link>
                <button
                  type="button"
                  aria-expanded={appsOpen}
                  onClick={() => setAppsOpen((v) => !v)}
                  className="inline-flex min-h-11 items-center gap-2 text-sm"
                >
                  <ChevronDown className={`size-4 transition-transform ${appsOpen ? "rotate-180" : ""}`} />
                  {appsOpen ? tr("Chiudi le app") : tr("Le app del Portale")}
                </button>
              </div>
            </div>
            <div className={`grid transition-[grid-template-rows] duration-300 ${appsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <ul className="grid gap-px border-t border-ink/10 bg-ink/10 p-px sm:grid-cols-2 lg:grid-cols-4">
                  {PORTALE_APPS.map((app) => (
                    <li key={app.to} className="bg-paper-card">
                      <Link to={app.to} className="group block h-full p-4 hover:bg-paper">
                        <img src={app.img} alt="" className="aspect-[6/5] w-full object-cover" />
                        <h4 className="mt-3 font-display text-xl">{app.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{tr(app.text)}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </section>
      </main>

      <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3">
        {toy ? (
          <div className="w-64 rounded-2xl border border-ink/10 bg-paper p-4 shadow-[0_12px_40px_rgba(20,16,12,0.18)]">
            <p className="font-display text-2xl leading-none">Mattoncini</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {tr("Si salta sui mattoncini, si seguono i tesori e si apre il mondo dopo. Non fa parte del Portale.")}
            </p>
            <Link to="/lab/mattoncini" className="mt-3 inline-flex min-h-11 items-center text-sm text-copper">
              {tr("Apri il gioco")}
            </Link>
            <Link to="/digitale/genitori" className="block text-sm text-copper">
              {tr("Per i genitori")}
            </Link>
          </div>
        ) : null}
        <button
          type="button"
          aria-expanded={toy}
          aria-label="Mattoncini"
          onClick={() => setToy((v) => !v)}
          className="size-16 overflow-hidden rounded-full border-2 border-paper shadow-[0_8px_24px_rgba(20,16,12,0.22)]"
        >
          <img src="/images/lab/mattoncini-icon.jpg" alt="" className="size-full object-cover" />
        </button>
      </div>

      <footer className="border-t border-ink/10 px-5 py-12 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <BrandMark variant="lab" className="h-16 w-auto md:h-20" />
          <div className="text-sm text-ink-soft">
            <p>{tr("Costruito da Lepini Digital.")}</p>
            <Link to="/digitale" className="mt-2 inline-block text-ink hover:text-copper">
              Digital
            </Link>
            <Link to="/lab/area" className="mt-2 block text-ink hover:text-copper">
              {tr("Area")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LabHeader() {
  const [open, setOpen] = useState(false);
  const tr = useT();
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-12">
        <Link to="/lab" className="flex items-center" aria-label="Lepini Lab">
          <BrandMark variant="labMark" className="h-11 w-auto md:h-12" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm tracking-wide text-ink-soft lg:flex" aria-label="Lab">
          <a href="#progetti" className="hover:text-ink">
            {tr("Progetti")}
          </a>
          <Link to="/" className="hover:text-ink">
            {tr("Portale")}
          </Link>
          <Link to="/digitale" className="hover:text-ink">
            Digital
          </Link>
          <Link to="/lab/area" className="hover:text-ink">
            {tr("Area")}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LangToggle tone="dark" />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="lab-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{tr("Menu")}</span>
          </button>
        </div>
      </div>
      {open ? (
        <div id="lab-nav" className="border-t border-ink/10 bg-paper px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-1 text-ink" aria-label="Lab mobile">
            <a href="#progetti" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              {tr("Progetti")}
            </a>
            <Link to="/" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              {tr("Portale")}
            </Link>
            <Link to="/digitale" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Digital
            </Link>
            <Link to="/lab/area" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              {tr("Area")}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
