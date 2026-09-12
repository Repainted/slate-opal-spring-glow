import { i as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, _ as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as ArrowLeft } from "../_libs/lucide-react.mjs";
import { p as BrandMark, y as COMUNI } from "./router-CnNVtgAG.mjs";
import { A as ShaderMaterial, E as PointsMaterial, O as SRGBColorSpace, T as Points, c as DirectionalLight, d as Group, f as HemisphereLight, g as LineSegments, h as LineBasicMaterial, i as BufferGeometry, j as SphereGeometry, l as Float32BufferAttribute, r as BufferAttribute, t as WebGLRenderer, v as Mesh, w as PlaneGeometry, y as MeshBasicMaterial } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/geo-B1aj5SiK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useReducedMotion() {
	const ref = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		ref.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}, []);
	return ref;
}
function WebGLHost({ start }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		return start(el);
	}, [start]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "absolute inset-0 h-full w-full touch-none"
	});
}
function LabTop({ code, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-4 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/lab",
				className: "pointer-events-auto inline-flex min-h-11 items-center gap-2 rounded-full border border-cream/15 bg-navy-deep/70 px-4 text-sm text-cream",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Lab"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "pointer-events-none font-mono text-[0.7rem] uppercase tracking-[0.18em] text-copper-light",
				children: [
					code,
					" · ",
					title
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { className: "w-10 opacity-80" })
		]
	});
}
function PlayGate({ open, kicker, title, hint, onPlay }) {
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-end bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent md:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full px-6 py-16 md:mx-auto md:max-w-lg md:text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[0.7rem] uppercase tracking-[0.22em] text-copper-light",
					children: kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl text-cream md:text-5xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-cream-soft",
					children: hint
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onPlay,
					className: "mt-8 inline-flex min-h-12 items-center rounded-full bg-cream px-8 font-semibold text-navy-deep hover:bg-copper hover:text-cream-soft",
					children: "Entra"
				})
			]
		})
	});
}
function Telemetry({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "pointer-events-none absolute bottom-4 left-4 z-10 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-olive-light",
		children: items.join(" · ")
	});
}
function TouchKeys({ keys, extra }) {
	const hold = (code) => ({
		onPointerDown: (e) => {
			e.preventDefault();
			keys.add(code);
		},
		onPointerUp: () => keys.delete(code),
		onPointerCancel: () => keys.delete(code),
		onPointerLeave: () => keys.delete(code)
	});
	const btn = "min-h-12 min-w-12 rounded-full border border-cream/20 bg-navy-deep/70 text-cream";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute bottom-16 right-4 z-10 flex flex-col items-end gap-2 md:hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: btn,
					...hold("KeyW"),
					children: "W"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: btn,
						...hold("KeyA"),
						children: "A"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: btn,
						...hold("KeyS"),
						children: "S"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: btn,
						...hold("KeyD"),
						children: "D"
					})
				]
			}),
			extra
		]
	});
}
function heightAt(x, z) {
	const r1 = 16 * Math.exp(-((z - Math.sin(x * .12) * 6) ** 2) / 55);
	const r2 = 9 * Math.exp(-((z + 14 - Math.cos(x * .08) * 4) ** 2) / 70);
	const karst = Math.sin(x * .35) * Math.cos(z * .28) * 1.35 + Math.sin(x * .9) * .35;
	const massif = 4 * Math.exp(-(x * x + z * z) / 2800);
	return Math.max(.15, r1 + r2 + karst + massif);
}
function projectComune(lng, lat) {
	return {
		x: (lng - 13.08) * 180,
		z: (41.58 - lat) * 220
	};
}
var NODE_POINTS = COMUNI.map((c) => {
	const { x, z } = projectComune(c.lng, c.lat);
	return {
		...c,
		x,
		z,
		y: heightAt(x, z) + .9
	};
});
function buildTerrain(segments = 96) {
	const geo = new PlaneGeometry(200, 160, segments, Math.round(segments * .8));
	geo.rotateX(-Math.PI / 2);
	const pos = geo.attributes.position;
	for (let i = 0; i < pos.count; i++) pos.setY(i, heightAt(pos.getX(i), pos.getZ(i)));
	pos.needsUpdate = true;
	geo.computeVertexNormals();
	const mat = new ShaderMaterial({
		uniforms: {},
		vertexShader: `
      varying vec3 vW;
      varying vec3 vN;
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        vW = w.xyz;
        vN = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * w;
      }
    `,
		fragmentShader: `
      varying vec3 vW;
      varying vec3 vN;
      void main() {
        float slope = 1.0 - abs(vN.y);
        vec3 rock = vec3(0.145, 0.132, 0.122);
        vec3 grass = vec3(0.27, 0.31, 0.175);
        vec3 copper = vec3(0.71, 0.44, 0.227);
        vec3 col = mix(grass, rock, smoothstep(0.12, 0.52, slope));
        col = mix(col, copper, smoothstep(11.0, 18.0, vW.y) * 0.5);
        float ndl = clamp(dot(vN, normalize(vec3(-0.45, 0.72, 0.28))), 0.18, 1.0);
        col *= ndl;
        float fog = smoothstep(18.0, 95.0, length(vW.xz));
        col = mix(col, vec3(0.09, 0.086, 0.102), fog);
        gl_FragColor = vec4(col, 1.0);
      }
    `
	});
	const mesh = new Mesh(geo, mat);
	mesh.receiveShadow = false;
	return {
		mesh,
		geo,
		mat
	};
}
function duskSky() {
	const geo = new SphereGeometry(140, 24, 16);
	const mat = new ShaderMaterial({
		side: 1,
		depthWrite: false,
		vertexShader: `
      varying vec3 vP;
      void main() {
        vP = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
		fragmentShader: `
      varying vec3 vP;
      void main() {
        float h = normalize(vP).y;
        vec3 top = vec3(0.07, 0.07, 0.09);
        vec3 hor = vec3(0.42, 0.26, 0.16);
        vec3 col = mix(hor, top, smoothstep(-0.15, 0.55, h));
        gl_FragColor = vec4(col, 1.0);
      }
    `
	});
	return new Mesh(geo, mat);
}
function copperDust(count = 80) {
	const pos = new Float32Array(count * 3);
	for (let i = 0; i < count; i++) {
		pos[i * 3] = (Math.random() - .5) * 90;
		pos[i * 3 + 1] = 4 + Math.random() * 22;
		pos[i * 3 + 2] = (Math.random() - .5) * 70;
	}
	const geo = new BufferGeometry();
	geo.setAttribute("position", new BufferAttribute(pos, 3));
	const mat = new PointsMaterial({
		color: 13536078,
		size: .35,
		transparent: true,
		opacity: .55,
		depthWrite: false,
		blending: 2
	});
	return new Points(geo, mat);
}
function makeNodes() {
	const geo = new SphereGeometry(.28, 10, 8);
	const mat = new MeshBasicMaterial({ color: 13536078 });
	const tci = new MeshBasicMaterial({ color: 15589576 });
	const group = new Group();
	const meshes = [];
	for (const n of NODE_POINTS) {
		const m = new Mesh(geo, n.bandieraArancione ? tci : mat);
		m.position.set(n.x, n.y, n.z);
		m.userData.slug = n.slug;
		m.userData.nome = n.nome;
		group.add(m);
		meshes.push(m);
	}
	const linePos = [];
	const sorted = [...NODE_POINTS].sort((a, b) => a.lng - b.lng);
	for (let i = 0; i < sorted.length - 1; i++) {
		const a = sorted[i];
		const b = sorted[i + 1];
		if (Math.hypot(a.x - b.x, a.z - b.z) < 28) linePos.push(a.x, a.y, a.z, b.x, b.y, b.z);
	}
	const lg = new BufferGeometry();
	lg.setAttribute("position", new Float32BufferAttribute(linePos, 3));
	const lines = new LineSegments(lg, new LineBasicMaterial({
		color: 11891002,
		transparent: true,
		opacity: .35
	}));
	group.add(lines);
	return {
		group,
		meshes,
		geo,
		mat,
		tci,
		lg
	};
}
function addDuskLights(scene) {
	const hemi = new HemisphereLight(15589576, 2302238, .55);
	const dir = new DirectionalLight(13536078, 1.15);
	dir.position.set(-40, 28, 18);
	scene.add(hemi, dir);
	return {
		hemi,
		dir
	};
}
function makeRenderer(canvas) {
	const renderer = new WebGLRenderer({
		canvas,
		antialias: canvas.clientWidth > 700,
		alpha: false,
		powerPreference: "high-performance"
	});
	renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
	renderer.setClearColor(1512986, 1);
	renderer.outputColorSpace = SRGBColorSpace;
	renderer.toneMapping = 4;
	renderer.toneMappingExposure = 1.08;
	return renderer;
}
function resizeRenderer(renderer, camera, el) {
	const w = el.clientWidth || 1;
	const h = el.clientHeight || 1;
	renderer.setSize(w, h, false);
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
}
function nearestNode(x, z) {
	let best = NODE_POINTS[0];
	let d = Infinity;
	for (const n of NODE_POINTS) {
		const dd = (n.x - x) ** 2 + (n.z - z) ** 2;
		if (dd < d) {
			d = dd;
			best = n;
		}
	}
	return best;
}
//#endregion
export { useReducedMotion as _, TouchKeys as a, buildTerrain as c, heightAt as d, makeNodes as f, resizeRenderer as g, projectComune as h, Telemetry as i, copperDust as l, nearestNode as m, NODE_POINTS as n, WebGLHost as o, makeRenderer as p, PlayGate as r, addDuskLights as s, LabTop as t, duskSky as u };
