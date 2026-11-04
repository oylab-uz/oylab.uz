import { headers } from "next/headers";
import { AccessError, verifyAccessJwt } from "./access";
import { env } from "./env";

/**
 * Who is making this request. Production: the Cloudflare Access token on the
 * request, verified here (the proxy already rejected requests without one;
 * this is the authority, not a forwarded header). Development: a fixed email.
 */
export async function getIdentity(): Promise<{ email: string }> {
  if (env.isDevelopment()) return { email: env.devEmail() };
  const access = env.access();
  const token = (await headers()).get("cf-access-jwt-assertion");
  if (!access || !token) throw new AccessError("invalid", "No Cloudflare Access token on the request");
  return verifyAccessJwt(token, access);
}
