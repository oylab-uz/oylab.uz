import { createLocalJWKSet, exportJWK, generateKeyPair, SignJWT } from "jose";
import { beforeAll, describe, expect, it } from "vitest";
import { AccessError, verifyAccessJwt } from "./access";

const teamDomain = "team.cloudflareaccess.com";
const aud = "aud-1";
let privateKey: CryptoKey;
let getKey: ReturnType<typeof createLocalJWKSet>;

beforeAll(async () => {
  const pair = await generateKeyPair("RS256");
  privateKey = pair.privateKey;
  const jwk = await exportJWK(pair.publicKey);
  getKey = createLocalJWKSet({ keys: [{ ...jwk, kid: "k1", alg: "RS256", use: "sig" }] });
});

function token(claims: Record<string, unknown>, opts: { aud?: string; exp?: string } = {}) {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: "RS256", kid: "k1" })
    .setIssuer(`https://${teamDomain}`)
    .setAudience(opts.aud ?? aud)
    .setIssuedAt()
    .setExpirationTime(opts.exp ?? "1h")
    .sign(privateKey);
}

async function codeOf(p: Promise<unknown>) {
  try {
    await p;
    return "none";
  } catch (e) {
    return e instanceof AccessError ? e.code : `not-access-error:${String(e)}`;
  }
}

describe("verifyAccessJwt", () => {
  it("returns the lowercased email for a valid token", async () => {
    const t = await token({ email: "Alice@OYLab.uz" });
    expect(await verifyAccessJwt(t, { teamDomain, aud, getKey })).toEqual({ email: "alice@oylab.uz" });
  });
  it("rejects a wrong audience", async () => {
    const t = await token({ email: "a@oylab.uz" }, { aud: "other" });
    expect(await codeOf(verifyAccessJwt(t, { teamDomain, aud, getKey }))).toBe("audience");
  });
  it("rejects an expired token", async () => {
    const t = await token({ email: "a@oylab.uz" }, { exp: "-1h" });
    expect(await codeOf(verifyAccessJwt(t, { teamDomain, aud, getKey }))).toBe("expired");
  });
  it("rejects a token without an email claim", async () => {
    const t = await token({ sub: "x" });
    expect(await codeOf(verifyAccessJwt(t, { teamDomain, aud, getKey }))).toBe("invalid");
  });
  it("rejects garbage", async () => {
    expect(await codeOf(verifyAccessJwt("nope", { teamDomain, aud, getKey }))).toBe("invalid");
  });
});
