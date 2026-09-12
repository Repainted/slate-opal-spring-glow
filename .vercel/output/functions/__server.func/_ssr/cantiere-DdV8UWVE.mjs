import { B as require_jsx_runtime, _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as SENTIERI, i as SiteShell, m as SPECIE, o as EVENTI, y as COMUNI } from "./router-CnNVtgAG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cantiere-DdV8UWVE.js
var import_jsx_runtime = require_jsx_runtime();
var CANTIERE_TECH = [
	{
		voce: "Dati strutturati (26 comuni, sentieri, specie, eventi)",
		stato: "fatto",
		nota: "JSON TypeScript, una fonte, niente copia-incolla in pagina."
	},
	{
		voce: "Schede comune con slug stabile",
		stato: "fatto",
		nota: "URL /comuni/montelanico pronto per montilepini.it."
	},
	{
		voce: "SEO on-page: title, description, JSON-LD",
		stato: "base",
		nota: "Ogni scheda ha meta e TouristDestination. Manca canonical sul dominio vero."
	},
	{
		voce: "Mappa schematica del comprensorio",
		stato: "fatto",
		nota: "Proiezione lat/lng, non una cartografia CAI."
	},
	{
		voce: "Meteo Open-Meteo sul centro catena",
		stato: "fatto",
		nota: "Senza chiave, senza tracking. Fallback se la rete manca."
	},
	{
		voce: "Mobile, contrasto, reduced-motion, skip-link",
		stato: "base",
		nota: "Da verificare in campo; target 44px."
	},
	{
		voce: "Niente cookie di profilazione",
		stato: "fatto",
		nota: "Allineato al claim del .com."
	},
	{
		voce: "Dominio montilepini.it + lepinidigital.it",
		stato: "manca",
		nota: "Oggi si pubblica su questo preview. I DNS vanno registrati."
	},
	{
		voce: "Foto originali, peso < 120 KB, alt veri",
		stato: "base",
		nota: "23/26 comuni e 119 schede specie ripresi dal Portale originale, compressi. Mancano Giuliano, Sgurgola, Villa S. Stefano. Non è ancora un archivio fotografico proprio."
	},
	{
		voce: "GPX dei sentieri",
		stato: "manca",
		nota: "Non si inventano tracciati. In Lab c'è un modello schematico drappeggiato; il GPX va chiesto a CAI / Compagnia."
	},
	{
		voce: "Calendario eventi in tempo reale",
		stato: "manca",
		nota: "Strato DMO / Compagnia, non da duplicare a mano."
	},
	{
		voce: "Inglese",
		stato: "manca",
		nota: "VisitLazio ce l'ha. In campagna vale 4.000 €: farlo dopo il dominio."
	},
	{
		voce: "Lepini Lab 3D (volo, faggeta, biosfera)",
		stato: "fatto",
		nota: "WebGL, shader crepuscolare, 26 nodi, WASD, reduced-motion. Non è un parco-gioco: è il laboratorio."
	},
	{
		voce: "Pagina Lepini Digital (B2B)",
		stato: "fatto",
		nota: "Landing gestionali / automazione / siti. Mail dal .com. Niente P.IVA inventata."
	}
];
var CANTIERE_CONTENUTI = [
	{
		voce: "Non livellare i 26 comuni",
		stato: "fatto",
		nota: "Sermoneta è Bandiera Arancione; Gorga è un osservatorio. Il testo lo dice."
	},
	{
		voce: "Nomi scientifici in natura",
		stato: "base",
		nota: "Oltre 120 schede con foto dal Portale originale. Non è ancora la lista firmata delle ~50 orchidee / 168 uccelli."
	},
	{
		voce: "Sentieri con codice CAI vero",
		stato: "base",
		nota: "701, 702, 736 da Compagnia. Gli altri sono itinerari, non numeri inventati."
	},
	{
		voce: "Fonti in chiaro",
		stato: "fatto",
		nota: "Ogni sentiero e ogni evento ha una nota di verifica."
	},
	{
		voce: "Memoria civile (Roccagorga 1913)",
		stato: "fatto",
		nota: "Un portale territoriale non è solo turismo."
	},
	{
		voce: "Dove dormire / frantoi / agriturismi",
		stato: "manca",
		nota: "Va costruito con DMO e imprese, scheda per scheda, consenso alla pubblicazione."
	},
	{
		voce: "Popolazione ISTAT aggiornata",
		stato: "manca",
		nota: "Oggi stime da schede esistenti. Sostituire con dato anno."
	},
	{
		voce: "Partnership, non concorrenza",
		stato: "base",
		nota: "Pagina Imprese e footer linkano Compagnia, DMO, CM, VisitLazio, TCI."
	}
];
var PRINCIPI = [
	"Un comune, uno slug, un oggetto. Niente pagine generate da un testo unico.",
	"Non si inventano numeri CAI, date di sagre, P.IVA, orchidee specie per specie.",
	"Il Portale è lo strato dati. Eventi e booking restano a chi già li fa.",
	"I sette borghi da cartolina non rappresentano i 26. Il dataset è il manifesto.",
	"Fotografie originali quando ci sono; fino ad allora niente Wikimedia da 600 KB.",
	"Italiano prima. Inglese dopo il dominio."
];
function badge(stato) {
	if (stato === "fatto") return "text-olive-light border-olive-light/40";
	if (stato === "base") return "text-copper-light border-copper/40";
	return "text-muted border-cream/15";
}
function CantierePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-5 py-12 md:px-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.75rem] uppercase tracking-[0.2em] text-copper-light",
				children: "Cantiere"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl",
				children: "Basi, non un restyling"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg leading-relaxed text-cream-soft",
				children: "Il beta su Netlify era già un prodotto. Mancava il mestiere da portale italiano: dati con fonte, sentieri veri, SEO, partnership, un dominio. Questo prototipo è quella impalcatura. Si clicca. Si misura. Si sostituisce un campo alla volta."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					[COMUNI.length, "comuni"],
					[SENTIERI.length, "sentieri"],
					[SPECIE.length, "schede natura"],
					[EVENTI.length, "ritmi anno"]
				].map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-navy-card p-4 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl tabular-nums",
						children: n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: l
					})]
				}, String(l)))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 font-display text-3xl",
				children: "Principi editoriali"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-4 list-decimal space-y-3 pl-5 text-cream-soft",
				children: PRINCIPI.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: p }, p))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 font-display text-3xl",
				children: "Tecnica"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-3",
				children: CANTIERE_TECH.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl bg-navy-card p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-cream",
							children: row.voce
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `rounded-full border px-2.5 py-0.5 text-[0.68rem] uppercase tracking-wider ${badge(row.stato)}`,
							children: row.stato
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: row.nota
					})]
				}, row.voce))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 font-display text-3xl",
				children: "Contenuti"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-3",
				children: CANTIERE_CONTENUTI.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl bg-navy-card p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-cream",
							children: row.voce
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `rounded-full border px-2.5 py-0.5 text-[0.68rem] uppercase tracking-wider ${badge(row.stato)}`,
							children: row.stato
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: row.nota
					})]
				}, row.voce))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 font-display text-3xl",
				children: "Novanta giorni"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-4 space-y-4 text-cream-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-copper-light",
						children: "Mese 1."
					}), " Dominio, recapito unico, P.IVA in footer, ISTAT al posto delle stime, GPX solo se Compagnia o CAI li cedono."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-copper-light",
						children: "Mese 2."
					}), " Quattro campagne fotografiche le abbiamo in campagna: prima una, fatta bene, su tre comuni. Schede imprese con consenso."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-copper-light",
						children: "Mese 3."
					}), " Link reciproci con DMO e Compagnia. Inglese della home e delle 5 Bandiere Arancioni. Poi si ricollega il 3D di Lab."] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-10 text-sm text-muted",
				children: [
					"Prova subito",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/comuni/$slug",
						params: { slug: "montelanico" },
						className: "text-olive-light",
						children: "Montelanico"
					}),
					", il",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/sentieri/$slug",
						params: { slug: "cai-701" },
						className: "text-olive-light",
						children: "CAI 701"
					}),
					" ",
					"e il",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/esperienze/planner",
						className: "text-olive-light",
						children: "planner"
					}),
					"."
				]
			})
		]
	}) });
}
//#endregion
export { CantierePage as component };
