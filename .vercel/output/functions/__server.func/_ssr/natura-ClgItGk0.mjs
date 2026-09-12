import { i as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, _ as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as STATS, g as specieId, i as SiteShell, m as SPECIE } from "./router-CnNVtgAG.mjs";
import { t as HABITAT } from "./natura-CmdnX4mO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/natura-ClgItGk0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NaturaPage() {
	const [filtro, setFiltro] = (0, import_react.useState)("tutte");
	const list = (0, import_react.useMemo)(() => {
		return SPECIE.filter((s) => {
			if (filtro === "flora") return s.gruppo === "flora";
			if (filtro === "fauna") return s.gruppo === "fauna";
			if (filtro === "orchidee") return /orchid|ophrys|orchis|cephalanthera/i.test(s.scientifico + s.comune);
			return true;
		});
	}, [filtro]);
	const nFoto = SPECIE.filter((s) => s.foto).length;
	const nFauna = SPECIE.filter((s) => s.gruppo === "fauna").length;
	const nFlora = SPECIE.filter((s) => s.gruppo === "flora").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-12 md:px-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.75rem] uppercase tracking-[0.2em] text-copper-light",
				children: "Natura"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl text-cream",
				children: "Il schedario vivo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 max-w-2xl text-cream-soft",
				children: [
					"Recuperato dal Portale originale: ",
					nFlora,
					" schede di flora, ",
					nFauna,
					" di fauna, ",
					nFoto,
					" con fotografia. Non è la lista completa delle «168 specie di uccelli» né delle «~50 orchidee»: è tutto ciò che il sito aveva già nominato e illustrato. Le coltivate di Ninfa restano segnate come tali."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: [
					"Vetta ",
					STATS.vetta,
					" m · ",
					STATS.vettaNome,
					". In Lab la biosfera usa le stesse schede."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 md:grid-cols-2",
				children: HABITAT.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-navy-card p-6 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-cream",
						children: h.titolo
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 leading-relaxed text-cream-soft",
						children: h.testo
					})]
				}, h.titolo))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 flex flex-wrap gap-2",
				children: [
					["tutte", "Tutte"],
					["flora", "Flora"],
					["fauna", "Fauna"],
					["orchidee", "Orchidee"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFiltro(id),
					className: filtro === id ? "rounded-full bg-copper px-4 py-2 text-sm text-cream" : "rounded-full border border-cream/20 px-4 py-2 text-sm text-cream-soft",
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: list.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					id: specieId(s),
					className: "scroll-mt-24 overflow-hidden rounded-xl bg-navy-card shadow-[var(--shadow-border)]",
					children: [s.foto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: s.foto,
						alt: s.comune,
						className: "h-44 w-full object-cover",
						loading: "lazy"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 bg-navy-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[0.65rem] uppercase tracking-wider text-copper-light",
								children: s.gruppo
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-display text-xl text-cream",
								children: s.comune
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs italic text-olive-light",
								children: s.scientifico
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-cream-soft",
								children: s.habitat
							}),
							s.comuni && s.comuni.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 flex flex-wrap gap-2",
								children: s.comuni.slice(0, 4).map((slug) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/comuni/$slug",
									params: { slug },
									className: "text-xs text-olive-light",
									children: slug.replace(/-/g, " ")
								}, slug))
							}) : null
						]
					})]
				}, specieId(s)))
			})
		]
	}) });
}
//#endregion
export { NaturaPage as component };
