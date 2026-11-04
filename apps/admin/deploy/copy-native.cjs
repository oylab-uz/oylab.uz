// Copies better-sqlite3 (with its compiled binary) into the standalone output, plus any
// helper packages it still depends on. Run from apps/admin after `next build`. pnpm's
// strict layout means each package resolves only from its dependant.
const fs = require("node:fs");
const path = require("node:path");

const out = path.resolve(".next/standalone/apps/admin/node_modules");
function copy(name, from) {
  let dir;
  try {
    dir = path.dirname(require.resolve(`${name}/package.json`, { paths: [from] }));
  } catch {
    console.log(`${name}: not a dependency here, skipped`);
    return null;
  }
  fs.cpSync(dir, path.join(out, name), { recursive: true, dereference: true });
  console.log(`copied ${name} from ${dir}`);
  return dir;
}
const betterSqlite = copy("better-sqlite3", process.cwd());
if (!betterSqlite) throw new Error("better-sqlite3 not found");
const bindings = copy("bindings", betterSqlite);
if (bindings) copy("file-uri-to-path", bindings);
