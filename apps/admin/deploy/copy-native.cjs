// Copies better-sqlite3 (with its compiled or prebuilt binary) into the standalone output,
// plus the helper packages it depends on. Run from apps/admin after `next build`.
// pnpm's strict layout means each package resolves only from its dependant.
const fs = require("node:fs");
const path = require("node:path");

const out = path.resolve(".next/standalone/apps/admin/node_modules");
function copy(name, from) {
  let dir;
  try {
    dir = path.dirname(require.resolve(`${name}/package.json`, { paths: [from] }));
  } catch {
    return null;
  }
  fs.cpSync(dir, path.join(out, name), { recursive: true, dereference: true });
  console.log(`copied ${name} from ${dir}`);
  return dir;
}
const betterSqlite = copy("better-sqlite3", process.cwd());
if (!betterSqlite) throw new Error("better-sqlite3 not found");
for (const helper of ["bindings", "file-uri-to-path", "node-gyp-build"]) {
  const dir = copy(helper, betterSqlite);
  if (helper === "bindings" && dir) copy("file-uri-to-path", dir);
}
// Prove the copy is loadable from where the server will run.
const loaded = require(path.join(out, "better-sqlite3"));
const version = new loaded(":memory:").prepare("select sqlite_version() v").get().v;
console.log(`better-sqlite3 loads from the standalone tree, sqlite ${version}`);
