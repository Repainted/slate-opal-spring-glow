export type Provincia = "Latina" | "Roma" | "Frosinone";

export type ComuneTag =
  | "medievale"
  | "archeologia"
  | "natura"
  | "enogastro"
  | "castello"
  | "volsci"
  | "abbazia"
  | "carsismo"
  | "olio"
  | "vino"
  | "lento"
  | "cultura";

export type Comune = {
  slug: string;
  nome: string;
  provincia: Provincia;
  altitudine: number;
  abitanti: number;
  patrono: string;
  lat: number;
  lng: number;
  headline: string;
  sommario: string;
  daVedere: string[];
  tag: ComuneTag[];
  bandieraArancione: boolean;
  note?: string;
};

export type Sentiero = {
  slug: string;
  nome: string;
  codice?: string;
  partenza: string;
  arrivo: string;
  dislivello: string;
  durata: string;
  difficolta: "T" | "E" | "EE";
  comuni: string[];
  descrizione: string;
  fonte: string;
};

export type Evento = {
  id: string;
  titolo: string;
  quando: string;
  mese: number;
  luogo: string;
  comuneSlug?: string;
  tipo: "festa" | "natura" | "cultura" | "enogastro";
  nota: string;
};

export type Specie = {
  comune: string;
  scientifico: string;
  gruppo: "flora" | "fauna";
  habitat: string;
  periodo?: string;
  foto?: string;
  comuni?: string[];
};
