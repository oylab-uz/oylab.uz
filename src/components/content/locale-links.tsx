import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { localeNames, type Locale } from "@/i18n/routing";

/** Links to the other languages a page exists in. Renders nothing when there are none. */
export async function LocaleLinks({
  current,
  availableLocales,
  href,
}: {
  current: Locale;
  availableLocales: Locale[];
  href: string;
}) {
  const others = availableLocales.filter((l) => l !== current);
  if (others.length === 0) return null;
  const t = await getTranslations("journal");
  return (
    <p className="flex flex-wrap items-center gap-3 text-sm text-muted">
      <span className="eyebrow">{t("alsoIn")}</span>
      {others.map((l) => (
        <Link key={l} href={href} locale={l} hrefLang={l} lang={l} className="text-ink underline underline-offset-4 hover:text-ink-strong">
          {localeNames[l]}
        </Link>
      ))}
    </p>
  );
}
