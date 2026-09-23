import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/lab/legno")({
  head: () => ({
    meta: [
      { title: titleFor("Lab · Legno") },
      {
        name: "description",
        content:
          "LegnoBuilder: componi travi, pannelli e coperture sandwich, poi ottieni il computo metrico. Esempio Lepini Lab di progettazione utile.",
      },
    ],
  }),
  component: LegnoPage,
});

function LegnoPage() {
  useEffect(() => {
    window.location.replace("/lab/legno.html");
  }, []);
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-navy-deep px-6 text-center text-cream">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper-light">09 · Legno</p>
      <p className="text-cream-soft">Apertura di LegnoBuilder…</p>
      <a
        href="/lab/legno.html"
        className="inline-flex min-h-11 items-center rounded-full border border-cream/20 px-5 text-sm text-cream hover:border-copper-light"
      >
        Apri il progetto
      </a>
    </div>
  );
}
