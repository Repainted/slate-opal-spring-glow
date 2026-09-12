import { B as require_jsx_runtime, _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as getComune, i as SiteShell } from "./router-CnNVtgAG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/timeline-DFRD6oiK.js
var import_jsx_runtime = require_jsx_runtime();
var ERE = [
	{
		da: -1e3,
		a: -350,
		titolo: "Volsci e città di pietra",
		testo: "Prima di Roma il crinale è volsco. Signia (Segni), Cora (Cori), Setia (Sezze), Norba. Mura poligonali che sono ancora il fatto visibile più antico del Portale.",
		luoghi: [
			"segni",
			"cori",
			"sezze",
			"norma"
		]
	},
	{
		da: -350,
		a: 400,
		titolo: "Roma, colonie, templi",
		testo: "Le città lepini entrano nell'orbita romana. Templi a Cori, colonia a Norba, Setia sul vino. La piana sotto è palude: i borghi restano alti per secoli.",
		luoghi: [
			"cori",
			"norma",
			"sezze"
		]
	},
	{
		da: 400,
		a: 1300,
		titolo: "Incastellamento e abbazie",
		testo: "Il medioevo ricuce il crinale a feudi e monasteri. Caetani a Sermoneta, cistercensi a Fossanova e Valvisciolo. Nel 1274 Tommaso d'Aquino muore a Fossanova.",
		luoghi: [
			"sermoneta",
			"priverno",
			"bassiano"
		]
	},
	{
		da: 1300,
		a: 1800,
		titolo: "Feudi, ulivi, distanze",
		testo: "I borghi restano comunità agricole. La piana è ancora malarica. Il digitale di oggi arriva in un territorio che per secoli ha lavorato in isolamenti voluti dalla geografia.",
		luoghi: [
			"maenza",
			"montelanico",
			"gorga"
		]
	},
	{
		da: 1800,
		a: 1870,
		titolo: "Briganti e confine",
		testo: "Sonnino e il mito di Fra' Diavolo. Il crinale è frontiera, non panorama. Questa memoria va tenuta accanto ai castelli, non nascosta.",
		luoghi: ["sonnino"]
	},
	{
		da: 1870,
		a: 1950,
		titolo: "Leone XIII, strage, bonifica",
		testo: "Carpineto dà un papa (Leone XIII, 1810–1903). Roccagorga, 6 gennaio 1913: la truppa spara sulla folla. Poi la bonifica pontina cambia per sempre il rapporto tra montagna e piana.",
		luoghi: [
			"carpineto-romano",
			"roccagorga",
			"sezze"
		]
	},
	{
		da: 1950,
		a: 2026,
		titolo: "Spopolamento e racconto digitale",
		testo: "Gorga e Prossedi sotto i mille abitanti. I cataloghi nazionali prendono Sermoneta e lasciano il resto. Questo Portale esiste per tenere insieme i 26, senza fingere che siano tutti Bandiere Arancioni.",
		luoghi: [
			"gorga",
			"prossedi",
			"montelanico"
		]
	}
];
function label(n) {
	if (n < 0) return `${Math.abs(n)} a.C.`;
	return String(n);
}
function TimelinePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-5 py-12 md:px-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.75rem] uppercase tracking-[0.2em] text-copper-light",
				children: "Esperienze"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl",
				children: "Timeline"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-cream-soft",
				children: "Sette lastre. Ogni era rimanda ai comuni che la tengono in piedi oggi."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-12 space-y-0",
				children: ERE.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative border-l border-copper/50 pl-8 pb-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-1.5 top-1 size-3 rounded-full bg-copper" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs tabular-nums text-copper-light",
							children: [
								label(e.da),
								" — ",
								label(e.a)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl",
							children: e.titolo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-cream-soft",
							children: e.testo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: e.luoghi.map((slug) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/comuni/$slug",
								params: { slug },
								className: "rounded-full border border-cream/15 px-3 py-1 text-sm text-olive-light",
								children: getComune(slug)?.nome ?? slug
							}, slug))
						}),
						i === ERE.length - 1 ? null : null
					]
				}, e.titolo))
			})
		]
	}) });
}
//#endregion
export { TimelinePage as component };
