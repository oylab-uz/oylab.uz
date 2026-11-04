/** Liveness for Docker and Caddy; outside the Access gate on purpose. */
export function GET() {
  return new Response("ok", { headers: { "cache-control": "no-store" } });
}
