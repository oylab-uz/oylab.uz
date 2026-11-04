import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
};

/** Left-aligned heading with the lead pushed to the right column on wide screens. */
export function SectionHeading({ eyebrow, title, lead, className }: Props) {
  return (
    <Reveal className={cn("grid gap-6 lg:grid-cols-12 lg:gap-10", className)}>
      <div className="lg:col-span-7">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 max-w-[20ch] font-serif text-3xl font-light tracking-tight leading-[1.05] text-ink-strong md:text-5xl">
          {title}
        </h2>
      </div>
      {lead ? (
        <p className="max-w-[52ch] text-base leading-relaxed text-muted lg:col-span-4 lg:col-start-9 lg:self-end">
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
