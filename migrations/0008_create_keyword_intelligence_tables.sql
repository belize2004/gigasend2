-- Migration: 0008_create_keyword_intelligence_tables.sql
-- Description: Extends GigaSend SEO telemetry with comprehensive GSC x DataForSEO Keyword Intelligence Engine tables

-- 1. Keyword Clusters (Topic groupings: File Size, File Type, Profession, Problem, Competitor, etc.)
CREATE TABLE IF NOT EXISTS seo_keyword_clusters (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  cluster_type TEXT NOT NULL,
  description TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Core Keywords Master Table (Normalizes GSC queries and DataForSEO discoveries)
CREATE TABLE IF NOT EXISTS seo_keywords (
  id TEXT PRIMARY KEY,
  query TEXT NOT NULL,
  normalized_query TEXT NOT NULL UNIQUE,
  origin TEXT NOT NULL DEFAULT 'gsc', -- 'gsc' | 'dataforseo_discovery'
  parent_gsc_keyword_id TEXT, -- Lineage pointing to seed GSC keyword
  cluster_id TEXT,
  opportunity_status TEXT NOT NULL DEFAULT 'UNCLASSIFIED',
  opportunity_score REAL NOT NULL DEFAULT 0,
  product_fit_score REAL NOT NULL DEFAULT 0,
  gsc_traction_score REAL NOT NULL DEFAULT 0,
  market_demand_score REAL NOT NULL DEFAULT 0,
  commercial_intent_score REAL NOT NULL DEFAULT 0,
  ranking_upside_score REAL NOT NULL DEFAULT 0,
  trend_score REAL NOT NULL DEFAULT 0,
  recommended_action TEXT,
  action_reason TEXT,
  target_landing_page TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (parent_gsc_keyword_id) REFERENCES seo_keywords(id),
  FOREIGN KEY (cluster_id) REFERENCES seo_keyword_clusters(id)
);

CREATE INDEX IF NOT EXISTS idx_seo_keywords_origin ON seo_keywords(origin);
CREATE INDEX IF NOT EXISTS idx_seo_keywords_status ON seo_keywords(opportunity_status);
CREATE INDEX IF NOT EXISTS idx_seo_keywords_score ON seo_keywords(opportunity_score DESC);
CREATE INDEX IF NOT EXISTS idx_seo_keywords_parent ON seo_keywords(parent_gsc_keyword_id);
CREATE INDEX IF NOT EXISTS idx_seo_keywords_cluster ON seo_keywords(cluster_id);

-- 3. GSC Historical & Snapshot Query Metrics (Preserves granular GSC records)
CREATE TABLE IF NOT EXISTS seo_gsc_query_metrics (
  id TEXT PRIMARY KEY,
  keyword_id TEXT NOT NULL,
  query_raw TEXT NOT NULL,
  landing_page TEXT NOT NULL,
  clicks REAL NOT NULL DEFAULT 0,
  impressions REAL NOT NULL DEFAULT 0,
  ctr REAL NOT NULL DEFAULT 0,
  position REAL NOT NULL DEFAULT 0,
  date TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'United States',
  device TEXT NOT NULL DEFAULT 'All',
  search_appearance TEXT,
  retrieved_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (keyword_id) REFERENCES seo_keywords(id)
);

CREATE INDEX IF NOT EXISTS idx_seo_gsc_metrics_kw ON seo_gsc_query_metrics(keyword_id);
CREATE INDEX IF NOT EXISTS idx_seo_gsc_metrics_date ON seo_gsc_query_metrics(date);
CREATE INDEX IF NOT EXISTS idx_seo_gsc_metrics_page ON seo_gsc_query_metrics(landing_page);

-- 4. Keyword Market Metrics (DataForSEO Level 1: Volume, CPC, Intent, KD, Trend)
CREATE TABLE IF NOT EXISTS seo_keyword_metrics (
  keyword_id TEXT PRIMARY KEY,
  location_name TEXT NOT NULL DEFAULT 'United States',
  language_name TEXT NOT NULL DEFAULT 'English',
  search_volume INTEGER,
  cpc REAL,
  competition REAL,
  competition_index INTEGER,
  keyword_difficulty REAL,
  search_intent TEXT, -- 'informational' | 'navigational' | 'commercial' | 'transactional'
  search_intent_prob REAL,
  foreign_intent TEXT,
  foreign_intent_prob REAL,
  trend_status TEXT NOT NULL DEFAULT 'Insufficient Data', -- 'Rising' | 'Stable' | 'Declining' | 'Seasonal' | 'Insufficient Data'
  monthly_volume_history_json TEXT, -- JSON array of { year, month, search_volume }
  visibility_coverage_score REAL, -- Directional ratio comparing GSC impressions to estimated demand
  visibility_coverage_label TEXT,
  retrieved_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (keyword_id) REFERENCES seo_keywords(id)
);

CREATE INDEX IF NOT EXISTS idx_seo_kw_metrics_vol ON seo_keyword_metrics(search_volume DESC);
CREATE INDEX IF NOT EXISTS idx_seo_kw_metrics_intent ON seo_keyword_metrics(search_intent);
CREATE INDEX IF NOT EXISTS idx_seo_kw_metrics_kd ON seo_keyword_metrics(keyword_difficulty);
CREATE INDEX IF NOT EXISTS idx_seo_kw_metrics_trend ON seo_keyword_metrics(trend_status);

-- 5. SERP Snapshots (DataForSEO Level 2)
CREATE TABLE IF NOT EXISTS seo_serp_snapshots (
  id TEXT PRIMARY KEY,
  keyword_id TEXT NOT NULL,
  location_name TEXT NOT NULL DEFAULT 'United States',
  language_name TEXT NOT NULL DEFAULT 'English',
  device TEXT NOT NULL DEFAULT 'desktop',
  gigasend_rank INTEGER, -- Nullable: observed position of gigasend.us in SERP
  gigasend_url TEXT,
  total_results INTEGER,
  serp_features_json TEXT, -- JSON array: ['featured_snippet', 'people_also_ask', 'video', etc.]
  retrieved_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (keyword_id) REFERENCES seo_keywords(id)
);

CREATE INDEX IF NOT EXISTS idx_seo_serp_kw ON seo_serp_snapshots(keyword_id);

-- 6. Granular SERP Results (Top 10-20 items for each analyzed SERP)
CREATE TABLE IF NOT EXISTS seo_serp_results (
  id TEXT PRIMARY KEY,
  snapshot_id TEXT NOT NULL,
  keyword_id TEXT NOT NULL,
  position INTEGER NOT NULL,
  domain TEXT NOT NULL,
  url TEXT NOT NULL,
  title TEXT,
  snippet TEXT,
  result_type TEXT NOT NULL DEFAULT 'organic', -- 'organic', 'featured_snippet', 'people_also_ask', 'video', 'forum'
  is_gigasend INTEGER NOT NULL DEFAULT 0,
  is_competitor INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (snapshot_id) REFERENCES seo_serp_snapshots(id),
  FOREIGN KEY (keyword_id) REFERENCES seo_keywords(id)
);

CREATE INDEX IF NOT EXISTS idx_seo_serp_results_snap ON seo_serp_results(snapshot_id);
CREATE INDEX IF NOT EXISTS idx_seo_serp_results_domain ON seo_serp_results(domain);
CREATE INDEX IF NOT EXISTS idx_seo_serp_results_kw ON seo_serp_results(keyword_id);

-- 7. Competitor Intelligence & Overlap
CREATE TABLE IF NOT EXISTS seo_competitors (
  id TEXT PRIMARY KEY,
  domain TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  competitor_type TEXT NOT NULL DEFAULT 'Other', -- 'Direct Product Competitor' | 'Publisher' | 'Forum/UGC' | 'Platform' | 'Large Technology Company' | 'Other'
  serp_overlap_count INTEGER NOT NULL DEFAULT 0,
  avg_position REAL,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_seo_competitors_overlap ON seo_competitors(serp_overlap_count DESC);
CREATE INDEX IF NOT EXISTS idx_seo_competitors_type ON seo_competitors(competitor_type);

-- 8. Competitor Ranked Keywords (Level 3 Competitor Gap)
CREATE TABLE IF NOT EXISTS seo_competitor_keywords (
  id TEXT PRIMARY KEY,
  competitor_id TEXT NOT NULL,
  keyword_id TEXT NOT NULL,
  position INTEGER,
  search_volume INTEGER,
  url TEXT,
  retrieved_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (competitor_id) REFERENCES seo_competitors(id),
  FOREIGN KEY (keyword_id) REFERENCES seo_keywords(id)
);

CREATE INDEX IF NOT EXISTS idx_seo_comp_kw_comp ON seo_competitor_keywords(competitor_id);
CREATE INDEX IF NOT EXISTS idx_seo_comp_kw_kw ON seo_competitor_keywords(keyword_id);

-- 9. DataForSEO API Requests & Cost Observability Log
CREATE TABLE IF NOT EXISTS seo_dataforseo_requests (
  id TEXT PRIMARY KEY,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL DEFAULT 'POST',
  payload_summary TEXT,
  status_code INTEGER NOT NULL,
  cost REAL NOT NULL DEFAULT 0,
  execution_time_ms INTEGER NOT NULL DEFAULT 0,
  cache_hit INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_seo_d4s_req_created ON seo_dataforseo_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_seo_d4s_req_endpoint ON seo_dataforseo_requests(endpoint);

-- 10. DataForSEO Key-Value Cache (Prevents duplicate API spend)
CREATE TABLE IF NOT EXISTS seo_dataforseo_cache (
  cache_key TEXT PRIMARY KEY,
  endpoint TEXT NOT NULL,
  raw_json TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_seo_d4s_cache_expires ON seo_dataforseo_cache(expires_at);

-- 11. SEO Engine Configuration & TTLs
CREATE TABLE IF NOT EXISTS seo_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Seed default configuration parameters and TTLs
INSERT OR IGNORE INTO seo_config (key, value) VALUES
  ('ttl_keyword_metrics_days', '30'),
  ('ttl_search_intent_days', '90'),
  ('ttl_serp_high_priority_days', '7'),
  ('ttl_serp_low_priority_days', '30'),
  ('ttl_expansion_days', '60'),
  ('default_location_name', 'United States'),
  ('default_language_name', 'English'),
  ('max_daily_spend_usd', '25.00'),
  ('dataforseo_sandbox', 'false');
