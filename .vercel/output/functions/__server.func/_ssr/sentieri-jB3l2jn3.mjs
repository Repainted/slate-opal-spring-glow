import { i as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as cn, d as SENTIERI, y as COMUNI } from "./router-CnNVtgAG.mjs";
import { C as PerspectiveCamera, D as Raycaster, M as TubeGeometry, N as Vector2, P as Vector3, S as OctahedronGeometry, _ as MathUtils, a as CatmullRomCurve3, j as SphereGeometry, k as Scene, u as FogExp2, v as Mesh, y as MeshBasicMaterial } from "../_libs/three.mjs";
import { _ as useReducedMotion, c as buildTerrain, d as heightAt, f as makeNodes, g as resizeRenderer, h as projectComune, i as Telemetry, l as copperDust, o as WebGLHost, p as makeRenderer, s as addDuskLights, t as LabTop, u as duskSky } from "./geo-B1aj5SiK.mjs";
import { n as SchedaSentiero } from "./Schede-ChiCXenD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sentieri-jB3l2jn3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Vette e luoghi che non sono un comune. Quote da cartografia; la geometria sul modello resta schematica. */
var QUOTE = {
	semprevisa: {
		id: "semprevisa",
		nome: "Monte Semprevisa",
		lat: 41.575,
		lng: 13.115,
		m: 1536
	},
	lupone: {
		id: "lupone",
		nome: "Monte Lupone",
		lat: 41.665,
		lng: 12.975,
		m: 1378
	},
	ninfa: {
		id: "ninfa",
		nome: "Giardini di Ninfa",
		lat: 41.583,
		lng: 12.954,
		m: 30
	},
	fossanova: {
		id: "fossanova",
		nome: "Abbazia di Fossanova",
		lat: 41.439,
		lng: 13.196,
		m: 18
	}
};
function comuneNode(slug) {
	const c = COMUNI.find((n) => n.slug === slug);
	if (!c) throw new Error(`comune ${slug}`);
	const p = projectComune(c.lng, c.lat);
	return {
		nome: c.nome,
		x: p.x,
		z: p.z
	};
}
function quotaNode(id) {
	const q = QUOTE[id];
	const p = projectComune(q.lng, q.lat);
	return {
		nome: q.nome,
		x: p.x,
		z: p.z
	};
}
function drapeSegment(a, b, steps, ridge) {
	const pts = [];
	const dx = b.x - a.x;
	const dz = b.z - a.z;
	const len = Math.hypot(dx, dz) || 1;
	const px = -dz / len;
	const pz = dx / len;
	for (let i = 0; i <= steps; i++) {
		const t = i / steps;
		let x = a.x + dx * t;
		let z = a.z + dz * t;
		if (ridge) {
			let bestH = heightAt(x, z);
			let bx = x;
			let bz = z;
			for (const s of [
				-3.2,
				-1.6,
				0,
				1.6,
				3.2
			]) {
				const hx = x + px * s;
				const hz = z + pz * s;
				const h = heightAt(hx, hz);
				if (h > bestH) {
					bestH = h;
					bx = hx;
					bz = hz;
				}
			}
			x = bx;
			z = bz;
		}
		pts.push({
			x,
			y: heightAt(x, z) + .85,
			z
		});
	}
	return pts;
}
function join(nodes, ridge, closed) {
	const steps = ridge ? 18 : 10;
	const out = [];
	const n = closed ? nodes.length : nodes.length - 1;
	for (let i = 0; i < n; i++) {
		const a = nodes[i];
		const b = nodes[(i + 1) % nodes.length];
		const seg = drapeSegment(a, b, steps, ridge);
		if (out.length) seg.shift();
		out.push(...seg);
	}
	if (closed && out.length > 2) {
		const a = out[0];
		const b = out[out.length - 1];
		if (Math.hypot(a.x - b.x, a.z - b.z) < .2) out.pop();
	}
	return out;
}
function loopAround(center, rx, rz, steps = 28) {
	const out = [];
	for (let i = 0; i < steps; i++) {
		const t = i / steps * Math.PI * 2;
		const x = center.x + Math.cos(t) * rx;
		const z = center.z + Math.sin(t) * rz;
		out.push({
			x,
			y: heightAt(x, z) + .48,
			z
		});
	}
	return out;
}
var SPEC = {
	semprevisa: {
		ridge: true,
		build: () => ({ tappe: [
			comuneNode("bassiano"),
			comuneNode("carpineto-romano"),
			quotaNode("semprevisa")
		] })
	},
	"cai-701": {
		ridge: true,
		build: () => ({ tappe: [comuneNode("cori"), quotaNode("lupone")] })
	},
	"cai-702": {
		ridge: true,
		build: () => ({ tappe: [comuneNode("segni"), quotaNode("lupone")] })
	},
	"cai-736": {
		closed: true,
		build: () => {
			const c = comuneNode("rocca-massima");
			return {
				tappe: [c],
				punti: loopAround(c, 5.4, 4.1)
			};
		}
	},
	"norba-ninfa": { build: () => ({ tappe: [
		comuneNode("norma"),
		quotaNode("ninfa"),
		comuneNode("sermoneta")
	] }) },
	fossanova: { build: () => ({ tappe: [comuneNode("priverno"), quotaNode("fossanova")] }) },
	"mura-segni": {
		closed: true,
		build: () => {
			const c = comuneNode("segni");
			return {
				tappe: [c],
				punti: loopAround(c, 2.8, 2.2, 20)
			};
		}
	},
	"crinale-lento": {
		ridge: true,
		build: () => ({ tappe: [
			comuneNode("gorga"),
			comuneNode("montelanico"),
			comuneNode("bassiano")
		] })
	}
};
var TRACCE = SENTIERI.map((s) => {
	const spec = SPEC[s.slug] ?? { build: () => ({ tappe: s.comuni.map(comuneNode) }) };
	const { tappe, punti } = spec.build();
	const closed = Boolean(spec.closed);
	const ridge = Boolean(spec.ridge);
	return {
		slug: s.slug,
		closed,
		ridge,
		schematic: true,
		tappe,
		punti: punti ?? join(tappe, ridge, closed)
	};
});
function getTraccia(slug) {
	return TRACCE.find((t) => t.slug === slug);
}
function profilo(punti) {
	if (punti.length < 2) return {
		km: 0,
		gain: 0,
		samples: []
	};
	let km = 0;
	let gain = 0;
	const samples = [punti[0].y];
	for (let i = 1; i < punti.length; i++) {
		const a = punti[i - 1];
		const b = punti[i];
		km += Math.hypot(b.x - a.x, b.z - a.z) * .46;
		const dy = b.y - a.y;
		if (dy > 0) gain += dy * 42;
		samples.push(b.y);
	}
	return {
		km,
		gain,
		samples
	};
}
var COL = {
	T: 15589576,
	E: 13536078,
	EE: 9149030
};
function curveOf(punti, closed) {
	const vecs = punti.map((p) => new Vector3(p.x, p.y, p.z));
	return new CatmullRomCurve3(vecs, closed, "catmullrom", .35);
}
function startSentieri3d(canvas, opts) {
	const renderer = makeRenderer(canvas);
	const scene = new Scene();
	scene.fog = new FogExp2(1512986, .015);
	const camera = new PerspectiveCamera(54, 1, .2, 220);
	const sky = duskSky();
	scene.add(sky);
	addDuskLights(scene);
	const terrain = buildTerrain(canvas.clientWidth < 640 ? 56 : 88);
	scene.add(terrain.mesh);
	const nodes = makeNodes();
	scene.add(nodes.group);
	const dust = copperDust(40);
	scene.add(dust);
	const tubes = [];
	const geos = [];
	for (const tr of TRACCE) {
		const sent = SENTIERI.find((s) => s.slug === tr.slug);
		const curve = curveOf(tr.punti, tr.closed);
		const geo = new TubeGeometry(curve, Math.max(48, tr.punti.length * 2), .55, 6, tr.closed);
		geos.push(geo);
		const mat = new MeshBasicMaterial({
			color: COL[sent?.difficolta ?? "E"] ?? 11891002,
			transparent: true,
			opacity: .32
		});
		const mesh = new Mesh(geo, mat);
		mesh.userData.slug = tr.slug;
		scene.add(mesh);
		tubes.push({
			slug: tr.slug,
			mesh,
			curve,
			mat
		});
	}
	const walkerGeo = new SphereGeometry(.55, 12, 10);
	const walkerMat = new MeshBasicMaterial({ color: 15589576 });
	const walker = new Mesh(walkerGeo, walkerMat);
	scene.add(walker);
	const peakGeo = new OctahedronGeometry(.7, 0);
	const peakMat = new MeshBasicMaterial({ color: 15589576 });
	const peaks = [];
	for (const q of Object.values(QUOTE)) {
		const p = projectComune(q.lng, q.lat);
		const m = new Mesh(peakGeo, peakMat);
		m.position.set(p.x, heightAt(p.x, p.z) + 1.4, p.z);
		scene.add(m);
		peaks.push(m);
	}
	const parent = canvas.parentElement ?? canvas;
	const resize = () => resizeRenderer(renderer, camera, parent);
	resize();
	const ro = new ResizeObserver(resize);
	ro.observe(parent);
	let dragging = false;
	let lastX = 0;
	let lastY = 0;
	let moved = 0;
	let rotY = .7;
	let rotX = .38;
	const aim = new Vector2(rotY, rotX);
	const look = new Vector3(0, 6, 0);
	const want = new Vector3();
	const tmp = new Vector3();
	const tan = new Vector3();
	const ray = new Raycaster();
	const ndc = new Vector2();
	let walkT = 0;
	let walkDir = 1;
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
		aim.x -= dx * .005;
		aim.y = MathUtils.clamp(aim.y + dy * .004, .1, .95);
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
		const hit = ray.intersectObjects(tubes.map((t) => t.mesh))[0];
		if (hit?.object.userData.slug) opts.onPick(hit.object.userData.slug);
	};
	canvas.addEventListener("pointerdown", onDown);
	canvas.addEventListener("pointermove", onMove);
	canvas.addEventListener("pointerup", onUp);
	let last = performance.now();
	let alive = true;
	let raf = 0;
	let lastHud = 0;
	const loop = (now) => {
		if (!alive) return;
		const dt = Math.min((now - last) / 1e3, .1);
		last = now;
		if (!opts.reduced && !dragging && !opts.getWalk()) aim.x += dt * .06;
		rotY += (aim.x - rotY) * Math.min(1, dt * 5);
		rotX += (aim.y - rotX) * Math.min(1, dt * 5);
		const slug = opts.getSlug();
		const active = tubes.find((t) => t.slug === slug) ?? tubes[0];
		for (const t of tubes) {
			const on = t.slug === slug;
			t.mat.opacity = on ? 1 : .38;
			t.mesh.scale.setScalar(on ? 1.55 : 1);
		}
		const mid = active.curve.getPointAt(.5, tmp);
		want.copy(mid);
		look.lerp(want, 1 - Math.exp(-2.6 * dt));
		if (opts.getWalk()) {
			if (active.curve.closed) walkT = (walkT + dt * .055) % 1;
			else {
				walkT += dt * .07 * walkDir;
				if (walkT > .999) {
					walkT = .999;
					walkDir = -1;
				}
				if (walkT < .001) {
					walkT = .001;
					walkDir = 1;
				}
			}
			const u = MathUtils.euclideanModulo(walkT, 1);
			active.curve.getPointAt(u, walker.position);
			active.curve.getTangentAt(u, tan);
			camera.position.copy(walker.position).addScaledVector(tan, -6.5);
			camera.position.y += 2.6;
			tmp.copy(walker.position).addScaledVector(tan, 4);
			camera.lookAt(tmp);
			if (now - lastHud > 120) {
				lastHud = now;
				opts.onWalk({
					t: u,
					alt: Math.round(200 + walker.position.y * 80)
				});
			}
		} else {
			walkT = 0;
			walkDir = 1;
			const radius = 20;
			camera.position.set(look.x + Math.sin(rotY) * radius, look.y + 9 * Math.sin(rotX) + 7, look.z + Math.cos(rotY) * radius);
			camera.lookAt(look);
			active.curve.getPointAt(0, walker.position);
		}
		dust.rotation.y += dt * .03;
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
		terrain.geo.dispose();
		terrain.mat.dispose();
		nodes.geo.dispose();
		nodes.mat.dispose();
		nodes.tci.dispose();
		nodes.lg.dispose();
		walkerGeo.dispose();
		walkerMat.dispose();
		peakGeo.dispose();
		peakMat.dispose();
		for (const g of geos) g.dispose();
		for (const t of tubes) t.mat.dispose();
		dust.geometry.dispose();
		dust.material.dispose();
		sky.geometry.dispose();
		sky.material.dispose();
		renderer.dispose();
	};
}
function SentieriLab() {
	const reduced = useReducedMotion();
	const slugRef = (0, import_react.useRef)("cai-701");
	const walkRef = (0, import_react.useRef)(false);
	const [slug, setSlug] = (0, import_react.useState)("cai-701");
	const [walk, setWalk] = (0, import_react.useState)(false);
	const [along, setAlong] = (0, import_react.useState)({
		t: 0,
		alt: 0
	});
	const sentiero = SENTIERI.find((s) => s.slug === slug) ?? SENTIERI[1];
	const traccia = getTraccia(slug);
	const stats = (0, import_react.useMemo)(() => traccia ? profilo(traccia.punti) : {
		km: 0,
		gain: 0,
		samples: []
	}, [traccia]);
	const pick = (s) => {
		slugRef.current = s;
		setSlug(s);
		walkRef.current = false;
		setWalk(false);
	};
	const start = (0, import_react.useCallback)((c) => startSentieri3d(c, {
		reduced: reduced.current,
		getSlug: () => slugRef.current,
		getWalk: () => walkRef.current,
		onPick: pick,
		onWalk: setAlong
	}), [reduced]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-dvh overflow-hidden bg-navy-deep text-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebGLHost, { start }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabTop, {
				code: "04",
				title: "Sentieri"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pointer-events-none absolute left-4 top-20 z-10 max-w-sm font-mono text-[0.65rem] uppercase tracking-[0.14em] text-olive-light md:left-8",
				children: "Traccia schematica sul modello · non è un GPX CAI"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-28 left-4 z-20 md:bottom-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchedaSentiero, { s: sentiero }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Profilo, {
						samples: stats.samples,
						km: stats.km,
						gain: stats.gain,
						t: walk ? along.t : 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-3 inline-flex min-h-11 items-center rounded-full border border-copper/60 bg-navy-deep/80 px-5 text-sm text-cream hover:bg-copper/20",
						onClick: () => {
							walkRef.current = !walkRef.current;
							setWalk(walkRef.current);
						},
						children: walk ? "Ferma il percorso" : "Percorri il modello"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "absolute bottom-4 left-0 right-0 z-20 flex flex-nowrap gap-2 overflow-x-auto px-4 pb-1 md:bottom-auto md:left-auto md:right-4 md:top-20 md:w-56 md:flex-col md:overflow-y-auto md:px-0",
				"aria-label": "Sentieri",
				children: SENTIERI.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => pick(s.slug),
					className: cn("min-h-10 shrink-0 rounded-full border px-3 text-left text-sm", s.slug === slug ? "border-copper bg-copper/20 text-cream" : "border-cream/15 bg-navy-deep/70 text-cream-soft"),
					children: s.codice ?? s.nome
				}, s.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Telemetry, { items: [
				sentiero.codice ?? sentiero.slug,
				`${stats.km.toFixed(1)} km modello`,
				`+${Math.round(stats.gain)} m`,
				walk ? `${along.alt} m` : traccia?.ridge ? "segue il crinale" : "itinerario"
			] })
		]
	});
}
function Profilo({ samples, km, gain, t }) {
	if (samples.length < 2) return null;
	const min = Math.min(...samples);
	const span = Math.max(...samples) - min || 1;
	const w = 220;
	const h = 48;
	const d = samples.map((y, i) => {
		const x = i / (samples.length - 1) * w;
		const py = 44 - (y - min) / span * 40;
		return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${py.toFixed(1)}`;
	}).join(" ");
	const cx = Number((t * w).toFixed(2));
	const yi = samples[Math.round(t * (samples.length - 1))] ?? min;
	const cy = Number((44 - (yi - min) / span * 40).toFixed(2));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 max-w-sm rounded-lg border border-cream/10 bg-navy/70 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-mono text-[0.62rem] uppercase tracking-wider text-muted",
			children: [
				"Altimetria sul modello · ",
				km.toFixed(1),
				" km · +",
				Math.round(gain),
				" m"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: `0 0 ${w} ${h}`,
			className: "mt-1 h-12 w-full text-copper",
			"aria-hidden": true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d,
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.6"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx,
				cy,
				r: "3",
				fill: "#ede0c8"
			})]
		})]
	});
}
//#endregion
export { SentieriLab as component };
