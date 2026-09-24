export const DIGITAL_MAIL = "lepinilab@lepinidigital.com";
export const DIGITAL_URL = "https://lepinidigital.com/digitale";
export const DIGITAL_OG_IMAGE = "https://lepinidigital.com/images/brand/icon-180.png";

export const PITCH = {
  metaTitle: "Lepini Digital — Gestionali, dati e siti per imprese dei Lepini",
  metaDesc:
    "Lepini Digital, Montelanico: recupero dati, gestionali snelli, automazione di preventivi e DDT, siti veloci e assistenti ancorati al catalogo. Per ferramenta, magazzini, artigiani e commercianti dei Monti Lepini.",
  jsonld:
    "Lepini Digital è lo studio di Montelanico che porta gestionali, continuità dei dati, automazione e siti alle micro, piccole e medie imprese dei Monti Lepini. Lepini Lab è il laboratorio territoriale open data, distinto dall'attività commerciale.",
  heroKicker: "Lepini Digital · Montelanico (RM)",
  heroTitle: "I vostri dati restano.",
  heroItalic: "Gli strumenti si usano al banco.",
  heroLead:
    "Recuperiamo Excel, carta e vecchi archivi. Poi un gestionale che sta sul PC del banco e sul telefono in cantiere: giacenze, ordini, DDT, preventivi. Niente parole vuote. Ore in meno, errori di copia a zero.",
  quote:
    "Nessuno ricomincia da zero. Lo storico entra nel sistema. I conti li fa il programma, non una chiacchiera.",
  serviziKicker: "Cosa facciamo",
  serviziTitle: "Quattro lavori, misurabili",
  serviziLead:
    "Canone o commessa. Per ferramenta, magazzini edili, artigiani e negozi. L'intelligenza artificiale cerca e risponde: prezzi, scorte e sconti restano calcoli precisi.",
  metodoKicker: "Come lavoriamo",
  metodoTitle: "Prima i vostri fogli, poi il programma",
  metodoLead: "Partiamo da quello che già usate. Se non entra lo storico, non si parte.",
  opereKicker: "Lepini Lab, a parte",
  opereTitle: "Il Portale e il Lab non sono il prodotto",
  opereLead:
    "Sono ricerca territoriale open data sui 26 comuni. Servono a far vedere come lavoriamo. L'attività commerciale è un'altra: gestionali, dati, automazione, siti per le imprese.",
  origineKicker: "Da dove veniamo",
  origineTitle: "A Montelanico, per chi ha il banco qui",
  origineLead:
    "Edilizia, ferramenta, logistica, artigianato, commercio. Stessa valle, stesse ore persi a ricopiare. Il lavoro resta sul crinale; cambiano solo i passaggi inutili.",
  footer:
    "Lepini Digital è l'attività commerciale a Montelanico. Lepini Lab è il laboratorio open data dei 26 comuni. Due cose distinte.",
  contactTitle: "Quante ore perdete a ricopiare?",
  contactLead:
    "Giacenze, preventivi, DDT, listini sul telefono. Scriveteci. Alla prima chiacchierata capiamo se i vostri fogli si possono portare dentro senza ricominciare.",
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
  { k: "Storico", l: "Excel, carta e database: entra tutto" },
  { k: "Banco + cantiere", l: "Stesso gestionale su PC e telefono" },
  { k: "Conti precisi", l: "Prezzi e scorte non li decide l'IA" },
] as const;

export const SERVIZI = [
  {
    code: "01",
    titolo: "Continuità dei dati",
    testo:
      "Portiamo dentro file Excel, fogli cartacei e vecchi database. Nessun cliente ricomincia da zero. Lo storico resta, completo.",
    foto: "/images/digitale/prodotto-ddt.jpg",
  },
  {
    code: "02",
    titolo: "Gestionali snelli",
    testo:
      "Giacenze, ordini fornitore, DDT, preventivi. Solo quello che serve. Sul PC del banco e sul telefono o tablet in cantiere.",
    foto: "/images/digitale/magazzino.jpg",
  },
  {
    code: "03",
    titolo: "Automazione di processo",
    testo:
      "Margini e sconti cliente calcolati dal programma. Preventivi e documenti di trasporto in PDF, subito. Zero ricopiatura, zero errori di trascrizione.",
    foto: "/images/digitale/prodotto-attrezzi.jpg",
  },
  {
    code: "04",
    titolo: "Sito e assistente",
    testo:
      "Sito veloce, senza cookie e senza traccianti. Assistente che risponde solo su catalogo, orari e dati vostri. Non inventa prezzi.",
    foto: "/images/digitale/studio-hero.jpg",
  },
] as const;

export const PRODOTTO = [
  {
    src: "/images/digitale/prodotto-olio.jpg",
    alt: "Bottiglia d'olio su calcare",
    caption: "Olio",
    nota: "Still-life da frantoio: la materia prima, non lo stock photo.",
  },
  {
    src: "/images/digitale/prodotto-attrezzi.jpg",
    alt: "Attrezzi sul banco",
    caption: "Banco",
    nota: "Morsa, legno, rame. Il mestiere che deve entrare nel gestionale.",
  },
  {
    src: "/images/digitale/prodotto-ddt.jpg",
    alt: "Documento di trasporto",
    caption: "Carta",
    nota: "DDT e listini: lo storico che non si ricopia a mano.",
  },
] as const;

export const VETRINA = [
  { src: "/images/digitale/vetrina/furgone.jpg", alt: "Furgone bianco, pronto per la grafica", cap: "Furgone" },
  { src: "/images/digitale/vetrina/sito.jpg", alt: "Sito su un portatile, impaginazione pulita", cap: "Sito" },
  { src: "/images/digitale/vetrina/biglietti.jpg", alt: "Biglietti da visita su un tavolo chiaro", cap: "Biglietti" },
  { src: "/images/digitale/vetrina/carta.jpg", alt: "Foglio di carta intestata", cap: "Carta intestata" },
  { src: "/images/digitale/vetrina/gestionale.jpg", alt: "Schermata di un gestionale su monitor", cap: "Gestionale", href: "#gestionale" },
  { src: "/images/digitale/vetrina/campagna.jpg", alt: "Manifesto pubblicitario su una parete chiara", cap: "Campagna" },
  { src: "/images/digitale/vetrina/vela.jpg", alt: "Vela pubblicitaria su un marciapiede", cap: "Vela" },
  { src: "/images/digitale/vetrina/instagram.jpg", alt: "Telefono con una griglia di post", cap: "Instagram" },
  { src: "/images/digitale/vetrina/clienti.jpg", alt: "Programma clienti e posta su portatile e telefono", cap: "Clienti e mail" },
] as const;

export const CONTENUTI = {
  kicker: "Contenuti",
  title: "Foto, video e marchio, pronti da pubblicare",
  lead: "Per olio, ferramenta, legno, bottega. Si parte dalle vostre foto e dal vostro nome. L'intelligenza artificiale accelera. Una persona controlla prima che qualcosa esca.",
} as const;

export const CONTENUTI_INCLUSI = [
  {
    code: "01",
    titolo: "Ideazione",
    testo:
      "Concept del marchio e delle immagini, prima di stampare o mettere online. Si parte da cosa fate voi, non da un modello uguale per tutti.",
  },
  {
    code: "02",
    titolo: "Valorizzazione",
    testo:
      "Le foto che avete già — prodotto, banco, bottega — si sistemano e si mettono in una scena pulita. Meno giorni di set. Il pezzo resta quello vero.",
  },
  {
    code: "03",
    titolo: "Video",
    testo: "Clip brevi per Instagram, scheda prodotto e vetrina. Niente spot. Qualcosa che si pubblica questa settimana.",
  },
] as const;

export const CONTENUTI_AMBITI = [
  { titolo: "Schede prodotto", testo: "Negozio online e listino: la foto giusta accanto al nome giusto." },
  { titolo: "Volantini e campagne", testo: "Un'immagine che sta su un foglio A4 e su un annuncio." },
  { titolo: "Social", testo: "Storie e post con lo stesso segno, senza rifare tutto ogni volta." },
  { titolo: "Marchio", testo: "Un artigiano riconoscibile, anche fuori dalla valle." },
  { titolo: "Catalogo", testo: "Pagine per la stampa, non solo per lo schermo." },
] as const;

export const CONTENUTI_PROCESSO = [
  { titolo: "Il mestiere", testo: "Chi compra e cosa deve vedersi. Si guarda il banco, non una cartella di esempi generici." },
  { titolo: "Le prove", testo: "Bozze di immagini e video. Voi dite sì o no, prima di andare avanti." },
  { titolo: "I formati", testo: "Sito, storia, volantino, catalogo. Lo stesso pezzo, le misure giuste." },
  { titolo: "I file", testo: "Consegnati e pronti. Li usate voi, senza un altro passaggio." },
] as const;

export const METODO = [
  {
    titolo: "I fogli",
    testo: "Prima si vede cosa avete già: Excel, quaderni, gestionale vecchio. Se lo storico non entra, si ferma tutto.",
  },
  {
    titolo: "Il banco",
    testo: "Si prova con i vostri articoli, i vostri sconti, i vostri clienti. Al banco e in cantiere, non in una slide.",
  },
  {
    titolo: "I conti",
    testo: "Prezzi, giacenze, margini: regole fisse. L'assistente cerca e risponde. Non tocca i numeri.",
  },
  {
    titolo: "Il canone",
    testo: "Commessa o canone, strumenti che restano usabili. Si aggiusta con chi sta al banco, tutte le età.",
  },
] as const;

export const PROVE = [
  {
    src: "/images/digitale/prove/portale.jpg",
    caption: "Portale",
    nota: "Enciclopedia dei 26 comuni — Lab, non il prodotto",
    to: "/portale",
    wide: true,
  },
  {
    src: "/images/digitale/prove/volo.jpg",
    caption: "Lab · Volo",
    nota: "Ricerca territoriale, distinta dal commerciale",
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
