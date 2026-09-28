import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ComuneCard } from "@/components/comuni/ComuneCard";
import { ComuneMap } from "@/components/comuni/ComuneMap";
import { SiteShell } from "@/components/layout/SiteShell";
import { PortaleScheda } from "@/components/PortaleScheda";
import { Eyebrow } from "@/components/SectionHead";
import { COMUNI, comuniByProvincia } from "@/data/comuni";
import { titleFor } from "@/lib/seo";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/comuni/")({
  head: () => ({
    meta: [
      { title: titleFor("I 26 comuni") },
      {
        name: "description",
        content:
          "Schede dei 26 comuni dei Monti Lepini: Latina, Roma e Frosinone. Altitudine, patrono, tag, Bandiere Arancioni.",
      },
    ],
  }),
  component: ComuniIndex,
});

export function ComuniIndex() {
  const [q, setQ] = useState("");
  const [prov, setProv] = useState<"tutti" | "Latina" | "Roma" | "Frosinone">("tutti");
  const [tci, setTci] = useState(false);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return COMUNI.filter((c) => {
      if (prov !== "tutti" && c.provincia !== prov) return false;
      if (tci && !c.bandieraArancione) return false;
      if (!needle) return true;
      return (
        c.nome.toLowerCase().includes(needle) ||
        c.headline.toLowerCase().includes(needle) ||
        c.tag.some((t) => t.includes(needle))
      );
    });
  }, [q, prov, tci]);

  const byP = comuniByProvincia();
  const tr = useT();

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-12">
        <p className="text-[0.75rem] uppercase tracking-[0.2em] text-copper-light">{tr("Comuni")}</p>
        <h1 className="mt-2 font-display text-5xl text-cream">{tr("I 26, in trama")}</h1>
        <p className="mt-4 max-w-2xl text-cream-soft">
          Latina {byP.Latina.length}, Roma {byP.Roma.length}, Frosinone {byP.Frosinone.length}.{" "}
          {tr("Non tutti sono Bandiere Arancioni: il filtro TCI esiste perché il Touring ha già scelto, non perché gli altri non contino.")}
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <ComuneMap />
          <form className="flex flex-col gap-4 rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]" onSubmit={(e) => e.preventDefault()}>
            <label className="text-sm text-muted">
              {tr("Cerca")}
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={tr("Nome, tag, headline")}
                className="mt-2 min-h-11 w-full rounded-lg border border-cream/15 bg-navy-deep px-3 text-cream placeholder:text-muted"
              />
            </label>
            <fieldset>
              <legend className="text-sm text-muted">{tr("Provincia")}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["tutti", "Latina", "Roma", "Frosinone"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setProv(p)}
                    className={`min-h-10 rounded-full px-4 text-sm ${prov === p ? "bg-cream text-navy-deep" : "border border-cream/20 text-cream"}`}
                  >
                    {p === "tutti" ? tr("Tutti") : p}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="flex min-h-11 items-center gap-2 text-sm text-cream-soft">
              <input type="checkbox" checked={tci} onChange={(e) => setTci(e.target.checked)} className="size-4" />
              {tr("Solo Bandiere Arancioni TCI")}
            </label>
            <p className="text-sm text-muted tabular-nums">
              {list.length} {tr("comuni")}
            </p>
          </form>
        </div>

        <section className="mt-14">
          <Eyebrow>{tr("Dal Portale al Lab")}</Eyebrow>
          <h2 className="mt-2 font-display text-3xl text-cream">{tr("Due schede, lo stesso dataset")}</h2>
          <p className="mt-3 max-w-2xl text-cream-soft">
            {tr("I 26 comuni non stanno solo in elenco. In Lab la trama li tiene insieme; la biosfera tiene le specie segnalate sulle schede.")}
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <PortaleScheda
              to="/lab/trama"
              img="/images/lab/trama.jpg"
              kicker="Lab · 08"
              title="Trama"
              text={tr("I 26 borghi come nodi di una sola rete. Demografia, orbite, geografia: ogni punto apre la scheda del Portale.")}
            />
            <PortaleScheda
              to="/lab/biosfera"
              img="/images/lab/biosfera.jpg"
              kicker="Lab · 03"
              title="Biosfera"
              text={tr("Flora e fauna dello stesso schedario. Orbite o diagramma, filtri per strato: alberi, insetti, uccelli.")}
            />
          </div>
        </section>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <ComuneCard key={c.slug} comune={c} />
          ))}
        </div>
        {list.length === 0 ? <p className="mt-10 text-muted">{tr("Nessun comune con questi filtri.")}</p> : null}
      </div>
    </SiteShell>
  );
}
