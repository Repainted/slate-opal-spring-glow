import { useEffect, useState } from "react";
import { STATS } from "@/data/comuni";

export type MeteoKind = "sereno" | "variabile" | "coperto" | "nebbia" | "pioggia" | "neve" | "temporale";

export type Meteo = {
  temp: number;
  code: number;
  wind: number;
  max: number;
  min: number;
  rain: number;
  day: boolean;
  kind: MeteoKind;
};

const LABELS: Record<number, string> = {
  0: "Sereno",
  1: "Prevalentemente sereno",
  2: "Parzialmente nuvoloso",
  3: "Coperto",
  45: "Nebbia",
  48: "Nebbia a velo",
  51: "Pioviggine",
  61: "Pioggia",
  71: "Neve",
  80: "Rovesci",
  95: "Temporale",
};

const CACHE_KEY = "meteoLepini";
const CACHE_MS = 6 * 60 * 60 * 1000;

export function meteoKind(code: number): MeteoKind {
  if (code === 0 || code === 1) return "sereno";
  if (code === 2) return "variabile";
  if (code === 3) return "coperto";
  if (code === 45 || code === 48) return "nebbia";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "neve";
  if (code >= 95) return "temporale";
  if (code >= 51) return "pioggia";
  return "variabile";
}

export function meteoSrc(kind: MeteoKind) {
  return `/images/meteo/${kind}.jpg`;
}

export function seasonalKind(d = new Date()): MeteoKind {
  const m = d.getMonth();
  if (m === 11 || m === 0 || m === 1) return "coperto";
  if (m === 6 || m === 7) return "sereno";
  return "variabile";
}

export function meteoLabel(code: number) {
  if (LABELS[code]) return LABELS[code];
  if (code < 20) return "Variabile";
  if (code < 70) return "Pioggia";
  if (code < 80) return "Neve";
  return "Instabile";
}

function readCache(): Meteo | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { t, m } = JSON.parse(raw) as { t: number; m: Meteo };
    if (Date.now() - t > CACHE_MS || !m?.kind) return null;
    return m;
  } catch {
    return null;
  }
}

function writeCache(m: Meteo) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), m }));
  } catch {
    /* quota */
  }
}

export async function fetchMeteo(lat: number, lng: number): Promise<Meteo | null> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
    `&current=temperature_2m,weather_code,wind_speed_10m,is_day` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum` +
    `&timezone=Europe%2FRome&forecast_days=1`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = (await res.json()) as {
    current?: { temperature_2m: number; weather_code: number; wind_speed_10m: number; is_day?: number };
    daily?: { temperature_2m_max: number[]; temperature_2m_min: number[]; precipitation_sum: number[] };
  };
  if (!data.current || !data.daily) return null;
  const code = data.current.weather_code;
  return {
    temp: data.current.temperature_2m,
    code,
    wind: data.current.wind_speed_10m,
    max: data.daily.temperature_2m_max[0] ?? data.current.temperature_2m,
    min: data.daily.temperature_2m_min[0] ?? data.current.temperature_2m,
    rain: data.daily.precipitation_sum[0] ?? 0,
    day: data.current.is_day !== 0,
    kind: meteoKind(code),
  };
}

let inflight: Promise<Meteo | null> | null = null;

export function loadMeteoLepini() {
  inflight ??= (async () => {
    const live = await fetchMeteo(STATS.centro.lat, STATS.centro.lng).catch(() => null);
    if (live) {
      writeCache(live);
      return live;
    }
    return readCache();
  })();
  return inflight;
}

export function useMeteo() {
  const [data, setData] = useState<Meteo | null>(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    let live = true;
    loadMeteoLepini()
      .then((m) => {
        if (!live) return;
        if (m) setData(m);
        else setErr(true);
      })
      .catch(() => {
        if (live) setErr(true);
      });
    return () => {
      live = false;
    };
  }, []);
  const kind = data?.kind ?? seasonalKind();
  return {
    data,
    err,
    kind,
    src: meteoSrc(kind),
  };
}
