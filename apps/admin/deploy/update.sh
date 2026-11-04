#!/usr/bin/env bash
# Pull the latest main and rebuild the admin container. Run from ~/apps/admin.oylab.uz.
set -euo pipefail
cd "$(dirname "$0")"
git -C repo pull --ff-only
docker compose up -d --build
docker image prune -f >/dev/null
docker compose ps
