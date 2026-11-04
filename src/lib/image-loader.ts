import type { ImageLoaderProps } from "next/image";

/**
 * next/image loader for Cloudflare Image Transformations on the zone.
 * Requires "Transformations" to be enabled for oylab.uz. In development
 * there is no Cloudflare in front, so the source URL is returned as is.
 */
export default function cloudflareLoader({ src, width, quality }: ImageLoaderProps): string {
  if (process.env.NODE_ENV !== "production") return src;
  return `/cdn-cgi/image/width=${width},quality=${quality ?? 80},format=auto/${src}`;
}
