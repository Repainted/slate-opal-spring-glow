export const DIGITAL_MAIL = "lepinilab@lepinidigital.com";

export const DIGITAL_STATS = [
  { k: "26", l: "Comuni già in scheda nel Portale" },
  { k: "PMI", l: "Imprese piccole e medie del crinale" },
  { k: "0", l: "Abbonamenti obbligatori" },
] as const;

export const FOTO = [
  {
    src: "/images/digitale/crinale.jpg",
    alt: "Crinale calcareo dei Monti Lepini al crepuscolo, borgo sullo sperone",
    caption: "Montagna",
  },
  {
    src: "/images/digitale/frantoio.jpg",
    alt: "Frantoio artigianale: torchio, bottiglie d'olio, luce di rame",
    caption: "Bottega",
  },
  {
    src: "/images/digitale/magazzino.jpg",
    alt: "Tavolo di magazzino con DDT, portatile e scanner, senza vetrina da catalogo",
    caption: "Tecnologia",
  },
] as const;

export const PRODOTTO = [
  {
    src: "/images/digitale/prodotto-olio.jpg",
    alt: "Tre bottiglie d'olio extravergine su lastra di calcare, luce di rame",
    caption: "Olio",
    nota: "Quello che esce dal frantoio. Il gestionale deve partire da qui.",
  },
  {
    src: "/images/digitale/prodotto-attrezzi.jpg",
    alt: "Morsa, chiodi di rame, martello e legno d'ulivo su banco di quercia",
    caption: "Attrezzi",
    nota: "Ferramenta e falegnameria: anagrafiche e preventivi nascono al banco.",
  },
  {
    src: "/images/digitale/prodotto-ddt.jpg",
    alt: "Pila di DDT, timbro, penna e scanner su tavolo scuro",
    caption: "Documenti",
    nota: "Quello che oggi si copia a mano. Automazione vuol dire questo mucchio.",
  },
] as const;

export const SERVIZI = [
  {
    code: "01",
    titolo: "Gestionali su misura",
    testo: "Anagrafiche, DDT, preventivi, magazzino. Attorno a come lavorate già — Access, Excel, carta — senza stravolgere il banco.",
    foto: "/images/digitale/prodotto-ddt.jpg",
    fotoAlt: "Pila di documenti di consegna, timbro e scanner",
  },
  {
    code: "02",
    titolo: "Automazione",
    testo: "I documenti si compilano da soli. I dati passano da un programma all'altro, senza copia-incolla. Dal preventivo alla consegna si vede dove sono.",
    foto: "/images/digitale/prodotto-attrezzi.jpg",
    fotoAlt: "Attrezzi da banco: morsa, martello, chiodi",
  },
  {
    code: "03",
    titolo: "Siti",
    testo: "Vetrina, area riservata, moduli. Veloci, vostri. Nessun abbonamento nascosto.",
    foto: "/images/digitale/prodotto-olio.jpg",
    fotoAlt: "Bottiglie d'olio extravergine in still life",
  },
  {
    code: "04",
    titolo: "Assistenti AI",
    testo: "Chat, smistamento documenti, formazione al team. Stesso approccio del Lab, calato in magazzino e ufficio.",
    foto: "/images/digitale/prodotto-hero.jpg",
    fotoAlt: "Bottiglia d'olio e crinale dei Lepini",
  },
] as const;

export const METODO = [
  {
    titolo: "Ascolto",
    testo: "Chi fa cosa, con quali documenti, dove si perde tempo.",
  },
  {
    titolo: "Prototipo",
    testo: "In pochi giorni uno strumento da provare con i vostri dati. Non una presentazione.",
  },
  {
    titolo: "Consegna",
    testo: "Resta vostro. Funziona anche senza un abbonamento che scade.",
  },
  {
    titolo: "Affiancamento",
    testo: "Si usa insieme, si aggiusta. Formazione al team, non un PDF di ottanta pagine.",
  },
] as const;
