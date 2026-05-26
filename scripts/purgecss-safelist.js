/**
 * Builds a PurgeCSS safelist by scanning JS files for classList.add/toggle/remove
 * calls and adding convention-based patterns for JS-driven state classes.
 *
 * Keeps PurgeCSS from stripping classes that only appear at runtime.
 */

const fs = require("fs");
const path = require("path");
const { globSync } = require("glob");

const JS_GLOBS = ["assets/js/**/*.js", "_scripts/**/*.js"];

const CLASS_LIST_RE = /classList\.(add|remove|toggle)\(\s*["']([a-zA-Z0-9_-]+)["']/g;
const CLASS_NAME_ASSIGN_RE = /className\s*[+=]\s*["']([a-zA-Z0-9_ -]+)["']/g;

function extractJsClasses(root) {
  const classes = new Set();
  for (const pattern of JS_GLOBS) {
    for (const file of globSync(pattern, { cwd: root, absolute: true })) {
      const src = fs.readFileSync(file, "utf8");
      for (const m of src.matchAll(CLASS_LIST_RE)) classes.add(m[2]);
      for (const m of src.matchAll(CLASS_NAME_ASSIGN_RE)) {
        m[1].split(/\s+/).forEach((c) => c && classes.add(c));
      }
    }
  }
  return [...classes];
}

function buildSafelist(root) {
  root = root || path.resolve(__dirname, "..");
  const jsClasses = extractJsClasses(root);

  return {
    standard: jsClasses,
    deep: [/-visible$/, /-active$/, /-open$/, /-show$/, /^click-/, /^unloaded$/, /^is-/],
    greedy: [/:last-child/, /:first-child/, /:nth-/, /:has\(/],
  };
}

module.exports = { buildSafelist };
