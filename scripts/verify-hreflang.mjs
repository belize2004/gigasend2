#!/usr/bin/env node
/**
 * Verify hreflang in a built Astro output directory.
 *
 * Fails (exit 1) if any page emits a lone self tag, a non-reciprocal cluster,
 * a tag pointing outside the build, or an x-default that is not the English URL.
 *
 * Usage: node scripts/verify-hreflang.mjs dist
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = process.argv[2] ?? "dist";
const ORIGIN = "https://gigasend.us";

/** Routes present in the generated cluster map (includes SSR pages not in dist). */
const MAP_KEYS = (() => {
  const src = readFileSync("src/data/hreflangClusters.ts", "utf8");
  const block = src.match(/const CLUSTERS[^{]*\{([\s\S]*?)\n\};/);
  if (!block) throw new Error("cannot parse CLUSTERS from src/data/hreflangClusters.ts");
  return new Set([...block[1].matchAll(/^\s*"([^"]+)": \{/gm)].map((m) => m[1]));
})();

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const urlOf = (file) => {
  const rel = file.slice(DIST.length).replace(/\/index\.html$/, "").replace(/\.html$/, "");
  const clean = rel.replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
};

const LINK_RE = /<link\b[^>]*>/gi;
const ALT = /\bhreflang="([^"]+)"/i;
const HREF = /\bhref="([^"]+)"/i;
const CANON = /<link\b[^>]*rel="canonical"[^>]*>/i;

const pages = new Map(); // path -> { tags: [[lang, href]], canonical }
for (const file of walk(DIST)) {
  const html = readFileSync(file, "utf8");
  const tags = [];
  for (const m of html.match(LINK_RE) ?? []) {
    const a = ALT.exec(m);
    if (!a) continue;
    const h = HREF.exec(m);
    tags.push([a[1], h ? h[1] : ""]);
  }
  const c = CANON.exec(html);
  const canonical = c ? (HREF.exec(c)?.[1] ?? "") : "";
  pages.set(urlOf(file), { tags, canonical });
}

const pathOf = (href) => {
  if (!href.startsWith(ORIGIN)) return null;
  return href.slice(ORIGIN.length) || "/";
};

const problems = [];
const loneSelf = [];
const zero = [];
const clusters = new Map(); // signature -> [paths]

for (const [path, { tags }] of pages) {
  if (tags.length === 0) {
    zero.push(path);
    continue;
  }
  if (tags.length === 1 && pathOf(tags[0][1]) === path) {
    loneSelf.push(path);
    continue;
  }
  const sig = tags
    .map(([l, h]) => `${l}=${pathOf(h) ?? h}`)
    .sort()
    .join("|");
  if (!clusters.has(sig)) clusters.set(sig, []);
  clusters.get(sig).push(path);

  // x-default must be the English URL of the cluster
  const xd = tags.find(([l]) => l === "x-default");
  const en = tags.find(([l]) => l === "en");
  if (!xd) problems.push(`${path}: no x-default`);
  else if (en && pathOf(xd[1]) !== pathOf(en[1])) {
    problems.push(`${path}: x-default ${xd[1]} != en ${en[1]}`);
  }

  // every target must be a route that exists (prerendered in dist, or in the map for SSR)
  for (const [l, h] of tags) {
    const t = pathOf(h);
    if (t === null) problems.push(`${path}: ${l} target not on ${ORIGIN}: ${h}`);
    else if (!pages.has(t) && !MAP_KEYS.has(t)) {
      problems.push(`${path}: ${l} target is not a known route: ${t}`);
    }
  }

  // the page must reference itself; a mismatch means pathname lookup missed the cluster
  if (!tags.some(([, h]) => pathOf(h) === path)) {
    problems.push(`${path}: no self-referencing tag (wrong cluster for this pathname)`);
  }
}

// reciprocity: every member of a cluster must emit the same signature
let nonReciprocal = 0;
for (const [sig, members] of clusters) {
  const expected = sig.split("|").map((s) => s.slice(s.indexOf("=") + 1));
  for (const m of members) {
    for (const target of expected) {
      if (!members.includes(target) && pages.has(target)) {
        nonReciprocal++;
        problems.push(`${m}: target ${target} does not list this cluster back`);
      }
    }
  }
}

const dist = {};
for (const [, { tags }] of pages) {
  const k = tags.length;
  dist[k] = (dist[k] ?? 0) + 1;
}

console.log(`pages: ${pages.size}`);
console.log(`hreflang tag count distribution:`, dist);
console.log(`distinct clusters: ${clusters.size}`);
console.log(`no hreflang: ${zero.length}`);
console.log(`lone self tag: ${loneSelf.length}`);
console.log(`non-reciprocal: ${nonReciprocal}`);
console.log(`other problems: ${problems.length - nonReciprocal}`);

if (loneSelf.length) {
  console.log("\nlone self tags (first 10):");
  for (const p of loneSelf.slice(0, 10)) console.log("  ", p);
}
if (problems.length) {
  console.log("\nproblems (first 20):");
  for (const p of [...new Set(problems)].slice(0, 20)) console.log("  ", p);
}

const clusterReport = [...clusters]
  .sort((a, b) => b[1].length - a[1].length)
  .slice(0, 8)
  .map(([sig, m]) => `${m.length} pages: ${m[0]}`);

console.log("\nlargest clusters:");
for (const r of clusterReport) console.log("  ", r);

const ok =
  loneSelf.length === 0 && nonReciprocal === 0 && problems.length === 0;
console.log(`\n${ok ? "PASS" : "FAIL"}`);
process.exit(ok ? 0 : 1);
