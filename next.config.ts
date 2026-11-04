import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Gives `next dev` the D1 and R2 bindings from wrangler.jsonc through miniflare.
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  experimental: {
    // Media uploads go through a server action; 10 MB file limit plus multipart overhead.
    serverActions: { bodySizeLimit: "11mb" },
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
    // The Worker ships no image optimizer. Placeholder portraits are served
    // as-is; real photos should go through Cloudflare Images (docs/DEPLOY.md).
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
