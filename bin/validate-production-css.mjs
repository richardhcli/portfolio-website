#!/usr/bin/env node

/**
 * Post-build CSS validator. Catches two classes of production-only bugs:
 *  1. jekyll-minifier corrupting CSS custom properties (var(--foo) → var( - - foo))
 *  2. PurgeCSS broadening selectors (e.g. stripping :last-child context from display:none)
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const POST = resolve("_site/assets/css/main.css");
const PRE = resolve("_site/assets/css/main.css.pre-purge");

let failed = false;

function fail(msg) {
  console.error(`\x1b[31m[FAIL]\x1b[0m ${msg}`);
  failed = true;
}
function pass(msg) {
  console.log(`\x1b[32m[PASS]\x1b[0m ${msg}`);
}

// --- Check 1: minifier corruption ---
if (!existsSync(POST)) {
  fail(`CSS file not found: ${POST}`);
  process.exit(1);
}

const postCss = readFileSync(POST, "utf8");
const corruptionRe = /var\(\s*-\s+-/g;
const corruptions = [...postCss.matchAll(corruptionRe)];
if (corruptions.length > 0) {
  fail(
    `Minifier corruption: found ${corruptions.length} broken CSS custom property reference(s) (e.g. "var( - - foo)"). ` +
      `Ensure compress_css is false in _config.yml jekyll-minifier.`,
  );
} else {
  pass("No minifier corruption in CSS custom properties.");
}

// --- Check 2: PurgeCSS selector broadening ---
if (existsSync(PRE)) {
  const preCss = readFileSync(PRE, "utf8");

  // Extract simple selectors that have display:none in post-purge CSS
  const displayNoneRe = /([^{}]+)\{[^}]*display:\s*none[^}]*\}/g;

  function extractSelectors(css) {
    const map = new Map();
    for (const m of css.matchAll(displayNoneRe)) {
      const selectors = m[1].trim().split(",").map((s) => s.trim());
      for (const sel of selectors) {
        map.set(sel, (map.get(sel) || 0) + 1);
      }
    }
    return map;
  }

  const preSelectors = extractSelectors(preCss);
  const postSelectors = extractSelectors(postCss);

  const broadened = [];
  for (const [sel] of postSelectors) {
    // A selector is "broadened" if it appears in post-purge but not pre-purge,
    // while a more specific version (containing the selector) existed in pre-purge
    if (!preSelectors.has(sel)) {
      const wasNested = [...preSelectors.keys()].some(
        (preSel) => preSel !== sel && preSel.includes(sel) && preSel.length > sel.length,
      );
      if (wasNested) broadened.push(sel);
    }
  }

  if (broadened.length > 0) {
    fail(
      `PurgeCSS selector broadening: ${broadened.length} selector(s) with display:none ` +
        `appear simpler post-purge than pre-purge:\n` +
        broadened.map((s) => `  - "${s}"`).join("\n") +
        `\nAdd affected classes to the PurgeCSS safelist or use conditional HTML instead.`,
    );
  } else {
    pass("No PurgeCSS selector broadening detected.");
  }
} else {
  console.log(
    `[SKIP] Pre-purge backup not found (${PRE}), skipping selector broadening check.`,
  );
}

if (failed) {
  console.error("\nCSS validation failed. Fix the issues above before deploying.");
  process.exit(1);
} else {
  console.log("\nCSS validation passed.");
}
