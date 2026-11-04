import { mkdirSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "./schema";

export type Db = BetterSQLite3Database<typeof schema>;

let db: Db | null = null;

/**
 * The SQLite database, opened once per process and migrated on first use.
 * `DATABASE_PATH` defaults to ./data/oylab.sqlite (a Docker volume in
 * production). Migrations live in ./drizzle next to the running app.
 */
export function getDb(): Db {
  if (db) return db;
  const file = process.env.DATABASE_PATH ?? path.join(process.cwd(), "data", "oylab.sqlite");
  mkdirSync(path.dirname(file), { recursive: true });
  const sqlite = new Database(file);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");
  db = drizzle(sqlite, { schema });
  migrate(db, { migrationsFolder: path.join(process.cwd(), "drizzle") });
  return db;
}
