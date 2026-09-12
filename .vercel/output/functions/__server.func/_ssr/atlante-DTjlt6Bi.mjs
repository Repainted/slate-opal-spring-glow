import { i as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as cn, y as COMUNI } from "./router-CnNVtgAG.mjs";
import { C as PerspectiveCamera, D as Raycaster, N as Vector2, P as Vector3, _ as MathUtils, k as Scene, u as FogExp2 } from "../_libs/three.mjs";
import { _ as useReducedMotion, c as buildTerrain, f as makeNodes, g as resizeRenderer, i as Telemetry, l as copperDust, n as NODE_POINTS, o as WebGLHost, p as makeRenderer, s as addDuskLights, t as LabTop, u as duskSky } from "./geo-B1aj5SiK.mjs";
import { t as SchedaComune } from "./Schede-ChiCXenD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atlante-DTjlt6Bi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function startAtlante(canvas, opts) {
	const renderer = makeRenderer(canvas);
	const scene = new Scene();
	scene.fog = new FogExp2(1512986, .016);
	const camera = new PerspectiveCamera(52, 1, .2, 220);
	const sky = duskSky();
	scene.add(sky);
	addDuskLights(scene);
	const terrain = buildTerrain(canvas.clientWidth < 640 ? 56 : 88);
	scene.add(terrain.mesh);
	const nodes = makeNodes();
	scene.add(nodes.group);
	const dust = copperDust(50);
	scene.add(dust);
	const parent = canvas.parentElement ?? canvas;
	const resize = () => resizeRenderer(renderer, camera, parent);
	resize();
	const ro = new ResizeObserver(resize);
	ro.observe(parent);
	let dragging = false;
	let lastX = 0;
	let lastY = 0;
	let moved = 0;
	let rotY = .55;
	let rotX = .32;
	const target = new Vector2(rotY, rotX);
	const look = new Vector3(0, 5, 0);
	const want = new Vector3();
	const ray = new Raycaster();
	const ndc = new Vector2();
	const proj = new Vector3();
	let lastHud = 0;
	const onDown = (e) => {
		dragging = true;
		moved = 0;
		lastX = e.clientX;
		lastY = e.clientY;
		canvas.setPointerCapture(e.pointerId);
	};
	const onMove = (e) => {
		if (!dragging) return;
		const dx = e.clientX - lastX;
		const dy = e.clientY - lastY;
		moved += Math.abs(dx) + Math.abs(dy);
		target.x -= dx * .005;
		target.y = MathUtils.clamp(target.y + dy * .004, .08, .95);
		lastX = e.clientX;
		lastY = e.clientY;
	};
	const onUp = (e) => {
		dragging = false;
		try {
			canvas.releasePointerCapture(e.pointerId);
		} catch {}
		if (moved > 8) return;
		const r = canvas.getBoundingClientRect();
		ndc.x = (e.clientX - r.left) / r.width * 2 - 1;
		ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
		ray.setFromCamera(ndc, camera);
		const hit = ray.intersectObjects(nodes.meshes)[0];
		if (hit?.object.userData.slug) opts.onPick(hit.object.userData.slug);
	};
	canvas.addEventListener("pointerdown", onDown);
	canvas.addEventListener("pointermove", onMove);
	canvas.addEventListener("pointerup", onUp);
	let last = performance.now();
	let alive = true;
	let raf = 0;
	const loop = (now) => {
		if (!alive) return;
		const dt = Math.min((now - last) / 1e3, .1);
		last = now;
		if (!opts.reduced && !dragging) target.x += dt * .07;
		rotY += (target.x - rotY) * Math.min(1, dt * 5);
		rotX += (target.y - rotX) * Math.min(1, dt * 5);
		const slug = opts.getSlug();
		const focus = NODE_POINTS.find((n) => n.slug === slug);
		if (focus) want.set(focus.x, focus.y + .6, focus.z);
		else want.set(0, 5, 0);
		look.lerp(want, 1 - Math.exp(-3 * dt));
		const radius = focus ? 15 : 46;
		const height = focus ? 7 : 18;
		camera.position.set(look.x + Math.sin(rotY) * radius, look.y + height * Math.sin(rotX) + 4, look.z + Math.cos(rotY) * radius);
		camera.lookAt(look);
		const pulse = 1 + Math.sin(now * .003) * .1;
		for (const m of nodes.meshes) m.scale.setScalar((m.userData.slug === slug ? 2.1 : 1) * pulse);
		dust.rotation.y += dt * .03;
		renderer.render(scene, camera);
		if (now - lastHud > 180) {
			lastHud = now;
			const w = parent.clientWidth || 1;
			const h = parent.clientHeight || 1;
			const labels = [];
			for (const n of NODE_POINTS) {
				if (slug && n.slug !== slug) {
					if ((n.x - look.x) ** 2 + (n.z - look.z) ** 2 > 380) continue;
				}
				proj.set(n.x, n.y + 1.4, n.z).project(camera);
				if (proj.z > 1) continue;
				labels.push({
					slug: n.slug,
					nome: n.nome,
					x: (proj.x * .5 + .5) * w,
					y: (-proj.y * .5 + .5) * h,
					tci: n.bandieraArancione
				});
			}
			if (!slug) {
				labels.sort((a, b) => a.nome.localeCompare(b.nome));
				opts.onHud({ labels: labels.slice(0, 8) });
			} else opts.onHud({ labels });
		}
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
function AtlantePage() {
	const reduced = useReducedMotion();
	const slugRef = (0, import_react.useRef)("sermoneta");
	const [slug, setSlug] = (0, import_react.useState)("sermoneta");
	const [labels, setLabels] = (0, import_react.useState)([]);
	const comune = COMUNI.find((c) => c.slug === slug) ?? COMUNI[0];
	const start = (0, import_react.useCallback)((c) => startAtlante(c, {
		reduced: reduced.current,
		getSlug: () => slugRef.current,
		onPick: (s) => {
			slugRef.current = s;
			setSlug(s);
		},
		onHud: (h) => setLabels(h.labels)
	}), [reduced]);
	const pick = (s) => {
		slugRef.current = s;
		setSlug(s);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-dvh overflow-hidden bg-navy-deep text-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebGLHost, { start }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabTop, {
				code: "00",
				title: "Atlante"
			}),
			labels.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => pick(l.slug),
				className: "pointer-events-auto absolute z-10 hidden -translate-x-1/2 font-mono text-[0.65rem] text-cream drop-shadow md:block",
				style: {
					left: l.x,
					top: l.y
				},
				children: [l.nome, l.tci ? " ·" : ""]
			}, l.slug)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-16 left-4 z-20 md:bottom-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchedaComune, { c: comune })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "absolute bottom-4 left-0 right-0 z-20 flex flex-nowrap gap-2 overflow-x-auto px-4 pb-1 md:bottom-auto md:left-auto md:right-4 md:top-20 md:w-52 md:flex-col md:flex-wrap md:overflow-y-auto md:px-0",
				"aria-label": "26 comuni",
				children: COMUNI.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => pick(c.slug),
					className: cn("min-h-10 shrink-0 rounded-full border px-3 text-left text-sm", c.slug === slug ? "border-copper bg-copper/20 text-cream" : "border-cream/15 bg-navy-deep/70 text-cream-soft"),
					children: c.nome
				}, c.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Telemetry, { items: [
				"26 schede",
				"stesso dataset del Portale",
				comune.nome
			] })
		]
	});
}
//#endregion
export { AtlantePage as component };
