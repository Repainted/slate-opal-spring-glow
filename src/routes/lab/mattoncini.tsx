import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/lab/mattoncini")({
  head: () => ({
    meta: [
      { title: titleFor("Lab · Mattoncini") },
      {
        name: "description",
        content: "Il mondo dei mattoncini: si salta, si cercano i tesori e si passa al mondo dopo.",
      },
    ],
  }),
  component: MattonciniPage,
});

function MattonciniPage() {
  useEffect(() => {
    window.location.replace("/lab/mattoncini.html");
  }, []);
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-navy-deep px-6 text-center text-cream">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper-light">05 · Mattoncini</p>
      <p className="text-cream-soft">Apertura del mondo dei mattoncini…</p>
      <a
        href="/lab/mattoncini.html"
        className="inline-flex min-h-11 items-center rounded-full border border-cream/20 px-5 text-sm text-cream hover:border-copper-light"
      >
        Apri il gioco
      </a>
    </div>
  );
}
