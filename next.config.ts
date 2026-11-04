import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // The Worker ships no image optimizer. Placeholder portraits are served
    // as-is; real photos should go through Cloudflare Images (docs/DEPLOY.md).
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
