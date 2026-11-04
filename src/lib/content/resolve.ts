import type { Locale } from "@/i18n/routing";

/**
 * Picks the translation to show: the requested locale, else the primary
 * locale, else whatever exists. `fallback` is true whenever the text shown
 * is not in the requested locale.
 */
export function resolveTranslation<T extends { locale: string }>(
  rows: readonly T[],
  locale: Locale,
  primaryLocale: Locale,
): { row: T; fallback: boolean } | null {
  const exact = rows.find((r) => r.locale === locale);
  if (exact) return { row: exact, fallback: false };
  const primary = rows.find((r) => r.locale === primaryLocale) ?? rows[0];
  return primary ? { row: primary, fallback: true } : null;
}
