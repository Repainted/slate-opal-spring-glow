import type { Sentiero } from "./types";

export const SENTIERI: Sentiero[] = [
  {
    slug: "semprevisa",
    nome: "Pian della Faggeta – Monte Semprevisa",
    partenza: "Pian della Faggeta (Bassiano / Carpineto)",
    arrivo: "Monte Semprevisa, 1536 m",
    dislivello: "circa 400 m",
    durata: "3–4 h A/R",
    difficolta: "E",
    comuni: ["bassiano", "carpineto-romano"],
    descrizione:
      "L'itinerario faro del comprensorio. Faggeta, carsismo, vetta. Non sostituisce la carta CAI: è una scheda di orientamento. Segnavia e condizioni da verificare sul campo.",
    fonte: "Carta escursionistica CAI / Compagnia dei Lepini",
  },
  {
    slug: "cai-701",
    nome: "Selva di Cori – Monte Lupone",
    codice: "CAI 701",
    partenza: "Selva di Cori",
    arrivo: "Monte Lupone, 1378 m",
    dislivello: "circa 700 m",
    durata: "4–5 h A/R",
    difficolta: "E",
    comuni: ["cori"],
    descrizione:
      "Sentiero numerato dalla rete Compagnia dei Lepini. Sale dal versante pontino verso la vetta settentrionale della catena. Bosco, cresta, panorama sul mar Tirreno in giornate terse.",
    fonte: "Compagnia dei Lepini, sentiero 701",
  },
  {
    slug: "cai-702",
    nome: "Campo di Segni – Monte Lupone",
    codice: "CAI 702",
    partenza: "Campo di Segni",
    arrivo: "Monte Lupone, 1378 m",
    dislivello: "circa 700 m",
    durata: "4 h A/R",
    difficolta: "E",
    comuni: ["segni"],
    descrizione:
      "Versante interno. Parte dall'altopiano di Segni, tra faggi e fenomeni carsici, fino al Lupone. Complementare al 701: due salite, una vetta.",
    fonte: "Compagnia dei Lepini, sentiero 702",
  },
  {
    slug: "cai-736",
    nome: "Flying in the Sky",
    codice: "CAI 736",
    partenza: "Largo Mariani, Rocca Massima",
    arrivo: "Anello su Rocca Massima",
    dislivello: "contenuto",
    durata: "2–3 h",
    difficolta: "E",
    comuni: ["rocca-massima"],
    descrizione:
      "Anello dal borgo più alto del versante pontino. Il nome lo dice: è un cammino di panorama, non di vetta. Adatto a chi vuole il crinale senza il Semprevisa.",
    fonte: "Compagnia dei Lepini, sentiero 736",
  },
  {
    slug: "norba-ninfa",
    nome: "Norba, Norma e i Giardini di Ninfa",
    partenza: "Norma / area archeologica",
    arrivo: "Giardini di Ninfa (ingresso a valle)",
    dislivello: "discesa verso la piana",
    durata: "mezza giornata (cultura, non trekking)",
    difficolta: "T",
    comuni: ["norma", "sermoneta"],
    descrizione:
      "Non è un sentiero CAI: è un itinerario culturale. Mura poligonali, borgo, poi discesa visiva — e visita a orario — verso Ninfa. Prenotare i giardini a parte.",
    fonte: "Fondazione Caetani / area archeologica di Norba",
  },
  {
    slug: "fossanova",
    nome: "Priverno e l'Abbazia di Fossanova",
    partenza: "Priverno",
    arrivo: "Abbazia di Fossanova",
    dislivello: "pianeggiante",
    durata: "2–3 h visita",
    difficolta: "T",
    comuni: ["priverno"],
    descrizione:
      "Abbazia cistercense, morte di Tommaso d'Aquino (1274), museo. Tappa culturale obbligata, collegabile in giornata con Maenza o Prossedi.",
    fonte: "Soprintendenza / Compagnia dei Lepini",
  },
  {
    slug: "mura-segni",
    nome: "Le mura ciclopiche di Segni",
    partenza: "Centro di Segni",
    arrivo: "Acropoli e Porta",
    dislivello: "urbano",
    durata: "1–2 h",
    difficolta: "T",
    comuni: ["segni"],
    descrizione:
      "Cammino in paese tra le mura poligonali volsche. Si combina col 702 se si ha una giornata intera. Portare acqua: poco ombra sulle cortine.",
    fonte: "Comune di Segni / letteratura archeologica",
  },
  {
    slug: "crinale-lento",
    nome: "Tre borghi lenti: Gorga, Montelanico, Bassiano",
    partenza: "Gorga o Montelanico",
    arrivo: "Bassiano",
    dislivello: "collinare",
    durata: "giornata in auto/bici + cammini brevi",
    difficolta: "T",
    comuni: ["gorga", "montelanico", "bassiano"],
    descrizione:
      "Itinerario di attraversamento, non un unico sentiero. Serve a non concentrare tutti i visitatori su Sermoneta. Farinata, borgo rotondo, silenzio d'alta quota.",
    fonte: "Elaborazione Portale (da verificare con CAI locale)",
  },
];

export function getSentiero(slug: string) {
  return SENTIERI.find((s) => s.slug === slug);
}

export function sentieriPerComune(slug: string) {
  return SENTIERI.filter((s) => s.comuni.includes(slug));
}
