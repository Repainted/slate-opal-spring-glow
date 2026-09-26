import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/preventivi/components/app-shell";
import { InstallApp } from "@/preventivi/components/install-app";
import { LanguageSwitcher } from "@/preventivi/components/language-switcher";
import { MaterialIcon } from "@/preventivi/components/material-icon";
import { WorkIcon } from "@/preventivi/components/work-icon";
import { formatQty } from "@/preventivi/lib/format";
import { useT } from "@/preventivi/lib/i18n";
import { CATEGORY_ORDER } from "@/preventivi/lib/materials/catalog";
import { useMaterialStore } from "@/preventivi/lib/materials/store";
import { useHydrateApp } from "@/preventivi/lib/materials/use-hydrate";
import { WORK_CAT_ORDER } from "@/preventivi/lib/works/catalog";
import { cn } from "@/preventivi/lib/utils";

export const Route = createFileRoute("/lab/preventivi/")({ component: Home });

function Home() {
  useHydrateApp();
  const { t } = useT();
  const last = useMaterialStore((s) => s.lastMetrics);

  return (
    <AppShell>
      <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">{t("home.kicker")}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{t("home.title")}</h1>
      <p className="mt-2 text-base text-muted-foreground">{t("home.lead")}</p>

      <div className="mt-5">
        <LanguageSwitcher />
      </div>
      <InstallApp compact />

      {last.roof > 0 || last.wall > 0 || last.floor > 0 ? (
        <p className="mt-4 rounded-xl bg-card px-4 py-3 text-sm tabular-nums text-muted-foreground shadow-[var(--shadow-border)]">
          {last.roof > 0 ? `${t("geom.tetto")} ${formatQty(last.roof)} m²` : null}
          {last.roof > 0 && (last.wall > 0 || last.floor > 0) ? " · " : null}
          {last.wall > 0 ? `${t("geom.muro")} ${formatQty(last.wall)} m²` : null}
          {last.wall > 0 && last.floor > 0 ? " · " : null}
          {last.floor > 0 ? `${t("geom.floor")} ${formatQty(last.floor)} m²` : null}
        </p>
      ) : null}

      <h2 className="mt-8 text-sm font-medium tracking-[0.16em] text-muted-foreground uppercase">
        {t("home.measures")}
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {(["tetto", "stanza", "muro", "portico"] as const).map((id) => (
          <Link
            key={id}
            to="/lab/preventivi/misura/$kind"
            params={{ kind: id }}
            className="flex min-h-28 flex-col justify-between rounded-2xl bg-primary p-3 text-primary-foreground active:scale-[0.99]"
          >
            <WorkIcon
              id={id === "tetto" ? "roof" : id === "stanza" ? "room" : id === "muro" ? "wall" : "porch"}
              className="size-9 opacity-90"
            />
            <span>
              <span className="block text-lg font-semibold leading-tight">{t(`geom.${id}`)}</span>
              <span className="mt-0.5 block text-xs text-primary-foreground/70">{t(`geom.${id}Hint`)}</span>
            </span>
          </Link>
        ))}
        <Link
          to="/lab/preventivi/planimetria"
          className="col-span-3 flex min-h-20 items-center gap-4 rounded-2xl bg-brick px-4 py-3 text-brick-foreground active:scale-[0.99]"
        >
          <WorkIcon id="plan" className="size-10 opacity-90" />
          <span>
            <span className="block text-lg font-semibold leading-tight">{t("plan.title")}</span>
            <span className="mt-0.5 block text-xs text-brick-foreground/75">{t("plan.homeHint")}</span>
          </span>
        </Link>
      </div>

      <h2 className="mt-8 text-sm font-medium tracking-[0.16em] text-muted-foreground uppercase">
        {t("home.site")}
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {WORK_CAT_ORDER.map((id) => {
          const wide = id === "altro";
          return (
            <Link
              key={id}
              to="/lab/preventivi/cantiere/$id"
              params={{ id }}
              className={cn(
                "flex min-h-24 flex-col justify-between rounded-2xl bg-primary p-4 text-primary-foreground active:scale-[0.99]",
                wide && "col-span-2 min-h-20 flex-row items-center justify-start gap-4",
              )}
            >
              <WorkIcon id={id} className="size-9 opacity-90" />
              <span>
                <span className="block text-lg font-semibold leading-tight">{t(`workCat.${id}.name`)}</span>
                <span className="mt-0.5 block text-xs text-primary-foreground/70">{t(`workCat.${id}.hint`)}</span>
              </span>
            </Link>
          );
        })}
      </div>

      <h2 className="mt-8 text-sm font-medium tracking-[0.16em] text-muted-foreground uppercase">
        {t("home.materials")}
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Link
          to="/lab/preventivi/prezzi"
          className="flex min-h-20 flex-col justify-center rounded-2xl bg-card px-4 py-3 shadow-[var(--shadow-border)] active:scale-[0.99]"
        >
          <span className="text-lg font-semibold leading-tight">{t("prices.title")}</span>
          <span className="mt-0.5 text-xs text-muted-foreground">{t("prices.lead")}</span>
        </Link>
        <Link
          to="/lab/preventivi/aziende"
          className="flex min-h-20 flex-col justify-center rounded-2xl bg-card px-4 py-3 shadow-[var(--shadow-border)] active:scale-[0.99]"
        >
          <span className="text-lg font-semibold leading-tight">{t("company.title")}</span>
          <span className="mt-0.5 text-xs text-muted-foreground">{t("company.manage")}</span>
        </Link>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {CATEGORY_ORDER.map((id) => {
          return (
            <Link
              key={id}
              to="/lab/preventivi/categoria/$id"
              params={{ id }}
              className="flex min-h-24 flex-col justify-between rounded-2xl bg-card p-4 text-foreground shadow-[var(--shadow-border)] active:scale-[0.99]"
            >
              <MaterialIcon id={id} className="size-9" />
              <span>
                <span className="block text-lg font-semibold leading-tight">{t(`cat.${id}.name`)}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{t(`cat.${id}.hint`)}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
