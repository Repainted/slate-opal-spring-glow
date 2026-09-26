import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/preventivi/components/app-shell";
import { InstallApp } from "@/preventivi/components/install-app";
import { LanguageSwitcher } from "@/preventivi/components/language-switcher";
import { useT } from "@/preventivi/lib/i18n";
import { useHydrateApp } from "@/preventivi/lib/materials/use-hydrate";

export const Route = createFileRoute("/lab/preventivi/impostazioni")({ component: SettingsPage });

function SettingsPage() {
  useHydrateApp();
  const { t } = useT();

  return (
    <AppShell title={t("settings.title")} back={{ to: "/lab/preventivi" }} backLabel={t("calc.back")}>
      <p className="text-base text-muted-foreground">{t("settings.lead")}</p>

      <section className="mt-6">
        <h2 className="mb-3 text-base font-medium">{t("settings.language")}</h2>
        <LanguageSwitcher size="large" />
      </section>

      <Link
        to="/lab/preventivi/aziende"
        className="mt-6 flex h-14 items-center justify-center rounded-xl bg-primary text-base font-semibold text-primary-foreground"
      >
        {t("settings.company")}
      </Link>
      <Link
        to="/lab/preventivi/prezzi"
        className="mt-2 flex h-14 items-center justify-center rounded-xl bg-secondary text-base font-semibold"
      >
        {t("settings.prices")}
      </Link>

      <InstallApp />
    </AppShell>
  );
}
