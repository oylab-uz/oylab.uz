import { afterEach, describe, expect, it, vi } from "vitest";
import cloudflareLoader from "./image-loader";

describe("cloudflareLoader", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("routes through Cloudflare image transformations in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(cloudflareLoader({ src: "https://media.oylab.uz/2026/11/a.png", width: 800, quality: 70 })).toBe(
      "/cdn-cgi/image/width=800,quality=70,format=auto/https://media.oylab.uz/2026/11/a.png",
    );
  });
  it("defaults quality to 80", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(cloudflareLoader({ src: "/team/a.jpg", width: 400 })).toBe("/cdn-cgi/image/width=400,quality=80,format=auto//team/a.jpg");
  });
  it("returns the source unchanged in development", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(cloudflareLoader({ src: "https://media.oylab.uz/a.png", width: 800 })).toBe("https://media.oylab.uz/a.png");
  });
});
