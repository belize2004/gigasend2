CREATE TABLE IF NOT EXISTS seo_telemetry (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  query TEXT NOT NULL,
  page TEXT NOT NULL,
  clicks REAL NOT NULL DEFAULT 0,
  impressions REAL NOT NULL DEFAULT 0,
  ctr REAL NOT NULL DEFAULT 0,
  position REAL NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_seo_telemetry_date ON seo_telemetry(date);
CREATE INDEX IF NOT EXISTS idx_seo_telemetry_query ON seo_telemetry(query);
CREATE INDEX IF NOT EXISTS idx_seo_telemetry_page ON seo_telemetry(page);
