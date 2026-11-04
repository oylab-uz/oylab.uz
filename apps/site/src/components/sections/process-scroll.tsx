"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { MOON_RADIUS, MOON_VIEWBOX } from "@/components/moon/moon-disc";
import { cn, container } from "@/lib/cn";
import { moonPath } from "@/lib/moon";

export type ProcessStep = { phase: string; title: string; body: string };

/** Last step is the waning moon at 0.75; progress 0..1 maps onto phase 0..0.75. */
const PHASE_SPAN = 0.75;

function Caption({
  progress,
  index,
  total,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: React.ReactNode;
}) {
  const centre = index / (total - 1);
  const half = 1 / (total - 1) / 2;
  const opacity = useTransform(
    progress,
    [centre - half, centre - half * 0.45, centre + half * 0.45, centre + half],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [centre - half, centre, centre + half], [8, 0, -8]);

  return (
    <motion.p
      style={{ opacity, y }}
      className="eyebrow absolute inset-x-0 top-0"
    >
      {children}
    </motion.p>
  );
}

export function ProcessScroll({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.55", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });
  const d = useTransform(progress, (p) =>
    moonPath(Math.min(Math.max(p, 0), 0.999) * PHASE_SPAN, MOON_RADIUS),
  );

  return (
    <div ref={ref} className={cn(container, "grid gap-12 lg:grid-cols-2 lg:gap-20")}>
      {/* On phones this is a slim sticky bar under the header; on desktop a sticky column. */}
      <div className="sticky top-16 z-10 lg:flex lg:h-[calc(100dvh-4rem)] lg:flex-col lg:justify-center">
        <div className="-mx-4 flex items-center gap-5 border-b border-line bg-bg/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:mx-0 lg:block lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
          <div className="w-16 shrink-0 lg:w-[min(60vw,360px)]">
            <svg viewBox={MOON_VIEWBOX} className="h-auto w-full" aria-hidden>
              <circle r={MOON_RADIUS} fill="var(--color-moon-shadow)" />
              <motion.path d={d} fill="var(--color-moon)" />
              <circle
                r={MOON_RADIUS}
                fill="none"
                stroke="var(--color-line-strong)"
                strokeWidth="0.75"
              />
            </svg>
          </div>
          <div className="relative h-5 flex-1 lg:mt-6">
            {steps.map((step, index) => (
              <Caption key={step.title} progress={progress} index={index} total={steps.length}>
                {step.phase}
              </Caption>
            ))}
          </div>
        </div>
      </div>

      <ol className="divide-y divide-line border-y border-line lg:border-t-0">
        {steps.map((step, index) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0.35 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.6, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-[55vh] flex-col justify-center py-14 lg:min-h-[70vh]"
          >
            <div className="flex items-baseline gap-4">
              <span className="eyebrow tabular">0{index + 1}</span>
              <span className="eyebrow">{step.phase}</span>
            </div>
            <h3 className="mt-5 font-serif text-3xl font-light tracking-tight text-ink-strong md:text-5xl">
              {step.title}
            </h3>
            <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-muted md:text-lg">
              {step.body}
            </p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
