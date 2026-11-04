import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { localeNames, type Locale } from "@/i18n/routing";

/** Shown above a body that is not in the visitor's language. */
export async function FallbackNotice({
  shownLocale,
  availableLocales,
  href,
}: {
  shownLocale: Locale;
  availableLocales: Locale[];
  href: string;
}) {
  const t = await getTranslations("journal");
  const tLocales = await getTranslations("locales");
  const others = availableLocales.filter((l) => l !== shownLocale);
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-line py-3 text-sm text-muted">
      <span>{t("fallbackNotice", { language: tLocales(shownLocale) })}</span>
      {others.length ? (
        <span className="flex items-center gap-2">
          {t("alsoIn")}
          {others.map((l) => (
            <Link key={l} href={href} locale={l} hrefLang={l} lang={l} className="text-ink underline underline-offset-4">
              {localeNames[l]}
            </Link>
          ))}
        </span>
      ) : null}
    </p>
  );
}
