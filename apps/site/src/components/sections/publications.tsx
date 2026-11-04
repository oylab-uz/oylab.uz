import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { getTranslations } from "next-intl/server";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/navigation";
import { localeLabels } from "@/i18n/routing";
import { cn, container } from "@/lib/cn";
import type { PublicationCard } from "@/lib/snapshot";

export async function Publications({ publications }: { publications: PublicationCard[] }) {
  const t = await getTranslations("publications");

  return (
    <section id="publications" className="scroll-mt-16 border-t border-line">
      <div className={cn(container, "py-24 md:py-32")}>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        {publications.length === 0 ? (
          <p className="mt-14 border-y border-line py-12 text-center text-muted">{t("emptyLanding")}</p>
        ) : (
          <RevealGroup className="mt-14" stagger={0.05} amount={0.1}>
            <ol className="divide-y divide-line border-y border-line">
              {publications.map((paper) => (
                <RevealItem key={paper.id}>
                  <li>
                    <Link
                      href={`/publications/${paper.slug}`}
                      className="group grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 py-6 transition-colors hover:bg-surface/60 md:grid-cols-[5rem_1fr_14rem_auto] md:px-3"
                    >
                      <span className="eyebrow tabular">{paper.year}</span>
                      <span className="font-serif text-lg tracking-tight text-ink-strong md:text-2xl">
                        {paper.title}
                        {paper.fallback ? (
                          <span className="ml-2 align-middle font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                            {localeLabels[paper.locale]}
                          </span>
                        ) : null}
                        <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:hidden">
                          {paper.venue}
                        </span>
                      </span>
                      <span className="eyebrow hidden md:block">{paper.venue}</span>
                      <span className="flex items-center gap-2 text-sm text-muted">
                        <span className="hidden sm:inline">{t("read")}</span>
                        <ArrowUpRight
                          size={16}
                          weight="light"
                          aria-hidden
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </Link>
                  </li>
                </RevealItem>
              ))}
            </ol>
          </RevealGroup>
        )}

        <div className="mt-8">
          <Link href="/publications" className="inline-flex min-h-11 items-center gap-2 text-sm text-ink underline-offset-4 hover:underline">
            {t("viewAll")}
            <ArrowUpRight size={14} weight="light" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
