import raw from "@/data/ignis-index.json";

type Fact = { testo: string; sezione: string; tab: string | null };
type ComuneIgnis = { slug: string; nome: string; altitudine: number; provincia: string; facts: Fact[] };

const STOP = new Set([
  "il", "lo", "la", "i", "gli", "le", "un", "uno", "una", "di", "da", "in", "con", "su", "sui", "sul", "sulla",
  "per", "tra", "fra", "e", "è", "a", "al", "allo", "alla", "ai", "agli", "alle", "del", "dello", "della", "dei",
  "degli", "delle", "che", "cosa", "come", "quali", "quale", "quanto", "quanti", "dove", "chi", "mi", "dici",
  "sai", "parlami", "raccontami", "dimmi", "ci", "sono", "qual", "hai", "ha", "questo", "questa", "questi",
  "queste", "non", "piu", "più", "o", "se", "anche", "lepini", "monti", "comune", "comuni", "territorio",
  "zona", "zone", "trovo", "trova", "trovano", "trovi", "c",
]);

function tokens(s: string) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9àèéìòù\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function stem(t: string) {
  return t.length > 5 ? t.slice(0, 5) : t;
}

type IndexedFact = Fact & { _tokens: Set<string>; _stems: Set<string>; comune: string; slug: string; nameTokens: Set<string> };

let cache: { facts: IndexedFact[]; idf: Map<string, number> } | null = null;

function index() {
  if (cache) return cache;
  const data = raw as { comuni: ComuneIgnis[] };
  const df = new Map<string, number>();
  const facts: IndexedFact[] = [];
  for (const c of data.comuni) {
    const nameTokens = new Set(tokens(c.nome));
    for (const f of c.facts) {
      const toks = tokens(f.testo);
      const rec: IndexedFact = {
        ...f,
        _tokens: new Set(toks),
        _stems: new Set(toks.map(stem)),
        comune: c.nome,
        slug: c.slug,
        nameTokens,
      };
      facts.push(rec);
      for (const t of rec._tokens) df.set(t, (df.get(t) || 0) + 1);
    }
  }
  const idf = new Map<string, number>();
  const n = facts.length;
  for (const [t, e] of df) idf.set(t, e <= 1 ? 0.5 : Math.log((n + 1) / e));
  cache = { facts, idf };
  return cache;
}

export type IgnisAnswer = {
  text: string;
  source?: string;
  link?: string;
  linkLabel?: string;
};

export function askIgnis(q: string): IgnisAnswer {
  const { facts, idf } = index();
  const qTok = tokens(q);
  if (qTok.length === 0) {
    return {
      text: "Fammi una domanda su un comune, un piatto tipico, una chiesa, un sentiero o una specie dei Monti Lepini — rispondo con i dati del Portale.",
    };
  }
  let best: { score: number; fact: IndexedFact } | null = null;
  for (const f of facts) {
    const named = qTok.some((t) => f.nameTokens.has(t));
    let score = 0;
    for (const o of qTok) {
      const w = idf.get(o) || 0.3;
      if (f._tokens.has(o)) score += w * 2;
      else if (f._stems.has(stem(o))) score += w * 1.1;
      if (f.nameTokens.has(o)) score += w * 2.5;
    }
    if (named) score += 1.5;
    if (!best || score > best.score) best = { score, fact: f };
  }
  if (!best || best.score < 1.4) {
    return {
      text: 'Non ho trovato una risposta precisa nei dati del Portale. Prova a nominare un comune (es. "Sezze", "Norma", "Segni") o un argomento (storia, natura, tradizioni, attività).',
    };
  }
  const tab = best.fact.tab ? `#tab-${best.fact.tab}` : "";
  return {
    text: best.fact.testo,
    source: `${best.fact.comune} · ${best.fact.sezione}`,
    link: `/comuni/${best.fact.slug}${tab}`,
    linkLabel: `Vai alla scheda di ${best.fact.comune}`,
  };
}

export function curiositaDelGiorno() {
  const { facts } = index();
  const start = new Date(new Date().getFullYear(), 0, 0);
  const doy = Math.floor((Date.now() - start.getTime()) / 864e5);
  const f = facts[doy % facts.length]!;
  return {
    testo: f.testo,
    comune: f.comune,
    slug: f.slug,
    tab: f.tab,
  };
}
