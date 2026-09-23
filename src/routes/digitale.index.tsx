import { Link, createFileRoute } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { BrandMark } from "@/components/BrandMark";
import { JsonLd } from "@/components/JsonLd";
import { LepiniMesh } from "@/components/LepiniMesh";
import { ProveGallery } from "@/components/ProveGallery";
import { Button } from "@/components/ui/button";
import { DIGITAL_MAIL, METODO, PITCH, SERVIZI, CONTENUTI, CONTENUTI_INCLUSI, CONTENUTI_AMBITI, CONTENUTI_PROCESSO, digitalMeta } from "@/data/digitale";

export const Route = createFileRoute("/digitale/")({
  head: () => ({
    meta: digitalMeta(),
  }),
  component: StudioHome,
});

function StudioHome() {
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
            Foto del prodotto, marchio, clip brevi. File pronti per sito, social e catalogo. Il gestionale, se vi serve, viene dopo: al banco, con i vostri numeri.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#contatti">
              <Button variant="primary">Parliamone</Button>
            </a>
            <a href="#lavori" className="inline-flex min-h-11 items-center text-sm text-ink-soft hover:text-ink">
              Cosa facciamo
            </a>
          </div>
        </div>
      </section>

      <section className="bg-paper px-5 pb-16 md:px-12 md:pb-24">
        <ul className="mx-auto grid max-w-6xl gap-3 md:grid-cols-3">
          {[
            { src: "/images/digitale/studio-set.jpg", alt: "Set fotografico chiaro, luce di studio", cap: "Set" },
            { src: "/images/digitale/studio-prodotto.jpg", alt: "Prodotto su fondo neutro", cap: "Prodotto" },
            { src: "/images/digitale/studio-schermo.jpg", alt: "Bozza di catalogo su un tavolo chiaro", cap: "Catalogo" },
          ].map((f) => (
            <li key={f.cap} className="overflow-hidden bg-paper-card">
              <img src={f.src} alt={f.alt} className="aspect-[3/2] w-full object-cover" />
              <p className="px-4 py-3 font-mono text-xs uppercase tracking-kicker text-copper">{f.cap}</p>
            </li>
          ))}
        </ul>
      </section>

      <LogoParallax />

      <section className="border-y border-ink/10">
        <div className="mx-auto grid max-w-6xl md:grid-cols-3">
          {[
            { k: "Immagini", l: "Prodotto, marchio, catalogo. File pronti." },
            { k: "Video", l: "Clip brevi per scheda, social e vetrina." },
            { k: "Strumenti", l: "Gestionale solo se serve al banco." },
          ].map((s) => (
            <div key={s.l} className="border-b border-ink/10 px-5 py-8 last:border-b-0 md:border-b-0 md:border-r md:border-ink/10 md:px-12 md:last:border-r-0">
              <p className="font-display text-3xl leading-tight text-ink md:text-4xl">{s.k}</p>
              <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-ink-soft">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="lavori" className="mx-auto max-w-6xl px-5 py-20 md:px-12 md:py-28">
        <p className="font-mono text-xs uppercase tracking-kicker text-copper">{CONTENUTI.kicker}</p>
        <h2 className="mt-3 max-w-xl font-display text-4xl text-ink md:text-5xl">{CONTENUTI.title}</h2>
        <p className="mt-4 max-w-xl text-ink-soft">{CONTENUTI.lead}</p>
        <ol className="mt-14 border-t border-ink/10">
          {CONTENUTI_INCLUSI.map((s) => (
            <li key={s.code} className="grid gap-3 border-b border-ink/10 py-9 md:grid-cols-12 md:items-baseline">
              <p className="font-display text-3xl text-copper md:col-span-2">{s.code}</p>
              <h3 className="font-display text-2xl text-ink md:col-span-4">{s.titolo}</h3>
              <p className="max-w-md text-sm leading-relaxed text-ink-soft md:col-span-6">{s.testo}</p>
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

      <section id="strumenti" className="mx-auto max-w-6xl px-5 py-20 md:px-12 md:py-28">
        <p className="font-mono text-xs uppercase tracking-kicker text-copper">{PITCH.serviziKicker}</p>
        <h2 className="mt-3 max-w-xl font-display text-4xl text-ink md:text-5xl">{PITCH.serviziTitle}</h2>
        <p className="mt-4 max-w-xl text-ink-soft">{PITCH.serviziLead}</p>
        <ol className="mt-14 border-t border-ink/10">
          {SERVIZI.map((s) => (
            <li key={s.code} className="grid gap-3 border-b border-ink/10 py-9 md:grid-cols-12 md:items-baseline">
              <p className="font-display text-3xl text-copper md:col-span-2">{s.code}</p>
              <h3 className="font-display text-2xl text-ink md:col-span-4">{s.titolo}</h3>
              <p className="max-w-md text-sm leading-relaxed text-ink-soft md:col-span-6">{s.testo}</p>
            </li>
          ))}
        </ol>
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
          </div>
        </div>
      </footer>
    </div>
  );
}

function StudioHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-12">
        <Link to="/digitale" className="flex items-center" aria-label="Lepini Digital">
          <BrandMark variant="digitalMark" className="h-11 w-auto md:h-12" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm tracking-wide text-ink-soft lg:flex" aria-label="Studio">
          <a href="#lavori" className="hover:text-ink">
            Contenuti
          </a>
          <a href="#metodo" className="hover:text-ink">
            Metodo
          </a>
          <a href="#contatti" className="hover:text-ink">
            Contatti
          </a>
          <Link to="/portale" className="hover:text-ink">
            Portale
          </Link>
          <Link to="/lab" className="hover:text-ink">
            Lab
          </Link>
          <a href="#contatti">
            <Button variant="ink" size="sm">
              Parliamone
            </Button>
          </a>
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
      </div>
      {open ? (
        <div id="studio-nav" className="border-t border-ink/10 bg-paper px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-1 text-ink" aria-label="Mobile studio">
            <a href="#lavori" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Contenuti
            </a>
            <a href="#metodo" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Metodo
            </a>
            <a href="#contatti" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Contatti
            </a>
            <Link to="/portale" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Portale
            </Link>
            <Link to="/lab" className="min-h-11 px-2 py-2 text-lg" onClick={() => setOpen(false)}>
              Lab
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
              Parliamone
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

function LogoParallax() {
  const scene = useRef<HTMLElement>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    const el = scene.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(1);
      return;
    }
    let raf = 0;
    const tick = () => {
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      const travel = Math.max(1, el.offsetHeight - vh);
      setT(Math.max(0, Math.min(1, -r.top / travel)));
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

  const draw = Math.min(1, t / 0.58);
  const lock = Math.max(0, Math.min(1, (t - 0.68) / 0.18));
  const meshFade = 1 - lock;
  const scale = 1.05 - t * 0.05;

  return (
    <section ref={scene} className="parallax-scene relative h-[220vh] md:h-[240vh] bg-paper">
      <div className="parallax-pin sticky top-0 flex h-svh items-center justify-center overflow-hidden bg-paper">
        <div className="relative w-full max-w-2xl px-6" style={{ transform: `scale(${scale})` }}>
          <div className="relative aspect-[954/468] w-full">
            <div className="absolute inset-x-[6%] top-[2%] h-[56%]" style={{ opacity: meshFade }}>
              <LepiniMesh progress={draw} className="h-full w-full" />
            </div>
            <img
              src="/images/brand/lepini-digital-official.png"
              alt="Lepini Digital"
              className="brand-mark absolute inset-0 h-full w-full object-contain"
              style={{ opacity: lock }}
            />
          </div>
        </div>
        <p className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
          Scorri
        </p>
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
