import {
  Church,
  Landmark,
  Leaf,
  MapPinned,
  ScrollText,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import { specieId } from "@/data/natura";
import { notaSpecie } from "@/data/specie";
import { tabFromHash, type SchedaComune, type TabId } from "@/data/schede";
import type { Specie } from "@/data/types";
import { cn } from "@/lib/utils";

const TABS: { id: TabId; label: string; icon: typeof ScrollText }[] = [
  { id: "storia", label: "Storia", icon: ScrollText },
  { id: "arte", label: "Arte", icon: Landmark },
  { id: "natura", label: "Natura", icon: Leaf },
  { id: "tradizioni", label: "Tradizioni", icon: UtensilsCrossed },
  { id: "turismo", label: "Turismo", icon: MapPinned },
  { id: "attivita", label: "Attività", icon: Store },
];

export function ComuneTabs({ scheda, specie }: { scheda: SchedaComune; specie: Specie[] }) {
  const [tab, setTab] = useState<TabId>("storia");

  useEffect(() => {
    const apply = () => setTab(tabFromHash(window.location.hash));
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  function go(id: TabId) {
    setTab(id);
    const url = `${window.location.pathname}#tab-${id}`;
    window.history.replaceState(null, "", url);
  }

  return (
    <div className="mt-10">
      <div className="-mx-1 overflow-x-auto">
        <div role="tablist" aria-label="Sezioni della scheda" className="flex min-w-max gap-1 px-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              id={`tab-${t.id}`}
              onClick={() => go(t.id)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm",
                tab === t.id ? "bg-copper text-cream" : "border border-cream/15 text-cream-soft hover:border-copper/50",
              )}
            >
              <t.icon className="size-4" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-8">
        {tab === "storia" ? <Storia s={scheda} /> : null}
        {tab === "arte" ? <Arte s={scheda} /> : null}
        {tab === "natura" ? <Natura s={scheda} specie={specie} /> : null}
        {tab === "tradizioni" ? <Tradizioni s={scheda} /> : null}
        {tab === "turismo" ? <Turismo s={scheda} /> : null}
        {tab === "attivita" ? <Attivita s={scheda} /> : null}
      </div>
    </div>
  );
}

function Storia({ s }: { s: SchedaComune }) {
  return (
    <div>
      <h2 className="font-display text-3xl">Storia</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream-soft">{s.storia.intro}</p>
      {s.storia.epoche.length > 0 ? (
        <ol className="mt-8 space-y-6">
          {s.storia.epoche.map((e) => (
            <li key={e.titolo} className="border-l-2 border-copper/50 pl-4">
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-copper-light">{e.periodo}</p>
              <h3 className="mt-1 font-display text-xl">{e.titolo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-soft">{e.testo}</p>
            </li>
          ))}
        </ol>
      ) : null}
      {s.storia.personaggi.length > 0 ? (
        <div className="mt-10 rounded-xl bg-navy-card p-6 shadow-[var(--shadow-border)]">
          <h3 className="font-display text-2xl">Personaggi</h3>
          <ul className="mt-4 space-y-4">
            {s.storia.personaggi.map((p) => (
              <li key={p.nome}>
                <p className="text-cream">
                  {p.nome}
                  {p.anni ? <span className="ml-2 text-sm text-copper-light">{p.anni}</span> : null}
                </p>
                <p className="text-sm text-muted">{p.nota}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function Arte({ s }: { s: SchedaComune }) {
  return (
    <div>
      <h2 className="font-display text-3xl">Arte e cultura</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream-soft">{s.arte.intro}</p>
      {s.arte.chiese.length > 0 ? (
        <section className="mt-8">
          <h3 className="flex items-center gap-2 font-display text-2xl">
            <Church className="size-5 text-copper" /> Chiese
          </h3>
          <ul className="mt-4 grid gap-4">
            {s.arte.chiese.map((c) => (
              <li key={c.nome} className="rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]">
                <h4 className="font-display text-xl text-cream">{c.nome}</h4>
                <p className="mt-1 text-xs uppercase tracking-wider text-copper-light">
                  {[c.secolo, c.stile].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cream-soft">{c.testo}</p>
                {c.opere.length > 0 ? (
                  <ul className="mt-3 space-y-1 text-sm text-muted">
                    {c.opere.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {s.arte.monumenti.length > 0 ? (
        <section className="mt-8">
          <h3 className="font-display text-2xl">Monumenti</h3>
          <ul className="mt-4 grid gap-4">
            {s.arte.monumenti.map((m) => (
              <li key={m.nome} className="rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]">
                <h4 className="font-display text-xl text-cream">{m.nome}</h4>
                <p className="mt-1 text-xs uppercase tracking-wider text-copper-light">
                  {[m.tipo, m.secolo].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cream-soft">{m.testo}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function Natura({ s, specie }: { s: SchedaComune; specie: Specie[] }) {
  return (
    <div>
      <h2 className="font-display text-3xl">Natura</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream-soft">{s.natura.intro}</p>
      {specie.length > 0 ? (
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {specie.map((sp) => (
            <li key={specieId(sp)} className="overflow-hidden rounded-lg bg-navy-card">
              {sp.foto ? (
                <img src={sp.foto} alt={sp.comune} className="h-28 w-full object-cover" loading="lazy" />
              ) : null}
              <div className="px-3 py-2">
                <p className="text-sm text-cream">{sp.comune}</p>
                <p className="font-mono text-[0.65rem] italic text-olive-light">{sp.scientifico}</p>
                <p className="mt-1 text-xs text-muted">{notaSpecie(sp.scientifico) ?? sp.habitat}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted">Nessuna scheda specie legata a questo comune nel catalogo fotografico.</p>
      )}
      {s.natura.sentieri.length > 0 ? (
        <section className="mt-8">
          <h3 className="font-display text-2xl">Sentieri sul territorio</h3>
          <ul className="mt-4 space-y-3">
            {s.natura.sentieri.map((se) => (
              <li key={se.nome} className="rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]">
                <p className="text-cream">{se.nome}</p>
                {se.difficolta ? <p className="text-xs uppercase tracking-wider text-copper-light">{se.difficolta}</p> : null}
                <p className="mt-2 text-sm text-cream-soft">{se.testo}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function Tradizioni({ s }: { s: SchedaComune }) {
  return (
    <div>
      <h2 className="font-display text-3xl">Tradizioni</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream-soft">{s.tradizioni.intro}</p>
      {s.tradizioni.feste.length > 0 ? (
        <ul className="mt-6 space-y-3">
          {s.tradizioni.feste.map((f) => (
            <li key={f.nome} className="rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl text-cream">{f.nome}</h3>
                <p className="text-xs uppercase tracking-wider text-copper-light">
                  {[f.tipo, f.quando].filter(Boolean).join(" · ")}
                </p>
              </div>
              <p className="mt-2 text-sm text-cream-soft">{f.testo}</p>
            </li>
          ))}
        </ul>
      ) : null}
      {s.tradizioni.prodotti || s.tradizioni.piatti ? (
        <div className="mt-8 rounded-xl bg-navy-card p-6 shadow-[var(--shadow-border)]">
          <h3 className="font-display text-2xl">Tavola</h3>
          {s.tradizioni.prodotti ? (
            <p className="mt-3 text-sm text-cream-soft">
              <span className="text-muted">Prodotti: </span>
              {s.tradizioni.prodotti}
            </p>
          ) : null}
          {s.tradizioni.piatti ? (
            <p className="mt-2 text-sm text-cream-soft">
              <span className="text-muted">Piatti: </span>
              {s.tradizioni.piatti}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function Turismo({ s }: { s: SchedaComune }) {
  const { poi, arrivo, contatti } = s.turismo;
  return (
    <div>
      <h2 className="font-display text-3xl">Turismo</h2>
      {poi.length > 0 ? (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {poi.map((p) => (
            <li key={p.nome} className="rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]">
              <p className="text-xs uppercase tracking-wider text-copper-light">{p.tipo}</p>
              <h3 className="mt-1 font-display text-xl text-cream">{p.nome}</h3>
              <p className="mt-2 text-sm text-cream-soft">{p.testo}</p>
            </li>
          ))}
        </ul>
      ) : null}
      {arrivo.auto || arrivo.treno || arrivo.bus ? (
        <div className="mt-8 rounded-xl bg-navy-card p-6 shadow-[var(--shadow-border)]">
          <h3 className="font-display text-2xl">Come arrivare</h3>
          <dl className="mt-4 space-y-3 text-sm text-cream-soft">
            {arrivo.auto ? (
              <div>
                <dt className="text-muted">In auto</dt>
                <dd>{arrivo.auto}</dd>
              </div>
            ) : null}
            {arrivo.treno ? (
              <div>
                <dt className="text-muted">In treno</dt>
                <dd>{arrivo.treno}</dd>
              </div>
            ) : null}
            {arrivo.bus ? (
              <div>
                <dt className="text-muted">In bus</dt>
                <dd>{arrivo.bus}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      ) : null}
      {contatti.sito || contatti.proloco || contatti.email ? (
        <div className="mt-6 text-sm">
          <h3 className="font-display text-2xl">Contatti</h3>
          <ul className="mt-3 space-y-2 text-olive-light">
            {contatti.sito ? (
              <li>
                <a href={contatti.sito} rel="noreferrer">
                  Sito del Comune
                </a>
              </li>
            ) : null}
            {contatti.proloco ? (
              <li>
                <a href={contatti.proloco} rel="noreferrer">
                  Pro Loco
                </a>
              </li>
            ) : null}
            {contatti.email ? (
              <li>
                <a href={`mailto:${contatti.email}`}>{contatti.email}</a>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function Attivita({ s }: { s: SchedaComune }) {
  return (
    <div>
      <h2 className="font-display text-3xl">Attività locali</h2>
      <p className="mt-3 text-sm text-muted">
        Elenco recuperato dal Portale originale. Verificare orari e disponibilità. Non è un catalogo a pagamento.
      </p>
      {s.attivita.length === 0 ? (
        <p className="mt-6 text-cream-soft">Nessuna attività in scheda per questo comune.</p>
      ) : (
        <ul className="mt-6 grid gap-4">
          {s.attivita.map((a) => (
            <li key={a.nome} className="rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-display text-xl text-cream">{a.nome}</h3>
                {a.categoria ? (
                  <span className="rounded-full border border-cream/15 px-2.5 py-1 text-[0.68rem] uppercase tracking-wider text-muted">
                    {a.categoria}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-cream-soft">{a.descrizione}</p>
              {a.prodotti ? <p className="mt-2 text-sm text-muted">{a.prodotti}</p> : null}
              {a.indirizzo ? <p className="mt-2 text-xs text-muted">{a.indirizzo}</p> : null}
              {a.sito ? (
                <a href={a.sito} rel="noreferrer" className="mt-3 inline-block text-sm text-olive-light">
                  Sito
                </a>
              ) : null}
              {a.nota ? <p className="mt-2 text-xs italic text-muted">{a.nota}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
