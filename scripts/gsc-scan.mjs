import fs from 'node:fs';
import crypto from 'node:crypto';
import https from 'node:https';
import { execSync } from 'node:child_process';

const KEY_PATH =
  process.env.GSC_KEY_PATH ||
  `${process.env.HOME}/.config/flow-gsc/gsc-readonly.json`;

let sa = null;

if (process.env.GSC_CREDENTIALS_JSON) {
  try {
    sa = JSON.parse(process.env.GSC_CREDENTIALS_JSON);
  } catch (e) {
    console.error('❌ Failed to parse GSC_CREDENTIALS_JSON environment variable.');
  }
} else if (fs.existsSync(KEY_PATH)) {
  sa = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));
}

if (!sa) {
  console.log(`
ℹ️  Google Search Console credentials not found.
To enable daily scanning:
  1. Place your service account JSON file at: ${KEY_PATH}
     OR
  2. Set environment variable: export GSC_KEY_PATH="/path/to/key.json"
     OR
  3. Set environment variable: export GSC_CREDENTIALS_JSON='{...json...}'

Service account email must be added to Search Console as a user:
  gsc-readonly@flow-gsc-api.iam.gserviceaccount.com
`);
  process.exit(0);
}

const SITE_URLS = ['sc-domain:gigasend.us', 'https://gigasend.us/'];

function getAccessToken() {
  return new Promise((resolve, reject) => {
    const header = { alg: 'RS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/webmasters.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    const base64url = (str) => Buffer.from(str).toString('base64url');
    const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(unsigned);
    const signature = signer.sign(sa.private_key, 'base64url');
    const jwt = `${unsigned}.${signature}`;

    const postData = `grant_type=${encodeURIComponent(
      'urn:ietf:params:oauth:grant-type:jwt-bearer'
    )}&assertion=${encodeURIComponent(jwt)}`;

    const req = https.request(
      'https://oauth2.googleapis.com/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          try {
            const data = JSON.parse(body);
            if (data.access_token) {
              resolve(data.access_token);
            } else {
              reject(new Error(JSON.stringify(data)));
            }
          } catch (err) {
            reject(err);
          }
        });
      }
    );
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function fetchGsc(endpoint, token, postBody = null) {
  return new Promise((resolve, reject) => {
    const bodyStr = postBody ? JSON.stringify(postBody) : null;
    const req = https.request(
      endpoint,
      {
        method: postBody ? 'POST' : 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          ...(bodyStr
            ? {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(bodyStr),
              }
            : {}),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          try {
            const data = JSON.parse(body);
            resolve({ status: res.statusCode, data });
          } catch (err) {
            reject(err);
          }
        });
      }
    );
    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

async function main() {
  console.log(`🔐 Authenticating with Google Search Console API as ${sa.client_email}...`);
  const token = await getAccessToken();
  console.log('✅ Google API Token generated successfully!');

  let successfulData = null;
  let activeProperty = null;

  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 28 * 86400000).toISOString().split('T')[0];

  for (const site of SITE_URLS) {
    try {
      const encodedSite = encodeURIComponent(site);
      const res = await fetchGsc(
        `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
        token,
        {
          startDate,
          endDate,
          dimensions: ['query', 'page'],
          rowLimit: 500,
        }
      );

      if (res.status === 200 && res.data.rows) {
        successfulData = res.data.rows;
        activeProperty = site;
        break;
      }
    } catch (e) {
      // Continue to next site URL
    }
  }

  if (!successfulData || successfulData.length === 0) {
    console.log('⚠️  No rows returned or permissions pending on gigasend.us property.');
    return;
  }

  console.log(`\n📊 Fetched ${successfulData.length} query/page rows for ${activeProperty} (${startDate} to ${endDate})`);

  // Detect Cannibalization
  const queryToPages = new Map();
  for (const row of successfulData) {
    const query = row.keys[0];
    const page = row.keys[1];
    if (!queryToPages.has(query)) queryToPages.set(query, []);
    queryToPages.get(query).push({ page, impressions: row.impressions, clicks: row.clicks });
  }

  const cannibalized = [];
  for (const [query, pages] of queryToPages.entries()) {
    if (pages.length > 1) {
      cannibalized.push({ query, pages });
    }
  }

  if (cannibalized.length > 0) {
    console.log('\n⚠️  Keyword Cannibalization Alerts Detected:');
    for (const item of cannibalized.slice(0, 5)) {
      console.log(`  Query: "${item.query}"`);
      for (const p of item.pages) {
        console.log(`    - ${p.page} (${p.impressions} imp, ${p.clicks} clicks)`);
      }
    }
  } else {
    console.log('\n✅ Zero keyword cannibalization detected across landing pages.');
  }

  // Sync to Cloudflare D1
  console.log('\n💾 Syncing telemetry snapshot to Cloudflare D1...');
  const batch = successfulData.slice(0, 50).map((r) => {
    const query = r.keys[0].replace(/'/g, "''");
    const page = r.keys[1].replace(/'/g, "''");
    const id = `${endDate}_${crypto.createHash('md5').update(`${query}_${page}`).digest('hex').slice(0, 12)}`;
    return `INSERT INTO seo_telemetry (id, date, query, page, clicks, impressions, ctr, position) VALUES ('${id}', '${endDate}', '${query}', '${page}', ${r.clicks}, ${r.impressions}, ${r.ctr}, ${r.position}) ON CONFLICT(id) DO UPDATE SET clicks=${r.clicks}, impressions=${r.impressions}, ctr=${r.ctr}, position=${r.position};`;
  });

  if (batch.length > 0) {
    const sql = batch.join('\n');
    fs.writeFileSync('/tmp/gsc_batch.sql', sql);
    try {
      execSync(
        `unset CLOUDFLARE_API_TOKEN && CLOUDFLARE_ACCOUNT_ID=54b1fed58d0ba6424964b70ae4ba4b14 npx wrangler d1 execute gigasend --remote --file=/tmp/gsc_batch.sql`,
        { stdio: 'inherit' }
      );
      console.log('✅ Telemetry snapshot successfully saved to D1 database!');
    } catch (e) {
      console.warn('Note: D1 execute completed or skipped:', e.message);
    }
  }
}

main().catch((err) => {
  console.error('Fatal error running GSC scan:', err);
  process.exit(1);
});
