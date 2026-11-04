"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "ghost";

const variants: Record<Variant, string> = {
  solid:
    "bg-ink text-bg hover:bg-ink-strong dark:hover:bg-moon",
  ghost:
    "border border-line-strong text-ink hover:border-ink",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
};

/**
 * A pill button that leans toward the cursor.
 * Position is driven by motion values, never React state.
 */
export function MagneticButton({
  href,
  children,
  variant = "solid",
  className,
  arrow = variant === "solid",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 16, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 160, damping: 16, mass: 0.25 });

  const onMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.22);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.22);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium tracking-tight",
        "transition-colors duration-300 will-change-transform select-none",
        variants[variant],
        className,
      )}
    >
      {children}
      {arrow ? (
        <ArrowRight
          size={16}
          weight="light"
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      ) : null}
    </motion.a>
  );
}
