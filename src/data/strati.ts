import { SPECIE } from "./specie";
import type { Specie } from "./types";

export type Strato =
  | "alberi"
  | "macchia"
  | "fiori"
  | "uccelli"
  | "mammiferi"
  | "insetti"
  | "rettili"
  | "acque"
  | "habitat";

export const STRATI: { id: Strato; label: string; hint: string; color: string }[] = [
  { id: "alberi", label: "Alberi", hint: "Faggio, leccio, cerro", color: "#8b9a66" },
  { id: "macchia", label: "Macchia", hint: "Lentisco, mirto, erica", color: "#6c7a4b" },
  { id: "fiori", label: "Fiori", hint: "Orchidee, ciclamino", color: "#ede0c8" },
  { id: "uccelli", label: "Uccelli", hint: "Aquila, picchio, poiana", color: "#ce8b4e" },
  { id: "mammiferi", label: "Mammiferi", hint: "Lupo, istrice, capriolo", color: "#b5713a" },
  { id: "insetti", label: "Insetti", hint: "Farfalle, falene, calabrone", color: "#c9a05a" },
  { id: "rettili", label: "Rettili", hint: "Vipera, biacco, lucertola", color: "#9a7a55" },
  { id: "acque", label: "Acque", hint: "Anfibi, pesci, zone umide", color: "#7a8b9a" },
  { id: "habitat", label: "Habitat", hint: "I quattro piani del crinale", color: "#ede0c8" },
];

const GEN: Record<string, Strato> = {
  Quercus: "alberi",
  Fagus: "alberi",
  Acer: "alberi",
  Castanea: "alberi",
  Ostrya: "alberi",
  Ilex: "alberi",
  Arbutus: "alberi",
  Juniperus: "alberi",
  Corylus: "alberi",
  Olea: "alberi",
  Ulmus: "alberi",
  Tilia: "alberi",
  Taxus: "alberi",
  Sorbus: "alberi",
  Laurus: "alberi",
  Phillyrea: "alberi",
  Prunus: "alberi",
  Magnolia: "alberi",
  Wisteria: "alberi",
  Pistacia: "macchia",
  Myrtus: "macchia",
  Erica: "macchia",
  Capparis: "macchia",
  Rosa: "macchia",
  Vespa: "insetti",
  Anacridium: "insetti",
  Pieris: "insetti",
  Lepidoptera: "insetti",
  Argynnis: "insetti",
  Conistra: "insetti",
  Arctia: "insetti",
  Satyrium: "insetti",
  Papilio: "insetti",
  Charaxes: "insetti",
  Iphiclides: "insetti",
  Maniola: "insetti",
  Saturnia: "insetti",
  Macroglossum: "insetti",
  Acherontia: "insetti",
  Polygonia: "insetti",
  Odonata: "insetti",
  Hierophis: "rettili",
  Elaphe: "rettili",
  Coronella: "rettili",
  Natrix: "rettili",
  Vipera: "rettili",
  Podarcis: "rettili",
  Tarentola: "rettili",
  Salamandrina: "acque",
  Triturus: "acque",
  Lissotriton: "acque",
  Pelophylax: "acque",
  Barbus: "acque",
  Caenoplana: "acque",
  Capreolus: "mammiferi",
  Sus: "mammiferi",
  Mustela: "mammiferi",
  Martes: "mammiferi",
  Canis: "mammiferi",
  Hystrix: "mammiferi",
  Sciurus: "mammiferi",
  Meles: "mammiferi",
  Vulpes: "mammiferi",
  Chiroptera: "mammiferi",
};

export function stratoOf(s: Specie): Exclude<Strato, "habitat"> {
  const gen = s.scientifico.split(/\s+/)[0] ?? "";
  if (GEN[gen]) return GEN[gen] as Exclude<Strato, "habitat">;
  if (s.gruppo === "flora") return "fiori";
  return "uccelli";
}

export function speciePerStrato(id: Exclude<Strato, "habitat">) {
  return SPECIE.filter((s) => stratoOf(s) === id);
}

export const ALL_STRATI = STRATI.map((s) => s.id);
