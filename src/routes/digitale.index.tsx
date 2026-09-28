import { Link, createFileRoute } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { BrandMark } from "@/components/BrandMark";
import { JsonLd } from "@/components/JsonLd";
import { LangToggle, translate, useI18n, useT } from "@/lib/i18n";
import { ProveGallery } from "@/components/ProveGallery";
import { Button } from "@/components/ui/button";
import { DIGITAL_MAIL, METODO, PITCH, SERVIZI, CONTENUTI, CONTENUTI_INCLUSI, CONTENUTI_AMBITI, CONTENUTI_PROCESSO, VETRINA, digitalMeta } from "@/data/digitale";
import { LAVORI } from "@/data/lavori";

export const Route = createFileRoute("/digitale/")({
  head: () => ({
    meta: digitalMeta(),
  }),
  component: StudioHome,
});

function VetrinaRuota() {
  const { lang } = useI18n();

  return (
    <section id="vetrina" className="bg-paper py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-12">
        <p className="font-mono text-xs uppercase tracking-kicker text-copper">{translate(lang, "Cosa si consegna")}</p>
        <h2 className="mt-2 max-w-xl font-display text-4xl text-ink">{translate(lang, "Dal furgone alla mail.")}</h2>
        <p className="mt-3 max-w-xl text-sm text-ink-soft">
          {translate(lang, "Le schede restano in pagina. Si scorrono di lato.")}
        </p>
      </div>
      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:px-12">
        {VETRINA.map((f) => {
          const card = (
            <>
              <img src={f.src} alt={f.alt} draggable={false} className="aspect-[6/5] w-full object-cover" />
              <span className="block px-3 py-3 font-mono text-[10px] uppercase tracking-kicker text-copper">
                {translate(lang, f.cap)}
              </span>
            </>
          );
          const className =
            "w-[min(78vw,280px)] shrink-0 snap-start overflow-hidden border border-ink/10 bg-paper-card text-left shadow-[0_16px_40px_rgba(40,28,16,0.12)]";
          if ("href" in f && f.href) {
            return (
              <a key={f.cap} href={f.href} className={className}>
                {card}
              </a>
            );
          }
          return (
            <article key={f.cap} className={className}>
              {card}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function StudioHome() {
  const tr = useT();
  const [toy, setToy] = useState(false);
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

      <section className="bg-paper px-5 pb-8 pt-28 md:px-12 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-kicker text-copper">{PITCH.heroKicker}</p>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.8rem,6.4vw,5.2rem)] font-semibold leading-[0.92] text-ink">
            Lo studio per chi vende.
            <span className="mt-3 block font-medium italic text-copper">Immagini, video, strumenti.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {tr("Foto del prodotto, marchio, clip brevi. File pronti per sito, social e catalogo.")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#contatti">
              <Button variant="primary">{tr("Parliamone")}</Button>
            </a>
            <a href="#strumenti" className="inline-flex min-h-11 items-center text-sm text-ink-soft hover:text-ink">
              {tr("Cosa facciamo")}
            </a>
          </div>
        </div>
      </section>

      <section className="relative h-[78svh] max-h-[720px] min-h-[420px] overflow-hidden">
        <img
          src="/images/digitale/crinale.jpg"
          alt="Borgo dei Monti Lepini sul crinale, all'alba"
          className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-ink/15" />
        <p className="absolute bottom-8 left-5 right-5 max-w-xl font-display text-3xl font-medium italic leading-tight text-cream md:bottom-12 md:left-12 md:text-4xl">
          {tr("Il lavoro è già qui.")}
        </p>
      </section>

      <section id="strumenti" className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 pb-4 pt-16 md:px-12 md:pt-20">
          <p className="font-mono text-xs uppercase tracking-kicker text-copper">{tr(PITCH.serviziKicker)}</p>
          <h2 className="mt-3 max-w-xl font-display text-4xl text-ink md:text-5xl">{tr(PITCH.serviziTitle)}</h2>
          <p className="mt-4 max-w-xl text-ink-soft">{tr(PITCH.serviziLead)}</p>
        </div>
        <ol>
          {SERVIZI.map((s, i) => (
            <li key={s.code} className="grid border-t border-ink/10 md:grid-cols-2">
              <img src={s.foto} alt="" className={`aspect-[16/10] h-full w-full object-cover ${i % 2 === 1 ? "md:order-2" : ""}`} />
              <div className="flex flex-col justify-center px-5 py-10 md:px-14 md:py-16">
                <p className="font-display text-3xl text-copper">{s.code}</p>
                <h3 className="mt-3 font-display text-3xl text-ink md:text-4xl">{tr(s.titolo)}</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">{tr(s.testo)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="portfolio" className="mx-auto max-w-6xl px-5 py-20 md:px-12 md:py-28">
        <p className="font-mono text-xs uppercase tracking-kicker text-copper">{tr("Lavori")}</p>
        <h2 className="mt-3 max-w-xl font-display text-4xl text-ink md:text-5xl">{tr("Consegnati, online.")}</h2>
        <p className="mt-4 max-w-xl text-ink-soft">
          {tr("Un elenco. Il prossimo cliente entra qui, con la sua scheda.")}
        </p>
        <ul className="mt-12 grid gap-8">
          {LAVORI.map((l) => (
            <li key={l.slug}>
              <Link
                to="/digitale/lavori/$slug"
                params={{ slug: l.slug }}
                className="grid overflow-hidden border border-ink/10 bg-paper-card md:grid-cols-2"
              >
                <img src={l.copertina} alt="" className="aspect-[16/10] h-full w-full object-cover object-left" />
                <div className="flex flex-col justify-center p-6 md:p-10">
                  <p className="font-mono text-xs uppercase tracking-kicker text-copper">
                    {l.settore} · {l.luogo}
                  </p>
                  <h3 className="mt-2 font-display text-4xl text-ink">{l.cliente}</h3>
                  <p className="mt-3 max-w-md text-ink-soft">{l.lead}</p>
                  <p className="mt-5 text-sm text-copper">{tr("Apri la scheda")}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <VetrinaRuota />

      <section id="lavori" className="mx-auto max-w-6xl px-5 py-20 md:px-12 md:py-28">
        <p className="font-mono text-xs uppercase tracking-kicker text-copper">{CONTENUTI.kicker}</p>
        <h2 className="mt-3 max-w-xl font-display text-4xl text-ink md:text-5xl">{CONTENUTI.title}</h2>
        <p className="mt-4 max-w-xl text-ink-soft">{CONTENUTI.lead}</p>
        <ol className="mt-14">
          {CONTENUTI_INCLUSI.map((s) => (
            <li key={s.code} className="grid items-center gap-6 border-t border-ink/10 py-8 md:grid-cols-12">
              <p className="font-display text-3xl text-copper md:col-span-1">{s.code}</p>
              <img src={s.foto} alt="" className="aspect-[16/10] w-full object-cover md:col-span-4" />
              <div className="md:col-span-7">
                <h3 className="font-display text-2xl text-ink">{tr(s.titolo)}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">{tr(s.testo)}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-xl text-sm text-ink-soft">
          Non inventiamo il prodotto. Se deve vedersi com'è, resta la foto vera.
        </p>

        <h3 className="mt-16 font-display text-2xl text-ink">Dove finiscono</h3>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CONTENUTI_AMBITI.map((a) => (
            <li key={a.titolo} className="border-t border-ink/15 pt-4">
              <h4 className="font-display text-xl text-ink">{a.titolo}</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{a.testo}</p>
            </li>
          ))}
        </ul>
        <a href="#contatti" className="mt-10 inline-flex min-h-11 items-center text-sm text-copper hover:text-ink">
          Parliamone
        </a>
      </section>

      <section className="bg-paper-card">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-12 md:py-24">
          <p className="font-mono text-xs uppercase tracking-kicker text-copper">Come si fa</p>
          <h2 className="mt-3 font-display text-4xl text-ink">Quattro passaggi, poi i file</h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {CONTENUTI_PROCESSO.map((m, i) => (
              <li key={m.titolo} className="border-t-2 border-copper pt-5">
                <p className="font-mono text-xs text-copper">0{i + 1}</p>
                <h3 className="mt-2 font-display text-xl text-ink">{m.titolo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{m.testo}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="metodo" className="bg-paper-card">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-12 md:py-24">
          <p className="font-mono text-xs uppercase tracking-kicker text-copper">{PITCH.metodoKicker}</p>
          <h2 className="mt-3 font-display text-4xl text-ink">{PITCH.metodoTitle}</h2>
          <p className="mt-3 max-w-xl text-ink-soft">{PITCH.metodoLead}</p>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {METODO.map((m, i) => (
              <li key={m.titolo} className="border-t-2 border-copper pt-5">
                <p className="font-mono text-xs text-copper">0{i + 1}</p>
                <h3 className="mt-2 font-display text-xl text-ink">{m.titolo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{m.testo}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="opere" className="mx-auto max-w-6xl px-5 py-20 md:px-12 md:py-28">
        <p className="font-mono text-xs uppercase tracking-kicker text-copper">{PITCH.opereKicker}</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl text-ink">{PITCH.opereTitle}</h2>
        <p className="mt-4 max-w-xl text-ink-soft">{PITCH.opereLead}</p>
        <ProveGallery light />
      </section>

      <ContattiStudio />
      <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3">
        {toy ? (
          <div className="w-60 rounded-2xl border border-ink/10 bg-paper p-4 shadow-[0_12px_40px_rgba(20,16,12,0.18)]">
            <p className="font-display text-xl leading-none">Mattoncini</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {tr("Un gioco fatto qui. Si salta, si cercano i tesori.")}
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
          className="size-14 overflow-hidden rounded-full border-2 border-white shadow-[0_8px_24px_rgba(20,16,12,0.22)]"
        >
          <img src="/images/lab/mattoncini-icon.jpg" alt="" className="size-full object-cover" />
        </button>
      </div>
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
          <div>
            <BrandMark variant="digital" className="h-16 w-auto md:h-20" />
          </div>
          <div className="text-sm text-ink-soft">
            <a href={`mailto:${DIGITAL_MAIL}`} className="font-mono text-copper">
              {DIGITAL_MAIL}
            </a>
            <p className="mt-2 max-w-sm">{PITCH.footer}</p>
            <Link to="/digitale/territorio" className="mt-3 inline-block text-ink hover:text-copper">
              Vista scura
            </Link>
            <Link to="/digitale/area" className="mt-2 block text-ink hover:text-copper">
              Area
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StudioHeader() {
  const [open, setOpen] = useState(false);
  const tr = useT();
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-12">
        <Link to="/digitale" className="flex items-center" aria-label="Lepini Digital">
          <BrandMark variant="digitalMark" className="h-11 w-auto md:h-12" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm tracking-wide text-ink-soft lg:flex" aria-label="Studio">
          <a href="#portfolio" className="hover:text-ink">
            {tr("Lavori")}
          </a>
          <a href="#lavori" className="hover:text-ink">
            {tr("Contenuti")}
          </a>
          <a href="#metodo" className="hover:text-ink">
            {tr("Metodo")}
          </a>
          <a href="#contatti" className="hover:text-ink">
            {tr("Contatti")}
          </a>
          <Link to="/portale" className="hover:text-ink">
            {tr("Portale")}
          </Link>
          <Link to="/lab" className="hover:text-ink">
            Lab
          </Link>
          <Link to="/digitale/genitori" className="hover:text-ink">
            {tr("Genitori")}
          </Link>
          <a href="#contatti">
            <Button variant="ink" size="sm">
              {tr("Parliamone")}
            </Button>
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <LangToggle tone="dark" />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="studio-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{tr("Menu")}</span>
          </button>
        </div>
      </div>
      {open ? (
        <div id="studio-nav" className="border-t border-ink/10 bg-paper px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-1 text-ink" aria-label="Mobile studio">
            <a href="#portfolio" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              {tr("Lavori")}
            </a>
            <a href="#lavori" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              {tr("Contenuti")}
            </a>
            <a href="#metodo" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              {tr("Metodo")}
            </a>
            <a href="#contatti" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              {tr("Contatti")}
            </a>
            <Link to="/portale" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              {tr("Portale")}
            </Link>
            <Link to="/lab" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Lab
            </Link>
            <Link to="/digitale/genitori" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              {tr("Genitori")}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function ContattiStudio() {
  const tr = useT();
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
    <section id="contatti" className="border-t-[3px] border-copper bg-paper-card">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5">
          <p className="font-mono text-xs uppercase tracking-kicker text-copper">Contatti</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.08] text-ink md:text-5xl">{PITCH.contactTitle}</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">{PITCH.contactLead}</p>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">{PITCH.contactHint}</p>
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
              <input
                id="s-nome"
                name="nome"
                autoComplete="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={`${field} min-h-11`}
                placeholder="Come ti chiami"
              />
            </p>
            <p>
              <label htmlFor="s-az" className="block text-sm text-ink-soft">
                Azienda
              </label>
              <input
                id="s-az"
                name="azienda"
                autoComplete="organization"
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
            <span className="mt-1 block text-sm text-ink-soft">Identità, mercati, passaggio, o un processo che vi frena.</span>
            <textarea
              id="s-msg"
              name="messaggio"
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
              {tr("Parliamone")}
            </Button>
            <a href={`mailto:${DIGITAL_MAIL}`} className="font-mono text-sm text-copper hover:text-ink">
              {DIGITAL_MAIL}
            </a>
          </div>
          <p className="mt-4 text-sm text-ink-soft">Si apre la tua posta. Niente iscrizione.</p>
        </form>
      </div>
    </section>
  );
}

function ParallaxStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [rail, setRail] = useState(true);
  const n = Children.count(children);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.dataset.reduce = "1";
      return;
    }

    const scenes = [...root.querySelectorAll<HTMLElement>("[data-scene]")];
    let raf = 0;

    const tick = () => {
      const vh = window.innerHeight;
      let best = 0;
      let bestVis = -1;
      scenes.forEach((scene, i) => {
        const r = scene.getBoundingClientRect();
        const travel = Math.max(1, scene.offsetHeight - vh);
        const t = Math.max(0, Math.min(1, -r.top / travel));
        const photo = scene.querySelector<HTMLElement>("[data-layer=photo]");
        const copy = scene.querySelector<HTMLElement>("[data-layer=copy]");
        const veil = scene.querySelector<HTMLElement>("[data-layer=veil]");
        if (photo) {
          const y = (t - 0.5) * 18;
          const s = 1.18 - t * 0.12;
          photo.style.transform = `translate3d(0, ${y}%, 0) scale(${s})`;
        }
        if (copy) {
          let o = 1;
          if (i === 0) {
            if (t > 0.9) o = (1 - t) / 0.1;
          } else {
            if (t < 0.08) o = t / 0.08;
            else if (t > 0.9) o = (1 - t) / 0.1;
          }
          o = Math.max(0, Math.min(1, o));
          copy.style.opacity = String(o);
          copy.style.transform = `translate3d(0, ${(1 - o) * 28}px, 0)`;
        }
        if (veil) {
          veil.style.opacity = String(0.72 + t * 0.22);
        }
        const vis = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
        if (vis > bestVis) {
          bestVis = vis;
          best = i;
        }
      });
      setActive(best);
      const stack = root.getBoundingClientRect();
      setRail(stack.top < vh * 0.55 && stack.bottom > vh * 0.4);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="parallax-stack">
      {children}
      <ol
        className={`pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2.5 md:flex ${rail ? "opacity-100" : "opacity-0"}`}
        aria-label="Capitoli"
      >
        {Array.from({ length: n }, (_, i) => (
          <li
            key={i}
            className={`h-8 w-px ${i === active ? "bg-copper" : "bg-cream/35"}`}
            aria-current={i === active ? "true" : undefined}
          />
        ))}
      </ol>
    </div>
  );
}

function ParallaxPanel({
  src,
  alt,
  cap,
  children,
}: {
  src: string;
  alt: string;
  cap: string;
  children: ReactNode;
}) {
  return (
    <section data-scene className="parallax-scene relative h-[158vh] md:h-[178vh]">
      <div className="parallax-pin sticky top-0 h-svh overflow-hidden">
        <img
          data-layer="photo"
          src={src}
          alt={alt}
          className="parallax-photo pointer-events-none absolute left-0 top-0 h-full w-full object-cover"
        />
        <div
          data-layer="veil"
          className="parallax-veil pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30"
        />
        <div
          data-layer="copy"
          className="parallax-copy relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-12 md:pb-24"
        >
          {children}
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.16em] text-cream/55">{cap}</p>
        </div>
      </div>
    </section>
  );
}
