import { i as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, _ as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Menu, t as X } from "../_libs/lucide-react.mjs";
import { p as BrandMark } from "./router-CnNVtgAG.mjs";
import { t as JsonLd } from "./JsonLd-BPB-kgr1.mjs";
import { t as Button } from "./button-CCQSz89X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/digitale-CIHhfZVO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DIGITAL_MAIL = "lepinilab@lepinidigital.com";
var DIGITAL_STATS = [
	{
		k: "26",
		l: "Comuni nel Portale, prova di lavoro pubblica"
	},
	{
		k: "100%",
		l: "Strumenti autonomi, senza canone di piattaforma"
	},
	{
		k: "0",
		l: "Sistemi sovradimensionati da catalogo"
	}
];
var SERVIZI = [
	{
		code: "01",
		titolo: "Gestionali su misura",
		testo: "Anagrafiche, DDT, preventivi, magazzino. Costruiti attorno ai flussi reali: Access, Excel, carta. Senza stravolgere il modo di lavorare."
	},
	{
		code: "02",
		titolo: "Automazione processi",
		testo: "Documenti che si compilano da soli, dati che passano da un programma all'altro senza copia-incolla. Tracciabilità dal preventivo alla consegna."
	},
	{
		code: "03",
		titolo: "Siti e presenza digitale",
		testo: "Vetrina, area riservata, moduli. Veloci, senza abbonamento nascosto. Il Portale che vedi è fatto così: uno stack, nessun canone."
	},
	{
		code: "04",
		titolo: "Assistenti AI su misura",
		testo: "Chatbot, smistamento documenti, formazione al team. Stessa linea di ricerca del Lab — adattata a magazzino e ufficio, non a una demo."
	}
];
var METODO = [
	{
		titolo: "Ascolto",
		testo: "Chi fa cosa, con quali documenti, dove si perde tempo. Dal bancone, dal magazzino, dall'ufficio — non da un modello preconfezionato."
	},
	{
		titolo: "Prototipo",
		testo: "In pochi giorni uno strumento da provare con i tuoi dati veri, non una presentazione."
	},
	{
		titolo: "Consegna",
		testo: "Resta tuo. Funziona anche senza un abbonamento che scade. Niente dipendenza da una piattaforma che chiude."
	},
	{
		titolo: "Affiancamento",
		testo: "Si usa insieme, si aggiusta. Formazione al team, non un PDF di ottanta pagine."
	}
];
function DigitalShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-navy text-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#contenuto",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-cream focus:px-4 focus:py-2 focus:text-navy-deep",
				children: "Salta al contenuto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitalHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "contenuto",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitalFooter, {})
		]
	});
}
function DigitalHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-5 py-5 md:px-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/digitale",
				className: "flex items-center gap-3 text-cream",
				"aria-label": "Lepini Digital",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { className: "w-12" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex flex-col leading-tight font-display",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xl tracking-wide",
						children: "Lepini Digital"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-sans text-[0.62rem] uppercase tracking-[0.16em] text-copper-light",
						children: "Studio per imprese · Montelanico"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "hidden items-center gap-7 text-[1.02rem] lg:flex",
				"aria-label": "Studio",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#servizi",
						className: "text-cream/90 hover:text-cream",
						children: "Servizi"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#metodo",
						className: "text-cream/90 hover:text-cream",
						children: "Metodo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-cream/90 hover:text-cream",
						children: "Portale"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/lab",
						className: "text-cream/90 hover:text-cream",
						children: "Lab"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#contatti",
						className: "rounded-full border border-olive-light/50 px-4 py-2 text-sm text-olive-light hover:bg-olive/15",
						children: "Parliamone"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "inline-flex size-11 items-center justify-center rounded-full border border-cream/20 text-cream lg:hidden",
				"aria-expanded": open,
				"aria-controls": "digital-nav",
				onClick: () => setOpen((v) => !v),
				children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Menu"
				})]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "digital-nav",
				className: "absolute inset-x-0 top-full border-b border-cream/10 bg-navy-deep/98 px-5 py-6 lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-col gap-1",
					"aria-label": "Mobile studio",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#servizi",
							className: "min-h-11 px-2 py-2 text-lg",
							onClick: () => setOpen(false),
							children: "Servizi"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#metodo",
							className: "min-h-11 px-2 py-2 text-lg",
							onClick: () => setOpen(false),
							children: "Metodo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "min-h-11 px-2 py-2 text-lg",
							onClick: () => setOpen(false),
							children: "Portale"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/lab",
							className: "min-h-11 px-2 py-2 text-lg",
							onClick: () => setOpen(false),
							children: "Lab"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contatti",
							className: "min-h-11 px-2 py-2 text-olive-light",
							onClick: () => setOpen(false),
							children: "Parliamone"
						})
					]
				})
			}) : null
		]
	});
}
function DigitalFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-cream/10 bg-navy-deep px-5 py-12 md:px-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { className: "w-16" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: "Lepini Digital"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-copper-light",
					children: "Montelanico · Monti Lepini"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `mailto:${DIGITAL_MAIL}`,
					className: "font-mono text-olive-light",
					children: DIGITAL_MAIL
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-sm",
					children: "P.IVA e pec col dominio. Fino ad allora niente finta ragione sociale."
				})]
			})]
		})
	});
}
function DigitalePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DigitalShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: {
			"@type": "ProfessionalService",
			name: "Lepini Digital",
			description: "Gestionali, automazione e siti per imprese dei Monti Lepini.",
			email: DIGITAL_MAIL,
			areaServed: "Monti Lepini",
			url: "https://lepinidigital.com"
		} }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative min-h-[88vh] overflow-hidden border-b-[3px] border-copper",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/hero-ridge.jpg",
					alt: "Crinale dei Monti Lepini al crepuscolo",
					className: "absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-14 pt-28 md:px-12 md:pb-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[0.75rem] uppercase tracking-[0.24em] text-copper-light",
							children: "Lepini Digital · Montelanico (RM)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-3 max-w-3xl font-display text-[clamp(2.6rem,7.5vw,5.4rem)] font-semibold leading-[0.94] text-cream",
							children: ["Strumenti digitali", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 block font-medium italic text-olive-light",
								children: "per chi lavora davvero."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-lg text-cream-soft",
							children: "Gestionali, automazione dei documenti e siti web senza complicazioni — da chi conosce magazzino, logistica e ufficio, non da un catalogo di servizi standard."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#contatti",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Parliamone" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#servizi",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									children: "Cosa facciamo"
								})
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto grid max-w-6xl gap-4 px-5 py-10 md:grid-cols-3 md:px-12",
			children: DIGITAL_STATS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-navy-card px-5 py-6 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-4xl text-cream",
					children: s.k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: s.l
				})]
			}, s.l))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "servizi",
			className: "mx-auto max-w-6xl px-5 py-16 md:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[0.7rem] uppercase tracking-[0.2em] text-copper-light",
					children: "Cosa facciamo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 max-w-2xl font-display text-4xl md:text-5xl",
					children: "Quattro mestieri, un crinale"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl text-cream-soft",
					children: "Soluzioni leggere per piccole e medie imprese dei Monti Lepini e non solo: niente licenze costose, niente sistemi sovradimensionati. Solo strumenti che il team userà davvero."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-4 md:grid-cols-2",
					children: SERVIZI.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl bg-navy-card p-6 shadow-[var(--shadow-border)] md:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[0.7rem] text-copper-light",
								children: s.code
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-3xl",
								children: s.titolo
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-cream-soft",
								children: s.testo
							})
						]
					}, s.code))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "metodo",
			className: "border-y border-cream/10 bg-navy-deep",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-5 py-16 md:px-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[0.7rem] uppercase tracking-[0.2em] text-copper-light",
						children: "Come lavoriamo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-4xl md:text-5xl",
						children: "Prima il lavoro, poi il codice"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-2xl text-cream-soft",
						children: "Ogni progetto parte dal campo — dal bancone, dal magazzino, dall'ufficio — non da un modello preconfezionato."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-8 md:grid-cols-4",
						children: METODO.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[0.7rem] text-olive-light",
								children: ["0", i + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-2xl",
								children: m.titolo
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-cream-soft",
								children: m.testo
							})
						] }, m.titolo))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[0.7rem] uppercase tracking-[0.2em] text-copper-light",
					children: "Da dove veniamo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl",
					children: "Radici in montagna, strumenti nel cloud"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 leading-relaxed text-cream-soft",
					children: "Lepini Digital nasce a Montelanico. Conosciamo edilizia, ferramenta, logistica, artigianato perché ci lavoriamo dentro. Il digitale qui non è una moda: è un modo per far viaggiare più leggere aziende con radici solide."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-display text-2xl italic text-olive-light",
					children: "Radici in montagna, strumenti nel cloud."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "rounded-xl bg-navy-card p-6 shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[0.68rem] text-copper-light",
							children: "Prova di lavoro · Lepini Lab"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-display text-2xl",
							children: "Portale Monti Lepini"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "26 comuni, sentieri con fonte, natura con binomio. Piattaforma dati, non brochure."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/lab",
					className: "rounded-xl bg-navy-card p-6 shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[0.68rem] text-copper-light",
							children: "Laboratorio WebGL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-display text-2xl",
							children: "Lepini Lab"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Atlante, volo, faggeta, biosfera, sentieri 3D. Stesso dataset."
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contatti, {})
	] });
}
function Contatti() {
	const [testo, setTesto] = (0, import_react.useState)("");
	const href = `mailto:${DIGITAL_MAIL}?subject=${encodeURIComponent("Lepini Digital — un processo")}&body=${encodeURIComponent(testo || "Ciao, vorrei raccontarvi un processo che ci fa perdere tempo.")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contatti",
		className: "border-t border-cream/10 bg-navy-deep",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-5 py-20 md:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[0.7rem] uppercase tracking-[0.2em] text-copper-light",
					children: "Contatti"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl md:text-5xl",
					children: "Hai un processo che ti fa perdere tempo?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-lg text-cream-soft",
					children: "Raccontacelo. In una chiacchierata capiamo se c'è un modo più semplice — e in pochi giorni un prototipo con i tuoi dati, non una slide. La prima è senza impegno."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-8 block text-sm text-muted",
					htmlFor: "msg",
					children: "Di cosa si tratta"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "msg",
					value: testo,
					onChange: (e) => setTesto(e.target.value),
					rows: 5,
					className: "mt-2 w-full rounded-xl border border-cream/15 bg-navy p-4 text-cream placeholder:text-muted",
					placeholder: "Magazzino, preventivi, sito, documenti che si copiano a mano…"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							children: "Apri la mail"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `mailto:${DIGITAL_MAIL}`,
						className: "font-mono text-sm text-olive-light",
						children: DIGITAL_MAIL
					})]
				})
			]
		})
	});
}
//#endregion
export { DigitalePage as component };
