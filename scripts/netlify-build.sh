#!/usr/bin/env bash
# Netlify build entry point (see netlify.toml).
#
# `npm run build` prerenders every route in headless Chrome, and Netlify's
# build image has no system Chrome. Download Google's headless Chrome for
# automation and hand its path to scripts/prerender.mjs via CHROME_PATH.
set -euo pipefail

# Prints "chrome-headless-shell@<version> <executable path>".
CHROME_PATH="$(npx --yes @puppeteer/browsers@3 install chrome-headless-shell@stable \
  --path "$PWD/.cache/chrome" | tail -n 1 | cut -d ' ' -f 2)"
export CHROME_PATH
echo "Prerendering with $CHROME_PATH"

npm run build
