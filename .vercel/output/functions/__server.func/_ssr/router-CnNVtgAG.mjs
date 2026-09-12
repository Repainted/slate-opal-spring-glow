import { i as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, P as redirect, R as notFound, _ as Link, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as useRouter, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as CalendarRange, c as Menu, m as Footprints, p as History, r as TriangleAlert, t as X, u as MapPin } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seo-C2PE7HuO.js
var SITE = {
	name: "Portale Monti Lepini",
	tagline: "26 borghi. 3000 anni di storia. Una natura straordinaria.",
	description: "Enciclopedia digitale dei 26 comuni dei Monti Lepini, tra Latina, Roma e Frosinone: borghi, sentieri, natura, calendario e imprese del territorio."
};
function titleFor(page) {
	return `${page} | ${SITE.name}`;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/comuni-D-Qd4265.js
var COMUNI = [
	{
		slug: "sermoneta",
		nome: "Sermoneta",
		provincia: "Latina",
		altitudine: 257,
		abitanti: 8500,
		patrono: "San Michele Arcangelo",
		lat: 41.549,
		lng: 12.981,
		headline: "Il borgo del Castello Caetani",
		sommario: "Gioiello medievale arroccato sul versante pontino, dominato dal Castello Caetani. A pochi chilometri i Giardini di Ninfa. Bandiera Arancione TCI dal 2006: è il comune lepino con l'accoglienza più strutturata.",
		daVedere: [
			"Castello Caetani",
			"Cattedrale di Santa Maria",
			"Giardini di Ninfa",
			"Loggia dei Mercanti"
		],
		tag: [
			"medievale",
			"castello",
			"archeologia"
		],
		bandieraArancione: true
	},
	{
		slug: "cori",
		nome: "Cori",
		provincia: "Latina",
		altitudine: 380,
		abitanti: 10449,
		patrono: "Sant'Oliva",
		lat: 41.644,
		lng: 12.911,
		headline: "Templi romani e origini volsche",
		sommario: "Uno dei centri più antichi del Lazio. Il Tempio di Ercole e il Tempio dei Dioscuri restano visibili nel tessuto urbano. Punto di partenza verso Monte Lupone (sentiero CAI 701).",
		daVedere: [
			"Tempio di Ercole",
			"Tempio dei Dioscuri",
			"Santuario della Madonna del Soccorso",
			"Selva di Cori"
		],
		tag: [
			"volsci",
			"archeologia",
			"medievale",
			"natura"
		],
		bandieraArancione: false
	},
	{
		slug: "norma",
		nome: "Norma",
		provincia: "Latina",
		altitudine: 411,
		abitanti: 4200,
		patrono: "San Giovanni Battista",
		lat: 41.584,
		lng: 12.971,
		headline: "Sull'antica Norba, la piccola Pompei dei Lepini",
		sommario: "Il paese moderno sorge accanto alle rovine di Norba, colonia latina del V secolo a.C. Mura poligonali e acropoli dominano la piana e Ninfa. Archeologia e panorama nello stesso sguardo.",
		daVedere: [
			"Area archeologica di Norba",
			"Mura poligonali",
			"Belvedere sulla Pianura Pontina",
			"Ninfa"
		],
		tag: [
			"archeologia",
			"volsci",
			"medievale"
		],
		bandieraArancione: false
	},
	{
		slug: "bassiano",
		nome: "Bassiano",
		provincia: "Latina",
		altitudine: 535,
		abitanti: 1500,
		patrono: "Sant'Erasmo",
		lat: 41.549,
		lng: 13.085,
		headline: "Il borgo rotondo sotto il Semprevisa",
		sommario: "Pianta circolare unica nel Lazio, Bandiera Arancione TCI. Base naturale per Pian della Faggeta e la vetta del Semprevisa (1536 m), la più alta dei Lepini.",
		daVedere: [
			"Centro storico circolare",
			"Santuario del Crocifisso",
			"Pian della Faggeta",
			"Monte Semprevisa"
		],
		tag: [
			"medievale",
			"natura",
			"lento"
		],
		bandieraArancione: true
	},
	{
		slug: "maenza",
		nome: "Maenza",
		provincia: "Latina",
		altitudine: 431,
		abitanti: 3e3,
		patrono: "Sant'Eleuterio",
		lat: 41.524,
		lng: 13.181,
		headline: "Castello e ulivi sulla piana pontina",
		sommario: "Borgo medievale col Castello baronale e un fronte di ulivi secolari. Ciliegie e olio sono le produzioni che lo legano alla rete enogastronomica lepina.",
		daVedere: [
			"Castello baronale",
			"Centro storico",
			"Ulivi secolari",
			"Panorama sulla piana"
		],
		tag: [
			"castello",
			"medievale",
			"olio",
			"enogastro"
		],
		bandieraArancione: false
	},
	{
		slug: "priverno",
		nome: "Priverno",
		provincia: "Latina",
		altitudine: 151,
		abitanti: 14e3,
		patrono: "San Tommaso d'Aquino",
		lat: 41.472,
		lng: 13.179,
		headline: "Fossanova e l'eredità di Tommaso d'Aquino",
		sommario: "Città volsca, oggi centro commerciale e culturale del comprensorio. L'Abbazia cistercense di Fossanova, dove Tommaso morì nel 1274, è Bandiera Arancione come frazione. Sede della Compagnia dei Lepini.",
		daVedere: [
			"Abbazia di Fossanova",
			"Museo archeologico",
			"Castello di San Martino",
			"Centro storico"
		],
		tag: [
			"abbazia",
			"archeologia",
			"volsci",
			"cultura"
		],
		bandieraArancione: true,
		note: "La Bandiera Arancione è riconosciuta alla frazione Fossanova."
	},
	{
		slug: "prossedi",
		nome: "Prossedi",
		provincia: "Latina",
		altitudine: 533,
		abitanti: 900,
		patrono: "Sant'Agata",
		lat: 41.517,
		lng: 13.26,
		headline: "Silenzio, fichi e un castello",
		sommario: "Tra i comuni più piccoli e integri. Bandiera Arancione TCI. Fichi di Prossedi, paesaggi aperti, ritmo lento. Non è una vetrina: è un borgo che va visitato senza fretta.",
		daVedere: [
			"Castello",
			"Centro storico",
			"Paesaggio agricolo",
			"Fichi tipici"
		],
		tag: [
			"lento",
			"medievale",
			"enogastro",
			"castello"
		],
		bandieraArancione: true
	},
	{
		slug: "rocca-massima",
		nome: "Rocca Massima",
		provincia: "Latina",
		altitudine: 822,
		abitanti: 1300,
		patrono: "San Michele Arcangelo",
		lat: 41.679,
		lng: 12.919,
		headline: "Il tetto dei Lepini sulla pianura",
		sommario: "A 822 metri è il borgo più alto del versante pontino. Panorama a 360°. Da qui parte il sentiero CAI 736, detto Flying in the Sky.",
		daVedere: [
			"Belvedere",
			"Centro medievale",
			"Sentiero 736",
			"Rovine del castello"
		],
		tag: [
			"natura",
			"medievale",
			"lento"
		],
		bandieraArancione: false
	},
	{
		slug: "roccagorga",
		nome: "Roccagorga",
		provincia: "Latina",
		altitudine: 354,
		abitanti: 4500,
		patrono: "Sant'Erasmo di Formia",
		lat: 41.526,
		lng: 13.155,
		headline: "Memoria del 1913, oliveti e sorgenti",
		sommario: "Noto per la strage del 6 gennaio 1913, oggi tiene viva una memoria sociale rara nei portali turistici. Etnomuseo dei Monti Lepini. Territorio di oliveti e acqua.",
		daVedere: [
			"Etnomuseo dei Monti Lepini",
			"Centro storico",
			"Sorgenti",
			"Oliveti"
		],
		tag: [
			"olio",
			"natura",
			"cultura"
		],
		bandieraArancione: false
	},
	{
		slug: "roccasecca-dei-volsci",
		nome: "Roccasecca dei Volsci",
		provincia: "Latina",
		altitudine: 472,
		abitanti: 950,
		patrono: "San Massimo Martire",
		lat: 41.508,
		lng: 13.214,
		headline: "Piccolo borgo volsco, paesaggi intatti",
		sommario: "Uno dei comuni più silenziosi. Origini volsche, agricoltura, turismo lento. Non ha marchi nazionali: va raccontato per quello che è, non livellato sui capoluoghi.",
		daVedere: [
			"Centro storico",
			"Paesaggio agricolo",
			"Panorama sui Volsci"
		],
		tag: [
			"volsci",
			"lento",
			"natura"
		],
		bandieraArancione: false
	},
	{
		slug: "sezze",
		nome: "Sezze",
		provincia: "Latina",
		altitudine: 319,
		abitanti: 24e3,
		patrono: "San Lidano e San Carlo da Sezze",
		lat: 41.498,
		lng: 13.059,
		headline: "L'antica Setia: vino, olio, città romana",
		sommario: "Il centro più popoloso dei Lepini. Origini romane (Setia), Cesanese, olio, carciofo. Museo della città romana. Non è un borgo da cartolina: è una città di lavoro che guarda la piana.",
		daVedere: [
			"Museo della città romana",
			"Centro storico",
			"Terrazze sulla piana",
			"Produzioni agricole"
		],
		tag: [
			"vino",
			"olio",
			"enogastro",
			"archeologia"
		],
		bandieraArancione: false
	},
	{
		slug: "sonnino",
		nome: "Sonnino",
		provincia: "Latina",
		altitudine: 439,
		abitanti: 6700,
		patrono: "San Marco e San Gaspare del Bufalo",
		lat: 41.413,
		lng: 13.245,
		headline: "Fra' Diavolo, leggende e crinale",
		sommario: "Patria del brigante Michele Pezza, detto Fra' Diavolo. Centro storico autentico, paesaggi aspri verso gli Ausoni. Tradizione agricola e identità forte, spesso assente dai cataloghi nazionali.",
		daVedere: [
			"Centro storico",
			"Memorie del brigantaggio",
			"Panorami",
			"Tradizioni agricole"
		],
		tag: [
			"medievale",
			"cultura",
			"lento"
		],
		bandieraArancione: false
	},
	{
		slug: "artena",
		nome: "Artena",
		provincia: "Roma",
		altitudine: 412,
		abitanti: 15e3,
		patrono: "San Giovanni Battista",
		lat: 41.739,
		lng: 12.912,
		headline: "Borgo rupestre alle porte di Roma",
		sommario: "Città metropolitana di Roma, ai piedi dei Lepini. Centro medievale, grotte, carsismo. Ponte tra la capitale e il comprensorio: spesso il primo lepino che si incontra venendo da sud-est di Roma.",
		daVedere: [
			"Centro storico",
			"Grotte e fenomeni carsici",
			"Panorama sulla valle"
		],
		tag: [
			"carsismo",
			"medievale",
			"natura"
		],
		bandieraArancione: false
	},
	{
		slug: "carpineto-romano",
		nome: "Carpineto Romano",
		provincia: "Roma",
		altitudine: 550,
		abitanti: 4500,
		patrono: "San Pietro in Vincoli",
		lat: 41.605,
		lng: 13.085,
		headline: "Il paese di Leone XIII, sotto il Semprevisa",
		sommario: "Patria di Vincenzo Gioacchino Pecci, Papa Leone XIII (1810). Palazzo Pecci, chiese, faggete. Versante interno della catena, affaccio sulla valle del Sacco.",
		daVedere: [
			"Palazzo Pecci",
			"Chiese storiche",
			"Faggete del Semprevisa",
			"Centro storico"
		],
		tag: [
			"natura",
			"cultura",
			"medievale"
		],
		bandieraArancione: false
	},
	{
		slug: "gorga",
		nome: "Gorga",
		provincia: "Roma",
		altitudine: 822,
		abitanti: 800,
		patrono: "San Domenico",
		lat: 41.655,
		lng: 13.107,
		headline: "Il borgo più piccolo, tra cielo e crinale",
		sommario: "Meno di mille abitanti, 822 metri. Tra i più integri. Non ha flussi turistici strutturati: è un osservatorio sul crinale, da trattare con rispetto, non come attrazione.",
		daVedere: [
			"Centro medievale",
			"Paesaggio d'alta quota",
			"Silenzio del crinale"
		],
		tag: [
			"lento",
			"natura",
			"medievale"
		],
		bandieraArancione: false
	},
	{
		slug: "montelanico",
		nome: "Montelanico",
		provincia: "Roma",
		altitudine: 588,
		abitanti: 2100,
		patrono: "San Michele Arcangelo",
		lat: 41.651,
		lng: 13.04,
		headline: "Farinata, boschi, casa del Portale",
		sommario: "Borgo della farinata e dei boschi di cerro e carpino. Da qui nasce Lepini Digital e questo portale. Calanchi, identità gastronomica, posizione di cerniera tra i due versanti.",
		daVedere: [
			"Centro storico",
			"Boschi di cerro",
			"Tradizione della farinata",
			"Calanchi"
		],
		tag: [
			"enogastro",
			"natura",
			"lento"
		],
		bandieraArancione: false
	},
	{
		slug: "segni",
		nome: "Segni",
		provincia: "Roma",
		altitudine: 668,
		abitanti: 9e3,
		patrono: "San Bruno di Colonia",
		lat: 41.689,
		lng: 13.019,
		headline: "Signia: mura ciclopiche dei Volsci",
		sommario: "Città volsca con mura poligonali del VI-V secolo a.C. Porta monumentale e acropoli ancora visibili. Campo di Segni è partenza del CAI 702 per Monte Lupone.",
		daVedere: [
			"Mura ciclopiche",
			"Porta saracena",
			"Acropoli",
			"Campo di Segni"
		],
		tag: [
			"volsci",
			"archeologia",
			"natura"
		],
		bandieraArancione: false
	},
	{
		slug: "amaseno",
		nome: "Amaseno",
		provincia: "Frosinone",
		altitudine: 280,
		abitanti: 4600,
		patrono: "San Lorenzo",
		lat: 41.467,
		lng: 13.335,
		headline: "Valle del fiume, santuario, costume ciociaro",
		sommario: "Ai piedi dei Lepini meridionali, verso gli Ausoni. Santuario della Madonna di Canneto, fiume Amaseno, tradizione del costume. Ponte naturale col versante frusinate.",
		daVedere: [
			"Santuario della Madonna di Canneto",
			"Fiume Amaseno",
			"Costume tradizionale"
		],
		tag: [
			"cultura",
			"natura",
			"enogastro"
		],
		bandieraArancione: false
	},
	{
		slug: "castro-dei-volsci",
		nome: "Castro dei Volsci",
		provincia: "Frosinone",
		altitudine: 400,
		abitanti: 5e3,
		patrono: "Sant'Oliva di Anagni",
		lat: 41.508,
		lng: 13.406,
		headline: "Confine Lepini-Ausoni, Bandiera Arancione",
		sommario: "Origine volsca, olio e vino, crocevia di civiltà. Bandiera Arancione TCI. Sta sul bordo del comprensorio: va tenuto nel racconto, non tagliato perché «è già Ciociaria».",
		daVedere: [
			"Centro storico",
			"Oliveti",
			"Paesaggio di confine"
		],
		tag: [
			"volsci",
			"olio",
			"vino",
			"enogastro"
		],
		bandieraArancione: true
	},
	{
		slug: "giuliano-di-roma",
		nome: "Giuliano di Roma",
		provincia: "Frosinone",
		altitudine: 470,
		abitanti: 2e3,
		patrono: "San Biagio",
		lat: 41.54,
		lng: 13.28,
		headline: "Ulivi e silenzio sul versante meridionale",
		sommario: "Piccolo comune tra Lepini e Ausoni. Oliveti, pascoli, assenza di sovraesposizione turistica. Utile come tappa lenta tra Priverno e la Ciociaria.",
		daVedere: [
			"Centro storico",
			"Oliveti",
			"Paesaggi aperti"
		],
		tag: [
			"olio",
			"lento",
			"natura"
		],
		bandieraArancione: false
	},
	{
		slug: "morolo",
		nome: "Morolo",
		provincia: "Frosinone",
		altitudine: 349,
		abitanti: 3e3,
		patrono: "San Michele Arcangelo",
		lat: 41.638,
		lng: 13.197,
		headline: "Fichi secchi e Valle del Sacco",
		sommario: "Ai piedi del versante interno. Fichi secchi, tradizioni contadine. Guarda la Valle del Sacco, non la piana pontina: è il Lepino «di qua dal crinale».",
		daVedere: [
			"Centro storico",
			"Produzione di fichi",
			"Versante sulla Valle del Sacco"
		],
		tag: ["enogastro", "lento"],
		bandieraArancione: false
	},
	{
		slug: "patrica",
		nome: "Patrica",
		provincia: "Frosinone",
		altitudine: 450,
		abitanti: 3e3,
		patrono: "San Giovanni Battista",
		lat: 41.592,
		lng: 13.244,
		headline: "Monte Cacume e il crinale interno",
		sommario: "Sotto il profilo del Monte Cacume. Territorio di sentieri verso l'interno della catena, olio, comunità montana. Punto di raccordo tra i comuni del versante frusinate.",
		daVedere: [
			"Monte Cacume",
			"Centro storico",
			"Sentieri interni"
		],
		tag: [
			"natura",
			"olio",
			"lento"
		],
		bandieraArancione: false
	},
	{
		slug: "sgurgola",
		nome: "Sgurgola",
		provincia: "Frosinone",
		altitudine: 386,
		abitanti: 2500,
		patrono: "San Leonardo",
		lat: 41.668,
		lng: 13.149,
		headline: "Versante interno, tra Anagni e i boschi",
		sommario: "Guarda la valle di Anagni. Storia legata al papato e alla Ciociaria, boschi verso Gorga e Carpineto. Un Lepino che parla con la Valle del Sacco più che con Latina.",
		daVedere: [
			"Centro storico",
			"Boschi",
			"Vista sulla valle"
		],
		tag: [
			"natura",
			"cultura",
			"lento"
		],
		bandieraArancione: false
	},
	{
		slug: "supino",
		nome: "Supino",
		provincia: "Frosinone",
		altitudine: 321,
		abitanti: 4800,
		patrono: "San Pietro",
		lat: 41.617,
		lng: 13.234,
		headline: "Tra il crinale e la valle, olio e lavoro",
		sommario: "Comune di mezzo: né borgo da cartolina né città. Olio, artigianato, accesso ai sentieri. Rappresenta il Lepino quotidiano, quello per cui il digitale deve servire alle imprese, non solo ai turisti.",
		daVedere: [
			"Centro storico",
			"Oliveti",
			"Accesso ai sentieri"
		],
		tag: ["olio", "enogastro"],
		bandieraArancione: false
	},
	{
		slug: "vallecorsa",
		nome: "Vallecorsa",
		provincia: "Frosinone",
		altitudine: 350,
		abitanti: 2500,
		patrono: "San Michele Arcangelo",
		lat: 41.444,
		lng: 13.404,
		headline: "Confine meridionale, memoria e pietra",
		sommario: "Estremo sud-est del racconto lepino, verso gli Ausoni. Pietra, olio, memoria novecentesca. Va tenuto nel perimetro: il comprensorio non finisce a Priverno.",
		daVedere: [
			"Centro storico",
			"Paesaggio di pietra",
			"Tradizioni"
		],
		tag: [
			"cultura",
			"lento",
			"olio"
		],
		bandieraArancione: false
	},
	{
		slug: "villa-santo-stefano",
		nome: "Villa Santo Stefano",
		provincia: "Frosinone",
		altitudine: 200,
		abitanti: 2500,
		patrono: "Santo Stefano Protomartire",
		lat: 41.508,
		lng: 13.31,
		headline: "Ciociaria rurale, silenzio agricolo",
		sommario: "Comune agricolo del bordo orientale. Poche pagine turistiche, molta campagna. Nel dataset perché il Portale racconta il comprensorio intero, non solo i sette borghi da cartolina.",
		daVedere: [
			"Paesaggio agricolo",
			"Centro paese",
			"Tradizioni rurali"
		],
		tag: ["lento", "enogastro"],
		bandieraArancione: false
	}
];
var STATS = {
	comuni: COMUNI.length,
	vetta: 1536,
	vettaNome: "Monte Semprevisa",
	orchidee: "~50",
	uccelli: 168,
	anniStoria: 3e3,
	centro: {
		lat: 41.58,
		lng: 13.08
	}
};
function getComune(slug) {
	return COMUNI.find((c) => c.slug === slug);
}
/** Foto borgo recuperate dal Portale originale. Mancano Giuliano, Sgurgola, Villa Santo Stefano. */
var FOTO_COMUNI = /* @__PURE__ */ new Set([
	"amaseno",
	"artena",
	"bassiano",
	"carpineto-romano",
	"castro-dei-volsci",
	"cori",
	"gorga",
	"maenza",
	"montelanico",
	"morolo",
	"norma",
	"patrica",
	"priverno",
	"prossedi",
	"rocca-massima",
	"roccagorga",
	"roccasecca-dei-volsci",
	"segni",
	"sermoneta",
	"sezze",
	"sonnino",
	"supino",
	"vallecorsa"
]);
function fotoComune(slug) {
	return FOTO_COMUNI.has(slug) ? `/images/comuni/${slug}.jpg` : null;
}
function comuniByProvincia() {
	return {
		Latina: COMUNI.filter((c) => c.provincia === "Latina"),
		Roma: COMUNI.filter((c) => c.provincia === "Roma"),
		Frosinone: COMUNI.filter((c) => c.provincia === "Frosinone")
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/schede-CIVTKEvZ.js
var SCHEDE = {
	amaseno: {
		"slug": "amaseno",
		"festaPatronale": "10 agosto",
		"cap": "03021",
		"comunitaMontana": "Valle dell'Amaseno",
		"storia": {
			"intro": "Amaseno sorge nella valle omonima che segna il confine meridionale dei Lepini. Il borgo medievale è dominato dal campanile della chiesa madre.",
			"epoche": [],
			"personaggi": [{
				"anni": "",
				"nome": "Santa Maria Goretti",
				"nota": "La santa della purezza (1890-1902) nacque a Corinaldo ma la sua storia è legata al Pontino e alla zone limitrofa"
			}]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Amaseno comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Collegiata di Santa Maria Assunta",
				"secolo": "",
				"stile": "Gotico-cistercense, tra i primi esempi in Italia di arco a sesto acuto",
				"testo": "Stile: Gotico-cistercense, tra i primi esempi in Italia di arco a sesto acuto",
				"opere": ["Pulpito di Pietro e Giacomo Gullimari da Piperno", "Reliquia del \"Sangue di San Lorenzo\""]
			}, {
				"nome": "Chiesa di San Pietro Apostolo",
				"secolo": "XIV secolo",
				"stile": "Tre navate, abside settecentesca",
				"testo": "Stile: Tre navate, abside settecentesca",
				"opere": []
			}],
			"monumenti": [{
				"nome": "Rocca Castri",
				"tipo": "",
				"secolo": "XIII secolo circa",
				"testo": "XIII secolo circa"
			}, {
				"nome": "Cinta muraria medievale",
				"tipo": "Mura",
				"secolo": "",
				"testo": "Medioevo"
			}]
		},
		"natura": {
			"intro": "La Valle dell'Amaseno, più ricca di elementi termofili rispetto al resto dei Lepini, alterna boschi cedui a coltivazioni di olivo (Parco degli Ulivi) e un'intensa zootecnia bufalina.",
			"sentieri": [{
				"nome": "Cammino della Regina Camilla, tappe Vallecorsa-Amaseno-Pisterzo",
				"difficolta": "Tappe 9-10 del cammin",
				"testo": "Tappe 9-10 del cammino a lunga percorrenza della Valle dell'Amaseno."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "Miracolo di San Lorenzo",
				"tipo": "Religiosa",
				"quando": "10 agosto",
				"testo": "Liquefazione del sangue del santo conservato in un'ampolla presso la Chiesa di Santa Maria (1165), tra l'8 e il 9 agosto, celebrata il 10."
			}, {
				"nome": "I Love Bufala — Festa dell'Agricoltura",
				"tipo": "Gastronomica",
				"quando": "estate",
				"testo": "Nata nel 1996 dagli allevatori locali per promuovere mozzarella e carne di bufala; oltre 14.000 bufale allevate sul territorio."
			}],
			"prodotti": "mozzarella di bufala, trecce e nodini di bufala, ricotta fresca e salata, caciotta, primosale",
			"piatti": ""
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Ristorante Da Giotto",
			"categoria": "Ristorante/Pizzeria",
			"descrizione": "Ristorante-pizzeria con cucina casalinga ciociara: ricotta, salsicce, gnocchi e carne di bufala.",
			"prodotti": "",
			"indirizzo": "",
			"sito": "https://www.dagiottoamaseno.it/",
			"nota": ""
		}]
	},
	artena: {
		"slug": "artena",
		"festaPatronale": "24 giugno",
		"cap": "00031",
		"comunitaMontana": "Monti Lepini — versante romano",
		"storia": {
			"intro": "Artena sorge sull'antica Ecetra volsca (V-IV sec. a.C.) e conserva straordinarie mura poligonali. Il centro storico medievale è quasi integralmente conservato.",
			"epoche": [],
			"personaggi": [{
				"anni": "1807-1882",
				"nome": "Giuseppe Garibaldi",
				"nota": "Nel luglio 1849, in fuga da Roma dopo la caduta della Repubblica Romana, soggiornò una notte a Montefortino (odierna Artena) con 4.000 uomini prima di dirigersi verso Venezia."
			}]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Artena comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Chiesa di Santa Croce",
				"secolo": "",
				"stile": "",
				"testo": "Fondata dai Conti di Segni, ricostruita su commissione del principe Giovan Battista Borghese (architetto Domenico Terzago, capomastro Franco Buratti).",
				"opere": []
			}],
			"monumenti": [
				{
					"nome": "Palazzo Borghese",
					"tipo": "",
					"secolo": "",
					"testo": "XVII secolo (ristrutturato 1615-1618)"
				},
				{
					"nome": "Arco Borghese",
					"tipo": "",
					"secolo": "XVII secolo",
					"testo": "XVII secolo"
				},
				{
					"nome": "Mura pre-romane di Piano della Civita",
					"tipo": "",
					"secolo": "",
					"testo": "Italico-romano (datazione incerta)"
				}
			]
		},
		"natura": {
			"intro": "Territorio collinare e pianeggiante vocato ai cereali (grano duro, tenero, mais), con attività pastorale ancora fiorente.",
			"sentieri": []
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "Festa Maria SS. delle Grazie",
				"tipo": "Religiosa",
				"quando": "3ª/4ª domenica di maggio",
				"testo": ""
			}, {
				"nome": "Palio delle Contrade",
				"tipo": "Civile",
				"quando": "agosto",
				"testo": ""
			}],
			"prodotti": "giuncata, formaggio locale, ricotta",
			"piatti": "carbonara, penne al mascarpone, trippa alla romana, polenta con spuntature di maiale, crostini alla ponticiana, pane artenese"
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Agriturismo La Rocca dei Briganti",
			"categoria": "Agriturismo",
			"descrizione": "Azienda agricola biologica di oltre 40 ettari nei Monti Lepini: olio EVO biologico, formaggi di pecora e capra, Suino Nero, bovini e pollame da cortile.",
			"prodotti": "olio EVO biologico, formaggi, salumi",
			"indirizzo": "",
			"sito": "https://www.roccadeibriganti.com/",
			"nota": ""
		}, {
			"nome": "Fattoria Colle San Nicola",
			"categoria": "Azienda agricola / Caseificio",
			"descrizione": "Azienda a filiera chiusa su 50 ettari: allevamento bovino, fior di latte e formaggi artigianali premiati, macelleria propria.",
			"prodotti": "fior di latte, formaggi, carne, verdure km0",
			"indirizzo": "",
			"sito": "https://www.fattoriacollesannicola.it/",
			"nota": ""
		}]
	},
	bassiano: {
		"slug": "bassiano",
		"festaPatronale": "2 giugno",
		"cap": "04010",
		"comunitaMontana": "Monti Lepini",
		"storia": {
			"intro": "Di origine medievale, Bassiano fu feudo dei Caetani. Il borgo conserva intatta la sua struttura urbanistica trecentesca con vicoli e archi.",
			"epoche": [],
			"personaggi": [{
				"anni": "",
				"nome": "Albino Lucarelli",
				"nota": "Pittore locale del XIX sec."
			}, {
				"anni": "1449 ca. - 1515",
				"nome": "Aldo Manuzio",
				"nota": "Umanista, tipografo ed editore, fondatore della Aldine Press a Venezia; introdusse il carattere corsivo (1501). Nato a Bassiano (anno di nascita incerto tra il 1449 e il 1452 secondo le fonti)."
			}]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Bassiano comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [
				{
					"nome": "Chiesa di Sant'Erasmo",
					"secolo": "",
					"stile": "Tre navate, restauro neoclassico ottocentesco",
					"testo": "Stile: Tre navate, restauro neoclassico ottocentesco",
					"opere": []
				},
				{
					"nome": "Chiesa di San Nicola",
					"secolo": "",
					"stile": "",
					"testo": "",
					"opere": ["Dipinto attribuito a Girolamo Siciolante da Sermoneta", "Fonte battesimale marmoreo romanico (XII sec.)"]
				},
				{
					"nome": "Santuario del Crocifisso (Selva Scura)",
					"secolo": "XVII secolo",
					"stile": "",
					"testo": "",
					"opere": ["Crocifisso ligneo di Fra' Vincenzo Pietrosanti (1673)", "Affreschi quattrocenteschi nella grotta"]
				}
			],
			"monumenti": [{
				"nome": "Mura castellane e borgo a spirale",
				"tipo": "",
				"secolo": "XIII secolo, epoca Caetani",
				"testo": "XIII secolo, epoca Caetani"
			}, {
				"nome": "Torre Civica",
				"tipo": "Torre",
				"secolo": "",
				"testo": "Medioevo"
			}]
		},
		"natura": {
			"intro": "Bassiano è il comune di riferimento per le ascensioni al Monte Semprevisa (1536 m): lecceta presso la sorgente di Sant'Angelo, faggeta nella parte alta.",
			"sentieri": [{
				"nome": "Sentiero per il Monte Semprevisa da Bassiano",
				"difficolta": "TRADIZIONI -->",
				"testo": "Ascesa alla vetta più alta dei Lepini (1536 m), diversi percorsi documentati incluso il \"Sentiero Daniele Nardi\"."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "Sagra del Prosciutto di Bassiano",
				"tipo": "Gastronomica",
				"quando": "25-27 luglio",
				"testo": "Degustazioni dai produttori, passeggiate naturalistiche, giochi popolari tradizionali (\"Palio del Cavallo\")."
			}],
			"prodotti": "Prosciutto di Bassiano",
			"piatti": ""
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [
			{
				"nome": "Prosciuttificio di Bassiano — F.lli Martena",
				"categoria": "Salumificio",
				"descrizione": "Produttore del Prosciutto di Bassiano, prodotto agroalimentare tradizionale laziale, salato e leggermente affumicato, stagionato sfruttando il microclima locale.",
				"prodotti": "Prosciutto di Bassiano",
				"indirizzo": "",
				"sito": "https://www.prosciuttificiodibassiano.com/",
				"nota": ""
			},
			{
				"nome": "Prosciutto di Bassiano Reggiani",
				"categoria": "Salumificio",
				"descrizione": "Azienda storica nei boschi di faggio di Bassiano (~650 m), produce il Prosciutto di Bassiano con stagionatura di 17-18 mesi e affumicatura a legna di faggio.",
				"prodotti": "Prosciutto di Bassiano",
				"indirizzo": "",
				"sito": "https://www.prosciuttodibassiano.it/",
				"nota": ""
			},
			{
				"nome": "Terre dei Principi",
				"categoria": "Ristorante",
				"descrizione": "Ristorante nel centro storico di Bassiano, cucina italiana tradizionale.",
				"prodotti": "",
				"indirizzo": "Salita della Croce, 1, Bassiano LT",
				"sito": "https://www.compagniadeilepini.it",
				"nota": ""
			}
		]
	},
	"carpineto-romano": {
		"slug": "carpineto-romano",
		"festaPatronale": "29 giugno",
		"cap": "00032",
		"comunitaMontana": "XVIII Monti Lepini",
		"storia": {
			"intro": "Carpineto Romano è uno dei borghi storicamente più significativi dell'area lepina. Le prime testimonianze scritte risalgono al 1077, quando il territorio era dominato dai Canonici Lateranensi, affittato alla famiglia De Ceccano. Nel 1299 passò ai Caetani, restando nelle loro mani fino al XIV secolo. Il borgo conobbe il suo massimo splendore culturale tra il XVI e il XVII secolo, grazie alle committenze delle grandi famiglie nobili — tra cui gli Aldobrandini — e alla presenza di artisti di primo piano. Ma il momento più celebre nella storia di Carpineto Romano rimane il 2 marzo 1810, quando nacque Gioacchino Vincenzo Pecci, che nel 1878 sarebbe diventato Papa Leone XIII. Uno dei pontificati più lunghi della storia moderna (fino al 1903), durante il quale Carpineto fu abbellita con chiese, fontane, ospedali e scuole per volontà del pontefice.",
			"epoche": [
				{
					"periodo": "Medioevo",
					"titolo": "Dai Canonici Lateranensi ai Caetani",
					"testo": "Il primo documento che cita Carpineto è del 1077. Il borgo fu feudo dei De Ceccano fino al 1299, poi dei Caetani. Nel XIV-XV secolo conobbe un periodo di prosperità con la costruzione delle principali chiese e il rafforzamento del centro storico."
				},
				{
					"periodo": "Rinascimento",
					"titolo": "Le committenze nobiliari e gli artisti",
					"testo": "Nel XVI-XVII secolo Carpineto diventa un centro culturale e artistico. Il Cardinale Pietro Aldobrandini commissiona la chiesa di San Pietro (1610). Il Palazzo Pecci viene ampliato. Artisti legati alla scuola romana operano nel borgo."
				},
				{
					"periodo": "Età moderna",
					"titolo": "Papa Leone XIII e il periodo aureo",
					"testo": "Gioacchino Vincenzo Pecci nasce a Carpineto Romano il 2 marzo 1810 nel Palazzo Pecci. Diventato Papa Leone XIII nel 1878, il pontefice volle abbellire la sua città natale. Durante il suo pontificato Carpineto ricevette nuove chiese, la fontana monumentale, un ospedale e scuole. Leone XIII è noto per la sua apertura al dialogo con la modernità e per l'enciclica Rerum Novarum (1891), pietra miliare della dottrina sociale della Chiesa."
				}
			],
			"personaggi": [{
				"anni": "1810-1903",
				"nome": "Papa Leone XIII (Gioacchino Vincenzo Pecci)",
				"nota": "Papa dal 1878 al 1903, uno dei pontificati più lunghi della storia. Autore della Rerum Novarum."
			}]
		},
		"arte": {
			"intro": "Carpineto Romano possiede un patrimonio artistico di qualità superiore rispetto alla sua dimensione: chiese con opere di scuola romana, il Palazzo Pecci con i suoi saloni storici, il museo civico e una tradizione artistica secolare.",
			"chiese": [
				{
					"nome": "Collegiata del Sacro Cuore",
					"secolo": "XIX secolo",
					"stile": "Neoclassico",
					"testo": "Stile: Neoclassico",
					"opere": []
				},
				{
					"nome": "Chiesa di San Pietro Apostolo con convento",
					"secolo": "",
					"stile": "Tardo-rinascimentale",
					"testo": "Stile: Tardo-rinascimentale",
					"opere": ["Tele di scuola romana del XVII sec.", "Altare ligneo barocco"]
				},
				{
					"nome": "Chiesa di Sant'Agostino con convento",
					"secolo": "XIV-XV secolo",
					"stile": "Gotico-rinascimentale",
					"testo": "Stile: Gotico-rinascimentale",
					"opere": []
				},
				{
					"nome": "Chiesa di San Leone Magno",
					"secolo": "XIX secolo",
					"stile": "",
					"testo": "Dedicata a Papa Leone Magno, richiama il legame del borgo con la tradizione papale.",
					"opere": []
				},
				{
					"nome": "Chiesa di Santa Maria del Popolo",
					"secolo": "XVI-XVII secolo",
					"stile": "",
					"testo": "Con affreschi e opere pittoriche di notevole interesse.",
					"opere": []
				}
			],
			"monumenti": [{
				"nome": "Palazzo Pecci",
				"tipo": "",
				"secolo": "XII-XVIII secolo",
				"testo": "XII-XVIII secolo"
			}, {
				"nome": "Fontana monumentale",
				"tipo": "Fontana",
				"secolo": "Fine XIX secolo",
				"testo": "Fine XIX secolo"
			}]
		},
		"natura": {
			"intro": "Carpineto Romano è immerso nella foresta dei Lepini, con il Monte Capreo (1236 m) e il Monte Semprevisa (1536 m) — la vetta più alta dei Lepini — a breve distanza. L'ambiente naturale è tra i più integri dell'intera area lepina.",
			"sentieri": [{
				"nome": "Sentiero per il Monte Semprevisa",
				"difficolta": "Media",
				"testo": "Il percorso principale che sale da Carpineto Romano (550 m) fino alla vetta del Semprevisa (1536 m), il punto più alto dei Monti Lepini. Attraversa la faggeta e offre panorami straordinari."
			}, {
				"nome": "Anello del Monte Capreo",
				"difficolta": "TRADIZIONI -->",
				"testo": "Giro ad anello che raggiunge la cima del Monte Capreo (1236 m) con la grande croce in ferro visibile da tutta la valle."
			}]
		},
		"tradizioni": {
			"intro": "Le tradizioni di Carpineto Romano sono legate alla figura di Leone XIII, alle antiche pratiche contadine e montanare e alla vivace cultura rurale dei Lepini romani.",
			"feste": [
				{
					"nome": "Festa di San Pietro Apostolo",
					"tipo": "Religiosa",
					"quando": "29 giugno",
					"testo": "Celebrazione patronale con messa solenne, processione e festeggiamenti."
				},
				{
					"nome": "Commemorazione di Leone XIII",
					"tipo": "Civile",
					"quando": "2 marzo (dies natalis del papa)",
					"testo": "Ogni anno il paese ricorda la nascita del suo illustre cittadino con cerimonie culturali e religiose."
				},
				{
					"nome": "Sagra della farinata e dei prodotti del bosco",
					"tipo": "Gastronomica",
					"quando": "Autunno",
					"testo": "Celebrazione dei prodotti tipici locali: funghi porcini, castagne, miele di montagna e farinata."
				}
			],
			"prodotti": "funghi porcini del Semprevisa, castagne, miele di montagna, olio extravergine DOP",
			"piatti": "pasta con i funghi porcini, agnello arrosto alla brace, polenta con spuntature, zuppa di castagne"
		},
		"turismo": {
			"poi": [
				{
					"nome": "Palazzo Pecci e Museo Civico",
					"tipo": "Storico",
					"testo": "Casa natale di Leone XIII con museo. Centro storico."
				},
				{
					"nome": "Monte Semprevisa (1536 m)",
					"tipo": "Naturale",
					"testo": "La vetta più alta dei Lepini. Escursione impegnativa con viste eccezionali."
				},
				{
					"nome": "Faggeta di Carpineto",
					"tipo": "Naturale",
					"testo": "Una delle faggete più belle del Lazio, percorribile su sentieri segnalati del CAI."
				},
				{
					"nome": "Centro storico con le 5 chiese",
					"tipo": "Storico",
					"testo": "Il centro storico conserva cinque chiese storiche, tutte visitabili."
				}
			],
			"arrivo": {
				"auto": "Da Roma: via Casilina (SS6) fino a Valmontone, poi SP per Carpineto (circa 65 km). Da Latina: SS7 poi SP.",
				"treno": "Stazione di Valmontone (25 km)",
				"bus": "Linee COTRAL da Roma (Anagnina)"
			},
			"contatti": {
				"sito": "https://www.comune.carpinetoromano.rm.it",
				"proloco": "",
				"email": "info@comune.carpinetoromano.rm.it"
			}
		},
		"attivita": [{
			"nome": "Agrifoglio del Ciroletto",
			"categoria": "Agriturismo/Agricampeggio",
			"descrizione": "Azienda agricola familiare (~7 ettari, 850 m) nei Monti Lepini: coltiva olivi e castagni, alleva asini, galline e tacchini; agricampeggio e cucina tipica.",
			"prodotti": "olio, castagne",
			"indirizzo": "",
			"sito": "http://www.agrifogliodelciroletto.it/",
			"nota": ""
		}]
	},
	"castro-dei-volsci": {
		"slug": "castro-dei-volsci",
		"festaPatronale": "3 giugno",
		"cap": "03020",
		"comunitaMontana": "Valle dell'Amaseno",
		"storia": {
			"intro": "Castro dei Volsci conserva il nome delle sue origini preromane. Borgo medievale nella Valle del Sacco, al confine tra Lazio e Campania.",
			"epoche": [],
			"personaggi": [{
				"anni": "1921-2004",
				"nome": "Nino Manfredi",
				"nota": "Nato a Castro dei Volsci il 22 marzo 1921, attore, doppiatore e regista, tra i protagonisti della commedia all'italiana. Il paese gli ha dedicato un museo."
			}]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Castro dei Volsci comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Chiesa di San Nicola",
				"secolo": "",
				"stile": "Architettura paleocristiana altomedievale",
				"testo": "Stile: Architettura paleocristiana altomedievale",
				"opere": ["Affreschi medievali con scene dell'Antico e Nuovo Testamento"]
			}, {
				"nome": "Chiesa di Sant'Oliva",
				"secolo": "prima menzione 1125, struttura attuale del 1537",
				"stile": "Elementi barocchi",
				"testo": "Stile: Elementi barocchi",
				"opere": [
					"Portale bronzeo",
					"Dipinto \"Madonna col Bambino\"",
					"\"Crocifissione\" di Odoardo Righi",
					"Reliquia di San Giustino"
				]
			}],
			"monumenti": [
				{
					"nome": "Rocca dei Colonna",
					"tipo": "",
					"secolo": "dal XIV secolo",
					"testo": "dal XIV secolo"
				},
				{
					"nome": "Torre dell'Orologio",
					"tipo": "Torre",
					"secolo": "",
					"testo": "Medioevo"
				},
				{
					"nome": "Monumento alla Mamma Ciociara",
					"tipo": "",
					"secolo": "1964",
					"testo": "1964"
				}
			]
		},
		"natura": {
			"intro": "Boschi di querce e carpini nelle zone montuose, oliveti e vigneti nelle zone collinari.",
			"sentieri": [{
				"nome": "La Via dell'Acqua",
				"difficolta": "Media",
				"testo": "Percorso locale escursionistico nel territorio di Castro dei Volsci."
			}, {
				"nome": "Cammino della Regina Camilla, tappe Villa Santo Stefano-Castro-Vallecorsa",
				"difficolta": "Tappe 7-8 del cammino",
				"testo": "Tappe 7-8 del cammino a lunga percorrenza della Valle dell'Amaseno."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "Festa di Sant'Oliva",
				"tipo": "Religiosa",
				"quando": "3 giugno",
				"testo": "Festa della patrona."
			}, {
				"nome": "Il paese diventa presepe",
				"tipo": "Civile e religiosa",
				"quando": "24 dicembre - 6 gennaio",
				"testo": "Il borgo si trasforma in presepe vivente ottocentesco, botteghe storiche riaperte, abitanti in costume ciociaro."
			}],
			"prodotti": "Salsiccia di Castro dei Volsci (sapore sapido, retrogusto d'arancia, leggermente affumicata), olio d'oliva (comune aderente a Città dell'Olio)",
			"piatti": ""
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Agriturismo La Locanda del Ruspante",
			"categoria": "Agriturismo",
			"descrizione": "Casale di campagna ristrutturato con camere in stile rustico, ristorante con specialità stagionali locali, corsi di cucina, degustazioni.",
			"prodotti": "",
			"indirizzo": "Via Collenuovo 1, Castro dei Volsci FR",
			"sito": "https://www.compagniadeilepini.it",
			"nota": ""
		}]
	},
	cori: {
		"slug": "cori",
		"festaPatronale": "Penultima domenica di giugno",
		"cap": "04010",
		"comunitaMontana": "XIII Monti Lepini Ausoni",
		"storia": {
			"intro": "Cori è tra i centri abitati più antichi del Lazio, con una frequentazione umana documentata da circa 3300 anni. In epoca arcaica era conosciuta come Còra e fu uno dei centri principali del popolo dei Volsci, la tribù italica che per secoli si oppose all'espansione di Roma. Dopo la definitiva romanizzazione nel IV sec. a.C., Còra divenne municipio romano e conobbe un lungo periodo di prosperità testimoniato dai templi e dalle opere pubbliche ancora visibili. Nel Medioevo il borgo si sviluppò attorno all'acropoli, con chiese e conventi che si sovrapposero alle strutture romane. La famiglia Colonna e successivamente i Cenci dominarono il territorio. In epoca moderna Cori mantenne il suo carattere di centro agricolo lepino, con una forte identità comunitaria legata alla patrona Sant'Oliva.",
			"epoche": [
				{
					"periodo": "Antichità",
					"titolo": "Còra, città dei Volsci",
					"testo": "Cori fu un importante centro volsco. Dopo le guerre sannitiche e la definitiva romanizzazione nel IV sec. a.C., divenne municipio romano. A questo periodo risalgono i due templi ancora visibili: il Tempio di Ercole (II-I sec. a.C.) e il Tempio dei Dioscuri (I sec. a.C.), tra i meglio conservati del Lazio."
				},
				{
					"periodo": "Medioevo",
					"titolo": "Chiese e conventi sull'acropoli",
					"testo": "In epoca medievale sull'area del tempio romano venne edificata la chiesa di Sant'Oliva (XII sec.), con annesso convento agostiniano. Il centro storico conserva ancora molti edifici medievali. Cori fu feudo dei Colonna e successivamente di altre famiglie nobili romane."
				},
				{
					"periodo": "Rinascimento",
					"titolo": "Il chiostro degli Agostiniani",
					"testo": "Nel XV secolo, su commissione del Cardinale Guillaume d'Estouteville e di Ambrogio Massari, generale degli Agostiniani originario di Cori, viene realizzato il magnifico chiostro con 27 capitelli marmorei diversi, uno dei capolavori della scultura rinascimentale laziale."
				}
			],
			"personaggi": [{
				"anni": "1430-1485",
				"nome": "Ambrogio Massari",
				"nota": "Generale dell'Ordine Agostiniano, committente del chiostro di Sant'Oliva"
			}]
		},
		"arte": {
			"intro": "Il patrimonio artistico di Cori è eccezionale per un centro di queste dimensioni: templi romani intatti, un complesso conventuale rinascimentale di primo piano, chiese medievali affrescate e un museo civico che raccoglie i reperti dell'antica Còra.",
			"chiese": [
				{
					"nome": "Complesso di Sant'Oliva",
					"secolo": "XII-XV secolo",
					"stile": "Romanico-gotico con chiostro rinascimentale",
					"testo": "Stile: Romanico-gotico con chiostro rinascimentale",
					"opere": [
						"Chiostro con 27 capitelli marmorei diversi (XV sec.)",
						"Affreschi medievali nelle cappelle",
						"Resti del tempio romano inglobati nella struttura",
						"Cappella del Santissimo Crocifisso con ciclo di affreschi"
					]
				},
				{
					"nome": "Chiesa di San Pietro",
					"secolo": "XII-XIV secolo",
					"stile": "Romanico",
					"testo": "Stile: Romanico",
					"opere": []
				},
				{
					"nome": "Chiesa di Santa Maria della Pietà",
					"secolo": "XIV-XVI secolo",
					"stile": "",
					"testo": "Ospita opere pittoriche del periodo tardo-gotico e rinascimentale.",
					"opere": []
				}
			],
			"monumenti": [
				{
					"nome": "Tempio di Ercole",
					"tipo": "",
					"secolo": "",
					"testo": "II-I sec. a.C."
				},
				{
					"nome": "Tempio dei Dioscuri",
					"tipo": "",
					"secolo": "",
					"testo": "I sec. a.C."
				},
				{
					"nome": "Mura poligonali",
					"tipo": "",
					"secolo": "",
					"testo": "IV-III sec. a.C."
				}
			]
		},
		"natura": {
			"intro": "Il territorio di Cori è vario: dalle colline olivetate ai piedi dei Lepini fino ai boschi di cerro e querce che salgono verso i 1000 metri. La zona di Giulianello, nella pianura, è caratterizzata da ambienti umidi e laghi artificiali frequentati dall'avifauna.",
			"sentieri": [
				{
					"nome": "CAI 701 — Spillo di Cori",
					"difficolta": "Erdigheta/Monte Lupon",
					"testo": "Da Cori (Selva di Cori) verso le Plate di Cori e Monte Erdigheta/Monte Lupone."
				},
				{
					"nome": "CAI 705 (da Cori)",
					"difficolta": "Tirinsani) verso le F",
					"testo": "Da Cori (loc. Tirinsani) verso le Fosse di Cori e Monte Lupone."
				},
				{
					"nome": "CAI 706 — Valle delle Vacche",
					"difficolta": "TRADIZIONI -->",
					"testo": "Valle delle Vacche - Valle dell'Inferno, confluenza con il CAI 701 a Monte Lupone."
				}
			]
		},
		"tradizioni": {
			"intro": "Le tradizioni di Cori sono profondamente legate alla patrona Sant'Oliva e alle antiche rivalità tra i rioni del borgo. Il Carosello dei Rioni è la manifestazione civile più importante, mentre la festa patronale è il momento di maggiore coesione della comunità.",
			"feste": [
				{
					"nome": "Carosello Storico dei Rioni di Cori",
					"tipo": "Storica",
					"quando": "Penultima domenica di giugno (coincide con la festa patronale)",
					"testo": "Corteo in costume rinascimentale con i rappresentanti dei tre rioni storici (le 'porte' del borgo). Include giochi storici, il Palio e la cerimonia del giuramento dei Priori al cospetto della patrona. Rievoca il giuramento dei magistrati medievali allo statuto comunale."
				},
				{
					"nome": "Festa di Sant'Oliva",
					"tipo": "Religiosa",
					"quando": "Penultima domenica di giugno",
					"testo": "Solennità patronale con processione, messa solenne e festeggiamenti. La statua della patrona percorre le vie del borgo tra due ali di folla."
				},
				{
					"nome": "Sagra dell'olio e del vino",
					"tipo": "Gastronomica",
					"quando": "Novembre",
					"testo": "Celebrazione dei principali prodotti agricoli del territorio: l'olio extravergine d'oliva (cultivar Itrana) e i vini locali."
				}
			],
			"prodotti": "olio extravergine DOP Colline Pontine (cultivar Itrana), vino bianco Cori DOC, vino rosso Cori DOC, fagioli borlotti locali, castagne",
			"piatti": "fagioli con le cotiche, agnello alla cacciatora, minestra di farro"
		},
		"turismo": {
			"poi": [
				{
					"nome": "Tempio di Ercole e Tempio dei Dioscuri",
					"tipo": "Storico",
					"testo": "I due templi romani nel centro storico, tra i meglio conservati del Lazio."
				},
				{
					"nome": "Complesso di Sant'Oliva",
					"tipo": "Religioso",
					"testo": "Chiesa, convento e chiostro rinascimentale con 27 capitelli diversi."
				},
				{
					"nome": "Panorama dell'acropoli",
					"tipo": "Panoramico",
					"testo": "Vista sulla pianura pontina e sul mare fino alle isole ponziane nelle giornate limpide."
				},
				{
					"nome": "Lago di Giulianello",
					"tipo": "Naturale",
					"testo": "Lago artificiale nella pianura sottostante Cori, meta di birdwatching e pesca."
				}
			],
			"arrivo": {
				"auto": "Da Roma: via Pontina (SS148) uscita Cori-Cisterna, poi SP26. Da Latina: circa 25 km via SS7.",
				"treno": "Stazione di Cisterna di Latina (12 km)",
				"bus": "Linee COTRAL da Roma (Anagnina) e Latina"
			},
			"contatti": {
				"sito": "https://www.comune.cori.lt.it",
				"proloco": "https://www.scoprirecori.it",
				"email": "info@comune.cori.lt.it"
			}
		},
		"attivita": [{
			"nome": "Cooperativa Agricola Cincinnato",
			"categoria": "Cantina",
			"descrizione": "Fondata nel 1947, Cincinnato è la principale realtà vitivinicola del comprensorio Lepino. Con 130 soci e 650 ettari di vigneto (di cui 110 biologici), produce vini da vitigni autoctoni recuperati: Nero Buono di Cori, Bellone, Cesanese, Greco. I vini hanno denominazione Cori DOC e Lazio IGT. Offre anche olio EVO da cultivar Itrana. Dispone di agriturismo con ristorante e ospitalità.",
			"prodotti": "Vino Cori DOC Rosso, Vino Cori DOC Bianco, Bellone IGT, Nero Buono IGT, Cesanese IGT, Olio EVO DOP Colline Pontine",
			"indirizzo": "Via Cori Valle, 00, 04010 Cori LT",
			"sito": "https://www.cincinnato.it",
			"nota": ""
		}]
	},
	"giuliano-di-roma": {
		"slug": "giuliano-di-roma",
		"festaPatronale": "3 febbraio",
		"cap": "03020",
		"comunitaMontana": "Valle dell'Amaseno",
		"storia": {
			"intro": "Giuliano di Roma conserva una chiesa romanica d'interesse storico-artistico. Il territorio è parte della Ciociaria lepina.",
			"epoche": [],
			"personaggi": [{
				"anni": "1813-1887",
				"nome": "Beata Maria Caterina Troiani",
				"nota": "Nata Costanza Troiani a Giuliano di Roma il 19 gennaio 1813, religiosa, fondatrice delle Suore Francescane Missionarie del Cuore Immacolato di Maria, attiva in Egitto dal 1859. Beatificata da Giovanni Paolo II nel 1985."
			}]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Giuliano di Roma comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Chiesa parrocchiale di Santa Maria Maggiore",
				"secolo": "fine XVIII secolo",
				"stile": "Barocco-neoclassico",
				"testo": "Stile: Barocco-neoclassico",
				"opere": [
					"Mastio del castello originale riusato come campanile",
					"Tre portoni bronzei con scene dell'Annunciazione",
					"Coro ligneo intarsiato con 22 stalli"
				]
			}, {
				"nome": "Chiesetta di San Biagio",
				"secolo": "",
				"stile": "",
				"testo": "Sede delle celebrazioni del santo patrono.",
				"opere": []
			}],
			"monumenti": [{
				"nome": "Mastio del castello medievale",
				"tipo": "Torre",
				"secolo": "",
				"testo": "Medioevo, riuso settecentesco"
			}]
		},
		"natura": {
			"intro": "Vegetazione di transizione tra bioclima mediterraneo e appenninico: boschi di leccio, quercia, faggio, castagno e tasso, tra Monte Siserno e Colle Calvello.",
			"sentieri": [{
				"nome": "Cammino della Regina Camilla, tappe Prossedi-Giuliano-Villa Santo Stefano",
				"difficolta": "Tappe 5-6 del cammino",
				"testo": "Tappe 5-6 del cammino a lunga percorrenza della Valle dell'Amaseno."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "San Biagio",
				"tipo": "Religiosa",
				"quando": "ultima domenica di agosto",
				"testo": "Festa del patrono: processione con statua lignea e distribuzione del pane benedetto (\"panuncegli\")."
			}, {
				"nome": "San Rocco",
				"tipo": "Religiosa",
				"quando": "16 agosto",
				"testo": "Processione con statua lignea antica per le vie del paese."
			}],
			"prodotti": "",
			"piatti": ""
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Agriturismo Podere Cervini",
			"categoria": "Agriturismo",
			"descrizione": "Agriturismo a conduzione familiare sulla SS156 dei Monti Lepini, cucina con materie prime di produzione propria a km zero.",
			"prodotti": "",
			"indirizzo": "Via Cervini, 31, Giuliano di Roma FR",
			"sito": "",
			"nota": ""
		}, {
			"nome": "Agriturismo Varcodoro",
			"categoria": "Agriturismo",
			"descrizione": "Piccola azienda agricola familiare attiva dal 2006: camere in stile rustico, ristorante nei weekend, produzione propria di olio, verdure e castagne.",
			"prodotti": "",
			"indirizzo": "",
			"sito": "http://www.varcodoro.it/",
			"nota": ""
		}]
	},
	gorga: {
		"slug": "gorga",
		"festaPatronale": "prima domenica di agosto",
		"cap": "00030",
		"comunitaMontana": "Monti Lepini — versante romano",
		"storia": {
			"intro": "Gorga è uno dei borghi più isolati e autentici dei Lepini, con una comunità montana di antica tradizione. I boschi di faggio circostanti sono tra i più belli del Lazio.",
			"epoche": [],
			"personaggi": [{
				"anni": "1796-1861",
				"nome": "Vincenzo Santucci",
				"nota": "Cardinale, nato a Gorga; mediatore tra Stato Pontificio e Regno di Sardegna durante il Risorgimento."
			}]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Gorga comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Chiesa di San Michele Arcangelo",
				"secolo": "",
				"stile": "Romanico",
				"testo": "Stile: Romanico",
				"opere": ["Croce bizantina"]
			}, {
				"nome": "Chiesa di Santa Maria Assunta",
				"secolo": "circa 1772",
				"stile": "Pianta circolare con cupola ottagonale",
				"testo": "Stile: Pianta circolare con cupola ottagonale",
				"opere": ["Volta affrescata con cielo stellato e Apostoli", "Due pale settecentesche"]
			}],
			"monumenti": [
				{
					"nome": "Fontana monumentale \"La Pastorella\"",
					"tipo": "Fontana",
					"secolo": "1889",
					"testo": "1889"
				},
				{
					"nome": "Palazzo/Castello Doria Pamphili",
					"tipo": "Castello",
					"secolo": "medievale, ricostruito tardo XVI secolo",
					"testo": "medievale, ricostruito tardo XVI secolo"
				},
				{
					"nome": "Grotta di Campo di Caccia",
					"tipo": "Sito naturalistico/speleologico",
					"secolo": "",
					"testo": "Cavità carsica di circa 610 metri di profondità, tra le più importanti dell'area."
				}
			]
		},
		"natura": {
			"intro": "Altopiano carsico (Piani del Lontro) con paesaggio pastorale di capanne e muretti a secco; boschi misti e faggete verso il Semprevisa.",
			"sentieri": [{
				"nome": "CAI 8 — Monte Semprevisa da Pian della Faggeta",
				"difficolta": "TRADIZIONI -->",
				"testo": "Da Pian della Faggeta (865 m, bivio per Gorga) alla vetta del Semprevisa (1536 m), andata e ritorno."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [
				{
					"nome": "Festa della Montagna",
					"tipo": "Civile",
					"quando": "30 luglio",
					"testo": "Mercatini di artigianato e prodotti tipici locali."
				},
				{
					"nome": "Festeggiamenti di San Domenico di Guzman",
					"tipo": "Religiosa",
					"quando": "3-6 agosto",
					"testo": "Triduo solenne, processione, concerti bandistici, spettacolo pirotecnico per il patrono."
				},
				{
					"nome": "Sagra del Cinghiale",
					"tipo": "Gastronomica",
					"quando": "12 agosto",
					"testo": "Organizzata dall'Azienda Faunistica Venatoria \"La Pastorella\"."
				},
				{
					"nome": "Sagra degli Gnocchitti e delle Fregnacce",
					"tipo": "Gastronomica",
					"quando": "agosto",
					"testo": "Gnocchetti di pasta all'uovo e fregnacce (fettuccine irregolari) preparati a mano secondo la tradizione gorgana."
				}
			],
			"prodotti": "olio extravergine locale",
			"piatti": "gnocchitti, fregnacce, cinghiale"
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Il Cavallino Restaurant & Lounge",
			"categoria": "Ristorante",
			"descrizione": "Ristorante con cucina italiana e focus su prodotti locali, antipasti e carne.",
			"prodotti": "",
			"indirizzo": "Via Filippo Turati, 89, Gorga RM",
			"sito": "https://www.compagniadeilepini.it",
			"nota": ""
		}]
	},
	maenza: {
		"slug": "maenza",
		"festaPatronale": "29 maggio",
		"cap": "04010",
		"comunitaMontana": "Monti Lepini",
		"storia": {
			"intro": "Maenza è citata nei documenti medievali come \"castrum Maentiae\". Appartenne ai Caetani e poi agli Acquaviva.",
			"epoche": [],
			"personaggi": [{
				"anni": "1225 ca.-1274",
				"nome": "San Tommaso d'Aquino",
				"nota": "Soggiornò al Castello Baronale nel 1274 prima di recarsi a Fossanova, dove morì."
			}, {
				"anni": "1810-1903 (pontefice 1878-1903)",
				"nome": "Papa Leone XIII (Gioacchino Pecci)",
				"nota": "Legato a Maenza per la residenza familiare a Palazzo Pecci."
			}]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Maenza comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Chiesa di Santa Maria Assunta in Cielo (Duomo)",
				"secolo": "impianto del 1400, restaurata fine XIX secolo",
				"stile": "Neoclassico, tre navate",
				"testo": "Stile: Neoclassico, tre navate",
				"opere": ["\"Assunzione di Maria\" di Vincenzo Pasqualoni (1874)", "Dipinti di Giovanni Cingolani"]
			}, {
				"nome": "Chiesa di Santa Reparata",
				"secolo": "XV secolo",
				"stile": "",
				"testo": "Annesso antico convento francescano, oggi biblioteca comunale.",
				"opere": []
			}],
			"monumenti": [{
				"nome": "Castello Baronale",
				"tipo": "Castello",
				"secolo": "",
				"testo": "torre XII secolo, forma attuale dal 1500"
			}, {
				"nome": "Palazzo Pecci",
				"tipo": "",
				"secolo": "",
				"testo": "Residenza della famiglia Pecci; vi soggiornò da giovane Gioacchino Pecci, futuro Papa Leone XIII. Oggi sede municipale/biblioteca."
			}]
		},
		"natura": {
			"intro": "Nel corridoio Maenza-Carpineto Romano-Montelanico, leccete submontane con fitti arbusteti di erica arborea; boschi di cerro sulle pendici verso il Monte Lupone.",
			"sentieri": [{
				"nome": "San Luca — Alta Via della Fenice — Monte Gemma",
				"difficolta": "Media",
				"testo": "Anello da Maenza al Santuario di San Luca, Monte Sentinella e Monte Gemma."
			}, {
				"nome": "Cammino della Regina Camilla, tappe Roccagorga-Maenza-Prossedi",
				"difficolta": "Tappe 3-4 del cammino",
				"testo": "Tappe 3-4 del cammino a lunga percorrenza della Valle dell'Amaseno."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [
				{
					"nome": "Sagra delle Ciliegie",
					"tipo": "Gastronomica",
					"quando": "inizio giugno",
					"testo": "Stand gastronomici, distribuzione ciliegie, carri allegorici, musica dal vivo, visite al Castello Baronale."
				},
				{
					"nome": "Festa di Sant'Eleuterio",
					"tipo": "Religiosa",
					"quando": "29 maggio",
					"testo": "Festa del patrono con processione serale a torce fino a una cappella rurale."
				},
				{
					"nome": "Assunzione e San Rocco",
					"tipo": "Religiosa",
					"quando": "15-16 agosto",
					"testo": "Processione con serate musicali."
				}
			],
			"prodotti": "ciliegie",
			"piatti": ""
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Frantoio Tomei",
			"categoria": "Frantoio",
			"descrizione": "Frantoio attivo dal 1930, giunto alla quarta generazione: olio extravergine DOP Colline Pontine, olive da tavola, patè di olive.",
			"prodotti": "olio EVO DOP Colline Pontine, olive da tavola, patè di olive",
			"indirizzo": "",
			"sito": "https://www.frantoiotomei.it/",
			"nota": ""
		}]
	},
	montelanico: {
		"slug": "montelanico",
		"festaPatronale": "8 maggio e 29 settembre",
		"cap": "00030",
		"comunitaMontana": "Monti Lepini — versante romano",
		"storia": {
			"intro": "Montelanico sorge in posizione strategica sullo spartiacque dei Lepini. Feudo dei Colonna nel Medioevo.",
			"epoche": [],
			"personaggi": [{
				"anni": "",
				"nome": "Cesare Baronio",
				"nota": "Cardinale e storico della Chiesa (1538-1607), originario di Sora ma vissuto nel territorio"
			}]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Montelanico comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Chiesa di San Pietro Apostolo",
				"secolo": "primi anni del XVIII secolo",
				"stile": "",
				"testo": "",
				"opere": ["Ciborio quattrocentesco"]
			}, {
				"nome": "Chiesa di Santa Maria del Soccorso",
				"secolo": "",
				"stile": "",
				"testo": "",
				"opere": ["Affresco quattrocentesco con Madonna con Bambino"]
			}],
			"monumenti": [{
				"nome": "Castello di Collemezzo",
				"tipo": "",
				"secolo": "",
				"testo": "prima menzione 1182"
			}]
		},
		"natura": {
			"intro": "Vegetazione a transizione da macchia mediterranea in bassa quota a estese faggete in quota, in particolare attorno a Pian della Faggeta e sul Monte Lupone (1378 m).",
			"sentieri": [{
				"nome": "Monte Lupone dal Campo di Segni",
				"difficolta": "TRADIZIONI -->",
				"testo": "Vetta a 1378 m con panorama a 300° dal Golfo di Napoli all'Abruzzo."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "Sagra della Castagna",
				"tipo": "Gastronomica",
				"quando": "autunno",
				"testo": "Nata nel 1962: stand con piatti a base di castagne, dolci artigianali, vino, olio, formaggi locali, musica popolare e danze tradizionali."
			}, {
				"nome": "Festa patronale Madonna del Soccorso",
				"tipo": "Religiosa",
				"quando": "terza domenica di settembre",
				"testo": ""
			}],
			"prodotti": "castagna, vino, olio, formaggi locali",
			"piatti": ""
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Caseificio La Forma",
			"categoria": "Caseificio",
			"descrizione": "Caseificio artigianale, produzione di formaggi freschi e stagionati da latte vaccino proprio.",
			"prodotti": "",
			"indirizzo": "Via Forma, 8, Montelanico RM",
			"sito": "https://www.compagniadeilepini.it",
			"nota": ""
		}]
	},
	morolo: {
		"slug": "morolo",
		"festaPatronale": "8 maggio",
		"cap": "03017",
		"comunitaMontana": "Valle dell'Amaseno",
		"storia": {
			"intro": "Morolo è un comune agricolo della Ciociaria lepina, con tradizione agricola plurisecolare.",
			"epoche": [],
			"personaggi": [{
				"anni": "1854-1917",
				"nome": "Ernesto Biondi",
				"nota": "Scultore nato a Morolo il 30 gennaio 1854; vinse il Grand Prix all'Esposizione di Parigi 1900 con \"Saturnalia\" (oggi Galleria Nazionale d'Arte Moderna di Roma)."
			}]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Morolo comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Chiesa Collegiata di Santa Maria Assunta",
				"secolo": "Portale bronzeo (1973)",
				"stile": "",
				"testo": "",
				"opere": ["Dipinto dell'Assunzione di Sebastiano Conca (1750)", "Portale bronzeo (1973)"]
			}, {
				"nome": "Chiesa di San Pietro",
				"secolo": "origini XI secolo, ampliata nel XVIII secolo",
				"stile": "",
				"testo": "",
				"opere": []
			}],
			"monumenti": [{
				"nome": "Castello dei Colonna",
				"tipo": "",
				"secolo": "feudo Colonna 1422-XVII secolo",
				"testo": "feudo Colonna 1422-XVII secolo"
			}]
		},
		"natura": {
			"intro": "La Valle Sant'Angelo, censita tra i Monumenti Naturali del territorio lepino, ospita pascoli di cavalli e bovini podolici, faggi giganti, aceri di monte, roverelle, tigli e carpini neri secolari.",
			"sentieri": [{
				"nome": "Sprone Maraoni (1338 m) da Morolo",
				"difficolta": "Tornanti tra faggete",
				"testo": "Tornanti tra faggete fino al panorama a 360° su Ernici, Aurunci e Ausoni."
			}, {
				"nome": "Monte Malaina da Morolo",
				"difficolta": "TRADIZIONI -->",
				"testo": "Via Valle Civita, Valle Crestatina, Il Lontro e Fonte del Pisciarello."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "Sagra dei Frascategli",
				"tipo": "Gastronomica",
				"quando": "aprile",
				"testo": "Pasta fatta a mano con acqua, farina e sale, sbriciolata in acqua bollente, condita con sugo di pomodoro e aglio."
			}, {
				"nome": "Sagra della ciambella",
				"tipo": "Gastronomica",
				"quando": "5-8 luglio",
				"testo": "Dedicata alla ciambella dolce e al vino locale."
			}],
			"prodotti": "vino locale",
			"piatti": "frascategli, ciambella dolce"
		},
		"turismo": {
			"poi": [{
				"nome": "",
				"tipo": "",
				"testo": ""
			}, {
				"nome": "",
				"tipo": "",
				"testo": ""
			}],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Agriturismo Le Sodine",
			"categoria": "Agriturismo",
			"descrizione": "Agriturismo con ristorante, alloggi e frantoio proprio: olio, salumi e formaggi consumati in cucina.",
			"prodotti": "",
			"indirizzo": "Via del Farneto, 51, Morolo FR",
			"sito": "https://lesodine.it/",
			"nota": ""
		}, {
			"nome": "Caseificio Scarchilli",
			"categoria": "Caseificio",
			"descrizione": "Produttore storico del Gran Cacio di Morolo (formaggio vaccino semicotto a pasta filata, stagionatura oltre 18 mesi), con ristorante e cantina di stagionatura visitabile.",
			"prodotti": "Gran Cacio di Morolo",
			"indirizzo": "Contrada Madonna del Piano, 12, Morolo FR",
			"sito": "https://www.scarchilli.it/",
			"nota": ""
		}]
	},
	norma: {
		"slug": "norma",
		"festaPatronale": "24 giugno",
		"cap": "04010",
		"comunitaMontana": "XIII Monti Lepini Ausoni",
		"storia": {
			"intro": "Norma sorge a pochi passi dall'antica Norba, una delle città più misteriose dell'Antiappennino laziale. Le origini di Norba risalgono al V sec. a.C.: era una colonia latina fondata come avamposto contro i Volsci. Secondo la leggenda, fu fondata da Ercole stesso. Il significato del nome, proposto dal linguista Giacomo Devoto, sarebbe '(città) forte', perfettamente adatto alla posizione strategica su uno sperone roccioso a picco sulla pianura pontina. Norba fu distrutta nell'89 a.C. durante le guerre sociali (o secondo altre fonti nell'80 a.C. dai soldati di Silla) e mai più ricostruita: i suoi abitanti abbandonarono il sito, fondando il medievale borgo di Norma poco più a est. Le rovine dell'antica città — mura poligonali, templi, porte — sono oggi visitabili nel Parco Archeologico dell'Antica Norba.",
			"epoche": [{
				"periodo": "Antichità",
				"titolo": "Norba, la città forte sul precipizio",
				"testo": "Fondata come colonia latina intorno al 492 a.C. per controllare il territorio pontino. Le mura in opera poligonale (ciclopica) che la circondano sono tra le più impressionanti dell'Italia antica. La città disponeva di due acropoli: sull'Acropoli Maggiore un tempio dedicato a Diana; sull'Acropoli Minore due templi, probabilmente dedicati a Giunone Lucina (protettrice delle nascite) secondo le iscrizioni votive ritrovate. Norba fu distrutta durante le guerre civili romane e mai ricostruita."
			}, {
				"periodo": "Medioevo",
				"titolo": "Norma nasce dalle ceneri di Norba",
				"testo": "Dopo la distruzione di Norba, i sopravvissuti fondarono il nuovo insediamento di Norma sullo stesso pianoro ma in posizione leggermente diversa. Il borgo medievale si sviluppò attorno alla chiesa parrocchiale e al castello. Nel Medioevo Norma fu feudo di varie famiglie nobiliari, tra cui i Caetani."
			}],
			"personaggi": [{
				"anni": "1877-1934",
				"nome": "Gelasio Caetani",
				"nota": "Ingegnere, diplomatico e politico; dal 1921 creò il Giardino di Ninfa (territorio storicamente legato a Norma), poi diresse la bonifica dell'Agro Pontino (1926-1934)."
			}]
		},
		"arte": {
			"intro": "Il patrimonio principale di Norma è il Parco Archeologico dell'Antica Norba, uno dei siti archeologici più imponenti del Lazio. Il borgo medievale conserva la chiesa parrocchiale e alcuni palazzi storici.",
			"chiese": [{
				"nome": "Chiesa di San Giovanni Battista",
				"secolo": "",
				"stile": "Romanico-barocco",
				"testo": "Stile: Romanico-barocco",
				"opere": []
			}, {
				"nome": "Santuario della Madonna del Soccorso",
				"secolo": "XVI-XVII secolo",
				"stile": "",
				"testo": "Luogo di devozione mariana con una tradizione secolare.",
				"opere": []
			}],
			"monumenti": [{
				"nome": "Parco Archeologico dell'Antica Norba",
				"tipo": "",
				"secolo": "",
				"testo": "V-I sec. a.C."
			}]
		},
		"natura": {
			"intro": "Il Parco Archeologico dell'Antica Norba è circondato da boschi di lecci e roverelle che crescono tra le rovine, creando un'atmosfera unica. Il pianoro su cui sorge l'antico sito offre una vista a 360° sulla pianura pontina, sul Circeo e, nelle giornate limpide, sul mare.",
			"sentieri": [{
				"nome": "Sentiero per Monte Lupone (1378 m)",
				"difficolta": "TRADIZIONI -->",
				"testo": "Da Norma, circa 6 ore di cammino, con panorama sulla pianura pontina."
			}]
		},
		"tradizioni": {
			"intro": "Le tradizioni di Norma ruotano attorno alle celebrazioni religiose del patrono e alla memoria dell'antica Norba. La valorizzazione dell'identità storica è oggi al centro della vita culturale del paese.",
			"feste": [{
				"nome": "Festa di San Giovanni Battista",
				"tipo": "Religiosa",
				"quando": "24 giugno",
				"testo": "Celebrazione patronale con processione, fuochi d'artificio e festeggiamenti nel centro storico."
			}, {
				"nome": "Notte di Norba",
				"tipo": "Culturale",
				"quando": "Estate (data variabile)",
				"testo": "Evento culturale con apertura serale del parco archeologico, visite guidate in notturna e spettacoli nel sito di Norba. Tra le iniziative più suggestive dei Lepini."
			}],
			"prodotti": "olio extravergine DOP Colline Pontine, vino Cori DOC, aglio di Norma, fichi secchi",
			"piatti": "spaghetti con aglio e olio e peperoncino, pollo alla norma, zuppa di legumi"
		},
		"turismo": {
			"poi": [
				{
					"nome": "Parco Archeologico dell'Antica Norba",
					"tipo": "Storico",
					"testo": "Il sito principale. Percorso ad anello di circa 3 km tra mura ciclopiche, porte monumentali e templi. Accesso gratuito, aperto tutto l'anno."
				},
				{
					"nome": "Belvedere di Norma",
					"tipo": "Panoramico",
					"testo": "Il promontorio su cui sorge Norma offre una delle viste più belle sui Lepini: la pianura pontina, l'Agro Pontino, il Circeo, le isole ponziane."
				},
				{
					"nome": "Centro storico medievale",
					"tipo": "Storico",
					"testo": "Il borgo medievale con vicoli e palazzi storici in pietra calcarea."
				}
			],
			"arrivo": {
				"auto": "Da Latina: SS148 poi SP50 verso Norma (circa 20 km). Da Roma: A1 uscita Frosinone poi SS156.",
				"treno": "Stazione di Latina Scalo (18 km)",
				"bus": "Linee COTRAL da Latina"
			},
			"contatti": {
				"sito": "https://comune.norma.lt.it",
				"proloco": "",
				"email": "comune@comune.norma.lt.it"
			}
		},
		"attivita": [{
			"nome": "Ristorante Il Seminario — Villa del Cardinale",
			"categoria": "Ristorante",
			"descrizione": "Ristorante ricavato da un antico seminario: piatti della tradizione lepina come ramiccia con porcini e pappardelle al cinghiale. Hotel con 68 camere.",
			"prodotti": "",
			"indirizzo": "Via dei Colli, Norma LT",
			"sito": "https://www.villadelcardinale.com/ristorante/",
			"nota": ""
		}]
	},
	patrica: {
		"slug": "patrica",
		"festaPatronale": "16 agosto",
		"cap": "03010",
		"comunitaMontana": "Valle dell'Amaseno",
		"storia": {
			"intro": "Patrica sorge su uno sperone calcareo con viste panoramiche eccezionali. Centro agricolo della Ciociaria.",
			"epoche": [],
			"personaggi": [{
				"anni": "1886-1961",
				"nome": "Riccardo Moretti",
				"nota": "Nativo di Patrica, tecnico radiofonico pioniere e medico, tra i fondatori dell'ospedale Regina Elena di Roma."
			}]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Patrica comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Chiesa di San Giovanni Battista",
				"secolo": "",
				"stile": "Barocco",
				"testo": "Stile: Barocco",
				"opere": ["\"Il Battesimo di Cristo\" di Nicola La Piccola"]
			}, {
				"nome": "Chiesa della Madonna della Pace",
				"secolo": "fine XIX secolo",
				"stile": "",
				"testo": "",
				"opere": ["Affreschi religiosi del pittore Lucari (1889)"]
			}],
			"monumenti": [{
				"nome": "Palazzo della famiglia Spezza",
				"tipo": "Palazzo",
				"secolo": "1700",
				"testo": "1700"
			}]
		},
		"natura": {
			"intro": "Il versante nord-est dei Lepini rivolto alla Valle del Sacco ospita castagneti tra 200 e 700 m, con la varietà locale di castagna Camisella.",
			"sentieri": [{
				"nome": "Monte Cacume (1095 m) da Patrica",
				"difficolta": "Media",
				"testo": "Via Colle Lo Zompo e Fontana della Rava, versante sud-est del Cacume."
			}, {
				"nome": "Sentiero di Dante",
				"difficolta": "TRADIZIONI -->",
				"testo": "Percorso a tema dantesco da Patrica verso la vetta del Monte Cacume, con installazioni artistiche."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "Sagra dell'Acquata e della Caldarrosta",
				"tipo": "Gastronomica",
				"quando": "autunno",
				"testo": "Distribuzione di castagne arrostite e acquata in Piazza Vittorio Emanuele II, organizzata dalla Pro Loco."
			}],
			"prodotti": "castagne Camisella, acquata (bevanda dolce e frizzante da macerazione delle vinacce)",
			"piatti": ""
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Antica Macelleria Pellegrini",
			"categoria": "Norcineria/Macelleria",
			"descrizione": "Macelleria-norcineria dal 1912, quarta generazione: produce con ricetta di famiglia la zazzicchia di Patrica, oltre a porchetta e salumi.",
			"prodotti": "zazzicchia di Patrica, porchetta, salumi",
			"indirizzo": "Via Quattro Strade, 146, Patrica FR",
			"sito": "https://www.compagniadeilepini.it",
			"nota": ""
		}]
	},
	priverno: {
		"slug": "priverno",
		"festaPatronale": "28 gennaio",
		"cap": "04015",
		"comunitaMontana": "Monti Lepini",
		"storia": {
			"intro": "Priverno è l'erede dell'antica Privernum volsca, poi municipio romano. Il centro medievale conserva la Cattedrale e il Palazzo del Comune. A pochi km sorge l'Abbazia di Fossanova (1208), prima abbazia cistercense d'Italia e luogo di morte di San Tommaso d'Aquino (1274).",
			"epoche": [],
			"personaggi": [{
				"anni": "",
				"nome": "San Tommaso d'Aquino",
				"nota": "Filosofo e teologo, morì a Fossanova nel 1274"
			}, {
				"anni": "",
				"nome": "Nicomaco di Gerasa",
				"nota": "Matematico del I sec. d.C., originario di Privernum"
			}]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Priverno comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [
				{
					"nome": "Abbazia di Santa Maria di Fossanova",
					"secolo": "",
					"stile": "Primo esempio in Italia di gotico cistercense",
					"testo": "Stile: Primo esempio in Italia di gotico cistercense",
					"opere": ["Torre ottagonale sul transetto", "Vetrate monocrome non figurative"]
				},
				{
					"nome": "Concattedrale di Santa Maria Annunziata",
					"secolo": "consacrata nel 1183 da Papa Lucio III",
					"stile": "Barocco",
					"testo": "Stile: Barocco",
					"opere": ["\"Madonna d'Agosto\" (rinvenuta nel 1143)"]
				},
				{
					"nome": "Chiesa di San Benedetto",
					"secolo": "metà VII secolo",
					"stile": "",
					"testo": "Prima chiesa della \"nuova\" Priverno, costruita dai Benedettini.",
					"opere": ["Affreschi del XIII secolo", "Opere di Pietro Coleberti (XV sec.)"]
				}
			],
			"monumenti": [{
				"nome": "Antica Privernum",
				"tipo": "",
				"secolo": "",
				"testo": "epoca romana"
			}, {
				"nome": "Palazzo Comunale",
				"tipo": "",
				"secolo": "",
				"testo": "origine XIII secolo, rifacimento metà '800"
			}]
		},
		"natura": {
			"intro": "Territorio tra la pianura pontina e le prime pendici dei Lepini. Oasi naturalistica lungo il fiume Amaseno. Vigneti DOC Cori.",
			"sentieri": [{
				"nome": "Fossanova — Parco di San Martino",
				"difficolta": "Facile",
				"testo": "Anello lungo il fiume Amaseno tra sugherete e leccete, fino al castello del XVI secolo."
			}, {
				"nome": "Cammino della Regina Camilla, tappa 1",
				"difficolta": "TRADIZIONI -->",
				"testo": "Da Fossanova a Priverno."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "San Tommaso d'Aquino",
				"tipo": "Religiosa",
				"quando": "7 marzo",
				"testo": "Patrono di Priverno e compatrono della Diocesi (morto a Fossanova il 7 marzo 1274): mostra dal 1 al 7 marzo, cammini guidati da Maenza a Fossanova, Messa solenne il 6 in Cattedrale, Messa il 7 all'Abbazia."
			}],
			"prodotti": "carciofo di Priverno, Falia (pane/pizza tipica), Chiacchietegli (varietà locale di broccolo, presidio Slow Food)",
			"piatti": "Bazzoffia (zuppa di carciofi, fave, bietole, piselli, cipolla, uova e pecorino)"
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "ASPOL — Associazione Produttori Olivicoli DOP Colline Pontine",
			"categoria": "Consorzio / Associazione produttori",
			"descrizione": "Consorzio che riunisce i produttori di olio extravergine DOP Colline Pontine nella provincia di Latina. La DOP tutela l'olio prodotto dalla cultivar Itrana (o Gaeta), varietà autoctona dei Lepini e dell'Antiappennino laziale. L'area di produzione comprende oltre 20 comuni della provincia di Latina, con circa 9.000 produttori e 56 frantoi attivi.",
			"prodotti": "Olio EVO DOP Colline Pontine (cultivar Itrana/Gaeta)",
			"indirizzo": "",
			"sito": "https://allfoodonline.com/azienda2/aspol-dop-colline-pontine/",
			"nota": ""
		}]
	},
	prossedi: {
		"slug": "prossedi",
		"festaPatronale": "ultima domenica di maggio",
		"cap": "04010",
		"comunitaMontana": "Monti Lepini",
		"storia": {
			"intro": "Prossedi è un antico castrum medievale che conserva la sua impostazione urbanistica originale. Il borgo domina visivamente tutta la pianura pontina fino al mare.",
			"epoche": [],
			"personaggi": [{
				"anni": "XIX secolo",
				"nome": "Augusta Bonaparte Gabrielli",
				"nota": "Cugina dell'ultimo principe di Prossedi, figlia di Luciano Bonaparte (fratello di Napoleone); sepolta nella Chiesa di Santa Maria Extra-Moenia a Prossedi."
			}]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Prossedi comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Chiesa di Sant'Agata",
				"secolo": "",
				"stile": "",
				"testo": "Chiesa parrocchiale sulla collina più alta, ampliamento di una chiesa precedente del 1655.",
				"opere": []
			}, {
				"nome": "Chiesa di San Nicola",
				"secolo": "XIII secolo",
				"stile": "Romanico",
				"testo": "Stile: Romanico",
				"opere": []
			}],
			"monumenti": [{
				"nome": "Palazzo Gabrielli (Palazzo Baronale)",
				"tipo": "Palazzo",
				"secolo": "XVIII secolo",
				"testo": "XVIII secolo"
			}, {
				"nome": "Fontana dei Papi",
				"tipo": "Fontana",
				"secolo": "1727",
				"testo": "1727"
			}]
		},
		"natura": {
			"intro": "Boschi misti e oliveti. Ambiente tipicamente mediterraneo con ginepri e lecci sui versanti calcarei.",
			"sentieri": [{
				"nome": "Cammino della Regina Camilla, tappe Maenza-Prossedi-Giuliano di Roma",
				"difficolta": "Tappe 4-5 del cammino",
				"testo": "Tappe 4-5 del cammino a lunga percorrenza della Valle dell'Amaseno."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [
				{
					"nome": "Sagra del Vendio",
					"tipo": "Gastronomica e culturale",
					"quando": "",
					"testo": "Degustazioni del Vendio (pizza bianca tipica di Prossedi) e momenti culturali sulla storia del nome e delle tradizioni locali."
				},
				{
					"nome": "Sagra della Zazzicchia",
					"tipo": "Gastronomica",
					"quando": "dicembre",
					"testo": "Il maiale e la salsiccia locale (zazzicchia) come protagonisti, cucina tipica di montagna."
				},
				{
					"nome": "Sagra dei Fichi",
					"tipo": "Gastronomica",
					"quando": "estate",
					"testo": "Nella frazione di Pisterzo."
				}
			],
			"prodotti": "Vendio (pizza bianca), zazzicchia (salsiccia locale), fichi di Pisterzo",
			"piatti": ""
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Palazzo Prossedi",
			"categoria": "Cantina",
			"descrizione": "Azienda vinicola attiva dal '700, sede nel Palazzo Baronale cinquecentesco, cantina ricavata nell'antico frantoio.",
			"prodotti": "Altaica (Canaiolo Bianco), Sterparo, Colle della Corte, Nero della Corte",
			"indirizzo": "Piazza Umberto I, 14, Prossedi LT",
			"sito": "https://www.palazzoprossedi.it/",
			"nota": ""
		}, {
			"nome": "Mater Olea",
			"categoria": "Frantoio",
			"descrizione": "Azienda agricola fondata nel 2018, oliveti su terreno calcareo (150-500 m): varietà Itrana, Frantoio, Sivigliana. Pluripremiata (Ercole Olivario 2020).",
			"prodotti": "olio EVO",
			"indirizzo": "",
			"sito": "https://www.materolea.it/",
			"nota": ""
		}]
	},
	"rocca-massima": {
		"slug": "rocca-massima",
		"festaPatronale": "29 settembre",
		"cap": "04010",
		"comunitaMontana": "Monti Lepini",
		"storia": {
			"intro": "Rocca Massima domina l'intera pianura romana e pontina dalla sua quota di 750 m. Il castello medievale è il simbolo del paese.",
			"epoche": [],
			"personaggi": []
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Rocca Massima comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Chiesa di San Michele Arcangelo",
				"secolo": "XIII secolo, ampliata XV secolo e circa 1700",
				"stile": "",
				"testo": "L'abside era una delle torri difensive dell'epoca degli Annibaldi.",
				"opere": ["Copia del San Michele di Guido Reni", "Affreschi del pittore Mariani di Velletri"]
			}, {
				"nome": "Chiesa di San Rocco con Convento",
				"secolo": "XVI secolo",
				"stile": "",
				"testo": "Convento costruito nel 1588 da Massima Conti.",
				"opere": []
			}],
			"monumenti": [{
				"nome": "Palazzo del Principe (Palazzo Baronale)",
				"tipo": "",
				"secolo": "1202 circa",
				"testo": "1202 circa"
			}]
		},
		"natura": {
			"intro": "Boschi di castagno estesi nelle elevazioni settentrionali (produzione dei Marroni) con funghi porcini, faggete verso il Monte Lupone, macchia mediterranea nelle zone basse.",
			"sentieri": [{
				"nome": "CAI 705 — Monte Lupone da Rocca Massima",
				"difficolta": "TRADIZIONI -->",
				"testo": "Anello lungo la cresta di Monte Grugliano, Punta della Melazza (1054 m) e Monte Mascolo (1059 m)."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "Sagra dei Marroni",
				"tipo": "Gastronomica e civile",
				"quando": "ottobre, due weekend",
				"testo": "Organizzata dall'Associazione \"Castagna di Rocca Massima\": sfilate, musica, caldarroste, stand gastronomici, gruppi folk."
			}],
			"prodotti": "Marroni di Rocca Massima, formaggi ovini (pecorino, caciotta, ricotta, caprino), olio EVO, tartufi, funghi porcini, prosciutto",
			"piatti": "fettuccine al sugo di cinghiale, misto arrosto con patate al forno"
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Casale dei Priori",
			"categoria": "Agriturismo",
			"descrizione": "Agriturismo di famiglia da oltre 50 anni, 14 ettari con circa 3.000 piante di olivo Itrana centenarie; sei camere, vendita diretta.",
			"prodotti": "olio EVO Itrana DOP, patè di olive, olive in salamoia",
			"indirizzo": "",
			"sito": "https://casaledeipriori.it/",
			"nota": ""
		}, {
			"nome": "Oscar Frantoio",
			"categoria": "Frantoio",
			"descrizione": "Frantoio con vendita diretta di olio extravergine.",
			"prodotti": "",
			"indirizzo": "Basso Le Case, 2, Rocca Massima LT",
			"sito": "https://www.compagniadeilepini.it",
			"nota": ""
		}]
	},
	roccagorga: {
		"slug": "roccagorga",
		"festaPatronale": "2 giugno",
		"cap": "04010",
		"comunitaMontana": "Monti Lepini",
		"storia": {
			"intro": "Roccagorga si sviluppò intorno all'omonimo castello medievale. La sua economia è tradizionalmente legata all'olivo e all'agricoltura pontina.",
			"epoche": [],
			"personaggi": []
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Roccagorga comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Chiesa Collegiata dei Santi Erasmo e Leonardo",
				"secolo": "",
				"stile": "Barocco, facciata convessa",
				"testo": "Stile: Barocco, facciata convessa",
				"opere": []
			}, {
				"nome": "Eremo di Sant'Erasmo",
				"secolo": "",
				"stile": "",
				"testo": "A circa 800 m s.l.m., con affresco raffigurante Sant'Erasmo in vesti episcopali.",
				"opere": []
			}],
			"monumenti": [{
				"nome": "Torre quadrangolare",
				"tipo": "Torre",
				"secolo": "XIII secolo",
				"testo": "XIII secolo"
			}]
		},
		"natura": {
			"intro": "Boschi di castagno in ceduo nella bassa collina, boschi di leccio e ginepro su roccia calcarea, oliveti (varietà Itrana e Leccino) sul territorio comunale.",
			"sentieri": [{
				"nome": "Anello Eremo di Sant'Erasmo — Monte Erdigheta",
				"difficolta": "Eremo di Sant'Era",
				"testo": "Da Eremo di Sant'Erasmo (sec. XI-XII) per Monte Perentile, Monte Pizzone (1313 m), Monte Erdigheta (1336 m), Monte La Croce (1431 m), Fonte del Sambuco."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [
				{
					"nome": "Sagra dell'Uva Fragola",
					"tipo": "Gastronomica e civile",
					"quando": "inizio ottobre",
					"testo": "Organizzata dalla Pro Loco, celebra l'uva fragola bianca e nera con mercatini artigianali, musica, auto d'epoca."
				},
				{
					"nome": "Fiera dei Prati — Sagra della Capra",
					"tipo": "Civile e gastronomica",
					"quando": "17-19 agosto",
					"testo": "Dal 1947, fiera del bestiame e degustazioni di carne di capra."
				},
				{
					"nome": "Focaracci del Venerdì Santo",
					"tipo": "Religiosa",
					"quando": "Venerdì Santo",
					"testo": "Falò tradizionali, usanza radicata a Roccagorga."
				}
			],
			"prodotti": "olio DOP Colline Pontine (varietà Itrana e Leccino, cultivar locale \"schiacciatelle\"), vino bianco da uva Ottonese, vino rosso da uva Fragola (Fragolino)",
			"piatti": "Ciammotte, Sanguinaccio, carne di capra"
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Frantoiana Casacotta",
			"categoria": "Frantoio",
			"descrizione": "Frantoio per la produzione di olio extravergine d'oliva.",
			"prodotti": "",
			"indirizzo": "Via Cristoforo Colombo, 160, Roccagorga LT",
			"sito": "",
			"nota": ""
		}, {
			"nome": "La Contadina di Elisa Coia & C.",
			"categoria": "Frantoio",
			"descrizione": "Frantoio per molitura olive e produzione di olio.",
			"prodotti": "",
			"indirizzo": "Via Variante, 2, Roccagorga LT",
			"sito": "https://www.compagniadeilepini.it",
			"nota": ""
		}]
	},
	"roccasecca-dei-volsci": {
		"slug": "roccasecca-dei-volsci",
		"festaPatronale": "terza domenica di agosto",
		"cap": "04010",
		"comunitaMontana": "Monti Lepini",
		"storia": {
			"intro": "Il nome ricorda le origini volsche del territorio. Il borgo medievale conserva la torre e i resti delle mura.",
			"epoche": [],
			"personaggi": []
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Roccasecca dei Volsci comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Chiesa di Santa Maria Assunta",
				"secolo": "Trittico del XV secolo",
				"stile": "",
				"testo": "",
				"opere": ["Tela dell'Annunciazione di Domenico Fiasella (1613)", "Trittico del XV secolo"]
			}, {
				"nome": "Chiesa di San Sebastiano",
				"secolo": "XII-XIII secolo",
				"stile": "",
				"testo": "",
				"opere": ["Affreschi di San Giovanni Battista, San Nicola di Bari e San Tommaso d'Aquino"]
			}],
			"monumenti": [{
				"nome": "Palazzo Massimo",
				"tipo": "Palazzo",
				"secolo": "",
				"testo": "metà Seicento"
			}]
		},
		"natura": {
			"intro": "Boschi misti di leccio, castagno e olmo; oliveti e alberi da frutto nei pressi della cappella della Madonna della Pace.",
			"sentieri": [{
				"nome": "Cammino della Regina Camilla, tappe Pisterzo-Roccasecca-Sonnino",
				"difficolta": "Tappe 11-12 del cammi",
				"testo": "Tappe 11-12 del cammino a lunga percorrenza della Valle dell'Amaseno."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "Festa dell'Arrivederci e Sagra della Capra",
				"tipo": "Gastronomica",
				"quando": "ultima domenica di agosto",
				"testo": "Degustazioni di carne di capra in umido."
			}, {
				"nome": "Sagra delle Caciottelle",
				"tipo": "Gastronomica",
				"quando": "seconda domenica di settembre",
				"testo": "Mercato-manifestazione dedicato ai formaggi locali."
			}],
			"prodotti": "olio d'oliva, formaggi (caciottelle)",
			"piatti": "minestra di fagioli con le cotiche, polenta con carne di maiale, cecapreti (pasta tipica), minestra marinata"
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Frantoio Vin.Pia. — Olii di Eccellenza",
			"categoria": "Frantoio",
			"descrizione": "Frantoio per la produzione di olio extravergine d'oliva a impronta ecosostenibile.",
			"prodotti": "",
			"indirizzo": "Contrada Collenero, 1, Roccasecca dei Volsci LT",
			"sito": "https://www.compagniadeilepini.it",
			"nota": ""
		}]
	},
	segni: {
		"slug": "segni",
		"festaPatronale": "6 ottobre",
		"cap": "00037",
		"comunitaMontana": "Monti Lepini — versante romano",
		"storia": {
			"intro": "Segni (l'antica Signia latina) fu fondata come colonia romana nel 495 a.C. Le sue mura poligonali (VI-IV sec. a.C.) sono tra le meglio conservate nel Lazio. Sede vescovile dal IV sec. Patria di papa Innocenzo III.",
			"epoche": [],
			"personaggi": [
				{
					"anni": "",
					"nome": "Papa Innocenzo III",
					"nota": "Nato a Segni nel 1160, uno dei papi più influenti del Medioevo (pontif. 1198-1216)"
				},
				{
					"anni": "",
					"nome": "San Bruno",
					"nota": "Santo patrono, vescovo di Segni nel XII sec., teologo e scrittore"
				},
				{
					"anni": "papa dal 657 al 672, morto nel 672",
					"nome": "Papa Vitaliano",
					"nota": "Nato a Segni secondo il Liber Pontificalis; venerato come santo."
				}
			]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Segni comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Concattedrale di Santa Maria Assunta",
				"secolo": "XVII secolo su struttura del IX secolo",
				"stile": "Facciata neoclassica, campanile romanico dell'XI secolo (24 m)",
				"testo": "Stile: Facciata neoclassica, campanile romanico dell'XI secolo (24 m)",
				"opere": []
			}, {
				"nome": "Chiesa di San Pietro",
				"secolo": "",
				"stile": "",
				"testo": "Sull'acropoli, costruita sul podio dell'antico tempio dedicato a Giunone Moneta.",
				"opere": []
			}],
			"monumenti": [{
				"nome": "Porta Saracena",
				"tipo": "",
				"secolo": "",
				"testo": "epoca preromana"
			}, {
				"nome": "Acropoli antica",
				"tipo": "",
				"secolo": "",
				"testo": "epoca romana"
			}]
		},
		"natura": {
			"intro": "Faggete con tasso e agrifoglio tra i 750 e i 1530 m (Monte Semprevisa), boschi di leccio nelle pendici più ripide, estesi castagneti alla base del Marrone Segnino. Il territorio comunale ha la percentuale di area protetta più alta tra i comuni lepini (9,46%).",
			"sentieri": [{
				"nome": "Campo di Segni — Monte Lupone",
				"difficolta": "TRADIZIONI -->",
				"testo": "Sentiero 702 (\"Direttissima\", più ripido) o sentiero 731 (più ampio); variante ad anello di 17 km."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "Sagra del Marrone Segnino",
				"tipo": "Gastronomica e civile",
				"quando": "penultima domenica di ottobre",
				"testo": "Nata negli anni '50 come festa contadina: stand gastronomici, dolci e piatti a base di marrone, vino locale, Marrone Pizza Festival, concerti."
			}],
			"prodotti": "Marrone Segnino (varietà locale tradizionale, Prodotto Agroalimentare Tradizionale — non è una IGP registrata), tartufo nero dei Lepini, olio EVO",
			"piatti": "Fregnaquanti (pasta all'uovo con sugo di cinghiale, funghi o tartufo), ciambella \"scottolata\", biscotti cresciuti"
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Agriturismo Casale del Marrone",
			"categoria": "Agriturismo",
			"descrizione": "Azienda agricola biologica che produce castagne (varietà Marrone Segnino) e olio d'oliva; ristorazione aperta al pubblico.",
			"prodotti": "Marrone Segnino, olio d'oliva",
			"indirizzo": "Località Castellone, 8, Segni RM",
			"sito": "https://www.casaledelmarrone.com/",
			"nota": ""
		}, {
			"nome": "Trattoria La Saracena",
			"categoria": "Trattoria",
			"descrizione": "Trattoria tipica nel centro storico di Segni.",
			"prodotti": "",
			"indirizzo": "Via Porta Saracena, 7, Segni RM",
			"sito": "https://www.compagniadeilepini.it",
			"nota": ""
		}]
	},
	sermoneta: {
		"slug": "sermoneta",
		"festaPatronale": "29 settembre",
		"cap": "04013",
		"comunitaMontana": "XIII Monti Lepini Ausoni",
		"storia": {
			"intro": "Sermoneta è uno dei borghi medievali meglio conservati del Lazio. Le sue origini risalgono ai Volsci, che abitarono il territorio prima dell'espansione romana. Nel XIII secolo il borgo divenne proprietà della famiglia Annibaldi, che costruì il primo nucleo del castello. Nel 1297 Pietro Caetani, nipote di Papa Bonifacio VIII, acquisì il feudo dando inizio all'era dei Caetani, signori di Sermoneta per secoli. Il Castello Caetani fu ampliato e trasformato in una delle fortezze più imponenti del Lazio. Nel 1499 Cesare Borgia conquistò il borgo, ma i Caetani recuperarono i loro beni pochi anni dopo. La famiglia detenne il possesso del castello fino al 1972, quando Leila Caetani istituì la Fondazione Roffredo Caetani per la tutela del patrimonio. Negli anni Quaranta del Novecento, il castello fu usato come prigione dai nazisti durante l'occupazione.",
			"epoche": [
				{
					"periodo": "Antichità",
					"titolo": "Origini volsche e romane",
					"testo": "Il territorio di Sermoneta era abitato dai Volsci prima della romanizzazione. Reperti di età preromana attestano la presenza umana nell'area già dal IX-VIII sec. a.C. Con la conquista romana il territorio fu incluso nel latifondo pontino."
				},
				{
					"periodo": "Medioevo",
					"titolo": "Gli Annibaldi e i Caetani",
					"testo": "Agli inizi del XIII secolo la famiglia Annibaldi costruisce il primo castello. Nel 1297 Pietro Caetani acquista il feudo. I Caetani trasformano il castello in una residenza signorile di primo piano, con affreschi e decorazioni di pregio. La famiglia domina il borgo per quasi settecento anni."
				},
				{
					"periodo": "Rinascimento",
					"titolo": "Cesare Borgia e le guerre di potere",
					"testo": "Nel 1499 Cesare Borgia conquista Sermoneta scacciando i Caetani. Pochi anni dopo, con la morte di Alessandro VI, i Caetani recuperano i loro possedimenti. Il XVI secolo vede il borgo fiorire come centro artistico e culturale."
				},
				{
					"periodo": "Contemporanea",
					"titolo": "La Fondazione Caetani e la valorizzazione",
					"testo": "Nel 1972 Leila Caetani, ultima erede, istituisce la Fondazione Roffredo Caetani che gestisce il castello e i Giardini di Ninfa. Il borgo è oggi uno dei mete turistiche più apprezzate del Lazio."
				}
			],
			"personaggi": [{
				"anni": "1742-1797",
				"nome": "Onorato III Caetani",
				"nota": "Duca di Sermoneta, fondatore della biblioteca di famiglia"
			}, {
				"anni": "1913-1977",
				"nome": "Leila Caetani",
				"nota": "Ultima erede dei Caetani, fondatrice della Fondazione Roffredo Caetani"
			}]
		},
		"arte": {
			"intro": "Sermoneta conserva un patrimonio artistico di primo livello, dominato dal Castello Caetani con i suoi affreschi rinascimentali e le sale storiche. Il centro storico medievale è percorribile a piedi attraverso vicoli e scalinate che conservano l'aspetto del '400.",
			"chiese": [{
				"nome": "Cattedrale di Santa Maria Assunta",
				"secolo": "XII-XIII secolo",
				"stile": "Romanico-gotico",
				"testo": "Stile: Romanico-gotico",
				"opere": [
					"Affresco dell'Annunciazione (scuola del Benozzo Gozzoli, XV sec.)",
					"Polittico di Benozzo Gozzoli",
					"Fonte battesimale medievale in marmo"
				]
			}, {
				"nome": "Chiesa di San Giuseppe",
				"secolo": "",
				"stile": "Rinascimentale",
				"testo": "Stile: Rinascimentale",
				"opere": []
			}],
			"monumenti": [{
				"nome": "Castello Caetani",
				"tipo": "Castello",
				"secolo": "XIII-XV secolo",
				"testo": "XIII-XV secolo"
			}, {
				"nome": "Giardini di Ninfa",
				"tipo": "Giardino storico",
				"secolo": "Fondato nel 1921 da Gelasio Caetani",
				"testo": "Fondato nel 1921 da Gelasio Caetani"
			}]
		},
		"natura": {
			"intro": "Il territorio di Sermoneta è caratterizzato dai dolci pendii dei Monti Lepini ricoperti da oliveti e vigneti, con il Giardino di Ninfa quale eccezionalità botanica. La pianura pontina circostante è stata bonificata nel XX secolo.",
			"sentieri": [{
				"nome": "Sentiero Sermoneta – Monte Semprevisa",
				"difficolta": "TRADIZIONI -->",
				"testo": "Percorso ad anello che sale dai 257m di Sermoneta alla vetta del Monte Semprevisa (1536m), punto più alto dei Lepini."
			}]
		},
		"tradizioni": {
			"intro": "Le tradizioni di Sermoneta si intrecciano con la storia dei Caetani e con le antiche celebrazioni religiose del borgo medievale. La rievocazione della Battaglia di Lepanto è la manifestazione più caratteristica.",
			"feste": [
				{
					"nome": "Rievocazione della Battaglia di Lepanto",
					"tipo": "Storica",
					"quando": "Seconda domenica di ottobre",
					"testo": "Rievocazione storica in costume d'epoca della vittoria cristiana a Lepanto (1571), con corteo, sbandieratori e spettacoli nel centro storico. Una delle sagre storiche più suggestive dei Lepini."
				},
				{
					"nome": "Festa di San Michele Arcangelo",
					"tipo": "Religiosa",
					"quando": "29 settembre",
					"testo": "Festa patronale con processione religiosa, mercato e festeggiamenti nel borgo."
				},
				{
					"nome": "Aperture primaverili dei Giardini di Ninfa",
					"tipo": "Naturale/Culturale",
					"quando": "Aprile-ottobre (date specifiche ogni anno)",
					"testo": "Le aperture contingentate dei Giardini di Ninfa sono tra gli eventi più attesi del Lazio. I biglietti si esauriscono in pochi minuti dall'apertura delle prenotazioni."
				}
			],
			"prodotti": "olio extravergine DOP Colline Pontine, vino Cesanese, pane casareccio, formaggi pecorini",
			"piatti": "pasta con broccoli e guanciale, coniglio alla cacciatore, minestra di fagioli con le cotiche"
		},
		"turismo": {
			"poi": [
				{
					"nome": "Castello Caetani",
					"tipo": "Storico",
					"testo": "Il simbolo di Sermoneta. Visita guidata obbligatoria, circa 1h30. Prenotazione consigliata."
				},
				{
					"nome": "Giardini di Ninfa",
					"tipo": "Naturale",
					"testo": "Ad appena 5 km da Sermoneta. Aperture contingentate su prenotazione. Uno dei giardini più belli del mondo."
				},
				{
					"nome": "Centro storico medievale",
					"tipo": "Storico",
					"testo": "Vicoli, archi e scalinate in pietra calcarea. Passeggiata gratuita sempre accessibile."
				},
				{
					"nome": "Cattedrale di Santa Maria Assunta",
					"tipo": "Religioso",
					"testo": "Con il polittico di Benozzo Gozzoli."
				}
			],
			"arrivo": {
				"auto": "Da Roma: A1 uscita Frosinone, poi SS156. Da Latina: SS7 poi SP50. Parcheggio gratuito a valle del borgo.",
				"treno": "Stazione di Latina Scalo (15 km), poi taxi o bus",
				"bus": "Linee COTRAL da Latina e da Roma"
			},
			"contatti": {
				"sito": "https://www.comunedisermoneta.it",
				"proloco": "https://www.prolocosermoneta.it",
				"email": "info@comunedisermoneta.it"
			}
		},
		"attivita": [{
			"nome": "Fondazione Roffredo Caetani — Castello e Giardini",
			"categoria": "Fondazione culturale / Attrazione",
			"descrizione": "La Fondazione Roffredo Caetani gestisce il Castello Caetani di Sermoneta e i celeberrimi Giardini di Ninfa, considerati tra i giardini più belli del mondo. Istituita nel 1972 da Leila Caetani, ultima erede della famiglia, la Fondazione tutela e valorizza questo patrimonio unico. I Giardini di Ninfa aprono in date contingentate da aprile a ottobre. Il Castello è visitabile tutto l'anno con visita guidata.",
			"prodotti": "Visite guidate Castello Caetani, Aperture Giardini di Ninfa, Pubblicazioni e merchandising",
			"indirizzo": "Castello Caetani, 04013 Sermoneta LT",
			"sito": "https://www.fondazionecaetani.org",
			"nota": "I Giardini di Ninfa hanno accesso contingentato. Prenotazione obbligatoria e biglietti esauriti rapidamente. Verificare calendario aperture sul sito."
		}, {
			"nome": "Agriturismo La Valle dell'Usignolo",
			"categoria": "Agriturismo",
			"descrizione": "Agriturismo nel territorio di Sermoneta, con produzione propria di olio extravergine DOP Colline Pontine dalla cultivar Itrana. Offre ospitalità e ristorazione con prodotti del territorio lepino.",
			"prodotti": "Olio EVO DOP Colline Pontine",
			"indirizzo": "",
			"sito": "https://www.compagniadeilepini.it",
			"nota": ""
		}]
	},
	sezze: {
		"slug": "sezze",
		"festaPatronale": "2 luglio",
		"cap": "04018",
		"comunitaMontana": "Monti Lepini",
		"storia": {
			"intro": "Sezze (l'antica Setia latina) è uno dei centri più importanti dei Lepini. Le sue mura poligonali di età preromana (IV sec. a.C.) sono tra le meglio conservate d'Italia. La città domina dalla sua quota di 319 m tutta la pianura bonificata.",
			"epoche": [],
			"personaggi": [{
				"anni": "",
				"nome": "San Lidano",
				"nota": "Santo patrono, abate del XI sec., bonificatore delle paludi pontine"
			}, {
				"anni": "",
				"nome": "Papa Onorio III",
				"nota": "Soggiornò a Sezze durante il papato (1216-1227)"
			}]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Sezze comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Cattedrale di Santa Maria",
				"secolo": "",
				"stile": "",
				"testo": "Custodisce le spoglie di San Lidano nell'altare maggiore (ricostruito nel 1606).",
				"opere": []
			}],
			"monumenti": [{
				"nome": "Archi di San Lidano",
				"tipo": "",
				"secolo": "",
				"testo": "medievale"
			}]
		},
		"natura": {
			"intro": "In località \"La Foresta\" si trova una delle due uniche sugherete dei Monti Lepini (con Fossanova/Priverno), con leccio, cerro e farnetto.",
			"sentieri": [{
				"nome": "Giro delle Tre Sorgenti (CAI 712)",
				"difficolta": "Media",
				"testo": "Da Sezze Suso/Longara."
			}, {
				"nome": "Acqua della Chiesa (CAI 712)",
				"difficolta": "Tassi - Querciai - Va",
				"testo": "Da 447 a 905 m, attraversa la Valle Naforte con tassi secolari; variante Valle dei Tassi - Querciai - Valle Tre Pozzi."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "Sagra del Carciofo",
				"tipo": "Gastronomica e civile",
				"quando": "18-19 aprile",
				"testo": "Corteo folkloristico con majorettes, stand enogastronomici, mercatino artigianale nel centro storico."
			}, {
				"nome": "Estate Setina",
				"tipo": "Civile",
				"quando": "agosto",
				"testo": "Rassegna estiva con oltre 40 appuntamenti tra musica, teatro, cultura ed eventi gastronomici."
			}],
			"prodotti": "Carciofo Romanesco IGP, olio DOP Colline Pontine, broccoletti setini, visciole",
			"piatti": "carciofi alla giudia, lacchene e fagioli, bazzoffia, pagnotta di Sezze"
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Agriturismo Il Capannaccio",
			"categoria": "Agriturismo",
			"descrizione": "Agriturismo in località Sezze Scalo.",
			"prodotti": "",
			"indirizzo": "Via Campania, 19, loc. Sezze Scalo, Sezze LT",
			"sito": "",
			"nota": ""
		}, {
			"nome": "Agriturismo Tenuta Le Pantanelle",
			"categoria": "Agriturismo",
			"descrizione": "Agriturismo in località Sezze Scalo.",
			"prodotti": "",
			"indirizzo": "Via del Pesce, 5, loc. Sezze Scalo, Sezze LT",
			"sito": "https://www.compagniadeilepini.it",
			"nota": ""
		}]
	},
	sgurgola: {
		"slug": "sgurgola",
		"festaPatronale": "6 novembre",
		"cap": "03010",
		"comunitaMontana": "Valle dell'Amaseno",
		"storia": {
			"intro": "Sgurgola è un centro rurale della Valle del Sacco con origine medievale.",
			"epoche": [],
			"personaggi": [{
				"anni": "1240 ca.-1311",
				"nome": "Arnaldo da Villanova",
				"nota": "Medico e profeta; Papa Bonifacio VIII gli impose di risiedere a Sgurgola, dove compose opere apocalittiche."
			}]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Sgurgola comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Chiesa di Santa Maria Assunta",
				"secolo": "fine XVII secolo",
				"stile": "Barocco",
				"testo": "Stile: Barocco",
				"opere": ["Tre portali bronzei di Pietro Gismondi (1906-2003)"]
			}, {
				"nome": "Eremo/Chiesa di San Leonardo",
				"secolo": "XIII secolo",
				"stile": "",
				"testo": "Eretto sui resti di un monastero; custodisce la statua di San Leonardo di Noblat, patrono dal 1200.",
				"opere": []
			}],
			"monumenti": [{
				"nome": "Ruderi della Rocca/Castello",
				"tipo": "Castello",
				"secolo": "",
				"testo": "prima menzione 1088 (bolla di Urbano II)"
			}]
		},
		"natura": {
			"intro": "Boschi di querce (farnia) sopravvissuti in poche zone collinari, oggi ridotti a circa il 30% del territorio dopo la diffusione di oliveti, vigneti e castagneti. Parco dei Monti Lepini con percorsi natura e museo della fauna.",
			"sentieri": [{
				"nome": "CAI 734 — Badia di Santa Maria in Viano",
				"difficolta": "TRADIZIONI -->",
				"testo": "Dal cimitero, salita da 385 a 935 m fino al Rifugio Santa Maria, tocca Fonte dell'Acero e Valle Forana."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "Sagra degli Gnocchi",
				"tipo": "Gastronomica",
				"quando": "31 agosto - 3 settembre",
				"testo": "In onore di Sant'Antonino Martire: musica, balli, fiera, raduno moto/auto d'epoca."
			}, {
				"nome": "Festa dell'Uva",
				"tipo": "Civile e folkloristica",
				"quando": "settembre-ottobre",
				"testo": "Abiti tradizionali ciociari, saltarello, degustazioni; le uve di Sgurgola nel primo '900 arrivavano in tutta Europa via ferrovia."
			}],
			"prodotti": "",
			"piatti": "le Sagne, polenta, frascatelli"
		},
		"turismo": {
			"poi": [{
				"nome": "",
				"tipo": "",
				"testo": ""
			}, {
				"nome": "",
				"tipo": "",
				"testo": ""
			}],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Locanda La Torre",
			"categoria": "Ristorante",
			"descrizione": "Ristorante tipico ciociaro con cantina/enoteca, in un edificio medievale del 1100 (Torre Mola Colonna); prodotti a km0 da fornitori locali.",
			"prodotti": "",
			"indirizzo": "",
			"sito": "https://www.hotellocandalatorre.com/",
			"nota": ""
		}]
	},
	sonnino: {
		"slug": "sonnino",
		"festaPatronale": "25 aprile e 21 ottobre",
		"cap": "04010",
		"comunitaMontana": "Monti Lepini",
		"storia": {
			"intro": "Sonnino è legato indissolubilmente alla storia del brigantaggio: qui trovò rifugio Michele Pezza, detto Fra' Diavolo (1771-1806), celebre capobanda filoborbonico. Il borgo domina la Valle del Sacco.",
			"epoche": [],
			"personaggi": [
				{
					"anni": "",
					"nome": "Fra' Diavolo (Michele Pezza)",
					"nota": "Brigante e guerrigliero filoborbonico (1771-1806), leggenda popolare dei Lepini"
				},
				{
					"anni": "1786-1837",
					"nome": "San Gaspare del Bufalo",
					"nota": "Impedì l'esecuzione dell'editto del 1819 di Pio VII che ordinava la distruzione di Sonnino; fondò i Missionari del Preziosissimo Sangue."
				},
				{
					"anni": "1793-1882",
					"nome": "Antonio Gasbarrone",
					"nota": "Nato a Sonnino il 12 dicembre 1793, celebre capobrigante attivo 1814-1825 nei Monti Lepini/Ausoni."
				}
			]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Sonnino comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Santuario di San Michele Arcangelo",
				"secolo": "",
				"stile": "Gotico-cistercense (restauro 1954)",
				"testo": "Stile: Gotico-cistercense (restauro 1954)",
				"opere": []
			}, {
				"nome": "Collegiata di San Giovanni Battista",
				"secolo": "circa 1200, riconsacrata 1604",
				"stile": "",
				"testo": "Custodisce reliquie attribuite agli Apostoli, a San Giovanni Evangelista e a San Giuseppe.",
				"opere": []
			}],
			"monumenti": [{
				"nome": "Castello di Sonnino",
				"tipo": "Castello",
				"secolo": "IX secolo",
				"testo": "IX secolo"
			}, {
				"nome": "Ponte del Diavolo",
				"tipo": "",
				"secolo": "II secolo d.C.",
				"testo": "II secolo d.C."
			}]
		},
		"natura": {
			"intro": "Sonnino è uno dei 6 comuni del Parco Naturale Regionale Monti Ausoni e Lago di Fondi: oleastro e lentisco nelle zone più aspre, prati fioriti con crochi, anemoni e orchidee, leccete e querceti.",
			"sentieri": [{
				"nome": "CAI 533 Sonnino — Monte Romano",
				"difficolta": "",
				"testo": ""
			}, {
				"nome": "Sonnino — Terracina via Campo Soriano",
				"difficolta": "TRADIZIONI -->",
				"testo": "Circa 8 ore, ambiente solitario, richiede GPS."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "Sagra della Zazzicchia",
				"tipo": "Gastronomica",
				"quando": "",
				"testo": "Percorso enogastronomico nel centro storico con ristoratori e massaie del posto."
			}],
			"prodotti": "zazzicchia (salsiccia locale), caciotta di pecora",
			"piatti": "minestra di pane con fagioli e salsiccia, strozzapreti con ragù di selvaggina, frascateglie"
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Agriturismo Casale Ré",
			"categoria": "Agriturismo",
			"descrizione": "Struttura in pietra con colazioni a km0 e cosmetici naturali a base di olio d'oliva locale.",
			"prodotti": "",
			"indirizzo": "Via Cascano, loc. Capocroce, Sonnino LT",
			"sito": "https://beb.it/casalere/it/",
			"nota": ""
		}, {
			"nome": "Ristorante Il Colle del Brigante",
			"categoria": "Ristorante",
			"descrizione": "Ristorante tipico locale.",
			"prodotti": "",
			"indirizzo": "Via Monte Pero, Sonnino LT",
			"sito": "https://www.compagniadeilepini.it",
			"nota": ""
		}]
	},
	supino: {
		"slug": "supino",
		"festaPatronale": "10 agosto",
		"cap": "03017",
		"comunitaMontana": "Valle dell'Amaseno",
		"storia": {
			"intro": "Supino è un centro della Ciociaria con lungo rapporto con la pietra calcarea lepina, usata nella costruzione di chiese e abitazioni.",
			"epoche": [],
			"personaggi": [{
				"anni": "XIII-XIV secolo",
				"nome": "Rinaldo da Supino",
				"nota": "Partecipò allo Schiaffo di Anagni (1303) insieme a Guglielmo di Nogaret e Sciarra Colonna."
			}]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Supino comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Chiesa di San Pietro Apostolo",
				"secolo": "ricostruita 1750-1790",
				"stile": "Rara pianta poligonale a dodici facce",
				"testo": "Stile: Rara pianta poligonale a dodici facce",
				"opere": ["Cappella di San Cataldo con volte dipinte da Agostino Monacelli (1890)", "Portale bronzeo di Saverio Ungheri (1978)"]
			}, {
				"nome": "Santuario di San Cataldo",
				"secolo": "",
				"stile": "Barocco",
				"testo": "Stile: Barocco",
				"opere": ["Pala dell'altare maggiore di Sebastiano Conca"]
			}],
			"monumenti": [{
				"nome": "Ex Castello medievale",
				"tipo": "Castello",
				"secolo": "",
				"testo": "medievale"
			}, {
				"nome": "Villa Romana di Cona del Popolo",
				"tipo": "",
				"secolo": "II secolo d.C.",
				"testo": "II secolo d.C."
			}]
		},
		"natura": {
			"intro": "Il territorio boschivo lepino di Supino include querceti di sughera, leccio, cerro e farnetto. La Grotta della Croce ospita una specie di ragno endemica.",
			"sentieri": [{
				"nome": "Sentiero verso il Monte Semprevisa (CAI 720)",
				"difficolta": "TRADIZIONI -->",
				"testo": "Da Santa Serena (Supino) o da Gorga."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "Sagra degli Gnocchitti",
				"tipo": "Gastronomica",
				"quando": "12 luglio",
				"testo": "Specialità locale con Denominazione Comunale (De.Co.), preparata e servita in piazza con condimenti tradizionali ciociari."
			}],
			"prodotti": "",
			"piatti": "gnocchitti (De.Co. comunale)"
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Agriturismo Il Castagneto",
			"categoria": "Agriturismo",
			"descrizione": "Agriturismo situato tra i castagneti dei Lepini meridionali, nel comune di Supino. Struttura in pietra di montagna immersa nella natura, con ristorante che propone prodotti del territorio ciociaro: funghi, castagne, carni locali, ortaggi dell'orto. Offre camere e appartamenti per soggiorni.",
			"prodotti": "Castagne, Funghi porcini, Carni locali, Prodotti dell'orto",
			"indirizzo": "Supino (FR)",
			"sito": "https://www.ilcastagneto.net",
			"nota": ""
		}]
	},
	vallecorsa: {
		"slug": "vallecorsa",
		"festaPatronale": "29 settembre",
		"cap": "03020",
		"comunitaMontana": "Monti Ausoni — confine Lepini",
		"storia": {
			"intro": "Vallecorsa è un borgo medievale tra i più caratteristici del confine Lepini-Ausoni. È noto per la tradizione della \"Pasquella\", canto augurale pasquale di antichissima origine.",
			"epoche": [],
			"personaggi": [{
				"anni": "1805-1866",
				"nome": "Santa Maria De Mattias",
				"nota": "Nata a Vallecorsa il 4 febbraio 1805, fondò le Suore Adoratrici del Sangue di Cristo; canonizzata nel 2003."
			}]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Vallecorsa comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Chiesa di Santa Maria delle Grazie",
				"secolo": "",
				"stile": "",
				"testo": "Usata come location esterna nel film \"La ciociara\" (1960) di Vittorio De Sica.",
				"opere": []
			}],
			"monumenti": [{
				"nome": "Castello (Acquaviva)",
				"tipo": "Castello",
				"secolo": "",
				"testo": "medievale"
			}, {
				"nome": "Porta Missoria",
				"tipo": "",
				"secolo": "",
				"testo": "medievale"
			}]
		},
		"natura": {
			"intro": "Comune del Parco Naturale Regionale Monti Ausoni e Lago di Fondi, noto come \"città dell'Olio\": boschi decidui (cerro, roverella, carpino nero, acero) o castagneti; le tradizionali \"màcere\" (terrazzamenti a secco per oliveti) sono nel Catalogo Nazionale dei Paesaggi Rurali Storici (FAI, Consiglio d'Europa, UNESCO).",
			"sentieri": [{
				"nome": "Sentiero n.11 — Varo del Colle-Monte Calvilli",
				"difficolta": "Media",
				"testo": "Sentiero ufficiale del Parco Regionale dei Monti Ausoni, nel territorio di Vallecorsa."
			}, {
				"nome": "Sentiero della Quercia del Monaco",
				"difficolta": "TRADIZIONI -->",
				"testo": "Partenza dalla SS637 Lenola-Vallecorsa, circa 4 ore di cammino."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "Infiorata di Vallecorsa",
				"tipo": "Civile e religiosa",
				"quando": "",
				"testo": "Documentata dal Parco Naturale Regionale Monti Ausoni e Lago di Fondi."
			}],
			"prodotti": "olio d'oliva (Vallecorsa è riconosciuta \"città dell'Olio\")",
			"piatti": ""
		},
		"turismo": {
			"poi": [
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				},
				{
					"nome": "",
					"tipo": "",
					"testo": ""
				}
			],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": [{
			"nome": "Le Tre Torri — Ristorante Trattoria Pizzeria",
			"categoria": "Trattoria/Pizzeria",
			"descrizione": "Trattoria familiare con cucina tipica ciociara/romana e pizza al forno a legna.",
			"prodotti": "",
			"indirizzo": "Via Beata Maria de Mattias, Vallecorsa FR",
			"sito": "http://www.letretorri.eu/",
			"nota": ""
		}]
	},
	"villa-santo-stefano": {
		"slug": "villa-santo-stefano",
		"festaPatronale": "26 dicembre",
		"cap": "03020",
		"comunitaMontana": "Valle dell'Amaseno",
		"storia": {
			"intro": "Villa Santo Stefano è un centro rurale della Ciociaria con origine medievale e consolidata tradizione agricola.",
			"epoche": [],
			"personaggi": [{
				"anni": "1867-1954",
				"nome": "Domenico Jorio",
				"nota": "Cardinale della Chiesa Cattolica."
			}]
		},
		"arte": {
			"intro": "Il patrimonio storico-artistico di Villa Santo Stefano comprende chiese ed edifici storici di rilievo per il territorio dei Monti Lepini.",
			"chiese": [{
				"nome": "Collegiata di Maria Assunta in Cielo",
				"secolo": "XVIII secolo",
				"stile": "Barocco romano, tre navate",
				"testo": "Stile: Barocco romano, tre navate",
				"opere": []
			}, {
				"nome": "Santuario della Madonna dello Spirito Santo",
				"secolo": "",
				"stile": "Barocco",
				"testo": "Stile: Barocco",
				"opere": ["Dipinto \"Madonna dello Spirito Santo\""]
			}],
			"monumenti": [{
				"nome": "Torre (Porta) di Re Metabo",
				"tipo": "Torre",
				"secolo": "origine medievale, restaurata nel XV secolo",
				"testo": "origine medievale, restaurata nel XV secolo"
			}]
		},
		"natura": {
			"intro": "Il paese sorge sulle pendici del Monte Siserno, ultima propaggine dei Lepini nella valle dell'Amaseno, con economia storicamente agro-pastorale di oliveti e vigneti.",
			"sentieri": [{
				"nome": "Cammino della Regina Camilla, tappe Giuliano-Villa Santo Stefano-Castro",
				"difficolta": "Tappe 6-7 del cammino",
				"testo": "Tappe 6-7 del cammino a lunga percorrenza della Valle dell'Amaseno."
			}]
		},
		"tradizioni": {
			"intro": "",
			"feste": [{
				"nome": "Sagra della Polenta di San Sebastiano",
				"tipo": "Gastronomica",
				"quando": "20 gennaio",
				"testo": ""
			}, {
				"nome": "Gusta Villa",
				"tipo": "Gastronomica",
				"quando": "",
				"testo": "Passeggiata enogastronomica con prodotti tipici e degustazioni di vino tra le vie del borgo."
			}],
			"prodotti": "fallone (pane rosso tipico), marzolina (formaggio), mozzarella di bufala locale",
			"piatti": "frittata con cipicce"
		},
		"turismo": {
			"poi": [{
				"nome": "",
				"tipo": "",
				"testo": ""
			}, {
				"nome": "",
				"tipo": "",
				"testo": ""
			}],
			"arrivo": {
				"auto": "",
				"treno": "",
				"bus": ""
			},
			"contatti": {
				"sito": "",
				"proloco": "",
				"email": ""
			}
		},
		"attivita": []
	}
};
function getScheda(slug) {
	return SCHEDE[slug];
}
var TAB_IDS = [
	"storia",
	"arte",
	"natura",
	"tradizioni",
	"turismo",
	"attivita"
];
function tabFromHash(hash) {
	const id = hash.replace(/^#/, "").replace(/^tab-/, "");
	return TAB_IDS.includes(id) ? id : "storia";
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/specie-QauZq85_.js
var specie_note_default = {
	"Arbutus unedo": "Arbusto sempreverde della macchia mediterranea, con frutti rossi commestibili che maturano in autunno-inverno.",
	"Erica arborea": "Arbusto sempreverde tipico della macchia mediterranea, con fitte pannocchie di piccoli fiori bianchi profumati.",
	"Olea europaea": "Albero sempreverde coltivato da millenni nell'area mediterranea, elemento caratteristico del paesaggio agrario lepino.",
	"Elaphe quatuorlineata": "Il cervone è uno dei serpenti più grandi d'Italia, non velenoso, legato ad ambienti caldi e assolati collinari.",
	"Papilio machaon": "Grande farfalla diurna dalle ali gialle e nere, le cui larve si nutrono di piante della famiglia delle Apiaceae.",
	"Arctia caja": "Il bruco peloso di questa falena, detto 'orsetto', è ben noto nei prati e giardini dell'Italia centrale in tarda estate.",
	"Coenonympha pamphilus": "Piccola farfalla dei prati soleggiati, molto comune anche in quota, vola quasi ininterrottamente per tutta l'estate.",
	"Anemone hortensis": "Specie erbacea mediterranea dai petali violacei a forma di stella, comune in prati aridi e incolti.",
	"Gallinula chloropus": "Frequenta canneti e sponde di corsi d'acqua e stagni, nuotando con il caratteristico movimento a scatti della testa.",
	"Fulica atra": "Uccello acquatico comune negli specchi d'acqua e nelle zone umide, riconoscibile per lo scudo frontale bianco.",
	"Pelophylax kl. hispanicus": "Complesso ibridogenetico di rane acquatiche diffuso nell'Italia centrale, legato a stagni, fossi e sorgenti dei Lepini.",
	"Acherontia atropos": "Grande falena migratrice riconoscibile dal disegno a teschio sul torace; il bruco si nutre di solanacee come la patata.",
	"Vespa crabro": "Il calabrone europeo è un imenottero sociale che nidifica spesso in cavità di alberi vecchi nei boschi.",
	"Quercus ilex": "Quercia sempreverde della macchia mediterranea, forma leccete dense su versanti calcarei e rocciosi dei Lepini.",
	"Fagus sylvatica": "Specie dominante delle foreste montane appenniniche oltre gli 800-1000 metri, forma faggete pure e ombrose.",
	"Hystrix cristata": "Il più grande roditore europeo, scava tane profonde nei boschi e si muove principalmente di notte.",
	"Meles meles": "Mustelide notturno e scavatore, vive in tane comunitarie nei boschi dei Lepini nutrendosi di lombrichi, frutta e piccoli animali.",
	"Vulpes vulpes": "Predatore opportunista e molto adattabile, diffuso sui Lepini dai boschi fino ai margini dei centri abitati.",
	"Mustela nivalis": "Il più piccolo carnivoro italiano, si muove agile tra pietraie e siepi cacciando arvicole e piccoli roditori.",
	"Canis lupus italicus": "Sottospecie endemica dell'Appennino, presente sui Lepini come predatore apicale che regola le popolazioni di ungulati.",
	"Taxus baccata": "Il tasso è una conifera longeva e tossica in ogni sua parte (tranne l'arillo), relitto delle antiche foreste appenniniche.",
	"Ilex aquifolium": "Arbusto sempreverde dalle foglie spinose e bacche rosse, tipico del sottobosco delle faggete appenniniche.",
	"Anacamptis pyramidalis": "L'orchidea piramidale è tra le specie più comuni nei prati aridi collinari dell'Appennino centrale.",
	"Cyclamen sp.": "Genere erbaceo perenne dai fiori rosa-violacei rivolti verso il basso, comune nel sottobosco calcareo appenninico.",
	"Anemone nemorosa": "Fiorisce a inizio primavera formando tappeti bianchi nel sottobosco umido prima che le chiome si richiudano.",
	"Aquila chrysaetos": "L'aquila reale nidifica su pareti rocciose appenniniche e caccia su vasti territori di montagna e alta collina.",
	"Dryocopus martius": "Il più grande picchio europeo, legato alle faggete mature dell'Appennino dove scava cavità profonde nei tronchi.",
	"Falco tinnunculus": "Rapace comune che caccia roditori nei campi aperti restando sospeso in volo battuto, lo 'spirito santo'.",
	"Sus scrofa": "Diffuso nei boschi di latifoglie dei Lepini, il cinghiale scava il sottobosco in cerca di ghiande, tuberi e invertebrati.",
	"Capreolus capreolus": "Il capriolo è l'ungulato selvatico più diffuso nei boschi appenninici, attivo soprattutto all'alba e al tramonto.",
	"Ophrys apifera": "Il fiore imita l'aspetto e l'odore di un'ape femmina per attirare gli insetti impollinatori maschi.",
	"Saturnia pyri": "Il grande pavone notturno è la falena più grande d'Europa, con bruchi che si nutrono di foglie di fruttiferi selvatici.",
	"Polygonia c-album": "Farfalla dei margini boschivi appenninici, sverna da adulta in anfratti riparati e ricompare nelle giornate soleggiate invernali.",
	"Maniola jurtina": "Farfalla molto comune nei prati e ai margini dei boschi, vola da giugno a settembre su fiori campestri.",
	"Quercus cerris": "Quercia caducifoglia dalle ghiande a cupola ispida, diffusa nei querceti misti collinari appenninici.",
	"Quercus pubescens": "La roverella è la quercia caducifoglia dominante nei boschi collinari e submontani dell'Italia centrale.",
	"Castanea sativa": "Storicamente coltivato per i frutti, forma boschi estesi nella fascia submontana dei Monti Lepini.",
	"Ardea cinerea": "L'airone cenerino nidifica in colonie su alberi vicino a fiumi e laghi, cacciando immobile in acque basse.",
	"Anas crecca": "L'alzavola è la più piccola anatra di superficie europea, presente in Italia soprattutto come svernante nelle zone umide.",
	"Buteo buteo": "Rapace stanziale e diffuso sui Lepini, si osserva librarsi in ampi cerchi sopra i pascoli in cerca di piccoli roditori.",
	"Accipiter nisus": "Rapace agile dei boschi dei Lepini, caccia piccoli uccelli con voli rapidi e improvvisi tra la vegetazione.",
	"Galanthus nivalis": "Tra le prime fioriture dell'anno, spunta tra la neve residua nei boschi e nei prati montani appenninici.",
	"Cyclamen hederifolium": "Fiorisce in autunno prima delle foglie, diffuso nei boschi e nelle boscaglie calcaree dell'Italia centro-meridionale.",
	"Vinca minor": "La pervinca minore forma tappeti sempreverdi con fiori azzurro-violacei nei sottoboschi ombrosi collinari.",
	"Anemone apennina": "Piccola erbacea dai fiori azzurro-violetti che fiorisce in primavera nei boschi di latifoglie dell'Appennino.",
	"Martes martes": "Mustelide arboricolo dei boschi maturi, attivo soprattutto di notte, si nutre di piccoli mammiferi e frutti.",
	"Milvus migrans": "Rapace migratore che nidifica nelle aree collinari del Lazio, spesso vicino a corsi d'acqua, nutrendosi anche da opportunista.",
	"Pernis apivorus": "Migratore estivo che si nutre soprattutto di larve di vespe e api, scavandone i nidi nel terreno.",
	"Iphiclides podalirius": "Farfalla dalle ali a coda di rondine, frequenta cespuglieti e boschi radi con biancospino e prugnolo, piante ospiti del bruco.",
	"Arum italicum": "Erbacea con vistose foglie sagittate maculate, comune nel sottobosco umido e nelle siepi dell'Italia centrale.",
	"Falco peregrinus": "Nidifica sulle pareti calcaree dei Lepini ed è il rapace più veloce al mondo in picchiata di caccia.",
	"Salamandrina perspicillata": "Anfibio endemico dell'Appennino, presente sui Lepini lungo ruscelli e sorgenti dove depone le uova in primavera.",
	"Cephalanthera longifolia": "Orchidea spontanea dai fiori bianchi, cresce nei boschi di latifoglie e faggete ombrose dell'Appennino centrale.",
	"Sorbus aria": "Il sorbo montano, o farinaccio, si riconosce per le foglie con pagina inferiore bianco-tomentosa, tipico dei boschi montani.",
	"Scolopax rusticola": "La beccaccia è un uccello elusivo dai colori mimetici, legata ai boschi umidi con sottobosco fitto.",
	"Anacridium aegyptium": "La cavalletta egiziana è un ortottero di grandi dimensioni comune in ambienti aridi e cespugliati dell'Italia centrale.",
	"Caenoplana variegata": "Platelminta originario dell'Australia ormai diffuso in Italia, soprattutto nei giardini umidi, dove preda i lombrichi.",
	"Polypodium vulgare": "Questa felce sempreverde cresce su rocce, muretti a secco e cortecce muscose dei boschi appenninici.",
	"Scabiosa columbaria": "La vedovina forma capolini lilla-azzurrati nei prati aridi collinari, molto visitata da farfalle e api selvatiche.",
	"Corvus corax": "Nidifica su pareti rocciose isolate dei Lepini ed è tra i corvidi più grandi e territoriali d'Europa.",
	"Martes foina": "Mustelide notturno e opportunista, frequenta sia i boschi sia i centri abitati dei borghi lepini.",
	"Acer pseudoplatanus": "Cresce nelle faggete montane e nei valloni freschi, spesso associato a faggio e carpino nell'Appennino.",
	"Tilia cordata": "Il tiglio produce fiori profumati molto visitati dalle api, usati tradizionalmente per infusi rilassanti.",
	"Ostrya carpinifolia": "Albero deciduo molto diffuso nei boschi misti collinari e montani dell'Appennino centrale, spesso con roverella.",
	"Corylus avellana": "Arbusto o piccolo albero diffuso nel sottobosco e nelle siepi, coltivato anche per la produzione di nocciole.",
	"Vipera aspis": "Serpente velenoso diffuso su substrati rocciosi e assolati dei Lepini, riconoscibile dal muso lievemente rivolto all'insù.",
	"Barbus plebejus": "Il barbo italico vive in acque correnti e ossigenate dei fiumi appenninici, prediligendo fondali ghiaiosi.",
	"Ardea alba": "L'airone bianco maggiore frequenta zone umide, canali e corsi d'acqua a bassa quota per cacciare pesci e anfibi.",
	"Myrtus communis": "Arbusto sempreverde aromatico della macchia mediterranea, con fiori bianchi profumati e bacche blu-nerastre.",
	"Capparis spinosa": "Arbusto rupicolo tipico degli ambienti rocciosi e dei muri a secco dell'area mediterranea, con boccioli commestibili.",
	"Apus apus": "Trascorre quasi tutta la vita in volo, nidifica nelle fessure dei centri storici dei borghi lepini e sverna in Africa.",
	"Hierophis viridiflavus": "Il biacco è un serpente diurno non velenoso, molto veloce, comune in ambienti aperti e cespuglieti collinari italiani.",
	"Podarcis siculus": "Rettile molto comune e adattabile, frequenta muretti a secco, sentieri assolati e margini coltivati.",
	"Upupa epops": "Uccello migratore dal caratteristico ciuffo erettile, frequenta pascoli e oliveti nutrendosi di larve e insetti del terreno.",
	"Orchis mascula": "L'orchidea maggiore selvatica fiorisce in primavera in prati e boschi chiari dei rilievi dell'Italia centrale.",
	"Quercus suber": "La quercia da sughero produce la corteccia spugnosa usata per il sughero, tipica di aree costiere e collinari calde.",
	"Triturus carnifex": "Anfibio di grandi dimensioni: il maschio sviluppa in primavera una vistosa cresta dorsale durante il corteggiamento acquatico.",
	"Lullula arborea": "Allodola dei terreni aperti e alberati, emette un canto melodioso e discendente spesso mentre vola in cerchio.",
	"Dendrocopos major": "Picchio comune nei boschi misti dei Lepini, riconoscibile dal tamburellamento rapido e ritmico sui tronchi.",
	"Phoenicurus ochruros": "Frequenta pareti rocciose e centri storici dei borghi lepini, dove nidifica in anfratti e cornicioni.",
	"Macroglossum stellatarum": "Falena diurna che si libra davanti ai fiori succhiando nettare con la lunga spirotromba, simile nel volo a un colibrì.",
	"Charaxes jasius": "Farfalla legata al corbezzolo, di cui il bruco mangia le foglie; è tra le farfalle diurne più grandi d'Europa.",
	"Argynnis paphia": "Grande farfalla dei margini boschivi, le cui larve si nutrono di viole selvatiche.",
	"Tarentola mauritanica": "Geco comune sui muri a secco e le pietre soleggiate dei borghi lepini, attivo soprattutto al crepuscolo e di notte.",
	"Falco biarmicus": "Rapace raro legato alle pareti rocciose dell'Appennino centrale, dove caccia in volo veloce e planato.",
	"Linaria cannabina": "Piccolo fringillide granivoro tipico degli arbusteti e delle zone coltivate di collina.",
	"Oriolus oriolus": "Uccello estivo dal piumaggio giallo brillante nel maschio, nidifica nei boschi di latifoglie restando spesso nascosto tra le fronde.",
	"Monticola saxatilis": "Specie tipica delle praterie rupestri d'alta quota, nidifica tra le rocce delle cime più elevate dei Lepini.",
	"Juniperus communis": "Arbusto sempreverde con bacche blu-nerastre usate anche in cucina, comune su pascoli e rocce calcaree montane.",
	"Turdus viscivorus": "Il più grande tordo europeo, canta spesso da posatoi elevati anche con tempo ventoso o piovoso.",
	"Erithacus rubecula": "Passeriforme territoriale di boschi e siepi, comune tutto l'anno anche nei giardini dei paesi lepini.",
	"Ulmus minor": "L'olmo campestre cresce spontaneo lungo siepi e corsi d'acqua dell'Italia centrale, spesso colpito dalla grafiosi.",
	"Gonepteryx rhamni": "La cedronella è tra le prime farfalle a volare in primavera, svernando da adulta nascosta tra la vegetazione.",
	"Pieris brassicae": "La cavolaia maggiore è una farfalla diffusa che depone le uova su piante della famiglia delle Brassicacee.",
	"Lycaena tityrus": "Farfalla legata alle piante di romice, su cui le larve si nutrono, comune in prati e radure collinari.",
	"Asarum europaeum": "Pianta erbacea perenne dalle foglie cuoriformi lucide, tipica del sottobosco ombroso di faggete e querceti.",
	"Rosa sempervirens": "La rosa di San Giovanni è una rosa selvatica rampicante sempreverde tipica della macchia mediterranea italiana.",
	"Magnolia grandiflora": "Albero sempreverde originario del sud-est degli USA, coltivato come ornamentale nei parchi e giardini italiani.",
	"Wisteria sinensis": "Liana rampicante originaria della Cina, ampiamente coltivata in Italia per la fioritura violacea profumata primaverile.",
	"Prunus serrulata": "Albero ornamentale originario dell'Asia orientale, apprezzato per la fioritura primaverile spettacolare nei parchi urbani.",
	"Alcedo atthis": "Uccello dai colori sgargianti che si tuffa da posatoi sopra corsi d'acqua limpidi per catturare piccoli pesci.",
	"Libellula depressa": "Una delle libellule più comuni d'Europa, riconoscibile per l'addome largo e appiattito, frequenta stagni e pozze.",
	"Quercus frainetto": "Quercia caducifoglia dalle grandi foglie lobate, presente nei querceti misti dell'Italia centro-meridionale.",
	"Accipiter gentilis": "L'astore è un rapace forestale elusivo che caccia con voli rapidi tra gli alberi dei boschi maturi appenninici.",
	"Athene noctua": "Nidifica in muretti a secco e vecchi ruderi delle campagne lepine, cacciando insetti e piccoli roditori al crepuscolo.",
	"Natrix helvetica": "La biscia dal collare è un serpente acquatico innocuo, riconoscibile dal collarino chiaro dietro la testa.",
	"Vanellus vanellus": "Uccello dei terreni aperti e umidi, riconoscibile dal ciuffo sul capo e dal volo ondulato e sfarfallante.",
	"Quercus robur": "Quercia maestosa a lunga vita, predilige suoli profondi e freschi nelle aree planiziali e pedemontane.",
	"Orchis purpurea": "L'orchidea maggiore forma alte spighe di fiori purpurei in boschi radi e cespuglieti calcarei dell'Appennino.",
	"Egretta garzetta": "Airone bianco e snello che caccia pesci e anfibi guadando lentamente nelle acque basse.",
	"Sciurus vulgaris": "Roditore arboricolo dei boschi di faggio e castagno dei Lepini, attivo di giorno e ghiotto di nocciole e semi di conifera.",
	"Olea europaea var. sylvestris": "Forma selvatica dell'olivo, con foglie più piccole e portamento spinoso, tipica della macchia mediterranea.",
	"Pistacia lentiscus": "Arbusto sempreverde aromatico della macchia mediterranea, con foglie composte paripennate e piccoli frutti neri.",
	"Lissotriton italicus": "Il più piccolo tritone europeo, endemico dell'Italia centro-meridionale, presente in pozze e sorgenti dei Lepini.",
	"Salvia officinalis": "La salvia officinale cresce spontanea su versanti soleggiati e rocciosi, apprezzata da api e altri impollinatori.",
	"Carlina acaulis": "Pianta erbacea a rosetta basale con grande capolino argenteo, comune nei pascoli montani appenninici.",
	"Rhinolophus ferrumequinum": "Il rinolofo maggiore colonizza le grotte carsiche dei Lepini, dove sverna appeso a testa in giù in gruppi numerosi.",
	"Acer sp.": "Genere diffuso nei boschi misti appenninici, con foglie palmate che colorano i versanti dei Lepini in autunno.",
	"Orchis italica": "L'orchidea italica cresce in prati aridi e garighe collinari dell'Italia centrale, fiorendo tra marzo e maggio.",
	"Coronella austriaca": "Serpente non velenoso che predilige ambienti soleggiati e sassosi, dove caccia soprattutto lucertole.",
	"Xanthoria parietina": "Lichene fogliaceo arancione, molto comune su rocce e cortecce, usato come bioindicatore della qualità dell'aria."
};
function specieId(s) {
	return (s.scientifico + "-" + s.comune).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
var NOTE = specie_note_default;
function notaSpecie(scientifico) {
	return NOTE[scientifico] ?? null;
}
var SPECIE = [
	{
		comune: "Airone bianco maggiore",
		scientifico: "Ardea alba",
		gruppo: "fauna",
		habitat: "Zone umide, Ninfa e piana",
		foto: "/images/specie/fauna-airone_bianco.jpg",
		comuni: ["morolo"]
	},
	{
		comune: "Airone cenerino",
		scientifico: "Ardea cinerea",
		gruppo: "fauna",
		habitat: "Zone umide e corsi d'acqua",
		foto: "/images/specie/fauna-airone_cenerino.jpg",
		comuni: ["cori", "sermoneta"]
	},
	{
		comune: "Alzavola",
		scientifico: "Anas crecca",
		gruppo: "fauna",
		habitat: "Zone umide, svernante",
		foto: "/images/specie/fauna-alzavola.jpg",
		comuni: ["cori"]
	},
	{
		comune: "Aquila reale",
		scientifico: "Aquila chrysaetos",
		gruppo: "fauna",
		habitat: "Cresta e pareti, osservazioni non garantite",
		foto: "/images/specie/fauna-aquila_reale.jpg",
		comuni: ["carpineto-romano"]
	},
	{
		comune: "Astore",
		scientifico: "Accipiter gentilis",
		gruppo: "fauna",
		habitat: "Boschi maturi",
		foto: "/images/specie/fauna-astore.jpg",
		comuni: ["sezze"]
	},
	{
		comune: "Barbo",
		scientifico: "Barbus fucini",
		gruppo: "fauna",
		habitat: "Corsi d'acqua appenninici",
		foto: "/images/specie/fauna-barbo.jpg",
		comuni: ["morolo"]
	},
	{
		comune: "Beccaccia",
		scientifico: "Scolopax rusticola",
		gruppo: "fauna",
		habitat: "Bosco umido, soprattutto in passo",
		foto: "/images/specie/fauna-beccaccia.jpg",
		comuni: ["maenza", "roccagorga"]
	},
	{
		comune: "Biacco",
		scientifico: "Hierophis viridiflavus",
		gruppo: "fauna",
		habitat: "Macchia, muri a secco, gariga",
		foto: "/images/specie/fauna-biacco.jpg",
		comuni: ["norma"]
	},
	{
		comune: "Calabrone europeo",
		scientifico: "Vespa crabro",
		gruppo: "fauna",
		habitat: "Bosco e margini, nidi in cavità",
		foto: "/images/specie/fauna-calabrone.jpg",
		comuni: ["artena", "prossedi"]
	},
	{
		comune: "Capriolo",
		scientifico: "Capreolus capreolus",
		gruppo: "fauna",
		habitat: "Bosco e radure, presenza discreta",
		foto: "/images/specie/fauna-capriolo.jpg",
		comuni: ["carpineto-romano"]
	},
	{
		comune: "Cavalletta egiziana",
		scientifico: "Anacridium aegyptium",
		gruppo: "fauna",
		habitat: "Macchia e coltivi",
		foto: "/images/specie/fauna-cavalletta_egiziana.jpg",
		comuni: ["maenza"]
	},
	{
		comune: "Cavolaia maggiore",
		scientifico: "Pieris brassicae",
		gruppo: "fauna",
		habitat: "Prati e orti",
		foto: "/images/specie/fauna-cavolaia.jpg",
		comuni: ["roccasecca-dei-volsci"]
	},
	{
		comune: "Cedronella",
		scientifico: "Lepidoptera sp.",
		gruppo: "fauna",
		habitat: "Farfalla segnalata nelle schede comunali; binomio da verificare",
		foto: "/images/specie/fauna-cedronella.jpg",
		comuni: ["roccasecca-dei-volsci"]
	},
	{
		comune: "Cervone",
		scientifico: "Elaphe quatuorlineata",
		gruppo: "fauna",
		habitat: "Macchia, muri, zone calde",
		foto: "/images/specie/fauna-cervone.jpg",
		comuni: ["amaseno", "roccagorga"]
	},
	{
		comune: "Chirotteri cavernicoli",
		scientifico: "Chiroptera spp.",
		gruppo: "fauna",
		habitat: "Grotte e cavità: non speleologia improvvisata",
		foto: "/images/specie/fauna-chirotteri_cavernicoli.jpg",
		comuni: ["supino"]
	},
	{
		comune: "Cinghiale",
		scientifico: "Sus scrofa",
		gruppo: "fauna",
		habitat: "Bosco e margini, soprattutto all'imbrunire",
		foto: "/images/specie/fauna-cinghiale.jpg",
		comuni: [
			"carpineto-romano",
			"cori",
			"giuliano-di-roma",
			"sermoneta"
		]
	},
	{
		comune: "Civetta",
		scientifico: "Athene noctua",
		gruppo: "fauna",
		habitat: "Borghi, uliveti, notturna",
		foto: "/images/specie/fauna-civetta.jpg",
		comuni: ["sezze"]
	},
	{
		comune: "Codirosso spazzacamino",
		scientifico: "Phoenicurus ochruros",
		gruppo: "fauna",
		habitat: "Borghi e pareti",
		foto: "/images/specie/fauna-codirosso.jpg",
		comuni: ["priverno"]
	},
	{
		comune: "Codirossone",
		scientifico: "Monticola saxatilis",
		gruppo: "fauna",
		habitat: "Pendii rocciosi, estivante",
		foto: "/images/specie/fauna-codirossone.jpg",
		comuni: ["rocca-massima"]
	},
	{
		comune: "Colubro liscio",
		scientifico: "Coronella austriaca",
		gruppo: "fauna",
		habitat: "Prati e pietraie",
		foto: "/images/specie/fauna-colubro_liscio.jpg",
		comuni: ["vallecorsa"]
	},
	{
		comune: "Corvo imperiale",
		scientifico: "Corvus corax",
		gruppo: "fauna",
		habitat: "Cresta e pareti",
		foto: "/images/specie/fauna-corvo_imperiale.jpg",
		comuni: ["montelanico", "rocca-massima"]
	},
	{
		comune: "Donnola",
		scientifico: "Mustela nivalis",
		gruppo: "fauna",
		habitat: "Campi, muretti, siepi",
		foto: "/images/specie/fauna-donnola.jpg",
		comuni: ["bassiano"]
	},
	{
		comune: "Faina",
		scientifico: "Martes foina",
		gruppo: "fauna",
		habitat: "Borghi e bosco, notturna",
		foto: "/images/specie/fauna-faina.jpg",
		comuni: ["montelanico"]
	},
	{
		comune: "Falco lanario",
		scientifico: "Falco biarmicus",
		gruppo: "fauna",
		habitat: "Pareti, osservazioni non garantite",
		foto: "/images/specie/fauna-falco_lanario.jpg",
		comuni: ["rocca-massima"]
	},
	{
		comune: "Falco pecchiaiolo",
		scientifico: "Pernis apivorus",
		gruppo: "fauna",
		habitat: "Bosco, migratore/estivante",
		foto: "/images/specie/fauna-falco_pecchiaiolo.jpg",
		comuni: ["giuliano-di-roma"]
	},
	{
		comune: "Falco pellegrino",
		scientifico: "Falco peregrinus",
		gruppo: "fauna",
		habitat: "Falesie calcaree",
		foto: "/images/specie/fauna-falco_pellegrino.jpg",
		comuni: [
			"gorga",
			"maenza",
			"montelanico",
			"rocca-massima",
			"sermoneta",
			"sezze",
			"sonnino",
			"vallecorsa"
		]
	},
	{
		comune: "Falena",
		scientifico: "Conistra erythrocephala",
		gruppo: "fauna",
		habitat: "Bosco, notturna",
		foto: "/images/specie/fauna-falena.jpg",
		comuni: ["castro-dei-volsci"]
	},
	{
		comune: "Falena orsa",
		scientifico: "Arctia caja",
		gruppo: "fauna",
		habitat: "Prati e margini",
		foto: "/images/specie/fauna-falena_orsa.jpg",
		comuni: ["amaseno"]
	},
	{
		comune: "Fanello",
		scientifico: "Linaria cannabina",
		gruppo: "fauna",
		habitat: "Garighe e pascoli",
		foto: "/images/specie/fauna-fanello.jpg",
		comuni: ["rocca-massima"]
	},
	{
		comune: "Pafia",
		scientifico: "Argynnis paphia",
		gruppo: "fauna",
		habitat: "Radure di bosco",
		foto: "/images/specie/fauna-farfalla_pafia.jpg",
		comuni: ["prossedi"]
	},
	{
		comune: "Folaga",
		scientifico: "Fulica atra",
		gruppo: "fauna",
		habitat: "Zone umide",
		foto: "/images/specie/fauna-folaga.jpg",
		comuni: ["artena"]
	},
	{
		comune: "Gallinella d'acqua",
		scientifico: "Gallinula chloropus",
		gruppo: "fauna",
		habitat: "Canneti e fossi",
		foto: "/images/specie/fauna-gallinella.jpg",
		comuni: ["artena"]
	},
	{
		comune: "Garzetta",
		scientifico: "Egretta garzetta",
		gruppo: "fauna",
		habitat: "Zone umide, piana e Ninfa",
		foto: "/images/specie/fauna-garzetta.jpg",
		comuni: ["sgurgola"]
	},
	{
		comune: "Gheppio",
		scientifico: "Falco tinnunculus",
		gruppo: "fauna",
		habitat: "Aperti, campanili, crinale",
		foto: "/images/specie/fauna-gheppio.jpg",
		comuni: [
			"carpineto-romano",
			"morolo",
			"norma",
			"prossedi",
			"sermoneta"
		]
	},
	{
		comune: "Istrice",
		scientifico: "Hystrix cristata",
		gruppo: "fauna",
		habitat: "Macchia e oliveti, tracce notturne",
		foto: "/images/specie/fauna-istrice.jpg",
		comuni: [
			"bassiano",
			"carpineto-romano",
			"rocca-massima",
			"sonnino",
			"vallecorsa"
		]
	},
	{
		comune: "Libellule",
		scientifico: "Odonata spp.",
		gruppo: "fauna",
		habitat: "Zone umide; a Ninfa se ne contano molte",
		foto: "/images/specie/fauna-libellule.jpg",
		comuni: ["sermoneta"]
	},
	{
		comune: "Licenide fuligginoso",
		scientifico: "Satyrium acaciae",
		gruppo: "fauna",
		habitat: "Margini arbustivi",
		foto: "/images/specie/fauna-licenide_fuligginoso.jpg",
		comuni: ["roccasecca-dei-volsci"]
	},
	{
		comune: "Lucertola campestre",
		scientifico: "Podarcis siculus",
		gruppo: "fauna",
		habitat: "Muri, gariga, borghi",
		foto: "/images/specie/fauna-lucertola_campestre.jpg",
		comuni: ["norma", "villa-santo-stefano"]
	},
	{
		comune: "Lupo appenninico",
		scientifico: "Canis lupus italicus",
		gruppo: "fauna",
		habitat: "Aree interne, presenza discreta, da non cercare",
		foto: "/images/specie/fauna-lupo.jpg",
		comuni: [
			"bassiano",
			"carpineto-romano",
			"sonnino",
			"vallecorsa"
		]
	},
	{
		comune: "Macaone",
		scientifico: "Papilio machaon",
		gruppo: "fauna",
		habitat: "Prati e umbellifere",
		foto: "/images/specie/fauna-macaone.jpg",
		comuni: ["amaseno"]
	},
	{
		comune: "Martin pescatore",
		scientifico: "Alcedo atthis",
		gruppo: "fauna",
		habitat: "Corsi d'acqua e laghetti",
		foto: "/images/specie/fauna-martin_pescatore.jpg",
		comuni: ["sermoneta"]
	},
	{
		comune: "Martora",
		scientifico: "Martes martes",
		gruppo: "fauna",
		habitat: "Boschi maturi, elusiva",
		foto: "/images/specie/fauna-martora.jpg",
		comuni: ["giuliano-di-roma"]
	},
	{
		comune: "Biscia dal collare",
		scientifico: "Natrix natrix",
		gruppo: "fauna",
		habitat: "Acque e fossi",
		foto: "/images/specie/fauna-natrice.jpg",
		comuni: ["sezze", "supino"]
	},
	{
		comune: "Nibbio",
		scientifico: "Milvus migrans",
		gruppo: "fauna",
		habitat: "Cielo aperto, migratore/estivante",
		foto: "/images/specie/fauna-nibbio.jpg",
		comuni: ["giuliano-di-roma"]
	},
	{
		comune: "Ninfa dei corbezzoli",
		scientifico: "Charaxes jasius",
		gruppo: "fauna",
		habitat: "Macchia a corbezzolo",
		foto: "/images/specie/fauna-ninfa_corbezzoli.jpg",
		comuni: ["priverno"]
	},
	{
		comune: "Panfilo",
		scientifico: "Iphiclides podalirius",
		gruppo: "fauna",
		habitat: "Margini e pruniacee",
		foto: "/images/specie/fauna-panfilo.jpg",
		comuni: ["amaseno"]
	},
	{
		comune: "Pavoncella",
		scientifico: "Vanellus vanellus",
		gruppo: "fauna",
		habitat: "Piana umida, in calo",
		foto: "/images/specie/fauna-pavoncella.jpg",
		comuni: ["sezze"]
	},
	{
		comune: "Pettirosso",
		scientifico: "Erithacus rubecula",
		gruppo: "fauna",
		habitat: "Bosco e giardini",
		foto: "/images/specie/fauna-pettirosso.jpg",
		comuni: ["roccagorga"]
	},
	{
		comune: "Picchio nero",
		scientifico: "Dryocopus martius",
		gruppo: "fauna",
		habitat: "Faggete mature",
		foto: "/images/specie/fauna-picchio_nero.jpg",
		comuni: ["carpineto-romano"]
	},
	{
		comune: "Picchio rosso maggiore",
		scientifico: "Dendrocopos major",
		gruppo: "fauna",
		habitat: "Boschi misti",
		foto: "/images/specie/fauna-picchio_rosso.jpg",
		comuni: ["priverno"]
	},
	{
		comune: "Planaria terrestre alloctona",
		scientifico: "Caenoplana variegata",
		gruppo: "fauna",
		habitat: "Suolo umido; specie alloctona segnalata",
		foto: "/images/specie/fauna-planaria_terrestre_aliena.jpg",
		comuni: ["maenza"]
	},
	{
		comune: "Podalirio",
		scientifico: "Iphiclides podalirius",
		gruppo: "fauna",
		habitat: "Margini soleggiati",
		foto: "/images/specie/fauna-podalirio.jpg",
		comuni: ["giuliano-di-roma"]
	},
	{
		comune: "Poiana",
		scientifico: "Buteo buteo",
		gruppo: "fauna",
		habitat: "Cielo aperto, crinale e piana",
		foto: "/images/specie/fauna-poiana.jpg",
		comuni: [
			"cori",
			"giuliano-di-roma",
			"norma",
			"sgurgola"
		]
	},
	{
		comune: "Rana verde",
		scientifico: "Pelophylax kl. esculentus",
		gruppo: "fauna",
		habitat: "Lago di Giulianello e raccolte d'acqua",
		foto: "/images/specie/fauna-rana_verde.jpg",
		comuni: ["artena"]
	},
	{
		comune: "Rigogolo",
		scientifico: "Oriolus oriolus",
		gruppo: "fauna",
		habitat: "Pioppeti e bosco ripariale, estivante",
		foto: "/images/specie/fauna-rigogolo.jpg",
		comuni: ["rocca-massima"]
	},
	{
		comune: "Rondone",
		scientifico: "Apus apus",
		gruppo: "fauna",
		habitat: "Borghi, estate",
		foto: "/images/specie/fauna-rondone.jpg",
		comuni: ["norma"]
	},
	{
		comune: "Salamandrina dagli occhiali",
		scientifico: "Salamandrina perspicillata",
		gruppo: "fauna",
		habitat: "Valloni umidi, endemica italiana",
		foto: "/images/specie/fauna-salamandrina.jpg",
		comuni: [
			"gorga",
			"morolo",
			"patrica"
		]
	},
	{
		comune: "Satiro comune",
		scientifico: "Maniola jurtina",
		gruppo: "fauna",
		habitat: "Prati",
		foto: "/images/specie/fauna-satiro_comune.jpg",
		comuni: ["castro-dei-volsci"]
	},
	{
		comune: "Saturnia del pero",
		scientifico: "Saturnia pyri",
		gruppo: "fauna",
		habitat: "Frutteti e margini; la falena più grande d'Europa",
		foto: "/images/specie/fauna-saturnia.jpg",
		comuni: ["patrica"]
	},
	{
		comune: "Scoiattolo comune",
		scientifico: "Sciurus vulgaris",
		gruppo: "fauna",
		habitat: "Bosco di faggio e cerro",
		foto: "/images/specie/fauna-scoiattolo.jpg",
		comuni: ["sgurgola"]
	},
	{
		comune: "Sfinge colibrì",
		scientifico: "Macroglossum stellatarum",
		gruppo: "fauna",
		habitat: "Aiuole e garighe, diurna",
		foto: "/images/specie/fauna-sfinge_colibri.jpg",
		comuni: ["priverno"]
	},
	{
		comune: "Sfinge testa di morto",
		scientifico: "Acherontia atropos",
		gruppo: "fauna",
		habitat: "Rara, migratrice",
		foto: "/images/specie/fauna-sfinge_testa_morto.jpg",
		comuni: ["artena"]
	},
	{
		comune: "Sparviero",
		scientifico: "Accipiter nisus",
		gruppo: "fauna",
		habitat: "Bosco, caccia tra i rami",
		foto: "/images/specie/fauna-sparviero.jpg",
		comuni: ["cori"]
	},
	{
		comune: "Tarantola muraiola",
		scientifico: "Tarentola mauritanica",
		gruppo: "fauna",
		habitat: "Muri dei borghi, notturna",
		foto: "/images/specie/fauna-tarantola.jpg",
		comuni: ["prossedi", "sezze"]
	},
	{
		comune: "Tasso",
		scientifico: "Meles meles",
		gruppo: "fauna",
		habitat: "Bosco, sett, tracce notturne",
		foto: "/images/specie/fauna-tasso_animale.jpg",
		comuni: [
			"bassiano",
			"montelanico",
			"sermoneta"
		]
	},
	{
		comune: "Tordela",
		scientifico: "Turdus viscivorus",
		gruppo: "fauna",
		habitat: "Radure e vischio",
		foto: "/images/specie/fauna-tordela.jpg",
		comuni: ["roccagorga"]
	},
	{
		comune: "Tottavilla",
		scientifico: "Lullula arborea",
		gruppo: "fauna",
		habitat: "Pascoli arborati",
		foto: "/images/specie/fauna-tottavilla.jpg",
		comuni: ["priverno"]
	},
	{
		comune: "Tritone crestato italiano",
		scientifico: "Triturus carnifex",
		gruppo: "fauna",
		habitat: "Pozze e abbeveratoi",
		foto: "/images/specie/fauna-tritone.jpg",
		comuni: [
			"priverno",
			"prossedi",
			"segni"
		]
	},
	{
		comune: "Tritone italiano",
		scientifico: "Lissotriton italicus",
		gruppo: "fauna",
		habitat: "Raccolte d'acqua, endemico",
		foto: "/images/specie/fauna-tritone_italiano.jpg",
		comuni: ["sonnino"]
	},
	{
		comune: "Upupa",
		scientifico: "Upupa epops",
		gruppo: "fauna",
		habitat: "Uliveti e campi aperti, estivante",
		foto: "/images/specie/fauna-upupa.jpg",
		comuni: ["norma"]
	},
	{
		comune: "Vipera comune",
		scientifico: "Vipera aspis",
		gruppo: "fauna",
		habitat: "Pietraie e gariga: rispetto, non caccia",
		foto: "/images/specie/fauna-vipera.jpg",
		comuni: [
			"morolo",
			"roccasecca-dei-volsci",
			"vallecorsa"
		]
	},
	{
		comune: "Volpe",
		scientifico: "Vulpes vulpes",
		gruppo: "fauna",
		habitat: "Bosco, coltivi, bordi paese",
		foto: "/images/specie/fauna-volpe.jpg",
		comuni: [
			"bassiano",
			"cori",
			"giuliano-di-roma",
			"segni"
		]
	},
	{
		comune: "Vulcano c-bianco",
		scientifico: "Polygonia c-album",
		gruppo: "fauna",
		habitat: "Margini e ortiche",
		foto: "/images/specie/fauna-vulcano_c_bianco.jpg",
		comuni: ["castro-dei-volsci"]
	},
	{
		comune: "Acero di monte",
		scientifico: "Acer opalus",
		gruppo: "flora",
		habitat: "Boschi misti d'altitudine",
		foto: "/images/specie/flora-acero_di_monte.jpg",
		comuni: ["morolo", "vallecorsa"]
	},
	{
		comune: "Agrifoglio",
		scientifico: "Ilex aquifolium",
		gruppo: "flora",
		habitat: "Sottobosco fresco, faggete",
		foto: "/images/specie/flora-agrifoglio.jpg",
		comuni: ["carpineto-romano", "segni"]
	},
	{
		comune: "Anemone appenninico",
		scientifico: "Anemonoides apennina",
		gruppo: "flora",
		habitat: "Bosco, primavera",
		foto: "/images/specie/flora-anemone_appenninico.jpg",
		comuni: ["carpineto-romano", "giuliano-di-roma"]
	},
	{
		comune: "Anemone stellata",
		scientifico: "Anemone hortensis",
		gruppo: "flora",
		habitat: "Prati e garighe, primavera",
		foto: "/images/specie/flora-anemone_stellata.jpg",
		comuni: ["artena", "castro-dei-volsci"]
	},
	{
		comune: "Asaro",
		scientifico: "Asarum europaeum",
		gruppo: "flora",
		habitat: "Sottobosco ombroso",
		foto: "/images/specie/flora-asaro.jpg",
		comuni: ["segni"]
	},
	{
		comune: "Bucaneve",
		scientifico: "Galanthus nivalis",
		gruppo: "flora",
		habitat: "Bosco umido, fine inverno",
		foto: "/images/specie/flora-bucaneve.jpg",
		comuni: ["giuliano-di-roma"]
	},
	{
		comune: "Cappero",
		scientifico: "Capparis spinosa",
		gruppo: "flora",
		habitat: "Mura e rupi calde, Norma e versante pontino",
		foto: "/images/specie/flora-cappero.jpg",
		comuni: ["norma"]
	},
	{
		comune: "Carlina",
		scientifico: "Carlina acanthifolia",
		gruppo: "flora",
		habitat: "Pascoli e garighe",
		foto: "/images/specie/flora-carlina.jpg",
		comuni: ["supino"]
	},
	{
		comune: "Carpino nero",
		scientifico: "Ostrya carpinifolia",
		gruppo: "flora",
		habitat: "Boschi di medio versante",
		foto: "/images/specie/flora-carpino_nero.jpg",
		comuni: ["morolo", "vallecorsa"]
	},
	{
		comune: "Castagno",
		scientifico: "Castanea sativa",
		gruppo: "flora",
		habitat: "Impluvi e versanti, varietà locali",
		foto: "/images/specie/flora-castagno.jpg",
		comuni: [
			"cori",
			"giuliano-di-roma",
			"montelanico",
			"patrica",
			"rocca-massima",
			"roccagorga",
			"roccasecca-dei-volsci",
			"segni"
		]
	},
	{
		comune: "Cefalantera",
		scientifico: "Cephalanthera longifolia",
		gruppo: "flora",
		habitat: "Bosco chiaro, orchidea",
		foto: "/images/specie/flora-cephalanthera.jpg",
		comuni: ["maenza"]
	},
	{
		comune: "Cerro",
		scientifico: "Quercus cerris",
		gruppo: "flora",
		habitat: "Boschi misti, Montelanico e versante interno",
		foto: "/images/specie/flora-cerro.jpg",
		comuni: [
			"cori",
			"sezze",
			"supino",
			"vallecorsa"
		]
	},
	{
		comune: "Ciclamino napoletano",
		scientifico: "Cyclamen hederifolium",
		gruppo: "flora",
		habitat: "Sottobosco, fine estate",
		foto: "/images/specie/flora-ciclamino.jpg",
		comuni: [
			"carpineto-romano",
			"cori",
			"giuliano-di-roma"
		]
	},
	{
		comune: "Ciliegio del Giappone",
		scientifico: "Prunus serrulata",
		gruppo: "flora",
		habitat: "Giardini di Ninfa (coltivata, non spontanea)",
		foto: "/images/specie/flora-ciliegio_del_giappone.jpg",
		comuni: ["sermoneta"]
	},
	{
		comune: "Corbezzolo",
		scientifico: "Arbutus unedo",
		gruppo: "flora",
		habitat: "Macchia mediterranea",
		foto: "/images/specie/flora-corbezzolo.jpg",
		comuni: ["amaseno", "norma"]
	},
	{
		comune: "Erica arborea",
		scientifico: "Erica arborea",
		gruppo: "flora",
		habitat: "Macchia e gariga",
		foto: "/images/specie/flora-erica_arborea.jpg",
		comuni: ["amaseno", "maenza"]
	},
	{
		comune: "Faggio",
		scientifico: "Fagus sylvatica",
		gruppo: "flora",
		habitat: "Faggete d'alta quota, Semprevisa e Lupone",
		foto: "/images/specie/flora-faggio.jpg",
		comuni: [
			"bassiano",
			"carpineto-romano",
			"giuliano-di-roma",
			"gorga",
			"montelanico",
			"morolo",
			"rocca-massima",
			"segni"
		]
	},
	{
		comune: "Farnetto",
		scientifico: "Quercus frainetto",
		gruppo: "flora",
		habitat: "Boschi termofili",
		foto: "/images/specie/flora-farnetto.jpg",
		comuni: ["sezze", "supino"]
	},
	{
		comune: "Farnia",
		scientifico: "Quercus robur",
		gruppo: "flora",
		habitat: "Fondovalle, sporadica",
		comuni: ["sgurgola"]
	},
	{
		comune: "Gigaro",
		scientifico: "Arum italicum",
		gruppo: "flora",
		habitat: "Sottobosco e siepi",
		foto: "/images/specie/flora-gigaro.jpg",
		comuni: ["gorga"]
	},
	{
		comune: "Ginepro",
		scientifico: "Juniperus oxycedrus",
		gruppo: "flora",
		habitat: "Garighe e crinali aridi",
		foto: "/images/specie/flora-ginepro.jpg",
		comuni: ["roccagorga"]
	},
	{
		comune: "Glicine",
		scientifico: "Wisteria sinensis",
		gruppo: "flora",
		habitat: "Giardini di Ninfa (coltivata, non spontanea)",
		foto: "/images/specie/flora-glicine.jpg",
		comuni: ["sermoneta"]
	},
	{
		comune: "Leccio",
		scientifico: "Quercus ilex",
		gruppo: "flora",
		habitat: "Macchia e versanti termofili",
		foto: "/images/specie/flora-leccio.jpg",
		comuni: [
			"bassiano",
			"giuliano-di-roma",
			"norma",
			"roccagorga",
			"roccasecca-dei-volsci",
			"segni",
			"sermoneta",
			"sezze",
			"supino"
		]
	},
	{
		comune: "Lentisco",
		scientifico: "Pistacia lentiscus",
		gruppo: "flora",
		habitat: "Macchia pontina",
		foto: "/images/specie/flora-lentisco.jpg",
		comuni: ["sonnino", "vallecorsa"]
	},
	{
		comune: "Lichene",
		scientifico: "Leptogium brebissonii",
		gruppo: "flora",
		habitat: "Cortecce umide; segnalazione specialistica",
		foto: "/images/specie/flora-lichene.jpg",
		comuni: ["villa-santo-stefano"]
	},
	{
		comune: "Magnolia",
		scientifico: "Magnolia grandiflora",
		gruppo: "flora",
		habitat: "Giardini di Ninfa (coltivata, non spontanea)",
		foto: "/images/specie/flora-magnolia_grandiflora.jpg",
		comuni: ["sermoneta"]
	},
	{
		comune: "Mirto",
		scientifico: "Myrtus communis",
		gruppo: "flora",
		habitat: "Macchia mediterranea",
		foto: "/images/specie/flora-mirto.jpg",
		comuni: ["norma", "vallecorsa"]
	},
	{
		comune: "Nocciolo",
		scientifico: "Corylus avellana",
		gruppo: "flora",
		habitat: "Impluvi e siepi",
		foto: "/images/specie/flora-nocciolo.jpg",
		comuni: ["morolo"]
	},
	{
		comune: "Oleastro",
		scientifico: "Olea europaea var. sylvestris",
		gruppo: "flora",
		habitat: "Macchia e rupi",
		foto: "/images/specie/flora-oleastro.jpg",
		comuni: ["sonnino"]
	},
	{
		comune: "Olivo",
		scientifico: "Olea europaea",
		gruppo: "flora",
		habitat: "Uliveti; cultivar Itrana e Leccino",
		foto: "/images/specie/flora-olivo.jpg",
		comuni: [
			"amaseno",
			"cori",
			"roccagorga"
		]
	},
	{
		comune: "Olmo",
		scientifico: "Ulmus minor",
		gruppo: "flora",
		habitat: "Siepi e fondovalle",
		foto: "/images/specie/flora-olmo.jpg",
		comuni: ["roccasecca-dei-volsci"]
	},
	{
		comune: "Orchidea fior d'ape",
		scientifico: "Ophrys apifera",
		gruppo: "flora",
		habitat: "Prati calcarei, apr–giu",
		foto: "/images/specie/flora-ophrys_apifera.jpg",
		comuni: ["castro-dei-volsci"]
	},
	{
		comune: "Ofride fuchi",
		scientifico: "Ophrys holosericea",
		gruppo: "flora",
		habitat: "Prati e garighe, primavera",
		foto: "/images/specie/flora-ophrys_holosericea.jpg",
		comuni: ["vallecorsa"]
	},
	{
		comune: "Ofride verde-bruna",
		scientifico: "Ophrys sphegodes",
		gruppo: "flora",
		habitat: "Garighe e prati, primavera",
		foto: "/images/specie/flora-orchidea_selvatica.jpg",
		comuni: ["patrica"]
	},
	{
		comune: "Orchidee selvatiche",
		scientifico: "Orchidaceae spp.",
		gruppo: "flora",
		habitat: "Prati, garighe, margini; il Portale originario parlava di ~50 specie",
		foto: "/images/specie/flora-orchidee_selvatiche.jpg",
		comuni: [
			"carpineto-romano",
			"cori",
			"norma",
			"rocca-massima",
			"sermoneta"
		]
	},
	{
		comune: "Orchidee spontanee",
		scientifico: "Orchidaceae spp.",
		gruppo: "flora",
		habitat: "Prati e garighe, feb–ott",
		foto: "/images/specie/flora-orchidee_spontanee.jpg",
		comuni: ["sonnino"]
	},
	{
		comune: "Orchidea maggiore",
		scientifico: "Orchis purpurea",
		gruppo: "flora",
		habitat: "Bosco chiaro e prati, primavera",
		foto: "/images/specie/flora-orchis_purpurea.jpg",
		comuni: ["sgurgola"]
	},
	{
		comune: "Pervinca",
		scientifico: "Vinca minor",
		gruppo: "flora",
		habitat: "Sottobosco",
		foto: "/images/specie/flora-pervinca.jpg",
		comuni: ["giuliano-di-roma"]
	},
	{
		comune: "Polipodio",
		scientifico: "Polypodium vulgare",
		gruppo: "flora",
		habitat: "Rupi ombrose e muri",
		foto: "/images/specie/flora-polipodio.jpg",
		comuni: ["montelanico"]
	},
	{
		comune: "Rosa rampicante",
		scientifico: "Rosa spp.",
		gruppo: "flora",
		habitat: "Giardini di Ninfa (coltivata)",
		foto: "/images/specie/flora-rosa_rampicante.jpg",
		comuni: ["sermoneta"]
	},
	{
		comune: "Roverella",
		scientifico: "Quercus pubescens",
		gruppo: "flora",
		habitat: "Querceti collinari",
		foto: "/images/specie/flora-roverella.jpg",
		comuni: [
			"cori",
			"morolo",
			"norma",
			"sermoneta",
			"vallecorsa"
		]
	},
	{
		comune: "Salvia",
		scientifico: "Salvia officinalis",
		gruppo: "flora",
		habitat: "Garighe montane",
		foto: "/images/specie/flora-salvia.jpg",
		comuni: ["supino"]
	},
	{
		comune: "Sorbo montano",
		scientifico: "Sorbus aria",
		gruppo: "flora",
		habitat: "Crinali e boschi d'altitudine",
		foto: "/images/specie/flora-sorbo_montano.jpg",
		comuni: ["maenza"]
	},
	{
		comune: "Sughera",
		scientifico: "Quercus suber",
		gruppo: "flora",
		habitat: "Sughereta di Fossanova e versante caldo",
		foto: "/images/specie/flora-sughera.jpg",
		comuni: [
			"priverno",
			"sezze",
			"supino"
		]
	},
	{
		comune: "Tasso",
		scientifico: "Taxus baccata",
		gruppo: "flora",
		habitat: "Faggete fresche, esemplari sparsi",
		foto: "/images/specie/flora-tasso_albero.jpg",
		comuni: [
			"carpineto-romano",
			"giuliano-di-roma",
			"gorga",
			"segni"
		]
	},
	{
		comune: "Tiglio",
		scientifico: "Tilia platyphyllos",
		gruppo: "flora",
		habitat: "Impluvi e centri storici",
		foto: "/images/specie/flora-tiglio.jpg",
		comuni: ["morolo"]
	},
	{
		comune: "Vedovina",
		scientifico: "Scabiosa columbaria",
		gruppo: "flora",
		habitat: "Prati aridi",
		foto: "/images/specie/flora-vedovina.jpg",
		comuni: ["montelanico"]
	},
	{
		comune: "Fillirea",
		scientifico: "Phillyrea latifolia",
		gruppo: "flora",
		habitat: "Macchia mediterranea del versante pontino"
	},
	{
		comune: "Alloro",
		scientifico: "Laurus nobilis",
		gruppo: "flora",
		habitat: "Valloni freschi e macchia"
	},
	{
		comune: "Biancone",
		scientifico: "Circaetus gallicus",
		gruppo: "fauna",
		habitat: "Versanti aperti, migratore/estivante"
	}
];
function speciePerComune(slug) {
	return SPECIE.filter((s) => s.comuni?.includes(slug));
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/BrandMark-DvWYTBiH.js
var import_jsx_runtime = require_jsx_runtime();
function BrandMark({ className = "w-11" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 300 150",
		role: "img",
		"aria-label": "Monti Lepini",
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			fill: "#B5713A",
			stroke: "#B5713A",
			strokeWidth: "2.4",
			strokeLinecap: "round",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					fill: "none",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "55",
							y1: "50",
							x2: "112",
							y2: "26"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "112",
							y1: "26",
							x2: "162",
							y2: "60"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "162",
							y1: "60",
							x2: "212",
							y2: "36"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "212",
							y1: "36",
							x2: "258",
							y2: "58"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "38",
							y1: "112",
							x2: "92",
							y2: "98"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "92",
							y1: "98",
							x2: "148",
							y2: "112"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "148",
							y1: "112",
							x2: "202",
							y2: "98"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "202",
							y1: "98",
							x2: "260",
							y2: "112"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "38",
							y1: "112",
							x2: "55",
							y2: "50"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "55",
							y1: "50",
							x2: "92",
							y2: "98"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "92",
							y1: "98",
							x2: "112",
							y2: "26"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "112",
							y1: "26",
							x2: "148",
							y2: "112"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "148",
							y1: "112",
							x2: "162",
							y2: "60"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "162",
							y1: "60",
							x2: "202",
							y2: "98"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "202",
							y1: "98",
							x2: "212",
							y2: "36"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "212",
							y1: "36",
							x2: "260",
							y2: "112"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "258",
							y1: "58",
							x2: "260",
							y2: "112"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "55",
					cy: "50",
					r: "5.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "112",
					cy: "26",
					r: "5.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "162",
					cy: "60",
					r: "5.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "212",
					cy: "36",
					r: "5.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "258",
					cy: "58",
					r: "5.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "38",
					cy: "112",
					r: "5.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "92",
					cy: "98",
					r: "5.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "148",
					cy: "112",
					r: "5.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "202",
					cy: "98",
					r: "5.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "260",
					cy: "112",
					r: "5.4"
				})
			]
		})
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/sentieri-BrvWwKBb.js
var SENTIERI = [
	{
		slug: "semprevisa",
		nome: "Pian della Faggeta – Monte Semprevisa",
		partenza: "Pian della Faggeta (Bassiano / Carpineto)",
		arrivo: "Monte Semprevisa, 1536 m",
		dislivello: "circa 400 m",
		durata: "3–4 h A/R",
		difficolta: "E",
		comuni: ["bassiano", "carpineto-romano"],
		descrizione: "L'itinerario faro del comprensorio. Faggeta, carsismo, vetta. Non sostituisce la carta CAI: è una scheda di orientamento. Segnavia e condizioni da verificare sul campo.",
		fonte: "Carta escursionistica CAI / Compagnia dei Lepini"
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
		descrizione: "Sentiero numerato dalla rete Compagnia dei Lepini. Sale dal versante pontino verso la vetta settentrionale della catena. Bosco, cresta, panorama sul mar Tirreno in giornate terse.",
		fonte: "Compagnia dei Lepini, sentiero 701"
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
		descrizione: "Versante interno. Parte dall'altopiano di Segni, tra faggi e fenomeni carsici, fino al Lupone. Complementare al 701: due salite, una vetta.",
		fonte: "Compagnia dei Lepini, sentiero 702"
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
		descrizione: "Anello dal borgo più alto del versante pontino. Il nome lo dice: è un cammino di panorama, non di vetta. Adatto a chi vuole il crinale senza il Semprevisa.",
		fonte: "Compagnia dei Lepini, sentiero 736"
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
		descrizione: "Non è un sentiero CAI: è un itinerario culturale. Mura poligonali, borgo, poi discesa visiva — e visita a orario — verso Ninfa. Prenotare i giardini a parte.",
		fonte: "Fondazione Caetani / area archeologica di Norba"
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
		descrizione: "Abbazia cistercense, morte di Tommaso d'Aquino (1274), museo. Tappa culturale obbligata, collegabile in giornata con Maenza o Prossedi.",
		fonte: "Soprintendenza / Compagnia dei Lepini"
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
		descrizione: "Cammino in paese tra le mura poligonali volsche. Si combina col 702 se si ha una giornata intera. Portare acqua: poco ombra sulle cortine.",
		fonte: "Comune di Segni / letteratura archeologica"
	},
	{
		slug: "crinale-lento",
		nome: "Tre borghi lenti: Gorga, Montelanico, Bassiano",
		partenza: "Gorga o Montelanico",
		arrivo: "Bassiano",
		dislivello: "collinare",
		durata: "giornata in auto/bici + cammini brevi",
		difficolta: "T",
		comuni: [
			"gorga",
			"montelanico",
			"bassiano"
		],
		descrizione: "Itinerario di attraversamento, non un unico sentiero. Serve a non concentrare tutti i visitatori su Sermoneta. Farinata, borgo rotondo, silenzio d'alta quota.",
		fonte: "Elaborazione Portale (da verificare con CAI locale)"
	}
];
function getSentiero(slug) {
	return SENTIERI.find((s) => s.slug === slug);
}
function sentieriPerComune(slug) {
	return SENTIERI.filter((s) => s.comuni.includes(slug));
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CnNVtgAG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-DlJt528m.css";
var FONT = "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap";
var Route$21 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: SITE.name },
			{
				name: "description",
				content: SITE.description
			},
			{
				name: "theme-color",
				content: "#23211E"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: FONT
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "it",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-navy text-cream",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$17 = () => import("./routes-BedOULdn.mjs");
var Route$20 = createFileRoute("/")({
	head: () => ({ meta: [{ title: `${SITE.name} · 26 borghi` }, {
		name: "description",
		content: SITE.description
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./calendario-BtP67ckO.mjs");
var Route$19 = createFileRoute("/calendario")({
	head: () => ({ meta: [{ title: titleFor("Calendario") }, {
		name: "description",
		content: "Ritmi dell'anno sui Monti Lepini. Le sagre vive restano da Compagnia dei Lepini e dalla DMO."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./cantiere-DdV8UWVE.mjs");
var Route$18 = createFileRoute("/cantiere")({
	head: () => ({ meta: [{ title: titleFor("Cantiere") }, {
		name: "description",
		content: "Basi tecniche e editoriali per il Portale Monti Lepini: dataset, SEO, gap, principi, 90 giorni."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./digitale-CIHhfZVO.mjs");
var Route$17 = createFileRoute("/digitale")({
	head: () => ({ meta: [{ title: "Lepini Digital — Servizi digitali per imprese" }, {
		name: "description",
		content: "Gestionali, automazione e siti per le PMI dei Monti Lepini. Da Montelanico. Senza licenze che scadono."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./imprese-DCo4GkOu.mjs");
var Route$16 = createFileRoute("/imprese")({
	beforeLoad: () => {
		throw redirect({ to: "/digitale" });
	},
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
function lettera(nome) {
	const c = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").charAt(0).toUpperCase();
	return /[A-Z]/.test(c) ? c : "#";
}
var VOCI = (() => {
	const out = [];
	for (const c of COMUNI) {
		out.push({
			id: `comune-${c.slug}`,
			nome: c.nome,
			tipo: "comune",
			slug: c.slug,
			comune: c.nome,
			tab: ""
		});
		const s = SCHEDE[c.slug];
		if (!s) continue;
		for (const p of s.storia.personaggi) out.push({
			id: `p-${c.slug}-${p.nome}`,
			nome: p.nome,
			tipo: "personaggio",
			slug: c.slug,
			comune: c.nome,
			tab: "storia"
		});
		for (const ch of s.arte.chiese) out.push({
			id: `ch-${c.slug}-${ch.nome}`,
			nome: ch.nome,
			tipo: "chiesa",
			slug: c.slug,
			comune: c.nome,
			tab: "arte"
		});
		for (const m of s.arte.monumenti) out.push({
			id: `mo-${c.slug}-${m.nome}`,
			nome: m.nome,
			tipo: "monumento",
			slug: c.slug,
			comune: c.nome,
			tab: "arte"
		});
		for (const f of s.tradizioni.feste) out.push({
			id: `fe-${c.slug}-${f.nome}`,
			nome: f.nome,
			tipo: "festa",
			slug: c.slug,
			comune: c.nome,
			tab: "tradizioni"
		});
		for (const a of s.attivita) out.push({
			id: `at-${c.slug}-${a.nome}`,
			nome: a.nome,
			tipo: "attivita",
			slug: c.slug,
			comune: c.nome,
			tab: "attivita"
		});
	}
	for (const sp of SPECIE) {
		const slug = sp.comuni?.[0] ?? "sermoneta";
		const comune = COMUNI.find((c) => c.slug === slug)?.nome ?? slug;
		out.push({
			id: `sp-${sp.scientifico}-${sp.comune}`,
			nome: sp.comune,
			tipo: sp.gruppo === "flora" ? "flora" : "fauna",
			slug,
			comune,
			tab: "natura"
		});
	}
	out.sort((a, b) => a.nome.localeCompare(b.nome, "it"));
	return out;
})();
function letteraDi(v) {
	return lettera(v.nome);
}
var LETTERE = [...new Set(VOCI.map(letteraDi))].sort();
var $$splitComponentImporter$12 = () => import("./indice-07a_WFvd.mjs");
var Route$15 = createFileRoute("/indice")({
	head: () => ({ meta: [{ title: titleFor("Indice analitico") }, {
		name: "description",
		content: `${VOCI.length} voci — comuni, personaggi, chiese, monumenti, flora e fauna, feste e attività — in ordine alfabetico.`
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./natura-ClgItGk0.mjs");
var Route$14 = createFileRoute("/natura")({
	head: () => ({ meta: [{ title: titleFor("Natura") }, {
		name: "description",
		content: "Flora e fauna dei Monti Lepini: oltre 100 schede con foto recuperate dal Portale originale, binomi e habitat."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
function ComuneCard({ comune }) {
	const foto = fotoComune(comune.slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/comuni/$slug",
		params: { slug: comune.slug },
		className: "group block overflow-hidden rounded-xl bg-navy-card shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-border-hover)]",
		children: [foto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: foto,
			alt: `Veduta di ${comune.nome}`,
			className: "h-40 w-full object-cover",
			loading: "lazy"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-24 items-end bg-navy-deep px-5 py-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.68rem] uppercase tracking-wider text-muted",
				children: "Foto in arrivo"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[0.7rem] uppercase tracking-[0.16em] text-copper-light",
						children: [
							comune.provincia,
							" · ",
							comune.altitudine,
							" m"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 font-display text-2xl text-cream group-hover:text-cream-soft",
						children: comune.nome
					})] }), comune.bandieraArancione ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-copper/50 px-2.5 py-1 text-[0.68rem] uppercase tracking-wider text-copper-light",
						children: "TCI"
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-cream-soft/90",
					children: comune.headline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 flex items-center gap-1.5 text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }),
						comune.abitanti.toLocaleString("it-IT"),
						" abitanti"
					]
				})
			]
		})]
	});
}
function project(c) {
	const minLng = 12.88;
	const minLat = 41.38;
	const x = (c.lng - minLng) / .5699999999999985 * 100;
	const y = (1 - (c.lat - minLat) / .3999999999999986) * 62;
	return {
		x: Math.max(3, Math.min(97, x)),
		y: Math.max(4, Math.min(58, y))
	};
}
function ComuneMap({ active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative aspect-[16/10] overflow-hidden rounded-xl bg-navy-deep shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 100 62",
			className: "h-full w-full",
			role: "img",
			"aria-label": "Mappa schematica dei 26 comuni",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "100",
					height: "62",
					fill: "#17161A"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M8 48 C 18 40, 28 44, 40 38 S 62 28, 78 32 S 94 22, 96 18",
					fill: "none",
					stroke: "#6C7A4B",
					strokeWidth: "0.6",
					opacity: "0.55"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M6 52 C 22 46, 34 50, 50 44 S 74 40, 92 36",
					fill: "none",
					stroke: "#B5713A",
					strokeWidth: "0.4",
					opacity: "0.4"
				}),
				COMUNI.map((c) => {
					const { x, y } = project(c);
					const on = c.slug === active;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `/comuni/${c.slug}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: x,
							cy: y,
							r: on ? 1.7 : c.bandieraArancione ? 1.35 : 1.1,
							fill: on ? "#EDE0C8" : c.bandieraArancione ? "#CE8B4E" : "#8B9A66"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: c.nome })]
					}, c.slug);
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "pointer-events-none absolute bottom-3 left-4 text-[0.7rem] uppercase tracking-[0.14em] text-muted",
			children: "Schema, non carta CAI · rame = Bandiera Arancione"
		})]
	});
}
var EVENTI = [
	{
		id: "ninfa-aperture",
		titolo: "Aperture dei Giardini di Ninfa",
		quando: "Date a calendario Fondazione Caetani",
		mese: 4,
		luogo: "Ninfa, Cisterna / Sermoneta",
		comuneSlug: "sermoneta",
		tipo: "natura",
		nota: "Ingresso su prenotazione. Non è un parco sempre aperto. Verificare il calendario ufficiale prima di ogni uscita."
	},
	{
		id: "carciofo-sezze",
		titolo: "Stagione del carciofo di Sezze",
		quando: "Marzo–maggio",
		mese: 4,
		luogo: "Sezze e campagna pontina",
		comuneSlug: "sezze",
		tipo: "enogastro",
		nota: "Prodotto identitario, non solo sagra. Le date delle sagre variano ogni anno: incrociare col Comune."
	},
	{
		id: "ciliegie-maenza",
		titolo: "Ciliegie di Maenza",
		quando: "Maggio–giugno",
		mese: 5,
		luogo: "Maenza",
		comuneSlug: "maenza",
		tipo: "enogastro",
		nota: "Produzione locale citata da Compagnia dei Lepini. Confermare sagra con Pro Loco."
	},
	{
		id: "farinata",
		titolo: "Farinata di Montelanico",
		quando: "Tradizione autunnale e invernale",
		mese: 11,
		luogo: "Montelanico",
		comuneSlug: "montelanico",
		tipo: "enogastro",
		nota: "Piatto identitario del borgo, non un evento unico. Chiedere in paese, non in una app di booking."
	},
	{
		id: "fossanova-tommaso",
		titolo: "Memoria di Tommaso d'Aquino a Fossanova",
		quando: "7 marzo e calendario abbaziale",
		mese: 3,
		luogo: "Abbazia di Fossanova",
		comuneSlug: "priverno",
		tipo: "cultura",
		nota: "Luogo della morte del santo (1274). Eventi liturgici e culturali da verificare con l'abbazia."
	},
	{
		id: "roccagorga-1913",
		titolo: "Memoria del 6 gennaio 1913",
		quando: "6 gennaio",
		mese: 1,
		luogo: "Roccagorga",
		comuneSlug: "roccagorga",
		tipo: "cultura",
		nota: "Non è una sagra. È memoria civile della strage. Il Portale la tiene perché un territorio non è solo panorama."
	},
	{
		id: "patroni-estate",
		titolo: "Feste patronali estive",
		quando: "Luglio–agosto, paese per paese",
		mese: 8,
		luogo: "Tutti i 26 comuni",
		tipo: "festa",
		nota: "Il calendario vivo sta da Compagnia dei Lepini e dalle Pro Loco. Qui segnaliamo il fenomeno, non fingiamo le date."
	},
	{
		id: "olio-nuovo",
		titolo: "Olio nuovo",
		quando: "Ottobre–novembre",
		mese: 11,
		luogo: "Frantoi di Sezze, Sonnino, Castro dei Volsci, Patrica",
		tipo: "enogastro",
		nota: "Filiera reale del comprensorio. In seguito: mappa frantoi aperti al pubblico, da costruire con le imprese."
	}
];
var PARTNER = [
	{
		nome: "Compagnia dei Lepini",
		ruolo: "Fondazione. Sentieri numerati, eventi, progetti di sviluppo.",
		url: "https://www.compagniadeilepini.it/"
	},
	{
		nome: "DMO Dai Monti Lepini al Mare",
		ruolo: "Destination management. Eventi, operatori, MyBestLazio.",
		url: "https://mybestlazio.it/"
	},
	{
		nome: "XIII Comunità Montana",
		ruolo: "Ente. Bandi, territorio, Ausoni e Lepini insieme.",
		url: "https://www.13cmlepini.it/"
	},
	{
		nome: "VisitLazio",
		ruolo: "Portale regionale. Scheda Monti Lepini da arricchire, non da duplicare.",
		url: "https://www.visitlazio.com/monti-lepini/"
	},
	{
		nome: "Touring Club Italiano",
		ruolo: "Bandiere Arancioni: Sermoneta, Bassiano, Prossedi, Fossanova, Castro dei Volsci.",
		url: "https://www.bandierearancioni.it/"
	}
];
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-cream/10 bg-navy-deep px-5 py-12 md:px-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-5 border-b border-cream/10 pb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { className: "w-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl text-cream",
						children: "Monti Lepini"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm tracking-wide text-copper-light",
						children: "Enciclopedia digitale del comprensorio"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.16em] text-olive-light",
							children: "Il Portale"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 space-y-2 text-sm text-cream-soft",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/cantiere",
									className: "hover:text-cream",
									children: "Cantiere e basi"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/digitale",
									className: "hover:text-cream",
									children: "Lepini Digital"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/lab",
									className: "hover:text-cream",
									children: "Lepini Lab"
								}) })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.16em] text-olive-light",
							children: "Non sostituisce"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2 text-sm text-cream-soft",
							children: PARTNER.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: p.url,
								className: "hover:text-cream",
								rel: "noreferrer",
								children: p.nome
							}) }, p.nome))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Progetto indipendente, senza pubblicità. Dati in costruzione: le popolazioni sono stime da verificare con ISTAT." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3",
								children: "Questo sito non usa cookie di profilazione."
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Montelanico (RM) · 26 comuni · Latina, Roma, Frosinone"
				})
			]
		})
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var NAV = [
	{
		to: "/comuni",
		label: "Comuni"
	},
	{
		to: "/natura",
		label: "Natura"
	},
	{
		to: "/sentieri",
		label: "Sentieri"
	},
	{
		to: "/lab",
		label: "Lab"
	},
	{
		to: "/calendario",
		label: "Calendario"
	},
	{
		to: "/digitale",
		label: "Digital"
	}
];
function SiteHeader({ overlay = false }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("z-20 flex items-center justify-between gap-4 px-5 py-5 md:px-12", overlay ? "absolute inset-x-0 top-0" : "relative bg-navy-deep/80 border-b border-cream/10"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-3 text-cream",
				"aria-label": "Home Portale Monti Lepini",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { className: "w-12" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex flex-col leading-tight font-display",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xl tracking-wide",
						children: "Monti Lepini"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-sans text-[0.62rem] uppercase tracking-[0.16em] text-copper-light",
						children: "Portale del comprensorio"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "hidden items-center gap-7 text-[1.02rem] lg:flex",
				"aria-label": "Principale",
				children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					className: "text-cream/90 hover:text-cream",
					activeProps: { className: "text-cream border-b border-copper pb-0.5" },
					children: item.label
				}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/cantiere",
					className: "rounded-full border border-olive-light/50 px-4 py-2 text-sm text-olive-light hover:bg-olive/15",
					children: "Cantiere"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "inline-flex size-11 items-center justify-center rounded-full border border-cream/20 text-cream lg:hidden",
				"aria-expanded": open,
				"aria-controls": "mobile-nav",
				onClick: () => setOpen((v) => !v),
				children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Menu"
				})]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "mobile-nav",
				className: "absolute inset-x-0 top-full border-b border-cream/10 bg-navy-deep/98 px-5 py-6 lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-col gap-1",
					"aria-label": "Mobile",
					children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "min-h-11 px-2 py-2 text-lg text-cream",
						onClick: () => setOpen(false),
						children: item.label
					}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cantiere",
						className: "min-h-11 px-2 py-2 text-olive-light",
						onClick: () => setOpen(false),
						children: "Cantiere"
					})]
				})
			}) : null
		]
	});
}
function SiteShell({ children, overlayHeader = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-navy text-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#contenuto",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-cream focus:px-4 focus:py-2 focus:text-navy-deep",
				children: "Salta al contenuto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { overlay: overlayHeader }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "contenuto",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
var Route$13 = createFileRoute("/comuni/")({
	head: () => ({ meta: [{ title: titleFor("I 26 comuni") }, {
		name: "description",
		content: "Schede dei 26 comuni dei Monti Lepini: Latina, Roma e Frosinone. Altitudine, patrono, tag, Bandiere Arancioni."
	}] }),
	component: ComuniIndex
});
function ComuniIndex() {
	const [q, setQ] = (0, import_react.useState)("");
	const [prov, setProv] = (0, import_react.useState)("tutti");
	const [tci, setTci] = (0, import_react.useState)(false);
	const list = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		return COMUNI.filter((c) => {
			if (prov !== "tutti" && c.provincia !== prov) return false;
			if (tci && !c.bandieraArancione) return false;
			if (!needle) return true;
			return c.nome.toLowerCase().includes(needle) || c.headline.toLowerCase().includes(needle) || c.tag.some((t) => t.includes(needle));
		});
	}, [
		q,
		prov,
		tci
	]);
	const byP = comuniByProvincia();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-12 md:px-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.75rem] uppercase tracking-[0.2em] text-copper-light",
				children: "Comuni"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl text-cream",
				children: "I 26, in una griglia"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 max-w-2xl text-cream-soft",
				children: [
					"Latina ",
					byP.Latina.length,
					", Roma ",
					byP.Roma.length,
					", Frosinone ",
					byP.Frosinone.length,
					". Non tutti sono Bandiere Arancioni: il filtro TCI esiste perché il Touring ha già scelto, non perché gli altri non contino."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComuneMap, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-4 rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]",
					onSubmit: (e) => e.preventDefault(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm text-muted",
							children: ["Cerca", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Nome, tag, headline",
								className: "mt-2 min-h-11 w-full rounded-lg border border-cream/15 bg-navy-deep px-3 text-cream placeholder:text-muted"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-sm text-muted",
							children: "Provincia"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: [
								"tutti",
								"Latina",
								"Roma",
								"Frosinone"
							].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setProv(p),
								className: `min-h-10 rounded-full px-4 text-sm ${prov === p ? "bg-cream text-navy-deep" : "border border-cream/20 text-cream"}`,
								children: p === "tutti" ? "Tutti" : p
							}, p))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-11 items-center gap-2 text-sm text-cream-soft",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: tci,
								onChange: (e) => setTci(e.target.checked),
								className: "size-4"
							}), "Solo Bandiere Arancioni TCI"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted tabular-nums",
							children: [list.length, " comuni"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComuneCard, { comune: c }, c.slug))
			}),
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-muted",
				children: "Nessun comune con questi filtri."
			}) : null
		]
	}) });
}
var $$splitNotFoundComponentImporter$1 = () => import("../_slug-BBI0SbPh.mjs");
var $$splitComponentImporter$10 = () => import("../_slug-C06Pp8ps.mjs");
var Route$12 = createFileRoute("/comuni/$slug")({
	loader: ({ params }) => {
		const comune = getComune(params.slug);
		if (!comune) throw notFound();
		return {
			comune,
			scheda: getScheda(comune.slug)
		};
	},
	head: ({ loaderData }) => {
		const nome = loaderData?.comune.nome ?? "Comune";
		const desc = loaderData?.comune.sommario ?? "";
		return { meta: [{ title: titleFor(nome) }, {
			name: "description",
			content: desc
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent")
});
var Route$11 = createFileRoute("/esperienze/")({
	head: () => ({ meta: [{ title: titleFor("Esperienze") }, {
		name: "description",
		content: "Timeline, calendario stagionale e planner del Portale Monti Lepini."
	}] }),
	component: EsperienzeIndex
});
var ITEMS = [
	{
		to: "/esperienze/timeline",
		icon: History,
		title: "Timeline",
		text: "Tre millenni in sette lastre: Volsci, Roma, abbazie, briganti, 1913, oggi."
	},
	{
		to: "/esperienze/calendario",
		icon: CalendarRange,
		title: "Calendario stagionale",
		text: "Cosa fiorisce, cosa si raccoglie, dove camminare, mese per mese."
	},
	{
		to: "/esperienze/planner",
		icon: Footprints,
		title: "Planner",
		text: "Uno, due o tre giorni. Natura, borghi, tavola, archeologia. Un itinerario dal dataset, non da un catalogo turistico."
	}
];
function EsperienzeIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-12 md:px-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.75rem] uppercase tracking-[0.2em] text-copper-light",
				children: "Esperienze"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl",
				children: "Strumenti, non pagine"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 max-w-2xl text-cream-soft",
				children: [
					"Timeline, calendario e planner restano qui, sul dato. Il 3D sta in",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/lab",
						className: "text-olive-light",
						children: "Lepini Lab"
					}),
					": volo, faggeta, biosfera."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-5 md:grid-cols-3",
				children: ITEMS.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: i.to,
					className: "rounded-xl bg-navy-card p-6 shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i.icon, { className: "size-6 text-copper" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-2xl",
							children: i.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: i.text
						})
					]
				}, i.title))
			})
		]
	}) });
}
var $$splitComponentImporter$9 = () => import("./calendario-OdxJLK86.mjs");
var Route$10 = createFileRoute("/esperienze/calendario")({
	head: () => ({ meta: [{ title: titleFor("Calendario stagionale") }, {
		name: "description",
		content: "Fioriture, raccolti e uscite sui Monti Lepini, mese per mese."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./planner-Bvi_BeFb.mjs");
var Route$9 = createFileRoute("/esperienze/planner")({
	head: () => ({ meta: [{ title: titleFor("Planner") }, {
		name: "description",
		content: "Costruisci un itinerario di 1-3 giorni sui Monti Lepini a partire dal dataset."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./timeline-DFRD6oiK.mjs");
var Route$8 = createFileRoute("/esperienze/timeline")({
	head: () => ({ meta: [{ title: titleFor("Timeline") }, {
		name: "description",
		content: "3000 anni di storia dei Monti Lepini, dai Volsci al portale digitale."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./lab-DfEjyFP2.mjs");
var Route$7 = createFileRoute("/lab/")({
	head: () => ({ meta: [{ title: titleFor("Lepini Lab") }, {
		name: "description",
		content: "Laboratorio digitale dei Monti Lepini: volo 3D sul crinale, faggeta in prima persona, biosfera delle specie."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./atlante-DTjlt6Bi.mjs");
var Route$6 = createFileRoute("/lab/atlante")({
	head: () => ({ meta: [{ title: titleFor("Lab · Atlante") }, {
		name: "description",
		content: "Atlante 3D dei 26 comuni dei Monti Lepini. Ogni nodo è una scheda del Portale."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./biosfera-phrA2ffY.mjs");
var Route$5 = createFileRoute("/lab/biosfera")({
	head: () => ({ meta: [{ title: titleFor("Lab · Biosfera") }, {
		name: "description",
		content: "Flora e fauna dei Monti Lepini in un campo 3D. Le schede sono le stesse del Portale."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./faggeta-D3-mDJsZ.mjs");
var Route$4 = createFileRoute("/lab/faggeta")({
	head: () => ({ meta: [{ title: titleFor("Lab · Faggeta") }, {
		name: "description",
		content: "Cammino in prima persona nella faggeta dei Monti Lepini."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./sentieri-jB3l2jn3.mjs");
var Route$3 = createFileRoute("/lab/sentieri")({
	head: () => ({ meta: [{ title: titleFor("Lab · Sentieri 3D") }, {
		name: "description",
		content: "Modellazione 3D schematica dei sentieri dei Monti Lepini. Tubi drappeggiati sul crinale, non GPX CAI."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./volo-CKbjC2IE.mjs");
var Route$2 = createFileRoute("/lab/volo")({
	head: () => ({ meta: [{ title: titleFor("Lab · Volo") }, {
		name: "description",
		content: "Volo 3D sul crinale dei Monti Lepini. WASD, 26 comuni come nodi-scheda."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var Route$1 = createFileRoute("/sentieri/")({
	head: () => ({ meta: [{ title: titleFor("Sentieri") }, {
		name: "description",
		content: "Itinerari dei Monti Lepini con codice CAI quando esiste una fonte. Semprevisa, Lupone, Fossanova."
	}] }),
	component: SentieriIndex
});
function SentieriIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-12 md:px-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.75rem] uppercase tracking-[0.2em] text-copper-light",
				children: "Sentieri"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl",
				children: "Camminare con una fonte"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 max-w-2xl text-cream-soft",
				children: [
					"Compagnia dei Lepini ha già i PDF dei sentieri numerati. Qui non si ricopia la carta: si dà una scheda orientativa e si rimanda alla fonte. Nessun GPX inventato.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/lab/sentieri",
						className: "text-olive-light",
						children: "Sul crinale c'è un modello 3D schematico"
					}),
					" ",
					"delle stesse schede."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 md:grid-cols-2",
				children: SENTIERI.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/sentieri/$slug",
					params: { slug: s.slug },
					className: "rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)] transition-transform hover:-translate-y-0.5",
					children: [
						s.codice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-copper-light",
							children: s.codice
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider text-muted",
							children: "Itinerario"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl text-cream",
							children: s.nome
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-cream-soft",
							children: [
								s.partenza,
								" → ",
								s.arrivo
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-muted",
							children: [
								s.difficolta,
								" · ",
								s.durata,
								" · ",
								s.dislivello
							]
						})
					]
				}, s.slug))
			})
		]
	}) });
}
var $$splitNotFoundComponentImporter = () => import("../_slug-C4dbChvN.mjs");
var $$splitComponentImporter = () => import("../_slug-Bw31xu_H.mjs");
var Route = createFileRoute("/sentieri/$slug")({
	loader: ({ params }) => {
		const sentiero = getSentiero(params.slug);
		if (!sentiero) throw notFound();
		return { sentiero };
	},
	head: ({ loaderData }) => {
		const nome = loaderData?.sentiero.nome ?? "Sentiero";
		const desc = loaderData?.sentiero.descrizione ?? "";
		return { meta: [{ title: titleFor(nome) }, {
			name: "description",
			content: desc
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var IndexRoute = Route$20.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$21
});
var CalendarioRoute = Route$19.update({
	id: "/calendario",
	path: "/calendario",
	getParentRoute: () => Route$21
});
var CantiereRoute = Route$18.update({
	id: "/cantiere",
	path: "/cantiere",
	getParentRoute: () => Route$21
});
var DigitaleRoute = Route$17.update({
	id: "/digitale",
	path: "/digitale",
	getParentRoute: () => Route$21
});
var ImpreseRoute = Route$16.update({
	id: "/imprese",
	path: "/imprese",
	getParentRoute: () => Route$21
});
var IndiceRoute = Route$15.update({
	id: "/indice",
	path: "/indice",
	getParentRoute: () => Route$21
});
var NaturaRoute = Route$14.update({
	id: "/natura",
	path: "/natura",
	getParentRoute: () => Route$21
});
var ComuniIndexRoute = Route$13.update({
	id: "/comuni/",
	path: "/comuni/",
	getParentRoute: () => Route$21
});
var ComuniSlugRoute = Route$12.update({
	id: "/comuni/$slug",
	path: "/comuni/$slug",
	getParentRoute: () => Route$21
});
var EsperienzeIndexRoute = Route$11.update({
	id: "/esperienze/",
	path: "/esperienze/",
	getParentRoute: () => Route$21
});
var EsperienzeCalendarioRoute = Route$10.update({
	id: "/esperienze/calendario",
	path: "/esperienze/calendario",
	getParentRoute: () => Route$21
});
var EsperienzePlannerRoute = Route$9.update({
	id: "/esperienze/planner",
	path: "/esperienze/planner",
	getParentRoute: () => Route$21
});
var EsperienzeTimelineRoute = Route$8.update({
	id: "/esperienze/timeline",
	path: "/esperienze/timeline",
	getParentRoute: () => Route$21
});
var LabIndexRoute = Route$7.update({
	id: "/lab/",
	path: "/lab/",
	getParentRoute: () => Route$21
});
var LabAtlanteRoute = Route$6.update({
	id: "/lab/atlante",
	path: "/lab/atlante",
	getParentRoute: () => Route$21
});
var LabBiosferaRoute = Route$5.update({
	id: "/lab/biosfera",
	path: "/lab/biosfera",
	getParentRoute: () => Route$21
});
var LabFaggetaRoute = Route$4.update({
	id: "/lab/faggeta",
	path: "/lab/faggeta",
	getParentRoute: () => Route$21
});
var LabSentieriRoute = Route$3.update({
	id: "/lab/sentieri",
	path: "/lab/sentieri",
	getParentRoute: () => Route$21
});
var LabVoloRoute = Route$2.update({
	id: "/lab/volo",
	path: "/lab/volo",
	getParentRoute: () => Route$21
});
var SentieriIndexRoute = Route$1.update({
	id: "/sentieri/",
	path: "/sentieri/",
	getParentRoute: () => Route$21
});
var rootRouteChildren = {
	IndexRoute,
	CalendarioRoute,
	CantiereRoute,
	DigitaleRoute,
	ImpreseRoute,
	IndiceRoute,
	NaturaRoute,
	ComuniSlugRoute,
	EsperienzeCalendarioRoute,
	EsperienzePlannerRoute,
	EsperienzeTimelineRoute,
	LabAtlanteRoute,
	LabBiosferaRoute,
	LabFaggetaRoute,
	LabSentieriRoute,
	LabVoloRoute,
	SentieriSlugRoute: Route.update({
		id: "/sentieri/$slug",
		path: "/sentieri/$slug",
		getParentRoute: () => Route$21
	}),
	ComuniIndexRoute,
	EsperienzeIndexRoute,
	LabIndexRoute,
	SentieriIndexRoute
};
var routeTree = Route$21._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { SITE as C, getComune as S, speciePerComune as _, cn as a, STATS as b, LETTERE as c, SENTIERI as d, sentieriPerComune as f, specieId as g, notaSpecie as h, SiteShell as i, VOCI as l, SPECIE as m, Route as n, EVENTI as o, BrandMark as p, Route$12 as r, ComuneMap as s, router_exports as t, letteraDi as u, tabFromHash as v, fotoComune as x, COMUNI as y };
