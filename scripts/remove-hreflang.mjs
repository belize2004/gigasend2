#!/usr/bin/env node
/**
 * One-shot codemod: remove every hand-rolled hreflang emitter so that
 * BaseLayout.getHreflangCluster() is the single source of truth.
 *
 * Removes:
 *   - `const hreflang = ...;` declarations (any expression, bracket-matched)
 *   - `hreflang={...}` / `hreflang={hreflang}` attributes (bracket-matched)
 *   - `<link rel="alternate" hreflang="es" ... />` slot lines
 *
 * Reports every file touched.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.argv[2];
if (!ROOT) {
  console.error("usage: node remove-hreflang.mjs <projectRoot>");
  process.exit(1);
}
const PAGES = join(ROOT, "src/pages");

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".astro")) out.push(p);
  }
  return out;
}

/** Index just past the bracket that closes the one at `open`. */
function matchBracket(src, open) {
  const pairs = { "{": "}", "[": "]", "(": ")" };
  const stack = [];
  let inStr = null;
  let esc = false;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      inStr = c;
      continue;
    }
    if (pairs[c]) stack.push(pairs[c]);
    else if (c === "}" || c === "]" || c === ")") {
      if (stack.pop() !== c) throw new Error(`unbalanced at ${i}`);
      if (stack.length === 0) return i + 1;
    }
  }
  throw new Error("unterminated");
}

const changes = [];

for (const file of walk(PAGES)) {
  let src = readFileSync(file, "utf8");
  const before = src;
  const notes = [];

  // 1. <link rel="alternate" hreflang="..." ... /> lines
  src = src.replace(/^[ \t]*<link[^>]*rel="alternate"[^>]*hreflang=[^>]*>[ \t]*\r?\n/gm, () => {
    notes.push("removed alternate link slot");
    return "";
  });

  // 2. `const hreflang = <expr>;`
  for (;;) {
    const at = src.search(/^[ \t]*const hreflang = /m);
    if (at === -1) break;
    const eq = src.indexOf("=", at) + 1;
    // scan to the terminating `;`, skipping whole bracket groups and strings
    let inStr = null;
    let esc = false;
    let end = -1;
    for (let i = eq; i < src.length; i++) {
      const c = src[i];
      if (inStr) {
        if (esc) esc = false;
        else if (c === "\\") esc = true;
        else if (c === inStr) inStr = null;
        continue;
      }
      if (c === '"' || c === "'" || c === "`") inStr = c;
      else if ("{[(".includes(c)) i = matchBracket(src, i) - 1;
      else if (c === ";") {
        end = i + 1;
        break;
      }
    }
    if (end === -1) throw new Error(`no terminator for const hreflang in ${file}`);
    // swallow the trailing newline
    while (src[end] === "\r" || src[end] === "\n") end++;
    src = src.slice(0, at) + src.slice(end);
    notes.push("removed const hreflang");
  }

  // 3. `hreflang={<expr>}` attributes
  for (;;) {
    const at = src.search(/\bhreflang=\{/);
    if (at === -1) break;
    const open = src.indexOf("{", at);
    const close = matchBracket(src, open);
    // If the attribute sits alone on its line, take the whole line with it so we
    // don't leave a blank line inside the tag. Otherwise just drop the attribute.
    const lineStart = src.lastIndexOf("\n", at) + 1;
    const onlyWhitespaceBefore = /^[ \t]*$/.test(src.slice(lineStart, at));
    const after = src.slice(close);
    const onlyWhitespaceAfter = /^[ \t]*\r?\n/.test(after);
    if (onlyWhitespaceBefore && onlyWhitespaceAfter) {
      const tail = after.replace(/^[ \t]*\r?\n/, "");
      src = src.slice(0, lineStart) + tail;
    } else {
      // attribute shares a line: also swallow one space of separator
      const trimAt = src[at - 1] === " " ? at - 1 : at;
      src = src.slice(0, trimAt) + after;
    }
    notes.push("removed hreflang attribute");
  }

  // 4. `const enCanonical = ...` once nothing else references it any more
  if (/^[ \t]*const enCanonical = /m.test(src)) {
    const stripped = src.replace(/^[ \t]*const enCanonical = [^\n]*\n/gm, "");
    if (!/\benCanonical\b/.test(stripped)) {
      src = stripped;
      notes.push("removed unused enCanonical");
    }
  }

  if (src !== before) {
    writeFileSync(file, src);
    changes.push([file.slice(ROOT.length + 1), notes]);
  }
}

console.log(`files changed: ${changes.length}`);
for (const [f, notes] of changes) console.log(`  ${f}  [${notes.join(", ")}]`);
