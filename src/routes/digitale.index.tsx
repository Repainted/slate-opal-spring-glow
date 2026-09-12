import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { JsonLd } from "@/components/JsonLd";
import { DigitalShell } from "@/components/layout/DigitalShell";
import { ProveGallery } from "@/components/ProveGallery";
import { Button } from "@/components/ui/button";
import { DIGITAL_MAIL, DIGITAL_STATS, METODO, PITCH, SERVIZI } from "@/data/digitale";

export const Route = createFileRoute("/digitale/")({
  head: () => ({
    meta: [
      { title: PITCH.metaTitle },
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
        <Matita />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-28 md:px-12 md:pb-24 md:pt-32">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper">{PITCH.heroKicker}</p>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.8rem)] font-semibold leading-[0.92] text-ink">
            {PITCH.heroTitle}
            <span className="mt-3 block font-medium italic text-copper">{PITCH.heroItalic}</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">{PITCH.heroLead}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#contatti">
              <Button variant="ink">Parliamone</Button>
            </a>
            <a href="#servizi" className="text-sm text-ink-soft hover:text-ink">
              Cosa facciamo
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10">
        <div className="mx-auto grid max-w-6xl divide-ink/10 md:grid-cols-3 md:divide-x">
          {DIGITAL_STATS.map((s) => (
            <div key={s.l} className="px-5 py-8 md:px-12">
              <p className="font-display text-5xl leading-none text-ink md:text-6xl">{s.k}</p>
              <p className="mt-3 max-w-[16rem] font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-12 md:py-20">
        <blockquote className="max-w-3xl font-display text-3xl leading-snug text-ink md:text-[2.4rem] md:leading-[1.18]">
          {PITCH.quote}
        </blockquote>
      </section>

      <section id="servizi" className="mx-auto max-w-6xl px-5 pb-20 md:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper">{PITCH.serviziKicker}</p>
        <h2 className="mt-3 max-w-xl font-display text-4xl text-ink md:text-5xl">{PITCH.serviziTitle}</h2>
        <p className="mt-4 max-w-xl text-ink-soft">{PITCH.serviziLead}</p>
        <ol className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
          {SERVIZI.map((s) => (
            <li key={s.code} className="grid items-baseline gap-3 py-8 md:grid-cols-12">
              <p className="font-display text-2xl text-copper md:col-span-2">{s.code}</p>
              <h3 className="font-display text-2xl text-ink md:col-span-3">{s.titolo}</h3>
              <p className="max-w-md text-sm leading-relaxed text-ink-soft md:col-span-7">{s.testo}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="metodo" className="border-y border-ink/10 bg-paper-card/70">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper">{PITCH.metodoKicker}</p>
          <h2 className="mt-3 font-display text-4xl text-ink">{PITCH.metodoTitle}</h2>
          <p className="mt-4 max-w-xl text-ink-soft">{PITCH.metodoLead}</p>
          <ol className="mt-14 grid gap-10 md:grid-cols-4">
            {METODO.map((m, i) => (
              <li key={m.titolo} className="border-t border-ink/15 pt-5">
                <p className="font-mono text-xs text-copper">0{i + 1}</p>
                <h3 className="mt-2 font-display text-xl text-ink md:text-2xl">{m.titolo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{m.testo}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="opere" className="mx-auto max-w-6xl px-5 py-20 md:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper">{PITCH.opereKicker}</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl text-ink">{PITCH.opereTitle}</h2>
        <p className="mt-4 max-w-xl text-ink-soft">{PITCH.opereLead}</p>
        <ProveGallery light />
      </section>

      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-12 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper">{PITCH.origineKicker}</p>
          <h2 className="mt-3 max-w-xl font-display text-4xl text-ink">{PITCH.origineTitle}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{PITCH.origineLead}</p>
        </div>
      </section>

      <Contatti />
    </DigitalShell>
  );
}

function Matita() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-ink"
      viewBox="0 0 1200 720"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.22">
        <path d="M-20 420 C 180 380, 280 460, 420 400 S 680 330, 860 370 S 1100 440, 1220 400" />
        <path d="M-20 460 C 160 420, 300 500, 460 440 S 720 370, 900 410 S 1120 480, 1220 440" />
        <path d="M-20 500 C 140 460, 320 540, 500 480 S 760 410, 940 450 S 1140 520, 1220 480" />
        <path d="M-20 540 C 120 500, 340 580, 540 520 S 800 450, 980 490 S 1160 560, 1220 520" />
        <path d="M-20 360 C 200 320, 260 400, 400 340 S 640 280, 820 320 S 1080 390, 1220 350" />
        <path d="M-20 320 C 220 280, 240 360, 380 300 S 620 240, 800 280 S 1060 350, 1220 310" />
      </g>
    </svg>
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
    "w-full border-0 border-b border-ink/20 bg-transparent py-3 text-ink placeholder:text-ink-soft/70 focus:border-copper focus:outline-none";

  return (
    <section id="contatti" className="border-t-[3px] border-copper bg-paper-card/80">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper">Contatti</p>
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
              <label htmlFor="nome" className="block text-sm text-ink-soft">
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
              <label htmlFor="azienda" className="block text-sm text-ink-soft">
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
            <label htmlFor="msg" className="block font-display text-2xl text-ink">
              Il salto
            </label>
            <span className="mt-1 block text-sm text-ink-soft">Identità, mercati, passaggio, o un processo che vi frena.</span>
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
