import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  /** Order drives the language switcher and footer list. */
  locales: ["en", "uz", "ru"],
  defaultLocale: "en",
  /** `/` serves English, `/uz` and `/ru` are prefixed. */
  localePrefix: "as-needed",
  /**
   * The root is always English. With detection on, a Russian or Uzbek
   * browser would be redirected away from `/` on its first visit, which
   * contradicts the decision that the root serves English. Flip to true to
   * redirect by Accept-Language instead.
   */
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  uz: "UZ",
  ru: "RU",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  uz: "Oʼzbekcha",
  ru: "Русский",
};
