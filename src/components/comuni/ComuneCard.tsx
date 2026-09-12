import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { fotoComune } from "@/data/comuni";
import type { Comune } from "@/data/types";

export function ComuneCard({ comune }: { comune: Comune }) {
  const foto = fotoComune(comune.slug);
  return (
    <Link
      to="/comuni/$slug"
      params={{ slug: comune.slug }}
      className="group block overflow-hidden rounded-xl bg-navy-card shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-border-hover)]"
    >
      {foto ? (
        <img
          src={foto}
          alt={`Veduta di ${comune.nome}`}
          className="h-40 w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-24 items-end bg-navy-deep px-5 py-3">
          <p className="text-[0.68rem] uppercase tracking-wider text-muted">Foto in arrivo</p>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-copper-light">
              {comune.provincia} · {comune.altitudine} m
            </p>
            <h3 className="mt-1 font-display text-2xl text-cream group-hover:text-cream-soft">{comune.nome}</h3>
          </div>
          {comune.bandieraArancione ? (
            <span className="rounded-full border border-copper/50 px-2.5 py-1 text-[0.68rem] uppercase tracking-wider text-copper-light">
              TCI
            </span>
          ) : null}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-cream-soft/90">{comune.headline}</p>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
          <MapPin className="size-3.5" />
          {comune.abitanti.toLocaleString("it-IT")} abitanti
        </p>
      </div>
    </Link>
  );
}