import { i as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, _ as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as LETTERE, i as SiteShell, l as VOCI, u as letteraDi } from "./router-CnNVtgAG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/indice-07a_WFvd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTRI = [
	{
		id: "tutte",
		label: "Tutte"
	},
	{
		id: "comune",
		label: "Comuni"
	},
	{
		id: "personaggio",
		label: "Personaggi"
	},
	{
		id: "chiesa",
		label: "Chiese"
	},
	{
		id: "monumento",
		label: "Monumenti"
	},
	{
		id: "flora",
		label: "Flora"
	},
	{
		id: "fauna",
		label: "Fauna"
	},
	{
		id: "festa",
		label: "Feste"
	},
	{
		id: "attivita",
		label: "Attività"
	}
];
function IndicePage() {
	const [filtro, setFiltro] = (0, import_react.useState)("tutte");
	const list = (0, import_react.useMemo)(() => VOCI.filter((v) => filtro === "tutte" ? true : v.tipo === filtro), [filtro]);
	const gruppi = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const v of list) {
			const L = letteraDi(v);
			const arr = map.get(L) ?? [];
			arr.push(v);
			map.set(L, arr);
		}
		return LETTERE.map((L) => [L, map.get(L) ?? []]).filter(([, a]) => a.length > 0);
	}, [list]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-12 md:px-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.75rem] uppercase tracking-[0.2em] text-copper-light",
				children: "Enciclopedia"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl text-cream",
				children: "Indice analitico"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 max-w-2xl text-cream-soft",
				children: [list.length, " voci recuperate dal Portale originale: i 26 comuni, personaggi, chiese e monumenti, flora e fauna, feste e attività. Ogni riga apre la scheda, nel tab giusto."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: FILTRI.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFiltro(f.id),
					className: filtro === f.id ? "rounded-full bg-copper px-4 py-2 text-sm text-cream" : "rounded-full border border-cream/20 px-4 py-2 text-sm text-cream-soft",
					children: f.label
				}, f.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 space-y-10",
				children: gruppi.map(([L, voci]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl text-copper-light",
					children: L
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-cream/10",
					children: voci.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-baseline justify-between gap-2 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/comuni/$slug",
							params: { slug: v.slug },
							hash: v.tab ? `tab-${v.tab}` : void 0,
							className: "text-cream hover:text-olive-light",
							children: v.nome
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs uppercase tracking-wider text-muted",
							children: [
								v.tipo,
								" · ",
								v.comune
							]
						})]
					}, v.id))
				})] }, L))
			})
		]
	}) });
}
//#endregion
export { IndicePage as component };
