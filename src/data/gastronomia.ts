import raw from "./gastronomia.json";

export type Ricetta = {
  slug: string;
  nome: string;
  ingredienti: string[];
  passi: string[];
  nota: string;
};

export type Laboratorio = { nome: string; testo: string; dove: string };
export type SagraGastro = { nome: string; testo: string };

type Bundle = { ricette: Ricetta[]; laboratori: Laboratorio[]; sagre: SagraGastro[] };

export const GASTRONOMIA = raw as Bundle;
