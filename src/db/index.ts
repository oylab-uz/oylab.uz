import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import type { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core";
import * as schema from "./schema";

/**
 * Query functions accept this so the same code runs against D1 in the
 * Worker and against better-sqlite3 in tests.
 */
export type Db = BaseSQLiteDatabase<"async" | "sync", unknown, typeof schema>;

const cache = new WeakMap<D1Database, DrizzleD1Database<typeof schema>>();

export async function getDb(): Promise<Db> {
  const { env } = await getCloudflareContext({ async: true });
  let db = cache.get(env.DB);
  if (!db) {
    db = drizzle(env.DB, { schema });
    cache.set(env.DB, db);
  }
  return db;
}
