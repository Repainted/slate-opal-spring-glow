import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/preventivi/components/app-shell";
import { Stepper } from "@/preventivi/components/stepper";
import { formatEuro } from "@/preventivi/lib/format";
import { useT } from "@/preventivi/lib/i18n";
import { useMaterialStore } from "@/preventivi/lib/materials/store";
import { useHydrateApp } from "@/preventivi/lib/materials/use-hydrate";
import { computeExtra } from "@/preventivi/lib/works/calc";
import { WORK_UNITS } from "@/preventivi/lib/works/catalog";
import type { WorkUnit } from "@/preventivi/lib/works/types";
import { cn } from "@/preventivi/lib/utils";

export const Route = createFileRoute("/lab/preventivi/extra")({ component: ExtraPage });

function ExtraPage() {
  useHydrateApp();
  const { t } = useT();
  const addExtra = useMaterialStore((s) => s.addExtra);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState<WorkUnit>("cad");
  const [qty, setQty] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [added, setAdded] = useState(false);

  const line = { name: name.trim(), unit, qty, unitPrice };
  const total = computeExtra({ ...line, id: "tmp", addedAt: "" });
  const canAdd = line.name.length > 0 && (qty > 0 || total > 0);

  return (
    <AppShell title={t("quote.freeItem")} back={{ to: "/lab/preventivi/cantiere/$id", params: { id: "altro" } }} backLabel={t("calc.back")}>
      <p className="text-base text-muted-foreground">{t("quote.extraLead")}</p>

      <div className="mt-6 grid gap-6">
        <label className="grid gap-2">
          <span className="text-base font-medium">{t("quote.extraName")}</span>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setAdded(false);
            }}
            placeholder={t("quote.extraName")}
            className="h-16 rounded-xl border border-input bg-card px-4 text-lg shadow-[var(--shadow-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>

        <div>
          <p className="mb-2 text-base font-medium">{t("quote.extraUnit")}</p>
          <div className="flex flex-wrap gap-2">
            {WORK_UNITS.map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => {
                  setUnit(u);
                  setAdded(false);
                }}
                className={cn(
                  "h-12 min-w-14 rounded-xl px-3 text-base font-semibold",
                  unit === u ? "bg-primary text-primary-foreground" : "bg-secondary",
                )}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        <Stepper
          id="qty"
          label={t("geom.qty")}
          value={qty}
          step={unit === "cad" || unit === "gg" || unit === "h" ? 1 : 0.1}
          min={0}
          onChange={(n) => {
            setQty(n);
            setAdded(false);
          }}
        />
        <Stepper
          id="price"
          label={`${t("quote.price")} € / ${unit}`}
          value={unitPrice}
          step={1}
          onChange={(n) => {
            setUnitPrice(n);
            setAdded(false);
          }}
        />
      </div>

      <section className="mt-8 rounded-2xl bg-primary p-5 text-primary-foreground">
        <p className="text-sm font-medium tracking-wide uppercase opacity-70">{t("calc.result")}</p>
        <p className="mt-3 text-3xl font-semibold tabular-nums">{formatEuro(total)}</p>
      </section>

      <button
        type="button"
        disabled={!canAdd}
        onClick={() => {
          addExtra(line);
          setAdded(true);
        }}
        className="sticky bottom-[calc(4.85rem+env(safe-area-inset-bottom))] z-30 mt-5 flex h-16 w-full items-center justify-center rounded-2xl bg-brick text-lg font-semibold text-brick-foreground disabled:opacity-40"
      >
        {added ? t("calc.added") : t("calc.add")}
      </button>
    </AppShell>
  );
}
