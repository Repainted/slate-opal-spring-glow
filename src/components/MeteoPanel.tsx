import { CloudSun } from "lucide-react";
import { useEffect, useState } from "react";
import { STATS } from "@/data/comuni";
import { fetchMeteo, meteoLabel, type Meteo } from "@/lib/meteo";

export function MeteoPanel() {
  const [data, setData] = useState<Meteo | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let live = true;
    fetchMeteo(STATS.centro.lat, STATS.centro.lng)
      .then((m) => {
        if (live) {
          if (m) setData(m);
          else setErr(true);
        }
      })
      .catch(() => {
        if (live) setErr(true);
      });
    return () => {
      live = false;
    };
  }, []);

  return (
    <article className="rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]">
      <p className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.16em] text-copper-light">
        <CloudSun className="size-4" />
        Meteo sul crinale
      </p>
      {data ? (
        <>
          <p className="mt-3 font-display text-4xl tabular-nums text-cream">
            {Math.round(data.temp)}°
          </p>
          <p className="mt-1 text-cream-soft">{meteoLabel(data.code)}</p>
          <p className="mt-3 text-sm text-muted tabular-nums">
            min {Math.round(data.min)}° · max {Math.round(data.max)}° · vento {Math.round(data.wind)} km/h
            {data.rain > 0 ? ` · pioggia ${data.rain} mm` : null}
          </p>
        </>
      ) : (
        <p className="mt-3 text-sm text-muted">{err ? "Meteo non disponibile in questo momento." : "Caricamento del dato Open-Meteo…"}</p>
      )}
      <p className="mt-3 text-[0.7rem] text-muted">Open-Meteo · centro comprensorio (Carpineto / Bassiano)</p>
    </article>
  );
}
