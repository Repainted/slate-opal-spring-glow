import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { COMUNI } from "@/data/comuni";
import { SENTIERI } from "@/data/sentieri";
import type { ComuneTag } from "@/data/types";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/esperienze/planner")({
  head: () => ({
    meta: [
      { title: titleFor("Planner") },
      { name: "description", content: "Costruisci un itinerario di 1-3 giorni sui Monti Lepini a partire dal dataset." },
    ],
  }),
  component: PlannerPage,
});

const INTERESTS: { id: ComuneTag; label: string }[] = [
  { id: "natura", label: "Natura" },
  { id: "medievale", label: "Borghi" },
  { id: "enogastro", label: "Tavola" },
  { id: "archeologia", label: "Archeologia" },
  { id: "lento", label: "Lento" },
];

function PlannerPage() {
  const [days, setDays] = useState<1 | 2 | 3>(2);
  const [prov, setProv] = useState<"tutte" | "Latina" | "Roma" | "Frosinone">("tutte");
  const [interests, setInterests] = useState<ComuneTag[]>(["natura", "medievale"]);

  const plan = useMemo(() => {
    const scored = COMUNI.map((c) => {
      let score = 0;
      if (prov !== "tutte" && c.provincia !== prov) score -= 50;
      for (const i of interests) if (c.tag.includes(i)) score += 3;
      if (c.bandieraArancione) score += 1;
      return { c, score };
    })
      .filter((x) => x.score > 0 || (prov === "tutte" && interests.length === 0))
      .sort((a, b) => b.score - a.score);

    const perDay = days === 1 ? 2 : days === 2 ? 2 : 2;
    const take = Math.min(scored.length, days * perDay);
    const chosen = scored.slice(0, take).map((x) => x.c);
    const chunks: (typeof chosen)[] = [];
    for (let d = 0; d < days; d++) {
      chunks.push(chosen.slice(d * perDay, (d + 1) * perDay));
    }
    return chunks.filter((ch) => ch.length > 0);
  }, [days, prov, interests]);

  function toggle(id: ComuneTag) {
    setInterests((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-12">
        <p className="text-[0.75rem] uppercase tracking-[0.2em] text-copper-light">Esperienze</p>
        <h1 className="mt-2 font-display text-5xl">Planner</h1>
        <p className="mt-4 max-w-2xl text-cream-soft">
          Un itinerario dal dataset, non da un catalogo. Mixare Bandiere Arancioni e comuni piccoli. Poi si cammina
          con la carta CAI, non con questa pagina.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <form className="rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend className="text-sm text-muted">Giorni</legend>
              <div className="mt-2 flex gap-2">
                {([1, 2, 3] as const).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setDays(n)}
                    className={`min-h-11 min-w-11 rounded-full ${days === n ? "bg-cream text-navy-deep" : "border border-cream/20"}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset className="mt-6">
              <legend className="text-sm text-muted">Versante</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["tutte", "Latina", "Roma", "Frosinone"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setProv(p)}
                    className={`min-h-10 rounded-full px-4 text-sm ${prov === p ? "bg-cream text-navy-deep" : "border border-cream/20"}`}
                  >
                    {p === "tutte" ? "Tutti" : p}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset className="mt-6">
              <legend className="text-sm text-muted">Interessi</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {INTERESTS.map((i) => (
                  <button
                    key={i.id}
                    type="button"
                    onClick={() => toggle(i.id)}
                    className={`min-h-10 rounded-full px-4 text-sm ${interests.includes(i.id) ? "bg-olive text-cream-soft" : "border border-cream/20"}`}
                  >
                    {i.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </form>

          <div className="space-y-6">
            {plan.length === 0 ? (
              <p className="text-muted">Allarga i filtri: con questi tag non esce nessun comune.</p>
            ) : (
              plan.map((day, i) => (
                <section key={i} className="rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]">
                  <h2 className="font-display text-2xl">Giorno {i + 1}</h2>
                  <ol className="mt-4 space-y-4">
                    {day.map((c) => {
                      const trail = SENTIERI.find((s) => s.comuni.includes(c.slug));
                      return (
                        <li key={c.slug} className="border-l border-copper/50 pl-4">
                          <Link to="/comuni/$slug" params={{ slug: c.slug }} className="font-display text-xl text-cream">
                            {c.nome}
                          </Link>
                          <p className="text-sm text-cream-soft">{c.headline}</p>
                          {trail ? (
                            <Link
                              to="/sentieri/$slug"
                              params={{ slug: trail.slug }}
                              className="mt-1 inline-block text-sm text-olive-light"
                            >
                              {trail.codice ?? trail.nome}
                            </Link>
                          ) : null}
                        </li>
                      );
                    })}
                  </ol>
                </section>
              ))
            )}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
