import { Link, createFileRoute } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { BrandMark } from "@/components/BrandMark";
import { JsonLd } from "@/components/JsonLd";
import { LepiniMesh } from "@/components/LepiniMesh";
import { ProveGallery } from "@/components/ProveGallery";
import { Button } from "@/components/ui/button";
import { DIGITAL_MAIL, METODO, PITCH, SERVIZI, CONTENUTI, CONTENUTI_INCLUSI, CONTENUTI_AMBITI, CONTENUTI_PROCESSO, VETRINA, digitalMeta } from "@/data/digitale";

export const Route = createFileRoute("/digitale/")({
  head: () => ({
    meta: digitalMeta(),
  }),
  component: StudioHome,
});

const ESEMPIO_ARTICOLI = [
  { cod: "VT-840", nome: "Vite T.E. 8×40", giac: 240, min: 80, prezzo: 0.12, q: 200 },
  { cod: "DF-115", nome: "Disco flex 115", giac: 18, min: 12, prezzo: 4.8, q: 10 },
  { cod: "TN-10", nome: "Tassello nylon 10", giac: 4, min: 40, prezzo: 0.08, q: 100 },
  { cod: "SM-25", nome: "Smalto ferromicaceo 2,5 L", giac: 6, min: 4, prezzo: 28.4, q: 2 },
] as const;

function euro(n: number) {
  return n.toLocaleString("it-IT", { style: "currency", currency: "EUR" });
}

function GestionaleEsempio() {
  const [vista, setVista] = useState<"giacenze" | "preventivo" | "ddt">("giacenze");
  const [qty, setQty] = useState<Record<string, number>>(() =>
    Object.fromEntries(ESEMPIO_ARTICOLI.map((a) => [a.cod, a.q])),
  );
  const sconto = 0.1;
  const imponibile = ESEMPIO_ARTICOLI.reduce((s, a) => s + a.prezzo * (qty[a.cod] ?? 0), 0);
  const netto = imponibile * (1 - sconto);
  const iva = netto * 0.22;
  const totale = netto + iva;

  return (
    <section id="gestionale" className="bg-paper px-5 pb-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-kicker text-copper">Esempio</p>
        <h2 className="mt-3 max-w-xl font-display text-4xl text-ink">Il gestionale, al banco.</h2>
        <p className="mt-3 max-w-xl text-sm text-ink-soft">
          Dati di prova, non di un cliente. Giacenze, preventivo e DDT escono dagli stessi articoli. Lo sconto e l'IVA li calcola il programma.
        </p>

        <div className="mt-8 overflow-x-auto border border-ink/15 bg-paper-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-4 py-3">
            <p className="font-mono text-xs text-ink-soft">Ferramenta esempio · banco</p>
            <div className="flex gap-1" role="tablist">
              {(
                [
                  ["giacenze", "Giacenze"],
                  ["preventivo", "Preventivo"],
                  ["ddt", "DDT"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={vista === id}
                  onClick={() => setVista(id)}
                  className={`min-h-11 px-3 text-sm ${vista === id ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {vista === "giacenze" ? (
            <table className="w-full text-left text-sm">
              <thead className="font-mono text-xs uppercase tracking-wide text-ink-soft">
                <tr>
                  <th className="px-4 py-3 font-normal">Codice</th>
                  <th className="px-4 py-3 font-normal">Articolo</th>
                  <th className="px-4 py-3 text-right font-normal">Giacenza</th>
                  <th className="px-4 py-3 text-right font-normal">Prezzo</th>
                </tr>
              </thead>
              <tbody>
                {ESEMPIO_ARTICOLI.map((a) => (
                  <tr key={a.cod} className="border-t border-ink/10">
                    <td className="px-4 py-3 font-mono text-xs text-copper">{a.cod}</td>
                    <td className="px-4 py-3 text-ink">{a.nome}</td>
                    <td className={`px-4 py-3 text-right ${a.giac < a.min ? "text-copper" : "text-ink"}`}>
                      {a.giac}
                      {a.giac < a.min ? " · sotto scorta" : ""}
                    </td>
                    <td className="px-4 py-3 text-right text-ink">{euro(a.prezzo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}

          {vista === "preventivo" ? (
            <div>
              <p className="border-b border-ink/10 px-4 py-3 text-sm text-ink-soft">
                Preventivo 42 · Impresa Rossi · sconto cliente 10%
              </p>
              <table className="w-full text-left text-sm">
                <thead className="font-mono text-xs uppercase tracking-wide text-ink-soft">
                  <tr>
                    <th className="px-4 py-3 font-normal">Articolo</th>
                    <th className="px-4 py-3 text-right font-normal">Qtà</th>
                    <th className="px-4 py-3 text-right font-normal">Riga</th>
                  </tr>
                </thead>
                <tbody>
                  {ESEMPIO_ARTICOLI.map((a) => (
                    <tr key={a.cod} className="border-t border-ink/10">
                      <td className="px-4 py-3 text-ink">{a.nome}</td>
                      <td className="px-4 py-3 text-right">
                        <input
                          type="number"
                          min={0}
                          inputMode="numeric"
                          aria-label={`Quantità ${a.nome}`}
                          value={qty[a.cod] ?? 0}
                          onChange={(e) =>
                            setQty((q) => ({ ...q, [a.cod]: Math.max(0, Number(e.target.value) || 0) }))
                          }
                          className="w-20 border border-ink/15 bg-paper px-2 py-2 text-right text-ink"
                        />
                      </td>
                      <td className="px-4 py-3 text-right text-ink">{euro(a.prezzo * (qty[a.cod] ?? 0))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <dl className="grid gap-1 border-t border-ink/10 px-4 py-4 text-sm sm:ml-auto sm:w-72">
                <div className="flex justify-between text-ink-soft">
                  <dt>Imponibile</dt>
                  <dd>{euro(imponibile)}</dd>
                </div>
                <div className="flex justify-between text-ink-soft">
                  <dt>Sconto 10%</dt>
                  <dd>− {euro(imponibile - netto)}</dd>
                </div>
                <div className="flex justify-between text-ink-soft">
                  <dt>IVA 22%</dt>
                  <dd>{euro(iva)}</dd>
                </div>
                <div className="mt-1 flex justify-between font-display text-xl text-ink">
                  <dt>Totale</dt>
                  <dd>{euro(totale)}</dd>
                </div>
              </dl>
            </div>
          ) : null}

          {vista === "ddt" ? (
            <div className="px-4 py-5 text-sm">
              <div className="flex flex-wrap justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-copper">DDT 184</p>
                  <p className="mt-1 text-ink">Causale: vendita</p>
                  <p className="text-ink-soft">Destinatario: Impresa Rossi, cantiere Sermoneta</p>
                </div>
                <p className="text-ink-soft">Stessi articoli del preventivo. Nessuna ricopiatura.</p>
              </div>
              <table className="mt-4 w-full text-left">
                <thead className="font-mono text-xs uppercase tracking-wide text-ink-soft">
                  <tr>
                    <th className="py-2 font-normal">Codice</th>
                    <th className="py-2 font-normal">Articolo</th>
                    <th className="py-2 text-right font-normal">Qtà</th>
                  </tr>
                </thead>
                <tbody>
                  {ESEMPIO_ARTICOLI.map((a) => (
                    <tr key={a.cod} className="border-t border-ink/10">
                      <td className="py-2 font-mono text-xs text-copper">{a.cod}</td>
                      <td className="py-2 text-ink">{a.nome}</td>
                      <td className="py-2 text-right text-ink">{qty[a.cod] ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function VetrinaRuota() {
  const rootRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const capRef = useRef<HTMLParagraphElement>(null);
  const countRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const pos = useRef(0);
  const n = VETRINA.length;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;

    const paint = () => {
      if (!reduce) {
        const travel = root.offsetHeight - window.innerHeight;
        const top = root.getBoundingClientRect().top;
        const raw = travel <= 0 ? 0 : Math.min(1, Math.max(0, -top / travel));
        const t = Math.min(1, raw / 0.9);
        pos.current = t * (n - 1);
        if (barRef.current) barRef.current.style.transform = `scaleX(${t})`;
      }
      const p = pos.current;
      let nearest = 0;
      let best = Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        let o = i - p;
        o = ((o % n) + n) % n;
        if (o > n / 2) o -= n;
        if (Math.abs(o) < best) {
          best = Math.abs(o);
          nearest = i;
        }
        const rot = Math.max(-68, Math.min(68, -o * 36));
        const tx = o * 250;
        const tz = -Math.abs(o) * 150;
        const sc = Math.max(0.72, 1 - Math.abs(o) * 0.1);
        el.style.transform = `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${rot}deg) scale(${sc})`;
        el.style.zIndex = String(80 - Math.round(Math.abs(o) * 8));
        el.style.opacity = Math.abs(o) > 3.4 ? "0" : "1";
      });
      if (capRef.current) capRef.current.textContent = VETRINA[nearest].cap;
      if (countRef.current) countRef.current.textContent = `${String(nearest + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
    };

    const loop = () => {
      paint();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [n]);

  const scrollToIndex = (index: number) => {
    const root = rootRef.current;
    if (!root) return;
    const i = Math.min(n - 1, Math.max(0, index));
    const travel = root.offsetHeight - window.innerHeight;
    const y = root.getBoundingClientRect().top + window.scrollY + (i / (n - 1)) * 0.9 * travel;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section id="vetrina" ref={rootRef} className="relative h-[360vh] bg-paper">
      <div className="sticky top-0 z-10 flex h-svh flex-col justify-center overflow-hidden bg-paper px-5 pt-20 md:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-kicker text-copper">Cosa si consegna</p>
          <h2 className="mt-2 max-w-xl font-display text-4xl text-ink">Dal furgone alla mail.</h2>
          <p className="mt-2 max-w-xl text-sm text-ink-soft">La pagina va avanti solo quando le schede sono finite.</p>
          <div className="relative mt-4 h-[min(46vh,420px)] overflow-hidden" style={{ perspective: "1400px" }}>
            <div className="absolute inset-0" style={{ transform: "rotateX(10deg)", transformStyle: "preserve-3d" }}>
              {VETRINA.map((f, i) => (
                <button
                  key={f.cap}
                  type="button"
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="absolute left-1/2 top-1/2 w-[280px] overflow-hidden border border-ink/10 bg-paper-card text-left shadow-[0_24px_50px_rgba(40,28,16,0.18)]"
                  style={{ transformStyle: "preserve-3d" }}
                  onClick={() => {
                    const cur = Math.round(pos.current);
                    if (cur === i && "href" in f && f.href) {
                      window.location.hash = f.href;
                      return;
                    }
                    scrollToIndex(i);
                  }}
                >
                  <img src={f.src} alt={f.alt} draggable={false} className="aspect-[6/5] w-full object-cover" />
                  <span className="block px-3 py-2 font-mono text-[10px] uppercase tracking-kicker text-copper">{f.cap}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-2 flex items-end justify-between gap-4">
            <div>
              <p ref={countRef} className="font-mono text-xs text-copper">
                01 / {String(n).padStart(2, "0")}
              </p>
              <p ref={capRef} className="font-display text-2xl text-ink">
                {VETRINA[0].cap}
              </p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="min-h-11 border border-ink/15 px-4 text-sm text-ink" onClick={() => scrollToIndex(Math.round(pos.current) - 1)}>
                Indietro
              </button>
              <button type="button" className="min-h-11 border border-ink/15 px-4 text-sm text-ink" onClick={() => scrollToIndex(Math.round(pos.current) + 1)}>
                Avanti
              </button>
            </div>
          </div>
          <div className="mt-4 h-px bg-ink/10">
            <span ref={barRef} className="block h-px origin-left bg-copper" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

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

      <VetrinaRuota />

      <GestionaleEsempio />

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
