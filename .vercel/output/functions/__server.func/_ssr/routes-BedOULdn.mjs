import { i as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, _ as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Leaf, h as CloudSun, o as Mountain, s as Milestone, v as ArrowRight } from "../_libs/lucide-react.mjs";
import { C as SITE, b as STATS, d as SENTIERI, i as SiteShell, s as ComuneMap, y as COMUNI } from "./router-CnNVtgAG.mjs";
import { t as JsonLd } from "./JsonLd-BPB-kgr1.mjs";
import { n as MESI } from "./natura-CmdnX4mO.mjs";
import { t as Button } from "./button-CCQSz89X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BedOULdn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LABELS = {
	0: "Sereno",
	1: "Prevalentemente sereno",
	2: "Parzialmente nuvoloso",
	3: "Coperto",
	45: "Nebbia",
	48: "Nebbia a velo",
	51: "Pioviggine",
	61: "Pioggia",
	71: "Neve",
	80: "Rovesci",
	95: "Temporale"
};
function meteoLabel(code) {
	if (LABELS[code]) return LABELS[code];
	if (code < 20) return "Variabile";
	if (code < 70) return "Pioggia";
	if (code < 80) return "Neve";
	return "Instabile";
}
async function fetchMeteo(lat, lng) {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FRome&forecast_days=1`;
	const res = await fetch(url);
	if (!res.ok) return null;
	const data = await res.json();
	if (!data.current || !data.daily) return null;
	return {
		temp: data.current.temperature_2m,
		code: data.current.weather_code,
		wind: data.current.wind_speed_10m,
		max: data.daily.temperature_2m_max[0] ?? data.current.temperature_2m,
		min: data.daily.temperature_2m_min[0] ?? data.current.temperature_2m,
		rain: data.daily.precipitation_sum[0] ?? 0
	};
}
function MeteoPanel() {
	const [data, setData] = (0, import_react.useState)(null);
	const [err, setErr] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let live = true;
		fetchMeteo(STATS.centro.lat, STATS.centro.lng).then((m) => {
			if (live) {
				if (m) setData(m);
				else setErr(true);
			}
		}).catch(() => {
			if (live) setErr(true);
		});
		return () => {
			live = false;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.16em] text-copper-light",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, { className: "size-4" }), "Meteo sul crinale"]
			}),
			data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-display text-4xl tabular-nums text-cream",
					children: [Math.round(data.temp), "°"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-cream-soft",
					children: meteoLabel(data.code)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted tabular-nums",
					children: [
						"min ",
						Math.round(data.min),
						"° · max ",
						Math.round(data.max),
						"° · vento ",
						Math.round(data.wind),
						" km/h",
						data.rain > 0 ? ` · pioggia ${data.rain} mm` : null
					]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: err ? "Meteo non disponibile in questo momento." : "Caricamento del dato Open-Meteo…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-[0.7rem] text-muted",
				children: "Open-Meteo · centro comprensorio (Carpineto / Bassiano)"
			})
		]
	});
}
function Home() {
	const mese = MESI[(/* @__PURE__ */ new Date()).getMonth()];
	const tci = COMUNI.filter((c) => c.bandieraArancione).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, {
		overlayHeader: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: {
				"@type": "TouristDestination",
				name: "Monti Lepini",
				description: SITE.description,
				geo: {
					"@type": "GeoCoordinates",
					latitude: STATS.centro.lat,
					longitude: STATS.centro.lng
				}
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative min-h-[72vh] overflow-hidden border-b-[3px] border-copper md:min-h-[88vh]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/hero-ridge.jpg",
						alt: "Crinale calcareo dei Monti Lepini al crepuscolo, faggete e un borgo sullo sperone",
						className: "absolute inset-0 h-full w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-5 pb-10 pt-24 md:min-h-[88vh] md:justify-end md:px-12 md:pb-16 md:pt-32",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.8rem] uppercase tracking-[0.28em] text-copper-light",
								children: "Latina · Roma · Frosinone"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-4 max-w-4xl font-display text-[clamp(2.6rem,8vw,5.6rem)] font-semibold uppercase leading-[0.95] text-cream",
								children: ["26 borghi.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-2 block font-medium italic normal-case tracking-normal text-olive-light",
									children: "Un solo comprensorio."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-xl text-lg text-cream-soft",
								children: "Enciclopedia digitale dei Monti Lepini. Non una brochure: uno strato di dati per i 26 comuni, i sentieri numerati, la natura e le imprese. Indipendente, senza pubblicità."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/comuni",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Esplora i comuni" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/sentieri",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											children: "Sentieri"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/lab",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "olive",
											children: "Lepini Lab"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/digitale",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											children: "Lepini Digital"
										})
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto grid max-w-6xl gap-4 px-5 py-12 md:grid-cols-4 md:px-12",
				children: [
					{
						k: String(STATS.comuni),
						l: "Comuni in un dataset"
					},
					{
						k: `${STATS.vetta} m`,
						l: STATS.vettaNome
					},
					{
						k: String(tci),
						l: "Bandiere Arancioni TCI"
					},
					{
						k: String(SENTIERI.length),
						l: "Itinerari in scheda"
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-navy-card px-5 py-6 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl tabular-nums text-cream",
						children: s.k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: s.l
					})]
				}, s.l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl gap-6 px-5 pb-16 md:grid-cols-3 md:px-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeteoPanel, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.7rem] uppercase tracking-[0.16em] text-copper-light",
								children: "Questo mese"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-display text-3xl text-cream",
								children: mese.nome
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-cream-soft",
								children: mese.natura
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: mese.uscita
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/esperienze/calendario",
								className: "mt-4 inline-flex min-h-11 items-center gap-1 text-olive-light",
								children: ["Calendario stagionale ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.7rem] uppercase tracking-[0.16em] text-copper-light",
								children: "Cosa non siamo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-cream-soft",
								children: "Non sostituiamo Compagnia dei Lepini, la DMO o VisitLazio. Loro hanno eventi, soci, sentieri in PDF. Qui sta la griglia dei 26 e gli strumenti. Il resto si linka, non si copia."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cantiere",
								className: "mt-4 inline-flex min-h-11 items-center gap-1 text-olive-light",
								children: ["Basi del cantiere ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 pb-20 md:px-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.7rem] uppercase tracking-[0.16em] text-copper-light",
						children: "Il territorio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-4xl text-cream",
						children: "I 26, non i sette da cartolina"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/comuni",
						className: "text-olive-light",
						children: "Elenco completo"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComuneMap, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-cream/10 bg-navy-deep",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-3 md:px-12",
					children: [
						{
							icon: Mountain,
							title: "Sentieri con fonte",
							to: "/sentieri",
							t: "CAI 701, 702, 736 dalla Compagnia. Nessun numero inventato."
						},
						{
							icon: Leaf,
							title: "Natura con nome",
							to: "/natura",
							t: "Fagus sylvatica, non «bosco». Le ~50 orchidee restano da schedare con un botanico."
						},
						{
							icon: Milestone,
							title: "Lepini Lab",
							to: "/lab",
							t: "Volo 3D, faggeta in prima persona, biosfera. Il crinale come modello, non come foto."
						}
					].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: b.to,
						className: "group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "size-6 text-copper" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-display text-2xl text-cream group-hover:text-cream-soft",
								children: b.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: b.t
							})
						]
					}, b.title))
				})
			})
		]
	});
}
//#endregion
export { Home as component };
