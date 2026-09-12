import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { JsonLd } from "@/components/JsonLd";
import { DigitalShell } from "@/components/layout/DigitalShell";
import { Eyebrow, SectionHead } from "@/components/SectionHead";
import { Button } from "@/components/ui/button";
import { DIGITAL_MAIL, DIGITAL_STATS, FOTO, METODO, PRODOTTO, SERVIZI } from "@/data/digitale";

export const Route = createFileRoute("/digitale")({
  head: () => ({
    meta: [
      { title: "Lepini Digital — Servizi digitali per imprese" },
      {
        name: "description",
        content:
          "Lepini Digital fa strumenti per le PMI dei Monti Lepini: gestionali, automazione, siti. Il Portale e il Lab sono l'esempio pubblico.",
      },
    ],
  }),
  component: DigitalePage,
});

function DigitalePage() {
  return (
    <DigitalShell>
      <JsonLd
        data={{
          "@type": "ProfessionalService",
          name: "Lepini Digital",
          description:
            "Lepini Digital fa strumenti per le piccole e medie imprese dei Monti Lepini: gestionali, automazione, siti. Ha costruito il Portale Monti Lepini e Lepini Lab come esempio pubblico.",
          email: DIGITAL_MAIL,
          areaServed: "Monti Lepini",
          url: "https://lepinidigital.com",
        }}
      />

      <section className="relative min-h-[88vh] overflow-hidden border-b-[3px] border-copper">
        <img
          src="/images/hero-ridge.jpg"
          alt="Crinale dei Monti Lepini al crepuscolo"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />
        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-14 pt-28 md:px-12 md:pb-20">
          <Eyebrow>Lepini Digital · Montelanico (RM)</Eyebrow>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.8rem,7.5vw,5.6rem)] font-semibold leading-[0.92] text-cream">
            Strumenti digitali
            <span className="mt-3 block font-medium italic text-olive-light">per chi lavora davvero.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream-soft">
            Facciamo gestionali, automazione e siti per le piccole e medie imprese dei Monti Lepini. Cose che servono
            in magazzino e in ufficio — non una vetrina da chiudere dopo tre mesi.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#contatti">
              <Button>Parliamone</Button>
            </a>
            <a href="#servizi" className="text-sm text-olive-light hover:text-cream">
              Cosa facciamo
            </a>
            <a href="#prodotto" className="text-sm text-muted hover:text-cream">
              Olio, attrezzi, documenti
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-cream/10">
        <div className="mx-auto grid max-w-6xl divide-cream/10 md:grid-cols-3 md:divide-x">
          {DIGITAL_STATS.map((s) => (
            <div key={s.l} className="px-5 py-8 md:px-12">
              <p className="font-display text-5xl leading-none text-cream md:text-6xl">{s.k}</p>
              <p className="mt-3 max-w-[16rem] font-mono text-xs uppercase tracking-[0.16em] text-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-12 md:py-20">
        <blockquote className="max-w-4xl font-display text-3xl leading-snug text-cream md:text-[2.6rem] md:leading-[1.15]">
          Un frantoio, una ferramenta, un magazzino: strumenti che usano davvero. Non una vetrina da abbandonare dopo
          tre mesi.
        </blockquote>
        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {FOTO.map((f) => (
            <figure key={f.src} className="overflow-hidden rounded-xl bg-navy-card">
              <img src={f.src} alt={f.alt} className="aspect-[3/2] w-full object-cover" />
              <figcaption className="px-4 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                {f.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="prodotto" className="border-y border-cream/10 bg-navy-deep">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-12 md:px-12">
          <div className="md:sticky md:top-28 md:col-span-4 md:self-start">
            <SectionHead
              kicker="Fotografia di prodotto"
              title="Olio, attrezzi, documenti"
              lead="È questo che lo strumento deve reggere. Non vendiamo le foto: mostriamo il lavoro."
            />
          </div>
          <div className="md:col-span-8">
            <figure className="overflow-hidden rounded-xl">
              <img
                src="/images/digitale/prodotto-hero.jpg"
                alt="Bottiglia d'olio e ciotola di olive su calcare, crinale dei Lepini sullo sfondo"
                className="aspect-[16/9] w-full object-cover"
              />
              <figcaption className="px-1 py-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                Olio · crinale
              </figcaption>
            </figure>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {PRODOTTO.map((p) => (
                <figure key={p.src} className="overflow-hidden rounded-xl bg-navy-card">
                  <img src={p.src} alt={p.alt} className="aspect-[4/3] w-full object-cover" />
                  <figcaption className="p-4">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-copper-light">{p.caption}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.nota}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="servizi" className="mx-auto max-w-6xl px-5 py-20 md:px-12">
        <SectionHead
          kicker="Cosa facciamo"
          title="Quattro lavori"
          lead="Niente licenze care, niente sistemi più grandi dell'azienda. Solo quello che il team userà."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-cream/10 md:grid-cols-2">
          {SERVIZI.map((s) => (
            <article key={s.code} className="bg-navy-card">
              <img src={s.foto} alt={s.fotoAlt} className="aspect-[16/8] w-full object-cover" />
              <div className="p-6 md:p-8">
                <p className="font-display text-4xl leading-none text-copper-light">{s.code}</p>
                <h3 className="mt-3 font-display text-2xl md:text-3xl">{s.titolo}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-cream-soft">{s.testo}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="metodo" className="border-y border-cream/10 bg-navy-deep">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-12">
          <SectionHead
            kicker="Come lavoriamo"
            title="Prima il lavoro, poi il codice"
            lead="Partiamo dal bancone, dal magazzino, dall'ufficio. Non da un modello già pronto."
          />
          <ol className="mt-14 grid gap-10 md:grid-cols-4">
            {METODO.map((m, i) => (
              <li key={m.titolo} className="border-t border-copper/40 pt-5">
                <p className="font-mono text-xs text-olive-light">0{i + 1}</p>
                <h3 className="mt-2 font-display text-xl md:text-2xl">{m.titolo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.testo}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img
          src="/images/digitale/bottega.jpg"
          alt="Banco di ferramenta e falegnameria: attrezzi, vice, legno d'ulivo"
          className="max-h-[48vh] min-h-[240px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent" />
        <p className="absolute bottom-8 left-5 max-w-md font-display text-2xl italic text-cream md:left-12 md:text-3xl">
          Dal bancone, dal magazzino, dall'ufficio.
        </p>
      </section>

      <section id="opere" className="bg-navy">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-12 md:px-12">
          <div className="md:col-span-5">
            <SectionHead
              kicker="Cosa abbiamo costruito"
              title="Il Portale e il Lab sono l'esempio"
              lead="Li abbiamo fatti noi. Servono a mostrare, in pubblico, cosa si può fare per un'impresa."
            />
            <p className="mt-6 max-w-md text-sm text-muted">
              Il Portale racconta i 26 comuni. Il Lab li mette in 3D. Lo studio lavora per le PMI.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:col-span-7">
            <Link
              to="/"
              className="rounded-xl bg-navy-card p-8 shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
            >
              <Eyebrow>Opera pubblica</Eyebrow>
              <h3 className="mt-3 font-display text-3xl">Portale Monti Lepini</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-cream-soft">
                Le schede dei 26 comuni. Lo stesso tipo di sito che faremmo per la tua azienda.
              </p>
            </Link>
            <Link
              to="/lab"
              className="rounded-xl px-8 py-6 hover:bg-navy-card"
            >
              <Eyebrow>Laboratorio</Eyebrow>
              <h3 className="mt-2 font-display text-2xl">Lepini Lab</h3>
              <p className="mt-2 max-w-md text-sm text-muted">
                Atlante, volo, faggeta, biosfera, sentieri. Per vedere, non per vendere una demo.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-end gap-10 px-5 py-20 md:grid-cols-2 md:px-12">
        <div>
          <SectionHead
            kicker="Da dove veniamo"
            title="A Montelanico, per chi ha radici qui"
            lead="Edilizia, ferramenta, logistica, artigianato, olio. Il digitale, da noi, è un modo per far lavorare meglio aziende che restano sul crinale."
          />
        </div>
        <figure className="overflow-hidden rounded-xl">
          <img
            src="/images/digitale/frantoio.jpg"
            alt="Interno di un frantoio lepino: torchio in legno, bottiglie, luce calda"
            className="aspect-[3/2] w-full object-cover"
          />
        </figure>
      </section>

      <Contatti />
    </DigitalShell>
  );
}

function Contatti() {
  const [nome, setNome] = useState("");
  const [azienda, setAzienda] = useState("");
  const [testo, setTesto] = useState("");

  const body = [
    nome && `Nome: ${nome}`,
    azienda && `Azienda: ${azienda}`,
    testo || "Ciao, vorrei raccontarvi un processo che ci fa perdere tempo.",
  ]
    .filter(Boolean)
    .join("\n\n");
  const href = `mailto:${DIGITAL_MAIL}?subject=${encodeURIComponent("Lepini Digital — un processo")}&body=${encodeURIComponent(body)}`;

  const field =
    "w-full border-0 border-b border-cream/20 bg-transparent py-3 text-cream placeholder:text-muted/70 focus:border-copper focus:outline-none";

  return (
    <section id="contatti" className="border-t-[3px] border-copper bg-navy-deep">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
          <Eyebrow>Contatti</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.08] md:text-5xl">
            Hai un processo che ti fa perdere tempo?
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-cream-soft">
            Scrivici. In una chiacchierata capiamo se c'è un modo più semplice. Poi, in pochi giorni, un prototipo con
            i tuoi dati.
          </p>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-muted">La prima volta è senza impegno</p>
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
              <label htmlFor="nome" className="block text-sm text-cream-soft">
                Nome
              </label>
              <input
                id="nome"
                name="nome"
                autoComplete="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={`${field} min-h-11`}
                placeholder="Come ti chiami"
              />
            </p>
            <p>
              <label htmlFor="azienda" className="block text-sm text-cream-soft">
                Azienda
              </label>
              <input
                id="azienda"
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
            <label htmlFor="msg" className="block font-display text-2xl text-cream">
              Il processo
            </label>
            <span className="mt-1 block text-sm text-muted">Quello che oggi copiate a mano.</span>
            <textarea
              id="msg"
              name="messaggio"
              rows={7}
              required
              value={testo}
              onChange={(e) => setTesto(e.target.value)}
              className={`${field} mt-3 resize-y text-lg leading-relaxed`}
              placeholder="Un esempio: i DDT restano su Excel e qualcuno li ribatte nel gestionale."
            />
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button type="submit">Parliamone</Button>
            <a href={`mailto:${DIGITAL_MAIL}`} className="font-mono text-sm text-olive-light hover:text-cream">
              {DIGITAL_MAIL}
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">Si apre la tua posta. Niente iscrizione.</p>
        </form>
      </div>
    </section>
  );
}

