#!/usr/bin/env bash
set -euo pipefail

# Full production build: Jekyll + PurgeCSS + CSS validation.
# Mirrors what GitHub Actions does so you can catch issues before pushing.

export JEKYLL_ENV=production

echo "==> Building site (JEKYLL_ENV=production)..."
bundle exec jekyll build

echo "==> Running production CSS pipeline..."
bash bin/build-production-css.sh

echo ""
echo "Production build complete. Preview with: npm run preview:production"
