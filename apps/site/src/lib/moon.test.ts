import { describe, expect, it } from "vitest";
import { LUNAR_NIGHTS, lunarNight, moonPhase, SYNODIC_MONTH_DAYS } from "./moon";

describe("lunarNight", () => {
  it("starts the month at new moon", () => {
    expect(lunarNight(0)).toBe(1);
    expect(lunarNight(0.9 / SYNODIC_MONTH_DAYS)).toBe(1);
  });

  it("turns over once a day", () => {
    expect(lunarNight(1.1 / SYNODIC_MONTH_DAYS)).toBe(2);
    expect(lunarNight(0.5)).toBe(15);
  });

  it("ends on the thirtieth night and never runs past it", () => {
    expect(lunarNight(29.2 / SYNODIC_MONTH_DAYS)).toBe(30);
    expect(lunarNight(0.999999)).toBe(LUNAR_NIGHTS);
  });

  it("agrees with the phase of a known date", () => {
    // Full moon of 2026-11-24 14:53 UTC: half a month in, night 15 or 16.
    const night = lunarNight(moonPhase(new Date(Date.UTC(2026, 10, 24, 14, 53))));
    expect(night).toBeGreaterThanOrEqual(15);
    expect(night).toBeLessThanOrEqual(16);
  });
});
