// Copies better-sqlite3 (with its compiled binary) and its helpers into the standalone output.
// Run from apps/admin after `next build`. pnpm's strict layout means each package resolves
// only from its dependant, so the chain is resolved step by step.
const fs = require("node:fs");
const path = require("node:path");

const out = path.resolve(".next/standalone/apps/admin/node_modules");
function copy(name, from) {
  const dir = path.dirname(require.resolve(`${name}/package.json`, { paths: [from] }));
  fs.cpSync(dir, path.join(out, name), { recursive: true, dereference: true });
  console.log(`copied ${name} from ${dir}`);
  return dir;
}
const betterSqlite = copy("better-sqlite3", process.cwd());
const bindings = copy("bindings", betterSqlite);
copy("file-uri-to-path", bindings);
