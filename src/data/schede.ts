import raw from "./schede.json";

export type Epoca = { periodo: string; titolo: string; testo: string };
export type Personaggio = { anni: string; nome: string; nota: string };
export type Chiesa = { nome: string; secolo: string; stile: string; testo: string; opere: string[] };
export type Monumento = { nome: string; tipo: string; secolo: string; testo: string };
export type Festa = { nome: string; tipo: string; quando: string; testo: string };
export type Poi = { nome: string; tipo: string; testo: string };
export type AttivitaLocale = {
  nome: string;
  categoria: string;
  descrizione: string;
  prodotti: string;
  indirizzo: string;
  sito: string;
  nota: string;
};
export type SentieroLocale = { nome: string; difficolta: string; testo: string };

export type SchedaComune = {
  slug: string;
  festaPatronale: string;
  cap: string;
  comunitaMontana: string;
  storia: { intro: string; epoche: Epoca[]; personaggi: Personaggio[] };
  arte: { intro: string; chiese: Chiesa[]; monumenti: Monumento[] };
  natura: { intro: string; sentieri: SentieroLocale[] };
  tradizioni: { intro: string; feste: Festa[]; prodotti: string; piatti: string };
  turismo: {
    poi: Poi[];
    arrivo: { auto: string; treno: string; bus: string };
    contatti: { sito: string; proloco: string; email: string };
  };
  attivita: AttivitaLocale[];
};

export const SCHEDE = raw as Record<string, SchedaComune>;

export function getScheda(slug: string) {
  return SCHEDE[slug];
}

export const TAB_IDS = ["storia", "arte", "natura", "tradizioni", "turismo", "attivita"] as const;
export type TabId = (typeof TAB_IDS)[number];

export function tabFromHash(hash: string): TabId {
  const id = hash.replace(/^#/, "").replace(/^tab-/, "");
  return (TAB_IDS as readonly string[]).includes(id) ? (id as TabId) : "storia";
}
