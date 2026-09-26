import { useEffect } from "react";
import { useCompanyStore } from "@/preventivi/lib/company/store";
import { LOCALE_META } from "@/preventivi/lib/i18n/locales";
import { useI18nStore } from "@/preventivi/lib/i18n/store";
import { useMaterialStore } from "./store";

/** Rehydrate localStorage after mount. Never blocks first paint. */
export function useHydrateApp(): boolean {
  useEffect(() => {
    void useMaterialStore.persist.rehydrate();
    void useCompanyStore.persist.rehydrate();

    const finishLocale = () => {
      const locale = useI18nStore.getState().locale;
      if (typeof document !== "undefined") {
        document.documentElement.lang = LOCALE_META[locale].bcp47;
      }
    };
    const unsubL = useI18nStore.persist.onFinishHydration(finishLocale);
    void Promise.resolve(useI18nStore.persist.rehydrate()).then(finishLocale, finishLocale);
    if (useI18nStore.persist.hasHydrated()) finishLocale();

    return () => {
      unsubL();
    };
  }, []);
  return true;
}
