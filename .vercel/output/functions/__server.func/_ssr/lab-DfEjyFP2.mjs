import { i as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, _ as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as BrandMark } from "./router-CnNVtgAG.mjs";
import { C as PerspectiveCamera, k as Scene, u as FogExp2 } from "../_libs/three.mjs";
import { _ as useReducedMotion, c as buildTerrain, f as makeNodes, g as resizeRenderer, l as copperDust, o as WebGLHost, p as makeRenderer, s as addDuskLights, u as duskSky } from "./geo-B1aj5SiK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lab-DfEjyFP2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function startHero(canvas, reduced) {
	const renderer = makeRenderer(canvas);
	const scene = new Scene();
	scene.fog = new FogExp2(1512986, .016);
	const camera = new PerspectiveCamera(52, 1, .2, 220);
	const sky = duskSky();
	scene.add(sky);
	addDuskLights(scene);
	const terrain = buildTerrain(canvas.clientWidth < 640 ? 48 : 80);
	scene.add(terrain.mesh);
	const nodes = makeNodes();
	scene.add(nodes.group);
	const dust = copperDust(56);
	scene.add(dust);
	const parent = canvas.parentElement ?? canvas;
	const resize = () => resizeRenderer(renderer, camera, parent);
	resize();
	const ro = new ResizeObserver(resize);
	ro.observe(parent);
	let t = .8;
	let last = performance.now();
	let alive = true;
	let raf = 0;
	const loop = (now) => {
		if (!alive) return;
		const dt = Math.min((now - last) / 1e3, .1);
		last = now;
		if (!reduced) t += dt * .08;
		const r = 46;
		camera.position.set(Math.sin(t) * r, 18, Math.cos(t) * r);
		camera.lookAt(0, 4.5, 0);
		const pulse = 1 + Math.sin(now * .003) * .14;
		for (const m of nodes.meshes) m.scale.setScalar(pulse);
		dust.rotation.y += dt * .04;
		renderer.render(scene, camera);
		raf = requestAnimationFrame(loop);
	};
	raf = requestAnimationFrame(loop);
	return () => {
		alive = false;
		cancelAnimationFrame(raf);
		ro.disconnect();
		terrain.geo.dispose();
		terrain.mat.dispose();
		nodes.geo.dispose();
		nodes.mat.dispose();
		nodes.tci.dispose();
		nodes.lg.dispose();
		dust.geometry.dispose();
		dust.material.dispose();
		sky.geometry.dispose();
		sky.material.dispose();
		renderer.dispose();
	};
}
var EXPERIMENTS = [
	{
		to: "/lab/atlante",
		code: "00",
		title: "Atlante",
		text: "I 26 comuni in 3D. Ogni nodo è la scheda già scritta: Sermoneta, Gorga, Roccagorga. Niente si butta."
	},
	{
		to: "/lab/volo",
		code: "01",
		title: "Volo",
		text: "Drone sul massiccio. Avvicinati a un borgo: compare la scheda, col link al Portale."
	},
	{
		to: "/lab/faggeta",
		code: "02",
		title: "Faggeta",
		text: "Cammino tra Fagus sylvatica. Picchio nero e faggete: le stesse schede natura."
	},
	{
		to: "/lab/biosfera",
		code: "03",
		title: "Biosfera",
		text: "Flora e fauna su due anelli. Aquila, lupo, istrice, orchidee: tap, scheda, Portale."
	},
	{
		to: "/lab/sentieri",
		code: "04",
		title: "Sentieri",
		text: "Tubi drappeggiati sul crinale. 701, 702, 736 e gli itinerari: modello schematico, scheda vera."
	}
];
function LabHome() {
	const reduced = useReducedMotion();
	const start = (0, import_react.useCallback)((c) => startHero(c, reduced.current), [reduced]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-hidden bg-navy-deep text-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebGLHost, { start }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/25 to-navy-deep/40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "pointer-events-auto absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-5 md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-3 text-cream",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { className: "w-11" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex flex-col leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl",
							children: "Lepini Lab"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[0.62rem] uppercase tracking-[0.16em] text-copper-light",
							children: "R&D del comprensorio"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "rounded-full border border-cream/20 px-4 py-2 text-sm text-cream-soft hover:border-copper-light",
					children: "Portale"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-5 pb-10 pt-28 md:px-12 md:pb-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[0.75rem] uppercase tracking-[0.24em] text-copper-light",
						children: "WebGL · dusk shader · 26 nodi"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-3 max-w-3xl font-display text-[clamp(2.4rem,7vw,4.8rem)] leading-[0.95] text-cream",
						children: ["Vedere il crinale", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 block italic text-olive-light",
							children: "come un modello vivo."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-xl text-cream-soft",
						children: "Il Lab non sostituisce il Portale: lo accende. 26 schede comune, flora, fauna, sentieri, timeline: stesso dataset, in tre dimensioni."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
						children: EXPERIMENTS.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: e.to,
							className: "rounded-xl border border-cream/10 bg-navy/70 p-5 backdrop-blur-sm transition-transform hover:-translate-y-0.5 hover:border-copper/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[0.7rem] text-copper-light",
									children: e.code
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 font-display text-2xl",
									children: e.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: e.text
								})
							]
						}, e.code))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-sm text-muted",
						children: [
							"Schedario:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/comuni",
								className: "text-olive-light",
								children: "26 comuni"
							}),
							",",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/natura",
								className: "text-olive-light",
								children: "natura"
							}),
							",",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/sentieri",
								className: "text-olive-light",
								children: "sentieri"
							}),
							",",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/esperienze/timeline",
								className: "text-olive-light",
								children: "timeline"
							}),
							",",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/esperienze/planner",
								className: "text-olive-light",
								children: "planner"
							}),
							"."
						]
					})
				]
			})
		]
	});
}
//#endregion
export { LabHome as component };
