import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PlaceholderTag } from "@/components/ui/placeholder-tag";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn, container } from "@/lib/cn";
import { team } from "@/lib/content";

export async function Team() {
  const t = await getTranslations("team");
  const a11y = await getTranslations("a11y");

  return (
    <section id="team" className="scroll-mt-16 border-t border-line">
      <div className={cn(container, "py-24 md:py-32")}>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

        <RevealGroup
          className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
          amount={0.05}
        >
          {team.map((member, index) => (
            <RevealItem
              key={member.id}
              className={cn(index % 3 === 1 && "lg:mt-16", index % 2 === 1 && "sm:mt-10 lg:mt-16")}
            >
              <article className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover grayscale transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-moon-shadow/20 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0 dark:bg-moon/10 dark:mix-blend-screen"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4 border-t border-line pt-4">
                  <div>
                    <h3 className="font-serif text-xl tracking-tight text-ink-strong">
                      {member.name}
                      {member.placeholder ? <PlaceholderTag label={a11y("placeholder")} /> : null}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{t(`members.${member.id}.role`)}</p>
                  </div>
                  <p className="eyebrow max-w-[12ch] text-right opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                    {t(`members.${member.id}.focus`)}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
