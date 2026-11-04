import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { BibtexBlock } from "@/components/content/bibtex-block";
import { LocaleLinks } from "@/components/content/locale-links";
import { PublicationLinks } from "@/components/content/publication-links";
import { getPathname, Link } from "@/i18n/navigation";
import { localeNames, type Locale } from "@/i18n/routing";
import { cn, container } from "@/lib/cn";
import { getPublication } from "@/lib/snapshot";
import "katex/dist/katex.min.css";

function alternates(slug: string, availableLocales: Locale[], primaryLocale: Locale) {
  const href = `/publications/${slug}`;
  const languages = Object.fromEntries(availableLocales.map((l) => [l, getPathname({ locale: l, href })]));
  languages["x-default"] = getPathname({ locale: primaryLocale, href });
  return languages;
}

export function publicationMetadata(slug: string, locale: Locale): Metadata {
  const publication = getPublication(slug, locale);
  if (!publication) return {};
  const href = `/publications/${slug}`;
  return {
    title: publication.title,
    description: `${publication.authors.map((a) => a.name).join(", ")} · ${publication.venue} ${publication.year}`,
    alternates: {
      canonical: getPathname({ locale: publication.fallback ? publication.primaryLocale : locale, href }),
      languages: alternates(slug, publication.availableLocales, publication.primaryLocale),
    },
    openGraph: { type: "article", title: publication.title },
  };
}

export async function PublicationView({ slug, locale }: { slug: string; locale: Locale }) {
  const publication = getPublication(slug, locale);
  if (!publication) notFound();
  const t = await getTranslations("publications");
  const tLocales = await getTranslations("locales");
  const href = `/publications/${slug}`;
  const others = publication.availableLocales.filter((l) => l !== publication.locale);

  return (
    <main className={cn(container, "py-16 md:py-24")}>
      <article className="mx-auto max-w-[68ch]" lang={publication.locale}>
        <p className="eyebrow">
          <Link href="/publications" className="hover:text-ink">
            ← {t("back")}
          </Link>
        </p>
        <h1 className="mt-6 font-serif text-3xl font-light tracking-tight leading-[1.1] text-ink-strong md:text-5xl">{publication.title}</h1>
        <p className="mt-6 text-base text-ink">
          {publication.authors.map((a, i) => (
            <span key={a.name}>
              {i > 0 ? ", " : ""}
              {a.url ? (
                <a href={a.url} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                  {a.name}
                </a>
              ) : (
                a.name
              )}
            </span>
          ))}
        </p>
        <p className="eyebrow tabular mt-2">
          {publication.venue ? `${publication.venue} · ` : ""}
          {publication.year}
        </p>
        <PublicationLinks publication={publication} className="mt-6" />

        {publication.fallback ? (
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-line py-3 text-sm text-muted">
            <span>{t("fallbackNotice", { language: tLocales(publication.locale) })}</span>
            {others.map((l) => (
              <Link key={l} href={href} locale={l} hrefLang={l} lang={l} className="text-ink underline underline-offset-4">
                {localeNames[l]}
              </Link>
            ))}
          </p>
        ) : null}

        {publication.abstractHtml ? (
          <section aria-labelledby="abstract-heading" className="mt-10">
            <h2 id="abstract-heading" className="eyebrow">
              {t("abstract")}
            </h2>
            <div className="prose-moon mt-4" dangerouslySetInnerHTML={{ __html: publication.abstractHtml }} />
          </section>
        ) : null}

        {publication.bibtex ? <BibtexBlock bibtex={publication.bibtex} /> : null}

        <footer className="mt-14 border-t border-line pt-6">
          <LocaleLinks current={locale} availableLocales={publication.availableLocales} href={href} />
        </footer>
      </article>
    </main>
  );
}
