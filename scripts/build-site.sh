#!/usr/bin/env bash
# docs/ -> /, web/ -> /app. Same shape as nimble's site build.
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf dist && mkdir -p dist/app
cp -R docs/. dist/
cp -R web/. dist/app/
find dist -name ".*" -prune -exec rm -rf {} +   # no local caches (.wrangler) or dotfiles on the edge
echo "dist/ built: $(find dist -type f | wc -l | tr -d ' ') files"
