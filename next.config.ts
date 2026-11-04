import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Every page is a prebuilt file served by Workers Static Assets.
  output: "export",
  trailingSlash: false,
  experimental: {
    // One 404 page for the whole app; needed because the English root and the
    // uz/ru segment are separate root layouts.
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // No image optimizer in a static export. Placeholder portraits are served
    // as-is; real photos go through Cloudflare Images (docs/DEPLOY.md).
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
