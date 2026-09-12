import { COMUNI } from "@/data/comuni";
import type { Comune } from "@/data/types";

function project(c: Comune) {
  const minLng = 12.88;
  const maxLng = 13.45;
  const minLat = 41.38;
  const maxLat = 41.78;
  const x = ((c.lng - minLng) / (maxLng - minLng)) * 100;
  const y = (1 - (c.lat - minLat) / (maxLat - minLat)) * 62;
  return { x: Math.max(3, Math.min(97, x)), y: Math.max(4, Math.min(58, y)) };
}

export function ComuneMap({ active }: { active?: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-navy-deep shadow-[var(--shadow-border)]">
      <svg viewBox="0 0 100 62" className="h-full w-full" role="img" aria-label="Mappa schematica dei 26 comuni">
        <rect width="100" height="62" fill="#17161A" />
        <path
          d="M8 48 C 18 40, 28 44, 40 38 S 62 28, 78 32 S 94 22, 96 18"
          fill="none"
          stroke="#6C7A4B"
          strokeWidth="0.6"
          opacity="0.55"
        />
        <path
          d="M6 52 C 22 46, 34 50, 50 44 S 74 40, 92 36"
          fill="none"
          stroke="#B5713A"
          strokeWidth="0.4"
          opacity="0.4"
        />
        {COMUNI.map((c) => {
          const { x, y } = project(c);
          const on = c.slug === active;
          return (
            <a key={c.slug} href={`/comuni/${c.slug}`}>
              <circle
                cx={x}
                cy={y}
                r={on ? 1.7 : c.bandieraArancione ? 1.35 : 1.1}
                fill={on ? "#EDE0C8" : c.bandieraArancione ? "#CE8B4E" : "#8B9A66"}
              />
              <title>{c.nome}</title>
            </a>
          );
        })}
      </svg>
      <p className="pointer-events-none absolute bottom-3 left-4 text-[0.7rem] uppercase tracking-[0.14em] text-muted">
        Schema, non carta CAI · rame = Bandiera Arancione
      </p>
    </div>
  );
}
