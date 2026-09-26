export const LOCALES = ["it", "bg", "ro", "sq", "ru"] as const;
export type AppLocale = (typeof LOCALES)[number];

export const LOCALE_META: Record<
  AppLocale,
  { native: string; bcp47: string; short: string }
> = {
  it: { native: "Italiano", bcp47: "it-IT", short: "IT" },
  bg: { native: "Български", bcp47: "bg-BG", short: "BG" },
  ro: { native: "Română", bcp47: "ro-RO", short: "RO" },
  sq: { native: "Shqip", bcp47: "sq-AL", short: "SQ" },
  ru: { native: "Русский", bcp47: "ru-RU", short: "RU" },
};

export function isAppLocale(value: string): value is AppLocale {
  return (LOCALES as readonly string[]).includes(value);
}
