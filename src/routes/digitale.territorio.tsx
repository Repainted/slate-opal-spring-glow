import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { JsonLd } from "@/components/JsonLd";
import { DigitalShell } from "@/components/layout/DigitalShell";
import { ProveGallery } from "@/components/ProveGallery";
import { Eyebrow, SectionHead } from "@/components/SectionHead";
import { Button } from "@/components/ui/button";
import { DIGITAL_MAIL, DIGITAL_STATS, METODO, PITCH, PRODOTTO, SERVIZI } from "@/data/digitale";

export const Route = createFileRoute("/digitale/territorio")({
  head: () => ({
    meta: [
      { title: PITCH.metaTitle + " · Territorio" },
      {
        name: "description",
        content: PITCH.metaDesc,
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
          description: PITCH.jsonld,
          email: DIGITAL_MAIL,
          areaServed: "Monti Lepini",
          url: "https://lepinidigital.com",
        }}
      />

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-[-10%] size-[44rem] rounded-full border border-copper/20 md:right-[-8%] md:size-[52rem]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 top-[8%] size-[32rem] rounded-full border border-copper/10 md:right-[4%] md:size-[38rem]"
        />
        <div className="relative mx-auto grid min-h-[88vh] max-w-6xl items-center md:grid-cols-12">
          <div className="flex flex-col justify-center px-5 pb-12 pt-28 md:col-span-6 md:px-12 md:pb-16 md:pt-32">
            <Eyebrow>{PITCH.heroKicker}</Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.8rem)] font-semibold leading-[0.92] text-cream">
              {PITCH.heroTitle}
              <span className="mt-3 block font-medium italic text-copper-light">{PITCH.heroItalic}</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream-soft">{PITCH.heroLead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#contatti">
                <Button>Parliamone</Button>
              </a>
              <a href="#servizi" className="text-sm text-copper-light hover:text-cream">
                Cosa facciamo
              </a>
            </div>
          </div>
          <figure className="flex items-center justify-center px-8 pb-14 pt-2 md:col-span-6 md:px-8 md:pb-8 md:pt-24">
            <img
              src="/images/brand/digital-lockup.png"
              alt="Lepini Digital — monte a rete e cerchio di rame"
              className="w-[min(86vw,28rem)]"
            />
          </figure>
        </div>
      </section>

      <section className="border-b border-cream/10">
        <div className="mx-auto grid max-w-6xl divide-cream/10 md:grid-cols-3 md:divide-x">
          {DIGITAL_STATS.map((s) => (
            <div key={s.l} className="px-5 py-8 md:px-12">
              <p className="font-display text-5xl leading-none text-copper-light md:text-6xl">{s.k}</p>
              <p className="mt-3 max-w-[16rem] font-mono text-xs uppercase tracking-[0.16em] text-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-12 md:py-20">
        <blockquote className="max-w-3xl font-display text-3xl leading-snug text-cream md:text-[2.5rem] md:leading-[1.15]">
          {PITCH.quote}
        </blockquote>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { src: "/images/digitale/close-oliva.jpg", alt: "Pelle di un'oliva", cap: "Frutto" },
            { src: "/images/digitale/close-morsa.jpg", alt: "Morsa e legno", cap: "Banco" },
            { src: "/images/digitale/close-legno.jpg", alt: "Vena del legno e chiodi", cap: "Mestiere" },
            { src: "/images/digitale/close-calcare.jpg", alt: "Calcare e rame", cap: "Pietra" },
          ].map((f) => (
            <figure key={f.src} className="overflow-hidden rounded-xl bg-navy-card">
              <img src={f.src} alt={f.alt} className="aspect-square w-full object-cover" />
              <figcaption className="px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">{f.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="prodotto" className="border-y border-cream/10 bg-navy-deep">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-12 md:px-12">
          <div className="md:col-span-4">
            <SectionHead
              kicker="Close-up"
              title="Il lavoro, da vicino"
              lead="Olio, morsa, legno. Niente panorami inventati: la materia di chi produce."
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-3 md:col-span-8">
            {PRODOTTO.map((p) => (
              <figure key={p.src} className="overflow-hidden rounded-xl bg-navy-card">
                <img src={p.src} alt={p.alt} className="aspect-square w-full object-cover" />
                <figcaption className="p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-copper-light">{p.caption}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.nota}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="servizi" className="mx-auto max-w-6xl px-5 py-20 md:px-12">
        <SectionHead kicker={PITCH.serviziKicker} title={PITCH.serviziTitle} lead={PITCH.serviziLead} />
        <ol className="mt-14 divide-y divide-cream/10 border-y border-cream/10">
          {SERVIZI.map((s) => (
            <li key={s.code} className="grid items-center gap-4 py-8 md:grid-cols-12">
              <img
                src={s.foto}
                alt=""
                className="size-16 rounded-lg object-cover md:col-span-1 md:size-14"
              />
              <p className="font-display text-2xl text-copper-light md:col-span-1">{s.code}</p>
              <h3 className="font-display text-2xl md:col-span-3">{s.titolo}</h3>
              <p className="max-w-md text-sm leading-relaxed text-cream-soft md:col-span-7">{s.testo}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="metodo" className="border-y border-cream/10 bg-navy-deep">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-12">
          <SectionHead
            kicker={PITCH.metodoKicker}
            title={PITCH.metodoTitle}
            lead={PITCH.metodoLead}
          />
          <ol className="mt-14 grid gap-10 md:grid-cols-4">
            {METODO.map((m, i) => (
              <li key={m.titolo} className="border-t border-copper/40 pt-5">
                <p className="font-mono text-xs text-copper-light">0{i + 1}</p>
                <h3 className="mt-2 font-display text-xl md:text-2xl">{m.titolo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.testo}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative h-[38vh] min-h-[220px] overflow-hidden">
        <img
          src="/images/digitale/close-legno.jpg"
          alt="Vena del legno d'ulivo e chiodi di rame"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
        <p className="absolute bottom-8 left-5 max-w-md font-display text-2xl italic text-cream md:left-12 md:text-3xl">
          Dal banco, verso mercati che prima erano lontani.
        </p>
      </section>

      <section id="opere" className="bg-navy">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-12">
          <SectionHead
            kicker={PITCH.opereKicker}
            title={PITCH.opereTitle}
            lead={PITCH.opereLead}
          />
          <ProveGallery />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-end gap-10 px-5 py-20 md:grid-cols-2 md:px-12">
        <div>
          <SectionHead
            kicker={PITCH.origineKicker}
            title={PITCH.origineTitle}
            lead={PITCH.origineLead}
          />
        </div>
        <figure className="overflow-hidden rounded-xl">
          <img
            src="/images/digitale/close-oliva.jpg"
            alt="Pelle di un'oliva lucida d'olio"
            className="aspect-square w-full object-cover"
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
    testo || "Ciao, vorrei ragionare su identità, mercati o passaggio generazionale.",
  ]
    .filter(Boolean)
    .join("\n\n");
  const href = `mailto:${DIGITAL_MAIL}?subject=${encodeURIComponent("Lepini Digital — un salto")}&body=${encodeURIComponent(body)}`;

  const field =
    "w-full border-0 border-b border-cream/20 bg-transparent py-3 text-cream placeholder:text-muted/70 focus:border-copper focus:outline-none";

  return (
    <section id="contatti" className="border-t-[3px] border-copper bg-navy-deep">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
          <Eyebrow>Contatti</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.08] md:text-5xl">{PITCH.contactTitle}</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-cream-soft">{PITCH.contactLead}</p>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-muted">{PITCH.contactHint}</p>
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
              Il salto
            </label>
            <span className="mt-1 block text-sm text-muted">Identità, mercati, passaggio, o un processo che vi frena.</span>
            <textarea
              id="msg"
              name="messaggio"
              rows={7}
              required
              value={testo}
              onChange={(e) => setTesto(e.target.value)}
              className={`${field} mt-3 resize-y text-lg leading-relaxed`}
              placeholder="Esempio: mio padre tiene i clienti in agenda. Vorrei un sito e un modo per vendere fuori provincia, senza perdere come lavoriamo."
            />
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button type="submit">Parliamone</Button>
            <a href={`mailto:${DIGITAL_MAIL}`} className="font-mono text-sm text-copper-light hover:text-cream">
              {DIGITAL_MAIL}
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">Si apre la tua posta. Niente iscrizione.</p>
        </form>
      </div>
    </section>
  );
}

