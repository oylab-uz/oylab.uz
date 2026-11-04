/**
 * Lunar phase math for the OY Lab mark.
 *
 * Phase is a number in [0, 1): 0 is new moon, 0.25 first quarter,
 * 0.5 full moon, 0.75 last quarter. Accuracy of a few hours is plenty
 * for a visual mark; this is not an ephemeris.
 */

export const SYNODIC_MONTH_DAYS = 29.530588853;

/** Reference new moon: 2000-01-06 18:14 UTC. */
const REFERENCE_NEW_MOON_MS = Date.UTC(2000, 0, 6, 18, 14);

const MS_PER_DAY = 86_400_000;

export const PHASE_NAMES = [
  "new",
  "waxingCrescent",
  "firstQuarter",
  "waxingGibbous",
  "full",
  "waningGibbous",
  "lastQuarter",
  "waningCrescent",
] as const;

export type PhaseName = (typeof PHASE_NAMES)[number];

export function moonPhase(date: Date = new Date()): number {
  const days = (date.getTime() - REFERENCE_NEW_MOON_MS) / MS_PER_DAY;
  const phase = (days / SYNODIC_MONTH_DAYS) % 1;
  return phase < 0 ? phase + 1 : phase;
}

/** Fraction of the disc that is lit, 0..1. */
export function illumination(phase: number): number {
  return (1 - Math.cos(2 * Math.PI * phase)) / 2;
}

export function phaseName(phase: number): PhaseName {
  const index = Math.round(phase * PHASE_NAMES.length) % PHASE_NAMES.length;
  return PHASE_NAMES[index];
}

/**
 * SVG path for the lit part of a moon disc centred at (0, 0) with radius r,
 * seen from the northern hemisphere (waxing moon lit on the right).
 *
 * The lit region is bounded by one semicircle (the limb) and one
 * half-ellipse (the terminator) whose horizontal radius is r * |cos(2πφ)|.
 */
export function moonPath(phase: number, r: number): string {
  const k = Math.cos(2 * Math.PI * phase);
  const waxing = phase < 0.5;
  const side = waxing ? 1 : -1;
  const terminatorX = side * r * k;
  const rx = Math.max(Math.abs(r * k), 0.01);
  const limbSweep = waxing ? 1 : 0;
  const terminatorSweep = terminatorX >= 0 ? 0 : 1;
  const f = (n: number) => Number(n.toFixed(3));

  return [
    `M 0 ${f(-r)}`,
    `A ${f(r)} ${f(r)} 0 0 ${limbSweep} 0 ${f(r)}`,
    `A ${f(rx)} ${f(r)} 0 0 ${terminatorSweep} 0 ${f(-r)}`,
    "Z",
  ].join(" ");
}
