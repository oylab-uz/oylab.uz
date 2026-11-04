import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { localeNames, routing } from "@/i18n/routing";
import { FooterTonight } from "@/components/footer-tonight";
import { HeaderMark } from "@/components/moon/header-mark";
import { cn, container } from "@/lib/cn";

export async function SiteFooter({ buildYear }: { buildYear: number }) {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-line">
      <div className={cn(container, "grid gap-10 py-12 md:grid-cols-12 md:gap-6")}>
        <div className="md:col-span-5">
          <div className="flex items-center gap-0.5 text-ink-strong">
            <HeaderMark size={14} className="translate-y-px" />
            <span className="font-serif text-xl leading-none tracking-tight">Y Lab</span>
            <span className="sr-only">OY Lab</span>
          </div>
          <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-muted">{t("tagline")}</p>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <p className="eyebrow">{t("languages")}</p>
          <ul className="mt-3 flex flex-col gap-1">
            {routing.locales.map((locale) => (
              <li key={locale}>
                <Link
                  href="/"
                  locale={locale}
                  hrefLang={locale}
                  lang={locale}
                  className="inline-flex min-h-9 items-center text-sm text-ink transition-colors hover:text-muted"
                >
                  {localeNames[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between gap-6 md:col-span-3">
          <FooterTonight buildYear={buildYear} />
        </div>
      </div>
    </footer>
  );
}
