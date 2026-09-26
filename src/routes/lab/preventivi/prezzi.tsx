import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/preventivi/components/app-shell";
import { MoneyInput } from "@/preventivi/components/money-input";
import { formatEuro, formatQty } from "@/preventivi/lib/format";
import { useT } from "@/preventivi/lib/i18n";
import { CATEGORY_ORDER, PRODUCTS } from "@/preventivi/lib/materials/catalog";
import { quoteCount, useMaterialStore } from "@/preventivi/lib/materials/store";
import { useHydrateApp } from "@/preventivi/lib/materials/use-hydrate";
import {
  catalogProductPrice,
  catalogWorkPrice,
  isCustomPrice,
  productPrice,
  productPriceUnit,
  workPrice,
  workPriceUnit,
} from "@/preventivi/lib/prices";
import { quoteTotals } from "@/preventivi/lib/quote/totals";
import { WORKS, WORK_CAT_ORDER } from "@/preventivi/lib/works/catalog";
import { cn } from "@/preventivi/lib/utils";

export const Route = createFileRoute("/lab/preventivi/prezzi")({ component: PricesPage });

type Tab = "all" | "materials" | "works";

function PricesPage() {
  useHydrateApp();
  const { t } = useT();
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const productPrices = useMaterialStore((s) => s.productPrices);
  const workPrices = useMaterialStore((s) => s.workPrices);
  const setProductPrice = useMaterialStore((s) => s.setProductPrice);
  const setWorkPrice = useMaterialStore((s) => s.setWorkPrice);
  const resetListino = useMaterialStore((s) => s.resetListino);
  const items = useMaterialStore((s) => s.items);
  const works = useMaterialStore((s) => s.works);
  const extras = useMaterialStore((s) => s.extras);
  const vatRate = useMaterialStore((s) => s.vatRate);
  const count = quoteCount({ items, works, extras });
  const totals = useMemo(() => quoteTotals(items, works, extras, vatRate), [items, works, extras, vatRate]);

  const needle = q.trim().toLowerCase();
  const customCount = Object.keys(productPrices).length + Object.keys(workPrices).length;

  const materialGroups = useMemo(() => {
    return CATEGORY_ORDER.map((cat) => ({
      cat,
      rows: PRODUCTS.filter((p) => {
        if (p.category !== cat) return false;
        if (!needle) return true;
        const name = t(`product.${p.id}.name`).toLowerCase();
        return name.includes(needle) || p.id.includes(needle) || p.sizeLabel.toLowerCase().includes(needle);
      }),
    })).filter((g) => g.rows.length > 0);
  }, [needle, t]);

  const workGroups = useMemo(() => {
    return WORK_CAT_ORDER.map((cat) => ({
      cat,
      rows: WORKS.filter((w) => {
        if (w.category !== cat) return false;
        if (!needle) return true;
        const name = t(`workItem.${w.id}.name`).toLowerCase();
        return name.includes(needle) || w.id.includes(needle);
      }),
    })).filter((g) => g.rows.length > 0);
  }, [needle, t]);

  const showMat = tab !== "works";
  const showWorks = tab !== "materials";
  const empty = (showMat ? materialGroups.length === 0 : true) && (showWorks ? workGroups.length === 0 : true);

  return (
    <AppShell title={t("prices.title")} back={{ to: "/lab/preventivi" }} backLabel={t("calc.back")}>
      <p className="text-base text-muted-foreground">{t("prices.lead")}</p>

      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t("prices.search")}
        className="mt-4 h-14 w-full rounded-xl border border-input bg-background px-4 text-base"
      />

      <div className="mt-3 grid grid-cols-3 gap-2">
        {(["all", "materials", "works"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "h-12 rounded-xl text-sm font-semibold",
              tab === id ? "bg-primary text-primary-foreground" : "bg-secondary",
            )}
          >
            {id === "all" ? t("prices.all") : id === "materials" ? t("prices.materials") : t("prices.works")}
          </button>
        ))}
      </div>

      {customCount > 0 ? (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-card px-4 py-3 shadow-[var(--shadow-border)]">
          <p className="text-sm text-muted-foreground">
            {t("prices.customCount", { n: formatQty(customCount, 0) })}
          </p>
          <button type="button" onClick={() => resetListino()} className="h-11 rounded-xl bg-secondary px-4 text-sm font-semibold">
            {t("prices.reset")}
          </button>
        </div>
      ) : null}

      {count > 0 ? (
        <Link
          to="/lab/preventivi/lista"
          className="mt-3 flex h-14 items-center justify-between rounded-xl bg-brick px-4 text-base font-semibold text-brick-foreground"
        >
          <span>{t("prices.openQuote")}</span>
          <span className="tabular-nums">{formatEuro(totals.total)}</span>
        </Link>
      ) : null}

      {empty ? <p className="mt-8 text-base text-muted-foreground">{t("prices.emptySearch")}</p> : null}

      {showMat
        ? materialGroups.map((g) => (
            <section key={g.cat} className="mt-6">
              <h2 className="mb-2 text-sm font-medium tracking-[0.16em] text-muted-foreground uppercase">
                {t(`cat.${g.cat}.name`)}
              </h2>
              <ul className="grid gap-2">
                {g.rows.map((p) => {
                  const price = productPrice(p.id, productPrices);
                  const custom = isCustomPrice(price, catalogProductPrice(p.id));
                  const unit = productPriceUnit(p);
                  return (
                    <li key={p.id} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-[var(--shadow-border)]">
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-semibold leading-tight">{t(`product.${p.id}.name`)}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {p.sizeLabel} · € / {unit}
                          {custom ? ` · ${t("prices.custom")}` : ""}
                        </p>
                      </div>
                      <div className="w-[7.5rem] shrink-0">
                        <MoneyInput
                          value={price}
                          ariaLabel={t(`product.${p.id}.name`)}
                          onCommit={(n) => setProductPrice(p.id, n)}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))
        : null}

      {showWorks
        ? workGroups.map((g) => (
            <section key={g.cat} className="mt-6">
              <h2 className="mb-2 text-sm font-medium tracking-[0.16em] text-muted-foreground uppercase">
                {t(`workCat.${g.cat}.name`)}
              </h2>
              <ul className="grid gap-2">
                {g.rows.map((w) => {
                  const price = workPrice(w.id, workPrices);
                  const custom = isCustomPrice(price, catalogWorkPrice(w.id));
                  const unit = workPriceUnit(w);
                  return (
                    <li key={w.id} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-[var(--shadow-border)]">
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-semibold leading-tight">{t(`workItem.${w.id}.name`)}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          € / {unit}
                          {custom ? ` · ${t("prices.custom")}` : ""}
                        </p>
                      </div>
                      <div className="w-[7.5rem] shrink-0">
                        <MoneyInput
                          value={price}
                          ariaLabel={t(`workItem.${w.id}.name`)}
                          onCommit={(n) => setWorkPrice(w.id, n)}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))
        : null}

      <p className="mt-8 text-sm text-muted-foreground">{t("prices.hint")}</p>
    </AppShell>
  );
}
