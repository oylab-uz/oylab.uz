import { createRemoteJWKSet, errors, jwtVerify, type JWTVerifyGetKey } from "jose";

export type AccessErrorCode = "invalid" | "expired" | "audience";

export class AccessError extends Error {
  code: AccessErrorCode;
  constructor(code: AccessErrorCode, message?: string) {
    super(message ?? code);
    this.name = "AccessError";
    this.code = code;
  }
}

const jwksByTeam = new Map<string, JWTVerifyGetKey>();

/** Cloudflare Access public keys for a Zero Trust team, memoised per domain. */
export function accessJwks(teamDomain: string): JWTVerifyGetKey {
  let getKey = jwksByTeam.get(teamDomain);
  if (!getKey) {
    getKey = createRemoteJWKSet(new URL(`https://${teamDomain}/cdn-cgi/access/certs`));
    jwksByTeam.set(teamDomain, getKey);
  }
  return getKey;
}

export async function verifyAccessJwt(
  token: string,
  opts: { teamDomain: string; aud: string; getKey?: JWTVerifyGetKey },
): Promise<{ email: string }> {
  try {
    const { payload } = await jwtVerify(token, opts.getKey ?? accessJwks(opts.teamDomain), {
      issuer: `https://${opts.teamDomain}`,
      audience: opts.aud,
    });
    const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
    if (!email) throw new AccessError("invalid", "Token has no email claim");
    return { email };
  } catch (e) {
    if (e instanceof AccessError) throw e;
    if (e instanceof errors.JWTExpired) throw new AccessError("expired", e.message);
    if (e instanceof errors.JWTClaimValidationFailed && e.claim === "aud") {
      throw new AccessError("audience", e.message);
    }
    throw new AccessError("invalid", e instanceof Error ? e.message : String(e));
  }
}
