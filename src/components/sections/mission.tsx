import { getTranslations } from "next-intl/server";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn, container } from "@/lib/cn";

type Goal = { title: string; body: string };

export async function Mission() {
  const t = await getTranslations("mission");
  const goals = t.raw("goals") as Goal[];

  return (
    <section className={cn(container, "py-24 md:py-32")}>
      <div className="grid gap-14 lg:grid-cols-[2fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">{t("eyebrow")}</p>
          <p className="mt-6 max-w-[22ch] font-serif text-3xl font-light tracking-tight leading-[1.1] text-ink-strong md:text-5xl">
            {t("statement")}
          </p>
        </Reveal>

        <RevealGroup className="lg:pt-14">
          <ol className="divide-y divide-line border-y border-line">
            {goals.map((goal, index) => (
              <RevealItem key={goal.title}>
                <li className="grid grid-cols-[2.5rem_1fr] gap-4 py-6">
                  <span className="eyebrow pt-1.5 tabular">0{index + 1}</span>
                  <div>
                    <h3 className="text-base font-medium tracking-tight text-ink-strong">
                      {goal.title}
                    </h3>
                    <p className="mt-2 max-w-[44ch] text-sm leading-relaxed text-muted">
                      {goal.body}
                    </p>
                  </div>
                </li>
              </RevealItem>
            ))}
          </ol>
        </RevealGroup>
      </div>
    </section>
  );
}
