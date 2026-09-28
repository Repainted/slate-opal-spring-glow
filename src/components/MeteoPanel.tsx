import { CloudSun } from "lucide-react";
import { meteoLabel, useMeteo } from "@/lib/meteo";

export function MeteoPanel() {
  const { data, err, src, kind } = useMeteo();

  return (
    <article className="relative min-h-[17rem] overflow-hidden rounded-xl shadow-[var(--shadow-border)]">
      {src ? (
        <img src={src} alt="" className="meteo-bg absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-navy-card" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/75 to-navy-deep/20" />
      <div className="relative z-10 flex h-full min-h-[17rem] flex-col justify-end p-5">
        <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-copper-light">
          <CloudSun className="size-4" />
          Meteo sul crinale
        </p>
        {data ? (
          <>
            <p className="mt-3 font-display text-5xl tabular-nums leading-none text-cream">
              {Math.round(data.temp)}°
            </p>
            <p className="mt-2 text-cream-soft">{meteoLabel(data.code)}</p>
            <p className="mt-3 text-sm text-cream-soft/80 tabular-nums">
              min {Math.round(data.min)}° · max {Math.round(data.max)}° · vento {Math.round(data.wind)} km/h
              {data.rain > 0 ? ` · pioggia ${data.rain} mm` : null}
            </p>
          </>
        ) : (
          <p className="mt-3 text-sm text-muted">{err ? "Meteo non disponibile in questo momento." : "Caricamento del dato Open-Meteo…"}</p>
        )}
        <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
          Open-Meteo · {kind ?? "crinale"} · Carpineto / Bassiano
        </p>
      </div>
    </article>
  );
}
