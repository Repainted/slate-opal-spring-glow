import { Link, createFileRoute } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { BrandMark } from "@/components/BrandMark";
import { JsonLd } from "@/components/JsonLd";
import { ProveGallery } from "@/components/ProveGallery";
import { Button } from "@/components/ui/button";
import { DIGITAL_MAIL, DIGITAL_STATS, METODO, PITCH, SERVIZI } from "@/data/digitale";

export const Route = createFileRoute("/digitale/studio")({
  head: () => ({
    meta: [
      { title: PITCH.metaTitle + " · Studio" },
      {
        name: "description",
        content: PITCH.metaDesc,
      },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <StudioShell>
      <JsonLd
        data={{
          "@type": "ProfessionalService",
          name: "Lepini Digital",
          description: PITCH.jsonld,
          email: DIGITAL_MAIL,
          areaServed: "Monti Lepini",
          url: "https://lepinidigital.com",
        }}
      />

      <section className="relative overflow-hidden">
        <Topo />
        <div className="relative mx-auto grid min-h-[88vh] max-w-6xl items-end gap-10 px-5 pb-16 pt-28 md:grid-cols-12 md:px-12 md:pb-24">
          <div className="md:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper">{PITCH.heroKicker}</p>
            <h1 className="mt-5 max-w-xl font-display text-[clamp(2.6rem,6.4vw,5.2rem)] font-semibold leading-[0.92] text-ink">
              {PITCH.heroTitle}
              <span className="mt-2 block font-medium italic text-copper">{PITCH.heroItalic}</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">{PITCH.heroLead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#contatti">
                <Button variant="ink">Parliamone</Button>
              </a>
              <a href="#lavori" className="text-sm text-ink-soft hover:text-ink">
                I lavori
              </a>
            </div>
          </div>
          <figure className="md:col-span-5">
            <img
              src="/images/digitale/studio-hero.jpg"
              alt="Studio contemporaneo: tavolo di quercia, calcare, crinale dei Lepini oltre il vetro"
              className="aspect-[4/5] w-full rounded-lg object-cover md:aspect-[4/5]"
            />
            <figcaption className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">
              Montelanico · luce del mattino
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-y border-ink/10">
        <div className="mx-auto grid max-w-6xl divide-ink/10 md:grid-cols-3 md:divide-x">
          {DIGITAL_STATS.map((s) => (
            <div key={s.l} className="px-5 py-8 md:px-12">
              <p className="font-display text-5xl leading-none text-ink">{s.k}</p>
              <p className="mt-3 max-w-[16rem] font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="lavori" className="mx-auto max-w-6xl px-5 py-20 md:px-12 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper">{PITCH.serviziKicker}</p>
        <h2 className="mt-3 max-w-xl font-display text-4xl text-ink md:text-5xl">{PITCH.serviziTitle}</h2>
        <ol className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
          {SERVIZI.map((s) => (
            <li key={s.code} className="grid gap-3 py-8 md:grid-cols-12 md:items-baseline">
              <p className="font-display text-3xl text-copper md:col-span-2">{s.code}</p>
              <h3 className="font-display text-2xl text-ink md:col-span-4">{s.titolo}</h3>
              <p className="max-w-md text-sm leading-relaxed text-ink-soft md:col-span-6">{s.testo}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-paper-card">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-12 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper">{PITCH.metodoKicker}</p>
          <h2 className="mt-3 font-display text-4xl text-ink">{PITCH.metodoTitle}</h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {METODO.map((m, i) => (
              <li key={m.titolo}>
                <p className="font-mono text-xs text-copper">0{i + 1}</p>
                <h3 className="mt-2 font-display text-xl text-ink">{m.titolo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{m.testo}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-12 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper">{PITCH.opereKicker}</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl text-ink">{PITCH.opereTitle}</h2>
        <p className="mt-4 max-w-xl text-ink-soft">{PITCH.opereLead}</p>
        <ProveGallery light />
      </section>

      <ContattiStudio />
    </StudioShell>
  );
}

function StudioShell({ children }: { children: ReactNode }) {
  return (
    <div className="studio-page relative min-h-screen">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Salta al contenuto
      </a>
      <StudioHeader />
      <div id="contenuto">{children}</div>
      <footer className="border-t border-ink/10 px-5 py-12 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="inline-flex items-center rounded-full bg-navy px-4 py-2">
            <BrandMark variant="digital" className="h-10 w-auto" />
          </div>
          <div className="text-sm text-ink-soft">
            <a href={`mailto:${DIGITAL_MAIL}`} className="font-mono text-copper">
              {DIGITAL_MAIL}
            </a>
            <p className="mt-2 max-w-sm">{PITCH.footer}</p>
            <Link to="/digitale" className="mt-3 inline-block text-sm text-ink hover:text-copper">
              Vista territorio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StudioHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-5 py-5 md:px-12">
      <Link to="/digitale/studio" className="inline-flex items-center rounded-full bg-navy px-3 py-1.5" aria-label="Lepini Digital">
        <BrandMark variant="digital" className="h-9 w-auto md:h-10" />
      </Link>
      <nav className="hidden items-center gap-7 text-sm tracking-wide text-ink-soft lg:flex" aria-label="Studio">
        <a href="#lavori" className="hover:text-ink">
          Lavori
        </a>
        <a href="#contatti" className="hover:text-ink">
          Contatti
        </a>
        <Link to="/" className="hover:text-ink">
          Portale
        </Link>
        <Link to="/lab" className="hover:text-ink">
          Lab
        </Link>
        <Link to="/digitale" className="rounded-full border border-ink/15 px-4 py-2 text-ink hover:border-copper hover:text-copper">
          Vista territorio
        </Link>
      </nav>
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink lg:hidden"
        aria-expanded={open}
        aria-controls="studio-nav"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
        <span className="sr-only">Menu</span>
      </button>
      {open ? (
        <div id="studio-nav" className="absolute inset-x-0 top-full border-b border-ink/10 bg-paper px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-1 text-ink" aria-label="Mobile studio">
            <a href="#lavori" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Lavori
            </a>
            <a href="#contatti" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Contatti
            </a>
            <Link to="/" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Portale
            </Link>
            <Link to="/lab" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Lab
            </Link>
            <Link to="/digitale" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Vista territorio
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function ContattiStudio() {
  const [nome, setNome] = useState("");
  const [azienda, setAzienda] = useState("");
  const [testo, setTesto] = useState("");
  const body = [nome && `Nome: ${nome}`, azienda && `Azienda: ${azienda}`, testo || "Ciao, vorrei ragionare su identità, mercati o passaggio generazionale."]
    .filter(Boolean)
    .join("\n\n");
  const href = `mailto:${DIGITAL_MAIL}?subject=${encodeURIComponent("Lepini Digital — un salto")}&body=${encodeURIComponent(body)}`;
  const field =
    "w-full border-0 border-b border-ink/20 bg-transparent py-3 text-ink placeholder:text-ink-soft/70 focus:border-copper focus:outline-none";

  return (
    <section id="contatti" className="border-t border-ink/10 bg-paper-card">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper">Contatti</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.08] text-ink md:text-5xl">{PITCH.contactTitle}</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">{PITCH.contactLead}</p>
        </div>
        <form
          className="md:col-span-7"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = href;
          }}
        >
          <div className="grid gap-8 sm:grid-cols-2">
            <p>
              <label htmlFor="s-nome" className="block text-sm text-ink-soft">
                Nome
              </label>
              <input id="s-nome" value={nome} onChange={(e) => setNome(e.target.value)} className={`${field} min-h-11`} placeholder="Come ti chiami" />
            </p>
            <p>
              <label htmlFor="s-az" className="block text-sm text-ink-soft">
                Azienda
              </label>
              <input
                id="s-az"
                value={azienda}
                onChange={(e) => setAzienda(e.target.value)}
                className={`${field} min-h-11`}
                placeholder="Frantoio, ferramenta, magazzino…"
              />
            </p>
          </div>
          <p className="mt-10">
            <label htmlFor="s-msg" className="block font-display text-2xl text-ink">
              Il salto
            </label>
            <textarea
              id="s-msg"
              rows={6}
              required
              value={testo}
              onChange={(e) => setTesto(e.target.value)}
              className={`${field} mt-3 resize-y text-lg leading-relaxed`}
              placeholder="Esempio: mio padre tiene i clienti in agenda. Vorrei un sito e un modo per vendere fuori provincia, senza perdere come lavoriamo."
            />
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button type="submit" variant="ink">
              Parliamone
            </Button>
            <a href={`mailto:${DIGITAL_MAIL}`} className="font-mono text-sm text-copper hover:text-ink">
              {DIGITAL_MAIL}
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}

function Topo() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-copper"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.35">
        <path d="M-20 520 C 180 480, 280 560, 420 500 S 680 430, 860 470 S 1100 540, 1220 500" />
        <path d="M-20 560 C 160 520, 300 600, 460 540 S 720 470, 900 510 S 1120 580, 1220 540" />
        <path d="M-20 600 C 140 560, 320 640, 500 580 S 760 510, 940 550 S 1140 620, 1220 580" />
        <path d="M-20 640 C 120 600, 340 680, 540 620 S 800 550, 980 590 S 1160 660, 1220 620" />
        <path d="M-20 440 C 200 400, 260 480, 400 420 S 640 360, 820 400 S 1080 470, 1220 430" />
        <path d="M-20 400 C 220 360, 240 440, 380 380 S 620 320, 800 360 S 1060 430, 1220 390" />
        <path d="M-20 480 C 190 440, 270 520, 410 460 S 660 400, 840 440 S 1090 510, 1220 470" />
      </g>
    </svg>
  );
}
