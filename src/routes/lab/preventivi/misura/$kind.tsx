import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/preventivi/components/app-shell";
import { SiteCanvas } from "@/preventivi/components/scene/site-canvas";
import { Stepper } from "@/preventivi/components/stepper";
import { formatEuro, formatQty } from "@/preventivi/lib/format";
import { useT } from "@/preventivi/lib/i18n";
import {
  computeMetrics,
  defaultOpening,
  emptyMeasure,
  gutterLabelKey,
  gutterQty,
  jobOf,
  kindLabelKey,
  pitchFactor,
  roofKindOf,
  roofKindLabelKey,
  roofPackOf,
  ROOF_NONE,
  WALL_FACES,
  type JobKind,
  type MeasureKind,
  type Opening,
  type RoofKind,
  type RoofPack,
  type WallFace,
} from "@/preventivi/lib/geometry/calc";
import { layersFromMeasure, measureToBuilding, thicknessFromItems } from "@/preventivi/lib/geometry/plan";
import { jobLabelKey, runEngine } from "@/preventivi/lib/engine/site";
import { useMaterialStore } from "@/preventivi/lib/materials/store";
import { useHydrateApp } from "@/preventivi/lib/materials/use-hydrate";
import {
  getProduct,
  ROOF_COVERING_IDS,
  ROOF_GUTTER_IDS,
  ROOF_ISO_IDS,
  ROOF_MEMBRANE_IDS,
  ROOF_TIMBER_IDS,
} from "@/preventivi/lib/materials/catalog";
import { uid } from "@/preventivi/lib/utils";
import { cn } from "@/preventivi/lib/utils";

export const Route = createFileRoute("/lab/preventivi/misura/$kind")({ component: MeasurePage });

const KIND_MAP: Record<string, MeasureKind> = {
  tetto: "roof",
  stanza: "room",
  muro: "wall",
  portico: "porch",
};

const PITCHES = [0, 15, 20, 25, 30, 35, 45];

function MeasurePage() {
  useHydrateApp();
  const { t } = useT();
  const { kind: slug } = Route.useParams();
  const kind = KIND_MAP[slug];
  const addMeasure = useMaterialStore((s) => s.addMeasure);
  const rememberMeasure = useMaterialStore((s) => s.rememberMeasure);
  const applyGeometryQuote = useMaterialStore((s) => s.applyGeometryQuote);
  const items = useMaterialStore((s) => s.items);
  const works = useMaterialStore((s) => s.works);
  const navigate = useNavigate();
  const [measure, setMeasure] = useState(() => emptyMeasure(kind ?? "room"));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!kind) return;
    setMeasure(emptyMeasure(kind));
    setSaved(false);
  }, [kind]);

  const metrics = useMemo(() => computeMetrics(measure), [measure]);
  const thickness = useMemo(() => thicknessFromItems(items), [items]);
  const workPrices = useMaterialStore((s) => s.workPrices);
  const engine = useMemo(() => runEngine(measure, thickness, workPrices), [measure, thickness, workPrices]);
  const spec = useMemo(() => measureToBuilding(measure, thickness), [measure, thickness]);
  const layers = useMemo(() => layersFromMeasure(measure, items, works), [items, works, measure]);
  const pack = useMemo(() => roofPackOf(measure), [measure]);
  const gutters = useMemo(() => gutterQty(measure), [measure]);

  useEffect(() => {
    if (!kind) return;
    rememberMeasure(measure);
  }, [kind, measure, rememberMeasure]);

  if (!kind) {
    return (
      <AppShell back={{ to: "/lab/preventivi" }} backLabel={t("calc.back")}>
        <h1 className="text-2xl font-semibold">{t("missing.title")}</h1>
      </AppShell>
    );
  }

  const titleKey = kindLabelKey(kind);

  const patch = (partial: Partial<typeof measure>) => {
    setMeasure((m) => ({ ...m, ...partial, id: m.id }));
    setSaved(false);
  };

  const patchPack = (partial: Partial<RoofPack>) => {
    setMeasure((m) => ({
      ...m,
      id: m.id,
      roofPack: { ...roofPackOf(m), ...partial },
    }));
    setSaved(false);
  };

  return (
    <AppShell title={t(titleKey)} back={{ to: "/lab/preventivi" }} backLabel={t("calc.back")}>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <p className="text-sm font-medium tracking-[0.16em] text-muted-foreground uppercase">{t("plan.view3d")}</p>
        <Link to="/lab/preventivi/planimetria" className="text-sm font-semibold text-brick">
          {t("plan.open")}
        </Link>
      </div>
      <SiteCanvas spec={spec} layers={layers} compact showDims={false} />
      <p className="mt-2 mb-6 text-sm text-muted-foreground">{t("plan.hint3d")}</p>

      <div className="mb-6">
        <p className="mb-2 text-base font-medium">{t("engine.title")}</p>
        <div className="grid grid-cols-3 gap-2">
          {(["build", "demo", "reno"] as JobKind[]).map((job) => (
            <button
              key={job}
              type="button"
              onClick={() => patch({ job })}
              className={cn(
                "h-12 rounded-xl px-2 text-sm font-semibold",
                jobOf(measure) === job ? "bg-primary text-primary-foreground" : "bg-secondary",
              )}
            >
              {t(jobLabelKey(job))}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{t("engine.lead")}</p>
      </div>

      <div className="grid gap-6">
        <Stepper
          id="len"
          label={t("calc.length")}
          unit="m"
          value={measure.length}
          step={0.1}
          onChange={(n) => patch({ length: n })}
        />
        {kind !== "wall" ? (
          <Stepper
            id="wid"
            label={t("calc.width")}
            unit="m"
            value={measure.width}
            step={0.1}
            onChange={(n) => patch({ width: n })}
          />
        ) : null}
        {kind !== "roof" ? (
          <Stepper
            id="hei"
            label={t("calc.height")}
            unit="m"
            value={measure.height}
            step={0.1}
            onChange={(n) => patch({ height: n })}
          />
        ) : null}

        {kind === "roof" || kind === "room" || kind === "porch" ? (
          <div>
            <p className="mb-2 text-base font-medium">
              {t("geom.pitch")} <span className="font-normal text-muted-foreground">°</span>
            </p>
            <div className="mb-3 grid grid-cols-3 gap-2">
              {(["gable", "shed", "hip"] as RoofKind[]).map((rk) => (
                <button
                  key={rk}
                  type="button"
                  onClick={() => patch({ roofKind: rk })}
                  className={cn(
                    "h-12 rounded-xl px-2 text-sm font-semibold leading-tight",
                    roofKindOf(measure) === rk ? "bg-primary text-primary-foreground" : "bg-secondary",
                  )}
                >
                  {t(roofKindLabelKey(rk))}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {PITCHES.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => patch({ pitch: n })}
                  className={cn(
                    "h-12 min-w-14 rounded-xl px-3 text-base font-semibold tabular-nums",
                    measure.pitch === n ? "bg-primary text-primary-foreground" : "bg-secondary",
                  )}
                >
                  {n}°
                </button>
              ))}
            </div>
            {kind === "roof" ? (
              <p className="mt-2 text-sm text-muted-foreground">× {formatQty(pitchFactor(measure.pitch), 2)}</p>
            ) : null}
          </div>
        ) : null}

        {jobOf(measure) !== "demo" && (kind === "roof" || kind === "room" || kind === "porch") ? (
          <section>
            <p className="mb-1 text-base font-medium">{t("geom.pack")}</p>
            <p className="mb-3 text-sm text-muted-foreground">{t("geom.packLead")}</p>

            <p className="mb-2 text-sm font-medium text-muted-foreground">{t("geom.packCover")}</p>
            <ChipGrid
              ids={[...ROOF_COVERING_IDS]}
              selected={pack.covering}
              onSelect={(id) => patchPack({ covering: id })}
              labelOf={(id) => t(`product.${id}.name`)}
            />

            <p className="mt-4 mb-2 text-sm font-medium text-muted-foreground">{t("geom.packWood")}</p>
            <ChipGrid
              ids={[...ROOF_TIMBER_IDS]}
              selected={pack.timber}
              onSelect={(id) => patchPack({ timber: id })}
              labelOf={(id) => getProduct(id)?.sizeLabel ?? t(`product.${id}.name`)}
            />

            <p className="mt-4 mb-2 text-sm font-medium text-muted-foreground">{t("geom.packMembrane")}</p>
            <ChipGrid
              ids={[...ROOF_MEMBRANE_IDS, ROOF_NONE]}
              selected={pack.membrane}
              onSelect={(id) => patchPack({ membrane: id })}
              labelOf={(id) => (id === ROOF_NONE ? t("geom.none") : t(`product.${id}.name`))}
            />

            <p className="mt-4 mb-2 text-sm font-medium text-muted-foreground">{t("geom.packIso")}</p>
            <ChipGrid
              ids={[...ROOF_ISO_IDS, ROOF_NONE]}
              selected={pack.insulation}
              onSelect={(id) => patchPack({ insulation: id })}
              labelOf={(id) => (id === ROOF_NONE ? t("geom.none") : t(`product.${id}.name`))}
            />

            <p className="mt-4 mb-2 text-sm font-medium text-muted-foreground">{t("geom.packGutter")}</p>
            <ChipGrid
              ids={[...ROOF_GUTTER_IDS, ROOF_NONE]}
              selected={pack.gutter}
              onSelect={(id) => patchPack({ gutter: id })}
              labelOf={(id) => t(gutterLabelKey(id))}
            />
            {pack.gutter !== ROOF_NONE ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {t("geom.gutter")} {formatQty(gutters.gutterMl)} m · {formatQty(gutters.downspouts, 0)}{" "}
                {t("geom.downspout").toLowerCase()} · {formatQty(gutters.brackets + gutters.ends + gutters.corners + gutters.outlets + gutters.elbows + gutters.collars + gutters.joints, 0)}{" "}
                {t("calc.pieces").toLowerCase()}
              </p>
            ) : null}
          </section>
        ) : null}

        {kind !== "roof" && kind !== "porch" ? (
          <section>
            <p className="mb-2 text-base font-medium">{t("geom.openings")}</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => patch({ openings: [...measure.openings, defaultOpening("door")] })}
                className="h-14 rounded-xl bg-secondary text-base font-semibold"
              >
                {t("geom.addDoor")}
              </button>
              <button
                type="button"
                onClick={() => patch({ openings: [...measure.openings, defaultOpening("window")] })}
                className="h-14 rounded-xl bg-secondary text-base font-semibold"
              >
                {t("geom.addWindow")}
              </button>
            </div>
            <ul className="mt-3 grid gap-2">
              {measure.openings.map((o) => (
                <OpeningRow
                  key={o.id}
                  opening={o}
                  showWalls={kind === "room"}
                  onChange={(next) =>
                    patch({ openings: measure.openings.map((x) => (x.id === o.id ? next : x)) })
                  }
                  onRemove={() => patch({ openings: measure.openings.filter((x) => x.id !== o.id) })}
                />
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <section className="mt-8 rounded-2xl bg-primary p-5 text-primary-foreground">
        <p className="text-sm font-medium tracking-wide uppercase opacity-70">{t("calc.result")}</p>
        <dl className="mt-3 grid gap-3">
          {kind === "roof" ? (
            <>
              <Metric label={t("geom.plan")} value={`${formatQty(metrics.roofPlan)} m²`} />
              <Metric label={t("geom.slope")} value={`${formatQty(metrics.roof)} m²`} big />
              <Metric label={t("geom.pitch")} value={`${measure.pitch}° · ${t(roofKindLabelKey(roofKindOf(measure)))}`} />
            </>
          ) : null}
          {kind === "room" ? (
            <>
              <Metric label={t("geom.floor")} value={`${formatQty(metrics.floor)} m²`} big />
              <Metric label={t("geom.wallsNet")} value={`${formatQty(metrics.wallNet)} m²`} big />
              {metrics.roof > 0.05 ? <Metric label={t("geom.slope")} value={`${formatQty(metrics.roof)} m²`} /> : null}
              <Metric label={t("geom.ceiling")} value={`${formatQty(metrics.ceiling)} m²`} />
              <Metric label={t("geom.volume")} value={`${formatQty(metrics.volume)} m³`} />
            </>
          ) : null}
          {kind === "wall" ? (
            <>
              <Metric label={t("geom.wallsNet")} value={`${formatQty(metrics.wallNet)} m²`} big />
              <Metric label={t("geom.walls")} value={`${formatQty(metrics.wallGross)} m²`} />
            </>
          ) : null}
          {kind === "porch" ? (
            <>
              <Metric label={t("geom.floor")} value={`${formatQty(metrics.floor)} m²`} big />
              <Metric label={t("geom.slope")} value={`${formatQty(metrics.roof)} m²`} big />
              <Metric label={t("geom.posts")} value={formatQty(metrics.posts, 0)} />
              <Metric label={t("geom.pitch")} value={`${measure.pitch}° · ${t(roofKindLabelKey(roofKindOf(measure)))}`} />
            </>
          ) : null}
          {jobOf(measure) !== "demo" && kind !== "wall" ? (
            <div className="pt-1">
              <dt className="text-base opacity-80">{t("geom.pack")}</dt>
              <dd className="mt-1 text-base font-semibold leading-snug">
                {[
                  t(`product.${pack.covering}.name`),
                  getProduct(pack.timber)?.sizeLabel,
                  pack.membrane !== ROOF_NONE ? t(`product.${pack.membrane}.name`) : null,
                  pack.insulation !== ROOF_NONE ? t(`product.${pack.insulation}.name`) : null,
                  pack.gutter !== ROOF_NONE ? t(gutterLabelKey(pack.gutter)) : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </dd>
            </div>
          ) : null}
          {jobOf(measure) !== "demo" && kind !== "wall" && pack.gutter !== ROOF_NONE ? (
            <Metric
              label={t("geom.gutter")}
              value={`${formatQty(gutters.gutterMl)} m · ${formatQty(gutters.downspouts, 0)} ${t("geom.downspout").toLowerCase()}`}
            />
          ) : null}
          {engine.debris.tonnes > 0.05 ? (
            <>
              <Metric
                label={t("engine.debris")}
                value={`${formatQty(engine.debris.tonnes)} t`}
                big
              />
              <Metric
                label={t("engine.loose")}
                value={`${formatQty(engine.debris.looseM3)} m³ · ${formatQty(engine.debris.bins10 + engine.debris.bins5, 0)} ${t("engine.bins").toLowerCase()}`}
              />
            </>
          ) : null}
          <Metric
            label={t("engine.crew")}
            value={`${formatQty(engine.people, 0)} × ${formatQty(engine.days, 0)} gg · ${formatQty(engine.hours)} h`}
          />
          <Metric label={t("engine.labor")} value={formatEuro(engine.laborCost)} big />
        </dl>
      </section>

      {saved ? (
        <section className="mt-6">
          <p className="mb-3 text-sm font-medium tracking-[0.16em] text-muted-foreground uppercase">{t("geom.then")}</p>
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/lab/preventivi/planimetria"
              className="col-span-2 flex h-14 items-center justify-center rounded-xl bg-brick px-3 text-center text-base font-semibold text-brick-foreground"
            >
              {t("plan.title")}
            </Link>
            {kind === "roof" ? (
              <>
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "tegole" }} label={t("cat.tegole.name")} />
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "coppi" }} label={t("cat.coppi.name")} />
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "guaine" }} label={t("cat.guaine.name")} />
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "gronde" }} label={t("cat.gronde.name")} />
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "legno" }} label={t("cat.legno.name")} />
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "isolanti" }} label={t("cat.isolanti.name")} />
                <NextLink to="/lab/preventivi/cantiere/$id" params={{ id: "labor" }} label={t("workCat.labor.name")} />
              </>
            ) : null}
            {kind === "room" ? (
              <>
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "poroton" }} label={t("cat.poroton.name")} />
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "mattoni" }} label={t("cat.mattoni.name")} />
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "cemento" }} label={t("cat.cemento.name")} />
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "intonaci" }} label={t("cat.intonaci.name")} />
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "isolanti" }} label={t("cat.isolanti.name")} />
                <NextLink to="/lab/preventivi/cantiere/$id" params={{ id: "labor" }} label={t("workCat.labor.name")} />
                <NextLink to="/lab/preventivi/cantiere/$id" params={{ id: "smaltimento" }} label={t("workCat.smaltimento.name")} />
                <NextLink to="/lab/preventivi/cantiere/$id" params={{ id: "altro" }} label={t("workCat.altro.name")} />
              </>
            ) : null}
            {kind === "wall" ? (
              <>
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "poroton" }} label={t("cat.poroton.name")} />
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "foratini" }} label={t("cat.foratini.name")} />
                <NextLink to="/lab/preventivi/cantiere/$id" params={{ id: "labor" }} label={t("workCat.labor.name")} />
                <NextLink to="/lab/preventivi/cantiere/$id" params={{ id: "ponteggi" }} label={t("workCat.ponteggi.name")} />
              </>
            ) : null}
            {kind === "porch" ? (
              <>
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "tegole" }} label={t("cat.tegole.name")} />
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "guaine" }} label={t("cat.guaine.name")} />
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "gronde" }} label={t("cat.gronde.name")} />
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "legno" }} label={t("cat.legno.name")} />
                <NextLink to="/lab/preventivi/categoria/$id" params={{ id: "isolanti" }} label={t("cat.isolanti.name")} />
                <NextLink to="/lab/preventivi/cantiere/$id" params={{ id: "labor" }} label={t("workCat.labor.name")} />
              </>
            ) : null}
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => {
          applyGeometryQuote(measure);
          setSaved(true);
          void navigate({ to: "/lab/preventivi/lista" });
        }}
        className="mt-3 flex h-16 w-full items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-primary-foreground"
      >
        {t("plan.quote3d")}
      </button>
      <button
        type="button"
        onClick={() => {
          addMeasure({ ...measure, id: uid("ms") });
          setSaved(true);
        }}
        className="sticky bottom-[calc(4.85rem+env(safe-area-inset-bottom))] z-30 mt-3 flex h-16 w-full items-center justify-center rounded-2xl bg-brick text-lg font-semibold text-brick-foreground"
      >
        {saved ? t("geom.saved") : t("geom.save")}
      </button>
    </AppShell>
  );
}

function NextLink({
  to,
  params,
  label,
}: {
  to: "/lab/preventivi/categoria/$id" | "/lab/preventivi/cantiere/$id";
  params: { id: string };
  label: string;
}) {
  return (
    <Link
      to={to}
      params={params}
      className="flex h-14 items-center justify-center rounded-xl bg-secondary px-3 text-center text-base font-semibold"
    >
      {label}
    </Link>
  );
}

function Metric({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className="flex items-end justify-between gap-3">
      <dt className="text-base opacity-80">{label}</dt>
      <dd className={cn("font-semibold tabular-nums", big ? "text-3xl leading-none" : "text-xl")}>{value}</dd>
    </div>
  );
}

function OpeningRow({
  opening,
  showWalls,
  onChange,
  onRemove,
}: {
  opening: Opening;
  showWalls?: boolean;
  onChange: (o: Opening) => void;
  onRemove: () => void;
}) {
  const { t } = useT();
  const face = (opening.wall ?? 0) as WallFace;
  return (
    <li className="rounded-xl bg-card p-3 shadow-[var(--shadow-border)]">
      <p className="mb-2 font-semibold">{opening.kind === "door" ? t("geom.door") : t("geom.window")}</p>
      {showWalls ? (
        <div className="mb-2 grid grid-cols-4 gap-1">
          {WALL_FACES.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => onChange({ ...opening, wall: w })}
              className={cn(
                "h-10 rounded-lg text-xs font-semibold",
                face === w ? "bg-primary text-primary-foreground" : "bg-secondary",
              )}
            >
              {t((["plan.south", "plan.east", "plan.north", "plan.west"] as const)[w])}
            </button>
          ))}
        </div>
      ) : null}
      <div className="grid grid-cols-3 gap-2">
        <Mini
          label="L"
          value={opening.width}
          onChange={(n) => onChange({ ...opening, width: n })}
        />
        <Mini
          label="H"
          value={opening.height}
          onChange={(n) => onChange({ ...opening, height: n })}
        />
        <Mini
          label={t("geom.qty")}
          value={opening.qty}
          step={1}
          onChange={(n) => onChange({ ...opening, qty: n })}
        />
      </div>
      {opening.kind === "window" ? (
        <div className="mt-2">
          <Mini
            label={t("plan.sill")}
            value={opening.sill ?? 0.9}
            onChange={(n) => onChange({ ...opening, sill: n })}
          />
        </div>
      ) : null}
      <button
        type="button"
        onClick={onRemove}
        className="mt-2 h-11 w-full rounded-lg bg-secondary text-sm font-semibold text-destructive"
      >
        {t("list.delete")}
      </button>
    </li>
  );
}

function ChipGrid({
  ids,
  selected,
  onSelect,
  labelOf,
}: {
  ids: string[];
  selected: string;
  onSelect: (id: string) => void;
  labelOf: (id: string) => string;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {ids.map((id) => (
        <button
          key={id}
          type="button"
          data-pack-id={id}
          onClick={() => onSelect(id)}
          className={cn(
            "min-h-12 rounded-xl px-3 py-2 text-sm font-semibold leading-tight",
            selected === id ? "bg-primary text-primary-foreground" : "bg-secondary",
          )}
        >
          {labelOf(id)}
        </button>
      ))}
    </div>
  );
}

function Mini({
  label,
  value,
  onChange,
  step = 0.1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
}) {
  return (
    <label className="grid gap-1 text-xs text-muted-foreground">
      {label}
      <input
        type="text"
        inputMode="decimal"
        className="h-12 rounded-lg border border-input bg-background text-center text-lg font-semibold tabular-nums"
        value={String(value).replace(".", ",")}
        onChange={(e) => {
          const n = Number(e.target.value.replace(",", "."));
          if (Number.isFinite(n)) onChange(n);
        }}
        step={step}
      />
    </label>
  );
}
