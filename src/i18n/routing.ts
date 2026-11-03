import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uz", "ru", "en"],
  defaultLocale: "uz",
  /** `/` serves Uzbek, `/ru` and `/en` are prefixed. */
  localePrefix: "as-needed",
  /**
   * The root is always Uzbek. With detection on, an English or Russian browser
   * would be redirected away from `/` on its first visit, which contradicts
   * the decision that the root serves Uzbek. Flip to true to redirect by
   * Accept-Language instead.
   */
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const localeLabels: Record<Locale, string> = {
  uz: "UZ",
  ru: "RU",
  en: "EN",
};

export const localeNames: Record<Locale, string> = {
  uz: "Oʼzbekcha",
  ru: "Русский",
  en: "English",
};
