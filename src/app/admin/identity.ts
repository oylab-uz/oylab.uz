import { headers } from "next/headers";

/** The email the proxy verified for this request. Only reachable on the admin host. */
export async function getIdentity(): Promise<{ email: string }> {
  const email = (await headers()).get("x-admin-email");
  if (!email) throw new Error("No admin identity on the request");
  return { email };
}
