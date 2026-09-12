import { B as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SiteShell } from "./router-CnNVtgAG.mjs";
import { n as MESI } from "./natura-CmdnX4mO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendario-OdxJLK86.js
var import_jsx_runtime = require_jsx_runtime();
function CalendarioStagionale() {
	const now = (/* @__PURE__ */ new Date()).getMonth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-12 md:px-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.75rem] uppercase tracking-[0.2em] text-copper-light",
				children: "Esperienze"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl",
				children: "Calendario stagionale"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-cream-soft",
				children: "Non è il calendario eventi della DMO. È il ritmo del crinale: orchidee, carciofo, foliage, olio nuovo."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3",
				children: MESI.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: `rounded-xl p-5 shadow-[var(--shadow-border)] ${i === now ? "bg-navy-card ring-1 ring-copper/60" : "bg-navy-card"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-copper-light",
							children: String(m.n).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-2xl",
							children: m.nome
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Clima"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: m.clima })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Natura"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: m.natura })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Tavola"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: m.tavola })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Uscita"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: m.uscita })] })
							]
						})
					]
				}, m.n))
			})
		]
	}) });
}
//#endregion
export { CalendarioStagionale as component };
