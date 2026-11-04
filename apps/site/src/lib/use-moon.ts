"use client";

import { useSyncExternalStore } from "react";
import { illumination, moonPhase, phaseName, type PhaseName } from "./moon";

export type MoonSnapshot = { phase: number; name: PhaseName; percent: number };

let cached: { hour: number; value: MoonSnapshot } | null = null;

function snapshot(): MoonSnapshot {
  const now = new Date();
  const hour = Math.floor(now.getTime() / 3_600_000);
  if (!cached || cached.hour !== hour) {
    const phase = moonPhase(now);
    cached = { hour, value: { phase, name: phaseName(phase), percent: Math.round(illumination(phase) * 100) } };
  }
  return cached.value;
}

const subscribe = () => () => {};

/**
 * Tonight's moon from the visitor's clock. Null during server rendering and
 * hydration (the build-time HTML shows a neutral disc), the real phase right
 * after mount. Stable per hour so re-renders are free.
 */
export function useMoonTonight(): MoonSnapshot | null {
  return useSyncExternalStore(subscribe, snapshot, () => null);
}

/** The visitor's current year; `fallback` is the build year used in the static HTML. */
export function useYear(fallback: number): number {
  return useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => fallback);
}
