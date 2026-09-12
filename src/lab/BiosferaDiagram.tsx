import { HABITAT } from "@/data/natura";
import { speciePerStrato, STRATI, type Strato } from "@/data/strati";
import type { Specie } from "@/data/types";
import { cn } from "@/lib/utils";

export function BiosferaDiagram({
  layers,
  onSpecie,
  onHabitat,
  pickId,
}: {
  layers: Set<Strato>;
  onSpecie: (s: Specie) => void;
  onHabitat: (h: (typeof HABITAT)[number]) => void;
  pickId?: string;
}) {
  return (
    <div className="absolute inset-0 z-[5] overflow-y-auto bg-navy-deep/80 px-4 pb-28 pt-36 md:px-10">
      <div className="mx-auto max-w-5xl space-y-8">
        {layers.has("habitat") ? (
          <section>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-copper-light">Habitat</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {HABITAT.map((h) => (
                <button
                  key={h.titolo}
                  type="button"
                  onClick={() => onHabitat(h)}
                  className="rounded-xl border border-cream/15 bg-navy-card p-4 text-left hover:border-copper"
                >
                  <h3 className="font-display text-xl">{h.titolo}</h3>
                  <p className="mt-1 text-sm text-muted">{h.testo}</p>
                </button>
              ))}
            </div>
          </section>
        ) : null}
        {STRATI.filter((s) => s.id !== "habitat" && layers.has(s.id)).map((st) => {
          const list = speciePerStrato(st.id as Exclude<Strato, "habitat">);
          return (
            <section key={st.id}>
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-copper-light">
                  {st.label}
                  <span className="ml-2 text-muted">{list.length}</span>
                </p>
                <p className="text-xs text-muted">{st.hint}</p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {list.map((s) => (
                  <button
                    key={s.scientifico + s.comune}
                    type="button"
                    onClick={() => onSpecie(s)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border bg-navy-card p-2 text-left hover:border-copper",
                      pickId === s.scientifico ? "border-copper" : "border-cream/10",
                    )}
                  >
                    {s.foto ? (
                      <img src={s.foto} alt="" className="size-12 shrink-0 rounded-lg object-cover" />
                    ) : (
                      <span className="size-12 shrink-0 rounded-lg" style={{ background: st.color }} />
                    )}
                    <span>
                      <span className="block font-display text-base leading-tight">{s.comune}</span>
                      <span className="block font-mono text-[0.65rem] italic text-olive-light">{s.scientifico}</span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
