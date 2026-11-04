import type { MetadataRoute } from "next";

// Metadata routes must declare themselves static under output: "export".
export const dynamic = "force-static";
import { site } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
