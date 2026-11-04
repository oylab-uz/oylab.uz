import type { Locale } from "@/i18n/routing";

const INTL: Record<Locale, string> = { en: "en-GB", uz: "uz-Latn-UZ", ru: "ru-RU" };

export function formatDate(ms: number, locale: Locale): string {
  return new Intl.DateTimeFormat(INTL[locale], { dateStyle: "long", timeZone: "Asia/Tashkent" }).format(ms);
}
