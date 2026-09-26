import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/preventivi/components/app-shell";
import { Stepper } from "@/preventivi/components/stepper";
import { formatEuro, formatQty } from "@/preventivi/lib/format";
import { useT } from "@/preventivi/lib/i18n";
import { useMaterialStore } from "@/preventivi/lib/materials/store";
import { useHydrateApp } from "@/preventivi/lib/materials/use-hydrate";
import { autoQty, computeWork, emptyWorkInput, suggestLaborDays } from "@/preventivi/lib/works/calc";
import { getWork } from "@/preventivi/lib/works/catalog";
import { workPrice } from "@/preventivi/lib/prices";
import type { WorkInput } from "@/preventivi/lib/works/types";
import { cn } from "@/preventivi/lib/utils";

export const Route = createFileRoute("/lab/preventivi/voce/$id")({ component: WorkPage });

function WorkPage() {
  useHydrateApp();
  const { t } = useT();
  const { id } = Route.useParams();
  const work = getWork(id);
  const addWork = useMaterialStore((s) => s.addWork);
  const last = useMaterialStore((s) => s.lastMetrics);
  const workPrices = useMaterialStore((s) => s.workPrices);
  const setWorkPrice = useMaterialStore((s) => s.setWorkPrice);
  const [input, setInput] = useState<WorkInput | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!work) return;
    const qty = autoQty(work, last);
    const days = suggestLaborDays(work, last, 2) ?? undefined;
    setInput({ ...emptyWorkInput(work, qty, days), unitPrice: workPrice(work.id, workPrices) });
    setAdded(false);
  }, [work, last.wall, last.roof, last.floor, last.volume]);

  const result = useMemo(() => (work && input ? computeWork(work, input) : null), [work, input]);
  const suggestedDays = work && input ? suggestLaborDays(work, last, input.people) : null;
  const qtyFromMeasure = work ? autoQty(work, last) : 0;

  if (!work || !input || !result) {
    return (
      <AppShell back={{ to: "/lab/preventivi" }} backLabel={t("calc.back")}>
        <h1 className="text-2xl font-semibold">{t("missing.title")}</h1>
      </AppShell>
    );
  }

  const patch = (partial: Partial<WorkInput>) => {
    setInput((prev) => (prev ? { ...prev, ...partial } : prev));
    if (partial.unitPrice != null) setWorkPrice(work.id, partial.unitPrice);
    setAdded(false);
  };

  const qtyLabel =
    work.unit === "m²"
      ? "m²"
      : work.unit === "m³"
        ? "m³"
        : work.unit === "t"
          ? "t"
          : work.unit === "ml"
            ? "m"
            : t("geom.qty");

  const canAdd = result.total > 0 || result.qty > 0;

  return (
    <AppShell
      title={t(`workItem.${work.id}.name`)}
      back={{ to: "/lab/preventivi/cantiere/$id", params: { id: work.category } }}
      backLabel={t("calc.back")}
    >
      <p className="text-base text-muted-foreground">{t(`workItem.${work.id}.note`)}</p>

      <div className="mt-6 grid gap-6">
        {work.category === "labor" ? (
          <>
            {suggestedDays != null ? (
              <button
                type="button"
                onClick={() => patch({ days: suggestedDays })}
                className="h-14 rounded-xl bg-secondary text-base font-semibold"
              >
                {t("quote.suggest")}: {formatQty(qtyFromMeasure)} {work.autoFrom === "roof" ? "m²" : work.autoFrom === "volume" ? "m³" : "m²"} →{" "}
                {formatQty(suggestedDays, 0)} {t("quote.days").toLowerCase()}
              </button>
            ) : null}
            <Stepper
              id="people"
              label={t("quote.people")}
              value={input.people}
              step={1}
              min={1}
              onChange={(n) => {
                const nextDays = suggestLaborDays(work, last, n);
                patch({ people: n, ...(nextDays != null ? { days: nextDays } : {}) });
              }}
            />
            <Stepper
              id="days"
              label={t("quote.days")}
              value={input.days}
              step={1}
              min={1}
              onChange={(n) => patch({ days: n })}
            />
            <Stepper
              id="hpd"
              label={t("quote.hoursDay")}
              value={input.hoursPerDay}
              step={1}
              min={1}
              max={12}
              onChange={(n) => patch({ hoursPerDay: n })}
            />
            <p className="text-sm text-muted-foreground">{t("quote.hoursHint")}</p>
          </>
        ) : work.unit === "gg" ? (
          <Stepper
            id="days"
            label={t("quote.days")}
            value={input.days}
            step={1}
            min={1}
            onChange={(n) => patch({ days: n })}
          />
        ) : (
          <>
            {qtyFromMeasure > 0 ? (
              <button
                type="button"
                onClick={() => patch({ qty: qtyFromMeasure })}
                className="h-14 rounded-xl bg-secondary text-base font-semibold"
              >
                {t("quote.suggest")}: {formatQty(qtyFromMeasure)} {work.unit}
              </button>
            ) : null}
            <Stepper
              id="qty"
              label={qtyLabel}
              value={input.qty}
              step={work.unit === "cad" ? 1 : 0.1}
              min={0}
              onChange={(n) => patch({ qty: n })}
            />
          </>
        )}

        <Stepper
          id="price"
          label={`${t("quote.price")} € / ${work.unit}`}
          value={input.unitPrice}
          step={1}
          onChange={(n) => patch({ unitPrice: n })}
        />
      </div>

      <section className="mt-8 rounded-2xl bg-primary p-5 text-primary-foreground">
        <p className="text-sm font-medium tracking-wide uppercase opacity-70">{t("calc.result")}</p>
        <dl className="mt-3 grid gap-3">
          {work.category === "labor" ? (
            <Row label={t("quote.hoursTotal")} value={formatQty(result.hours)} big />
          ) : (
            <Row label={t("quote.unit")} value={`${formatQty(result.qty)} ${work.unit}`} />
          )}
          <Row label={t("quote.amount")} value={formatEuro(result.total)} big />
        </dl>
      </section>

      <button
        type="button"
        disabled={!canAdd}
        onClick={() => {
          addWork(work.id, input);
          setAdded(true);
        }}
        className={cn(
          "sticky bottom-[calc(4.85rem+env(safe-area-inset-bottom))] z-30 mt-5 flex h-16 w-full items-center justify-center rounded-2xl bg-brick text-lg font-semibold text-brick-foreground disabled:opacity-40",
        )}
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
      <dd className={cn("font-semibold tabular-nums", big ? "text-3xl leading-none" : "text-xl")}>{value}</dd>
    </div>
  );
}
