export type Pezzo = {
  src: string;
  alt: string;
  titolo: string;
  testo: string;
  fit?: "contain";
};

export type Lavoro = {
  slug: string;
  cliente: string;
  luogo: string;
  settore: string;
  titolo: string;
  lead: string;
  url?: string;
  copertina: string;
  pezzi: Pezzo[];
};

const COLAIACOMO = "/images/digitale/lavori/colaiacomo";
const OD = "/images/digitale/lavori/od";

export const LAVORI: Lavoro[] = [
  {
    slug: "colaiacomo",
    cliente: "F.lli Colaiacomo",
    luogo: "Montelanico",
    settore: "Magazzino edile",
    titolo: "Il sito, le misure e le offerte",
    lead:
      "Il magazzino ha il sito. I clienti misurano tetto, stanza e muro e portano la lista. In area riservata si prepara la locandina e si pubblica.",
    url: "https://fllicolaiacomomagazzino.netlify.app/",
    copertina: `${COLAIACOMO}/sito.jpg`,
    pezzi: [
      {
        src: `${COLAIACOMO}/sito.jpg`,
        alt: "Home del magazzino F.lli Colaiacomo a Montelanico",
        titolo: "Il sito",
        testo:
          "Materiali edili, termoidraulica, condizionamento, ferramenta e giardinaggio. Un interlocutore, dal 1990. La sede è a Montelanico.",
      },
      {
        src: `${COLAIACOMO}/storia.jpg`,
        alt: "Gino Colaiacomo al lavoro, nella pagina della storia",
        titolo: "La storia",
        testo:
          "L'azienda è del 1990. Le radici, dal 1960: Gino, padre dei titolari, artigiano a Montelanico. La foto è la loro, non una di repertorio.",
      },
      {
        src: `${COLAIACOMO}/misure.jpg`,
        alt: "Riquadro sul sito: calcola misure e materiali del cantiere",
        titolo: "Le misure, gratis per i clienti",
        testo:
          "Tetto, stanza, muro, porticato, planimetria 3D. Il cliente porta la lista. In magazzino si prepara il preventivo.",
      },
      {
        src: `${COLAIACOMO}/app.jpg`,
        alt: "App Misure e preventivo: tetto, stanza, muro",
        titolo: "L'app",
        testo:
          "Stesse voci del cantiere: falda, stanza, muro. Lingua a scelta. Il conto di materiali, ore, mezzi e ponteggi resta nel programma.",
      },
      {
        src: `${COLAIACOMO}/promo.jpg`,
        alt: "Area riservata: locandina del miscelatore 1600 W a 99 euro",
        titolo: "Le promo",
        testo:
          "Area riservata. Si scrive titolo, prezzo e dati tecnici, si vede la locandina A4, si pubblica sul sito o si esporta il PDF.",
      },
    ],
  },
  {
    slug: "od-costruzioni",
    cliente: "O.D. Costruzioni",
    luogo: "Carpineto Romano",
    settore: "Impresa edile",
    titolo: "Sigillo, sito e un solo numero",
    lead:
      "Aveva il mestiere e il biglietto. Mancava un volto solo: stesso sigillo sul sito, tetti e ristrutturazioni trovabili, un numero da chiamare. Il personaggio resta su Instagram. L'area riservata resta in ufficio.",
    copertina: `${OD}/sito.jpg`,
    pezzi: [
      {
        src: `${OD}/logo.jpg`,
        alt: "Sigillo O.D. Costruzioni, oro e navy",
        titolo: "Il sigillo",
        testo:
          "Navy, oro, arancio. Lo stesso del biglietto. Sul sito non cambia lingua: frasi corte, un referente.",
        fit: "contain",
      },
      {
        src: `${OD}/sito.jpg`,
        alt: "Home del sito O.D. Costruzioni, tetto sui Lepini",
        titolo: "Il sito",
        testo:
          "Home, servizi, lavori, territorio, contatti. Tetti e ristrutturazioni hanno una pagina loro, per chi cerca a Carpineto e in provincia di Roma.",
      },
      {
        src: `${OD}/mobile.jpg`,
        alt: "La stessa home sul telefono, con il numero in vista",
        titolo: "Dal telefono",
        testo: "Stessa home. Il numero è in vista: 329 191 9753. Dal sopralluogo alla consegna, un referente.",
      },
      {
        src: `${OD}/contatti.jpg`,
        alt: "Pagina contatti: Via Giacomo 40, Carpineto Romano",
        titolo: "I contatti",
        testo:
          "Via Giacomo 40, Carpineto Romano. Zona: Montelanico, Gorga, Maenza, Roccagorga, Segni e provincia di Roma. La scheda Google usa gli stessi dati.",
      },
    ],
  },
];

export function getLavoro(slug: string) {
  return LAVORI.find((l) => l.slug === slug);
}
