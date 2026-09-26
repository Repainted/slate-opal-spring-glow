import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/preventivi/components/app-shell";
import { Plan2D } from "@/preventivi/components/scene/plan-2d";
import { SiteCanvas } from "@/preventivi/components/scene/site-canvas";
import { formatEuro, formatQty } from "@/preventivi/lib/format";
import { computeMetrics, emptyMeasure, jobOf, kindLabelKey, kindSlug, roofKindLabelKey, roofKindOf, roofPackOf, type WallFace } from "@/preventivi/lib/geometry/calc";
import {
  composeBuilding,
  gutterStyleOf,
  inferLayers,
  roofStyleOfCovering,
  thicknessFromItems,
  type CameraPreset,
  type SceneLayers,
} from "@/preventivi/lib/geometry/plan";
import { jobLabelKey, runEngine } from "@/preventivi/lib/engine/site";
import { useT } from "@/preventivi/lib/i18n";
import { useMaterialStore } from "@/preventivi/lib/materials/store";
import { useHydrateApp } from "@/preventivi/lib/materials/use-hydrate";
import { cn } from "@/preventivi/lib/utils";

export const Route = createFileRoute("/lab/preventivi/planimetria")({ component: PlanPage });

function PlanPage() {
  useHydrateApp();
  const { t } = useT();
  const navigate = useNavigate();
  const measures = useMaterialStore((s) => s.measures);
  const draft = useMaterialStore((s) => s.draft);
  const items = useMaterialStore((s) => s.items);
  const works = useMaterialStore((s) => s.works);
  const applyGeometryQuote = useMaterialStore((s) => s.applyGeometryQuote);
  const [quoted, setQuoted] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>("iso");
  const [cutaway, setCutaway] = useState(false);
  const [showDims, setShowDims] = useState(true);
  const [highlightFace, setHighlightFace] = useState<WallFace | null>(null);

  const inferred = useMemo(() => {
    const i = inferLayers(items, works);
    const src =
      (selectedId ? measures.find((m) => m.id === selectedId) : undefined) ??
      draft ??
      measures[0] ??
      emptyMeasure("room");
    const k = src.kind;
    const roofStyle = roofStyleOfCovering(roofPackOf(src).covering);
    const gutterStyle = gutterStyleOf(roofPackOf(src).gutter);
    if (!i.masonry && !i.roofing && !i.timber && !i.scaffold) {
      return {
        ...i,
        masonry: k !== "porch" && k !== "roof",
        roofing: k !== "wall",
        timber: k === "porch" || k === "roof",
        roofStyle,
        gutterStyle,
      };
    }
    if (k === "porch") return { ...i, timber: true, roofing: true, roofStyle, gutterStyle };
    return { ...i, roofStyle, gutterStyle };
  }, [items, works, selectedId, draft, measures]);
  const [layers, setLayers] = useState<SceneLayers>(inferred);
  const [layerTouched, setLayerTouched] = useState(false);
  const activeLayers = layerTouched ? layers : inferred;

  const thickness = useMemo(() => thicknessFromItems(items), [items]);
  const spec = useMemo(
    () => composeBuilding(draft, measures, selectedId, thickness),
    [draft, measures, selectedId, thickness],
  );
  const source =
    (selectedId ? measures.find((m) => m.id === selectedId) : undefined) ??
    draft ??
    measures[0] ??
    emptyMeasure("room");
  const metrics = useMemo(() => computeMetrics(source), [source]);
  const engine = useMemo(() => runEngine(source, thickness), [source, thickness]);

  function toggle(key: "masonry" | "roofing" | "timber" | "scaffold") {
    setLayerTouched(true);
    setLayers((prev) => ({ ...(layerTouched ? prev : inferred), [key]: !activeLayers[key] }));
  }

  function pickFace(face: WallFace) {
    setHighlightFace((cur) => (cur === face ? null : face));
    if (face === 0) setCameraPreset("sud");
    else if (face === 1) setCameraPreset("est");
    else setCameraPreset("iso");
  }

  const kindKey = kindLabelKey(source.kind);
  const openings = spec.openings;
  const doors = openings.filter((o) => o.kind === "door").length;
  const windows = openings.filter((o) => o.kind === "window").length;

  return (
    <AppShell title={t("plan.title")} back={{ to: "/lab/preventivi" }} backLabel={t("calc.back")}>
      <p className="text-base text-muted-foreground">{t("plan.lead")}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(
          [
            ["iso", "plan.camIso"],
            ["sud", "plan.camSud"],
            ["est", "plan.camEst"],
            ["pianta", "plan.camPlan"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setCameraPreset(id)}
            className={cn(
              "h-11 rounded-xl px-3 text-sm font-semibold",
              cameraPreset === id ? "bg-primary text-primary-foreground" : "bg-secondary",
            )}
          >
            {t(label)}
          </button>
        ))}
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCutaway((v) => !v)}
          className={cn(
            "h-11 rounded-xl px-3 text-sm font-semibold",
            cutaway ? "bg-primary text-primary-foreground" : "bg-secondary",
          )}
        >
          {t("plan.cutaway")}
        </button>
        <button
          type="button"
          onClick={() => setShowDims((v) => !v)}
          className={cn(
            "h-11 rounded-xl px-3 text-sm font-semibold",
            showDims ? "bg-primary text-primary-foreground" : "bg-secondary",
          )}
        >
          {t("plan.dims")}
        </button>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {(
          [
            ["masonry", "plan.masonry"],
            ["roofing", "plan.roofing"],
            ["timber", "plan.timber"],
            ["scaffold", "plan.scaffold"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => toggle(key)}
            className={cn(
              "h-11 rounded-xl px-3 text-sm font-semibold",
              activeLayers[key] ? "bg-primary text-primary-foreground" : "bg-secondary",
            )}
          >
            {t(label)}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <SiteCanvas
          spec={spec}
          layers={activeLayers}
          cutaway={cutaway}
          highlightFace={highlightFace}
          cameraPreset={cameraPreset}
          showDims={showDims}
        />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{t("plan.hint3d")}</p>

      <h2 className="mt-6 text-sm font-medium tracking-[0.16em] text-muted-foreground uppercase">
        {t("plan.viewPlan")}
      </h2>
      <div className="mt-3">
        <Plan2D spec={spec} highlightFace={highlightFace} onSelectFace={pickFace} />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{t("plan.hintPlan")}</p>

      {spec.kind !== "wall" && spec.kind !== "porch" ? (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {([0, 1, 2, 3] as const).map((face) => (
            <button
              key={face}
              type="button"
              onClick={() => pickFace(face)}
              className={cn(
                "h-11 rounded-xl text-xs font-semibold",
                highlightFace === face ? "bg-primary text-primary-foreground" : "bg-secondary",
              )}
            >
              {t((["plan.south", "plan.east", "plan.north", "plan.west"] as const)[face])}
            </button>
          ))}
        </div>
      ) : null}

      {measures.length > 1 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {measures.map((m, i) => {
            const name = t(kindLabelKey(m.kind));
            const on = (selectedId ?? measures[0]?.id) === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedId(m.id)}
                className={cn(
                  "h-11 rounded-xl px-3 text-sm font-semibold",
                  on ? "bg-primary text-primary-foreground" : "bg-secondary",
                )}
              >
                {name} {i + 1}
              </button>
            );
          })}
        </div>
      ) : null}

      <section className="mt-6 rounded-2xl bg-primary p-5 text-primary-foreground">
        <p className="text-sm font-medium tracking-wide uppercase opacity-70">
          {t(kindKey)} · {t(jobLabelKey(jobOf(source)))}
        </p>
        <dl className="mt-3 grid gap-3">
          {source.kind === "roof" ? (
            <>
              <Row label={t("geom.plan")} value={`${formatQty(metrics.roofPlan)} m²`} />
              <Row label={t("geom.slope")} value={`${formatQty(metrics.roof)} m²`} big />
              <Row
                label={t("geom.pitch")}
                value={`${source.pitch}° · ${t(roofKindLabelKey(roofKindOf(source)))}`}
              />
            </>
          ) : null}
          {source.kind === "room" ? (
            <>
              <Row
                label={t("calc.dims")}
                value={`${formatQty(source.length)} × ${formatQty(source.width)} × ${formatQty(source.height)} m`}
              />
              <Row label={t("plan.thickness")} value={`${formatQty(thickness * 100, 0)} cm`} />
              <Row label={t("geom.floor")} value={`${formatQty(metrics.floor)} m²`} big />
              <Row label={t("geom.wallsNet")} value={`${formatQty(metrics.wallNet)} m²`} />
              {metrics.roof > 0.05 ? <Row label={t("geom.slope")} value={`${formatQty(metrics.roof)} m²`} /> : null}
              <Row label={t("geom.volume")} value={`${formatQty(metrics.volume)} m³`} />
              {doors + windows > 0 ? (
                <Row
                  label={t("geom.openings")}
                  value={`${doors} ${t("geom.door").toLowerCase()} · ${windows} ${t("geom.window").toLowerCase()}`}
                />
              ) : null}
            </>
          ) : null}
          {source.kind === "wall" ? (
            <>
              <Row
                label={t("calc.dims")}
                value={`${formatQty(source.length)} × ${formatQty(source.height)} m`}
              />
              <Row label={t("plan.thickness")} value={`${formatQty(thickness * 100, 0)} cm`} />
              <Row label={t("geom.wallsNet")} value={`${formatQty(metrics.wallNet)} m²`} big />
            </>
          ) : null}
          {source.kind === "porch" ? (
            <>
              <Row
                label={t("calc.dims")}
                value={`${formatQty(source.length)} × ${formatQty(source.width)} × ${formatQty(source.height)} m`}
              />
              <Row
                label={t("geom.pitch")}
                value={`${source.pitch}° · ${t(roofKindLabelKey(roofKindOf(source)))}`}
              />
              <Row label={t("geom.floor")} value={`${formatQty(metrics.floor)} m²`} big />
              <Row label={t("geom.slope")} value={`${formatQty(metrics.roof)} m²`} />
              <Row label={t("geom.posts")} value={formatQty(metrics.posts, 0)} />
            </>
          ) : null}
          {engine.debris.tonnes > 0.05 ? (
            <>
              <Row label={t("engine.debris")} value={`${formatQty(engine.debris.tonnes)} t`} big />
              <Row
                label={t("engine.bins")}
                value={`${formatQty(engine.debris.bins10, 0)}×10 m³ · ${formatQty(engine.debris.bins5, 0)}×5 m³`}
              />
            </>
          ) : null}
          <Row
            label={t("engine.crew")}
            value={`${formatQty(engine.people, 0)} × ${formatQty(engine.days, 0)} gg · ${formatQty(engine.hours)} h`}
          />
          <Row label={t("engine.labor")} value={formatEuro(engine.laborCost)} big />
        </dl>
      </section>

      <button
        type="button"
        onClick={() => {
          applyGeometryQuote({
            ...source,
            pitch: spec.pitch,
            roofKind: spec.roofKind,
            length: spec.length,
            width: spec.kind === "wall" ? source.width : spec.depth,
            height: spec.height,
          });
          setQuoted(true);
          void navigate({ to: "/lab/preventivi/lista" });
        }}
        className="mt-5 flex h-16 w-full items-center justify-center rounded-2xl bg-brick text-lg font-semibold text-brick-foreground"
      >
        {quoted ? t("plan.quoted") : t("plan.quote3d")}
      </button>
      <p className="mt-2 text-sm text-muted-foreground">{t("plan.quoteHint")}</p>
      <Link
        to="/lab/preventivi/misura/$kind"
        params={{ kind: kindSlug(source.kind) }}
        className="mt-3 flex h-14 items-center justify-center rounded-xl bg-secondary text-base font-semibold"
      >
        {t("plan.editMeasure")}
      </Link>
    </AppShell>
  );
}

function Row({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className="flex items-end justify-between gap-3">
      <dt className="text-base opacity-80">{label}</dt>
      <dd className={cn("font-semibold tabular-nums", big ? "text-3xl leading-none" : "text-xl")}>{value}</dd>
    </div>
  );
}
