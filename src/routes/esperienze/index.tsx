import { Link, createFileRoute } from "@tanstack/react-router";
import { CalendarRange, Footprints, History } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/esperienze/")({
  head: () => ({
    meta: [
      { title: titleFor("Esperienze") },
      { name: "description", content: "Timeline, calendario stagionale e planner del Portale Monti Lepini." },
    ],
  }),
  component: EsperienzeIndex,
});

const ITEMS = [
  {
    to: "/esperienze/timeline" as const,
    icon: History,
    title: "Timeline",
    text: "Tre millenni in sette lastre: Volsci, Roma, abbazie, briganti, 1913, oggi.",
  },
  {
    to: "/esperienze/calendario" as const,
    icon: CalendarRange,
    title: "Calendario stagionale",
    text: "Cosa fiorisce, cosa si raccoglie, dove camminare, mese per mese.",
  },
  {
    to: "/esperienze/planner" as const,
    icon: Footprints,
    title: "Planner",
    text: "Uno, due o tre giorni. Natura, borghi, tavola, archeologia. Un itinerario dal dataset, non da un catalogo turistico.",
  },
];

export function EsperienzeIndex() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-12">
        <p className="text-[0.75rem] uppercase tracking-[0.2em] text-copper-light">Esperienze</p>
        <h1 className="mt-2 font-display text-5xl">Strumenti, non pagine</h1>
        <p className="mt-4 max-w-2xl text-cream-soft">
          Timeline, calendario e planner restano qui, sul dato. Il 3D sta in{" "}
          <Link to="/lab" className="text-olive-light">
            Lepini Lab
          </Link>
          : volo, faggeta, biosfera.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ITEMS.map((i) => (
            <Link
              key={i.title}
              to={i.to}
              className="rounded-xl bg-navy-card p-6 shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
            >
              <i.icon className="size-6 text-copper" />
              <h2 className="mt-4 font-display text-2xl">{i.title}</h2>
              <p className="mt-2 text-sm text-muted">{i.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
