import { cacheLife } from "next/cache";
import { illumination, moonPhase, phaseName, type PhaseName } from "./moon";

export type MoonTonight = {
  /** 0..1, see moon.ts */
  phase: number;
  name: PhaseName;
  /** Lit fraction as a whole percent. */
  percent: number;
  year: number;
};

/**
 * Tonight's moon, cached for an hour.
 *
 * Reading the clock is non-deterministic, which Cache Components refuse
 * during prerender unless the value is cached. Caching it also means the
 * mark on the page is identical for every visitor in the same hour.
 */
export async function getMoonTonight(): Promise<MoonTonight> {
  "use cache";
  cacheLife("hours");

  const now = new Date();
  const phase = moonPhase(now);

  return {
    phase,
    name: phaseName(phase),
    percent: Math.round(illumination(phase) * 100),
    year: now.getFullYear(),
  };
}
