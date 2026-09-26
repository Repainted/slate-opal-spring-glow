import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import type { BuildingSpec, CameraPreset, SceneLayers, WallFace } from "@/preventivi/lib/geometry/plan";
import { roofKindLabelKey } from "@/preventivi/lib/geometry/calc";
import { formatQty } from "@/preventivi/lib/format";
import { useT } from "@/preventivi/lib/i18n";
import { buildSite, cameraFit } from "@/preventivi/lib/scene/build-site";
import { SITE } from "@/preventivi/lib/scene/palette";
import { createSiteTextures } from "@/preventivi/lib/scene/textures";
import { cn } from "@/preventivi/lib/utils";

export function SiteCanvas({
  spec,
  layers,
  className,
  compact,
  cutaway = false,
  highlightFace = null,
  cameraPreset = "iso",
  showDims = true,
}: {
  spec: BuildingSpec;
  layers: SceneLayers;
  className?: string;
  compact?: boolean;
  cutaway?: boolean;
  highlightFace?: WallFace | null;
  cameraPreset?: CameraPreset;
  showDims?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const specRef = useRef(spec);
  const layersRef = useRef(layers);
  const cutRef = useRef(cutaway);
  const hiRef = useRef(highlightFace);
  const presetRef = useRef(cameraPreset);
  const dimsRef = useRef(showDims);
  specRef.current = spec;
  layersRef.current = layers;
  cutRef.current = cutaway;
  hiRef.current = highlightFace;
  presetRef.current = cameraPreset;
  dimsRef.current = showDims;
  const { t } = useT();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(SITE.bg, 1);
    renderer.shadowMap.enabled = !compact;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      display: "block",
      width: "100%",
      height: "100%",
      touchAction: "none",
    });

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(SITE.bg);
    scene.fog = new THREE.Fog(SITE.bg, 22, 56);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.08, 90);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 2.2;
    controls.maxDistance = 48;
    controls.maxPolarAngle = Math.PI / 2.08;
    controls.minPolarAngle = 0.04;
    controls.target.set(0, 1.2, 0);
    controls.touches.ONE = THREE.TOUCH.ROTATE;
    controls.touches.TWO = THREE.TOUCH.DOLLY_PAN;

    const hemi = new THREE.HemisphereLight(0xf4eee4, 0x8a8070, 1.0);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xfff6ea, 1.4);
    sun.position.set(8, 16, 10);
    sun.castShadow = !compact;
    sun.shadow.mapSize.set(compact ? 512 : 1536, compact ? 512 : 1536);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 50;
    sun.shadow.camera.left = -16;
    sun.shadow.camera.right = 16;
    sun.shadow.camera.top = 16;
    sun.shadow.camera.bottom = -16;
    sun.shadow.bias = -0.00025;
    scene.add(sun);
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    const textures = createSiteTextures();

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(56, 56),
      new THREE.MeshStandardMaterial({
        map: textures.dirt,
        color: SITE.ground,
        roughness: 1,
        metalness: 0,
      }),
    );
    textures.dirt.repeat.set(14, 14);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.29;
    ground.receiveShadow = true;
    scene.add(ground);

    const pad = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 16),
      new THREE.MeshStandardMaterial({
        map: textures.dirt,
        color: SITE.dirtDark,
        roughness: 1,
      }),
    );
    pad.rotation.x = -Math.PI / 2;
    pad.position.y = -0.275;
    pad.receiveShadow = true;
    scene.add(pad);

    const grid = new THREE.GridHelper(24, 24, SITE.gridMajor, SITE.gridMinor);
    grid.position.y = -0.27;
    const gridMat = grid.material;
    if (Array.isArray(gridMat))
      gridMat.forEach((m) => {
        m.transparent = true;
        m.opacity = 0.28;
      });
    else {
      gridMat.transparent = true;
      gridMat.opacity = 0.28;
    }
    scene.add(grid);

    let building: THREE.Group | null = null;

    function fit(s: BuildingSpec, snap: boolean) {
      const fitTo = cameraFit(s, presetRef.current);
      if (snap) camera.position.copy(fitTo.position);
      controls.target.copy(fitTo.target);
      const span = Math.max(s.length, s.kind === "wall" ? 2 : s.depth, 3);
      sun.shadow.camera.left = -span * 1.4;
      sun.shadow.camera.right = span * 1.4;
      sun.shadow.camera.top = span * 1.4;
      sun.shadow.camera.bottom = -span * 1.4;
      sun.shadow.camera.updateProjectionMatrix();
      controls.update();
    }

    function rebuild(snapCam: boolean) {
      if (building) {
        scene.remove(building);
        (building.userData.dispose as (() => void) | undefined)?.();
      }
      const s = specRef.current;
      building = buildSite(s, layersRef.current, textures, {
        cutaway: cutRef.current,
        highlightFace: hiRef.current,
        showDims: !compact && dimsRef.current,
      });
      scene.add(building);
      const span = Math.max(s.length, s.kind === "wall" ? s.thickness : s.depth, 3);
      pad.scale.set(Math.max(1, (span + 4) / 18), Math.max(1, (span + 4) / 16), 1);
      fit(s, snapCam);
    }

    rebuild(true);

    const timer = new THREE.Timer();
    timer.connect(document);

    const setSize = () => {
      const w = Math.max(1, host.clientWidth);
      const h = Math.max(1, host.clientHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(host);

    renderer.setAnimationLoop(() => {
      timer.update();
      const dt = Math.min(timer.getDelta(), 0.1);
      void dt;
      controls.update();
      renderer.render(scene, camera);
    });

    const api = {
      rebuild,
      setPreset(snap: boolean) {
        fit(specRef.current, snap);
      },
    };
    (host as HTMLDivElement & { __site?: typeof api }).__site = api;

    return () => {
      renderer.setAnimationLoop(null);
      timer.disconnect();
      ro.disconnect();
      controls.dispose();
      if (building) {
        scene.remove(building);
        (building.userData.dispose as (() => void) | undefined)?.();
      }
      ground.geometry.dispose();
      (ground.material as THREE.Material).dispose();
      pad.geometry.dispose();
      (pad.material as THREE.Material).dispose();
      grid.geometry.dispose();
      textures.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [compact]);

  useEffect(() => {
    const host = hostRef.current as (HTMLDivElement & { __site?: { rebuild: (snap: boolean) => void } }) | null;
    host?.__site?.rebuild(false);
  }, [spec, layers, cutaway, highlightFace, showDims]);

  useEffect(() => {
    const host = hostRef.current as
      | (HTMLDivElement & { __site?: { setPreset: (snap: boolean) => void } })
      | null;
    host?.__site?.setPreset(true);
  }, [cameraPreset]);

  const dim =
    spec.kind === "wall"
      ? `${formatQty(spec.length)} × ${formatQty(spec.height)} m`
      : `${formatQty(spec.length)} × ${formatQty(spec.depth)} × ${formatQty(spec.height)} m`;

  return (
    <div
      ref={hostRef}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-border)]",
        compact ? "h-64" : "h-[min(58vh,32rem)] min-h-80",
        className,
      )}
    >
      <div className="pointer-events-none absolute top-3 left-3 z-10 rounded-xl bg-background/90 px-3 py-2 shadow-[var(--shadow-border)]">
        <p className="text-sm font-semibold tabular-nums">{dim}</p>
        {spec.kind !== "wall" && spec.pitch > 0 ? (
          <p className="text-xs text-muted-foreground">
            {t("geom.pitch")} {spec.pitch}° · {t(roofKindLabelKey(spec.roofKind))}
          </p>
        ) : null}
      </div>
    </div>
  );
}
