import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { FallbackNotice } from "@/components/content/fallback-notice";
import { LocaleLinks } from "@/components/content/locale-links";
import { getPathname, Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn, container } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import { getPost } from "@/lib/snapshot";
import "katex/dist/katex.min.css";

function alternates(slug: string, availableLocales: Locale[], primaryLocale: Locale) {
  const href = `/journal/${slug}`;
  const languages = Object.fromEntries(availableLocales.map((l) => [l, getPathname({ locale: l, href })]));
  languages["x-default"] = getPathname({ locale: primaryLocale, href });
  return languages;
}

export function postMetadata(slug: string, locale: Locale): Metadata {
  const post = getPost(slug, locale);
  if (!post) return {};
  const href = `/journal/${slug}`;
  return {
    title: post.title,
    description: post.summary || undefined,
    alternates: {
      canonical: getPathname({ locale: post.fallback ? post.primaryLocale : locale, href }),
      languages: alternates(slug, post.availableLocales, post.primaryLocale),
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary || undefined,
      publishedTime: new Date(post.publishedAt).toISOString(),
      images: post.cover ? [{ url: post.cover.url, alt: post.cover.alt }] : undefined,
    },
  };
}

export async function PostView({ slug, locale }: { slug: string; locale: Locale }) {
  const post = getPost(slug, locale);
  if (!post) notFound();
  const t = await getTranslations("journal");
  const href = `/journal/${slug}`;

  return (
    <main className={cn(container, "py-16 md:py-24")}>
      <article className="mx-auto max-w-[68ch]" lang={post.locale}>
        <p className="eyebrow">
          <Link href="/journal" className="hover:text-ink">
            ← {t("back")}
          </Link>
        </p>
        <h1 className="mt-6 font-serif text-4xl font-light tracking-tight leading-[1.05] text-ink-strong md:text-5xl">{post.title}</h1>
        <p className="eyebrow tabular mt-6 flex flex-wrap gap-x-3 gap-y-1">
          <time dateTime={new Date(post.publishedAt).toISOString()}>{formatDate(post.publishedAt, locale)}</time>
          <span aria-hidden>·</span>
          <span>{t("readingTime", { minutes: post.readingMinutes })}</span>
        </p>
        {post.summary ? <p className="mt-6 text-lg leading-relaxed text-muted">{post.summary}</p> : null}

        {post.fallback ? (
          <div className="mt-8">
            <FallbackNotice shownLocale={post.locale} availableLocales={post.availableLocales} href={href} />
          </div>
        ) : null}

        {post.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover.url}
            alt={post.cover.alt}
            width={post.cover.width ?? undefined}
            height={post.cover.height ?? undefined}
            className="mt-10 h-auto w-full rounded-xl border border-line"
          />
        ) : null}

        <div className="prose-moon mt-10" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />

        <footer className="mt-14 border-t border-line pt-6">
          <LocaleLinks current={locale} availableLocales={post.availableLocales} href={href} />
        </footer>
      </article>
    </main>
  );
}
