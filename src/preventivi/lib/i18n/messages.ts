import type { AppLocale } from "./locales";

type Dict = {
  close: string;
  language: string;
  nav: { home: string; list: string; settings: string; plan: string; prices: string };
  home: {
    kicker: string;
    title: string;
    lead: string;
    listCta: string;
    items: string;
    emptyList: string;
    measures: string;
    materials: string;
    site: string;
  };
  prices: {
    title: string;
    lead: string;
    search: string;
    all: string;
    materials: string;
    works: string;
    reset: string;
    custom: string;
    customCount: string;
    openQuote: string;
    emptySearch: string;
    hint: string;
  };
  company: {
    title: string;
    lead: string;
    add: string;
    save: string;
    delete: string;
    none: string;
    pick: string;
    manage: string;
    logo: string;
    logoHint: string;
    logoRemove: string;
    name: string;
    vat: string;
    cf: string;
    address: string;
    zip: string;
    city: string;
    province: string;
    phone: string;
    email: string;
    pec: string;
    empty: string;
    emptyLead: string;
    header: string;
    unnamed: string;
  };
  cat: Record<string, { name: string; hint: string }>;
  product: Record<string, { name: string; note: string }>;
  calc: {
    back: string;
    area: string;
    roof: string;
    wall: string;
    volume: string;
    dims: string;
    length: string;
    height: string;
    width: string;
    bars: string;
    barLen: string;
    waste: string;
    pieces: string;
    bags: string;
    packs: string;
    weight: string;
    woodVol: string;
    meters: string;
    add: string;
    added: string;
    perM2: string;
    perM3: string;
    perM2Bag: string;
    packOf: string;
    bagKg: string;
    quick: string;
    orDims: string;
    simple: string;
    result: string;
    useLast: string;
    price: string;
    perMl: string;
    rolls: string;
    rollOf: string;
  };
  geom: {
    tetto: string;
    tettoHint: string;
    stanza: string;
    stanzaHint: string;
    muro: string;
    muroHint: string;
    pitch: string;
    plan: string;
    slope: string;
    floor: string;
    ceiling: string;
    walls: string;
    wallsNet: string;
    volume: string;
    roof: string;
    perimeter: string;
    door: string;
    window: string;
    openings: string;
    addDoor: string;
    addWindow: string;
    save: string;
    saved: string;
    qty: string;
    then: string;
    portico: string;
    porticoHint: string;
    gable: string;
    shed: string;
    hip: string;
    posts: string;
    joint: string;
    build: string;
    demo: string;
    reno: string;
    pack: string;
    packLead: string;
    packCover: string;
    packWood: string;
    packMembrane: string;
    packIso: string;
    none: string;
    packGutter: string;
    gutter: string;
    downspout: string;
    gutterPvc: string;
    gutterZn: string;
    gutterAl: string;
    gutterCu: string;
  };
  engine: {
    title: string;
    lead: string;
    people: string;
    days: string;
    hours: string;
    debris: string;
    loose: string;
    bins: string;
    crew: string;
    labor: string;
  };
  plan: {
    title: string;
    lead: string;
    homeHint: string;
    view3d: string;
    viewPlan: string;
    masonry: string;
    roofing: string;
    timber: string;
    scaffold: string;
    hint3d: string;
    hintPlan: string;
    open: string;
    editMeasure: string;
    south: string;
    east: string;
    north: string;
    west: string;
    cutaway: string;
    dims: string;
    camIso: string;
    camSud: string;
    camEst: string;
    camPlan: string;
    thickness: string;
    sill: string;
    quote3d: string;
    quoted: string;
    openList: string;
    quoteHint: string;
  };
  workCat: Record<string, { name: string; hint: string }>;
  workItem: Record<string, { name: string; note: string }>;
  quote: {
    people: string;
    days: string;
    hoursDay: string;
    hoursTotal: string;
    amount: string;
    price: string;
    vat: string;
    taxable: string;
    total: string;
    useArea: string;
    measuresTitle: string;
    materialsTitle: string;
    worksTitle: string;
    unit: string;
    site: string;
    client: string;
    date: string;
    notes: string;
    extrasTitle: string;
    extraAdd: string;
    extraName: string;
    extraUnit: string;
    extraLead: string;
    print: string;
    suggest: string;
    hoursHint: string;
    materialsCost: string;
    freeItem: string;
    sitePh: string;
    clientPh: string;
  };
  list: {
    title: string;
    lead: string;
    empty: string;
    emptyLead: string;
    clear: string;
    copy: string;
    copied: string;
    delete: string;
    shareTitle: string;
    of: string;
    print: string;
    pdf: string;
    from3d: string;
    editPrice: string;
  };
  settings: {
    title: string;
    lead: string;
    waste: string;
    language: string;
    install: string;
    installLead: string;
    installHint: string;
    installed: string;
    shareLink: string;
    prices: string;
    company: string;
  };
  qty: { minus: string; plus: string };
  missing: { title: string; lead: string; back: string };
};

const PRODUCTS_IT: Dict["product"] = {
  "teg-mars": { name: "Tegola marsigliese", note: "13,5 pezzi al m² di tetto" },
  "teg-port": { name: "Tegola portoghese", note: "12 pezzi al m² di tetto" },
  "teg-olan": { name: "Tegola olandese", note: "14 pezzi al m² di tetto" },
  "teg-pian": { name: "Tegola piana", note: "10 pezzi al m² di tetto" },
  "cop-4516": { name: "Coppo canale + copertina", note: "28 pezzi al m², tetto completo" },
  "cop-4516c": { name: "Coppo solo canale", note: "14 pezzi al m², da accoppiare" },
  "cop-4016": { name: "Coppo piccolo completo", note: "32 pezzi al m², tetto completo" },
  "por-8": { name: "Poroton tramezzo 8", note: "16 pezzi al m² di muro" },
  "por-12": { name: "Poroton tramezzo 12", note: "16 pezzi al m² di muro" },
  "por-20": { name: "Poroton muro 20", note: "16 pezzi al m² di muro" },
  "por-25": { name: "Poroton muro 25", note: "16 pezzi al m² di muro" },
  "por-30": { name: "Poroton muro 30", note: "16 pezzi al m² di muro" },
  "por-35": { name: "Poroton muro 35", note: "16 pezzi al m² di muro" },
  "por-45": { name: "Poroton muro 45", note: "16 pezzi al m² di muro" },
  "cem-325-cls": { name: "Cemento 32,5 R — calcestruzzo", note: "12 sacchi da 25 kg al m³" },
  "cem-325-malta": { name: "Cemento 32,5 R — malta", note: "10 sacchi da 25 kg al m³" },
  "cem-425-cls": { name: "Cemento 42,5 R — calcestruzzo", note: "13 sacchi da 25 kg al m³" },
  "cem-massetto": { name: "Cemento per massetto 5 cm", note: "0,8 sacchi da 25 kg al m²" },
  "cem-predo": { name: "Calcestruzzo predosato", note: "sacco 25 kg, resa 12 L" },
  "for-82525": { name: "Foratino 8", note: "16 pezzi al m² di tramezzo" },
  "for-82533": { name: "Foratino 8 lungo", note: "12 pezzi al m² di tramezzo" },
  "for-122525": { name: "Foratino 12", note: "16 pezzi al m² di tramezzo" },
  "for-121225": { name: "Forato 8 fori", note: "30 pezzi al m² di muro" },
  "mat-uni": { name: "Mattone pieno UNI", note: "56 pezzi al m², muro 12 cm" },
  "mat-fav": { name: "Mattone faccia a vista", note: "56 pezzi al m², muro 12 cm" },
  "mat-for8": { name: "Mattone forato", note: "40 pezzi al m², muro 12 cm" },
  "mat-doppio": { name: "Mattone doppio UNI", note: "30 pezzi al m², muro 12 cm" },
  "leg-0816": { name: "Trave 8 × 16", note: "sezione 8 × 16 cm" },
  "leg-1020": { name: "Trave 10 × 20", note: "sezione 10 × 20 cm" },
  "leg-1216": { name: "Trave 12 × 16", note: "sezione 12 × 16 cm" },
  "leg-1224": { name: "Trave 12 × 24", note: "sezione 12 × 24 cm" },
  "leg-1428": { name: "Trave 14 × 28", note: "sezione 14 × 28 cm" },
  "leg-1632": { name: "Trave 16 × 32", note: "sezione 16 × 32 cm" },
  "leg-2040": { name: "Trave 20 × 40", note: "sezione 20 × 40 cm" },
  "iso-eps10": { name: "EPS 10 cm", note: "2 lastre al m² di muro" },
  "iso-xps8": { name: "XPS 8 cm", note: "isolamento perimetro e muri" },
  "iso-lana10": { name: "Lana di roccia 10 cm", note: "rotolo, pareti e sottotetto" },
  "iso-tetto8": { name: "Pannello tetto 8 cm", note: "isolamento sotto tegola" },
  "iso-tetto12": { name: "Pannello tetto 12 cm", note: "isolamento sotto tegola, 12 cm" },
  "iso-pir10": { name: "PIR tetto 10 cm", note: "pannello PIR sotto copertura" },
  "gua-bit4": { name: "Guaina bituminosa 4 mm", note: "1 m² al m² di falda, rotolo 10 m²" },
  "gua-ard": { name: "Guaina ardesiata", note: "finitura ardesia, rotolo 10 m²" },
  "gua-auto": { name: "Guaina autoadesiva", note: "sottotegola, rotolo 10 m²" },
  "gua-pvc": { name: "Guaina PVC 1,5 mm", note: "sintetica, rotolo 15 m²" },
  "gua-trasp": { name: "Membrana traspirante", note: "sottotegola, rotolo 75 m²" },
  "int-civ": { name: "Intonaco civile 1,5 cm", note: "0,85 sacchi al m²" },
  "int-ras": { name: "Rasante", note: "0,28 sacchi al m²" },
  "int-term": { name: "Intonaco termico 4 cm", note: "1,15 sacchi al m²" },
  "mal-m5": { name: "Malta M5", note: "posa laterizi, 1,2 sacchi al m²" },
  "mal-m10": { name: "Malta M10", note: "posa strutturale, 1,3 sacchi al m²" },
  "col-c2": { name: "Colla C2 pavimenti", note: "0,35 sacchi al m²" },
  "col-por": { name: "Colla per Poroton", note: "0,45 sacchi al m² di muro" },
  "sil-neu": { name: "Silicone neutro", note: "cartuccia 300 ml, giunti" },
  "sil-acr": { name: "Silicone acrilico", note: "cartuccia 300 ml, interni" },
  "sch-pu": { name: "Schiuma poliuretanica", note: "bombola 750 ml, vani" },
  "gro-pvc-can": { name: "Canale PVC 80", note: "gronda, barre da 4 m" },
  "gro-pvc-dis": { name: "Discendente PVC 80", note: "pluviale, barre da 3 m" },
  "gro-pvc-sta": { name: "Staffa PVC", note: "1 ogni 60 cm di canale" },
  "gro-pvc-tes": { name: "Testata PVC", note: "chiusura estremità canale" },
  "gro-pvc-ang": { name: "Angolo PVC", note: "angolo 90° di gronda" },
  "gro-pvc-boc": { name: "Bocchetta PVC", note: "uscita verso il pluviale" },
  "gro-pvc-gom": { name: "Gomito PVC", note: "2 per discendente" },
  "gro-pvc-col": { name: "Collare PVC", note: "fissaggio pluviale a muro" },
  "gro-pvc-giu": { name: "Giunto PVC", note: "unione barre di canale" },
  "gro-zn-can": { name: "Canale zincato 80", note: "lamiera, barre da 4 m" },
  "gro-zn-dis": { name: "Discendente zincato 80", note: "pluviale zincato" },
  "gro-zn-sta": { name: "Staffa zincata", note: "1 ogni 60 cm di canale" },
  "gro-zn-tes": { name: "Testata zincata", note: "chiusura estremità canale" },
  "gro-zn-ang": { name: "Angolo zincato", note: "angolo 90° di gronda" },
  "gro-zn-boc": { name: "Bocchetta zincata", note: "uscita verso il pluviale" },
  "gro-zn-gom": { name: "Gomito zincato", note: "2 per discendente" },
  "gro-zn-col": { name: "Collare zincato", note: "fissaggio pluviale a muro" },
  "gro-zn-giu": { name: "Giunto zincato", note: "unione barre di canale" },
  "gro-al-can": { name: "Canale alluminio 80", note: "preverniciato, barre da 4 m" },
  "gro-al-dis": { name: "Discendente alluminio 80", note: "pluviale preverniciato" },
  "gro-al-sta": { name: "Staffa alluminio", note: "1 ogni 60 cm di canale" },
  "gro-al-tes": { name: "Testata alluminio", note: "chiusura estremità canale" },
  "gro-al-ang": { name: "Angolo alluminio", note: "angolo 90° di gronda" },
  "gro-al-boc": { name: "Bocchetta alluminio", note: "uscita verso il pluviale" },
  "gro-al-gom": { name: "Gomito alluminio", note: "2 per discendente" },
  "gro-al-col": { name: "Collare alluminio", note: "fissaggio pluviale a muro" },
  "gro-al-giu": { name: "Giunto alluminio", note: "unione barre di canale" },
  "gro-cu-can": { name: "Canale rame 80", note: "rame, barre da 4 m" },
  "gro-cu-dis": { name: "Discendente rame 80", note: "pluviale in rame" },
  "gro-cu-sta": { name: "Staffa rame", note: "1 ogni 60 cm di canale" },
  "gro-cu-tes": { name: "Testata rame", note: "chiusura estremità canale" },
  "gro-cu-ang": { name: "Angolo rame", note: "angolo 90° di gronda" },
  "gro-cu-boc": { name: "Bocchetta rame", note: "uscita verso il pluviale" },
  "gro-cu-gom": { name: "Gomito rame", note: "2 per discendente" },
  "gro-cu-col": { name: "Collare rame", note: "fissaggio pluviale a muro" },
  "gro-cu-giu": { name: "Giunto rame", note: "unione barre di canale" },
};

const WORK_IT: Dict["workItem"] = {
  "lab-ope": { name: "Operaio comune", note: "22 €/ora · 8 ore/giorno" },
  "lab-mur": { name: "Muratore", note: "28 €/ora · circa 8 m² di muro al giorno a persona" },
  "lab-spe": { name: "Operaio specializzato", note: "32 €/ora · circa 10 m² di tetto al giorno a persona" },
  "lab-cap": { name: "Caposquadra", note: "35 €/ora · 8 ore/giorno" },
  "mez-fur": { name: "Furgone", note: "90 €/giorno" },
  "mez-cam": { name: "Camion 35 q", note: "190 €/giorno" },
  "mez-esc": { name: "Mini escavatore", note: "160 €/giorno" },
  "mez-pal": { name: "Mini pala", note: "150 €/giorno" },
  "mez-pia": { name: "Piattaforma 12 m", note: "140 €/giorno" },
  "mez-gru": { name: "Gru", note: "280 €/giorno" },
  "mez-bet": { name: "Betoniera", note: "45 €/giorno" },
  "mez-pom": { name: "Pompa calcestruzzo", note: "350 €/giorno" },
  "mez-com": { name: "Compressore", note: "55 €/giorno" },
  "pon-fac": { name: "Ponteggio facciata", note: "22 €/m², nolo circa 1 mese" },
  "pon-tub": { name: "Ponteggio tubo-giunto", note: "16 €/m²" },
  "pon-int": { name: "Ponteggio interno", note: "14 €/m²" },
  "pon-tra": { name: "Trabattello", note: "18 €/giorno" },
  "pon-mon": { name: "Montaggio e smontaggio ponteggio", note: "8 €/m²" },
  "sma-c5": { name: "Cassone 5 m³", note: "220 € a viaggio" },
  "sma-c10": { name: "Cassone 10 m³", note: "320 € a viaggio" },
  "sma-ine": { name: "Smaltimento inerti", note: "90 €/t" },
  "sma-mac": { name: "Smaltimento macerie miste", note: "140 €/t" },
  "sma-vol": { name: "Smaltimento a metro cubo", note: "55 €/m³" },
  "sma-leg": { name: "Smaltimento legno", note: "80 €/t" },
  "alt-all": { name: "Allestimento cantiere", note: "450 € a corpo" },
  "alt-sgom": { name: "Sgombero", note: "280 € a corpo" },
  "alt-tras": { name: "Trasporto A/R", note: "180 € a viaggio" },
  "alt-dpi": { name: "DPI squadra", note: "160 € a corpo" },
  "alt-rec": { name: "Recinzione di cantiere", note: "8 €/ml" },
  "alt-wc": { name: "WC chimico", note: "12 €/giorno" },
  "alt-bar": { name: "Baracca cantiere", note: "25 €/giorno" },
  "dem-mur": { name: "Demolizione muratura", note: "85 €/m³" },
  "dem-int": { name: "Rimozione intonaco", note: "12 €/m²" },
  "dem-pav": { name: "Rimozione pavimento", note: "18 €/m²" },
  "dem-cop": { name: "Rimozione copertura", note: "22 €/m²" },
};

const CAT_IT: Dict["cat"] = {
  tegole: { name: "Tegole", hint: "Tetto" },
  coppi: { name: "Coppi", hint: "Tetto" },
  guaine: { name: "Guaine", hint: "Tetto" },
  gronde: { name: "Gronde", hint: "Canale" },
  poroton: { name: "Poroton", hint: "Muri" },
  cemento: { name: "Cemento", hint: "Sacchi" },
  foratini: { name: "Foratini", hint: "Tramezzi" },
  mattoni: { name: "Mattoni", hint: "Muratura" },
  legno: { name: "Legno lamellare", hint: "Travi" },
  isolanti: { name: "Isolanti", hint: "Cappotto" },
  intonaci: { name: "Intonaci e malte", hint: "Sacchi" },
  sigillanti: { name: "Colle e silicone", hint: "Cartucce" },
};

const it: Dict = {
  close: "Chiudi",
  language: "Lingua",
  nav: { home: "Cantiere", list: "Preventivo", settings: "Impostazioni", plan: "3D", prices: "Prezzi" },
  home: {
    kicker: "Cantiere",
    title: "Misure e preventivo",
    lead: "Misura tetto, stanza, muro o porticato. Scegli nuovo, demolizione o ristruttura: il motore stima macerie, giorni e persone.",
    listCta: "Preventivo",
    items: "{n} voci",
    emptyList: "vuoto",
    measures: "Misure",
    materials: "Materiali",
    site: "Costi di cantiere",
  },
  prices: {
    title: "Listino prezzi",
    lead: "Cambia un prezzo: il preventivo si aggiorna subito.",
    search: "Cerca voce",
    all: "Tutto",
    materials: "Materiali",
    works: "Cantiere",
    reset: "Listino originale",
    custom: "Modificato",
    customCount: "{n} prezzi tuoi",
    openQuote: "Vedi preventivo",
    emptySearch: "Nessuna voce",
    hint: "I prezzi restano su questo telefono e valgono per tutte le voci del preventivo.",
  },
  company: {
    title: "Società",
    lead: "Logo e dati restano sul telefono. Li scegli dal menu sul preventivo.",
    add: "Nuova società",
    save: "Salva",
    delete: "Elimina",
    none: "Nessuna intestazione",
    pick: "Intestazione",
    manage: "Dati e logo",
    logo: "Logo",
    logoHint: "Foto o file. Resta sul preventivo e sul PDF.",
    logoRemove: "Togli logo",
    name: "Ragione sociale",
    vat: "P.IVA",
    cf: "Codice fiscale",
    address: "Indirizzo",
    zip: "CAP",
    city: "Città",
    province: "Provincia",
    phone: "Telefono",
    email: "Email",
    pec: "PEC",
    empty: "Nessuna società",
    emptyLead: "Aggiungi la tua ditta: logo, P.IVA e recapiti. Poi la selezioni sul preventivo.",
    header: "Intestazione preventivo",
    unnamed: "Senza nome",
  },
  cat: CAT_IT,
  product: PRODUCTS_IT,
  calc: {
    back: "Indietro",
    area: "Superficie",
    roof: "m² di tetto",
    wall: "m² di muro",
    volume: "Volume m³",
    dims: "Misura L × H",
    length: "Lunghezza",
    height: "Altezza",
    width: "Larghezza",
    bars: "N. pezzi",
    barLen: "Lunghezza pezzo",
    waste: "Sfrido",
    pieces: "Pezzi da ordinare",
    bags: "Sacchi da ordinare",
    packs: "Bancali",
    weight: "Peso circa",
    woodVol: "Volume",
    meters: "Metri lineari",
    add: "Aggiungi al preventivo",
    added: "Aggiunto",
    perM2: "{n} pz/m²",
    perM3: "{n} sacchi/m³",
    perM2Bag: "{n} sacchi/m²",
    packOf: "{n} pz a bancale",
    bagKg: "sacco {n} kg",
    quick: "Metri rapidi",
    orDims: "Oppure misura L × H",
    simple: "Metti i m²",
    result: "Da ordinare",
    useLast: "Usa {n} m²",
    price: "Prezzo",
    perMl: "{n} pz/m",
    rolls: "Rotoli",
    rollOf: "{n} m² a rotolo",
  },
  geom: {
    tetto: "Tetto",
    tettoHint: "Falda",
    stanza: "Stanza",
    stanzaHint: "L × P × H",
    muro: "Muro",
    muroHint: "L × H",
    pitch: "Pendenza",
    plan: "Pianta",
    slope: "Falda",
    floor: "Pavimento",
    ceiling: "Soffitto",
    walls: "Pareti lorde",
    wallsNet: "Pareti nette",
    volume: "Volume",
    roof: "Tetto",
    perimeter: "Perimetro",
    door: "Porta",
    window: "Finestra",
    openings: "Porte e finestre",
    addDoor: "Aggiungi porta",
    addWindow: "Aggiungi finestra",
    save: "Salva misura",
    saved: "Salvata",
    qty: "N.",
    then: "Poi calcola",
    portico: "Porticato",
    porticoHint: "Pilastri",
    gable: "Due falde",
    shed: "Una falda",
    hip: "Quattro falde",
    posts: "Pilastri",
    joint: "Giunti",
    build: "Nuovo",
    demo: "Demolizione",
    reno: "Ristruttura",
    pack: "Pacchetto tetto",
    packLead: "Scegli tegola o coppo, legno, guaina, isolante e grondaia. Il preventivo usa queste voci.",
    packCover: "Copertura",
    packWood: "Legno",
    packMembrane: "Guaina",
    packIso: "Isolante",
    none: "Nessuno",
    packGutter: "Grondaia",
    gutter: "Canale",
    downspout: "Discendenti",
    gutterPvc: "PVC",
    gutterZn: "Zincata",
    gutterAl: "Alluminio",
    gutterCu: "Rame",
  },
  engine: {
    title: "Motore cantiere",
    lead: "Medie di cantiere: persone, giorni e macerie da questa misura.",
    people: "Persone",
    days: "Giorni",
    hours: "Ore",
    debris: "Macerie",
    loose: "Volume sciolto",
    bins: "Cassoni",
    crew: "Squadra",
    labor: "Manodopera",
  },
  plan: {
    title: "Planimetria 3D",
    lead: "Il lavoro da fare, in pianta e in volume, dalle misure inserite.",
    homeHint: "Pianta e modello 3D del cantiere",
    view3d: "3D",
    viewPlan: "Pianta",
    masonry: "Muratura",
    roofing: "Copertura",
    timber: "Travi",
    scaffold: "Ponteggi",
    hint3d: "Trascina per ruotare. Due dita per zoom. Tocca un muro in pianta per vederlo in 3D.",
    hintPlan: "Pianta in scala. Nord in alto. Tocca un muro per evidenziarlo.",
    open: "Apri 3D",
    editMeasure: "Modifica misure",
    south: "Sud",
    east: "Est",
    north: "Nord",
    west: "Ovest",
    cutaway: "Sezione",
    dims: "Quote",
    camIso: "Isometrica",
    camSud: "Sud",
    camEst: "Est",
    camPlan: "Dall'alto",
    thickness: "Spessore",
    sill: "Davanzale",
    quote3d: "Genera preventivo",
    quoted: "Preventivo creato",
    openList: "Apri preventivo",
    quoteHint: "Quantità da questa misura: materiali, manodopera, macerie e cassoni.",
  },
  workCat: {
    labor: { name: "Ore e persone", hint: "Manodopera" },
    mezzi: { name: "Mezzi", hint: "Noli" },
    ponteggi: { name: "Ponteggi", hint: "Nolo e posa" },
    smaltimento: { name: "Smaltimento", hint: "Rifiuti" },
    altro: { name: "Altro", hint: "Voci extra" },
  },
  workItem: WORK_IT,
  quote: {
    people: "Persone",
    days: "Giorni",
    hoursDay: "Ore al giorno",
    hoursTotal: "Ore totali",
    amount: "Importo",
    price: "Prezzo",
    vat: "IVA",
    taxable: "Imponibile",
    total: "Totale",
    useArea: "Usa {n} m²",
    measuresTitle: "Misure",
    materialsTitle: "Materiali",
    worksTitle: "Cantiere",
    unit: "U.M.",
    site: "Cantiere",
    client: "Cliente",
    date: "Data",
    notes: "Note",
    extrasTitle: "Voci extra",
    extraAdd: "Aggiungi voce libera",
    extraName: "Descrizione",
    extraUnit: "Unità",
    extraLead: "Qualsiasi voce preventivabile: demolizioni, noli, oneri, extra.",
    print: "Stampa",
    suggest: "Da misura",
    hoursHint: "persone × giorni × ore",
    materialsCost: "Materiali",
    freeItem: "Voce libera",
    sitePh: "Nome cantiere",
    clientPh: "Nome cliente",
  },
  list: {
    title: "Preventivo",
    lead: "Materiali, ore, mezzi, ponteggi, rifiuti e voci extra",
    empty: "Preventivo vuoto",
    emptyLead: "Misura un tetto o una stanza, calcola i pezzi, aggiungi ore, mezzi e il resto.",
    clear: "Svuota",
    copy: "Copia testo",
    copied: "Copiato",
    delete: "Togli",
    shareTitle: "Preventivo cantiere",
    of: "di",
    print: "Stampa",
    pdf: "Esporta PDF",
    from3d: "Da 3D",
    editPrice: "Prezzo",
  },
  settings: {
    title: "Impostazioni",
    lead: "Lingua. Installa sul telefono. I preventivi restano su questo dispositivo.",
    waste: "Sfrido predefinito",
    language: "Lingua",
    install: "Installa sul telefono",
    installLead:
      "Apri Cantiere dal telefono. Poi aggiungilo alla schermata Home: si apre come un’app, senza barra del browser.",
    installHint:
      "Dal menu del browser scegli Aggiungi alla schermata Home (o Installa app). Su iPhone: Condividi → Aggiungi a Home.",
    installed: "Già installata su questo dispositivo.",
    shareLink: "Invia link",
    prices: "Listino prezzi",
    company: "Società e logo",
  },
  qty: { minus: "Meno", plus: "Più" },
  missing: { title: "Non trovato", lead: "Torna indietro e scegli un'altra voce.", back: "Cantiere" },
};

const bg: Dict = {
  ...it,
  close: "Затвори",
  language: "Език",
  nav: { home: "Обект", list: "Оферта", settings: "Настройки", plan: "3D", prices: "Цени" },
  home: {
    ...it.home,
    kicker: "Обект",
    title: "Мерки и оферта",
    lead: "Измери покрив, стая или стена. После материали, часове, техника, скеле и отпадъци.",
    listCta: "Оферта",
    items: "{n} позиции",
    emptyList: "празна",
    measures: "Мерки",
    materials: "Материали",
    site: "Разходи на обекта",
  },
  calc: { ...it.calc, add: "Добави в офертата", added: "Добавено", useLast: "Ползваи {n} m²", back: "Назад" },
  geom: {
    tetto: "Покрив",
    tettoHint: "Скат",
    stanza: "Стая",
    stanzaHint: "Д × Ш × В",
    muro: "Стена",
    muroHint: "Д × В",
    pitch: "Наклон",
    plan: "План",
    slope: "Скат",
    floor: "Под",
    ceiling: "Таван",
    walls: "Стени бруто",
    wallsNet: "Стени нето",
    volume: "Обем",
    roof: "Покрив",
    perimeter: "Периметър",
    door: "Врата",
    window: "Прозорец",
    openings: "Врати и прозорци",
    addDoor: "Добави врата",
    addWindow: "Добави прозорец",
    save: "Запази мярката",
    saved: "Запазена",
    qty: "Бр.",
    then: "После изчисли",
    portico: "Навес",
    porticoHint: "Стълбове",
    gable: "Два ската",
    shed: "Един скат",
    hip: "Четири ската",
    posts: "Стълбове",
    joint: "Фуги",
    build: "Ново",
    demo: "Събаряне",
    reno: "Ремонт",
    pack: "Пакет покрив",
    packLead: "Избери керемида или коруба, дърво, хидроизолация, изолация и улук.",
    packCover: "Покритие",
    packWood: "Дърво",
    packMembrane: "Хидроизолация",
    packIso: "Изолация",
    none: "Без",
    packGutter: "Улук",
    gutter: "Улук",
    downspout: "Водостоци",
    gutterPvc: "PVC",
    gutterZn: "Поцинкован",
    gutterAl: "Алуминий",
    gutterCu: "Мед",
  },
  plan: {
    ...it.plan,
    title: "План 3D",
    lead: "Работата за вършене, в план и в обем, от въведените мерки.",
    homeHint: "План и 3D модел на обекта",
    viewPlan: "План",
    masonry: "Зидария",
    roofing: "Покрив",
    timber: "Греди",
    scaffold: "Скеле",
    hint3d: "Влачи за въртене. Два пръста за мащаб. Докосни стена в плана, за да я видиш в 3D.",
    hintPlan: "План в мащаб. Север е горе. Докосни стена, за да я откроиш.",
    open: "Отвори 3D",
    editMeasure: "Промени мерките",
    south: "Юг",
    east: "Изток",
    north: "Север",
    west: "Запад",
    cutaway: "Разрез",
    dims: "Коти",
    camIso: "Изометрия",
    camSud: "Юг",
    camEst: "Изток",
    camPlan: "Отгоре",
    thickness: "Дебелина",
    sill: "Перваз",
  },
  workCat: {
    labor: { name: "Часове и хора", hint: "Труд" },
    mezzi: { name: "Техника", hint: "Наем" },
    ponteggi: { name: "Скеле", hint: "Наем и монтаж" },
    smaltimento: { name: "Извозване", hint: "Отпадъци" },
    altro: { name: "Други", hint: "Допълнителни" },
  },
  workItem: {
    "lab-ope": { name: "Общ работник", note: "22 €/час · 8 часа/ден" },
    "lab-mur": { name: "Зидар", note: "28 €/час · 8 часа/ден" },
    "lab-spe": { name: "Специалист", note: "32 €/час · 8 часа/ден" },
    "lab-cap": { name: "Бригадир", note: "35 €/час · 8 часа/ден" },
    "mez-fur": { name: "Бус", note: "90 €/ден" },
    "mez-cam": { name: "Камион 35 q", note: "190 €/ден" },
    "mez-esc": { name: "Мини багер", note: "160 €/ден" },
    "mez-pal": { name: "Мини товарач", note: "150 €/ден" },
    "mez-pia": { name: "Платформа 12 m", note: "140 €/ден" },
    "mez-gru": { name: "Кран", note: "280 €/ден" },
    "mez-bet": { name: "Бетонобъркачка", note: "45 €/ден" },
    "pon-fac": { name: "Скеле по фасада", note: "22 €/m², наем ~1 месец" },
    "pon-tub": { name: "Тръбно скеле", note: "16 €/m²" },
    "pon-tra": { name: "Мобилно скеле", note: "18 €/ден" },
    "pon-mon": { name: "Монтаж и демонтаж скеле", note: "8 €/m²" },
    "sma-c5": { name: "Контейнер 5 m³", note: "220 € на курс" },
    "sma-c10": { name: "Контейнер 10 m³", note: "320 € на курс" },
    "sma-ine": { name: "Инертни отпадъци", note: "90 €/t" },
    "sma-mac": { name: "Смесени строителни отпадъци", note: "140 €/t" },
    "sma-vol": { name: "Извозване на m³", note: "55 €/m³" },
    "mez-pom": { name: "Помпа за бетон", note: "350 €/ден" },
    "mez-com": { name: "Компресор", note: "55 €/ден" },
    "pon-int": { name: "Вътрешно скеле", note: "14 €/m²" },
    "sma-leg": { name: "Дървесни отпадъци", note: "80 €/t" },
    "alt-all": { name: "Организация на обекта", note: "450 € на куп" },
    "alt-sgom": { name: "Изчистване", note: "280 € на куп" },
    "alt-tras": { name: "Транспорт отиване-връщане", note: "180 € на курс" },
    "alt-dpi": { name: "ЛПС за екипа", note: "160 € на куп" },
    "alt-rec": { name: "Ограда на обекта", note: "8 €/ml" },
    "alt-wc": { name: "Химическа тоалетна", note: "12 €/ден" },
    "alt-bar": { name: "Фургон на обекта", note: "25 €/ден" },
    "dem-mur": { name: "Събаряне на зидария", note: "85 €/m³" },
    "dem-int": { name: "Сваляне на мазилка", note: "12 €/m²" },
    "dem-pav": { name: "Сваляне на под", note: "18 €/m²" },
    "dem-cop": { name: "Сваляне на покрив", note: "22 €/m²" },
  },
  quote: {
    ...it.quote,
    people: "Хора",
    days: "Дни",
    hoursDay: "Часа на ден",
    hoursTotal: "Общо часове",
    amount: "Сума",
    price: "Цена",
    vat: "ДДС",
    taxable: "Данъчна основа",
    total: "Общо",
    useArea: "Ползваи {n} m²",
    measuresTitle: "Мерки",
    materialsTitle: "Материали",
    worksTitle: "Обект",
    unit: "Ед.",
    site: "Обект",
    client: "Клиент",
    date: "Дата",
    notes: "Бележки",
    extrasTitle: "Допълнителни",
    extraAdd: "Добави свободна позиция",
    extraName: "Описание",
    extraUnit: "Единица",
    extraLead: "Всяка позиция за оферта: събаряне, наеми, такси, екстри.",
    print: "Печат",
    suggest: "От мярката",
    hoursHint: "хора × дни × часове",
    materialsCost: "Материали",
    freeItem: "Свободна позиция",
    sitePh: "Име на обекта",
    clientPh: "Име на клиента",
  },
  list: {
    ...it.list,
    title: "Оферта",
    lead: "Материали, часове, техника, скеле, отпадъци",
    empty: "Офертата е празна",
    emptyLead: "Измери покрив или стая, изчисли бройките, добави часове и техника.",
    clear: "Изчисти",
    copy: "Копирай текст",
    copied: "Копирано",
    delete: "Махни",
    shareTitle: "Оферта обект",
  },
  settings: { ...it.settings, title: "Настройки", lead: "Език. Остава на този телефон.", language: "Език" },
  qty: { minus: "По-малко", plus: "Повече" },
  missing: { title: "Не е намерено", lead: "Върни се и избери друго.", back: "Обект" },
};

const ro: Dict = {
  ...it,
  close: "Închide",
  language: "Limbă",
  nav: { home: "Șantier", list: "Ofertă", settings: "Setări", plan: "3D", prices: "Prețuri" },
  home: {
    ...it.home,
    kicker: "Șantier",
    title: "Măsuri și ofertă",
    lead: "Măsoară acoperiș, cameră sau zid. Apoi materiale, ore, utilaje, schele și deșeuri.",
    listCta: "Ofertă",
    items: "{n} poziții",
    emptyList: "goală",
    measures: "Măsuri",
    materials: "Materiale",
    site: "Costuri de șantier",
  },
  calc: { ...it.calc, add: "Adaugă la ofertă", added: "Adăugat", useLast: "Folosește {n} m²", back: "Înapoi" },
  geom: {
    tetto: "Acoperiș",
    tettoHint: "Pantă",
    stanza: "Cameră",
    stanzaHint: "L × l × Î",
    muro: "Zid",
    muroHint: "L × Î",
    pitch: "Pantă",
    plan: "Plan",
    slope: "Pantă",
    floor: "Pardoseală",
    ceiling: "Tavan",
    walls: "Pereți bruti",
    wallsNet: "Pereți neți",
    volume: "Volum",
    roof: "Acoperiș",
    perimeter: "Perimetru",
    door: "Ușă",
    window: "Fereastră",
    openings: "Uși și ferestre",
    addDoor: "Adaugă ușă",
    addWindow: "Adaugă fereastră",
    save: "Salvează măsura",
    saved: "Salvată",
    qty: "Nr.",
    then: "Apoi calculează",
    portico: "Portic",
    porticoHint: "Stâlpi",
    gable: "Două pante",
    shed: "O pantă",
    hip: "Patru pante",
    posts: "Stâlpi",
    joint: "Rosturi",
    build: "Nou",
    demo: "Demolare",
    reno: "Reabilitare",
    pack: "Pachet acoperiș",
    packLead: "Alege țiglă sau țiglă canal, lemn, membrană, izolație și jgheab.",
    packCover: "Învelitoare",
    packWood: "Lemn",
    packMembrane: "Membrană",
    packIso: "Izolație",
    none: "Fără",
    packGutter: "Jgheab",
    gutter: "Jgheab",
    downspout: "Burlane",
    gutterPvc: "PVC",
    gutterZn: "Zincat",
    gutterAl: "Aluminiu",
    gutterCu: "Cupru",
  },
  plan: {
    ...it.plan,
    title: "Plan 3D",
    lead: "Lucrarea de făcut, în plan și în volum, din măsurile introduse.",
    homeHint: "Plan și model 3D al șantierului",
    viewPlan: "Plan",
    masonry: "Zidărie",
    roofing: "Acoperiș",
    timber: "Grinzi",
    scaffold: "Schele",
    hint3d: "Trage ca să rotesti. Două degete pentru zoom. Atinge un perete din plan ca să-l vezi în 3D.",
    hintPlan: "Plan la scară. Nordul e sus. Atinge un perete ca să-l evidențiezi.",
    open: "Deschide 3D",
    editMeasure: "Modifică măsurile",
    south: "Sud",
    east: "Est",
    north: "Nord",
    west: "Vest",
    cutaway: "Secțiune",
    dims: "Cote",
    camIso: "Izometric",
    camSud: "Sud",
    camEst: "Est",
    camPlan: "De sus",
    thickness: "Grosime",
    sill: "Glaf",
  },
  workCat: {
    labor: { name: "Ore și oameni", hint: "Manoperă" },
    mezzi: { name: "Utilaje", hint: "Închiriere" },
    ponteggi: { name: "Schele", hint: "Noleggio și montaj" },
    smaltimento: { name: "Eliminare", hint: "Deșeuri" },
    altro: { name: "Altele", hint: "Extra" },
  },
  workItem: {
    "lab-ope": { name: "Muncitor necalificat", note: "22 €/oră · 8 ore/zi" },
    "lab-mur": { name: "Zidar", note: "28 €/oră · 8 ore/zi" },
    "lab-spe": { name: "Muncitor calificat", note: "32 €/oră · 8 ore/zi" },
    "lab-cap": { name: "Șef de echipă", note: "35 €/oră · 8 ore/zi" },
    "mez-fur": { name: "Dubă", note: "90 €/zi" },
    "mez-cam": { name: "Camion 35 q", note: "190 €/zi" },
    "mez-esc": { name: "Mini excavator", note: "160 €/zi" },
    "mez-pal": { name: "Mini încărcător", note: "150 €/zi" },
    "mez-pia": { name: "Platformă 12 m", note: "140 €/zi" },
    "mez-gru": { name: "Macara", note: "280 €/zi" },
    "mez-bet": { name: "Betonieră", note: "45 €/zi" },
    "pon-fac": { name: "Schelă fațadă", note: "22 €/m², nolo ~1 lună" },
    "pon-tub": { name: "Schelă țeavă-racord", note: "16 €/m²" },
    "pon-tra": { name: "Schelă rulantă", note: "18 €/zi" },
    "pon-mon": { name: "Montaj și demontaj schelă", note: "8 €/m²" },
    "sma-c5": { name: "Container 5 m³", note: "220 € pe cursă" },
    "sma-c10": { name: "Container 10 m³", note: "320 € pe cursă" },
    "sma-ine": { name: "Deșeuri inerte", note: "90 €/t" },
    "sma-mac": { name: "Moloz mixt", note: "140 €/t" },
    "sma-vol": { name: "Eliminare la m³", note: "55 €/m³" },
    "mez-pom": { name: "Pompă beton", note: "350 €/zi" },
    "mez-com": { name: "Compresor", note: "55 €/zi" },
    "pon-int": { name: "Schelă interioară", note: "14 €/m²" },
    "sma-leg": { name: "Deșeuri de lemn", note: "80 €/t" },
    "alt-all": { name: "Amenajare șantier", note: "450 € corp" },
    "alt-sgom": { name: "Curățare", note: "280 € corp" },
    "alt-tras": { name: "Transport dus-întors", note: "180 € cursă" },
    "alt-dpi": { name: "EIP echipă", note: "160 € corp" },
    "alt-rec": { name: "Gard de șantier", note: "8 €/ml" },
    "alt-wc": { name: "Toaletă chimică", note: "12 €/zi" },
    "alt-bar": { name: "Baracă șantier", note: "25 €/zi" },
    "dem-mur": { name: "Demolare zidărie", note: "85 €/m³" },
    "dem-int": { name: "Îndepărtare tencuială", note: "12 €/m²" },
    "dem-pav": { name: "Îndepărtare pardoseală", note: "18 €/m²" },
    "dem-cop": { name: "Îndepărtare acoperiș", note: "22 €/m²" },
  },
  quote: {
    ...it.quote,
    people: "Oameni",
    days: "Zile",
    hoursDay: "Ore pe zi",
    hoursTotal: "Ore totale",
    amount: "Sumă",
    price: "Preț",
    vat: "TVA",
    taxable: "Imponibil",
    total: "Total",
    useArea: "Folosește {n} m²",
    measuresTitle: "Măsuri",
    materialsTitle: "Materiale",
    worksTitle: "Șantier",
    unit: "U.M.",
    site: "Șantier",
    client: "Client",
    date: "Data",
    notes: "Note",
    extrasTitle: "Extra",
    extraAdd: "Adaugă poziție liberă",
    extraName: "Descriere",
    extraUnit: "Unitate",
    extraLead: "Orice poziție ofertabilă: demolări, închirieri, taxe, extra.",
    print: "Tipărește",
    suggest: "Din măsură",
    hoursHint: "oameni × zile × ore",
    materialsCost: "Materiale",
    freeItem: "Poziție liberă",
    sitePh: "Nume șantier",
    clientPh: "Nume client",
  },
  list: {
    ...it.list,
    title: "Ofertă",
    lead: "Materiale, ore, utilaje, schele, deșeuri",
    empty: "Oferta e goală",
    emptyLead: "Măsoară un acoperiș sau o cameră, calculează, adaugă ore și utilaje.",
    clear: "Golește",
    copy: "Copiază text",
    copied: "Copiat",
    delete: "Scoate",
    shareTitle: "Ofertă șantier",
  },
  settings: { ...it.settings, title: "Setări", lead: "Limbă. Rămâne pe telefonul ăsta.", language: "Limbă" },
  qty: { minus: "Mai puțin", plus: "Mai mult" },
  missing: { title: "Nu s-a găsit", lead: "Întoarce-te și alege altceva.", back: "Șantier" },
};

const sq: Dict = {
  ...it,
  close: "Mbyll",
  language: "Gjuha",
  nav: { home: "Kantier", list: "Preventiv", settings: "Cilësimet", plan: "3D", prices: "Çmimet" },
  home: {
    ...it.home,
    kicker: "Kantier",
    title: "Masa dhe preventivi",
    lead: "Mas çatinë, dhomën ose murin. Pastaj materiale, orë, mjete, skela dhe mbetje.",
    listCta: "Preventiv",
    items: "{n} zëra",
    emptyList: "bosh",
    measures: "Masa",
    materials: "Materiale",
    site: "Kostot e kantierit",
  },
  calc: { ...it.calc, add: "Shto në preventiv", added: "U shtua", useLast: "Përdor {n} m²", back: "Prapa" },
  geom: {
    tetto: "Çati",
    tettoHint: "Pjerrësi",
    stanza: "Dhomë",
    stanzaHint: "G × Gj × L",
    muro: "Mur",
    muroHint: "G × L",
    pitch: "Pjerrësi",
    plan: "Planimetri",
    slope: "Pjerrësi",
    floor: "Dysheme",
    ceiling: "Tavan",
    walls: "Mure bruto",
    wallsNet: "Mure neto",
    volume: "Vëllim",
    roof: "Çati",
    perimeter: "Perimetër",
    door: "Derë",
    window: "Dritare",
    openings: "Dyer dhe dritare",
    addDoor: "Shto derë",
    addWindow: "Shto dritare",
    save: "Ruaj masën",
    saved: "U ruajt",
    qty: "Nr.",
    then: "Pastaj llogarit",
    portico: "Portik",
    porticoHint: "Shtylla",
    gable: "Dy pjerrësi",
    shed: "Një pjerrësi",
    hip: "Katër pjerrësi",
    posts: "Shtylla",
    joint: "Nyje",
    build: "E re",
    demo: "Prishje",
    reno: "Ristrukturim",
    pack: "Paketa e çatisë",
    packLead: "Zgjidh tjegull ose koppo, dru, membranë, izolim dhe ulluk.",
    packCover: "Mbulesa",
    packWood: "Dru",
    packMembrane: "Membrana",
    packIso: "Izolimi",
    none: "Asnjë",
    packGutter: "Ulluku",
    gutter: "Kanali",
    downspout: "Shkarkuesit",
    gutterPvc: "PVC",
    gutterZn: "I zinkuar",
    gutterAl: "Alumini",
    gutterCu: "Bakri",
  },
  plan: {
    ...it.plan,
    title: "Planimetria 3D",
    lead: "Puna për t’u bërë, në plan dhe në vëllim, nga masat e futura.",
    homeHint: "Plan dhe model 3D i kantierit",
    viewPlan: "Plani",
    masonry: "Muraturë",
    roofing: "Çati",
    timber: "Trarë",
    scaffold: "Skela",
    hint3d: "Tërhiq për ta rrotulluar. Dy gishta për zmadhim. Prek një mur në plan që ta shohësh në 3D.",
    hintPlan: "Plan në shkallë. Veriu lart. Prek një mur për ta theksuar.",
    open: "Hap 3D",
    editMeasure: "Ndrysho masat",
    south: "Jug",
    east: "Lindje",
    north: "Veri",
    west: "Perëndim",
    cutaway: "Prerje",
    dims: "Kota",
    camIso: "Izometrike",
    camSud: "Jug",
    camEst: "Lindje",
    camPlan: "Nga lart",
    thickness: "Trashësi",
    sill: "Pragu",
  },
  workCat: {
    labor: { name: "Orë dhe njerëz", hint: "Punë dore" },
    mezzi: { name: "Mjete", hint: "Qira" },
    ponteggi: { name: "Skela", hint: "Qira dhe montim" },
    smaltimento: { name: "Hedhje", hint: "Mbetje" },
    altro: { name: "Tjetër", hint: "Zëra extra" },
  },
  workItem: {
    "lab-ope": { name: "Punëtor i thjeshtë", note: "22 €/orë · 8 orë/ditë" },
    "lab-mur": { name: "Murator", note: "28 €/orë · 8 orë/ditë" },
    "lab-spe": { name: "Punëtor i kualifikuar", note: "32 €/orë · 8 orë/ditë" },
    "lab-cap": { name: "Kryepunëtor", note: "35 €/orë · 8 orë/ditë" },
    "mez-fur": { name: "Furgon", note: "90 €/ditë" },
    "mez-cam": { name: "Kamion 35 q", note: "190 €/ditë" },
    "mez-esc": { name: "Mini eskavator", note: "160 €/ditë" },
    "mez-pal": { name: "Mini pala", note: "150 €/ditë" },
    "mez-pia": { name: "Platformë 12 m", note: "140 €/ditë" },
    "mez-gru": { name: "Vinç", note: "280 €/ditë" },
    "mez-bet": { name: "Betoniere", note: "45 €/ditë" },
    "pon-fac": { name: "Skelë fasade", note: "22 €/m², qira ~1 muaj" },
    "pon-tub": { name: "Skelë tub-nyje", note: "16 €/m²" },
    "pon-tra": { name: "Skelë e lëvizshme", note: "18 €/ditë" },
    "pon-mon": { name: "Montim dhe çmontim skelë", note: "8 €/m²" },
    "sma-c5": { name: "Kason 5 m³", note: "220 € për udhë" },
    "sma-c10": { name: "Kason 10 m³", note: "320 € për udhë" },
    "sma-ine": { name: "Mbetje inerte", note: "90 €/t" },
    "sma-mac": { name: "Mbetje të përziera", note: "140 €/t" },
    "sma-vol": { name: "Hedhje për m³", note: "55 €/m³" },
    "mez-pom": { name: "Pompë betoni", note: "350 €/ditë" },
    "mez-com": { name: "Kompresor", note: "55 €/ditë" },
    "pon-int": { name: "Skelë e brendshme", note: "14 €/m²" },
    "sma-leg": { name: "Mbetje druri", note: "80 €/t" },
    "alt-all": { name: "Pajisje kantieri", note: "450 € me copë" },
    "alt-sgom": { name: "Pastrimi", note: "280 € me copë" },
    "alt-tras": { name: "Transport andata-kthim", note: "180 € për udhë" },
    "alt-dpi": { name: "MPP e ekipit", note: "160 € me copë" },
    "alt-rec": { name: "Gardh kantieri", note: "8 €/ml" },
    "alt-wc": { name: "WC kimik", note: "12 €/ditë" },
    "alt-bar": { name: "Barakë kantieri", note: "25 €/ditë" },
    "dem-mur": { name: "Prishje murature", note: "85 €/m³" },
    "dem-int": { name: "Heqje suvaje", note: "12 €/m²" },
    "dem-pav": { name: "Heqje dyshemeje", note: "18 €/m²" },
    "dem-cop": { name: "Heqje çatie", note: "22 €/m²" },
  },
  quote: {
    ...it.quote,
    people: "Njerëz",
    days: "Ditë",
    hoursDay: "Orë në ditë",
    hoursTotal: "Orë gjithsej",
    amount: "Shuma",
    price: "Çmimi",
    vat: "TVSH",
    taxable: "Tatimor",
    total: "Totali",
    useArea: "Përdor {n} m²",
    measuresTitle: "Masa",
    materialsTitle: "Materiale",
    worksTitle: "Kantier",
    unit: "Nj.",
    site: "Kantier",
    client: "Klienti",
    date: "Data",
    notes: "Shënime",
    extrasTitle: "Zëra extra",
    extraAdd: "Shto zë të lirë",
    extraName: "Përshkrimi",
    extraUnit: "Njësia",
    extraLead: "Çdo zë i preventivueshëm: prishje, qira, tarifa, extra.",
    print: "Printo",
    suggest: "Nga masa",
    hoursHint: "njerëz × ditë × orë",
    materialsCost: "Materiale",
    freeItem: "Zë i lirë",
    sitePh: "Emri i kantierit",
    clientPh: "Emri i klientit",
  },
  list: {
    ...it.list,
    title: "Preventiv",
    lead: "Materiale, orë, mjete, skela, mbetje",
    empty: "Preventivi është bosh",
    emptyLead: "Mas një çati ose dhomë, llogarit copët, shto orë dhe mjete.",
    clear: "Zbraz",
    copy: "Kopjo tekstin",
    copied: "U kopjua",
    delete: "Hiq",
    shareTitle: "Preventiv kantieri",
  },
  settings: { ...it.settings, title: "Cilësimet", lead: "Gjuha. Mbetet në këtë telefon.", language: "Gjuha" },
  qty: { minus: "Më pak", plus: "Më shumë" },
  missing: { title: "S’u gjet", lead: "Kthehu dhe zgjidh tjetër.", back: "Kantier" },
};

const ru: Dict = {
  ...it,
  close: "Закрыть",
  language: "Язык",
  nav: { home: "Объект", list: "Смета", settings: "Настройки", plan: "3D", prices: "Цены" },
  home: {
    ...it.home,
    kicker: "Объект",
    title: "Замеры и смета",
    lead: "Замер кровли, комнаты или стены. Затем материалы, часы, техника, леса и отходы.",
    listCta: "Смета",
    items: "{n} позиций",
    emptyList: "пусто",
    measures: "Замеры",
    materials: "Материалы",
    site: "Затраты на объекте",
  },
  calc: { ...it.calc, add: "Добавить в смету", added: "Добавлено", useLast: "Взять {n} m²", back: "Назад" },
  geom: {
    tetto: "Кровля",
    tettoHint: "Скат",
    stanza: "Комната",
    stanzaHint: "Д × Ш × В",
    muro: "Стена",
    muroHint: "Д × В",
    pitch: "Уклон",
    plan: "План",
    slope: "Скат",
    floor: "Пол",
    ceiling: "Потолок",
    walls: "Стены брутто",
    wallsNet: "Стены нетто",
    volume: "Объём",
    roof: "Кровля",
    perimeter: "Периметр",
    door: "Дверь",
    window: "Окно",
    openings: "Двери и окна",
    addDoor: "Добавить дверь",
    addWindow: "Добавить окно",
    save: "Сохранить замер",
    saved: "Сохранено",
    qty: "Шт.",
    then: "Потом посчитай",
    portico: "Портик",
    porticoHint: "Столбы",
    gable: "Два ската",
    shed: "Один скат",
    hip: "Четыре ската",
    posts: "Столбы",
    joint: "Швы",
    build: "Новое",
    demo: "Демонтаж",
    reno: "Ремонт",
    pack: "Пакет кровли",
    packLead: "Выбери черепицу или коппо, дерево, мембрану, утеплитель и желоб.",
    packCover: "Покрытие",
    packWood: "Дерево",
    packMembrane: "Мембрана",
    packIso: "Утеплитель",
    none: "Нет",
    packGutter: "Желоб",
    gutter: "Желоб",
    downspout: "Водостоки",
    gutterPvc: "ПВХ",
    gutterZn: "Оцинковка",
    gutterAl: "Алюминий",
    gutterCu: "Медь",
  },
  plan: {
    ...it.plan,
    title: "План 3D",
    lead: "Работа на объекте — план и объём по введённым размерам.",
    homeHint: "План и 3D-модель объекта",
    viewPlan: "План",
    masonry: "Кладка",
    roofing: "Кровля",
    timber: "Балки",
    scaffold: "Леса",
    hint3d: "Тяни, чтобы вращать. Два пальца — масштаб. Коснись стены на плане, чтобы увидеть её в 3D.",
    hintPlan: "План в масштабе. Север сверху. Коснись стены, чтобы выделить.",
    open: "Открыть 3D",
    editMeasure: "Изменить размеры",
    south: "Юг",
    east: "Восток",
    north: "Север",
    west: "Запад",
    cutaway: "Разрез",
    dims: "Размеры",
    camIso: "Изометрия",
    camSud: "Юг",
    camEst: "Восток",
    camPlan: "Сверху",
    thickness: "Толщина",
    sill: "Подоконник",
  },
  workCat: {
    labor: { name: "Часы и люди", hint: "Работы" },
    mezzi: { name: "Техника", hint: "Аренда" },
    ponteggi: { name: "Леса", hint: "Аренда и монтаж" },
    smaltimento: { name: "Вывоз", hint: "Отходы" },
    altro: { name: "Прочее", hint: "Дополнительно" },
  },
  workItem: {
    "lab-ope": { name: "Разнорабочий", note: "22 €/час · 8 часов/день" },
    "lab-mur": { name: "Каменщик", note: "28 €/час · 8 часов/день" },
    "lab-spe": { name: "Специалист", note: "32 €/час · 8 часов/день" },
    "lab-cap": { name: "Бригадир", note: "35 €/час · 8 часов/день" },
    "mez-fur": { name: "Фургон", note: "90 €/день" },
    "mez-cam": { name: "Грузовик 35 q", note: "190 €/день" },
    "mez-esc": { name: "Мини-экскаватор", note: "160 €/день" },
    "mez-pal": { name: "Мини-погрузчик", note: "150 €/день" },
    "mez-pia": { name: "Вышка 12 m", note: "140 €/день" },
    "mez-gru": { name: "Кран", note: "280 €/день" },
    "mez-bet": { name: "Бетономешалка", note: "45 €/день" },
    "pon-fac": { name: "Леса на фасад", note: "22 €/m², аренда ~1 месяц" },
    "pon-tub": { name: "Трубчатые леса", note: "16 €/m²" },
    "pon-tra": { name: "Вышка-тура", note: "18 €/день" },
    "pon-mon": { name: "Монтаж и демонтаж лесов", note: "8 €/m²" },
    "sma-c5": { name: "Контейнер 5 m³", note: "220 € за рейс" },
    "sma-c10": { name: "Контейнер 10 m³", note: "320 € за рейс" },
    "sma-ine": { name: "Инертные отходы", note: "90 €/t" },
    "sma-mac": { name: "Смешанный строительный мусор", note: "140 €/t" },
    "sma-vol": { name: "Вывоз за m³", note: "55 €/m³" },
    "mez-pom": { name: "Бетононасос", note: "350 €/день" },
    "mez-com": { name: "Компрессор", note: "55 €/день" },
    "pon-int": { name: "Внутренние леса", note: "14 €/m²" },
    "sma-leg": { name: "Древесные отходы", note: "80 €/t" },
    "alt-all": { name: "Организация объекта", note: "450 € пакетом" },
    "alt-sgom": { name: "Расчистка", note: "280 € пакетом" },
    "alt-tras": { name: "Перевозка туда-обратно", note: "180 € за рейс" },
    "alt-dpi": { name: "СИЗ бригады", note: "160 € пакетом" },
    "alt-rec": { name: "Ограждение объекта", note: "8 €/ml" },
    "alt-wc": { name: "Биотуалет", note: "12 €/день" },
    "alt-bar": { name: "Бытовка", note: "25 €/день" },
    "dem-mur": { name: "Демонтаж кладки", note: "85 €/m³" },
    "dem-int": { name: "Снятие штукатурки", note: "12 €/m²" },
    "dem-pav": { name: "Снятие пола", note: "18 €/m²" },
    "dem-cop": { name: "Снятие кровли", note: "22 €/m²" },
  },
  quote: {
    ...it.quote,
    people: "Люди",
    days: "Дни",
    hoursDay: "Часов в день",
    hoursTotal: "Всего часов",
    amount: "Сумма",
    price: "Цена",
    vat: "НДС",
    taxable: "Без НДС",
    total: "Итого",
    useArea: "Взять {n} m²",
    measuresTitle: "Замеры",
    materialsTitle: "Материалы",
    worksTitle: "Объект",
    unit: "Ед.",
    site: "Объект",
    client: "Заказчик",
    date: "Дата",
    notes: "Заметки",
    extrasTitle: "Дополнительно",
    extraAdd: "Добавить свободную позицию",
    extraName: "Описание",
    extraUnit: "Единица",
    extraLead: "Любая позиция сметы: демонтаж, аренда, сборы, прочее.",
    print: "Печать",
    suggest: "Из замера",
    hoursHint: "люди × дни × часы",
    materialsCost: "Материалы",
    freeItem: "Свободная позиция",
    sitePh: "Название объекта",
    clientPh: "Имя заказчика",
  },
  list: {
    ...it.list,
    title: "Смета",
    lead: "Материалы, часы, техника, леса, отходы",
    empty: "Смета пуста",
    emptyLead: "Замерь кровлю или комнату, посчитай штуки, добавь часы и технику.",
    clear: "Очистить",
    copy: "Копировать текст",
    copied: "Скопировано",
    delete: "Убрать",
    shareTitle: "Смета объекта",
  },
  settings: { ...it.settings, title: "Настройки", lead: "Язык. Остаётся на этом телефоне.", language: "Язык" },
  qty: { minus: "Меньше", plus: "Больше" },
  missing: { title: "Не найдено", lead: "Вернись и выбери другое.", back: "Объект" },
};

export const messages: Record<AppLocale, Dict> = { it, bg, ro, sq, ru };
