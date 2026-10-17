import * as fs from "node:fs";
import * as path from "node:path";
import { execSync } from "node:child_process";
import { ptSeoLandingPages, type PtSeoLandingPage } from "../src/data/ptSeoLandingPages";

const STOPWORDS = new Set([
  "como",
  "para",
  "pelo",
  "pela",
  "com",
  "sem",
  "por",
  "que",
  "mais",
  "maior",
  "melhor",
  "site",
  "sites",
  "programa",
  "app",
  "online",
  "internet",
  "no",
  "na",
  "do",
  "da",
  "dos",
  "das",
  "em",
  "um",
  "uma",
  "de",
  "ao",
  "ou",
]);

function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.+]+/g, " ")
    .trim();
}

function tokenize(str: string): string[] {
  return normalizeText(str)
    .split(/\s+/)
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t));
}

const SIZE_TOKENS = [
  "2gb",
  "3gb",
  "4gb",
  "5gb",
  "8gb",
  "10gb",
  "12gb",
  "15gb",
  "20gb",
  "25gb",
  "30gb",
  "40gb",
  "50gb",
  "60gb",
  "80gb",
  "100gb",
  "150gb",
  "200gb",
  "250gb",
  "300gb",
  "500gb",
  "1tb",
  "2tb",
];

type PageProfile = {
  page: PtSeoLandingPage;
  url: string;
  normPrimary: string;
  normSecondaries: string[];
  slugTokens: Set<string>;
  allTokens: Set<string>;
  sizeTokens: Set<string>;
};

const profiles: PageProfile[] = ptSeoLandingPages.map((page) => {
  const normPrimary = normalizeText(page.primaryKeyword);
  const normSecondaries = page.secondaryKeywords.map(normalizeText);
  const slugTokens = new Set(tokenize(page.slug.replace(/-/g, " ")));
  const combined = [
    page.slug.replace(/-/g, " "),
    page.primaryKeyword,
    ...page.secondaryKeywords,
    ...page.supportedFormatsOrTiers,
    page.h1,
  ].join(" ");
  const allTokens = new Set(tokenize(combined));
  const sizeTokens = new Set(SIZE_TOKENS.filter((st) => slugTokens.has(st) || normalizeText(page.primaryKeyword).includes(st)));

  return {
    page,
    url: `/pt/${page.slug}`,
    normPrimary,
    normSecondaries,
    slugTokens,
    allTokens,
    sizeTokens,
  };
});

function scorePageForKeyword(
  normKw: string,
  kwTokens: string[],
  kwSizeTokens: string[],
  profile: PageProfile,
  currentCount: number
): number {
  let score = 0;

  if (normKw === profile.normPrimary) {
    score += 1200;
  } else if (profile.normPrimary.includes(normKw) || normKw.includes(profile.normPrimary)) {
    score += 260;
  }

  for (const sec of profile.normSecondaries) {
    if (normKw === sec) {
      score += 900;
    } else if (normKw.includes(sec) || sec.includes(normKw)) {
      score += 180;
    }
  }

  // Exact capacity tier matching (e.g. 5gb, 10gb, 15gb, 20gb, 50gb, 100gb, 500gb, 1tb, 2tb)
  if (kwSizeTokens.length > 0) {
    for (const st of kwSizeTokens) {
      if (profile.sizeTokens.has(st)) {
        score += 340;
      } else if (profile.page.cluster === "capacidade-tamanho") {
        score -= 60;
      }
    }
  }

  for (const tok of kwTokens) {
    const isGenericVerb =
      tok === "enviar" ||
      tok === "transferir" ||
      tok === "mandar" ||
      tok === "compartilhar" ||
      tok === "arquivo" ||
      tok === "arquivos" ||
      tok === "pesados" ||
      tok === "pesado" ||
      tok === "grandes" ||
      tok === "grande" ||
      tok === "gratis" ||
      tok === "brasil";

    if (profile.slugTokens.has(tok)) {
      score += isGenericVerb ? 8 : 55;
    } else if (profile.allTokens.has(tok)) {
      score += isGenericVerb ? 4 : 26;
    }
  }

  // Soft load balancing so all 150 pages receive their semantic share (~6.7 keywords/page)
  score -= currentCount * 18;

  return score;
}

function sqlEsc(val: string): string {
  return `'${val.replace(/'/g, "''")}'`;
}

async function main() {
  console.log(`Loaded ${ptSeoLandingPages.length} /pt/[slug] pages from src/data/ptSeoLandingPages.ts`);
  console.log("Fetching 1,005 pt-BR keywords from local D1...");

  const rawJson = execSync(
    `npx wrangler d1 execute gigasend --local --json --command="SELECT k.id, k.query, k.cluster_id FROM seo_keywords k JOIN seo_keyword_metrics m ON m.keyword_id = k.id WHERE m.location_name = 'Brazil' AND m.language_name = 'Portuguese'"`,
    { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 }
  );

  const parsed = JSON.parse(rawJson);
  const rows: Array<{ id: string; query: string; cluster_id: string }> =
    parsed[0]?.results ?? [];

  console.log(`Loaded ${rows.length} pt-BR keywords from D1.`);

  const counts = new Map<string, number>();
  const idsBySlug = new Map<string, string[]>();

  // Pass 1: score and assign each keyword to its highest-scoring /pt/[slug] page
  for (const row of rows) {
    const normKw = normalizeText(row.query);
    const kwTokens = tokenize(row.query);
    const kwSizeTokens = SIZE_TOKENS.filter((st) => kwTokens.includes(st));

    let bestUrl = profiles[0].url;
    let bestScore = -Infinity;

    for (const prof of profiles) {
      const curr = counts.get(prof.url) ?? 0;
      const s = scorePageForKeyword(normKw, kwTokens, kwSizeTokens, prof, curr);
      if (s > bestScore) {
        bestScore = s;
        bestUrl = prof.url;
      }
    }

    counts.set(bestUrl, (counts.get(bestUrl) ?? 0) + 1);
    const list = idsBySlug.get(bestUrl) ?? [];
    list.push(row.id);
    idsBySlug.set(bestUrl, list);
  }

  // Pass 2: ensure every single one of the 150 pages has at least 2 keywords mapped
  for (const prof of profiles) {
    const currentList = idsBySlug.get(prof.url) ?? [];
    if (currentList.length < 2) {
      // Rebalance from the most-populated page that shares tokens
      const thedonorCandidates = [...idsBySlug.entries()]
        .filter(([u, list]) => u !== prof.url && list.length > 7)
        .sort((a, b) => b[1].length - a[1].length);

      while ((idsBySlug.get(prof.url)?.length ?? 0) < 2 && thedonorCandidates.length > 0) {
        const donor = thedonorCandidates[0];
        const movedId = donor[1].pop();
        if (movedId) {
          const targetList = idsBySlug.get(prof.url) ?? [];
          targetList.push(movedId);
          idsBySlug.set(prof.url, targetList);
          counts.set(prof.url, targetList.length);
          counts.set(donor[0], donor[1].length);
        }
        if (donor[1].length <= 7) {
          thedonorCandidates.shift();
        }
      }
    }
  }

  const statements: string[] = [];
  for (const [slug, ids] of idsBySlug.entries()) {
    if (ids.length === 0) continue;
    const inList = ids.map((id) => sqlEsc(id)).join(", ");
    statements.push(
      `UPDATE seo_keywords SET target_landing_page = ${sqlEsc(slug)}, updated_at = datetime('now') WHERE id IN (${inList});`
    );
  }

  const sqlPath = path.resolve(process.cwd(), "scripts/remap_pt_150_pages.sql");
  fs.writeFileSync(sqlPath, statements.join("\n") + "\n", "utf8");
  console.log(`Wrote ${statements.length} grouped UPDATE statements to ${sqlPath}`);

  let totalMapped = 0;
  let minCount = Infinity;
  let maxCount = 0;
  for (const [, count] of counts.entries()) {
    totalMapped += count;
    if (count < minCount) minCount = count;
    if (count > maxCount) maxCount = count;
  }

  console.log(
    `Mapped ${totalMapped} keywords across ${statements.length} distinct /pt/[slug] pages (min=${minCount}, max=${maxCount}, avg=${(
      totalMapped / statements.length
    ).toFixed(2)} keywords/page).`
  );

  console.log("\nExecuting remap on local D1 (gigasend)...");
  execSync(`npx wrangler d1 execute gigasend --local --file=${sqlPath}`, {
    stdio: "inherit",
  });

  console.log("\nExecuting remap on remote Cloudflare D1 (gigasend) in compact batches...");
  for (let i = 0; i < statements.length; i += 15) {
    const chunkSql = statements.slice(i, i + 15).join(" ");
    execSync(
      `npx wrangler d1 execute gigasend --remote --yes --command=${JSON.stringify(chunkSql)}`,
      { stdio: "inherit" }
    );
  }
  console.log(`\n✅ All ${totalMapped} pt-BR keywords re-mapped across ${statements.length} /pt/[slug] pages in local & remote D1!`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
