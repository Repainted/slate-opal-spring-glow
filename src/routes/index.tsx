import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Leaf, Milestone, Mountain } from "lucide-react";
import { useCallback } from "react";
import { ComuneMap } from "@/components/comuni/ComuneMap";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/layout/SiteShell";
import { MeteoPanel } from "@/components/MeteoPanel";
import { Eyebrow, SectionHead } from "@/components/SectionHead";
import { Button } from "@/components/ui/button";
import { COMUNI, STATS } from "@/data/comuni";
import { MESI } from "@/data/natura";
import { SENTIERI } from "@/data/sentieri";
import { WebGLHost, useReducedMotion } from "@/lab/LabStage";
import { startTramaBg } from "@/lab/tramaBg";
import { SITE } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} · 26 borghi` },
      { name: "description", content: SITE.description },
    ],
  }),
  component: HomePage,
});

export function HomePage() {
  const mese = MESI[new Date().getMonth()]!;
  const tci = COMUNI.filter((c) => c.bandieraArancione).length;
  const reduced = useReducedMotion();
  const start = useCallback((c: HTMLCanvasElement) => startTramaBg(c, reduced.current), [reduced]);

  return (
    <SiteShell overlayHeader>
      <JsonLd
        data={{
          "@type": "TouristDestination",
          name: "Monti Lepini",
          description: SITE.description,
          geo: { "@type": "GeoCoordinates", latitude: STATS.centro.lat, longitude: STATS.centro.lng },
        }}
      />
      <section className="relative min-h-[72vh] overflow-hidden border-b-[3px] border-copper md:min-h-[88vh]">
        <div className="pointer-events-none absolute inset-0 z-0">
          <WebGLHost start={start} />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy via-navy/40 to-navy/15" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-5 pb-10 pt-24 md:min-h-[88vh] md:justify-end md:px-12 md:pb-16 md:pt-32">
          <Eyebrow>Latina · Roma · Frosinone</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.8rem,8vw,5.8rem)] font-semibold uppercase leading-[0.92] text-cream">
            26 borghi.
            <span className="mt-3 block font-medium italic normal-case tracking-normal text-olive-light">
              Un solo comprensorio.
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream-soft">
            Schede dei 26 comuni, sentieri numerati, natura e imprese. Senza pubblicità. Un progetto di Lepini Digital.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link to="/parco">
              <Button>Esplora il parco</Button>
            </Link>
            <Link to="/comuni" className="text-sm text-olive-light hover:text-cream">
              26 comuni
            </Link>
            <Link to="/lab" className="text-sm text-olive-light hover:text-cream">
              Lepini Lab
            </Link>
            <Link to="/digitale" className="text-sm text-muted hover:text-cream">
              Lepini Digital
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-cream/10">
        <div className="mx-auto grid max-w-6xl divide-cream/10 sm:grid-cols-2 md:grid-cols-4 md:divide-x">
          {[
            { k: String(STATS.comuni), l: "Comuni in un dataset" },
            { k: `${STATS.vetta} m`, l: STATS.vettaNome },
            { k: String(tci), l: "Bandiere Arancioni TCI" },
            { k: String(SENTIERI.length), l: "Itinerari in scheda" },
          ].map((s) => (
            <div key={s.l} className="px-5 py-7 md:px-8">
              <p className="font-display text-4xl leading-none text-cream md:text-5xl">{s.k}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-3 md:px-12">
        <MeteoPanel />
        <article>
          <Eyebrow>Questo mese</Eyebrow>
          <h2 className="mt-3 font-display text-3xl">{mese.nome}</h2>
          <p className="mt-3 text-sm leading-relaxed text-cream-soft">{mese.natura}</p>
          <p className="mt-2 text-sm text-muted">{mese.uscita}</p>
          <Link to="/esperienze/calendario" className="mt-5 inline-flex min-h-11 items-center gap-1 text-sm text-olive-light">
            Calendario stagionale <ArrowRight className="size-4" />
          </Link>
        </article>
        <article className="border-t border-cream/10 pt-6 md:border-t-0 md:pt-0">
          <Eyebrow>Cosa non siamo</Eyebrow>
          <p className="mt-3 text-sm leading-relaxed text-cream-soft">
            Non sostituiamo Compagnia dei Lepini, la DMO o VisitLazio. Loro hanno eventi, soci, sentieri in PDF. Qui
            stanno le schede dei 26. Il resto si linka, non si copia.
          </p>
          <Link to="/cantiere" className="mt-5 inline-flex min-h-11 items-center gap-1 text-sm text-olive-light">
            Basi del cantiere <ArrowRight className="size-4" />
          </Link>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <SectionHead kicker="Il territorio" title="I 26, non i sette da cartolina" />
          <Link to="/comuni" className="text-sm text-olive-light hover:text-cream">
            Elenco completo
          </Link>
        </div>
        <ComuneMap />
      </section>

      <section className="border-t border-cream/10 bg-navy-deep">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-3 md:px-12">
          {[
            { icon: Mountain, title: "Sentieri con fonte", to: "/sentieri" as const, t: "CAI 701, 702, 736 dalla Compagnia. Nessun numero inventato." },
            { icon: Leaf, title: "Natura con nome", to: "/natura" as const, t: "Fagus sylvatica, non «bosco». Le ~50 orchidee restano da schedare con un botanico." },
            { icon: Milestone, title: "Lepini Lab", to: "/lab" as const, t: "Trama, volo, faggeta, biosfera. Il crinale come modello, non come foto." },
          ].map((b) => (
            <Link key={b.title} to={b.to} className="group border-t border-copper/40 pt-6">
              <b.icon className="size-5 text-copper" />
              <h3 className="mt-4 font-display text-2xl text-cream group-hover:text-olive-light">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.t}</p>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
