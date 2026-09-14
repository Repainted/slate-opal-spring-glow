import { B as require_jsx_runtime, _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { w as specieId } from "./router-BrXJn1Al.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Schede-ChiCXenD.js
var import_jsx_runtime = require_jsx_runtime();
function SchedaComune({ c }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "pointer-events-auto max-w-sm rounded-xl border border-cream/15 bg-navy-deep/90 p-5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[0.68rem] uppercase tracking-[0.16em] text-copper-light",
				children: [
					c.provincia,
					" · ",
					c.altitudine,
					" m",
					c.bandieraArancione ? " · TCI" : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-2xl text-cream",
				children: c.nome
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-cream-soft",
				children: c.headline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted",
				children: c.daVedere.slice(0, 3).join(" · ")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/comuni/$slug",
				params: { slug: c.slug },
				className: "mt-4 inline-flex min-h-11 items-center text-sm text-olive-light hover:text-cream",
				children: "Apri la scheda completa"
			})
		]
	});
}
function SchedaSpecie({ s }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "pointer-events-auto max-w-sm overflow-hidden rounded-xl border border-cream/15 bg-navy-deep/90",
		children: [s.foto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: s.foto,
			alt: s.comune,
			className: "h-36 w-full object-cover"
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[0.68rem] uppercase tracking-[0.16em] text-copper-light",
					children: s.gruppo
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl text-cream",
					children: s.comune
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-sm italic text-olive-light",
					children: s.scientifico
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-cream-soft",
					children: s.habitat
				}),
				s.periodo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: s.periodo
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/natura",
					hash: specieId(s),
					className: "mt-4 inline-flex min-h-11 items-center text-sm text-olive-light hover:text-cream",
					children: "Scheda nel Portale"
				})
			]
		})]
	});
}
function SchedaSentiero({ s }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "pointer-events-auto max-w-sm rounded-xl border border-cream/15 bg-navy-deep/90 p-5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[0.68rem] uppercase tracking-[0.16em] text-copper-light",
				children: [
					s.codice ?? "Itinerario",
					" · ",
					s.difficolta,
					" · ",
					s.durata
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-2xl text-cream",
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted",
				children: s.fonte
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/sentieri/$slug",
				params: { slug: s.slug },
				className: "mt-4 inline-flex min-h-11 items-center text-sm text-olive-light hover:text-cream",
				children: "Scheda nel Portale"
			})
		]
	});
}
//#endregion
export { SchedaSentiero as n, SchedaSpecie as r, SchedaComune as t };
