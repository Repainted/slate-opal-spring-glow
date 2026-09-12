import { i as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, _ as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as SPECIE } from "./router-CnNVtgAG.mjs";
import { C as PerspectiveCamera, D as Raycaster, E as PointsMaterial, N as Vector2, S as OctahedronGeometry, T as Points, _ as MathUtils, g as LineSegments, h as LineBasicMaterial, i as BufferGeometry, j as SphereGeometry, k as Scene, l as Float32BufferAttribute, p as IcosahedronGeometry, r as BufferAttribute, v as Mesh, y as MeshBasicMaterial } from "../_libs/three.mjs";
import { _ as useReducedMotion, g as resizeRenderer, i as Telemetry, o as WebGLHost, p as makeRenderer, t as LabTop } from "./geo-B1aj5SiK.mjs";
import { r as SchedaSpecie } from "./Schede-ChiCXenD.mjs";
import { t as HABITAT } from "./natura-CmdnX4mO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/biosfera-phrA2ffY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function startBiosfera(canvas, opts) {
	const renderer = makeRenderer(canvas);
	renderer.setClearColor(920848, 1);
	const scene = new Scene();
	const camera = new PerspectiveCamera(50, 1, .1, 80);
	camera.position.set(0, 2.2, 16);
	const coreGeo = new IcosahedronGeometry(1.35, 1);
	const core = new Mesh(coreGeo, new MeshBasicMaterial({
		color: 7109195,
		wireframe: true
	}));
	scene.add(core);
	const inner = new Mesh(new IcosahedronGeometry(.9, 0), new MeshBasicMaterial({
		color: 11891002,
		transparent: true,
		opacity: .35
	}));
	scene.add(inner);
	const pickables = [];
	const orbGeo = new SphereGeometry(.24, 16, 12);
	const habGeo = new OctahedronGeometry(.32, 0);
	const linePts = [];
	const placeRing = (list, radius) => {
		list.forEach((s, i) => {
			const t = i / list.length * Math.PI * 2 - Math.PI / 2;
			const y = s.gruppo === "fauna" ? Math.sin(i * 1.7) * .8 : Math.cos(i * 1.3) * .55;
			const x = Math.cos(t) * radius;
			const z = Math.sin(t) * radius;
			const color = s.gruppo === "flora" ? 9149030 : 13536078;
			const m = new Mesh(orbGeo, new MeshBasicMaterial({ color }));
			m.position.set(x, y, z);
			m.userData.pick = {
				kind: "specie",
				specie: s
			};
			pickables.push(m);
			scene.add(m);
			linePts.push(0, 0, 0, x, y, z);
		});
	};
	placeRing(SPECIE.filter((s) => s.gruppo === "flora"), 4.1);
	placeRing(SPECIE.filter((s) => s.gruppo === "fauna"), 6.35);
	HABITAT.forEach((h, i) => {
		const t = i / HABITAT.length * Math.PI * 2;
		const m = new Mesh(habGeo, new MeshBasicMaterial({ color: 15589576 }));
		m.position.set(Math.cos(t) * 2.15, Math.sin(t * .5) * .4, Math.sin(t) * 2.15);
		m.userData.pick = {
			kind: "habitat",
			titolo: h.titolo,
			testo: h.testo
		};
		pickables.push(m);
		scene.add(m);
	});
	const lg = new BufferGeometry();
	lg.setAttribute("position", new Float32BufferAttribute(linePts, 3));
	scene.add(new LineSegments(lg, new LineBasicMaterial({
		color: 11891002,
		transparent: true,
		opacity: .28
	})));
	const dustGeo = new BufferGeometry();
	const dp = /* @__PURE__ */ new Float32Array(240);
	for (let i = 0; i < 80; i++) {
		const u = Math.random() * Math.PI * 2;
		const v = Math.acos(2 * Math.random() - 1);
		const rr = 2.2 + Math.random() * 5.5;
		dp[i * 3] = rr * Math.sin(v) * Math.cos(u);
		dp[i * 3 + 1] = rr * Math.cos(v);
		dp[i * 3 + 2] = rr * Math.sin(v) * Math.sin(u);
	}
	dustGeo.setAttribute("position", new BufferAttribute(dp, 3));
	scene.add(new Points(dustGeo, new PointsMaterial({
		color: 15589576,
		size: .06,
		transparent: true,
		opacity: .5,
		blending: 2,
		depthWrite: false
	})));
	const parent = canvas.parentElement ?? canvas;
	const resize = () => resizeRenderer(renderer, camera, parent);
	resize();
	const ro = new ResizeObserver(resize);
	ro.observe(parent);
	let dragging = false;
	let lastX = 0;
	let lastY = 0;
	let rotY = .4;
	let rotX = .25;
	const aim = new Vector2(rotY, rotX);
	const ray = new Raycaster();
	const ndc = new Vector2();
	let picked = null;
	const onDown = (e) => {
		dragging = true;
		lastX = e.clientX;
		lastY = e.clientY;
		canvas.setPointerCapture(e.pointerId);
	};
	const onMove = (e) => {
		if (!dragging) return;
		aim.x += (e.clientX - lastX) * .005;
		aim.y = MathUtils.clamp(aim.y + (e.clientY - lastY) * .004, -.9, .9);
		lastX = e.clientX;
		lastY = e.clientY;
	};
	const onUp = (e) => {
		dragging = false;
		try {
			canvas.releasePointerCapture(e.pointerId);
		} catch {}
	};
	const onClick = (e) => {
		const r = canvas.getBoundingClientRect();
		ndc.x = (e.clientX - r.left) / r.width * 2 - 1;
		ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
		ray.setFromCamera(ndc, camera);
		const hits = ray.intersectObjects(pickables);
		if (picked) picked.scale.setScalar(1);
		picked = hits[0]?.object ?? null;
		if (picked) {
			picked.scale.setScalar(1.7);
			opts.onPick(picked.userData.pick);
		} else opts.onPick(null);
	};
	canvas.addEventListener("pointerdown", onDown);
	canvas.addEventListener("pointermove", onMove);
	canvas.addEventListener("pointerup", onUp);
	canvas.addEventListener("click", onClick);
	let last = performance.now();
	let alive = true;
	let raf = 0;
	const loop = (now) => {
		if (!alive) return;
		const dt = Math.min((now - last) / 1e3, .1);
		last = now;
		if (!opts.reduced && !dragging) aim.x += dt * .16;
		rotY += (aim.x - rotY) * Math.min(1, dt * 6);
		rotX += (aim.y - rotX) * Math.min(1, dt * 6);
		const dist = 15;
		camera.position.set(Math.sin(rotY) * Math.cos(rotX) * dist, Math.sin(rotX) * dist * .65 + 1.2, Math.cos(rotY) * Math.cos(rotX) * dist);
		camera.lookAt(0, 0, 0);
		core.rotation.y += dt * .15;
		inner.rotation.y -= dt * .22;
		renderer.render(scene, camera);
		raf = requestAnimationFrame(loop);
	};
	raf = requestAnimationFrame(loop);
	return () => {
		alive = false;
		cancelAnimationFrame(raf);
		ro.disconnect();
		canvas.removeEventListener("pointerdown", onDown);
		canvas.removeEventListener("pointermove", onMove);
		canvas.removeEventListener("pointerup", onUp);
		canvas.removeEventListener("click", onClick);
		coreGeo.dispose();
		orbGeo.dispose();
		habGeo.dispose();
		lg.dispose();
		dustGeo.dispose();
		renderer.dispose();
	};
}
function BiosferaPage() {
	const reduced = useReducedMotion();
	const [pick, setPick] = (0, import_react.useState)(null);
	const start = (0, import_react.useCallback)((c) => startBiosfera(c, {
		reduced: reduced.current,
		onPick: setPick
	}), [reduced]);
	const flora = SPECIE.filter((s) => s.gruppo === "flora").length;
	const fauna = SPECIE.filter((s) => s.gruppo === "fauna").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-dvh overflow-hidden bg-navy-deep text-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebGLHost, { start }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabTop, {
				code: "03",
				title: "Biosfera"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-x-0 top-20 z-10 px-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[0.7rem] uppercase tracking-[0.2em] text-copper-light",
						children: "Esperimento 03"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-3xl md:text-4xl",
						children: "Flora e fauna"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-2 max-w-md text-sm text-cream-soft",
						children: "Anello interno oliva: piante. Anello rame: animali. Nucleo crema: i quattro habitat. Stesso schedario del Portale, con foto."
					})
				]
			}),
			pick?.kind === "specie" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-16 left-4 z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchedaSpecie, { s: pick.specie })
			}) : null,
			pick?.kind === "habitat" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "absolute bottom-16 left-4 z-10 max-w-sm rounded-xl border border-cream/15 bg-navy-deep/90 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[0.68rem] uppercase tracking-[0.16em] text-copper-light",
						children: "Habitat"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl",
						children: pick.titolo
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-cream-soft",
						children: pick.testo
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/natura",
						className: "mt-4 inline-flex min-h-11 items-center text-sm text-olive-light",
						children: "Schede nel Portale"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Telemetry, { items: [
				`${flora} flora`,
				`${fauna} fauna`,
				"4 habitat",
				pick?.kind === "specie" ? pick.specie.scientifico : "stesso dataset"
			] })
		]
	});
}
//#endregion
export { BiosferaPage as component };
