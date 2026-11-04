import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PostList } from "@/components/content/post-list";
import { getDb } from "@/db";
import { getPathname, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn, container } from "@/lib/cn";
import { listPublishedPosts } from "@/lib/content/posts";
import { parsePage } from "@/lib/page";

const PER_PAGE = 12;

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ page?: string | string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "journal" });
  return {
    title: t("metaTitle"),
    description: t("lead"),
    alternates: {
      canonical: getPathname({ locale, href: "/journal" }),
      languages: Object.fromEntries(routing.locales.map((l) => [l, getPathname({ locale: l, href: "/journal" })])),
    },
  };
}

export default async function JournalPage({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("journal");
  const db = await getDb();
  const { pages } = await listPublishedPosts(db, { locale, page: 1, perPage: PER_PAGE });
  const page = parsePage((await searchParams).page, pages);
  const { items } = await listPublishedPosts(db, { locale, page, perPage: PER_PAGE });

  return (
    <main className={cn(container, "py-16 md:py-24")}>
      <header className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 className="mt-4 max-w-[20ch] font-serif text-4xl font-light tracking-tight leading-[1.05] text-ink-strong md:text-6xl">
            {t("title")}
          </h1>
        </div>
        <p className="max-w-[52ch] text-base leading-relaxed text-muted lg:col-span-4 lg:col-start-9 lg:self-end">{t("lead")}</p>
      </header>

      <div className="mt-14">
        {items.length === 0 ? (
          <p className="border-y border-line py-16 text-center text-muted">{t("empty")}</p>
        ) : (
          <PostList posts={items} locale={locale} />
        )}
      </div>

      {pages > 1 ? (
        <nav aria-label="Pagination" className="mt-8 flex items-center justify-between text-sm">
          {page > 1 ? (
            <Link href={`/journal?page=${page - 1}`} className="text-ink underline-offset-4 hover:underline">
              ← {t("newer")}
            </Link>
          ) : (
            <span />
          )}
          <span className="eyebrow tabular">{t("page", { page, pages })}</span>
          {page < pages ? (
            <Link href={`/journal?page=${page + 1}`} className="text-ink underline-offset-4 hover:underline">
              {t("older")} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      ) : null}
    </main>
  );
}
