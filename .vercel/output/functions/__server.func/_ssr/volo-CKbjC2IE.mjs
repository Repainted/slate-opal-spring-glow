import { i as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as PerspectiveCamera, _ as MathUtils, b as MeshStandardMaterial, d as Group, k as Scene, n as BoxGeometry, o as ConeGeometry, u as FogExp2, v as Mesh } from "../_libs/three.mjs";
import { _ as useReducedMotion, a as TouchKeys, c as buildTerrain, d as heightAt, f as makeNodes, g as resizeRenderer, i as Telemetry, l as copperDust, m as nearestNode, o as WebGLHost, p as makeRenderer, r as PlayGate, s as addDuskLights, t as LabTop, u as duskSky } from "./geo-B1aj5SiK.mjs";
import { t as SchedaComune } from "./Schede-ChiCXenD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/volo-CKbjC2IE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function startVolo(canvas, opts) {
	const renderer = makeRenderer(canvas);
	const scene = new Scene();
	scene.fog = new FogExp2(1512986, .018);
	const camera = new PerspectiveCamera(58, 1, .2, 220);
	const sky = duskSky();
	scene.add(sky);
	addDuskLights(scene);
	const terrain = buildTerrain(canvas.clientWidth < 640 ? 64 : 96);
	scene.add(terrain.mesh);
	const nodes = makeNodes();
	scene.add(nodes.group);
	const dust = copperDust(70);
	scene.add(dust);
	const craft = new Group();
	const body = new Mesh(new ConeGeometry(.28, 1.6, 6), new MeshStandardMaterial({
		color: 15589576,
		metalness: .4,
		roughness: .45
	}));
	body.rotation.x = Math.PI / 2;
	const wing = new Mesh(new BoxGeometry(1.6, .06, .35), new MeshStandardMaterial({
		color: 11891002,
		metalness: .5,
		roughness: .4
	}));
	craft.add(body, wing);
	craft.position.set(0, heightAt(0, 18) + 9, 18);
	scene.add(craft);
	let yaw = 0;
	let speed = 0;
	let altBias = 9;
	const injected = /* @__PURE__ */ new Set();
	const held = (c) => opts.keys.has(c) || injected.has(c);
	const probe = {
		getYaw: () => yaw,
		getSpeed: () => speed,
		setKeys: (codes) => {
			injected.clear();
			for (const k of codes) injected.add(k);
		}
	};
	window.__controlsTest = probe;
	const parent = canvas.parentElement ?? canvas;
	const resize = () => resizeRenderer(renderer, camera, parent);
	resize();
	const ro = new ResizeObserver(resize);
	ro.observe(parent);
	let acc = 0;
	let last = performance.now();
	let fpsT = 0;
	let frames = 0;
	let hudFps = 60;
	let cinematic = 0;
	let raf = 0;
	let alive = true;
	let lastHud = 0;
	let lastSlug = "";
	const fx = () => -Math.sin(yaw);
	const fz = () => -Math.cos(yaw);
	const loop = (now) => {
		if (!alive) return;
		const dt = Math.min((now - last) / 1e3, .1);
		last = now;
		frames++;
		fpsT += dt;
		if (fpsT >= .4) {
			hudFps = Math.round(frames / fpsT);
			frames = 0;
			fpsT = 0;
		}
		if (!opts.getPlaying() || opts.reduced) {
			cinematic += dt * (opts.reduced ? 0 : .12);
			const r = 42;
			camera.position.set(Math.sin(cinematic) * r, 20, Math.cos(cinematic) * r);
			camera.lookAt(0, 5, 0);
			craft.position.set(Math.sin(cinematic + .4) * 18, 14, Math.cos(cinematic + .4) * 18);
			craft.lookAt(craft.position.x - Math.sin(cinematic + .4), 14, craft.position.z - Math.cos(cinematic + .4));
		} else {
			let steer = 0;
			if (held("KeyA") || held("ArrowLeft")) steer += 1;
			if (held("KeyD") || held("ArrowRight")) steer -= 1;
			yaw += steer * 1.35 * dt;
			let throttle = 0;
			if (held("KeyW") || held("ArrowUp")) throttle += 1;
			if (held("KeyS") || held("ArrowDown")) throttle -= .6;
			speed += (throttle * 18 - speed) * Math.min(1, dt * 2.2);
			if (held("Space")) altBias += 8 * dt;
			if (held("KeyC") || held("ShiftLeft")) altBias -= 8 * dt;
			const fxx = fx();
			const fzz = fz();
			craft.position.x += fxx * speed * dt;
			craft.position.z += fzz * speed * dt;
			const floor = heightAt(craft.position.x, craft.position.z) + 2.2;
			altBias = Math.max(2.2, Math.min(28, altBias));
			craft.position.y = MathUtils.damp(craft.position.y, floor + (altBias - 2.2), 4, dt);
			craft.rotation.y = yaw;
			craft.rotation.z = MathUtils.damp(craft.rotation.z, steer * .35, 8, dt);
			const camX = craft.position.x - fxx * 9;
			const camZ = craft.position.z - fzz * 9;
			camera.position.x = MathUtils.damp(camera.position.x, camX, 5, dt);
			camera.position.y = MathUtils.damp(camera.position.y, craft.position.y + 3.2, 5, dt);
			camera.position.z = MathUtils.damp(camera.position.z, camZ, 5, dt);
			camera.lookAt(craft.position.x, craft.position.y + .4, craft.position.z);
		}
		acc += dt;
		const near = nearestNode(craft.position.x, craft.position.z);
		const dist = Math.hypot(near.x - craft.position.x, near.z - craft.position.z);
		const pulse = 1 + Math.sin(acc * 3) * .12;
		for (const m of nodes.meshes) m.scale.setScalar((m.userData.slug === near.slug && dist < 16 ? 2 : 1) * pulse);
		dust.rotation.y += dt * .03;
		renderer.render(scene, camera);
		if (near.slug !== lastSlug || now - lastHud > 200) {
			lastSlug = near.slug;
			lastHud = now;
			opts.onHud({
				fps: hudFps,
				nearest: near.nome,
				slug: near.slug,
				headline: near.headline,
				provincia: near.provincia,
				altitudine: near.altitudine,
				tci: near.bandieraArancione,
				daVedere: near.daVedere,
				dist,
				alt: Math.round(craft.position.y * 80 + 200),
				calls: renderer.info.render.calls
			});
		}
		raf = requestAnimationFrame(loop);
	};
	raf = requestAnimationFrame(loop);
	return {
		probe,
		dispose: () => {
			alive = false;
			cancelAnimationFrame(raf);
			ro.disconnect();
			if (window.__controlsTest === probe) delete window.__controlsTest;
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
			body.geometry.dispose();
			body.material.dispose();
			wing.geometry.dispose();
			wing.material.dispose();
			renderer.dispose();
		}
	};
}
var EMPTY = {
	fps: 0,
	nearest: "—",
	slug: "sermoneta",
	headline: "",
	provincia: "Latina",
	altitudine: 0,
	tci: false,
	daVedere: [],
	dist: 99,
	alt: 0,
	calls: 0
};
function VoloPage() {
	const keys = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const playing = (0, import_react.useRef)(false);
	const reduced = useReducedMotion();
	const [open, setOpen] = (0, import_react.useState)(true);
	const [hud, setHud] = (0, import_react.useState)(EMPTY);
	(0, import_react.useEffect)(() => {
		const down = (e) => {
			keys.current.add(e.code);
			if ([
				"Space",
				"ArrowUp",
				"ArrowDown"
			].includes(e.code)) e.preventDefault();
		};
		const up = (e) => keys.current.delete(e.code);
		const blur = () => keys.current.clear();
		window.addEventListener("keydown", down);
		window.addEventListener("keyup", up);
		window.addEventListener("blur", blur);
		return () => {
			window.removeEventListener("keydown", down);
			window.removeEventListener("keyup", up);
			window.removeEventListener("blur", blur);
		};
	}, []);
	const start = (0, import_react.useCallback)((canvas) => startVolo(canvas, {
		keys: keys.current,
		getPlaying: () => playing.current,
		reduced: reduced.current,
		onHud: setHud
	}).dispose, [reduced]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-dvh overflow-hidden bg-navy-deep text-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebGLHost, { start }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabTop, {
				code: "01",
				title: "Volo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGate, {
				open,
				kicker: "Esperimento 01",
				title: "Prendi il drone",
				hint: "W accelera, A/D virata (A naso a sinistra), Space sale, C scende. Vicino a un nodo appare la scheda del comune.",
				onPlay: () => {
					playing.current = true;
					setOpen(false);
				}
			}),
			!open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				hud.dist < 18 && hud.headline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-28 left-4 z-20 md:bottom-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchedaComune, { c: {
						slug: hud.slug,
						nome: hud.nearest,
						provincia: hud.provincia,
						altitudine: hud.altitudine,
						headline: hud.headline,
						daVedere: hud.daVedere,
						bandieraArancione: hud.tci
					} })
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Telemetry, { items: [
					`${hud.fps} fps`,
					hud.nearest,
					`${hud.alt} m`,
					`${hud.calls} draw`
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchKeys, {
					keys: keys.current,
					extra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-12 rounded-full border border-cream/20 bg-navy-deep/70 px-4 text-sm",
							onPointerDown: () => keys.current.add("Space"),
							onPointerUp: () => keys.current.delete("Space"),
							children: "Sale"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-12 rounded-full border border-cream/20 bg-navy-deep/70 px-4 text-sm",
							onPointerDown: () => keys.current.add("KeyC"),
							onPointerUp: () => keys.current.delete("KeyC"),
							children: "Scende"
						})]
					})
				})
			] }) : null
		]
	});
}
//#endregion
export { VoloPage as component };
