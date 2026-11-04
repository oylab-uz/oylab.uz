import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { verifyAccessJwt } from "@/lib/access";
import { isAdminHost } from "@/lib/hosts";

const intl = createMiddleware(routing);

const IDENTITY_HEADER = "x-admin-email";

/**
 * Host split, before any locale handling:
 * - admin host: Cloudflare Access token checked here as defense in depth,
 *   then rewritten to `/admin/*` with the verified email on a request header.
 * - every other host: `/admin*` is not a public path; the rest is next-intl.
 */
export default async function proxy(request: NextRequest) {
  if (isAdminHost(request.headers.get("host"))) return handleAdmin(request);
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return new NextResponse("Not found", { status: 404 });
  }
  return intl(request);
}

async function handleAdmin(request: NextRequest) {
  const email = await adminEmail(request);
  if (!email) return new NextResponse("Unauthorized", { status: 401 });

  const headers = new Headers(request.headers);
  headers.delete(IDENTITY_HEADER);
  headers.set(IDENTITY_HEADER, email);

  const { pathname, search } = request.nextUrl;
  const target = new URL(`/admin${pathname === "/" ? "" : pathname}${search}`, request.url);
  return NextResponse.rewrite(target, { request: { headers } });
}

async function adminEmail(request: NextRequest): Promise<string | null> {
  if (process.env.NODE_ENV === "development") {
    return (process.env.ADMIN_DEV_EMAIL ?? "dev@oylab.uz").toLowerCase();
  }
  const token = request.headers.get("cf-access-jwt-assertion");
  const teamDomain = process.env.CF_ACCESS_TEAM_DOMAIN;
  const aud = process.env.CF_ACCESS_AUD;
  if (!token || !teamDomain || !aud) return null;
  try {
    const { email } = await verifyAccessJwt(token, { teamDomain, aud });
    return email;
  } catch {
    return null;
  }
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
