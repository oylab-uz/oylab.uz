// Copies better-sqlite3 (with its compiled or prebuilt binary) into the standalone output,
// plus the helper packages it depends on. Run from apps/admin after `next build`.
// Each helper is resolved from its dependant so any node_modules layout works.
const fs = require("node:fs");
const path = require("node:path");

const out = path.resolve(".next/standalone/apps/admin/node_modules");
// Walks up from `from` like Node's resolver, but by path: packages with an `exports`
// map (the @img platform builds) do not expose package.json to require.resolve.
function locate(name, from) {
  for (let dir = from; ; dir = path.dirname(dir)) {
    const candidate = path.join(dir, "node_modules", name);
    if (fs.existsSync(path.join(candidate, "package.json"))) return fs.realpathSync(candidate);
    if (path.dirname(dir) === dir) return null;
  }
}
function copy(name, from) {
  const dir = locate(name, from);
  if (!dir) return null;
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

// sharp is loaded at runtime (import with turbopackIgnore), so nothing of it is traced.
// Copy it with its dependency tree and the @img platform packages installed here.
const seen = new Set();
function copyTree(name, from) {
  if (seen.has(name)) return;
  seen.add(name);
  const dir = copy(name, from);
  if (!dir) return;
  const pkg = JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8"));
  for (const dep of Object.keys(pkg.dependencies ?? {})) copyTree(dep, dir);
  for (const dep of Object.keys(pkg.optionalDependencies ?? {})) copyTree(dep, dir); // only those installed resolve
}
copyTree("sharp", process.cwd());
if (!seen.has("sharp") || !fs.existsSync(path.join(out, "sharp"))) throw new Error("sharp not found");
const sharp = require(path.join(out, "sharp"));
console.log(`sharp loads from the standalone tree, libvips ${sharp.versions.vips}`);
