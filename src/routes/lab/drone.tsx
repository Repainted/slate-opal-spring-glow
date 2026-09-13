import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/lab/drone")({
  head: () => ({
    meta: [
      { title: titleFor("Lab · Drone") },
      {
        name: "description",
        content:
          "Simulatore drone sui Monti Lepini: rilievo DEM reale, satellite, strade, fisica di volo.",
      },
    ],
  }),
  component: DronePage,
});

/** Full-document simulator — no nested iframe (breaks inside the Grok preview). */
function DronePage() {
  useEffect(() => {
    window.location.replace("/lab/drone.html");
  }, []);
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-navy-deep px-6 text-center text-cream">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper-light">07 · Drone</p>
      <p className="text-cream-soft">Apertura del simulatore…</p>
      <a
        href="/lab/drone.html"
        className="inline-flex min-h-11 items-center rounded-full border border-cream/20 px-5 text-sm text-cream hover:border-copper-light"
      >
        Apri il simulatore
      </a>
    </div>
  );
}
