import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { fotoComune } from "@/data/comuni";
import type { Comune } from "@/data/types";
import { useComuneCopy, useI18n, useT } from "@/lib/i18n";

export function ComuneCard({ comune }: { comune: Comune }) {
  const foto = fotoComune(comune.slug);
  const tr = useT();
  const { lang } = useI18n();
  const copy = useComuneCopy(comune.slug, comune.headline, comune.sommario);
  return (
    <Link
      to="/comuni/$slug"
      params={{ slug: comune.slug }}
      className="group block overflow-hidden rounded-xl bg-navy-card shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-border-hover)]"
    >
      {foto ? (
        <img
          src={foto}
          alt={lang === "en" ? `View of ${comune.nome}` : `Veduta di ${comune.nome}`}
          className="h-40 w-full object-cover"
          loading="lazy"
        />
      ) : (
        <img
          src="/images/lab/trama.jpg"
          alt=""
          className="h-40 w-full object-cover opacity-80"
          loading="lazy"
        />
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
        <p className="mt-3 text-sm leading-relaxed text-cream-soft/90">{copy.headline}</p>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
          <MapPin className="size-3.5" />
          {comune.abitanti.toLocaleString(lang === "en" ? "en-GB" : "it-IT")} {tr("abitanti")}
        </p>
      </div>
    </Link>
  );
}