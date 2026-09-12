import { B as require_jsx_runtime, _ as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { S as getComune, i as SiteShell, n as Route } from "./_ssr/router-CnNVtgAG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-Bw31xu_H.js
var import_jsx_runtime = require_jsx_runtime();
function SentieroPage() {
	const { sentiero } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl px-5 py-12 md:px-12",
		children: [
			sentiero.codice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-sm text-copper-light",
				children: sentiero.codice
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.75rem] uppercase tracking-[0.2em] text-muted",
				children: "Itinerario culturale"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl md:text-5xl",
				children: sentiero.nome
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-lg leading-relaxed text-cream-soft",
				children: sentiero.descrizione
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Partenza"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: sentiero.partenza
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Arrivo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: sentiero.arrivo
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Difficoltà CAI"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: sentiero.difficolta
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Tempo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "mt-1",
						children: [
							sentiero.durata,
							" · ",
							sentiero.dislivello
						]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-2xl",
				children: "Comuni toccati"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-wrap gap-2",
				children: sentiero.comuni.map((slug) => {
					const c = getComune(slug);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/comuni/$slug",
						params: { slug },
						className: "inline-flex min-h-11 items-center rounded-full border border-cream/20 px-4 text-sm hover:border-copper-light",
						children: c?.nome ?? slug
					}) }, slug);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-10 border-t border-cream/10 pt-6 text-sm text-muted",
				children: ["Fonte: ", sentiero.fonte]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					"Tracciato ufficiale e condizioni:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://www.compagniadeilepini.it/trekking-monti-lepini/",
						className: "text-olive-light",
						children: "Compagnia dei Lepini"
					}),
					". Questa scheda non sostituisce una carta."
				]
			})
		]
	}) });
}
//#endregion
export { SentieroPage as component };
