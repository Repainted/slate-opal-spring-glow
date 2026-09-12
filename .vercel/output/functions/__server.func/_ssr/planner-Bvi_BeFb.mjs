import { i as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, _ as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as SENTIERI, i as SiteShell, y as COMUNI } from "./router-CnNVtgAG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/planner-Bvi_BeFb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INTERESTS = [
	{
		id: "natura",
		label: "Natura"
	},
	{
		id: "medievale",
		label: "Borghi"
	},
	{
		id: "enogastro",
		label: "Tavola"
	},
	{
		id: "archeologia",
		label: "Archeologia"
	},
	{
		id: "lento",
		label: "Lento"
	}
];
function PlannerPage() {
	const [days, setDays] = (0, import_react.useState)(2);
	const [prov, setProv] = (0, import_react.useState)("tutte");
	const [interests, setInterests] = (0, import_react.useState)(["natura", "medievale"]);
	const plan = (0, import_react.useMemo)(() => {
		const scored = COMUNI.map((c) => {
			let score = 0;
			if (prov !== "tutte" && c.provincia !== prov) score -= 50;
			for (const i of interests) if (c.tag.includes(i)) score += 3;
			if (c.bandieraArancione) score += 1;
			return {
				c,
				score
			};
		}).filter((x) => x.score > 0 || prov === "tutte" && interests.length === 0).sort((a, b) => b.score - a.score);
		const perDay = days === 1 ? 2 : days === 2 ? 2 : 2;
		const take = Math.min(scored.length, days * perDay);
		const chosen = scored.slice(0, take).map((x) => x.c);
		const chunks = [];
		for (let d = 0; d < days; d++) chunks.push(chosen.slice(d * perDay, (d + 1) * perDay));
		return chunks.filter((ch) => ch.length > 0);
	}, [
		days,
		prov,
		interests
	]);
	function toggle(id) {
		setInterests((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-12 md:px-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.75rem] uppercase tracking-[0.2em] text-copper-light",
				children: "Esperienze"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl",
				children: "Planner"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-cream-soft",
				children: "Un itinerario dal dataset, non da un catalogo. Mixare Bandiere Arancioni e comuni piccoli. Poi si cammina con la carta CAI, non con questa pagina."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]",
					onSubmit: (e) => e.preventDefault(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-sm text-muted",
							children: "Giorni"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex gap-2",
							children: [
								1,
								2,
								3
							].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setDays(n),
								className: `min-h-11 min-w-11 rounded-full ${days === n ? "bg-cream text-navy-deep" : "border border-cream/20"}`,
								children: n
							}, n))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "text-sm text-muted",
								children: "Versante"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: [
									"tutte",
									"Latina",
									"Roma",
									"Frosinone"
								].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setProv(p),
									className: `min-h-10 rounded-full px-4 text-sm ${prov === p ? "bg-cream text-navy-deep" : "border border-cream/20"}`,
									children: p === "tutte" ? "Tutti" : p
								}, p))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "text-sm text-muted",
								children: "Interessi"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: INTERESTS.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => toggle(i.id),
									className: `min-h-10 rounded-full px-4 text-sm ${interests.includes(i.id) ? "bg-olive text-cream-soft" : "border border-cream/20"}`,
									children: i.label
								}, i.id))
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-6",
					children: plan.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: "Allarga i filtri: con questi tag non esce nessun comune."
					}) : plan.map((day, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-2xl",
							children: ["Giorno ", i + 1]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-4 space-y-4",
							children: day.map((c) => {
								const trail = SENTIERI.find((s) => s.comuni.includes(c.slug));
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "border-l border-copper/50 pl-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/comuni/$slug",
											params: { slug: c.slug },
											className: "font-display text-xl text-cream",
											children: c.nome
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-cream-soft",
											children: c.headline
										}),
										trail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/sentieri/$slug",
											params: { slug: trail.slug },
											className: "mt-1 inline-block text-sm text-olive-light",
											children: trail.codice ?? trail.nome
										}) : null
									]
								}, c.slug);
							})
						})]
					}, i))
				})]
			})
		]
	}) });
}
//#endregion
export { PlannerPage as component };
