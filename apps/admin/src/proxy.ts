import { NextResponse, type NextRequest } from "next/server";
import { verifyAccessJwt } from "@/lib/access";
import { env } from "@/lib/env";

/**
 * Gate: every request must carry a valid Cloudflare Access token, except the
 * health route and static chunks. Development has no Access in front, so the
 * gate is open there and identity comes from ADMIN_DEV_EMAIL.
 */
export default async function proxy(request: NextRequest) {
  if (env.isDevelopment()) return NextResponse.next();
  const access = env.access();
  const token = request.headers.get("cf-access-jwt-assertion");
  if (!access || !token) return new NextResponse("Unauthorized", { status: 401 });
  try {
    await verifyAccessJwt(token, access);
    return NextResponse.next();
  } catch {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export const config = {
  // Everything, dotted paths included; only Next's static chunks and the health check are open.
  matcher: ["/((?!_next/static|_next/image|healthz$).*)"],
};
