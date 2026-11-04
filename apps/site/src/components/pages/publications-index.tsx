import { getTranslations } from "next-intl/server";
import { PublicationGroups } from "@/components/content/publication-list";
import type { Locale } from "@/i18n/routing";
import { cn, container } from "@/lib/cn";
import { publicationGroups } from "@/lib/snapshot";

export async function PublicationsIndex({ locale }: { locale: Locale }) {
  const t = await getTranslations("publications");
  const groups = publicationGroups(locale);
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
