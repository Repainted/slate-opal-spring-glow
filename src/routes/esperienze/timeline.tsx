import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { getComune } from "@/data/comuni";
import { ERE } from "@/data/timeline";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/esperienze/timeline")({
  head: () => ({
    meta: [
      { title: titleFor("Timeline") },
      { name: "description", content: "3000 anni di storia dei Monti Lepini, dai Volsci al portale digitale." },
    ],
  }),
  component: TimelinePage,
});

function label(n: number) {
  if (n < 0) return `${Math.abs(n)} a.C.`;
  return String(n);
}

function TimelinePage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-5 py-12 md:px-12">
        <p className="text-[0.75rem] uppercase tracking-[0.2em] text-copper-light">Esperienze</p>
        <h1 className="mt-2 font-display text-5xl">Timeline</h1>
        <p className="mt-4 text-cream-soft">Sette lastre. Ogni era rimanda ai comuni che la tengono in piedi oggi.</p>
        <ol className="mt-12 space-y-0">
          {ERE.map((e, i) => (
            <li key={e.titolo} className="relative border-l border-copper/50 pl-8 pb-12">
              <span className="absolute -left-1.5 top-1 size-3 rounded-full bg-copper" />
              <p className="font-mono text-xs tabular-nums text-copper-light">
                {label(e.da)} — {label(e.a)}
              </p>
              <h2 className="mt-2 font-display text-3xl">{e.titolo}</h2>
              <p className="mt-3 leading-relaxed text-cream-soft">{e.testo}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {e.luoghi.map((slug) => (
                  <Link
                    key={slug}
                    to="/comuni/$slug"
                    params={{ slug }}
                    className="rounded-full border border-cream/15 px-3 py-1 text-sm text-olive-light"
                  >
                    {getComune(slug)?.nome ?? slug}
                  </Link>
                ))}
              </div>
              {i === ERE.length - 1 ? null : null}
            </li>
          ))}
        </ol>
      </div>
    </SiteShell>
  );
}
