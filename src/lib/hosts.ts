export const ADMIN_HOST = "admin.oylab.uz";

/** The admin lives on its own hostname; `admin.localhost[:port]` stands in during development. */
export function isAdminHost(host: string | null): boolean {
  if (!host) return false;
  const name = host.toLowerCase().replace(/:\d+$/, "");
  return name === ADMIN_HOST || name === "admin.localhost";
}
