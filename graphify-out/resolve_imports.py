"""Retarget graphify AST `imports_from` edges from module stems to file node IDs.

graphify's TS extractor names import targets after the module stem (`moon_disc`,
`routing`) instead of the file node ID (`src_components_moon_moon_disc_tsx`), so
build_from_json drops every internal import edge as dangling. This reads the
import specifier on each edge's source line, resolves `@/` and relative paths,
and points the edge at the matching file node. External packages stay as-is.

Usage: python resolve_imports.py <repo root>
Run it after graphify's AST step and before the AST + semantic merge, on every
full run and every --update (the AST cache keeps the stem form).
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(sys.argv[1]).resolve()
AST = ROOT / "graphify-out" / ".graphify_ast.json"
ALIAS = {"@/": ROOT / "src"}  # tsconfig paths: "@/*" -> "./src/*"
EXTS = ["", ".ts", ".tsx", ".mts", ".js", ".mjs", ".jsx", "/index.ts", "/index.tsx"]
SPEC_RE = re.compile(r"""(?:from\s+|import\s+|import\(\s*)["']([^"']+)["']""")

data = json.loads(AST.read_text())
file_nodes = {}
for n in data["nodes"]:
    sf = n.get("source_file")
    # File-level nodes: label equals the file name.
    if sf and n.get("label") == Path(sf).name:
        file_nodes[str(Path(sf).resolve())] = n["id"]

retargeted, external, unresolved, mismatches = 0, 0, [], []
for e in data["edges"]:
    if e.get("relation") != "imports_from":
        continue
    src = Path(e["source_file"])
    loc = str(e.get("source_location") or "")
    if not loc.startswith("L"):
        unresolved.append((e["target"], "no line"))
        continue
    lines = src.read_text().splitlines()
    line_no = int(loc[1:])
    line = lines[line_no - 1] if 0 < line_no <= len(lines) else ""
    m = SPEC_RE.search(line)
    if not m:
        unresolved.append((e["target"], f"{src.name}:{line_no} no specifier"))
        continue
    spec = m.group(1)
    base = None
    for prefix, target_dir in ALIAS.items():
        if spec.startswith(prefix):
            base = target_dir / spec[len(prefix):]
    if base is None and spec.startswith("."):
        base = src.parent / spec
    if base is None:
        external += 1
        continue
    hit = None
    for ext in EXTS:
        cand = str(Path(str(base) + ext).resolve())
        if cand in file_nodes:
            hit = file_nodes[cand]
            break
    if hit:
        # Guard against a wrong source_location: the old stem target must match
        # the end of the resolved file's path.
        resolved_stem = re.sub(r"[^a-z0-9]+", "_", Path(spec).name.lower())
        if not e["target"].endswith(resolved_stem):
            mismatches.append((e["target"], hit, f"{src.name}:{line_no}"))
        e["target"] = hit
        retargeted += 1
    else:
        unresolved.append((e["target"], f"{src.name}:{line_no} {spec}"))

AST.write_text(json.dumps(data, indent=2))
print(f"imports_from: {retargeted} retargeted to file nodes, {external} external packages left dangling")
for t, why in unresolved:
    print(f"  unresolved internal: {t} ({why})")
for old, new, where in mismatches:
    print(f"  STEM MISMATCH: {old} -> {new} ({where})")
print(f"stem mismatches: {len(mismatches)}")
