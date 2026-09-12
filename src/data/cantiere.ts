export type Stato = "fatto" | "base" | "manca";

export const CANTIERE_TECH: { voce: string; stato: Stato; nota: string }[] = [
  { voce: "Dati strutturati (26 comuni, sentieri, specie, eventi)", stato: "fatto", nota: "JSON TypeScript, una fonte, niente copia-incolla in pagina." },
  { voce: "Schede comune con slug stabile", stato: "fatto", nota: "URL /comuni/montelanico pronto per montilepini.it." },
  { voce: "SEO on-page: title, description, JSON-LD", stato: "base", nota: "Ogni scheda ha meta e TouristDestination. Manca canonical sul dominio vero." },
  { voce: "Mappa schematica del comprensorio", stato: "fatto", nota: "Proiezione lat/lng, non una cartografia CAI." },
  { voce: "Meteo Open-Meteo sul centro catena", stato: "fatto", nota: "Senza chiave, senza tracking. Fallback se la rete manca." },
  { voce: "Mobile, contrasto, reduced-motion, skip-link", stato: "base", nota: "Da verificare in campo; target 44px." },
  { voce: "Niente cookie di profilazione", stato: "fatto", nota: "Allineato al claim del .com." },
  { voce: "Dominio montilepini.it + lepinidigital.it", stato: "manca", nota: "Oggi si pubblica su questo preview. I DNS vanno registrati." },
  { voce: "Foto originali, peso < 120 KB, alt veri", stato: "base", nota: "23/26 comuni e 119 schede specie ripresi dal Portale originale, compressi. Mancano Giuliano, Sgurgola, Villa S. Stefano. Non è ancora un archivio fotografico proprio." },
  { voce: "GPX dei sentieri", stato: "manca", nota: "Non si inventano tracciati. In Lab c'è un modello schematico drappeggiato; il GPX va chiesto a CAI / Compagnia." },
  { voce: "Calendario eventi in tempo reale", stato: "manca", nota: "Strato DMO / Compagnia, non da duplicare a mano." },
  { voce: "Inglese", stato: "manca", nota: "VisitLazio ce l'ha. In campagna vale 4.000 €: farlo dopo il dominio." },
  { voce: "Lepini Lab 3D (volo, faggeta, biosfera)", stato: "fatto", nota: "WebGL, shader crepuscolare, 26 nodi, WASD, reduced-motion. Non è un parco-gioco: è il laboratorio." },
  { voce: "Pagina Lepini Digital (B2B)", stato: "fatto", nota: "Landing gestionali / automazione / siti. Mail dal .com. Niente P.IVA inventata." },
];

export const CANTIERE_CONTENUTI: { voce: string; stato: Stato; nota: string }[] = [
  { voce: "Non livellare i 26 comuni", stato: "fatto", nota: "Sermoneta è Bandiera Arancione; Gorga è un osservatorio. Il testo lo dice." },
  { voce: "Nomi scientifici in natura", stato: "base", nota: "Oltre 120 schede con foto dal Portale originale. Non è ancora la lista firmata delle ~50 orchidee / 168 uccelli." },
  { voce: "Sentieri con codice CAI vero", stato: "base", nota: "701, 702, 736 da Compagnia. Gli altri sono itinerari, non numeri inventati." },
  { voce: "Fonti in chiaro", stato: "fatto", nota: "Ogni sentiero e ogni evento ha una nota di verifica." },
  { voce: "Memoria civile (Roccagorga 1913)", stato: "fatto", nota: "Un portale territoriale non è solo turismo." },
  { voce: "Dove dormire / frantoi / agriturismi", stato: "manca", nota: "Va costruito con DMO e imprese, scheda per scheda, consenso alla pubblicazione." },
  { voce: "Popolazione ISTAT aggiornata", stato: "manca", nota: "Oggi stime da schede esistenti. Sostituire con dato anno." },
  { voce: "Partnership, non concorrenza", stato: "base", nota: "Pagina Imprese e footer linkano Compagnia, DMO, CM, VisitLazio, TCI." },
];

export const PRINCIPI = [
  "Un comune, uno slug, un oggetto. Niente pagine generate da un testo unico.",
  "Non si inventano numeri CAI, date di sagre, P.IVA, orchidee specie per specie.",
  "Il Portale è lo strato dati. Eventi e booking restano a chi già li fa.",
  "I sette borghi da cartolina non rappresentano i 26. Il dataset è il manifesto.",
  "Fotografie originali quando ci sono; fino ad allora niente Wikimedia da 600 KB.",
  "Italiano prima. Inglese dopo il dominio.",
];
