export const DIGITAL_MAIL = "lepinilab@lepinidigital.com";
export const DIGITAL_URL = "https://lepinidigital.com/digitale";
export const DIGITAL_OG_IMAGE = "https://lepinidigital.com/images/brand/icon-180.png";

export const PITCH = {
  metaTitle: "Lepini Digital — Servizi digitali per imprese",
  metaDesc:
    "Lepini Digital fa coscienza digitale, identità, brand e tecnologie per le piccole imprese dei Monti Lepini. Il Portale e il Lab sono l'esempio pubblico.",
  jsonld:
    "Lepini Digital fa strumenti per le piccole e medie imprese dei Monti Lepini: coscienza digitale, formazione, identità, brand, mercati, tecnologie utili. Ha costruito il Portale Monti Lepini e Lepini Lab come esempio pubblico.",
  heroKicker: "Lepini Digital · Montelanico (RM)",
  heroTitle: "Strumenti digitali",
  heroItalic: "per chi lavora davvero.",
  heroLead:
    "Facciamo coscienza digitale, identità, brand e tecnologie per le piccole imprese dei Monti Lepini. Cose che servono in bottega e in ufficio — non una vetrina da chiudere dopo tre mesi.",
  quote:
    "Un frantoio, una ferramenta, un magazzino: strumenti che usano davvero. Non una vetrina da abbandonare dopo tre mesi.",
  serviziKicker: "Cosa facciamo",
  serviziTitle: "Cinque lavori",
  serviziLead:
    "Niente licenze care, niente sistemi più grandi dell'azienda. Coscienza, identità, mercati, passaggio. Solo quello che il team userà.",
  metodoKicker: "Come lavoriamo",
  metodoTitle: "Prima il lavoro, poi il codice",
  metodoLead: "Partiamo dal bancone, dal magazzino, dall'ufficio. Non da un modello già pronto.",
  opereKicker: "Cosa abbiamo costruito",
  opereTitle: "Il Portale e il Lab sono l'esempio",
  opereLead:
    "Li abbiamo fatti noi. Servono a mostrare, in pubblico, cosa si può fare per un'impresa — un'enciclopedia del territorio e simulatori 3D.",
  origineKicker: "Da dove veniamo",
  origineTitle: "A Montelanico, per chi ha radici qui",
  origineLead:
    "Edilizia, ferramenta, logistica, artigianato, olio. Il digitale, da noi, è un modo per far lavorare meglio aziende che restano sul crinale.",
  footer: "Studio a Montelanico. Ha costruito il Portale e il Lab. Lavora per le imprese del crinale.",
  contactTitle: "Hai un processo che ti fa perdere tempo?",
  contactLead:
    "O un brand da far uscire dalla valle, un passaggio da preparare. Scrivici. In una chiacchierata capiamo se c'è un modo più semplice.",
  contactHint: "La prima volta è senza impegno",
} as const;

export function digitalMeta(title = PITCH.metaTitle) {
  return [
    { title },
    { name: "description", content: PITCH.metaDesc },
    { name: "apple-mobile-web-app-title", content: "Lepini Digital" },
    { name: "application-name", content: "Lepini Digital" },
    { property: "og:site_name", content: "Lepini Digital" },
    { property: "og:title", content: title },
    { property: "og:description", content: PITCH.metaDesc },
    { property: "og:type", content: "website" },
    { property: "og:url", content: DIGITAL_URL },
    { property: "og:image", content: DIGITAL_OG_IMAGE },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: PITCH.metaDesc },
    { name: "twitter:image", content: DIGITAL_OG_IMAGE },
  ];
}

export const DIGITAL_STATS = [
  { k: "Bottega", l: "Artigiani, frantoi, ferramenta, magazzini" },
  { k: "Qui", l: "Formazione al banco, non da lontano" },
  { k: "Vostro", l: "Identità e strumenti che restano in azienda" },
] as const;

export const SERVIZI = [
  {
    code: "01",
    titolo: "Coscienza digitale",
    testo:
      "Capire cosa serve e cosa è moda. Dove perdete tempo, cosa può aspettare. Una chiacchierata onesta, prima di qualsiasi programma.",
  },
  {
    code: "02",
    titolo: "Formazione",
    testo:
      "Al banco, con chi c'è. Chi ha sessant'anni e chi ha venticinque. Stessi strumenti, parole diverse. Non un PDF da ottanta pagine.",
  },
  {
    code: "03",
    titolo: "Identità e brand",
    testo:
      "Come si chiama il vostro lavoro, come si vede, come si racconta. Nome, foto, sito. Un olio, un ferro, un mobile: un volto che resiste anche lontano dalla bottega.",
  },
  {
    code: "04",
    titolo: "Mercati lontani",
    testo:
      "Arrivare da chi non può salire in bottega. Vetrina, canali, lingue. Non un marketplace che vi mangia il margine: un modo vostro per far viaggiare il lavoro.",
  },
  {
    code: "05",
    titolo: "Tecnologie e passaggio",
    testo:
      "Gestionali, automazione, solo quello che userete. E il passaggio generazionale: il mestiere che resta, gli strumenti che cambiano, nessuno lasciato indietro.",
  },
] as const;

export const METODO = [
  {
    titolo: "Ascolto",
    testo: "Chi fa cosa, con quali carte, chi prende il testimone. Dove si perde tempo, dove il racconto non esce dalla valle.",
  },
  {
    titolo: "Prototipo",
    testo: "In pochi giorni qualcosa da provare con i vostri dati, le vostre foto, i vostri clienti. Non una presentazione.",
  },
  {
    titolo: "Consegna",
    testo: "Identità e strumenti restano vostri. Funzionano anche senza un abbonamento che scade.",
  },
  {
    titolo: "Affiancamento",
    testo: "Si usa insieme. Formazione a chi resta e a chi arriva. Si aggiusta. Non un corso e via.",
  },
] as const;

export const PROVE = [
  {
    src: "/images/digitale/prove/portale.jpg",
    caption: "Portale",
    nota: "Enciclopedia dei 26 comuni",
    to: "/portale",
    wide: true,
  },
  {
    src: "/images/digitale/prove/volo.jpg",
    caption: "Lab · Volo",
    nota: "Drone sul crinale, DEM e satellite",
    to: "/lab/volo",
    wide: true,
  },
  {
    src: "/images/digitale/prove/comune.jpg",
    caption: "Scheda comune",
    nota: "Sermoneta: storia, arte, mappa",
    to: "/comuni/$slug",
    slug: "sermoneta",
  },
  {
    src: "/images/digitale/prove/natura.jpg",
    caption: "Natura",
    nota: "Schede di flora e fauna",
    to: "/natura",
  },
  {
    src: "/images/digitale/prove/atlante.jpg",
    caption: "Lab · Atlante",
    nota: "26 comuni sul rilievo vero",
    to: "/lab/atlante",
  },
  {
    src: "/images/digitale/prove/biosfera.jpg",
    caption: "Lab · Biosfera",
    nota: "Specie in orbita, stesse schede",
    to: "/lab/biosfera",
  },
  {
    src: "/images/digitale/prove/sentieri.jpg",
    caption: "Lab · Sentieri",
    nota: "Tracce 3D sul modello",
    to: "/lab/sentieri",
  },
  {
    src: "/images/digitale/prove/faggeta.jpg",
    caption: "Lab · Faggeta",
    nota: "Cammino in prima persona",
    to: "/lab/faggeta",
  },
] as const;
