import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/preventivi/components/app-shell";
import { Stepper } from "@/preventivi/components/stepper";
import { formatEuro, formatQty } from "@/preventivi/lib/format";
import { useT } from "@/preventivi/lib/i18n";
import { compute, emptyInput, formatWeight, inputArea } from "@/preventivi/lib/materials/calc";
import { getProduct } from "@/preventivi/lib/materials/catalog";
import { useMaterialStore } from "@/preventivi/lib/materials/store";
import { useHydrateApp } from "@/preventivi/lib/materials/use-hydrate";
import { productPrice } from "@/preventivi/lib/prices";
import type { CalcInput } from "@/preventivi/lib/materials/types";
import { cn } from "@/preventivi/lib/utils";

export const Route = createFileRoute("/lab/preventivi/prodotto/$id")({ component: ProductPage });

const AREA_CHIPS = [10, 20, 50, 80, 100];
const VOL_CHIPS = [0.5, 1, 2, 3, 5];
const LEN_CHIPS = [3, 4, 5, 6, 8, 12];

function ProductPage() {
  useHydrateApp();
  const { t } = useT();
  const { id } = Route.useParams();
  const product = getProduct(id);
  const addItem = useMaterialStore((s) => s.addItem);
  const last = useMaterialStore((s) => s.lastMetrics);
  const productPrices = useMaterialStore((s) => s.productPrices);
  const setProductPrice = useMaterialStore((s) => s.setProductPrice);
  const [input, setInput] = useState<CalcInput | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!product) return;
    setInput({ ...emptyInput(product), unitPrice: productPrice(product.id, productPrices) });
    setAdded(false);
  }, [product]);

  const result = useMemo(() => (product && input ? compute(product, input) : null), [product, input]);

  if (!product || !input || !result) {
    return (
      <AppShell back={{ to: "/lab/preventivi" }} backLabel={t("calc.back")}>
        <h1 className="text-2xl font-semibold">{t("missing.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("missing.lead")}</p>
      </AppShell>
    );
  }

  const patch = (partial: Partial<CalcInput>) => {
    setInput((prev) => (prev ? { ...prev, ...partial } : prev));
    if (partial.unitPrice != null) setProductPrice(product.id, partial.unitPrice);
    setAdded(false);
  };

  const areaLabel =
    product.areaSurface === "roof"
      ? t("calc.roof")
      : product.areaSurface === "wall"
        ? t("calc.wall")
        : product.areaSurface === "floor"
          ? t("geom.floor")
          : product.areaSurface === "joint"
            ? t("geom.joint")
            : t("calc.area");
  const lastArea =
    product.areaSurface === "roof"
      ? last.roof
      : product.areaSurface === "wall"
        ? last.wall
        : product.areaSurface === "joint"
          ? 0
          : last.floor;
  const lastVolume = last.volume;
  const canAdd =
    product.kind === "linear"
      ? input.bars > 0 && input.length > 0
      : product.kind === "count-volume"
        ? input.volume > 0
        : product.kind === "count"
          ? input.bars > 0
          : inputArea(input) > 0;

  return (
    <AppShell
      title={t(`product.${product.id}.name`)}
      back={{ to: "/lab/preventivi/categoria/$id", params: { id: product.category } }}
      backLabel={t("calc.back")}
    >
      <p className="text-2xl font-semibold tabular-nums">{product.sizeLabel}</p>
      <p className="mt-1 text-base text-muted-foreground">{t(`product.${product.id}.note`)}</p>
      <p className="mt-1 text-lg tabular-nums">
        {formatEuro(product.unitPrice)} / {product.kind === "linear" ? "m" : result.unit === "sacco" ? t("calc.bags").toLowerCase().replace(/ .*/, "") : "pz"}
      </p>

      <div className="mt-6 grid gap-6">
        {product.kind === "count-area" ? (
          <>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => patch({ useDims: false })}
                className={cn(
                  "h-12 flex-1 rounded-xl text-base font-semibold",
                  !input.useDims ? "bg-primary text-primary-foreground" : "bg-secondary",
                )}
              >
                {t("calc.simple")}
              </button>
              <button
                type="button"
                onClick={() => patch({ useDims: true })}
                className={cn(
                  "h-12 flex-1 rounded-xl text-base font-semibold",
                  input.useDims ? "bg-primary text-primary-foreground" : "bg-secondary",
                )}
              >
                {t("calc.dims")}
              </button>
            </div>

            {input.useDims ? (
              <>
                <Stepper
                  id="len"
                  label={t("calc.length")}
                  unit="m"
                  value={input.length}
                  step={0.1}
                  onChange={(n) => patch({ length: n })}
                />
                <Stepper
                  id="wid"
                  label={product.areaSurface === "wall" ? t("calc.height") : t("calc.width")}
                  unit="m"
                  value={input.width}
                  step={0.1}
                  onChange={(n) => patch({ width: n })}
                />
                <p className="text-center text-lg tabular-nums text-muted-foreground">
                  {formatQty(inputArea(input))} m²
                </p>
              </>
            ) : (
              <>
                {lastArea > 0 ? (
                  <button
                    type="button"
                    onClick={() => patch({ area: lastArea, useDims: false })}
                    className="h-14 rounded-xl bg-secondary text-base font-semibold"
                  >
                    {t("calc.useLast", { n: formatQty(lastArea) })}
                  </button>
                ) : null}
                <Stepper
                  id="area"
                  label={areaLabel}
                  value={input.area}
                  step={0.1}
                  onChange={(n) => patch({ area: n })}
                />
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">{t("calc.quick")}</p>
                  <div className="flex flex-wrap gap-2">
                    {AREA_CHIPS.map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => patch({ area: n, useDims: false })}
                        className={cn(
                          "h-12 min-w-16 rounded-xl px-4 text-base font-semibold tabular-nums",
                          input.area === n && !input.useDims ? "bg-primary text-primary-foreground" : "bg-secondary",
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        ) : null}

        {product.kind === "count-volume" ? (
          <>
            {lastVolume > 0 ? (
              <button
                type="button"
                onClick={() => patch({ volume: lastVolume })}
                className="h-14 rounded-xl bg-secondary text-base font-semibold"
              >
                {t("quote.suggest")}: {formatQty(lastVolume)} m³
              </button>
            ) : null}
            <Stepper
              id="vol"
              label={t("calc.volume")}
              value={input.volume}
              step={0.1}
              onChange={(n) => patch({ volume: n })}
            />
            <div className="flex flex-wrap gap-2">
              {VOL_CHIPS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => patch({ volume: n })}
                  className={cn(
                    "h-12 min-w-16 rounded-xl px-4 text-base font-semibold tabular-nums",
                    input.volume === n ? "bg-primary text-primary-foreground" : "bg-secondary",
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </>
        ) : null}

        {product.kind === "linear" ? (
          <>
            <Stepper
              id="bars"
              label={t("calc.bars")}
              value={input.bars}
              step={1}
              min={1}
              onChange={(n) => patch({ bars: n })}
            />
            <Stepper
              id="blen"
              label={t("calc.barLen")}
              unit="m"
              value={input.length}
              step={0.5}
              onChange={(n) => patch({ length: n })}
            />
            <div className="flex flex-wrap gap-2">
              {LEN_CHIPS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => patch({ length: n })}
                  className={cn(
                    "h-12 min-w-14 rounded-xl px-3 text-base font-semibold tabular-nums",
                    input.length === n ? "bg-primary text-primary-foreground" : "bg-secondary",
                  )}
                >
                  {n} m
                </button>
              ))}
            </div>
          </>
        ) : null}

        {product.kind === "count" ? (
          <Stepper
            id="bars"
            label={t("calc.bars")}
            value={input.bars}
            step={1}
            min={1}
            onChange={(n) => patch({ bars: n })}
          />
        ) : null}

        <Stepper
          id="waste"
          label={t("calc.waste")}
          unit="%"
          value={input.waste}
          step={1}
          max={30}
          onChange={(n) => patch({ waste: n })}
        />
        <Stepper
          id="price"
          label={`${t("quote.price")} € / ${product.kind === "linear" ? "m" : result.unit === "sacco" ? "sacco" : "pz"}`}
          value={input.unitPrice}
          step={0.1}
          onChange={(n) => patch({ unitPrice: n })}
        />
      </div>

      <section className="mt-8 rounded-2xl bg-primary p-5 text-primary-foreground">
        <p className="text-sm font-medium tracking-wide uppercase opacity-70">{t("calc.result")}</p>
        {product.kind === "linear" ? (
          <dl className="mt-3 grid gap-3">
            <Row label={t("calc.meters")} value={`${formatQty(result.meters ?? 0)} m`} big />
            {result.volumeM3 != null ? (
              <Row label={t("calc.woodVol")} value={`${formatQty(result.volumeM3, 3)} m³`} />
            ) : null}
            <Row label={t("quote.amount")} value={formatEuro(result.total)} />
          </dl>
        ) : (
          <dl className="mt-3 grid gap-3">
            <Row
              label={result.unit === "sacco" ? t("calc.bags") : t("calc.pieces")}
              value={formatQty(result.pieces, 0)}
              big
            />
            {result.packs != null && product.packSize ? (
              <Row
                label={product.packKind === "rotolo" ? t("calc.rolls") : t("calc.packs")}
                value={`${formatQty(result.packs, 0)}  ·  ${
                  product.packKind === "rotolo"
                    ? t("calc.rollOf", { n: product.packSize })
                    : t("calc.packOf", { n: product.packSize })
                }`}
              />
            ) : null}
            {result.weightKg != null && result.weightKg > 0 ? (
              <Row
                label={t("calc.weight")}
                value={
                  formatWeight(result.weightKg).unit === "t"
                    ? `${formatQty(formatWeight(result.weightKg).value)} t`
                    : `${formatQty(formatWeight(result.weightKg).value, 0)} kg`
                }
              />
            ) : null}
            <Row label={t("quote.amount")} value={formatEuro(result.total)} />
          </dl>
        )}
      </section>

      <button
        type="button"
        disabled={!canAdd}
        onClick={() => {
          addItem(product.id, input);
          setAdded(true);
        }}
        className="sticky bottom-[calc(4.85rem+env(safe-area-inset-bottom))] z-30 mt-5 flex h-16 w-full items-center justify-center rounded-2xl bg-brick text-lg font-semibold text-brick-foreground disabled:opacity-40"
      >
        {added ? t("calc.added") : t("calc.add")}
      </button>
    </AppShell>
  );
}

function Row({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className="flex items-end justify-between gap-3">
      <dt className="text-base opacity-80">{label}</dt>
      <dd className={cn("font-semibold tabular-nums", big ? "text-4xl leading-none" : "text-xl")}>{value}</dd>
    </div>
  );
}
