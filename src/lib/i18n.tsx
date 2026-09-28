import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "it" | "en";

const KEY = "lepini-lang";

const EN: Record<string, string> = {
  "Salta al contenuto": "Skip to content",
  Menu: "Menu",
  Comuni: "Towns",
  Parco: "Park",
  Natura: "Nature",
  Sentieri: "Trails",
  Lab: "Lab",
  Calendario: "Calendar",
  Digital: "Digital",
  "Portale del comprensorio": "District portal",
  "Enciclopedia digitale del comprensorio": "Digital encyclopaedia of the district",
  "Un progetto di": "A project by",
  "Il Portale": "The Portal",
  "Non sostituisce": "Does not replace",
  "Progetto indipendente, senza pubblicità. Dati in costruzione: le popolazioni sono stime da verificare con ISTAT.":
    "Independent project, no advertising. Data still being built: populations are estimates to check against ISTAT.",
  "Questo sito non usa cookie di profilazione.": "This site does not use tracking cookies.",
  "Costruito a Montelanico (RM) da Lepini Digital · 26 comuni · Latina, Roma, Frosinone":
    "Built in Montelanico (RM) by Lepini Digital · 26 towns · Latina, Rome, Frosinone",
  "Crinale calcareo dei Monti Lepini": "Limestone ridge of the Monti Lepini",
  "26 borghi.": "26 villages.",
  "Un solo comprensorio.": "One district.",
  "Schede dei 26 comuni, sentieri numerati, natura e imprese. Senza pubblicità. Un progetto di Lepini Digital.":
    "Sheets for the 26 towns, numbered trails, nature and local businesses. No ads. A Lepini Digital project.",
  "Esplora il parco": "Explore the park",
  "26 comuni": "26 towns",
  "Comuni in un dataset": "Towns in one dataset",
  "Bandiere Arancioni TCI": "TCI Orange Flags",
  "Itinerari in scheda": "Routes on file",
  "Questo mese": "This month",
  "Calendario stagionale": "Seasonal calendar",
  "Cosa non siamo": "What we are not",
  "Non sostituiamo Compagnia dei Lepini, la DMO o VisitLazio. Loro hanno eventi, soci, sentieri in PDF. Qui stanno le schede dei 26. Il resto si linka, non si copia.":
    "We do not replace Compagnia dei Lepini, the DMO or VisitLazio. They have events, members, trails as PDFs. Here are the sheets for the 26. The rest is linked, not copied.",
  "Il territorio": "The district",
  "I 26, non i sette da cartolina": "The 26, not the seven postcard villages",
  "Elenco completo": "Full list",
  "Sentieri con fonte": "Trails with a source",
  "CAI 701, 702, 736 dalla Compagnia. Nessun numero inventato.":
    "CAI 701, 702, 736 from the Compagnia. No invented numbers.",
  "Natura con nome": "Nature with a name",
  "Fagus sylvatica, non «bosco». Le ~50 orchidee restano da schedare con un botanico.":
    "Fagus sylvatica, not “a wood”. The ~50 orchids still need a botanist’s sheets.",
  "Trama, volo, faggeta, biosfera. Il crinale come modello, non come foto.":
    "Mesh, flight, beechwood, biosphere. The ridge as a model, not a photo.",
  Gennaio: "January",
  Febbraio: "February",
  Marzo: "March",
  Aprile: "April",
  Maggio: "May",
  Giugno: "June",
  Luglio: "July",
  Agosto: "August",
  Settembre: "September",
  Ottobre: "October",
  Novembre: "November",
  Dicembre: "December",
  "Faggeta spoglia, traccia di ungulati": "Bare beechwood, ungulate tracks",
  "Borghi e musei, vette solo con esperienza": "Villages and museums; summits only if you know them",
  "Prime orchidee precoci in gariga": "First early orchids on the garrigue",
  "Cori, Segni, mura al sole": "Cori, Segni, walls in the sun",
  "Risveglio della macchia": "The maquis waking up",
  "Anelli bassi, 736 se asciutto": "Low loops; 736 if the ground is dry",
  "Picco orchidee": "Orchid peak",
  "Faggeta e Lupone": "Beechwood and Lupone",
  "Faggio in foglia, biancone": "Beech in leaf, short-toed eagle",
  "Semprevisa, 701 e 702": "Semprevisa, 701 and 702",
  "Fioriture d'altitudine": "High-altitude flowers",
  "Partenze all'alba": "Start at dawn",
  "Cicale, avifauna termofila": "Cicadas, heat-loving birds",
  "Vette e anelli d'ombra, evitare ore centrali": "Summits and shaded loops; skip the middle of the day",
  "Faggeta secca, rischio incendio": "Dry beechwood, fire risk",
  "Crinale presto, borghi la sera": "Ridge early, villages in the evening",
  "Fogliame che vira, migratori": "Turning leaves, migrants",
  "Tutto il crinale": "The whole ridge",
  "Faggio rame, funghi (certificare)": "Copper beech, mushrooms (get them checked)",
  "Semprevisa e Pian della Faggeta": "Semprevisa and Pian della Faggeta",
  "Leccio sempreverde in evidenza": "Holm oak stands out",
  "Fossanova, musei, Etnomuseo": "Fossanova, museums, Ethnographic museum",
  "Silenzio, cinghiali in alimentazione": "Quiet, wild boar feeding",
  "Sermoneta, Priverno, Presepi. Vette solo se esperte": "Sermoneta, Priverno, nativity scenes. Summits only if experienced",
  "I 26, in trama": "The 26, on the mesh",
  "Cerca": "Search",
  "Nome, tag, headline": "Name, tag, headline",
  Provincia: "Province",
  Tutti: "All",
  "Bandiera Arancione": "Orange Flag",
  "Nessun comune con questi filtri.": "No town matches these filters.",
  abitanti: "residents",
  "Abitanti (stima)": "Residents (estimate)",
  Patrono: "Patron saint",
  "Festa patronale": "Patronal feast",
  "Comunità montana": "Mountain community",
  "Bandiera Arancione TCI": "TCI Orange Flag",
  "m s.l.m.": "m a.s.l.",
  "Il schedario vivo": "The living index",
  "Vetta": "Summit",
  "In Lab la biosfera usa le stesse schede.": "In the Lab, Biosphere uses the same sheets.",
  Tutte: "All",
  Flora: "Flora",
  Fauna: "Fauna",
  Orchidee: "Orchids",
  "Macchia e gariga": "Maquis and garrigue",
  "Versante pontino, caldo e ventoso. Leccio, fillirea, lentisco, orchidee delle garighe. È il Lepino che si vede dalla piana: non un muro verde, una pelle mediterranea.":
    "Pontine side, hot and windy. Holm oak, phillyrea, mastic, garrigue orchids. This is the Lepini you see from the plain: not a green wall, a Mediterranean skin.",
  "Querceti e cerrete": "Oak and turkey-oak woods",
  "Fascia di mezzo. Cerro, roverella, carpino. Montelanico prende il nome da qui. Boschi di lavoro, non solo di panorama: tartufi, farinata, legna.":
    "The middle belt. Turkey oak, downy oak, hornbeam. Montelanico takes its name from here. Working woods, not just a view: truffles, farinata, firewood.",
  Faggete: "Beechwoods",
  "Sopra i 900–1000 m, Pian della Faggeta e crinali. Fagus sylvatica, suoli carsici, ombra d'estate. Habitat del picchio nero. Fragile: restare sui sentieri.":
    "Above 900–1000 m, Pian della Faggeta and the ridges. Fagus sylvatica, karst soils, summer shade. Habitat of the black woodpecker. Fragile: stay on the paths.",
  Carsismo: "Karst",
  "Doline, inghiottitoi, grotte, risorgive. L'acqua dei Lepini sparisce e rinasce. Non è un parco speleologico attrezzato: le grotte non si improvvisano.":
    "Dolines, sinkholes, caves, springs. Lepini water vanishes and comes back. This is not a equipped show-cave park: you do not improvise underground.",
  "Il parco che non c’è.": "The park that isn’t there.",
  "E il crinale che sì.": "And the ridge that is.",
  "Il «Parco dei Monti Lepini» è una proposta che dura da cinquant’anni. Ciò che esiste, e si può camminare, è la Zona di Protezione Speciale e i siti Natura 2000 sul crinale.":
    "The “Parco dei Monti Lepini” has been a proposal for fifty years. What exists, and can be walked, is the Special Protection Area and the Natura 2000 sites on the ridge.",
  "Esplora in Lab": "Explore in the Lab",
  "Schedario flora e fauna": "Flora and fauna index",
  "Codice ZPS": "SPA code",
  Estensione: "Extent",
  "Misure di conservazione": "Conservation measures",
  "Camminare con una fonte": "Walk with a source",
  "Compagnia dei Lepini ha già i PDF dei sentieri numerati. Qui non si ricopia la carta: si dà una scheda orientativa e si rimanda alla fonte. Nessun GPX inventato.":
    "Compagnia dei Lepini already has the PDFs of the numbered trails. Here the map is not copied: there is an orientation sheet, and a link back to the source. No invented GPX.",
  "Sul crinale c'è un modello 3D schematico": "On the ridge there is a schematic 3D model",
  "delle stesse schede.": "of the same sheets.",
  Itinerario: "Route",
  "Ritmi, non un feed": "Rhythms, not a feed",
  "Le date puntuali di sagre e concerti le pubblica già": "Exact dates of festivals and concerts are already published by",
  "e": "and",
  "Qui teniamo i fenomeni ricorrenti, con nota di verifica. Copiare il calendario altrui è il modo più veloce per farlo morire.":
    "Here we keep the recurring patterns, with a note on what still needs checking. Copying someone else’s calendar is the fastest way to kill it.",
  festa: "feast",
  natura: "nature",
  cultura: "culture",
  enogastro: "food & wine",
  medievale: "medieval",
  archeologia: "archaeology",
  castello: "castle",
  volsci: "Volsci",
  abbazia: "abbey",
  carsismo: "karst",
  olio: "olive oil",
  vino: "wine",
  lento: "slow",
  "Lepini Lab · Lepini Digital": "Lepini Lab · Lepini Digital",
  "I progetti del laboratorio.": "The laboratory’s projects.",
  "Il Portale è uno. Accanto ci sono lavori che non gli appartengono: si aprono da soli, con una scheda propria.":
    "The Portal is one of them. Beside it are jobs that don’t belong to it: they open on their own, with their own card.",
  Progetti: "Projects",
  Lavori: "Work",
  "Consegnati, online.": "Delivered, online.",
  "Un elenco. Il prossimo cliente entra qui, con la sua scheda.":
    "One list. The next client goes here, with their own page.",
  "Apri la scheda": "Open the page",
  "Cinque lavori, non un solo sito.": "Five pieces of work, not one site.",
  "Sei lavori, non un solo sito.": "Six pieces of work, not one site.",
  "01 · Portale": "01 · Portal",
  "Portale dei Monti Lepini": "Monti Lepini Portal",
  "Comuni, specie e sentieri. Queste app stanno dentro il Portale: leggono le stesse schede.":
    "Towns, species and trails. These apps live inside the Portal: they read the same sheets.",
  "Apri il Portale": "Open the Portal",
  "Le app del Portale": "The Portal’s apps",
  "Chiudi le app": "Close the apps",
  "I 26 comuni sul rilievo.": "The 26 towns on the relief.",
  "Sopra il massiccio, verso un borgo.": "Over the massif, toward a village.",
  "701, 702, 736 sul rilievo vero.": "701, 702, 736 on the real relief.",
  "Flora e fauna, le schede natura.": "Flora and fauna, the nature sheets.",
  "Tra i faggi, fino al picchio nero.": "Among the beeches, as far as the black woodpecker.",
  "ZPS e siti Natura 2000.": "SPA and Natura 2000 sites.",
  "Leccio e nocciolo, poi la scheda.": "Holm oak and hazel, then the sheet.",
  "I 26 nodi, orbite e popolazione.": "The 26 nodes, orbits and population.",
  "02 · A parte": "02 · Standalone",
  "03 · A parte": "03 · Standalone",
  "04 · A parte": "04 · Standalone",
  "05 · A parte": "05 · Standalone",
  "06 · A parte": "06 · Standalone",
  "Tetto, muri, materiali, listino e PDF. Per chi fa i conti in cantiere.":
    "Roof, walls, materials, price list and PDF. For the people doing the sums on site.",
  "Travi, pannelli e distinta d’acquisto. Non è un’app del Portale: è un progetto suo, per chi lavora il legno.":
    "Beams, panels and a shopping list. Not a Portal app: its own project, for people who work wood.",
  "Volo sul rilievo reale, satellite e strade. Si può restare sui Lepini o cambiare zona.":
    "Flight over the real relief, satellite and roads. Stay on the Lepini, or change area.",
  "Tetto, stanza, muro o porticato. Planimetria, listino e preventivo. Non fa parte del Portale.":
    "Roof, room, wall or portico. Plan, price list and quote. Not part of the Portal.",
  "Si salta sui mattoncini, si seguono i tesori e si apre il mondo dopo. Non fa parte del Portale.":
    "Jump the blocks, follow the treasures, then the world opens. Not part of the Portal.",
  "Un gioco fatto qui. Si salta, si cercano i tesori.": "A game made here. You jump, you look for the treasures.",
  "Gondole con telecamere e LED nei porta-prezzi. Si gira il modello, esce la distinta. Non fa parte del Portale.":
    "Gondolas with cameras and LEDs in the price rails. Spin the model, get the bill of materials. Not part of the Portal.",
  "Due gondole, un cappello tecnico, le telecamere che guardano il fronte di fronte. Tutto arriva al rack. In cassa, l’iMac mostra le zone sotto soglia.":
    "Two gondolas, a technical cap, cameras looking at the facing run. Everything meets at the rack. At the till, the iMac shows the zones under the threshold.",
  "Apri il modello": "Open the model",
  "Cassa, dati di esempio": "Till, sample data",
  "Corsia piena": "Full aisle",
  "Sotto soglia": "Under the threshold",
  "Negozio e rack": "Shop and rack",
  "Per i genitori": "For parents",
  "Apri il gioco": "Open the game",
  "Costruito da Lepini Digital.": "Built by Lepini Digital.",
  Area: "Area",
  Portale: "Portal",
  Contenuti: "Work",
  Metodo: "Method",
  Contatti: "Contact",
  Genitori: "Parents",
  Parliamone: "Let’s talk",
  "Lo studio per chi vende.": "The studio for people who sell.",
  "Immagini, video, strumenti.": "Images, video, tools.",
  "Foto del prodotto, marchio, clip brevi. File pronti per sito, social e catalogo.":
    "Product photos, a mark, short clips. Files ready for the site, social and the catalogue.",
  "Il lavoro è già qui.": "The work is already here.",
  "Cosa facciamo": "What we do",
  Immagini: "Images",
  "Prodotto, marchio, catalogo. File pronti.": "Product, mark, catalogue. Files ready.",
  Video: "Video",
  "Clip brevi per scheda, social e vetrina.": "Short clips for the product sheet, social and the shop window.",
  Strumenti: "Tools",
  "Gestionale solo se serve al banco.": "Back-office only if the counter needs it.",
  "Foto, video e marchio, pronti da pubblicare": "Photos, video and a mark, ready to publish",
  "Per olio, ferramenta, legno, bottega. Si parte dalle vostre foto e dal vostro nome. L'intelligenza artificiale accelera. Una persona controlla prima che qualcosa esca.":
    "For oil, hardware, timber, the shop. We start from your photos and your name. AI speeds the work. A person checks before anything goes out.",
  Ideazione: "Ideation",
  "Concept del marchio e delle immagini, prima di stampare o mettere online. Si parte da cosa fate voi, non da un modello uguale per tutti.":
    "The idea for the mark and the images, before print or the web. We start from what you do, not from a template used for everyone.",
  Valorizzazione: "Finishing",
  "Le foto che avete già — prodotto, banco, bottega — si sistemano e si mettono in una scena pulita. Meno giorni di set. Il pezzo resta quello vero.":
    "The photos you already have — product, counter, shop — are cleaned and set in a clear scene. Fewer days on set. The object stays the real one.",
  "Clip brevi per Instagram, scheda prodotto e vetrina. Niente spot. Qualcosa che si pubblica questa settimana.":
    "Short clips for Instagram, the product sheet and the window. Not a commercial. Something you can publish this week.",
  "Non inventiamo il prodotto. Se deve vedersi com'è, resta la foto vera.":
    "We don’t invent the product. If it has to look like itself, the real photo stays.",
  "Dove finiscono": "Where they end up",
  "Schede prodotto": "Product sheets",
  "Negozio online e listino: la foto giusta accanto al nome giusto.":
    "Online shop and price list: the right photo next to the right name.",
  "Volantini e campagne": "Leaflets and campaigns",
  "Un'immagine che sta su un foglio A4 e su un annuncio.": "An image that works on an A4 sheet and in an ad.",
  Social: "Social",
  "Storie e post con lo stesso segno, senza rifare tutto ogni volta.":
    "Stories and posts with the same mark, without remaking everything each time.",
  Marchio: "Mark",
  "Un artigiano riconoscibile, anche fuori dalla valle.": "A maker you recognise, even outside the valley.",
  Catalogo: "Catalogue",
  "Pagine per la stampa, non solo per lo schermo.": "Pages for print, not only for the screen.",
  "Come si fa": "How it’s done",
  "Quattro passaggi, poi i file": "Four steps, then the files",
  "Il mestiere": "The trade",
  "Chi compra e cosa deve vedersi. Si guarda il banco, non una cartella di esempi generici.":
    "Who buys, and what they must see. We look at the counter, not a folder of generic examples.",
  "Le prove": "The proofs",
  "Bozze di immagini e video. Voi dite sì o no, prima di andare avanti.":
    "Drafts of images and video. You say yes or no before we go on.",
  "I formati": "The formats",
  "Sito, storia, volantino, catalogo. Lo stesso pezzo, le misure giuste.":
    "Site, story, leaflet, catalogue. The same piece, the right sizes.",
  "I file": "The files",
  "Consegnati e pronti. Li usate voi, senza un altro passaggio.": "Delivered and ready. You use them, with no extra step.",
  "Quattro lavori, misurabili": "Four jobs, measurable",
  "Canone o commessa. Per ferramenta, magazzini edili, artigiani e negozi. L'intelligenza artificiale cerca e risponde: prezzi, scorte e sconti restano calcoli precisi.":
    "Retainer or a job. For hardware shops, builders’ yards, makers and stores. AI searches and answers: prices, stock and discounts stay exact sums.",
  "Continuità dei dati": "Data that continues",
  "Portiamo dentro file Excel, fogli cartacei e vecchi database. Nessun cliente ricomincia da zero. Lo storico resta, completo.":
    "We bring in Excel files, paper sheets and old databases. No client starts from zero. The history stays, complete.",
  "Gestionali snelli": "Lean back-office",
  "Giacenze, ordini fornitore, DDT, preventivi. Solo quello che serve. Sul PC del banco e sul telefono o tablet in cantiere.":
    "Stock, supplier orders, delivery notes, quotes. Only what you need. On the counter PC and on the phone or tablet on site.",
  "Automazione di processo": "Process automation",
  "Margini e sconti cliente calcolati dal programma. Preventivi e documenti di trasporto in PDF, subito. Zero ricopiatura, zero errori di trascrizione.":
    "Margins and customer discounts calculated by the program. Quotes and delivery notes as PDF, at once. No retyping, no transcription errors.",
  "Sito e assistente": "Site and assistant",
  "Sito veloce, senza cookie e senza traccianti. Assistente che risponde solo su catalogo, orari e dati vostri. Non inventa prezzi.":
    "A fast site, no cookies, no trackers. An assistant that answers only from your catalogue, hours and data. It does not invent prices.",
  "Come lavoriamo": "How we work",
  "Prima i vostri fogli, poi il programma": "Your sheets first, then the program",
  "Partiamo da quello che già usate. Se non entra lo storico, non si parte.":
    "We start from what you already use. If the history doesn’t come in, we don’t start.",
  "I fogli": "The sheets",
  "Prima si vede cosa avete già: Excel, quaderni, gestionale vecchio. Se lo storico non entra, si ferma tutto.":
    "First we see what you already have: Excel, notebooks, an old system. If the history doesn’t come in, everything stops.",
  "Il banco": "The counter",
  "Si prova con i vostri articoli, i vostri sconti, i vostri clienti. Al banco e in cantiere, non in una slide.":
    "We try it with your items, your discounts, your customers. At the counter and on site, not in a slide.",
  "I conti": "The numbers",
  "Prezzi, giacenze, margini: regole fisse. L'assistente cerca e risponde. Non tocca i numeri.":
    "Prices, stock, margins: fixed rules. The assistant searches and answers. It does not touch the numbers.",
  "Il canone": "The retainer",
  "Commessa o canone, strumenti che restano usabili. Si aggiusta con chi sta al banco, tutte le età.":
    "A job or a retainer, tools that stay usable. Adjusted with the person at the counter, any age.",
  "Lepini Lab, a parte": "Lepini Lab, separate",
  "Il Portale e il Lab non sono il prodotto": "The Portal and the Lab are not the product",
  "Sono ricerca territoriale open data sui 26 comuni. Servono a far vedere come lavoriamo. L'attività commerciale è un'altra: gestionali, dati, automazione, siti per le imprese.":
    "They are open-data research on the 26 towns. They show how we work. The commercial work is something else: systems, data, automation, sites for businesses.",
  "Lepini Digital è l'attività commerciale a Montelanico. Lepini Lab è il laboratorio open data dei 26 comuni. Due cose distinte.":
    "Lepini Digital is the commercial studio in Montelanico. Lepini Lab is the open-data laboratory of the 26 towns. Two separate things.",
  "Vista scura": "Dark view",
  "Quante ore perdete a ricopiare?": "How many hours do you lose retyping?",
  "Giacenze, preventivi, DDT, listini sul telefono. Scriveteci. Alla prima chiacchierata capiamo se i vostri fogli si possono portare dentro senza ricominciare.":
    "Stock, quotes, delivery notes, price lists on the phone. Write to us. In the first conversation we see whether your sheets can come in without starting over.",
  "La prima volta è senza impegno": "The first conversation is without obligation",
  Nome: "Name",
  Azienda: "Business",
  "Come ti chiami": "Your name",
  "Frantoio, ferramenta, magazzino…": "Oil mill, hardware shop, warehouse…",
  "Il salto": "The jump",
  "Identità, mercati, passaggio, o un processo che vi frena.":
    "Identity, markets, succession, or a process that slows you down.",
  "Si apre la tua posta. Niente iscrizione.": "It opens your mail. No signup.",
  Esempio: "Example",
  "Il gestionale, al banco.": "The back-office, at the counter.",
  "Dati di prova, non di un cliente. Giacenze, preventivo e DDT escono dagli stessi articoli. Lo sconto e l'IVA li calcola il programma.":
    "Sample data, not a client’s. Stock, quote and delivery note come from the same items. The program calculates the discount and VAT.",
  "Ferramenta esempio · banco": "Sample hardware shop · counter",
  Giacenze: "Stock",
  Preventivo: "Quote",
  Codice: "Code",
  Articolo: "Item",
  Giacenza: "On hand",
  Prezzo: "Price",
  "sotto scorta": "below minimum",
  Qtà: "Qty",
  Riga: "Line",
  Scorri: "Scroll",
  "Cosa si consegna": "What gets delivered",
  "Dal furgone alla mail.": "From the van to the email.",
  "Le schede restano in pagina. Si scorrono di lato.": "The cards stay on the page. Scroll them sideways.",
  "La pagina va avanti solo quando le schede sono finite.": "The page moves on only when the cards are finished.",
  Indietro: "Back",
  Avanti: "Next",
  Furgone: "Van",
  Biglietti: "Cards",
  "Carta intestata": "Letterhead",
  Gestionale: "Back-office",
  "Menu e banco": "Menu and counter",
  "Vela e Instagram": "Flag and Instagram",
  "Clienti e mail": "Customers and mail",
  Preventivi: "Quotes",
  Oggetti: "Objects",
  Insegna: "Sign",
  Fotografia: "Photography",
  Servizi: "Services",
  Studio: "Studio",
  "Solo Bandiere Arancioni TCI": "TCI Orange Flags only",
  comuni: "towns",
  "Non tutti sono Bandiere Arancioni: il filtro TCI esiste perché il Touring ha già scelto, non perché gli altri non contino.":
    "Not all of them are Orange Flags: the TCI filter exists because the Touring Club already chose, not because the others don’t count.",
  "Dal Portale al Lab": "From the Portal to the Lab",
  "Due schede, lo stesso dataset": "Two views, the same dataset",
  "I 26 comuni non stanno solo in elenco. In Lab la trama li tiene insieme; la biosfera tiene le specie segnalate sulle schede.":
    "The 26 towns are not only a list. In the Lab the mesh holds them together; Biosphere holds the species noted on the sheets.",
  "I 26 borghi come nodi di una sola rete. Demografia, orbite, geografia: ogni punto apre la scheda del Portale.":
    "The 26 villages as nodes of one network. Demography, orbits, geography: each point opens the Portal sheet.",
  "Flora e fauna dello stesso schedario. Orbite o diagramma, filtri per strato: alberi, insetti, uccelli.":
    "Flora and fauna from the same index. Orbits or a diagram, filters by layer: trees, insects, birds.",
};

export const COMUNE_EN: Record<string, { headline: string; sommario: string; note?: string }> = {
  sermoneta: {
    headline: "The village of Castello Caetani",
    sommario:
      "A medieval jewel on the Pontine slope, dominated by Castello Caetani. The Gardens of Ninfa are a few kilometres away. TCI Orange Flag since 2006: the Lepini town with the most structured welcome.",
  },
  cori: {
    headline: "Roman temples and Volscian origins",
    sommario:
      "One of the oldest centres in Lazio. The Temple of Hercules and the Temple of the Dioscuri are still visible in the town. Starting point toward Monte Lupone (CAI trail 701).",
  },
  norma: {
    headline: "Above ancient Norba, the little Pompeii of the Lepini",
    sommario:
      "The modern town stands beside the ruins of Norba, a Latin colony of the 5th century BC. Polygonal walls and the acropolis look over the plain and Ninfa. Archaeology and a view in the same glance.",
  },
  bassiano: {
    headline: "The round village under Semprevisa",
    sommario:
      "A circular plan unique in Lazio, TCI Orange Flag. The natural base for Pian della Faggeta and the summit of Semprevisa (1,536 m), the highest of the Lepini.",
  },
  maenza: {
    headline: "Castle and olive trees above the Pontine plain",
    sommario:
      "A medieval village with the baronial castle and a front of ancient olive trees. Cherries and oil tie it to the Lepini food network.",
  },
  priverno: {
    headline: "Fossanova and the legacy of Thomas Aquinas",
    sommario:
      "A Volscian city, now the commercial and cultural centre of the district. The Cistercian abbey of Fossanova, where Thomas died in 1274, holds an Orange Flag as a hamlet. Seat of Compagnia dei Lepini.",
    note: "The Orange Flag is recognised for the hamlet of Fossanova.",
  },
  prossedi: {
    headline: "Quiet, figs and a castle",
    sommario:
      "Among the smallest and most intact towns. TCI Orange Flag. Figs of Prossedi, open landscapes, a slow pace. Not a shop window: a village to visit without hurry.",
  },
  "rocca-massima": {
    headline: "The roof of the Lepini above the plain",
    sommario:
      "At 822 metres it is the highest village on the Pontine side. A 360° view. CAI trail 736, called Flying in the Sky, starts here.",
  },
  roccagorga: {
    headline: "Memory of 1913, olive groves and springs",
    sommario:
      "Known for the massacre of 6 January 1913, it keeps a social memory rare on tourist sites. Ethnographic Museum of the Monti Lepini. A land of olive groves and water.",
  },
  "roccasecca-dei-volsci": {
    headline: "A small Volscian village, landscapes intact",
    sommario:
      "One of the quietest towns. Volscian origins, farming, slow tourism. No national brand: it should be told as it is, not levelled with the larger towns.",
  },
  sezze: {
    headline: "Ancient Setia: wine, oil, a Roman city",
    sommario:
      "The most populated centre of the Lepini. Roman origins (Setia), Cesanese, oil, artichoke. Museum of the Roman city. Not a postcard village: a working city looking at the plain.",
  },
  sonnino: {
    headline: "Fra Diavolo, legends and the ridge",
    sommario:
      "Home of the bandit Michele Pezza, called Fra Diavolo. An authentic historic centre, harsh landscapes toward the Ausoni. A strong farming identity, often missing from national catalogues.",
  },
  artena: {
    headline: "A cliff village at the gates of Rome",
    sommario:
      "In the metropolitan city of Rome, at the foot of the Lepini. Medieval centre, caves, karst. A bridge between the capital and the district: often the first Lepini town you meet coming from south-east of Rome.",
  },
  "carpineto-romano": {
    headline: "The town of Leo XIII, under Semprevisa",
    sommario:
      "Home of Vincenzo Gioacchino Pecci, Pope Leo XIII (1810). Palazzo Pecci, churches, beechwoods. The inner side of the chain, looking onto the Sacco valley.",
  },
  gorga: {
    headline: "The smallest village, between sky and ridge",
    sommario:
      "Fewer than a thousand residents, 822 metres. Among the most intact. No structured tourist flow: an observatory on the ridge, to be treated with respect, not as an attraction.",
  },
  montelanico: {
    headline: "Farinata, woods, home of the Portal",
    sommario:
      "The village of farinata and of turkey-oak and hornbeam woods. Lepini Digital and this portal start here. Badlands, a food identity, a hinge between the two slopes.",
  },
  segni: {
    headline: "Signia: cyclopean walls of the Volsci",
    sommario:
      "A Volscian city with polygonal walls of the 6th–5th century BC. The monumental gate and the acropolis are still visible. Campo di Segni is the start of CAI 702 to Monte Lupone.",
  },
  amaseno: {
    headline: "River valley, sanctuary, Ciociaro dress",
    sommario:
      "At the foot of the southern Lepini, toward the Ausoni. Sanctuary of the Madonna di Canneto, the river Amaseno, the tradition of costume. A natural bridge to the Frosinone side.",
  },
  "castro-dei-volsci": {
    headline: "The Lepini–Ausoni border, Orange Flag",
    sommario:
      "Volscian origin, oil and wine, a crossroads of cultures. TCI Orange Flag. It sits on the edge of the district: it stays in the story, not cut because “it’s already Ciociaria”.",
  },
  "giuliano-di-roma": {
    headline: "Olive trees and quiet on the southern slope",
    sommario:
      "A small town between the Lepini and the Ausoni. Olive groves, pasture, no tourist overexposure. Useful as a slow stop between Priverno and Ciociaria.",
  },
  morolo: {
    headline: "Dried figs and the Sacco valley",
    sommario:
      "At the foot of the inner slope. Dried figs, farming traditions. It looks at the Sacco valley, not the Pontine plain: the Lepini “on this side of the ridge”.",
  },
  patrica: {
    headline: "Monte Cacume and the inner ridge",
    sommario:
      "Under the profile of Monte Cacume. Trails toward the inside of the chain, oil, a mountain community. A link among the towns on the Frosinone side.",
  },
  sgurgola: {
    headline: "Inner slope, between Anagni and the woods",
    sommario:
      "It looks toward the valley of Anagni. A history tied to the papacy and to Ciociaria, woods toward Gorga and Carpineto. A Lepini town that speaks more with the Sacco valley than with Latina.",
  },
  supino: {
    headline: "Between ridge and valley, oil and work",
    sommario:
      "A middle town: neither a postcard village nor a city. Oil, craft, access to the trails. It stands for everyday Lepini, the one digital tools should serve businesses for, not only tourists.",
  },
  vallecorsa: {
    headline: "Southern edge, memory and stone",
    sommario:
      "The far south-east of the Lepini story, toward the Ausoni. Stone, oil, twentieth-century memory. It stays inside the perimeter: the district does not end at Priverno.",
  },
  "villa-santo-stefano": {
    headline: "Rural Ciociaria, agricultural quiet",
    sommario:
      "A farming town on the eastern edge. Few tourist pages, a lot of countryside. In the dataset because the Portal tells the whole district, not only the seven postcard villages.",
  },
};

const Ctx = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: "it",
  setLang: () => {},
});

export function translate(lang: Lang, it: string) {
  if (lang !== "en") return it;
  return EN[it] ?? it;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("it");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === "en" || saved === "it") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem(KEY, lang);
  }, [lang]);

  return <Ctx.Provider value={{ lang, setLang: setLangState }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  return useContext(Ctx);
}

export function useT() {
  const { lang } = useI18n();
  return (it: string) => translate(lang, it);
}

export function useComuneCopy(slug: string, headline: string, sommario: string, note?: string) {
  const { lang } = useI18n();
  if (lang !== "en") return { headline, sommario, note };
  const en = COMUNE_EN[slug];
  return {
    headline: en?.headline ?? headline,
    sommario: en?.sommario ?? sommario,
    note: en?.note ?? note,
  };
}

export function LangToggle({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { lang, setLang } = useI18n();
  const idle = tone === "light" ? "text-cream/70 hover:text-cream" : "text-ink-soft hover:text-ink";
  const on = tone === "light" ? "bg-cream text-navy-deep" : "bg-ink text-paper";
  const ring = tone === "light" ? "border-cream/30" : "border-ink/20";

  return (
    <div className={`inline-flex items-center rounded-full border p-0.5 ${ring}`} role="group" aria-label={lang === "en" ? "Language" : "Lingua"}>
      {(["it", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`min-h-8 min-w-9 rounded-full px-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] ${lang === code ? on : idle}`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
