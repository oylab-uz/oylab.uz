import { connection } from "next/server";
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
 * Tonight's moon, read per request.
 *
 * `connection()` defers rendering until a request arrives, so the clock is
 * never read at build time and the mark on the page is right for every visit.
 * The site runs on Cloudflare Workers, where every page renders on demand
 * anyway (see docs/DEPLOY.md).
 */
export async function getMoonTonight(): Promise<MoonTonight> {
  await connection();

  const now = new Date();
  const phase = moonPhase(now);

  return {
    phase,
    name: phaseName(phase),
    percent: Math.round(illumination(phase) * 100),
    year: now.getFullYear(),
  };
}
