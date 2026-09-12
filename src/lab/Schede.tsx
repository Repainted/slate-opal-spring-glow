import { Link } from "@tanstack/react-router";
import { specieId } from "@/data/natura";
import type { Comune, Sentiero, Specie } from "@/data/types";

export function SchedaComune({
  c,
}: {
  c: Pick<
    Comune,
    "slug" | "nome" | "provincia" | "altitudine" | "headline" | "daVedere" | "bandieraArancione"
  >;
}) {
  return (
    <aside className="pointer-events-auto max-w-sm rounded-xl border border-cream/15 bg-navy-deep/90 p-5 shadow-[var(--shadow-border)]">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-copper-light">
        {c.provincia} · {c.altitudine} m
        {c.bandieraArancione ? " · TCI" : ""}
      </p>
      <h2 className="mt-1 font-display text-2xl text-cream">{c.nome}</h2>
      <p className="mt-2 text-sm text-cream-soft">{c.headline}</p>
      <p className="mt-3 text-xs text-muted">{c.daVedere.slice(0, 3).join(" · ")}</p>
      <Link
        to="/comuni/$slug"
        params={{ slug: c.slug }}
        className="mt-4 inline-flex min-h-11 items-center text-sm text-olive-light hover:text-cream"
      >
        Apri la scheda completa
      </Link>
    </aside>
  );
}

export function SchedaSpecie({ s }: { s: Specie }) {
  return (
    <aside className="pointer-events-auto max-w-sm overflow-hidden rounded-xl border border-cream/15 bg-navy-deep/90">
      {s.foto ? <img src={s.foto} alt={s.comune} className="h-36 w-full object-cover" /> : null}
      <div className="p-5">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-copper-light">{s.gruppo}</p>
        <h2 className="mt-1 font-display text-2xl text-cream">{s.comune}</h2>
        <p className="mt-1 font-mono text-sm italic text-olive-light">{s.scientifico}</p>
        <p className="mt-3 text-sm text-cream-soft">{s.habitat}</p>
        {s.periodo ? <p className="mt-1 text-xs text-muted">{s.periodo}</p> : null}
        <Link
          to="/natura"
          hash={specieId(s)}
          className="mt-4 inline-flex min-h-11 items-center text-sm text-olive-light hover:text-cream"
        >
          Scheda nel Portale
        </Link>
      </div>
    </aside>
  );
}

export function SchedaSentiero({ s }: { s: Sentiero }) {
  return (
    <aside className="pointer-events-auto max-w-sm rounded-xl border border-cream/15 bg-navy-deep/90 p-5 shadow-[var(--shadow-border)]">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-copper-light">
        {s.codice ?? "Itinerario"} · {s.difficolta} · {s.durata}
      </p>
      <h2 className="mt-1 font-display text-2xl text-cream">{s.nome}</h2>
      <p className="mt-2 text-sm text-cream-soft">
        {s.partenza} → {s.arrivo}
      </p>
      <p className="mt-3 text-xs text-muted">{s.fonte}</p>
      <Link
        to="/sentieri/$slug"
        params={{ slug: s.slug }}
        className="mt-4 inline-flex min-h-11 items-center text-sm text-olive-light hover:text-cream"
      >
        Scheda nel Portale
      </Link>
    </aside>
  );
}

