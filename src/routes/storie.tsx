import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { titleFor } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/storie")({
  head: () => ({
    meta: [
      { title: titleFor("Kit storie Instagram") },
      { name: "robots", content: "noindex" },
      {
        name: "description",
        content: "Storie Instagram Lepini Digital: loghi, screen dei simulatori, video di utilizzo.",
      },
    ],
  }),
  component: StoriePage,
});

const ITEMS = [
  { src: "/storie-ig/v-crinale.mp4", kind: "video" as const, n: "V1", t: "Crinale", d: "Apertura · 6 s" },
  { src: "/storie-ig/01-cover.jpg", kind: "img" as const, n: "01", t: "Cover", d: "Lepini Digital" },
  { src: "/storie-ig/02-banco.jpg", kind: "img" as const, n: "02", t: "Il problema", d: "Excel, carta, WhatsApp" },
  { src: "/storie-ig/03-offerta.jpg", kind: "img" as const, n: "03", t: "Cosa facciamo", d: "Quattro pilastri" },
  { src: "/storie-ig/v-bottega.mp4", kind: "video" as const, n: "V2", t: "Bottega", d: "Mestiere · 6 s" },
  { src: "/storie-ig/04-portale.jpg", kind: "img" as const, n: "04", t: "Portale", d: "26 comuni" },
  { src: "/storie-ig/05-lab.jpg", kind: "img" as const, n: "05", t: "Lepini Lab", d: "Simulatori 3D" },
  { src: "/storie-ig/v-drone.mp4", kind: "video" as const, n: "V3", t: "Drone", d: "Simulatore · 6 s" },
  { src: "/storie-ig/06-drone.jpg", kind: "img" as const, n: "06", t: "Drone", d: "Rilievo reale" },
  { src: "/storie-ig/07-faggeta.jpg", kind: "img" as const, n: "07", t: "Faggeta", d: "Cammino 3D" },
  { src: "/storie-ig/08-sentieri.jpg", kind: "img" as const, n: "08", t: "Sentieri", d: "DEM e satellite" },
  { src: "/storie-ig/09-atlante.jpg", kind: "img" as const, n: "09", t: "Atlante", d: "I 26 nodi" },
  { src: "/storie-ig/10-cta.jpg", kind: "img" as const, n: "10", t: "Chiusura", d: "lepinidigital.com" },
];

function StoriePage() {
  const [i, setI] = useState(0);
  const cur = ITEMS[i];
  const prev = () => setI((n) => (n === 0 ? ITEMS.length - 1 : n - 1));
  const next = () => setI((n) => (n === ITEMS.length - 1 ? 0 : n + 1));

  return (
    <div className="min-h-dvh bg-navy-deep text-cream">
      <header className="flex items-center justify-between gap-3 px-5 py-4 md:px-10">
        <Link to="/digitale" className="flex items-center text-cream" aria-label="Lepini Digital">
          <BrandMark variant="digitalMark" className="h-11 w-auto" />
        </Link>
        <a
          href="/storie-ig/lepini-storie-instagram.zip"
          download
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-copper/50 px-4 text-sm text-copper-light"
        >
          <Download className="size-4" />
          Scarica il kit
        </a>
      </header>

      <div className="mx-auto max-w-6xl px-5 pb-6 md:px-10">
        <a
          href="/storie-ig/lepini-storie-instagram.zip"
          download
          className="flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-copper px-5 text-lg font-medium text-cream"
        >
          <Download className="size-5" />
          Scarica tutto il kit (zip)
        </a>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <a
            href="/storie-ig/lepini-storie-FOTO.zip"
            download
            className="flex min-h-12 items-center justify-center rounded-xl border border-cream/20 text-sm text-cream-soft"
          >
            Solo le 10 foto
          </a>
          <a
            href="/storie-ig/lepini-storie-VIDEO.zip"
            download
            className="flex min-h-12 items-center justify-center rounded-xl border border-cream/20 text-sm text-cream-soft"
          >
            Solo i 3 video
          </a>
        </div>
        <p className="mt-3 text-center text-sm text-muted">Tocca il bottone rame. Il file arriva nei Download del telefono.</p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 md:grid-cols-[minmax(0,420px)_1fr] md:px-10">
        <div className="mx-auto w-full max-w-[390px]">
          <div className="mb-3 flex gap-1">
            {ITEMS.map((it, idx) => (
              <button
                key={it.src}
                type="button"
                aria-label={it.t}
                onClick={() => setI(idx)}
                className={cn("h-1 flex-1 rounded-full", idx === i ? "bg-copper-light" : "bg-cream/20")}
              />
            ))}
          </div>
          <div className="relative overflow-hidden rounded-[1.6rem] bg-navy shadow-[0_0_0_1px_rgba(237,224,200,0.12)]">
            {cur.kind === "video" ? (
              <video key={cur.src} src={cur.src} className="aspect-[9/16] w-full object-cover" autoPlay muted loop playsInline />
            ) : (
              <img key={cur.src} src={cur.src} alt={`${cur.n} ${cur.t}`} className="aspect-[9/16] w-full object-cover" />
            )}
            <button
              type="button"
              className="absolute inset-y-0 left-0 w-1/3"
              aria-label="Precedente"
              onClick={prev}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 w-1/3"
              aria-label="Successiva"
              onClick={next}
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button type="button" onClick={prev} className="inline-flex min-h-11 items-center gap-1 text-sm text-cream-soft">
              <ChevronLeft className="size-4" /> Prec
            </button>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-copper-light">
              {cur.n} · {cur.t}
            </p>
            <button type="button" onClick={next} className="inline-flex min-h-11 items-center gap-1 text-sm text-cream-soft">
              Succ <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="pt-2">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-copper-light">Kit Instagram</p>
          <h1 className="mt-3 font-display text-4xl text-cream md:text-5xl">Storie pronte da pubblicare.</h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-cream-soft">
            1080×1920, loghi ufficiali, screen veri dei simulatori, tre video da 6 secondi. Sticker link:
            lepinidigital.com
          </p>
          <ol className="mt-8 grid gap-2 sm:grid-cols-2">
            {ITEMS.map((it, idx) => (
              <button
                key={it.src}
                type="button"
                onClick={() => setI(idx)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-3 py-3 text-left",
                  idx === i ? "border-copper-light bg-navy-card" : "border-cream/10 hover:border-cream/25",
                )}
              >
                {it.kind === "video" ? (
                  <video src={it.src} muted className="h-14 w-9 shrink-0 rounded object-cover" />
                ) : (
                  <img src={it.src} alt="" className="h-14 w-9 shrink-0 rounded object-cover" />
                )}
                <span>
                  <span className="block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-copper-light">{it.n}</span>
                  <span className="block text-cream">{it.t}</span>
                  <span className="block text-sm text-muted">{it.d}</span>
                </span>
              </button>
            ))}
          </ol>
          <p className="mt-8 text-sm text-muted">
            Ordine e dide sono nel file DIDA.txt dentro lo zip. Tono: dal bancone, niente gergo.
          </p>
        </div>
      </div>
    </div>
  );
}
