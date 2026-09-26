import { useEffect } from "react";
import { LOCALES, LOCALE_META, type AppLocale } from "@/preventivi/lib/i18n";
import { useI18nStore, useT } from "@/preventivi/lib/i18n/store";
import { cn } from "@/preventivi/lib/utils";

export function LanguageSwitcher({ size = "compact" }: { size?: "compact" | "large" }) {
  const { locale, t } = useT();
  const setLocale = useI18nStore((s) => s.setLocale);

  useEffect(() => {
    document.documentElement.lang = LOCALE_META[locale].bcp47;
  }, [locale]);

  return (
    <div
      role="radiogroup"
      aria-label={t("language")}
      className={cn("grid grid-cols-5 gap-1.5", size === "large" && "gap-2")}
    >
      {LOCALES.map((id) => {
        const on = locale === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => setLocale(id as AppLocale)}
            className={cn(
              "rounded-lg font-semibold tracking-wide transition-colors active:scale-[0.98]",
              size === "large" ? "h-14 text-base" : "h-11 text-sm",
              on ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
            )}
          >
            {LOCALE_META[id].short}
          </button>
        );
      })}
    </div>
  );
}
