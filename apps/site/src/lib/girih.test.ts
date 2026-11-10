import { describe, expect, it } from "vitest";
import { girihCentre, girihFill, girihStrap } from "./girih";

// Expected strings are the first two tiles of the figure on the design canvas.
describe("girih star geometry", () => {
  it("draws the sixteen-vertex outline of the first tile", () => {
    expect(girihFill(24, 24)).toBe(
      "M 47 24 L 40.26 30.74 L 40.26 40.26 L 30.74 40.26 L 24 47 L 17.26 40.26 L 7.74 40.26 L 7.74 30.74 " +
        "L 1 24 L 7.74 17.26 L 7.74 7.74 L 17.26 7.74 L 24 1 L 30.74 7.74 L 40.26 7.74 L 40.26 17.26 Z",
    );
  });

  it("draws the strapwork as the turned square, then the upright one", () => {
    expect(girihStrap(24, 24)).toBe(
      "M 47 24 L 24 47 L 1 24 L 24 1 Z M 40.26 40.26 L 7.74 40.26 L 7.74 7.74 L 40.26 7.74 Z",
    );
  });

  it("moves with its centre", () => {
    expect(girihFill(72, 24).startsWith("M 95 24 L 88.26 30.74 L 88.26 40.26 L 78.74 40.26 L 72 47")).toBe(true);
    expect(girihStrap(264, 168)).toBe(
      "M 287 168 L 264 191 L 241 168 L 264 145 Z M 280.26 184.26 L 247.74 184.26 L 247.74 151.74 L 280.26 151.74 Z",
    );
  });

  it("scales with its radius", () => {
    expect(girihStrap(0, 0, 10)).toBe("M 10 0 L 0 10 L -10 0 L 0 -10 Z M 7.07 7.07 L -7.07 7.07 L -7.07 -7.07 L 7.07 -7.07 Z");
  });

  it("lays tiles out row by row", () => {
    expect(girihCentre(0, 6)).toEqual({ x: 24, y: 24 });
    expect(girihCentre(5, 6)).toEqual({ x: 264, y: 24 });
    expect(girihCentre(6, 6)).toEqual({ x: 24, y: 72 });
    expect(girihCentre(29, 6)).toEqual({ x: 264, y: 216 });
  });
});
