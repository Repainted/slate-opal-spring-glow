import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ComuneCard } from "@/components/comuni/ComuneCard";
import { ComuneMap } from "@/components/comuni/ComuneMap";
import { SiteShell } from "@/components/layout/SiteShell";
import { COMUNI, comuniByProvincia } from "@/data/comuni";
import { titleFor } from "@/lib/seo";

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

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-12">
        <p className="text-[0.75rem] uppercase tracking-[0.2em] text-copper-light">Comuni</p>
        <h1 className="mt-2 font-display text-5xl text-cream">I 26, in una griglia</h1>
        <p className="mt-4 max-w-2xl text-cream-soft">
          Latina {byP.Latina.length}, Roma {byP.Roma.length}, Frosinone {byP.Frosinone.length}. Non tutti sono
          Bandiere Arancioni: il filtro TCI esiste perché il Touring ha già scelto, non perché gli altri non contino.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <ComuneMap />
          <form className="flex flex-col gap-4 rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]" onSubmit={(e) => e.preventDefault()}>
            <label className="text-sm text-muted">
              Cerca
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Nome, tag, headline"
                className="mt-2 min-h-11 w-full rounded-lg border border-cream/15 bg-navy-deep px-3 text-cream placeholder:text-muted"
              />
            </label>
            <fieldset>
              <legend className="text-sm text-muted">Provincia</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["tutti", "Latina", "Roma", "Frosinone"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setProv(p)}
                    className={`min-h-10 rounded-full px-4 text-sm ${prov === p ? "bg-cream text-navy-deep" : "border border-cream/20 text-cream"}`}
                  >
                    {p === "tutti" ? "Tutti" : p}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="flex min-h-11 items-center gap-2 text-sm text-cream-soft">
              <input type="checkbox" checked={tci} onChange={(e) => setTci(e.target.checked)} className="size-4" />
              Solo Bandiere Arancioni TCI
            </label>
            <p className="text-sm text-muted tabular-nums">{list.length} comuni</p>
          </form>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <ComuneCard key={c.slug} comune={c} />
          ))}
        </div>
        {list.length === 0 ? <p className="mt-10 text-muted">Nessun comune con questi filtri.</p> : null}
      </div>
    </SiteShell>
  );
}
