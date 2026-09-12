import { B as require_jsx_runtime, _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SiteShell, o as EVENTI } from "./router-CnNVtgAG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendario-BtP67ckO.js
var import_jsx_runtime = require_jsx_runtime();
function CalendarioPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-5 py-12 md:px-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.75rem] uppercase tracking-[0.2em] text-copper-light",
				children: "Calendario"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl",
				children: "Ritmi, non un feed"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-cream-soft",
				children: [
					"Le date puntuali di sagre e concerti le pubblica già",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://www.compagniadeilepini.it/eventi-monti-lepini/",
						className: "text-olive-light",
						children: "Compagnia dei Lepini"
					}),
					" ",
					"e",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://mybestlazio.it/",
						className: "text-olive-light",
						children: "MyBestLazio"
					}),
					". Qui teniamo i fenomeni ricorrenti, con nota di verifica. Copiare il calendario altrui è il modo più veloce per farlo morire."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-10 space-y-5",
				children: EVENTI.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider text-copper-light",
							children: e.tipo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-2xl",
							children: e.titolo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								e.quando,
								" · ",
								e.luogo
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-cream-soft",
							children: e.nota
						}),
						e.comuneSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/comuni/$slug",
							params: { slug: e.comuneSlug },
							className: "mt-3 inline-block text-sm text-olive-light",
							children: "Scheda comune"
						}) : null
					]
				}, e.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-10 text-sm text-muted",
				children: [
					"Per il ritmo naturale, non gli eventi:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/esperienze/calendario",
						className: "text-olive-light",
						children: "calendario stagionale"
					}),
					"."
				]
			})
		]
	}) });
}
//#endregion
export { CalendarioPage as component };
