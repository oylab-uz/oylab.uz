import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PublicationGroups } from "@/components/content/publication-list";
import { getDb } from "@/db";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn, container } from "@/lib/cn";
import { listPublishedPublications } from "@/lib/content/publications";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "publications" });
  return {
    title: t("metaTitle"),
    description: t("lead"),
    alternates: {
      canonical: getPathname({ locale, href: "/publications" }),
      languages: Object.fromEntries(routing.locales.map((l) => [l, getPathname({ locale: l, href: "/publications" })])),
    },
  };
}

export default async function PublicationsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("publications");
  const groups = await listPublishedPublications(await getDb(), locale);

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
        {groups.length === 0 ? (
          <p className="border-y border-line py-16 text-center text-muted">{t("empty")}</p>
        ) : (
          <PublicationGroups groups={groups} />
        )}
      </div>
    </main>
  );
}
