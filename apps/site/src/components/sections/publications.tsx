import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { getTranslations } from "next-intl/server";
import { PlaceholderTag } from "@/components/ui/placeholder-tag";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn, container } from "@/lib/cn";
import { publications } from "@/lib/content";

export async function Publications() {
  const t = await getTranslations("publications");
  const a11y = await getTranslations("a11y");

  return (
    <section id="publications" className="scroll-mt-16 border-t border-line">
      <div className={cn(container, "py-24 md:py-32")}>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <RevealGroup className="mt-14" stagger={0.05} amount={0.1}>
          <ol className="divide-y divide-line border-y border-line">
            {publications.map((paper) => (
              <RevealItem key={paper.title}>
                <li>
                  <a
                    href={paper.href}
                    className="group grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 py-6 transition-colors hover:bg-surface/60 md:grid-cols-[5rem_1fr_14rem_auto] md:px-3"
                  >
                    <span className="eyebrow tabular">{paper.year}</span>
                    <span className="font-serif text-lg tracking-tight text-ink-strong md:text-2xl">
                      {paper.title}
                      {paper.placeholder ? <PlaceholderTag label={a11y("placeholder")} /> : null}
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
                  </a>
                </li>
              </RevealItem>
            ))}
          </ol>
        </RevealGroup>
      </div>
    </section>
  );
}
