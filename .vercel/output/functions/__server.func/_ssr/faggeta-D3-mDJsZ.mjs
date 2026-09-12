import { i as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as SPECIE } from "./router-CnNVtgAG.mjs";
import { C as PerspectiveCamera, P as Vector3, _ as MathUtils, b as MeshStandardMaterial, k as Scene, m as InstancedMesh, o as ConeGeometry, s as CylinderGeometry, u as FogExp2, x as Object3D } from "../_libs/three.mjs";
import { _ as useReducedMotion, c as buildTerrain, d as heightAt, g as resizeRenderer, i as Telemetry, o as WebGLHost, p as makeRenderer, r as PlayGate, s as addDuskLights, t as LabTop, u as duskSky } from "./geo-B1aj5SiK.mjs";
import { r as SchedaSpecie } from "./Schede-ChiCXenD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faggeta-D3-mDJsZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function startFaggeta(canvas, opts) {
	const mobile = (canvas.clientWidth || 800) < 640;
	const renderer = makeRenderer(canvas);
	const scene = new Scene();
	scene.fog = new FogExp2(1184784, .045);
	const camera = new PerspectiveCamera(68, 1, .12, 90);
	const sky = duskSky();
	scene.add(sky);
	addDuskLights(scene);
	const terrain = buildTerrain(mobile ? 56 : 80);
	scene.add(terrain.mesh);
	const forward = new Vector3();
	const right = new Vector3();
	const n = mobile ? 55 : 110;
	const trunkGeo = new CylinderGeometry(.18, .28, 4.2, 6);
	const canopyGeo = new ConeGeometry(1.6, 5.4, 7);
	const trunkMat = new MeshStandardMaterial({
		color: 3814184,
		roughness: .9
	});
	const canopyMat = new MeshStandardMaterial({
		color: 4872754,
		roughness: .85
	});
	const trunks = new InstancedMesh(trunkGeo, trunkMat, n);
	const canopies = new InstancedMesh(canopyGeo, canopyMat, n);
	const dummy = new Object3D();
	const trees = [];
	let placed = 0;
	let guard = 0;
	while (placed < n && guard < 800) {
		guard++;
		const x = (Math.random() - .5) * 70;
		const z = (Math.random() - .5) * 70;
		const y = heightAt(x, z);
		if (y < 4 || y > 14) continue;
		dummy.position.set(x, y + 2.1, z);
		dummy.rotation.y = Math.random() * Math.PI;
		dummy.updateMatrix();
		trunks.setMatrixAt(placed, dummy.matrix);
		dummy.position.y = y + 5.4;
		dummy.scale.setScalar(.75 + Math.random() * .5);
		dummy.updateMatrix();
		canopies.setMatrixAt(placed, dummy.matrix);
		trees.push({
			x,
			z,
			r: 1.15
		});
		placed++;
	}
	trunks.instanceMatrix.needsUpdate = true;
	canopies.instanceMatrix.needsUpdate = true;
	scene.add(trunks, canopies);
	let yaw = 0;
	let pitch = .12;
	const pos = new Vector3(2, heightAt(2, 12) + 1.7, 12);
	camera.position.copy(pos);
	const parent = canvas.parentElement ?? canvas;
	const resize = () => resizeRenderer(renderer, camera, parent);
	resize();
	const ro = new ResizeObserver(resize);
	ro.observe(parent);
	let last = performance.now();
	let fpsT = 0;
	let frames = 0;
	let hudFps = 60;
	let alive = true;
	let raf = 0;
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
		if (opts.getPlaying()) {
			yaw -= opts.look.dx * .0022;
			pitch -= opts.look.dy * .002;
			pitch = Math.max(-1.2, Math.min(1.1, pitch));
			opts.look.dx = 0;
			opts.look.dy = 0;
			forward.set(-Math.sin(yaw), 0, -Math.cos(yaw));
			right.set(Math.cos(yaw), 0, -Math.sin(yaw));
			let mx = opts.move.x;
			let my = opts.move.y;
			if (opts.keys.has("KeyW") || opts.keys.has("ArrowUp")) my += 1;
			if (opts.keys.has("KeyS") || opts.keys.has("ArrowDown")) my -= 1;
			if (opts.keys.has("KeyD") || opts.keys.has("ArrowRight")) mx += 1;
			if (opts.keys.has("KeyA") || opts.keys.has("ArrowLeft")) mx -= 1;
			const mag = Math.hypot(mx, my);
			if (mag > 1) {
				mx /= mag;
				my /= mag;
			}
			const speed = 6.5;
			pos.addScaledVector(forward, my * speed * dt);
			pos.addScaledVector(right, mx * speed * dt);
			for (const t of trees) {
				const dx = pos.x - t.x;
				const dz = pos.z - t.z;
				const d = Math.hypot(dx, dz);
				if (d < t.r && d > .001) {
					pos.x = t.x + dx / d * t.r;
					pos.z = t.z + dz / d * t.r;
				}
			}
			pos.x = MathUtils.clamp(pos.x, -38, 38);
			pos.z = MathUtils.clamp(pos.z, -38, 38);
			pos.y = heightAt(pos.x, pos.z) + 1.7;
		}
		camera.position.copy(pos);
		camera.rotation.order = "YXZ";
		camera.rotation.y = yaw;
		camera.rotation.x = pitch;
		renderer.render(scene, camera);
		const deg = (yaw * 180 / Math.PI + 360) % 360;
		opts.onHud({
			fps: hudFps,
			heading: [
				"N",
				"NE",
				"E",
				"SE",
				"S",
				"SO",
				"O",
				"NO"
			][Math.round(deg / 45) % 8]
		});
		raf = requestAnimationFrame(loop);
	};
	raf = requestAnimationFrame(loop);
	return () => {
		alive = false;
		cancelAnimationFrame(raf);
		ro.disconnect();
		terrain.geo.dispose();
		terrain.mat.dispose();
		sky.geometry.dispose();
		sky.material.dispose();
		trunkGeo.dispose();
		canopyGeo.dispose();
		trunkMat.dispose();
		canopyMat.dispose();
		renderer.dispose();
	};
}
function FaggetaPage() {
	const keys = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const move = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const look = (0, import_react.useRef)({
		dx: 0,
		dy: 0
	});
	const playing = (0, import_react.useRef)(false);
	const reduced = useReducedMotion();
	const [open, setOpen] = (0, import_react.useState)(true);
	const [hud, setHud] = (0, import_react.useState)({
		fps: 0,
		heading: "N"
	});
	const drag = (0, import_react.useRef)(false);
	const last = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const host = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const down = (e) => keys.current.add(e.code);
		const up = (e) => keys.current.delete(e.code);
		window.addEventListener("keydown", down);
		window.addEventListener("keyup", up);
		return () => {
			window.removeEventListener("keydown", down);
			window.removeEventListener("keyup", up);
		};
	}, []);
	const start = (0, import_react.useCallback)((canvas) => startFaggeta(canvas, {
		keys: keys.current,
		move: move.current,
		look: look.current,
		getPlaying: () => playing.current,
		reduced: reduced.current,
		onHud: setHud
	}), [reduced]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: host,
		className: "relative h-dvh overflow-hidden bg-navy-deep text-cream",
		onPointerDown: (e) => {
			if (open) return;
			drag.current = true;
			last.current = {
				x: e.clientX,
				y: e.clientY
			};
			e.target.setPointerCapture?.(e.pointerId);
		},
		onPointerMove: (e) => {
			if (!drag.current) return;
			look.current.dx += e.clientX - last.current.x;
			look.current.dy += e.clientY - last.current.y;
			last.current = {
				x: e.clientX,
				y: e.clientY
			};
		},
		onPointerUp: () => {
			drag.current = false;
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebGLHost, { start }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabTop, {
				code: "02",
				title: "Faggeta"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGate, {
				open,
				kicker: "Esperimento 02",
				title: "Entra nella faggeta",
				hint: "Trascina per guardare. WASD per camminare. A e D sono laterali, non virate.",
				onPlay: () => {
					playing.current = true;
					setOpen(false);
				}
			}),
			!open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-28 left-4 z-20 max-w-sm md:bottom-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchedaSpecie, { s: SPECIE.find((s) => s.scientifico === "Fagus sylvatica") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 px-1 font-mono text-[0.68rem] text-muted",
						children: ["In queste faggete: ", SPECIE.find((s) => s.scientifico === "Dryocopus martius")?.comune]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Telemetry, { items: [
					`${hud.fps} fps`,
					hud.heading,
					"Fagus sylvatica"
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-16 left-4 z-10 md:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stick, { onVec: (x, y) => Object.assign(move.current, {
						x,
						y
					}) })
				})
			] }) : null
		]
	});
}
function Stick({ onVec }) {
	const origin = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative size-28 rounded-full border border-cream/20 bg-navy-deep/60",
		onPointerDown: (e) => {
			origin.current = {
				x: e.clientX,
				y: e.clientY
			};
			e.stopPropagation();
			e.currentTarget.setPointerCapture(e.pointerId);
		},
		onPointerMove: (e) => {
			if (e.buttons === 0 && e.pointerType !== "touch") return;
			const dx = e.clientX - origin.current.x;
			const dy = e.clientY - origin.current.y;
			const m = Math.hypot(dx, dy) || 1;
			const s = Math.min(1, m / 48);
			onVec(dx / m * s, -dy / m * s);
		},
		onPointerUp: () => onVec(0, 0),
		onPointerCancel: () => onVec(0, 0)
	});
}
//#endregion
export { FaggetaPage as component };
