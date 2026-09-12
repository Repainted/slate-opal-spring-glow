export type Meteo = {
  temp: number;
  code: number;
  wind: number;
  max: number;
  min: number;
  rain: number;
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

export function meteoLabel(code: number) {
  if (LABELS[code]) return LABELS[code];
  if (code < 20) return "Variabile";
  if (code < 70) return "Pioggia";
  if (code < 80) return "Neve";
  return "Instabile";
}

export async function fetchMeteo(lat: number, lng: number): Promise<Meteo | null> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
    `&current=temperature_2m,weather_code,wind_speed_10m` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum` +
    `&timezone=Europe%2FRome&forecast_days=1`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = (await res.json()) as {
    current?: { temperature_2m: number; weather_code: number; wind_speed_10m: number };
    daily?: { temperature_2m_max: number[]; temperature_2m_min: number[]; precipitation_sum: number[] };
  };
  if (!data.current || !data.daily) return null;
  return {
    temp: data.current.temperature_2m,
    code: data.current.weather_code,
    wind: data.current.wind_speed_10m,
    max: data.daily.temperature_2m_max[0] ?? data.current.temperature_2m,
    min: data.daily.temperature_2m_min[0] ?? data.current.temperature_2m,
    rain: data.daily.precipitation_sum[0] ?? 0,
  };
}
