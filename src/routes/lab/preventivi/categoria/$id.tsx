import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/preventivi/components/app-shell";
import { formatEuro, formatQty } from "@/preventivi/lib/format";
import { useT } from "@/preventivi/lib/i18n";
import { CATEGORY_ORDER, productsIn } from "@/preventivi/lib/materials/catalog";
import { useMaterialStore } from "@/preventivi/lib/materials/store";
import { useHydrateApp } from "@/preventivi/lib/materials/use-hydrate";
import { productPrice, productPriceUnit } from "@/preventivi/lib/prices";
import type { CategoryId } from "@/preventivi/lib/materials/types";

export const Route = createFileRoute("/lab/preventivi/categoria/$id")({ component: CategoryPage });

function isCategory(id: string): id is CategoryId {
  return (CATEGORY_ORDER as readonly string[]).includes(id);
}

function CategoryPage() {
  useHydrateApp();
  const { t } = useT();
  const { id } = Route.useParams();

  if (!isCategory(id)) {
    return (
      <AppShell back={{ to: "/lab/preventivi" }} backLabel={t("calc.back")}>
        <h1 className="text-2xl font-semibold">{t("missing.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("missing.lead")}</p>
      </AppShell>
    );
  }

  const items = productsIn(id);
  const productPrices = useMaterialStore((s) => s.productPrices);

  return (
    <AppShell title={t(`cat.${id}.name`)} back={{ to: "/lab/preventivi" }} backLabel={t("calc.back")}>
      <p className="mb-4 text-base text-muted-foreground">{t(`cat.${id}.hint`)}</p>
      <ul className="grid gap-3">
        {items.map((p) => (
          <li key={p.id}>
            <Link
              to="/lab/preventivi/prodotto/$id"
              params={{ id: p.id }}
              className="flex min-h-24 flex-col justify-center rounded-2xl bg-card px-4 py-4 shadow-[var(--shadow-border)] active:scale-[0.99]"
            >
              <span className="text-xl font-semibold leading-tight">{t(`product.${p.id}.name`)}</span>
              <span className="mt-1 text-lg tabular-nums text-foreground">{p.sizeLabel}</span>
              <span className="mt-0.5 text-sm tabular-nums text-muted-foreground">
                {formatEuro(productPrice(p.id, productPrices))} / {productPriceUnit(p)}
                {" · "}
                {p.kind === "linear"
                  ? t(`product.${p.id}.note`)
                  : p.kind === "count"
                    ? t(`product.${p.id}.note`)
                    : p.yieldUnit === "sacco/m³"
                    ? t("calc.perM3", { n: formatQty(p.yieldPerUnit) })
                    : p.yieldUnit === "sacco/m²"
                      ? t("calc.perM2Bag", { n: formatQty(p.yieldPerUnit) })
                      : p.yieldUnit === "pz/ml"
                        ? t("calc.perMl", { n: formatQty(p.yieldPerUnit, 2) })
                        : t("calc.perM2", { n: formatQty(p.yieldPerUnit) })}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
