import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

/** Next.js 16 calls this file `proxy`; next-intl still names the factory `createMiddleware`. */
export default createMiddleware(routing);

export const config = {
  // Skip Next internals, API routes and files with an extension (images, fonts, icons).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
