import * as THREE from "three";

export type Carta = "rilievo" | "sat" | "osm";

export type ViewCtl = {
  zoom: number;
  carta: Carta;
};

export function makeView(): ViewCtl {
  return { zoom: 1, carta: "rilievo" };
}

export function cartaLayer(c: Carta) {
  return c === "sat" ? 1 : c === "osm" ? 2 : 0;
}

export class OrbitCam {
  look = new THREE.Vector3(0, 5, 0);
  rotY: number;
  rotX: number;
  radius: number;
  minR: number;
  maxR: number;
  auto: boolean;
  dragging = false;
  moved = 0;
  private aimY: number;
  private aimX: number;

  constructor(opts?: { rotY?: number; rotX?: number; radius?: number; minR?: number; maxR?: number; auto?: boolean }) {
    this.rotY = opts?.rotY ?? 0.55;
    this.rotX = opts?.rotX ?? 0.32;
    this.aimY = this.rotY;
    this.aimX = this.rotX;
    this.radius = opts?.radius ?? 40;
    this.minR = opts?.minR ?? 4;
    this.maxR = opts?.maxR ?? 95;
    this.auto = opts?.auto ?? true;
  }

  zoomBy(factor: number) {
    this.auto = false;
    this.radius = THREE.MathUtils.clamp(this.radius * factor, this.minR, this.maxR);
  }

  bind(
    canvas: HTMLCanvasElement,
    opts?: {
      onTap?: (e: PointerEvent) => void;
      pan?: boolean;
      wasd?: boolean;
      onZoom?: (factor: number) => void;
    },
  ) {
    const pts = new Map<number, { x: number; y: number }>();
    let lastX = 0;
    let lastY = 0;
    let pinch0 = 0;
    const zoom = (f: number) => {
      this.auto = false;
      if (opts?.onZoom) opts.onZoom(f);
      else this.zoomBy(f);
    };
    const pan = opts?.pan !== false;
    const right = new THREE.Vector3();
    const fwd = new THREE.Vector3();

    const pinchDist = () => {
      const a = [...pts.values()];
      if (a.length < 2) return 0;
      return Math.hypot(a[0]!.x - a[1]!.x, a[0]!.y - a[1]!.y);
    };

    const onDown = (e: PointerEvent) => {
      this.dragging = true;
      this.auto = false;
      this.moved = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      pinch0 = pinchDist();
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!pts.has(e.pointerId)) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 2) {
        const d = pinchDist();
        if (pinch0 > 8) zoom(pinch0 / Math.max(d, 8));
        pinch0 = d;
        return;
      }
      if (!this.dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      this.moved += Math.abs(dx) + Math.abs(dy);
      lastX = e.clientX;
      lastY = e.clientY;
      const panning = pan && (e.shiftKey || e.buttons === 2 || e.buttons === 4);
      if (panning) {
        const s = this.radius * 0.0022;
        fwd.set(-Math.sin(this.rotY), 0, -Math.cos(this.rotY));
        right.set(Math.cos(this.rotY), 0, -Math.sin(this.rotY));
        this.look.addScaledVector(right, -dx * s);
        this.look.addScaledVector(fwd, dy * s);
      } else {
        this.aimY -= dx * 0.005;
        this.aimX = THREE.MathUtils.clamp(this.aimX + dy * 0.004, 0.06, 1.15);
      }
    };
    const onUp = (e: PointerEvent) => {
      pts.delete(e.pointerId);
      this.dragging = pts.size > 0;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* iframe */
      }
      if (this.moved <= 8 && opts?.onTap && pts.size === 0) opts.onTap(e);
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const f = e.deltaY > 0 ? 1.12 : 0.89;
      zoom(f);
    };
    const onCtx = (e: Event) => e.preventDefault();
    const keys = new Set<string>();
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Equal" || e.code === "NumpadAdd") {
        e.preventDefault();
        zoom(0.85);
      }
      if (e.code === "Minus" || e.code === "NumpadSubtract") {
        e.preventDefault();
        zoom(1.18);
      }
      if (opts?.wasd) {
        if (e.type === "keydown") keys.add(e.code);
        else keys.delete(e.code);
      }
    };
    const onBlur = () => keys.clear();

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("contextmenu", onCtx);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    window.addEventListener("blur", onBlur);

    return {
      keys,
      dispose: () => {
        canvas.removeEventListener("pointerdown", onDown);
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerup", onUp);
        canvas.removeEventListener("pointercancel", onUp);
        canvas.removeEventListener("wheel", onWheel);
        canvas.removeEventListener("contextmenu", onCtx);
        window.removeEventListener("keydown", onKey);
        window.removeEventListener("keyup", onKey);
        window.removeEventListener("blur", onBlur);
      },
    };
  }

  step(dt: number, camera: THREE.PerspectiveCamera, height = 1) {
    if (this.auto && !this.dragging) this.aimY += dt * 0.06;
    this.rotY += (this.aimY - this.rotY) * Math.min(1, dt * 6);
    this.rotX += (this.aimX - this.rotX) * Math.min(1, dt * 6);
    const r = this.radius;
    camera.position.set(
      this.look.x + Math.sin(this.rotY) * r,
      this.look.y + r * 0.42 * Math.sin(this.rotX) + 3 * height,
      this.look.z + Math.cos(this.rotY) * r,
    );
    camera.lookAt(this.look);
  }

  panKeys(keys: Set<string>, dt: number) {
    const s = this.radius * 0.55 * dt;
    const fwd = new THREE.Vector3(-Math.sin(this.rotY), 0, -Math.cos(this.rotY));
    const right = new THREE.Vector3(Math.cos(this.rotY), 0, -Math.sin(this.rotY));
    if (keys.has("KeyW") || keys.has("ArrowUp")) this.look.addScaledVector(fwd, s);
    if (keys.has("KeyS") || keys.has("ArrowDown")) this.look.addScaledVector(fwd, -s);
    if (keys.has("KeyA") || keys.has("ArrowLeft")) this.look.addScaledVector(right, -s);
    if (keys.has("KeyD") || keys.has("ArrowRight")) this.look.addScaledVector(right, s);
    if (keys.has("KeyW") || keys.has("KeyA") || keys.has("KeyS") || keys.has("KeyD")) this.auto = false;
  }
}

export function bindZoom(
  canvas: HTMLCanvasElement,
  apply: (factor: number) => void,
) {
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    apply(e.deltaY > 0 ? 1.1 : 0.9);
  };
  const pts = new Map<number, { x: number; y: number }>();
  let pinch0 = 0;
  const dist = () => {
    const a = [...pts.values()];
    if (a.length < 2) return 0;
    return Math.hypot(a[0]!.x - a[1]!.x, a[0]!.y - a[1]!.y);
  };
  const onDown = (e: PointerEvent) => {
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    pinch0 = dist();
  };
  const onMove = (e: PointerEvent) => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 2) {
      const d = dist();
      if (pinch0 > 8) apply(pinch0 / Math.max(d, 8));
      pinch0 = d;
    }
  };
  const onUp = (e: PointerEvent) => pts.delete(e.pointerId);
  const onKey = (e: KeyboardEvent) => {
    if (e.code === "Equal" || e.code === "NumpadAdd") {
      e.preventDefault();
      apply(0.85);
    }
    if (e.code === "Minus" || e.code === "NumpadSubtract") {
      e.preventDefault();
      apply(1.18);
    }
  };
  canvas.addEventListener("wheel", onWheel, { passive: false });
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  window.addEventListener("keydown", onKey);
  return () => {
    canvas.removeEventListener("wheel", onWheel);
    canvas.removeEventListener("pointerdown", onDown);
    canvas.removeEventListener("pointermove", onMove);
    canvas.removeEventListener("pointerup", onUp);
    window.removeEventListener("keydown", onKey);
  };
}
