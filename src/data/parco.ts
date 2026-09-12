export type SitoNatura = {
  id: string;
  tipo: "ZPS" | "ZSC" | "vetta";
  codice?: string;
  nome: string;
  ha?: number;
  m?: number;
  lng: number;
  lat: number;
  r: number;
  testo: string;
};

/** Non esiste un Parco Regionale istituito. Esiste la ZPS e i siti Natura 2000. */
export const PARCO = {
  titolo: "ZPS Monti Lepini",
  codice: "IT6030043",
  ettari: 46925,
  comuni: 28,
  atto: "DGR Lazio 612/2011",
  nota: "Il «Parco dei Monti Lepini» è una proposta che dura da cinquant’anni. Ciò che esiste, e si può camminare, è la Zona di Protezione Speciale e i siti Natura 2000 sul crinale.",
};

export const SITI: SitoNatura[] = [
  {
    id: "zps",
    tipo: "ZPS",
    codice: "IT6030043",
    nome: "Monti Lepini",
    ha: 46925,
    lng: 13.09,
    lat: 41.58,
    r: 22,
    testo: "Roma, Latina, Frosinone. Circa 47.000 ettari, un terzo dei comuni del comprensorio. Direttiva Uccelli. Non è un recinto: è il crinale sopra i settecento metri, più le macchie e i versanti che lo tengono.",
  },
  {
    id: "semprevisa",
    tipo: "ZSC",
    codice: "IT6030041",
    nome: "Monte Semprevisa e Pian della Faggeta",
    ha: 1335,
    lng: 13.091,
    lat: 41.591,
    r: 5.5,
    testo: "Il cuore alto. Faggete con tasso e agrifoglio, habitat prioritario. 1335 ettari intorno alla vetta. Resta sui sentieri.",
  },
  {
    id: "rio",
    tipo: "ZSC",
    codice: "IT6030042",
    nome: "Alta Valle del Torrente Rio",
    ha: 293,
    lng: 13.04,
    lat: 41.62,
    r: 3.2,
    testo: "Valle umida tra i calcarei. 293 ettari. Acqua che sparisce e rinasce: carsismo, non torrente da cartolina.",
  },
  {
    id: "gricilli",
    tipo: "ZSC",
    codice: "IT6040003",
    nome: "Laghi Gricilli",
    ha: 179,
    lng: 13.16,
    lat: 41.48,
    r: 2.8,
    testo: "Zone umide di fondovalle, 179 ettari. Migratori e svernanti: è il Lepino che tocca la piana.",
  },
  {
    id: "polverino",
    tipo: "ZSC",
    codice: "IT6040004",
    nome: "Bosco Polverino",
    ha: 108,
    lng: 13.2,
    lat: 41.45,
    r: 2.4,
    testo: "Querceto mediterraneo, 108 ettari. Un lembo basso, non il crinale.",
  },
  {
    id: "cacume",
    tipo: "ZSC",
    codice: "IT6050021",
    nome: "Monte Cacume",
    ha: 369,
    lng: 13.16,
    lat: 41.7,
    r: 3.4,
    testo: "Praterie montane, 369 ettari. Versante interno, verso la Ciociaria.",
  },
];

export const VETTE: SitoNatura[] = [
  { id: "semprevisa-c", tipo: "vetta", nome: "Semprevisa", m: 1536, lng: 13.091, lat: 41.591, r: 1.2, testo: "La vetta. 1536 m sopra Bassiano. Calcare, vento, faggeta sotto." },
  { id: "malaina", tipo: "vetta", nome: "Malaina", m: 1480, lng: 13.121, lat: 41.608, r: 1.1, testo: "1480 m. Crinale interno, tra Carpineto e Gorga." },
  { id: "gemma", tipo: "vetta", nome: "Gemma", m: 1457, lng: 13.078, lat: 41.58, r: 1.1, testo: "1457 m, spalla della Semprevisa." },
  { id: "lupone", tipo: "vetta", nome: "Lupone", m: 1378, lng: 12.986, lat: 41.516, r: 1.1, testo: "1378 m tra Cori e Norma. Il CAI 701 sale da qui." },
  { id: "erdigheta", tipo: "vetta", nome: "Erdigheta", m: 1336, lng: 13.07, lat: 41.624, r: 1, testo: "1336 m alle spalle di Carpineto Romano." },
];
