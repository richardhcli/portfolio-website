#!/usr/bin/env bash
set -euo pipefail

# Backup pre-purge CSS, run PurgeCSS, then validate output.
# Called by bin/build-production.sh and CI workflows.

echo "==> Backing up pre-purge CSS..."
cp _site/assets/css/main.css _site/assets/css/main.css.pre-purge

echo "==> Running PurgeCSS..."
npx purgecss -c purgecss.config.js

echo "==> Validating production CSS..."
node bin/validate-production-css.mjs
