import { create } from "zustand";
import { persist } from "zustand/middleware";
import { isAppLocale, type AppLocale } from "./locales";
import { messages } from "./messages";

interface I18nState {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      locale: "it",
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: "computo-locale-v1",
      skipHydration: true,
      partialize: (s) => ({ locale: s.locale }),
    },
  ),
);

export function t(key: string, vars?: Record<string, string | number>): string {
  const locale = useI18nStore.getState().locale;
  const raw = lookup(locale, key) ?? lookup("it", key) ?? key;
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (_, name: string) =>
    vars[name] == null ? `{${name}}` : String(vars[name]),
  );
}

function lookup(locale: AppLocale, key: string): string | undefined {
  const dict = messages[locale] as Record<string, unknown>;
  const parts = key.split(".");
  let cur: unknown = dict;
  for (const part of parts) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[part];
  }
  return typeof cur === "string" ? cur : undefined;
}

export function useT() {
  const locale = useI18nStore((s) => s.locale);
  return {
    locale,
    t: (key: string, vars?: Record<string, string | number>) => {
      const raw = lookup(locale, key) ?? lookup("it", key) ?? key;
      if (!vars) return raw;
      return raw.replace(/\{(\w+)\}/g, (_, name: string) =>
        vars[name] == null ? `{${name}}` : String(vars[name]),
      );
    },
    setLocale: useI18nStore.getState().setLocale,
  };
}
