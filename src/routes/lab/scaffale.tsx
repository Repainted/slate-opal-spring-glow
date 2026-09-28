import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/lab/scaffale")({
  head: () => ({
    meta: [
      { title: titleFor("Lab · Scaffale") },
      {
        name: "description",
        content:
          "Scaffale cablato: gondole Brooklyn con LED nei porta-prezzi, telecamere grandangolari e distinta. Concept Lepini Lab per una ferramenta.",
      },
    ],
  }),
  component: ScaffalePage,
});

/** Full document: the 3D model is its own page, same as Legno and Drone. */
function ScaffalePage() {
  useEffect(() => {
    window.location.replace("/lab/scaffale.html");
  }, []);
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-navy-deep px-6 text-center text-cream">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper-light">06 · Scaffale</p>
      <p className="text-cream-soft">Apertura del modello…</p>
      <a
        href="/lab/scaffale.html"
        className="inline-flex min-h-11 items-center rounded-full border border-cream/20 px-5 text-sm text-cream hover:border-copper-light"
      >
        Apri il modello
      </a>
    </div>
  );
}
