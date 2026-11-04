"use client";

import { MotionConfig } from "motion/react";
import { useLayoutEffect, type ReactNode } from "react";
import { applyStoredTheme } from "@/components/theme/theme";

export function Providers({ children }: { children: ReactNode }) {
  // Runs on every mount of the locale layout, before paint. See theme.ts.
  useLayoutEffect(() => {
    applyStoredTheme();
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
