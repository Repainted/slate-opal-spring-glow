import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { LETTERE, VOCI, letteraDi, type VoceTipo } from "@/data/indice";
import { titleFor } from "@/lib/seo";

export const Route = createFileRoute("/indice")({
  head: () => ({
    meta: [
      { title: titleFor("Indice analitico") },
      {
        name: "description",
        content: `${VOCI.length} voci — comuni, personaggi, chiese, monumenti, flora e fauna, feste e attività — in ordine alfabetico.`,
      },
    ],
  }),
  component: IndicePage,
});

const FILTRI: { id: "tutte" | VoceTipo; label: string }[] = [
  { id: "tutte", label: "Tutte" },
  { id: "comune", label: "Comuni" },
  { id: "personaggio", label: "Personaggi" },
  { id: "chiesa", label: "Chiese" },
  { id: "monumento", label: "Monumenti" },
  { id: "flora", label: "Flora" },
  { id: "fauna", label: "Fauna" },
  { id: "festa", label: "Feste" },
  { id: "attivita", label: "Attività" },
];

function IndicePage() {
  const [filtro, setFiltro] = useState<(typeof FILTRI)[number]["id"]>("tutte");
  const list = useMemo(
    () => VOCI.filter((v) => (filtro === "tutte" ? true : v.tipo === filtro)),
    [filtro],
  );
  const gruppi = useMemo(() => {
    const map = new Map<string, typeof list>();
    for (const v of list) {
      const L = letteraDi(v);
      const arr = map.get(L) ?? [];
      arr.push(v);
      map.set(L, arr);
    }
    return LETTERE.map((L) => [L, map.get(L) ?? []] as const).filter(([, a]) => a.length > 0);
  }, [list]);

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-12">
        <p className="text-[0.75rem] uppercase tracking-[0.2em] text-copper-light">Enciclopedia</p>
        <h1 className="mt-2 font-display text-5xl text-cream">Indice analitico</h1>
        <p className="mt-4 max-w-2xl text-cream-soft">
          {list.length} voci recuperate dal Portale originale: i 26 comuni, personaggi, chiese e monumenti, flora e fauna,
          feste e attività. Ogni riga apre la scheda, nel tab giusto.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {FILTRI.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFiltro(f.id)}
              className={
                filtro === f.id
                  ? "rounded-full bg-copper px-4 py-2 text-sm text-cream"
                  : "rounded-full border border-cream/20 px-4 py-2 text-sm text-cream-soft"
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-10 space-y-10">
          {gruppi.map(([L, voci]) => (
            <section key={L}>
              <h2 className="font-display text-3xl text-copper-light">{L}</h2>
              <ul className="mt-3 divide-y divide-cream/10">
                {voci.map((v) => (
                  <li key={v.id} className="flex flex-wrap items-baseline justify-between gap-2 py-2">
                    <Link
                      to="/comuni/$slug"
                      params={{ slug: v.slug }}
                      hash={v.tab ? `tab-${v.tab}` : undefined}
                      className="text-cream hover:text-olive-light"
                    >
                      {v.nome}
                    </Link>
                    <span className="text-xs uppercase tracking-wider text-muted">
                      {v.tipo} · {v.comune}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
