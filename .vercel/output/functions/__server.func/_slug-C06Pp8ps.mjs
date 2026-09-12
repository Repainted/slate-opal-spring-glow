import { i as __toESM } from "./_runtime.mjs";
import { B as require_jsx_runtime, _ as Link, z as require_react } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as ScrollText, d as Leaf, f as Landmark, g as Church, i as Store, l as MapPinned, n as UtensilsCrossed } from "./_libs/lucide-react.mjs";
import { _ as speciePerComune, a as cn, f as sentieriPerComune, g as specieId, h as notaSpecie, i as SiteShell, o as EVENTI, r as Route$12, s as ComuneMap, v as tabFromHash, x as fotoComune } from "./_ssr/router-CnNVtgAG.mjs";
import { t as JsonLd } from "./_ssr/JsonLd-BPB-kgr1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-C06Pp8ps.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		id: "storia",
		label: "Storia",
		icon: ScrollText
	},
	{
		id: "arte",
		label: "Arte",
		icon: Landmark
	},
	{
		id: "natura",
		label: "Natura",
		icon: Leaf
	},
	{
		id: "tradizioni",
		label: "Tradizioni",
		icon: UtensilsCrossed
	},
	{
		id: "turismo",
		label: "Turismo",
		icon: MapPinned
	},
	{
		id: "attivita",
		label: "Attività",
		icon: Store
	}
];
function ComuneTabs({ scheda, specie }) {
	const [tab, setTab] = (0, import_react.useState)("storia");
	(0, import_react.useEffect)(() => {
		const apply = () => setTab(tabFromHash(window.location.hash));
		apply();
		window.addEventListener("hashchange", apply);
		return () => window.removeEventListener("hashchange", apply);
	}, []);
	function go(id) {
		setTab(id);
		const url = `${window.location.pathname}#tab-${id}`;
		window.history.replaceState(null, "", url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "-mx-1 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "tablist",
				"aria-label": "Sezioni della scheda",
				className: "flex min-w-max gap-1 px-1",
				children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "tab",
					"aria-selected": tab === t.id,
					id: `tab-${t.id}`,
					onClick: () => go(t.id),
					className: cn("inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm", tab === t.id ? "bg-copper text-cream" : "border border-cream/15 text-cream-soft hover:border-copper/50"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "size-4" }), t.label]
				}, t.id))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "tabpanel",
			"aria-labelledby": `tab-${tab}`,
			className: "mt-8",
			children: [
				tab === "storia" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Storia, { s: scheda }) : null,
				tab === "arte" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arte, { s: scheda }) : null,
				tab === "natura" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Natura, {
					s: scheda,
					specie
				}) : null,
				tab === "tradizioni" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tradizioni, { s: scheda }) : null,
				tab === "turismo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Turismo, { s: scheda }) : null,
				tab === "attivita" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Attivita, { s: scheda }) : null
			]
		})]
	});
}
function Storia({ s }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl",
			children: "Storia"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-2xl text-lg leading-relaxed text-cream-soft",
			children: s.storia.intro
		}),
		s.storia.epoche.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-8 space-y-6",
			children: s.storia.epoche.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "border-l-2 border-copper/50 pl-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.7rem] uppercase tracking-[0.16em] text-copper-light",
						children: e.periodo
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 font-display text-xl",
						children: e.titolo
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-cream-soft",
						children: e.testo
					})
				]
			}, e.titolo))
		}) : null,
		s.storia.personaggi.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 rounded-xl bg-navy-card p-6 shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl",
				children: "Personaggi"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-4",
				children: s.storia.personaggi.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-cream",
					children: [p.nome, p.anni ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-sm text-copper-light",
						children: p.anni
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: p.nota
				})] }, p.nome))
			})]
		}) : null
	] });
}
function Arte({ s }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl",
			children: "Arte e cultura"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-2xl text-lg leading-relaxed text-cream-soft",
			children: s.arte.intro
		}),
		s.arte.chiese.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "flex items-center gap-2 font-display text-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Church, { className: "size-5 text-copper" }), " Chiese"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 grid gap-4",
				children: s.arte.chiese.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display text-xl text-cream",
							children: c.nome
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs uppercase tracking-wider text-copper-light",
							children: [c.secolo, c.stile].filter(Boolean).join(" · ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-cream-soft",
							children: c.testo
						}),
						c.opere.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-1 text-sm text-muted",
							children: c.opere.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: o }, o))
						}) : null
					]
				}, c.nome))
			})]
		}) : null,
		s.arte.monumenti.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl",
				children: "Monumenti"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 grid gap-4",
				children: s.arte.monumenti.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display text-xl text-cream",
							children: m.nome
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs uppercase tracking-wider text-copper-light",
							children: [m.tipo, m.secolo].filter(Boolean).join(" · ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-cream-soft",
							children: m.testo
						})
					]
				}, m.nome))
			})]
		}) : null
	] });
}
function Natura({ s, specie }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl",
			children: "Natura"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-2xl text-lg leading-relaxed text-cream-soft",
			children: s.natura.intro
		}),
		specie.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3",
			children: specie.map((sp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "overflow-hidden rounded-lg bg-navy-card",
				children: [sp.foto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: sp.foto,
					alt: sp.comune,
					className: "h-28 w-full object-cover",
					loading: "lazy"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-cream",
							children: sp.comune
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[0.65rem] italic text-olive-light",
							children: sp.scientifico
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: notaSpecie(sp.scientifico) ?? sp.habitat
						})
					]
				})]
			}, specieId(sp)))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted",
			children: "Nessuna scheda specie legata a questo comune nel catalogo fotografico."
		}),
		s.natura.sentieri.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl",
				children: "Sentieri sul territorio"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-3",
				children: s.natura.sentieri.map((se) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-cream",
							children: se.nome
						}),
						se.difficolta ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider text-copper-light",
							children: se.difficolta
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-cream-soft",
							children: se.testo
						})
					]
				}, se.nome))
			})]
		}) : null
	] });
}
function Tradizioni({ s }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl",
			children: "Tradizioni"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-2xl text-lg leading-relaxed text-cream-soft",
			children: s.tradizioni.intro
		}),
		s.tradizioni.feste.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-3",
			children: s.tradizioni.feste.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl text-cream",
						children: f.nome
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wider text-copper-light",
						children: [f.tipo, f.quando].filter(Boolean).join(" · ")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-cream-soft",
					children: f.testo
				})]
			}, f.nome))
		}) : null,
		s.tradizioni.prodotti || s.tradizioni.piatti ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 rounded-xl bg-navy-card p-6 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl",
					children: "Tavola"
				}),
				s.tradizioni.prodotti ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-cream-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Prodotti: "
					}), s.tradizioni.prodotti]
				}) : null,
				s.tradizioni.piatti ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-cream-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Piatti: "
					}), s.tradizioni.piatti]
				}) : null
			]
		}) : null
	] });
}
function Turismo({ s }) {
	const { poi, arrivo, contatti } = s.turismo;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl",
			children: "Turismo"
		}),
		poi.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 grid gap-3 sm:grid-cols-2",
			children: poi.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wider text-copper-light",
						children: p.tipo
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 font-display text-xl text-cream",
						children: p.nome
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-cream-soft",
						children: p.testo
					})
				]
			}, p.nome))
		}) : null,
		arrivo.auto || arrivo.treno || arrivo.bus ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 rounded-xl bg-navy-card p-6 shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl",
				children: "Come arrivare"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 space-y-3 text-sm text-cream-soft",
				children: [
					arrivo.auto ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "In auto"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: arrivo.auto })] }) : null,
					arrivo.treno ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "In treno"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: arrivo.treno })] }) : null,
					arrivo.bus ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "In bus"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: arrivo.bus })] }) : null
				]
			})]
		}) : null,
		contatti.sito || contatti.proloco || contatti.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl",
				children: "Contatti"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 space-y-2 text-olive-light",
				children: [
					contatti.sito ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: contatti.sito,
						rel: "noreferrer",
						children: "Sito del Comune"
					}) }) : null,
					contatti.proloco ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: contatti.proloco,
						rel: "noreferrer",
						children: "Pro Loco"
					}) }) : null,
					contatti.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `mailto:${contatti.email}`,
						children: contatti.email
					}) }) : null
				]
			})]
		}) : null
	] });
}
function Attivita({ s }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl",
			children: "Attività locali"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted",
			children: "Elenco recuperato dal Portale originale. Verificare orari e disponibilità. Non è un catalogo a pagamento."
		}),
		s.attivita.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-cream-soft",
			children: "Nessuna attività in scheda per questo comune."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 grid gap-4",
			children: s.attivita.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl text-cream",
							children: a.nome
						}), a.categoria ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-cream/15 px-2.5 py-1 text-[0.68rem] uppercase tracking-wider text-muted",
							children: a.categoria
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-cream-soft",
						children: a.descrizione
					}),
					a.prodotti ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: a.prodotti
					}) : null,
					a.indirizzo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: a.indirizzo
					}) : null,
					a.sito ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: a.sito,
						rel: "noreferrer",
						className: "mt-3 inline-block text-sm text-olive-light",
						children: "Sito"
					}) : null,
					a.nota ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs italic text-muted",
						children: a.nota
					}) : null
				]
			}, a.nome))
		})
	] });
}
function ComunePage() {
	const { comune, scheda } = Route$12.useLoaderData();
	const sentieri = sentieriPerComune(comune.slug);
	const eventi = EVENTI.filter((e) => e.comuneSlug === comune.slug);
	const specie = speciePerComune(comune.slug);
	const foto = fotoComune(comune.slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: {
			"@type": "TouristDestination",
			name: comune.nome,
			description: comune.sommario,
			geo: {
				"@type": "GeoCoordinates",
				latitude: comune.lat,
				longitude: comune.lng
			},
			containedInPlace: {
				"@type": "Mountain",
				name: "Monti Lepini"
			}
		} }),
		foto ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-[42vh] min-h-[240px] overflow-hidden border-b-[3px] border-copper",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: foto,
					alt: `Veduta di ${comune.nome}`,
					className: "h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-6 left-0 right-0 px-5 md:px-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[0.75rem] uppercase tracking-[0.2em] text-copper-light",
						children: [
							comune.provincia,
							" · ",
							comune.altitudine,
							" m s.l.m.",
							scheda?.cap ? ` · ${scheda.cap}` : ""
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-5xl text-cream",
						children: comune.nome
					})]
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[1.2fr_0.8fr] md:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
				foto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl italic text-olive-light",
					children: comune.headline
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[0.75rem] uppercase tracking-[0.2em] text-copper-light",
						children: [
							comune.provincia,
							" · ",
							comune.altitudine,
							" m s.l.m."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-5xl text-cream",
						children: comune.nome
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-2xl italic text-olive-light",
						children: comune.headline
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-2xl text-lg leading-relaxed text-cream-soft",
					children: comune.sommario
				}),
				comune.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: comune.note
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-8 grid grid-cols-2 gap-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-navy-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Abitanti (stima)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-display text-2xl tabular-nums",
								children: comune.abitanti.toLocaleString("it-IT")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-navy-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Patrono"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-display text-2xl",
								children: comune.patrono
							})]
						}),
						scheda?.festaPatronale ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-navy-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Festa patronale"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-display text-xl",
								children: scheda.festaPatronale
							})]
						}) : null,
						scheda?.comunitaMontana ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-navy-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Comunità montana"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-display text-xl",
								children: scheda.comunitaMontana
							})]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: [comune.tag.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-cream/15 px-3 py-1 text-xs uppercase tracking-wider text-muted",
						children: t
					}, t)), comune.bandieraArancione ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-copper/50 px-3 py-1 text-xs uppercase tracking-wider text-copper-light",
						children: "Bandiera Arancione TCI"
					}) : null]
				}),
				scheda ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComuneTabs, {
					scheda,
					specie
				}) : null
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComuneMap, { active: comune.slug }),
					sentieri.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "Sentieri in dataset"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2 text-sm",
							children: sentieri.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/sentieri/$slug",
								params: { slug: s.slug },
								className: "text-olive-light hover:text-cream",
								children: [s.codice ? `${s.codice} · ` : null, s.nome]
							}) }, s.slug))
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Nessun sentiero CAI in dataset per questo comune."
					}),
					eventi.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-navy-card p-5 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "Nel calendario"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-3 text-sm text-cream-soft",
							children: eventi.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-cream",
								children: e.titolo
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted",
								children: e.quando
							})] }, e.id))
						})]
					}) : null
				]
			})]
		})
	] });
}
//#endregion
export { ComunePage as component };
