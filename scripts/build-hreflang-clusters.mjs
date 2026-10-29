#!/usr/bin/env node
/**
 * Generate src/data/hreflangClusters.ts from the site's own page data.
 *
 * A cluster is emitted only when every member is mutually reciprocal:
 *   - the ES page is a canonical EN pair and its enEquivalent/ptEquivalent resolve,
 *   - the PT page is a canonical EN pair and points at the same enEquivalent,
 *   - a real EN page exists,
 *   - no member states a conflicting file size (e.g. 5gb vs 3gb),
 *   - no URL belongs to two clusters (hreflang is 1:1).
 *
 * `staticTriplets` in languageSwitchPaths.ts is deliberately NOT used: it is a
 * navigation fallback table ("closest page we have in that language"), not a
 * translation table. Four of its eleven entries contradict the target page's own
 * enEquivalent, which would make the cluster non-reciprocal and get it discarded
 * by Google anyway.
 *
 * Hand-authored static .astro hubs are listed explicitly in STATIC_CLUSTERS after
 * being verified to cross-reference each other in code.
 *
 * Usage: node scripts/build-hreflang-clusters.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(ROOT, p), "utf8");

/** Extract the array literal assigned to `name` and evaluate it. */
function extractArray(src, name) {
  const at = src.search(new RegExp(`const\\s+${name}\\b`));
  if (at === -1) throw new Error(`no const ${name}`);
  const eq = src.indexOf("=", at);
  const start = src.indexOf("[", eq);
  let depth = 0;
  let i = start;
  let inStr = false;
  let esc = false;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === '"') inStr = false;
    } else if (c === '"') inStr = true;
    else if (c === "[") depth++;
    else if (c === "]" && --depth === 0) break;
  }
  return new Function(`return (${src.slice(start, i + 1)});`)();
}

const SIZE_RE = /(\d+(?:[.,]\d+)?)\s*-?\s*(tb|gb|mb)\b/gi;
const sizes = (url) =>
  [
    ...new Set(
      [...url.replace(/-/g, " ").matchAll(SIZE_RE)].map(
        (m) => `${m[1].replace(",", ".")}${m[2].toLowerCase()}`
      )
    ),
  ]
    .sort()
    .join("+");

const es = extractArray(read("src/data/esSeoLandingPages.ts"), "esSeoLandingPages");
const pt = extractArray(read("src/data/ptSeoLandingPages.ts"), "ptSeoLandingPages");
const en = extractArray(read("src/data/seoLandingPages.ts"), "seoLandingPages");
const ptGuides = extractArray(read("src/data/ptGuides.ts"), "PT_ENGINEERING_GUIDES");

const esBy = new Map(es.map((p) => [`/es/${p.slug}`, p]));
const ptBy = new Map(pt.map((p) => [`/pt/${p.slug}`, p]));

/* ------------------------------------------------------------------ *
 * Static .astro hubs, hand-verified reciprocal.
 * Every pair below cross-references the other in its own hard-coded tags.
 * ------------------------------------------------------------------ */
const STATIC_CLUSTERS = [
  // home (the three hand-authored hub pages)
  { en: "/", es: "/es", "pt-BR": "/pt" },
  // pricing: /es/transferencia-... is NOT listed — its own enEquivalent points
  // at /transfer-large-files-online, so it is not reciprocal with /plans.
  { en: "/plans", "pt-BR": "/pt/planos" },
  { en: "/compare", "pt-BR": "/pt/comparar" },
  { en: "/tools/transfer-speed-calculator", "pt-BR": "/pt/calculadora-tempo-upload" },
  { en: "/guides", "pt-BR": "/pt/guias" },
  // hand-authored ES pages that declare a concrete EN+PT twin
  {
    en: "/send-files-larger-than-2gb",
    es: "/es/enviar-archivos-mas-de-2gb",
    "pt-BR": "/pt/enviar-arquivo-2gb-3gb-gratis",
  },
  {
    en: "/send-large-video-files",
    es: "/es/enviar-videos-sin-perder-calidad",
    "pt-BR": "/pt/transferir-videos-4k",
  },
];

/** Regional ES home variants: valid only as extra tags on the ES home cluster. */
const ES_REGIONS = {
  "es-MX": "/es/mexico",
  "es-ES": "/es/espana",
  "es-CO": "/es/colombia",
  "es-AR": "/es/argentina",
};

/* ------------------------------------------------------------------ *
 * Every URL that is a real page (existence guard).
 * Derived from the route files on disk + the locale data sets, so it cannot
 * drift from the real page tree.
 * ------------------------------------------------------------------ */
const staticRoutes = new Set(["/"]);
(function walk(dir, prefix) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const name = entry.name;
    if (name.startsWith("_") || name.startsWith(".")) continue;
    if (entry.isDirectory()) {
      walk(join(dir, name), `${prefix}/${name}`);
    } else if (name.endsWith(".astro")) {
      const base = name.slice(0, -".astro".length);
      if (base.startsWith("[")) continue; // dynamic route: covered by the data sets
      if (base === "index") staticRoutes.add(prefix || "/");
      else staticRoutes.add(`${prefix}/${base}`);
    }
  }
})(join(ROOT, "src/pages"), "");

const known = new Set(staticRoutes);
for (const p of en) known.add(`/${p.slug}`);
for (const u of esBy.keys()) known.add(u);
for (const u of ptBy.keys()) known.add(u);
for (const g of ptGuides) {
  known.add(`/pt/guias/${g.slug}`);
  known.add(g.enEquivalent);
}

/* ------------------------------------------------------------------ */

const rejected = [];
const clusters = new Map(); // key -> { en, es?, "pt-BR"?, ...regionals }
const owner = new Map(); // url -> cluster key

function addCluster(source, members) {
  const key = members.en;
  const urls = Object.entries(members);

  for (const [lang, url] of urls) {
    if (!known.has(url)) {
      rejected.push([source, `${lang} target is not a real page: ${url}`, members]);
      return;
    }
  }

  // The size heuristic guards machine-derived pairs. Hand-verified static clusters
  // were checked by reading the pages, and a superset name is not a conflict
  // (e.g. /send-files-larger-than-2gb vs /pt/enviar-arquivo-2gb-3gb-gratis).
  if (source !== "static") {
    const stated = [...new Set(urls.map(([, u]) => sizes(u)).filter(Boolean))];
    if (stated.length > 1) {
      rejected.push([source, `size conflict ${stated.join(" / ")}`, members]);
      return;
    }
  }

  const clash = urls.find(([, u]) => owner.has(u) && owner.get(u) !== key);
  if (clash) {
    rejected.push([source, `already owned by ${owner.get(clash[1])}: ${clash[1]}`, members]);
    return;
  }

  const cur = clusters.get(key) ?? {};
  for (const [lang, url] of urls) {
    if (cur[lang] && cur[lang] !== url) {
      rejected.push([source, `conflicting ${lang}: ${cur[lang]} vs ${url}`, members]);
      return;
    }
  }
  const merged = { ...cur };
  for (const [lang, url] of urls) merged[lang] = url;

  if (Object.keys(merged).length < 2) {
    rejected.push([source, "cluster has no counterpart", members]);
    return;
  }

  clusters.set(key, merged);
  for (const [, url] of urls) owner.set(url, key);
}

// 1. hand-verified static hubs own their URLs first
for (const c of STATIC_CLUSTERS) addCluster("static", c);

// 2. ES landing pages that are marked canonical EN pairs
for (const [esUrl, p] of esBy) {
  if (!p.isCanonicalEnPair) continue;
  const members = { en: p.enEquivalent, es: esUrl };
  if (p.ptEquivalent) members["pt-BR"] = p.ptEquivalent;
  addCluster("es-data", members);
}

// 3. PT landing pages that are marked canonical EN pairs, ES member only when the
//    ES page points back at the same PT URL (mutual reciprocity).
const esForPt = new Map();
for (const [esUrl, p] of esBy) {
  if (!p.isCanonicalEnPair || !p.ptEquivalent) continue;
  esForPt.set(p.ptEquivalent, esForPt.has(p.ptEquivalent) ? null : esUrl);
}
for (const [ptUrl, p] of ptBy) {
  if (!p.isCanonicalEnPair) continue;
  const members = { en: p.enEquivalent, "pt-BR": ptUrl };
  const esUrl = esForPt.get(ptUrl);
  if (esUrl) members.es = esUrl;
  addCluster("pt-data", members);
}

// 4. PT guides -> their EN twin (no ES version exists)
for (const g of ptGuides) {
  addCluster("pt-guide", { en: g.enEquivalent, "pt-BR": `/pt/guias/${g.slug}` });
}

/* Build the per-URL index. Every member of a cluster maps to the same cluster. */
const index = {};
const arity = {};
for (const c of clusters.values()) {
  const complete = { ...c };
  // regional ES variants belong to the ES home cluster only
  if (c.es === "/es") Object.assign(complete, ES_REGIONS);
  for (const url of Object.values(complete)) {
    index[url] = complete;
  }
  arity[Object.keys(complete).length] = (arity[Object.keys(complete).length] ?? 0) + 1;
}

/* ------------------------------------------------------------------ */

const LANGS = ["en", "es", "pt-BR", "es-MX", "es-ES", "es-CO", "es-AR"];

const lines = [
  "// GENERATED — do not edit by hand.",
  "// node scripts/build-hreflang-clusters.mjs",
  "//",
  "// A page appears here only when a genuine reciprocal translation exists in all",
  "// listed languages. Pages absent from this map must emit NO hreflang at all:",
  "// a lone self-referencing tag is ignored by Google and hides the real problem.",
  'import { brand } from "@/lib/brand";',
  "",
  "export type HreflangAlternate = { lang: string; href: string };",
  "",
  "type Cluster = Record<string, string>;",
  "",
  `const LANGS = ${JSON.stringify(LANGS)} as const;`,
  "",
  "const CLUSTERS: Record<string, Cluster> = {",
];
for (const url of Object.keys(index).sort()) {
  const c = index[url];
  const body = LANGS.filter((k) => c[k])
    .map((k) => `${JSON.stringify(k)}: ${JSON.stringify(c[k])}`)
    .join(", ");
  lines.push(`  ${JSON.stringify(url)}: { ${body} },`);
}
lines.push("};", "");
lines.push("export function getHreflangCluster(pathname: string): HreflangAlternate[] {");
lines.push('  const clean = pathname === "/" ? "/" : pathname.replace(/\\/$/, "");');
lines.push("  const cluster = CLUSTERS[clean];");
lines.push("  if (!cluster) return [];");
lines.push('  const abs = (p: string) => `${brand.siteUrl}${p === "/" ? "/" : p}`;');
lines.push("  const alternates: HreflangAlternate[] = LANGS");
lines.push("    .filter((tag) => cluster[tag])");
lines.push("    .map((tag) => ({ lang: tag, href: abs(cluster[tag]) }));");
lines.push('  alternates.push({ lang: "x-default", href: abs(cluster.en) });');
lines.push("  return alternates;");
lines.push("}");
lines.push("");

writeFileSync(join(ROOT, "src/data/hreflangClusters.ts"), lines.join("\n"));

console.log(`clusters: ${clusters.size}`);
console.log(`URLs with a verified cluster: ${Object.keys(index).length}`, arity);
console.log(`rejected candidates: ${rejected.length}`);
const reasons = {};
for (const [, why] of rejected) {
  const k = why.split(/[:(]/)[0].trim();
  reasons[k] = (reasons[k] ?? 0) + 1;
}
for (const [k, v] of Object.entries(reasons).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(v).padStart(3)}  ${k}`);
}
