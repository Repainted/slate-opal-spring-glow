import { Link } from "@tanstack/react-router";
import { ArrowLeft, Box, ClipboardList, Euro, LayoutGrid, Settings2 } from "lucide-react";
import type { ReactNode } from "react";
import { Mark } from "@/preventivi/components/mark";
import { useT } from "@/preventivi/lib/i18n";
import { quoteCount, useMaterialStore } from "@/preventivi/lib/materials/store";
import { cn } from "@/preventivi/lib/utils";

type BackLink =
  | { to: "/lab/preventivi"; params?: undefined }
  | { to: "/lab/preventivi/planimetria"; params?: undefined }
  | { to: "/lab/preventivi/categoria/$id"; params: { id: string } }
  | { to: "/lab/preventivi/cantiere/$id"; params: { id: string } }
  | { to: "/lab/preventivi/prezzi"; params?: undefined }
  | { to: "/lab/preventivi/aziende"; params?: undefined }
  | { to: "/lab/preventivi/lista"; params?: undefined };

export function AppShell({
  children,
  title,
  back,
  backLabel,
}: {
  children: ReactNode;
  title?: string;
  back?: BackLink;
  backLabel?: string;
}) {
  const { t } = useT();
  const count = useMaterialStore((s) => quoteCount(s));

  return (
    <div className="pv min-h-dvh bg-background text-foreground">
      <header className="no-print sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-lg items-center gap-3 px-4">
          {back ? (
            <Link
              to={back.to}
              params={back.params}
              className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary"
              aria-label={backLabel ?? t("calc.back")}
            >
              <ArrowLeft className="size-6" />
            </Link>
          ) : (
            <Link to="/lab/preventivi" className="flex items-center gap-2.5 text-foreground">
              <Mark className="size-8" />
              <span className="text-lg font-semibold tracking-tight">Cantiere</span>
            </Link>
          )}
          {title ? (
            <h1 className="min-w-0 flex-1 truncate text-lg font-semibold tracking-tight">{title}</h1>
          ) : (
            <div className="flex-1" />
          )}
          <Link to="/lab" className="text-sm font-semibold text-muted-foreground">
            Lab
          </Link>
          <Link
            to="/lab/preventivi/impostazioni"
            className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary"
            aria-label={t("nav.settings")}
          >
            <Settings2 className="size-5" />
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-lg px-4 pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-5 print:max-w-none print:px-0 print:pb-0 print:pt-0">
        {children}
      </div>

      <nav className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm">
        <div className="mx-auto grid max-w-lg grid-cols-4 gap-1 p-2">
          <Link
            to="/lab/preventivi"
            className="flex h-14 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-semibold text-muted-foreground"
            activeProps={{ className: "bg-primary text-primary-foreground" }}
            activeOptions={{ exact: true }}
          >
            <LayoutGrid className="size-5" />
            {t("nav.home")}
          </Link>
          <Link
            to="/lab/preventivi/planimetria"
            className="flex h-14 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-semibold text-muted-foreground"
            activeProps={{ className: "bg-primary text-primary-foreground" }}
          >
            <Box className="size-5" />
            {t("nav.plan")}
          </Link>
          <Link
            to="/lab/preventivi/lista"
            className="flex h-14 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-semibold text-muted-foreground"
            activeProps={{ className: "bg-primary text-primary-foreground" }}
          >
            <ClipboardList className="size-5" />
            <span className="flex items-center gap-1">
              {t("nav.list")}
              {count > 0 ? (
                <span className="min-w-5 rounded-md bg-brick px-1 py-px text-center text-[10px] text-brick-foreground tabular-nums">
                  {count}
                </span>
              ) : null}
            </span>
          </Link>
          <Link
            to="/lab/preventivi/prezzi"
            className="flex h-14 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-semibold text-muted-foreground"
            activeProps={{ className: "bg-primary text-primary-foreground" }}
          >
            <Euro className="size-5" />
            {t("nav.prices")}
          </Link>
        </div>
      </nav>
    </div>
  );
}
