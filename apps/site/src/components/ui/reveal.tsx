"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const spring = { type: "spring", stiffness: 100, damping: 20 } as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: spring },
};

type GroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
};

/** Parent that staggers its RevealItem children when scrolled into view. */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
  amount = 0.2,
}: GroupProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/** Standalone reveal for a single block. */
export function Reveal({
  children,
  className,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={itemVariants}
    >
      {children}
    </motion.div>
  );
}
