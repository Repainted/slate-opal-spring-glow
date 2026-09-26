import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/preventivi/components/app-shell";
import { formatEuro } from "@/preventivi/lib/format";
import { useT } from "@/preventivi/lib/i18n";
import { useHydrateApp } from "@/preventivi/lib/materials/use-hydrate";
import { useMaterialStore } from "@/preventivi/lib/materials/store";
import { workPrice, workPriceUnit } from "@/preventivi/lib/prices";
import { WORK_CAT_ORDER, worksIn } from "@/preventivi/lib/works/catalog";
import type { WorkCat } from "@/preventivi/lib/works/types";

export const Route = createFileRoute("/lab/preventivi/cantiere/$id")({ component: WorkCatPage });

function isWorkCat(id: string): id is WorkCat {
  return (WORK_CAT_ORDER as readonly string[]).includes(id);
}

function WorkCatPage() {
  useHydrateApp();
  const { t } = useT();
  const { id } = Route.useParams();

  if (!isWorkCat(id)) {
    return (
      <AppShell back={{ to: "/lab/preventivi" }} backLabel={t("calc.back")}>
        <h1 className="text-2xl font-semibold">{t("missing.title")}</h1>
      </AppShell>
    );
  }

  const items = worksIn(id);
  const workPrices = useMaterialStore((s) => s.workPrices);

  return (
    <AppShell title={t(`workCat.${id}.name`)} back={{ to: "/lab/preventivi" }} backLabel={t("calc.back")}>
      <p className="mb-4 text-base text-muted-foreground">{t(`workCat.${id}.hint`)}</p>
      <ul className="grid gap-3">
        {id === "altro" ? (
          <li>
            <Link
              to="/lab/preventivi/extra"
              className="flex min-h-24 flex-col justify-center rounded-2xl bg-primary px-4 py-4 text-primary-foreground active:scale-[0.99]"
            >
              <span className="text-xl font-semibold leading-tight">{t("quote.freeItem")}</span>
              <span className="mt-0.5 text-sm text-primary-foreground/70">{t("quote.extraLead")}</span>
            </Link>
          </li>
        ) : null}
        {items.map((w) => (
          <li key={w.id}>
            <Link
              to="/lab/preventivi/voce/$id"
              params={{ id: w.id }}
              className="flex min-h-24 flex-col justify-center rounded-2xl bg-card px-4 py-4 shadow-[var(--shadow-border)] active:scale-[0.99]"
            >
              <span className="text-xl font-semibold leading-tight">{t(`workItem.${w.id}.name`)}</span>
              <span className="mt-1 text-lg tabular-nums">
                {formatEuro(workPrice(w.id, workPrices))} / {workPriceUnit(w)}
              </span>
              <span className="mt-0.5 text-sm text-muted-foreground">{t(`workItem.${w.id}.note`)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
