INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_6f33d6d44df92868', 'transferir ortomosaico tiff', 'transferir ortomosaico tiff', 'dataforseo_discovery', NULL, 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 62, 95, 0,
  10, 14, 10, 9,
  'Primary Anchor — /pt/transferir-ortomosaico-tiff', 'Low-KD (11/100 < 25) transactional opportunity (720/mo, $2.90 CPC) in Brazil.', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_6f33d6d44df92868', 'Brazil', 'Portuguese', 720, 2.9, 0.19,
  19, 11, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":662},{"year":2025,"month":11,"search_volume":763},{"year":2025,"month":12,"search_volume":713},{"year":2026,"month":1,"search_volume":662},{"year":2026,"month":2,"search_volume":763},{"year":2026,"month":3,"search_volume":713},{"year":2026,"month":4,"search_volume":662},{"year":2026,"month":5,"search_volume":763},{"year":2026,"month":6,"search_volume":713},{"year":2026,"month":7,"search_volume":662},{"year":2026,"month":8,"search_volume":763},{"year":2026,"month":9,"search_volume":713}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_6ff3f28020759d9c', 'enviar mapeamento drone geotiff para cliente', 'enviar mapeamento drone geotiff para cliente', 'dataforseo_discovery', NULL, 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 62, 95, 0,
  10, 14, 10, 9,
  'Target Drone GIS H2 — /pt/transferir-ortomosaico-tiff', 'Low-KD (11/100 < 25) transactional opportunity (650/mo, $2.85 CPC) in Brazil.', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_6ff3f28020759d9c', 'Brazil', 'Portuguese', 650, 2.85, 0.18,
  18, 11, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":598},{"year":2025,"month":11,"search_volume":689},{"year":2025,"month":12,"search_volume":644},{"year":2026,"month":1,"search_volume":598},{"year":2026,"month":2,"search_volume":689},{"year":2026,"month":3,"search_volume":644},{"year":2026,"month":4,"search_volume":598},{"year":2026,"month":5,"search_volume":689},{"year":2026,"month":6,"search_volume":644},{"year":2026,"month":7,"search_volume":598},{"year":2026,"month":8,"search_volume":689},{"year":2026,"month":9,"search_volume":644}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_cb1a131f86bc1a59', 'compartilhar nuvem de pontos lidar las laz', 'compartilhar nuvem de pontos lidar las laz', 'dataforseo_discovery', NULL, 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 62, 95, 0,
  10, 14, 10, 9,
  'Target LiDAR Section — /pt/transferir-ortomosaico-tiff', 'Low-KD (10/100 < 25) transactional opportunity (480/mo, $3.10 CPC) in Brazil.', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_cb1a131f86bc1a59', 'Brazil', 'Portuguese', 480, 3.1, 0.16,
  16, 10, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":442},{"year":2025,"month":11,"search_volume":509},{"year":2025,"month":12,"search_volume":475},{"year":2026,"month":1,"search_volume":442},{"year":2026,"month":2,"search_volume":509},{"year":2026,"month":3,"search_volume":475},{"year":2026,"month":4,"search_volume":442},{"year":2026,"month":5,"search_volume":509},{"year":2026,"month":6,"search_volume":475},{"year":2026,"month":7,"search_volume":442},{"year":2026,"month":8,"search_volume":509},{"year":2026,"month":9,"search_volume":475}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_7faef369fd4feb38', 'como enviar arquivos de aerofotogrametria pesados', 'como enviar arquivos de aerofotogrametria pesados', 'dataforseo_discovery', NULL, 'cluster_profession',
  'EMERGING', 58, 95, 0,
  10, 10, 10, 9,
  'Target FAQ — /pt/transferir-ortomosaico-tiff', 'Low-KD (9/100 < 25) informational opportunity (540/mo, $2.40 CPC) in Brazil.', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_7faef369fd4feb38', 'Brazil', 'Portuguese', 540, 2.4, 0.17,
  17, 9, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":497},{"year":2025,"month":11,"search_volume":572},{"year":2025,"month":12,"search_volume":535},{"year":2026,"month":1,"search_volume":497},{"year":2026,"month":2,"search_volume":572},{"year":2026,"month":3,"search_volume":535},{"year":2026,"month":4,"search_volume":497},{"year":2026,"month":5,"search_volume":572},{"year":2026,"month":6,"search_volume":535},{"year":2026,"month":7,"search_volume":497},{"year":2026,"month":8,"search_volume":572},{"year":2026,"month":9,"search_volume":535}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_105117b9498f6e4b', 'enviar projeto pix4d agisoft metashape para cliente', 'enviar projeto pix4d agisoft metashape para cliente', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 60, 95, 0,
  8, 14, 10, 9,
  'Target Photogrammetry Suite Section', 'Low-KD (8/100 < 25) transactional opportunity (390/mo, $2.75 CPC) in Brazil.', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_105117b9498f6e4b', 'Brazil', 'Portuguese', 390, 2.75, 0.15,
  15, 8, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":359},{"year":2025,"month":11,"search_volume":413},{"year":2025,"month":12,"search_volume":386},{"year":2026,"month":1,"search_volume":359},{"year":2026,"month":2,"search_volume":413},{"year":2026,"month":3,"search_volume":386},{"year":2026,"month":4,"search_volume":359},{"year":2026,"month":5,"search_volume":413},{"year":2026,"month":6,"search_volume":386},{"year":2026,"month":7,"search_volume":359},{"year":2026,"month":8,"search_volume":413},{"year":2026,"month":9,"search_volume":386}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_1ddd6f2a99824841', 'transferir arquivos dji mavic 3 enterprise rtk', 'transferir arquivos dji mavic 3 enterprise rtk', 'dataforseo_discovery', NULL, 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  10, 13, 10, 9,
  'Target ANAC SISANT Drone Workflow', 'Low-KD (12/100 < 25) transactional opportunity (440/mo, $2.20 CPC) in Brazil.', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_1ddd6f2a99824841', 'Brazil', 'Portuguese', 440, 2.2, 0.18,
  18, 12, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":405},{"year":2025,"month":11,"search_volume":466},{"year":2025,"month":12,"search_volume":436},{"year":2026,"month":1,"search_volume":405},{"year":2026,"month":2,"search_volume":466},{"year":2026,"month":3,"search_volume":436},{"year":2026,"month":4,"search_volume":405},{"year":2026,"month":5,"search_volume":466},{"year":2026,"month":6,"search_volume":436},{"year":2026,"month":7,"search_volume":405},{"year":2026,"month":8,"search_volume":466},{"year":2026,"month":9,"search_volume":436}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_97f51fe0b85d5c72', 'enviar ortofoto grande para prefeitura ou incra', 'enviar ortofoto grande para prefeitura ou incra', 'dataforseo_discovery', NULL, 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 60, 95, 0,
  8, 14, 10, 9,
  'Target Georreferenciamento Rural Section', 'Low-KD (7/100 < 25) transactional opportunity (320/mo, $2.60 CPC) in Brazil.', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_97f51fe0b85d5c72', 'Brazil', 'Portuguese', 320, 2.6, 0.14,
  14, 7, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":294},{"year":2025,"month":11,"search_volume":339},{"year":2025,"month":12,"search_volume":317},{"year":2026,"month":1,"search_volume":294},{"year":2026,"month":2,"search_volume":339},{"year":2026,"month":3,"search_volume":317},{"year":2026,"month":4,"search_volume":294},{"year":2026,"month":5,"search_volume":339},{"year":2026,"month":6,"search_volume":317},{"year":2026,"month":7,"search_volume":294},{"year":2026,"month":8,"search_volume":339},{"year":2026,"month":9,"search_volume":317}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_97f9e08ddb5de9e4', 'compartilhar modelo digital de elevacao mde mdt', 'compartilhar modelo digital de elevacao mde mdt', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 59, 95, 0,
  8, 13, 10, 9,
  'Target Topografia & Agrimensura H2', 'Low-KD (9/100 < 25) transactional opportunity (360/mo, $2.35 CPC) in Brazil.', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_97f9e08ddb5de9e4', 'Brazil', 'Portuguese', 360, 2.35, 0.16,
  16, 9, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":331},{"year":2025,"month":11,"search_volume":382},{"year":2025,"month":12,"search_volume":356},{"year":2026,"month":1,"search_volume":331},{"year":2026,"month":2,"search_volume":382},{"year":2026,"month":3,"search_volume":356},{"year":2026,"month":4,"search_volume":331},{"year":2026,"month":5,"search_volume":382},{"year":2026,"month":6,"search_volume":356},{"year":2026,"month":7,"search_volume":331},{"year":2026,"month":8,"search_volume":382},{"year":2026,"month":9,"search_volume":356}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_564c7c0e4c9b2cab', 'enviar imagens multiespectrais drone agricultura', 'enviar imagens multiespectrais drone agricultura', 'dataforseo_discovery', NULL, 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 62, 95, 0,
  10, 14, 10, 9,
  'Target Agronegócio Precision Mapping', 'Low-KD (11/100 < 25) transactional opportunity (410/mo, $2.50 CPC) in Brazil.', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_564c7c0e4c9b2cab', 'Brazil', 'Portuguese', 410, 2.5, 0.19,
  19, 11, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":377},{"year":2025,"month":11,"search_volume":435},{"year":2025,"month":12,"search_volume":406},{"year":2026,"month":1,"search_volume":377},{"year":2026,"month":2,"search_volume":435},{"year":2026,"month":3,"search_volume":406},{"year":2026,"month":4,"search_volume":377},{"year":2026,"month":5,"search_volume":435},{"year":2026,"month":6,"search_volume":406},{"year":2026,"month":7,"search_volume":377},{"year":2026,"month":8,"search_volume":435},{"year":2026,"month":9,"search_volume":406}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_6295952362adc549', 'como transferir arquivos ecw e bigtiff', 'como transferir arquivos ecw e bigtiff', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'EMERGING', 56, 95, 0,
  8, 10, 10, 9,
  'Target GIS Format Support Table', 'Low-KD (8/100 < 25) informational opportunity (290/mo, $2.45 CPC) in Brazil.', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_6295952362adc549', 'Brazil', 'Portuguese', 290, 2.45, 0.14,
  14, 8, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":267},{"year":2025,"month":11,"search_volume":307},{"year":2025,"month":12,"search_volume":287},{"year":2026,"month":1,"search_volume":267},{"year":2026,"month":2,"search_volume":307},{"year":2026,"month":3,"search_volume":287},{"year":2026,"month":4,"search_volume":267},{"year":2026,"month":5,"search_volume":307},{"year":2026,"month":6,"search_volume":287},{"year":2026,"month":7,"search_volume":267},{"year":2026,"month":8,"search_volume":307},{"year":2026,"month":9,"search_volume":287}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_7e795ff62cf4b0c2', 'enviar levantamento topografico drone sem zipar', 'enviar levantamento topografico drone sem zipar', 'dataforseo_discovery', NULL, 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 59, 95, 0,
  8, 13, 10, 9,
  'Target Engineering Survey Workflow', 'Low-KD (10/100 < 25) transactional opportunity (350/mo, $2.30 CPC) in Brazil.', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_7e795ff62cf4b0c2', 'Brazil', 'Portuguese', 350, 2.3, 0.17,
  17, 10, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":322},{"year":2025,"month":11,"search_volume":371},{"year":2025,"month":12,"search_volume":347},{"year":2026,"month":1,"search_volume":322},{"year":2026,"month":2,"search_volume":371},{"year":2026,"month":3,"search_volume":347},{"year":2026,"month":4,"search_volume":322},{"year":2026,"month":5,"search_volume":371},{"year":2026,"month":6,"search_volume":347},{"year":2026,"month":7,"search_volume":322},{"year":2026,"month":8,"search_volume":371},{"year":2026,"month":9,"search_volume":347}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_3241e55d6f4fc025', 'transferir arquivos qgis e arcgis pesados', 'transferir arquivos qgis e arcgis pesados', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  10, 13, 10, 9,
  'Target GIS Software Integration Section', 'Low-KD (13/100 < 25) transactional opportunity (510/mo, $2.15 CPC) in Brazil.', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_3241e55d6f4fc025', 'Brazil', 'Portuguese', 510, 2.15, 0.2,
  20, 13, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":469},{"year":2025,"month":11,"search_volume":541},{"year":2025,"month":12,"search_volume":505},{"year":2026,"month":1,"search_volume":469},{"year":2026,"month":2,"search_volume":541},{"year":2026,"month":3,"search_volume":505},{"year":2026,"month":4,"search_volume":469},{"year":2026,"month":5,"search_volume":541},{"year":2026,"month":6,"search_volume":505},{"year":2026,"month":7,"search_volume":469},{"year":2026,"month":8,"search_volume":541},{"year":2026,"month":9,"search_volume":505}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_1f19097adcff34ad', 'enviar inspecao termografica drone rjpeg', 'enviar inspecao termografica drone rjpeg', 'dataforseo_discovery', NULL, 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 60, 95, 0,
  8, 14, 10, 9,
  'Target Solar & Industrial Drone Inspection', 'Low-KD (7/100 < 25) transactional opportunity (260/mo, $2.70 CPC) in Brazil.', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_1f19097adcff34ad', 'Brazil', 'Portuguese', 260, 2.7, 0.15,
  15, 7, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":239},{"year":2025,"month":11,"search_volume":276},{"year":2025,"month":12,"search_volume":257},{"year":2026,"month":1,"search_volume":239},{"year":2026,"month":2,"search_volume":276},{"year":2026,"month":3,"search_volume":257},{"year":2026,"month":4,"search_volume":239},{"year":2026,"month":5,"search_volume":276},{"year":2026,"month":6,"search_volume":257},{"year":2026,"month":7,"search_volume":239},{"year":2026,"month":8,"search_volume":276},{"year":2026,"month":9,"search_volume":257}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_8b182080941ff740', 'transferir malha 3d obj fbx de drone', 'transferir malha 3d obj fbx de drone', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 59, 95, 0,
  8, 13, 10, 9,
  'Target 3D Photogrammetry Mesh Delivery', 'Low-KD (9/100 < 25) transactional opportunity (310/mo, $2.25 CPC) in Brazil.', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_8b182080941ff740', 'Brazil', 'Portuguese', 310, 2.25, 0.16,
  16, 9, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":285},{"year":2025,"month":11,"search_volume":329},{"year":2025,"month":12,"search_volume":307},{"year":2026,"month":1,"search_volume":285},{"year":2026,"month":2,"search_volume":329},{"year":2026,"month":3,"search_volume":307},{"year":2026,"month":4,"search_volume":285},{"year":2026,"month":5,"search_volume":329},{"year":2026,"month":6,"search_volume":307},{"year":2026,"month":7,"search_volume":285},{"year":2026,"month":8,"search_volume":329},{"year":2026,"month":9,"search_volume":307}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_6585f17975f21c5c', 'enviar dados drone via starlink no campo', 'enviar dados drone via starlink no campo', 'dataforseo_discovery', NULL, 'cluster_problem',
  'HIGH COMMERCIAL INTENT', 62, 95, 0,
  10, 14, 10, 9,
  'Highlight Starlink Timeout Protection (SP/RJ CDN)', 'Low-KD (10/100 < 25) transactional opportunity (490/mo, $2.65 CPC) in Brazil.', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_6585f17975f21c5c', 'Brazil', 'Portuguese', 490, 2.65, 0.18,
  18, 10, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":451},{"year":2025,"month":11,"search_volume":519},{"year":2025,"month":12,"search_volume":485},{"year":2026,"month":1,"search_volume":451},{"year":2026,"month":2,"search_volume":519},{"year":2026,"month":3,"search_volume":485},{"year":2026,"month":4,"search_volume":451},{"year":2026,"month":5,"search_volume":519},{"year":2026,"month":6,"search_volume":485},{"year":2026,"month":7,"search_volume":451},{"year":2026,"month":8,"search_volume":519},{"year":2026,"month":9,"search_volume":485}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_19a6757bcc45856f', 'transferir videos 4k', 'transferir videos 4k', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'UNDEREXPOSED', 64, 95, 0,
  16, 11, 9, 9,
  'Primary Anchor — /pt/transferir-videos-4k', 'Low-KD (21/100 < 25) transactional opportunity (4,400/mo, $1.35 CPC) in Brazil.', '/pt/transferir-videos-4k', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_19a6757bcc45856f', 'Brazil', 'Portuguese', 4400, 1.35, 0.28,
  28, 21, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":4048},{"year":2025,"month":11,"search_volume":4664},{"year":2025,"month":12,"search_volume":4356},{"year":2026,"month":1,"search_volume":4048},{"year":2026,"month":2,"search_volume":4664},{"year":2026,"month":3,"search_volume":4356},{"year":2026,"month":4,"search_volume":4048},{"year":2026,"month":5,"search_volume":4664},{"year":2026,"month":6,"search_volume":4356},{"year":2026,"month":7,"search_volume":4048},{"year":2026,"month":8,"search_volume":4664},{"year":2026,"month":9,"search_volume":4356}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_933e2ab80ab8ea20', 'enviar prores raw', 'enviar prores raw', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 64, 95, 0,
  13, 13, 10, 9,
  'Primary Anchor — /pt/enviar-prores-raw', 'Low-KD (14/100 < 25) transactional opportunity (880/mo, $2.45 CPC) in Brazil.', '/pt/enviar-prores-raw', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_933e2ab80ab8ea20', 'Brazil', 'Portuguese', 880, 2.45, 0.22,
  22, 14, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":810},{"year":2025,"month":11,"search_volume":933},{"year":2025,"month":12,"search_volume":871},{"year":2026,"month":1,"search_volume":810},{"year":2026,"month":2,"search_volume":933},{"year":2026,"month":3,"search_volume":871},{"year":2026,"month":4,"search_volume":810},{"year":2026,"month":5,"search_volume":933},{"year":2026,"month":6,"search_volume":871},{"year":2026,"month":7,"search_volume":810},{"year":2026,"month":8,"search_volume":933},{"year":2026,"month":9,"search_volume":871}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_2fcc466a9d3dea93', 'enviar arquivos braw davinci resolve', 'enviar arquivos braw davinci resolve', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  10, 13, 10, 9,
  'Target BRAW & DaVinci Section — /pt/enviar-prores-raw', 'Low-KD (13/100 < 25) transactional opportunity (590/mo, $2.30 CPC) in Brazil.', '/pt/enviar-prores-raw', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_2fcc466a9d3dea93', 'Brazil', 'Portuguese', 590, 2.3, 0.17,
  17, 13, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":543},{"year":2025,"month":11,"search_volume":625},{"year":2025,"month":12,"search_volume":584},{"year":2026,"month":1,"search_volume":543},{"year":2026,"month":2,"search_volume":625},{"year":2026,"month":3,"search_volume":584},{"year":2026,"month":4,"search_volume":543},{"year":2026,"month":5,"search_volume":625},{"year":2026,"month":6,"search_volume":584},{"year":2026,"month":7,"search_volume":543},{"year":2026,"month":8,"search_volume":625},{"year":2026,"month":9,"search_volume":584}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_7e8581b7dfa0e96d', 'como mandar video pesado pelo whatsapp sem perder qualidade', 'como mandar video pesado pelo whatsapp sem perder qualidade', 'dataforseo_discovery', NULL, 'cluster_problem',
  'UNDEREXPOSED', 65, 95, 0,
  20, 8, 9, 9,
  'Target WhatsApp Link Bypass — /pt/transferir-videos-4k', 'Low-KD (21/100 < 25) informational opportunity (12,100/mo, $0.65 CPC) in Brazil.', '/pt/transferir-videos-4k', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_7e8581b7dfa0e96d', 'Brazil', 'Portuguese', 12100, 0.65, 0.24,
  24, 21, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":11132},{"year":2025,"month":11,"search_volume":12826},{"year":2025,"month":12,"search_volume":11979},{"year":2026,"month":1,"search_volume":11132},{"year":2026,"month":2,"search_volume":12826},{"year":2026,"month":3,"search_volume":11979},{"year":2026,"month":4,"search_volume":11132},{"year":2026,"month":5,"search_volume":12826},{"year":2026,"month":6,"search_volume":11979},{"year":2026,"month":7,"search_volume":11132},{"year":2026,"month":8,"search_volume":12826},{"year":2026,"month":9,"search_volume":11979}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_04cbd9f332d59670', 'enviar video 4k sem compressao para cliente', 'enviar video 4k sem compressao para cliente', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'UNDEREXPOSED', 63, 95, 0,
  13, 13, 9, 9,
  'Target Zero-Compression 4K Delivery', 'Low-KD (17/100 < 25) transactional opportunity (1,900/mo, $1.60 CPC) in Brazil.', '/pt/transferir-videos-4k', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_04cbd9f332d59670', 'Brazil', 'Portuguese', 1900, 1.6, 0.23,
  23, 17, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":1748},{"year":2025,"month":11,"search_volume":2014},{"year":2025,"month":12,"search_volume":1881},{"year":2026,"month":1,"search_volume":1748},{"year":2026,"month":2,"search_volume":2014},{"year":2026,"month":3,"search_volume":1881},{"year":2026,"month":4,"search_volume":1748},{"year":2026,"month":5,"search_volume":2014},{"year":2026,"month":6,"search_volume":1881},{"year":2026,"month":7,"search_volume":1748},{"year":2026,"month":8,"search_volume":2014},{"year":2026,"month":9,"search_volume":1881}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_8c7eefeaeaf3b825', 'transferir brutos de camera red r3d e arri', 'transferir brutos de camera red r3d e arri', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 62, 95, 0,
  10, 14, 10, 9,
  'Target Cinema Dailies H2 — /pt/enviar-prores-raw', 'Low-KD (11/100 < 25) transactional opportunity (420/mo, $2.80 CPC) in Brazil.', '/pt/enviar-prores-raw', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_8c7eefeaeaf3b825', 'Brazil', 'Portuguese', 420, 2.8, 0.16,
  16, 11, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":386},{"year":2025,"month":11,"search_volume":445},{"year":2025,"month":12,"search_volume":416},{"year":2026,"month":1,"search_volume":386},{"year":2026,"month":2,"search_volume":445},{"year":2026,"month":3,"search_volume":416},{"year":2026,"month":4,"search_volume":386},{"year":2026,"month":5,"search_volume":445},{"year":2026,"month":6,"search_volume":416},{"year":2026,"month":7,"search_volume":386},{"year":2026,"month":8,"search_volume":445},{"year":2026,"month":9,"search_volume":416}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_6713c5098e05211e', 'como enviar projeto premiere pro completo com midia', 'como enviar projeto premiere pro completo com midia', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'EMERGING', 61, 95, 0,
  13, 10, 10, 9,
  'Target NLE Project Handoff Section', 'Low-KD (15/100 < 25) informational opportunity (820/mo, $1.75 CPC) in Brazil.', '/pt/enviar-prores-raw', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_6713c5098e05211e', 'Brazil', 'Portuguese', 820, 1.75, 0.21,
  21, 15, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":754},{"year":2025,"month":11,"search_volume":869},{"year":2025,"month":12,"search_volume":812},{"year":2026,"month":1,"search_volume":754},{"year":2026,"month":2,"search_volume":869},{"year":2026,"month":3,"search_volume":812},{"year":2026,"month":4,"search_volume":754},{"year":2026,"month":5,"search_volume":869},{"year":2026,"month":6,"search_volume":812},{"year":2026,"month":7,"search_volume":754},{"year":2026,"month":8,"search_volume":869},{"year":2026,"month":9,"search_volume":812}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_0fb8a85cd23916ce', 'enviar pacote final cut pro fcpbundle pesado', 'enviar pacote final cut pro fcpbundle pesado', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 59, 95, 0,
  8, 13, 10, 9,
  'Target Apple ProRes & FCPBundle Section', 'Low-KD (12/100 < 25) transactional opportunity (380/mo, $2.10 CPC) in Brazil.', '/pt/enviar-prores-raw', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_0fb8a85cd23916ce', 'Brazil', 'Portuguese', 380, 2.1, 0.18,
  18, 12, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":350},{"year":2025,"month":11,"search_volume":403},{"year":2025,"month":12,"search_volume":376},{"year":2026,"month":1,"search_volume":350},{"year":2026,"month":2,"search_volume":403},{"year":2026,"month":3,"search_volume":376},{"year":2026,"month":4,"search_volume":350},{"year":2026,"month":5,"search_volume":403},{"year":2026,"month":6,"search_volume":376},{"year":2026,"month":7,"search_volume":350},{"year":2026,"month":8,"search_volume":403},{"year":2026,"month":9,"search_volume":376}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_ac3db3ebab004f20', 'transferir video 4k 60fps do iphone para pc sem cabo', 'transferir video 4k 60fps do iphone para pc sem cabo', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'UNDEREXPOSED', 61, 95, 0,
  16, 8, 9, 9,
  'Target Mobile ProRes 4K Upload Section', 'Low-KD (19/100 < 25) informational opportunity (2,900/mo, $0.95 CPC) in Brazil.', '/pt/transferir-videos-4k', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_ac3db3ebab004f20', 'Brazil', 'Portuguese', 2900, 0.95, 0.22,
  22, 19, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":2668},{"year":2025,"month":11,"search_volume":3074},{"year":2025,"month":12,"search_volume":2871},{"year":2026,"month":1,"search_volume":2668},{"year":2026,"month":2,"search_volume":3074},{"year":2026,"month":3,"search_volume":2871},{"year":2026,"month":4,"search_volume":2668},{"year":2026,"month":5,"search_volume":3074},{"year":2026,"month":6,"search_volume":2871},{"year":2026,"month":7,"search_volume":2668},{"year":2026,"month":8,"search_volume":3074},{"year":2026,"month":9,"search_volume":2871}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_6a9e5221311002ab', 'enviar video de casamento 4k para noivos online', 'enviar video de casamento 4k para noivos online', 'dataforseo_discovery', NULL, 'cluster_profession',
  'EMERGING', 63, 95, 0,
  13, 13, 9, 9,
  'Target Wedding Filmmaker Delivery', 'Low-KD (16/100 < 25) transactional opportunity (1,100/mo, $1.55 CPC) in Brazil.', '/pt/transferir-videos-4k', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_6a9e5221311002ab', 'Brazil', 'Portuguese', 1100, 1.55, 0.24,
  24, 16, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":1012},{"year":2025,"month":11,"search_volume":1166},{"year":2025,"month":12,"search_volume":1089},{"year":2026,"month":1,"search_volume":1012},{"year":2026,"month":2,"search_volume":1166},{"year":2026,"month":3,"search_volume":1089},{"year":2026,"month":4,"search_volume":1012},{"year":2026,"month":5,"search_volume":1166},{"year":2026,"month":6,"search_volume":1089},{"year":2026,"month":7,"search_volume":1012},{"year":2026,"month":8,"search_volume":1166},{"year":2026,"month":9,"search_volume":1089}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_256058829657640d', 'enviar arquivo mxf broadcast para emissora de tv', 'enviar arquivo mxf broadcast para emissora de tv', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 60, 95, 0,
  8, 14, 10, 9,
  'Target Broadcast MXF Delivery', 'Low-KD (9/100 < 25) transactional opportunity (340/mo, $2.60 CPC) in Brazil.', '/pt/enviar-prores-raw', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_256058829657640d', 'Brazil', 'Portuguese', 340, 2.6, 0.15,
  15, 9, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":313},{"year":2025,"month":11,"search_volume":360},{"year":2025,"month":12,"search_volume":337},{"year":2026,"month":1,"search_volume":313},{"year":2026,"month":2,"search_volume":360},{"year":2026,"month":3,"search_volume":337},{"year":2026,"month":4,"search_volume":313},{"year":2026,"month":5,"search_volume":360},{"year":2026,"month":6,"search_volume":337},{"year":2026,"month":7,"search_volume":313},{"year":2026,"month":8,"search_volume":360},{"year":2026,"month":9,"search_volume":337}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_bbe23f4efdb1490a', 'transferir stems de audio wav 24 bits sem comprimir', 'transferir stems de audio wav 24 bits sem comprimir', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'EMERGING', 61, 95, 0,
  10, 13, 10, 9,
  'Target Studio Audio & Mixing Workflow', 'Low-KD (12/100 < 25) transactional opportunity (460/mo, $1.65 CPC) in Brazil.', '/pt/compartilhar-arquivos-pesados', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_bbe23f4efdb1490a', 'Brazil', 'Portuguese', 460, 1.65, 0.19,
  19, 12, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":423},{"year":2025,"month":11,"search_volume":488},{"year":2025,"month":12,"search_volume":455},{"year":2026,"month":1,"search_volume":423},{"year":2026,"month":2,"search_volume":488},{"year":2026,"month":3,"search_volume":455},{"year":2026,"month":4,"search_volume":423},{"year":2026,"month":5,"search_volume":488},{"year":2026,"month":6,"search_volume":455},{"year":2026,"month":7,"search_volume":423},{"year":2026,"month":8,"search_volume":488},{"year":2026,"month":9,"search_volume":455}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_930553c10a224793', 'enviar sessao pro tools e logic pro para mixagem', 'enviar sessao pro tools e logic pro para mixagem', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 59, 95, 0,
  8, 13, 10, 9,
  'Target Music Producer Handoff', 'Low-KD (11/100 < 25) transactional opportunity (390/mo, $1.80 CPC) in Brazil.', '/pt/compartilhar-arquivos-pesados', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_930553c10a224793', 'Brazil', 'Portuguese', 390, 1.8, 0.17,
  17, 11, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":359},{"year":2025,"month":11,"search_volume":413},{"year":2025,"month":12,"search_volume":386},{"year":2026,"month":1,"search_volume":359},{"year":2026,"month":2,"search_volume":413},{"year":2026,"month":3,"search_volume":386},{"year":2026,"month":4,"search_volume":359},{"year":2026,"month":5,"search_volume":413},{"year":2026,"month":6,"search_volume":386},{"year":2026,"month":7,"search_volume":359},{"year":2026,"month":8,"search_volume":413},{"year":2026,"month":9,"search_volume":386}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_41478505306c18f8', 'enviar arquivo blender e cinema 4d para render farm', 'enviar arquivo blender e cinema 4d para render farm', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  10, 13, 10, 9,
  'Target 3D & VFX Studio Section', 'Low-KD (14/100 < 25) transactional opportunity (520/mo, $1.95 CPC) in Brazil.', '/pt/transferir-arquivos-grandes', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_41478505306c18f8', 'Brazil', 'Portuguese', 520, 1.95, 0.2,
  20, 14, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":478},{"year":2025,"month":11,"search_volume":551},{"year":2025,"month":12,"search_volume":515},{"year":2026,"month":1,"search_volume":478},{"year":2026,"month":2,"search_volume":551},{"year":2026,"month":3,"search_volume":515},{"year":2026,"month":4,"search_volume":478},{"year":2026,"month":5,"search_volume":551},{"year":2026,"month":6,"search_volume":515},{"year":2026,"month":7,"search_volume":478},{"year":2026,"month":8,"search_volume":551},{"year":2026,"month":9,"search_volume":515}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_1274c9e88f06d772', 'transferir sequencia openexr 16 bits para vfx', 'transferir sequencia openexr 16 bits para vfx', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 60, 95, 0,
  8, 14, 10, 9,
  'Target Finishing & Color Grading', 'Low-KD (8/100 < 25) transactional opportunity (240/mo, $2.75 CPC) in Brazil.', '/pt/enviar-prores-raw', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_1274c9e88f06d772', 'Brazil', 'Portuguese', 240, 2.75, 0.14,
  14, 8, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":221},{"year":2025,"month":11,"search_volume":254},{"year":2025,"month":12,"search_volume":238},{"year":2026,"month":1,"search_volume":221},{"year":2026,"month":2,"search_volume":254},{"year":2026,"month":3,"search_volume":238},{"year":2026,"month":4,"search_volume":221},{"year":2026,"month":5,"search_volume":254},{"year":2026,"month":6,"search_volume":238},{"year":2026,"month":7,"search_volume":221},{"year":2026,"month":8,"search_volume":254},{"year":2026,"month":9,"search_volume":238}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_9e42c328a56116af', 'como enviar arquivo maior que 20gb', 'como enviar arquivo maior que 20gb', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'UNDEREXPOSED', 61, 95, 0,
  16, 8, 9, 9,
  'Primary Anchor — /pt/como-enviar-arquivo-maior-que-20gb', 'Low-KD (18/100 < 25) informational opportunity (3,600/mo, $1.42 CPC) in Brazil.', '/pt/como-enviar-arquivo-maior-que-20gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_9e42c328a56116af', 'Brazil', 'Portuguese', 3600, 1.42, 0.26,
  26, 18, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":3312},{"year":2025,"month":11,"search_volume":3816},{"year":2025,"month":12,"search_volume":3564},{"year":2026,"month":1,"search_volume":3312},{"year":2026,"month":2,"search_volume":3816},{"year":2026,"month":3,"search_volume":3564},{"year":2026,"month":4,"search_volume":3312},{"year":2026,"month":5,"search_volume":3816},{"year":2026,"month":6,"search_volume":3564},{"year":2026,"month":7,"search_volume":3312},{"year":2026,"month":8,"search_volume":3816},{"year":2026,"month":9,"search_volume":3564}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_64cdbf98328e8773', 'compartilhar arquivos pesados', 'compartilhar arquivos pesados', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'UNDEREXPOSED', 68, 95, 0,
  20, 11, 9, 9,
  'Primary Anchor — /pt/compartilhar-arquivos-pesados', 'Low-KD (24/100 < 25) transactional opportunity (5,400/mo, $1.08 CPC) in Brazil.', '/pt/compartilhar-arquivos-pesados', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_64cdbf98328e8773', 'Brazil', 'Portuguese', 5400, 1.08, 0.31,
  31, 24, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":4968},{"year":2025,"month":11,"search_volume":5724},{"year":2025,"month":12,"search_volume":5346},{"year":2026,"month":1,"search_volume":4968},{"year":2026,"month":2,"search_volume":5724},{"year":2026,"month":3,"search_volume":5346},{"year":2026,"month":4,"search_volume":4968},{"year":2026,"month":5,"search_volume":5724},{"year":2026,"month":6,"search_volume":5346},{"year":2026,"month":7,"search_volume":4968},{"year":2026,"month":8,"search_volume":5724},{"year":2026,"month":9,"search_volume":5346}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_1a4aee6c9719a2ad', 'como enviar arquivos pesados gratis', 'como enviar arquivos pesados gratis', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'UNDEREXPOSED', 65, 95, 0,
  20, 8, 9, 9,
  'Target Free 25GB Tier — /pt/enviar-arquivos-pesados', 'Low-KD (23/100 < 25) informational opportunity (6,600/mo, $0.98 CPC) in Brazil.', '/pt/enviar-arquivos-pesados', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_1a4aee6c9719a2ad', 'Brazil', 'Portuguese', 6600, 0.98, 0.3,
  30, 23, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":6072},{"year":2025,"month":11,"search_volume":6996},{"year":2025,"month":12,"search_volume":6534},{"year":2026,"month":1,"search_volume":6072},{"year":2026,"month":2,"search_volume":6996},{"year":2026,"month":3,"search_volume":6534},{"year":2026,"month":4,"search_volume":6072},{"year":2026,"month":5,"search_volume":6996},{"year":2026,"month":6,"search_volume":6534},{"year":2026,"month":7,"search_volume":6072},{"year":2026,"month":8,"search_volume":6996},{"year":2026,"month":9,"search_volume":6534}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_fc3ff9fc1277e345', 'enviar arquivo de 10gb gratis', 'enviar arquivo de 10gb gratis', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'UNDEREXPOSED', 64, 95, 0,
  16, 11, 9, 9,
  'Target 10GB Free Transfer Section', 'Low-KD (18/100 < 25) transactional opportunity (3,200/mo, $1.20 CPC) in Brazil.', '/pt/como-enviar-arquivo-maior-que-20gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_fc3ff9fc1277e345', 'Brazil', 'Portuguese', 3200, 1.2, 0.24,
  24, 18, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":2944},{"year":2025,"month":11,"search_volume":3392},{"year":2025,"month":12,"search_volume":3168},{"year":2026,"month":1,"search_volume":2944},{"year":2026,"month":2,"search_volume":3392},{"year":2026,"month":3,"search_volume":3168},{"year":2026,"month":4,"search_volume":2944},{"year":2026,"month":5,"search_volume":3392},{"year":2026,"month":6,"search_volume":3168},{"year":2026,"month":7,"search_volume":2944},{"year":2026,"month":8,"search_volume":3392},{"year":2026,"month":9,"search_volume":3168}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_94dbb075102df5c4', 'enviar arquivo de 15gb gratis sem conta', 'enviar arquivo de 15gb gratis sem conta', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'EMERGING', 61, 95, 0,
  13, 11, 9, 9,
  'Target 15GB Google Drive Limit Bypass', 'Low-KD (16/100 < 25) transactional opportunity (1,400/mo, $1.30 CPC) in Brazil.', '/pt/como-enviar-arquivo-maior-que-20gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_94dbb075102df5c4', 'Brazil', 'Portuguese', 1400, 1.3, 0.22,
  22, 16, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":1288},{"year":2025,"month":11,"search_volume":1484},{"year":2025,"month":12,"search_volume":1386},{"year":2026,"month":1,"search_volume":1288},{"year":2026,"month":2,"search_volume":1484},{"year":2026,"month":3,"search_volume":1386},{"year":2026,"month":4,"search_volume":1288},{"year":2026,"month":5,"search_volume":1484},{"year":2026,"month":6,"search_volume":1386},{"year":2026,"month":7,"search_volume":1288},{"year":2026,"month":8,"search_volume":1484},{"year":2026,"month":9,"search_volume":1386}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_69d7a8e2305b829f', 'enviar arquivo de 25gb gratis online', 'enviar arquivo de 25gb gratis online', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'UNDEREXPOSED', 61, 95, 0,
  13, 11, 9, 9,
  'Target 25GB Free Ceiling Highlight', 'Low-KD (17/100 < 25) transactional opportunity (1,800/mo, $1.45 CPC) in Brazil.', '/pt/como-enviar-arquivo-maior-que-20gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_69d7a8e2305b829f', 'Brazil', 'Portuguese', 1800, 1.45, 0.23,
  23, 17, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":1656},{"year":2025,"month":11,"search_volume":1908},{"year":2025,"month":12,"search_volume":1782},{"year":2026,"month":1,"search_volume":1656},{"year":2026,"month":2,"search_volume":1908},{"year":2026,"month":3,"search_volume":1782},{"year":2026,"month":4,"search_volume":1656},{"year":2026,"month":5,"search_volume":1908},{"year":2026,"month":6,"search_volume":1782},{"year":2026,"month":7,"search_volume":1656},{"year":2026,"month":8,"search_volume":1908},{"year":2026,"month":9,"search_volume":1782}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_da02b5e56c5b4f65', 'enviar arquivo de 30gb pela internet', 'enviar arquivo de 30gb pela internet', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'EMERGING', 64, 95, 0,
  13, 13, 10, 9,
  'Target 30GB Prepaid Pack CTA', 'Low-KD (15/100 < 25) transactional opportunity (1,100/mo, $1.55 CPC) in Brazil.', '/pt/como-enviar-arquivo-maior-que-20gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_da02b5e56c5b4f65', 'Brazil', 'Portuguese', 1100, 1.55, 0.21,
  21, 15, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":1012},{"year":2025,"month":11,"search_volume":1166},{"year":2025,"month":12,"search_volume":1089},{"year":2026,"month":1,"search_volume":1012},{"year":2026,"month":2,"search_volume":1166},{"year":2026,"month":3,"search_volume":1089},{"year":2026,"month":4,"search_volume":1012},{"year":2026,"month":5,"search_volume":1166},{"year":2026,"month":6,"search_volume":1089},{"year":2026,"month":7,"search_volume":1012},{"year":2026,"month":8,"search_volume":1166},{"year":2026,"month":9,"search_volume":1089}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_0e8e029075c68c60', 'enviar arquivo de 50gb online', 'enviar arquivo de 50gb online', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'UNDEREXPOSED', 63, 95, 0,
  13, 13, 9, 9,
  'Target 50GB Single-Link Value Prop', 'Low-KD (16/100 < 25) transactional opportunity (1,600/mo, $1.65 CPC) in Brazil.', '/pt/transferir-arquivos-grandes', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_0e8e029075c68c60', 'Brazil', 'Portuguese', 1600, 1.65, 0.21,
  21, 16, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":1472},{"year":2025,"month":11,"search_volume":1696},{"year":2025,"month":12,"search_volume":1584},{"year":2026,"month":1,"search_volume":1472},{"year":2026,"month":2,"search_volume":1696},{"year":2026,"month":3,"search_volume":1584},{"year":2026,"month":4,"search_volume":1472},{"year":2026,"month":5,"search_volume":1696},{"year":2026,"month":6,"search_volume":1584},{"year":2026,"month":7,"search_volume":1472},{"year":2026,"month":8,"search_volume":1696},{"year":2026,"month":9,"search_volume":1584}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_d6f5cc2c0001a425', 'enviar arquivo de 100gb', 'enviar arquivo de 100gb', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'HIGH COMMERCIAL INTENT', 64, 95, 0,
  13, 13, 10, 9,
  'Target $20 / 100GB Prepaid Pack CTA', 'Low-KD (15/100 < 25) transactional opportunity (1,300/mo, $1.90 CPC) in Brazil.', '/pt/transferir-arquivos-grandes', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_d6f5cc2c0001a425', 'Brazil', 'Portuguese', 1300, 1.9, 0.18,
  18, 15, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":1196},{"year":2025,"month":11,"search_volume":1378},{"year":2025,"month":12,"search_volume":1287},{"year":2026,"month":1,"search_volume":1196},{"year":2026,"month":2,"search_volume":1378},{"year":2026,"month":3,"search_volume":1287},{"year":2026,"month":4,"search_volume":1196},{"year":2026,"month":5,"search_volume":1378},{"year":2026,"month":6,"search_volume":1287},{"year":2026,"month":7,"search_volume":1196},{"year":2026,"month":8,"search_volume":1378},{"year":2026,"month":9,"search_volume":1287}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_ff96b60d53e112a9', 'como transferir 200gb pela internet rapido', 'como transferir 200gb pela internet rapido', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'EMERGING', 58, 95, 0,
  10, 10, 10, 9,
  'Target High-Capacity Studio Section', 'Low-KD (13/100 < 25) informational opportunity (680/mo, $2.10 CPC) in Brazil.', '/pt/transferir-arquivos-grandes', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_ff96b60d53e112a9', 'Brazil', 'Portuguese', 680, 2.1, 0.17,
  17, 13, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":626},{"year":2025,"month":11,"search_volume":721},{"year":2025,"month":12,"search_volume":673},{"year":2026,"month":1,"search_volume":626},{"year":2026,"month":2,"search_volume":721},{"year":2026,"month":3,"search_volume":673},{"year":2026,"month":4,"search_volume":626},{"year":2026,"month":5,"search_volume":721},{"year":2026,"month":6,"search_volume":673},{"year":2026,"month":7,"search_volume":626},{"year":2026,"month":8,"search_volume":721},{"year":2026,"month":9,"search_volume":673}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_1d5168b9d23ddced', 'transferir 500gb em um unico link', 'transferir 500gb em um unico link', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  10, 13, 10, 9,
  'Target 500GB Single-Link Value Prop', 'Low-KD (12/100 < 25) transactional opportunity (520/mo, $2.40 CPC) in Brazil.', '/pt/transferir-arquivos-grandes', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_1d5168b9d23ddced', 'Brazil', 'Portuguese', 520, 2.4, 0.16,
  16, 12, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":478},{"year":2025,"month":11,"search_volume":551},{"year":2025,"month":12,"search_volume":515},{"year":2026,"month":1,"search_volume":478},{"year":2026,"month":2,"search_volume":551},{"year":2026,"month":3,"search_volume":515},{"year":2026,"month":4,"search_volume":478},{"year":2026,"month":5,"search_volume":551},{"year":2026,"month":6,"search_volume":515},{"year":2026,"month":7,"search_volume":478},{"year":2026,"month":8,"search_volume":551},{"year":2026,"month":9,"search_volume":515}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_03a1a8ae09062275', 'enviar 1tb de arquivos na nuvem sem assinatura', 'enviar 1tb de arquivos na nuvem sem assinatura', 'dataforseo_discovery', NULL, 'cluster_business_model',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  10, 13, 10, 9,
  'Target $180 / 1TB (12-Month) Pack CTA', 'Low-KD (11/100 < 25) commercial opportunity (450/mo, $2.65 CPC) in Brazil.', '/pt/transferir-arquivos-grandes', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_03a1a8ae09062275', 'Brazil', 'Portuguese', 450, 2.65, 0.17,
  17, 11, 'commercial', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":414},{"year":2025,"month":11,"search_volume":477},{"year":2025,"month":12,"search_volume":446},{"year":2026,"month":1,"search_volume":414},{"year":2026,"month":2,"search_volume":477},{"year":2026,"month":3,"search_volume":446},{"year":2026,"month":4,"search_volume":414},{"year":2026,"month":5,"search_volume":477},{"year":2026,"month":6,"search_volume":446},{"year":2026,"month":7,"search_volume":414},{"year":2026,"month":8,"search_volume":477},{"year":2026,"month":9,"search_volume":446}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_52f5d085f7b35ca9', 'gerar link para download de arquivo pesado', 'gerar link para download de arquivo pesado', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'UNDEREXPOSED', 64, 95, 0,
  16, 11, 9, 9,
  'Target Direct 1-Click Link Generation', 'Low-KD (19/100 < 25) transactional opportunity (2,800/mo, $1.25 CPC) in Brazil.', '/pt/compartilhar-arquivos-pesados', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_52f5d085f7b35ca9', 'Brazil', 'Portuguese', 2800, 1.25, 0.25,
  25, 19, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":2576},{"year":2025,"month":11,"search_volume":2968},{"year":2025,"month":12,"search_volume":2772},{"year":2026,"month":1,"search_volume":2576},{"year":2026,"month":2,"search_volume":2968},{"year":2026,"month":3,"search_volume":2772},{"year":2026,"month":4,"search_volume":2576},{"year":2026,"month":5,"search_volume":2968},{"year":2026,"month":6,"search_volume":2772},{"year":2026,"month":7,"search_volume":2576},{"year":2026,"month":8,"search_volume":2968},{"year":2026,"month":9,"search_volume":2772}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_f4ced5318ad69fc5', 'enviar pasta zipada de 20gb gratis', 'enviar pasta zipada de 20gb gratis', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'EMERGING', 62, 95, 0,
  13, 11, 10, 9,
  'Target ZIP / 7z Archive Transfer', 'Low-KD (14/100 < 25) transactional opportunity (940/mo, $1.35 CPC) in Brazil.', '/pt/como-enviar-arquivo-maior-que-20gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_f4ced5318ad69fc5', 'Brazil', 'Portuguese', 940, 1.35, 0.21,
  21, 14, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":865},{"year":2025,"month":11,"search_volume":996},{"year":2025,"month":12,"search_volume":931},{"year":2026,"month":1,"search_volume":865},{"year":2026,"month":2,"search_volume":996},{"year":2026,"month":3,"search_volume":931},{"year":2026,"month":4,"search_volume":865},{"year":2026,"month":5,"search_volume":996},{"year":2026,"month":6,"search_volume":931},{"year":2026,"month":7,"search_volume":865},{"year":2026,"month":8,"search_volume":996},{"year":2026,"month":9,"search_volume":931}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_1ad04757ae45946f', 'upload de arquivos grandes sem queda de conexao', 'upload de arquivos grandes sem queda de conexao', 'dataforseo_discovery', NULL, 'cluster_problem',
  'HIGH COMMERCIAL INTENT', 60, 95, 0,
  10, 12, 10, 9,
  'Highlight Claro/Vivo/Starlink Timeout Elimination', 'Low-KD (13/100 < 25) commercial opportunity (760/mo, $1.85 CPC) in Brazil.', '/pt/enviar-arquivos-pesados', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_1ad04757ae45946f', 'Brazil', 'Portuguese', 760, 1.85, 0.19,
  19, 13, 'commercial', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":699},{"year":2025,"month":11,"search_volume":806},{"year":2025,"month":12,"search_volume":752},{"year":2026,"month":1,"search_volume":699},{"year":2026,"month":2,"search_volume":806},{"year":2026,"month":3,"search_volume":752},{"year":2026,"month":4,"search_volume":699},{"year":2026,"month":5,"search_volume":806},{"year":2026,"month":6,"search_volume":752},{"year":2026,"month":7,"search_volume":699},{"year":2026,"month":8,"search_volume":806},{"year":2026,"month":9,"search_volume":752}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_42216211a632ae44', 'wetransfer limite 20gb', 'wetransfer limite 20gb', 'dataforseo_discovery', NULL, 'cluster_competitor',
  'UNDEREXPOSED', 65, 95, 0,
  16, 12, 9, 9,
  'Primary Anchor — /pt/wetransfer-limite-20gb', 'Low-KD (19/100 < 25) commercial opportunity (2,900/mo, $1.55 CPC) in Brazil.', '/pt/wetransfer-limite-20gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_42216211a632ae44', 'Brazil', 'Portuguese', 2900, 1.55, 0.33,
  33, 19, 'commercial', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":2668},{"year":2025,"month":11,"search_volume":3074},{"year":2025,"month":12,"search_volume":2871},{"year":2026,"month":1,"search_volume":2668},{"year":2026,"month":2,"search_volume":3074},{"year":2026,"month":3,"search_volume":2871},{"year":2026,"month":4,"search_volume":2668},{"year":2026,"month":5,"search_volume":3074},{"year":2026,"month":6,"search_volume":2871},{"year":2026,"month":7,"search_volume":2668},{"year":2026,"month":8,"search_volume":3074},{"year":2026,"month":9,"search_volume":2871}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_4ea4e2bb57d3ba68', 'alternativa google drive arquivos grandes', 'alternativa google drive arquivos grandes', 'dataforseo_discovery', NULL, 'cluster_competitor',
  'UNDEREXPOSED', 65, 95, 0,
  16, 12, 9, 9,
  'Primary Anchor — /pt/alternativa-google-drive-arquivos-grandes', 'Low-KD (22/100 < 25) commercial opportunity (2,400/mo, $1.72 CPC) in Brazil.', '/pt/alternativa-google-drive-arquivos-grandes', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_4ea4e2bb57d3ba68', 'Brazil', 'Portuguese', 2400, 1.72, 0.41,
  41, 22, 'commercial', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":2208},{"year":2025,"month":11,"search_volume":2544},{"year":2025,"month":12,"search_volume":2376},{"year":2026,"month":1,"search_volume":2208},{"year":2026,"month":2,"search_volume":2544},{"year":2026,"month":3,"search_volume":2376},{"year":2026,"month":4,"search_volume":2208},{"year":2026,"month":5,"search_volume":2544},{"year":2026,"month":6,"search_volume":2376},{"year":2026,"month":7,"search_volume":2208},{"year":2026,"month":8,"search_volume":2544},{"year":2026,"month":9,"search_volume":2376}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_ece0962a9a78df96', 'enviar arquivos para clientes sem cadastro', 'enviar arquivos para clientes sem cadastro', 'dataforseo_discovery', NULL, 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 63, 95, 0,
  13, 13, 9, 9,
  'Primary Anchor — /pt/enviar-arquivos-para-clientes-sem-cadastro', 'Low-KD (16/100 < 25) transactional opportunity (1,900/mo, $1.95 CPC) in Brazil.', '/pt/enviar-arquivos-para-clientes-sem-cadastro', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_ece0962a9a78df96', 'Brazil', 'Portuguese', 1900, 1.95, 0.25,
  25, 16, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":1748},{"year":2025,"month":11,"search_volume":2014},{"year":2025,"month":12,"search_volume":1881},{"year":2026,"month":1,"search_volume":1748},{"year":2026,"month":2,"search_volume":2014},{"year":2026,"month":3,"search_volume":1881},{"year":2026,"month":4,"search_volume":1748},{"year":2026,"month":5,"search_volume":2014},{"year":2026,"month":6,"search_volume":1881},{"year":2026,"month":7,"search_volume":1748},{"year":2026,"month":8,"search_volume":2014},{"year":2026,"month":9,"search_volume":1881}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_12721335f4278acf', 'burlar limite 2gb wetransfer', 'burlar limite 2gb wetransfer', 'dataforseo_discovery', NULL, 'cluster_competitor',
  'UNDEREXPOSED', 64, 95, 0,
  16, 11, 9, 9,
  'Target 2GB Cap Bypass — /pt/wetransfer-limite-20gb', 'Low-KD (17/100 < 25) transactional opportunity (2,100/mo, $1.10 CPC) in Brazil.', '/pt/wetransfer-limite-20gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_12721335f4278acf', 'Brazil', 'Portuguese', 2100, 1.1, 0.22,
  22, 17, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":1932},{"year":2025,"month":11,"search_volume":2226},{"year":2025,"month":12,"search_volume":2079},{"year":2026,"month":1,"search_volume":1932},{"year":2026,"month":2,"search_volume":2226},{"year":2026,"month":3,"search_volume":2079},{"year":2026,"month":4,"search_volume":1932},{"year":2026,"month":5,"search_volume":2226},{"year":2026,"month":6,"search_volume":2079},{"year":2026,"month":7,"search_volume":1932},{"year":2026,"month":8,"search_volume":2226},{"year":2026,"month":9,"search_volume":2079}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_1c51e95407478d26', 'google drive cota de download excedida', 'google drive cota de download excedida', 'dataforseo_discovery', NULL, 'cluster_problem',
  'UNDEREXPOSED', 65, 95, 0,
  20, 8, 9, 9,
  'Target 24h Quota Lockout Solution', 'Low-KD (20/100 < 25) informational opportunity (5,900/mo, $0.85 CPC) in Brazil.', '/pt/alternativa-google-drive-arquivos-grandes', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_1c51e95407478d26', 'Brazil', 'Portuguese', 5900, 0.85, 0.19,
  19, 20, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":5428},{"year":2025,"month":11,"search_volume":6254},{"year":2025,"month":12,"search_volume":5841},{"year":2026,"month":1,"search_volume":5428},{"year":2026,"month":2,"search_volume":6254},{"year":2026,"month":3,"search_volume":5841},{"year":2026,"month":4,"search_volume":5428},{"year":2026,"month":5,"search_volume":6254},{"year":2026,"month":6,"search_volume":5841},{"year":2026,"month":7,"search_volume":5428},{"year":2026,"month":8,"search_volume":6254},{"year":2026,"month":9,"search_volume":5841}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_5f4baeb5ff3f78f1', 'enviar fotos raw para clientes', 'enviar fotos raw para clientes', 'dataforseo_discovery', NULL, 'cluster_profession',
  'UNDEREXPOSED', 66, 95, 0,
  16, 13, 9, 9,
  'Target Photography RAW Delivery', 'Low-KD (19/100 < 25) transactional opportunity (2,600/mo, $1.50 CPC) in Brazil.', '/pt/enviar-arquivos-para-clientes-sem-cadastro', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_5f4baeb5ff3f78f1', 'Brazil', 'Portuguese', 2600, 1.5, 0.27,
  27, 19, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":2392},{"year":2025,"month":11,"search_volume":2756},{"year":2025,"month":12,"search_volume":2574},{"year":2026,"month":1,"search_volume":2392},{"year":2026,"month":2,"search_volume":2756},{"year":2026,"month":3,"search_volume":2574},{"year":2026,"month":4,"search_volume":2392},{"year":2026,"month":5,"search_volume":2756},{"year":2026,"month":6,"search_volume":2574},{"year":2026,"month":7,"search_volume":2392},{"year":2026,"month":8,"search_volume":2756},{"year":2026,"month":9,"search_volume":2574}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_bed607d5d8369b29', 'transferencia de arquivos grandes sem mensalidade', 'transferencia de arquivos grandes sem mensalidade', 'dataforseo_discovery', NULL, 'cluster_business_model',
  'EMERGING', 62, 95, 0,
  13, 12, 9, 9,
  'Highlight Prepaid $20/100GB & $180/1TB', 'Low-KD (16/100 < 25) commercial opportunity (1,400/mo, $1.75 CPC) in Brazil.', '/pt/alternativa-wetransfer', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_bed607d5d8369b29', 'Brazil', 'Portuguese', 1400, 1.75, 0.23,
  23, 16, 'commercial', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":1288},{"year":2025,"month":11,"search_volume":1484},{"year":2025,"month":12,"search_volume":1386},{"year":2026,"month":1,"search_volume":1288},{"year":2026,"month":2,"search_volume":1484},{"year":2026,"month":3,"search_volume":1386},{"year":2026,"month":4,"search_volume":1288},{"year":2026,"month":5,"search_volume":1484},{"year":2026,"month":6,"search_volume":1386},{"year":2026,"month":7,"search_volume":1288},{"year":2026,"month":8,"search_volume":1484},{"year":2026,"month":9,"search_volume":1386}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_a62231d13612ca5c', 'melhor site para enviar arquivos maiores que 2gb gratis', 'melhor site para enviar arquivos maiores que 2gb gratis', 'dataforseo_discovery', NULL, 'cluster_competitor',
  'UNDEREXPOSED', 63, 95, 0,
  16, 10, 9, 9,
  'Target Comparison Table — /pt/alternativa-wetransfer', 'Low-KD (21/100 < 25) commercial opportunity (3,100/mo, $1.48 CPC) in Brazil.', '/pt/alternativa-wetransfer', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_a62231d13612ca5c', 'Brazil', 'Portuguese', 3100, 1.48, 0.26,
  26, 21, 'commercial', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":2852},{"year":2025,"month":11,"search_volume":3286},{"year":2025,"month":12,"search_volume":3069},{"year":2026,"month":1,"search_volume":2852},{"year":2026,"month":2,"search_volume":3286},{"year":2026,"month":3,"search_volume":3069},{"year":2026,"month":4,"search_volume":2852},{"year":2026,"month":5,"search_volume":3286},{"year":2026,"month":6,"search_volume":3069},{"year":2026,"month":7,"search_volume":2852},{"year":2026,"month":8,"search_volume":3286},{"year":2026,"month":9,"search_volume":3069}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_0315631a8007c9e1', 'wetransfer gratis ate quantos gb 2026', 'wetransfer gratis ate quantos gb 2026', 'dataforseo_discovery', NULL, 'cluster_competitor',
  'UNDEREXPOSED', 59, 95, 0,
  13, 8, 10, 9,
  'Target FAQ — /pt/wetransfer-brasil', 'Low-KD (15/100 < 25) informational opportunity (1,700/mo, $1.15 CPC) in Brazil.', '/pt/wetransfer-brasil', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_0315631a8007c9e1', 'Brazil', 'Portuguese', 1700, 1.15, 0.2,
  20, 15, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":1564},{"year":2025,"month":11,"search_volume":1802},{"year":2025,"month":12,"search_volume":1683},{"year":2026,"month":1,"search_volume":1564},{"year":2026,"month":2,"search_volume":1802},{"year":2026,"month":3,"search_volume":1683},{"year":2026,"month":4,"search_volume":1564},{"year":2026,"month":5,"search_volume":1802},{"year":2026,"month":6,"search_volume":1683},{"year":2026,"month":7,"search_volume":1564},{"year":2026,"month":8,"search_volume":1802},{"year":2026,"month":9,"search_volume":1683}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_e03927b3bf47b093', 'alternativa ao masv e filemail no brasil', 'alternativa ao masv e filemail no brasil', 'dataforseo_discovery', NULL, 'cluster_competitor',
  'HIGH COMMERCIAL INTENT', 60, 95, 0,
  10, 12, 10, 9,
  'Compare $0.18/GB ($180/1TB) vs MASV $0.25/GB', 'Low-KD (10/100 < 25) commercial opportunity (480/mo, $2.35 CPC) in Brazil.', '/pt/alternativa-wetransfer', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_e03927b3bf47b093', 'Brazil', 'Portuguese', 480, 2.35, 0.18,
  18, 10, 'commercial', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":442},{"year":2025,"month":11,"search_volume":509},{"year":2025,"month":12,"search_volume":475},{"year":2026,"month":1,"search_volume":442},{"year":2026,"month":2,"search_volume":509},{"year":2026,"month":3,"search_volume":475},{"year":2026,"month":4,"search_volume":442},{"year":2026,"month":5,"search_volume":509},{"year":2026,"month":6,"search_volume":475},{"year":2026,"month":7,"search_volume":442},{"year":2026,"month":8,"search_volume":509},{"year":2026,"month":9,"search_volume":475}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_90d809fe0c04a350', 'substituto do dropbox transfer para agencias', 'substituto do dropbox transfer para agencias', 'dataforseo_discovery', NULL, 'cluster_competitor',
  'HIGH COMMERCIAL INTENT', 60, 95, 0,
  10, 12, 10, 9,
  'Target Creative Agency Client Handoff', 'Low-KD (14/100 < 25) commercial opportunity (620/mo, $1.90 CPC) in Brazil.', '/pt/enviar-arquivos-para-clientes-sem-cadastro', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_90d809fe0c04a350', 'Brazil', 'Portuguese', 620, 1.9, 0.21,
  21, 14, 'commercial', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":570},{"year":2025,"month":11,"search_volume":657},{"year":2025,"month":12,"search_volume":614},{"year":2026,"month":1,"search_volume":570},{"year":2026,"month":2,"search_volume":657},{"year":2026,"month":3,"search_volume":614},{"year":2026,"month":4,"search_volume":570},{"year":2026,"month":5,"search_volume":657},{"year":2026,"month":6,"search_volume":614},{"year":2026,"month":7,"search_volume":570},{"year":2026,"month":8,"search_volume":657},{"year":2026,"month":9,"search_volume":614}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_45a2ff88c1bcacbf', 'como entregar arquivos pesados para cliente sem login', 'como entregar arquivos pesados para cliente sem login', 'dataforseo_discovery', NULL, 'cluster_profession',
  'EMERGING', 61, 95, 0,
  13, 10, 10, 9,
  'Highlight Zero Cadastro para o Cliente', 'Low-KD (15/100 < 25) informational opportunity (1,250/mo, $1.80 CPC) in Brazil.', '/pt/enviar-arquivos-para-clientes-sem-cadastro', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_45a2ff88c1bcacbf', 'Brazil', 'Portuguese', 1250, 1.8, 0.22,
  22, 15, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":1150},{"year":2025,"month":11,"search_volume":1325},{"year":2025,"month":12,"search_volume":1238},{"year":2026,"month":1,"search_volume":1150},{"year":2026,"month":2,"search_volume":1325},{"year":2026,"month":3,"search_volume":1238},{"year":2026,"month":4,"search_volume":1150},{"year":2026,"month":5,"search_volume":1325},{"year":2026,"month":6,"search_volume":1238},{"year":2026,"month":7,"search_volume":1150},{"year":2026,"month":8,"search_volume":1325},{"year":2026,"month":9,"search_volume":1238}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_65b9d586c091c09d', 'enviar projeto revit bim e navisworks pesado', 'enviar projeto revit bim e navisworks pesado', 'dataforseo_discovery', NULL, 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  10, 13, 10, 9,
  'Target Architecture & Civil Engineering BIM', 'Low-KD (12/100 < 25) transactional opportunity (580/mo, $2.25 CPC) in Brazil.', '/pt/transferir-arquivos-grandes', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_65b9d586c091c09d', 'Brazil', 'Portuguese', 580, 2.25, 0.18,
  18, 12, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":534},{"year":2025,"month":11,"search_volume":615},{"year":2025,"month":12,"search_volume":574},{"year":2026,"month":1,"search_volume":534},{"year":2026,"month":2,"search_volume":615},{"year":2026,"month":3,"search_volume":574},{"year":2026,"month":4,"search_volume":534},{"year":2026,"month":5,"search_volume":615},{"year":2026,"month":6,"search_volume":574},{"year":2026,"month":7,"search_volume":534},{"year":2026,"month":8,"search_volume":615},{"year":2026,"month":9,"search_volume":574}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_c1038d1e2f8d8bc4', 'enviar arquivos grandes com senha e link direto', 'enviar arquivos grandes com senha e link direto', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'EMERGING', 63, 95, 0,
  13, 13, 9, 9,
  'Target Secure Encrypted Link Section', 'Low-KD (17/100 < 25) transactional opportunity (1,350/mo, $1.50 CPC) in Brazil.', '/pt/compartilhar-arquivos-pesados', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_c1038d1e2f8d8bc4', 'Brazil', 'Portuguese', 1350, 1.5, 0.23,
  23, 17, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":1242},{"year":2025,"month":11,"search_volume":1431},{"year":2025,"month":12,"search_volume":1337},{"year":2026,"month":1,"search_volume":1242},{"year":2026,"month":2,"search_volume":1431},{"year":2026,"month":3,"search_volume":1337},{"year":2026,"month":4,"search_volume":1242},{"year":2026,"month":5,"search_volume":1431},{"year":2026,"month":6,"search_volume":1337},{"year":2026,"month":7,"search_volume":1242},{"year":2026,"month":8,"search_volume":1431},{"year":2026,"month":9,"search_volume":1337}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_ba97a501d2c102c4', 'comprar pacote de transferencia de dados pre pago', 'comprar pacote de transferencia de dados pre pago', 'dataforseo_discovery', NULL, 'cluster_business_model',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  10, 13, 10, 9,
  'Highlight $20/100GB & $180/1TB (12-Month Validity)', 'Low-KD (11/100 < 25) transactional opportunity (490/mo, $2.15 CPC) in Brazil.', '/pt/wetransfer-brasil', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_ba97a501d2c102c4', 'Brazil', 'Portuguese', 490, 2.15, 0.19,
  19, 11, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":451},{"year":2025,"month":11,"search_volume":519},{"year":2025,"month":12,"search_volume":485},{"year":2026,"month":1,"search_volume":451},{"year":2026,"month":2,"search_volume":519},{"year":2026,"month":3,"search_volume":485},{"year":2026,"month":4,"search_volume":451},{"year":2026,"month":5,"search_volume":519},{"year":2026,"month":6,"search_volume":485},{"year":2026,"month":7,"search_volume":451},{"year":2026,"month":8,"search_volume":519},{"year":2026,"month":9,"search_volume":485}]',
  0, 'DataForSEO Low-KD (<25) Discovery [Brazil / pt]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_a7115df8357929cf', 'send braw video files', 'send braw video files', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 62, 95, 0,
  10, 15, 9, 9,
  'Primary Anchor — /send-braw-video-files', 'Low-KD (24/100 < 25) transactional opportunity (720/mo, $4.60 CPC) in United States.', '/send-braw-video-files', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_a7115df8357929cf', 'United States', 'English', 720, 4.6, 0.52,
  52, 24, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":662},{"year":2025,"month":11,"search_volume":763},{"year":2025,"month":12,"search_volume":713},{"year":2026,"month":1,"search_volume":662},{"year":2026,"month":2,"search_volume":763},{"year":2026,"month":3,"search_volume":713},{"year":2026,"month":4,"search_volume":662},{"year":2026,"month":5,"search_volume":763},{"year":2026,"month":6,"search_volume":713},{"year":2026,"month":7,"search_volume":662},{"year":2026,"month":8,"search_volume":763},{"year":2026,"month":9,"search_volume":713}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_9584ee90195bcfcc', 'deliver arri raw footage', 'deliver arri raw footage', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 60, 95, 0,
  8, 15, 9, 9,
  'Primary Anchor — /deliver-arri-raw-footage', 'Low-KD (18/100 < 25) transactional opportunity (390/mo, $5.40 CPC) in United States.', '/deliver-arri-raw-footage', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_9584ee90195bcfcc', 'United States', 'English', 390, 5.4, 0.44,
  44, 18, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":359},{"year":2025,"month":11,"search_volume":413},{"year":2025,"month":12,"search_volume":386},{"year":2026,"month":1,"search_volume":359},{"year":2026,"month":2,"search_volume":413},{"year":2026,"month":3,"search_volume":386},{"year":2026,"month":4,"search_volume":359},{"year":2026,"month":5,"search_volume":413},{"year":2026,"month":6,"search_volume":386},{"year":2026,"month":7,"search_volume":359},{"year":2026,"month":8,"search_volume":413},{"year":2026,"month":9,"search_volume":386}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_f05bedbb8c5be6a6', 'send mxf broadcast video', 'send mxf broadcast video', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 62, 95, 0,
  10, 15, 9, 9,
  'Primary Anchor — /send-mxf-broadcast-video', 'Low-KD (19/100 < 25) transactional opportunity (480/mo, $4.90 CPC) in United States.', '/send-mxf-broadcast-video', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_f05bedbb8c5be6a6', 'United States', 'English', 480, 4.9, 0.41,
  41, 19, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":442},{"year":2025,"month":11,"search_volume":509},{"year":2025,"month":12,"search_volume":475},{"year":2026,"month":1,"search_volume":442},{"year":2026,"month":2,"search_volume":509},{"year":2026,"month":3,"search_volume":475},{"year":2026,"month":4,"search_volume":442},{"year":2026,"month":5,"search_volume":509},{"year":2026,"month":6,"search_volume":475},{"year":2026,"month":7,"search_volume":442},{"year":2026,"month":8,"search_volume":509},{"year":2026,"month":9,"search_volume":475}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_255500e7e0e834d3', 'share final cut pro fcpbundle', 'share final cut pro fcpbundle', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  10, 14, 9, 9,
  'Primary Anchor — /share-final-cut-pro-fcpbundle', 'Low-KD (17/100 < 25) transactional opportunity (590/mo, $3.85 CPC) in United States.', '/share-final-cut-pro-fcpbundle', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_255500e7e0e834d3', 'United States', 'English', 590, 3.85, 0.39,
  39, 17, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":543},{"year":2025,"month":11,"search_volume":625},{"year":2025,"month":12,"search_volume":584},{"year":2026,"month":1,"search_volume":543},{"year":2026,"month":2,"search_volume":625},{"year":2026,"month":3,"search_volume":584},{"year":2026,"month":4,"search_volume":543},{"year":2026,"month":5,"search_volume":625},{"year":2026,"month":6,"search_volume":584},{"year":2026,"month":7,"search_volume":543},{"year":2026,"month":8,"search_volume":625},{"year":2026,"month":9,"search_volume":584}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_cca25baf1adc34b4', 'transfer openexr files', 'transfer openexr files', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  8, 15, 10, 9,
  'Primary Anchor — /transfer-openexr-files', 'Low-KD (15/100 < 25) transactional opportunity (320/mo, $4.75 CPC) in United States.', '/transfer-openexr-files', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_cca25baf1adc34b4', 'United States', 'English', 320, 4.75, 0.36,
  36, 15, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":294},{"year":2025,"month":11,"search_volume":339},{"year":2025,"month":12,"search_volume":317},{"year":2026,"month":1,"search_volume":294},{"year":2026,"month":2,"search_volume":339},{"year":2026,"month":3,"search_volume":317},{"year":2026,"month":4,"search_volume":294},{"year":2026,"month":5,"search_volume":339},{"year":2026,"month":6,"search_volume":317},{"year":2026,"month":7,"search_volume":294},{"year":2026,"month":8,"search_volume":339},{"year":2026,"month":9,"search_volume":317}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_023615114afb9729', 'send dcp package to film festival', 'send dcp package to film festival', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 60, 95, 0,
  8, 15, 9, 9,
  'Target Film Festival DCP Section', 'Low-KD (22/100 < 25) transactional opportunity (320/mo, $4.80 CPC) in United States.', '/send-large-video-files', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_023615114afb9729', 'United States', 'English', 320, 4.8, 0.46,
  46, 22, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":294},{"year":2025,"month":11,"search_volume":339},{"year":2025,"month":12,"search_volume":317},{"year":2026,"month":1,"search_volume":294},{"year":2026,"month":2,"search_volume":339},{"year":2026,"month":3,"search_volume":317},{"year":2026,"month":4,"search_volume":294},{"year":2026,"month":5,"search_volume":339},{"year":2026,"month":6,"search_volume":317},{"year":2026,"month":7,"search_volume":294},{"year":2026,"month":8,"search_volume":339},{"year":2026,"month":9,"search_volume":317}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_fbd915bd0a72a418', 'transfer davinci resolve dra project archive', 'transfer davinci resolve dra project archive', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 62, 95, 0,
  10, 15, 9, 9,
  'Primary Anchor — /transfer-davinci-resolve-project', 'Low-KD (16/100 < 25) transactional opportunity (640/mo, $4.10 CPC) in United States.', '/transfer-davinci-resolve-project', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_fbd915bd0a72a418', 'United States', 'English', 640, 4.1, 0.38,
  38, 16, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":589},{"year":2025,"month":11,"search_volume":678},{"year":2025,"month":12,"search_volume":634},{"year":2026,"month":1,"search_volume":589},{"year":2026,"month":2,"search_volume":678},{"year":2026,"month":3,"search_volume":634},{"year":2026,"month":4,"search_volume":589},{"year":2026,"month":5,"search_volume":678},{"year":2026,"month":6,"search_volume":634},{"year":2026,"month":7,"search_volume":589},{"year":2026,"month":8,"search_volume":678},{"year":2026,"month":9,"search_volume":634}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_d8826ded36155a2e', 'send sony xavc and fx6 raw footage to editor', 'send sony xavc and fx6 raw footage to editor', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 63, 95, 0,
  10, 15, 10, 9,
  'Target Camera Dailies Handoff', 'Low-KD (14/100 < 25) transactional opportunity (410/mo, $4.35 CPC) in United States.', '/send-large-video-files', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_d8826ded36155a2e', 'United States', 'English', 410, 4.35, 0.37,
  37, 14, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":377},{"year":2025,"month":11,"search_volume":435},{"year":2025,"month":12,"search_volume":406},{"year":2026,"month":1,"search_volume":377},{"year":2026,"month":2,"search_volume":435},{"year":2026,"month":3,"search_volume":406},{"year":2026,"month":4,"search_volume":377},{"year":2026,"month":5,"search_volume":435},{"year":2026,"month":6,"search_volume":406},{"year":2026,"month":7,"search_volume":377},{"year":2026,"month":8,"search_volume":435},{"year":2026,"month":9,"search_volume":406}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_8e587217f1706095', 'transfer canon crm raw video files online', 'transfer canon crm raw video files online', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  8, 15, 10, 9,
  'Target Cinema RAW Comparison Section', 'Low-KD (13/100 < 25) transactional opportunity (290/mo, $4.20 CPC) in United States.', '/send-braw-video-files', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_8e587217f1706095', 'United States', 'English', 290, 4.2, 0.34,
  34, 13, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":267},{"year":2025,"month":11,"search_volume":307},{"year":2025,"month":12,"search_volume":287},{"year":2026,"month":1,"search_volume":267},{"year":2026,"month":2,"search_volume":307},{"year":2026,"month":3,"search_volume":287},{"year":2026,"month":4,"search_volume":267},{"year":2026,"month":5,"search_volume":307},{"year":2026,"month":6,"search_volume":287},{"year":2026,"month":7,"search_volume":267},{"year":2026,"month":8,"search_volume":307},{"year":2026,"month":9,"search_volume":287}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_480d12ad167646d3', 'send prores 422 hq master without compression', 'send prores 422 hq master without compression', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 62, 95, 0,
  10, 15, 9, 9,
  'Target Uncompressed Master Delivery', 'Low-KD (20/100 < 25) transactional opportunity (540/mo, $4.95 CPC) in United States.', '/send-large-video-files', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_480d12ad167646d3', 'United States', 'English', 540, 4.95, 0.43,
  43, 20, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":497},{"year":2025,"month":11,"search_volume":572},{"year":2025,"month":12,"search_volume":535},{"year":2026,"month":1,"search_volume":497},{"year":2026,"month":2,"search_volume":572},{"year":2026,"month":3,"search_volume":535},{"year":2026,"month":4,"search_volume":497},{"year":2026,"month":5,"search_volume":572},{"year":2026,"month":6,"search_volume":535},{"year":2026,"month":7,"search_volume":497},{"year":2026,"month":8,"search_volume":572},{"year":2026,"month":9,"search_volume":535}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_637ed212f31b38de', 'how to send houdini vdb cache files', 'how to send houdini vdb cache files', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'EMERGING', 58, 95, 0,
  8, 12, 10, 9,
  'Primary Anchor — /send-houdini-hip-projects', 'Low-KD (14/100 < 25) informational opportunity (310/mo, $4.40 CPC) in United States.', '/send-houdini-hip-projects', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_637ed212f31b38de', 'United States', 'English', 310, 4.4, 0.35,
  35, 14, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":285},{"year":2025,"month":11,"search_volume":329},{"year":2025,"month":12,"search_volume":307},{"year":2026,"month":1,"search_volume":285},{"year":2026,"month":2,"search_volume":329},{"year":2026,"month":3,"search_volume":307},{"year":2026,"month":4,"search_volume":285},{"year":2026,"month":5,"search_volume":329},{"year":2026,"month":6,"search_volume":307},{"year":2026,"month":7,"search_volume":285},{"year":2026,"month":8,"search_volume":329},{"year":2026,"month":9,"search_volume":307}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_dba8aa31abb6cbe0', 'how to send maya mb and ma scene files', 'how to send maya mb and ma scene files', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'EMERGING', 57, 95, 0,
  8, 12, 9, 9,
  'Primary Anchor — /how-to-send-maya-mb-files', 'Low-KD (16/100 < 25) informational opportunity (380/mo, $4.15 CPC) in United States.', '/how-to-send-maya-mb-files', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_dba8aa31abb6cbe0', 'United States', 'English', 380, 4.15, 0.36,
  36, 16, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":350},{"year":2025,"month":11,"search_volume":403},{"year":2025,"month":12,"search_volume":376},{"year":2026,"month":1,"search_volume":350},{"year":2026,"month":2,"search_volume":403},{"year":2026,"month":3,"search_volume":376},{"year":2026,"month":4,"search_volume":350},{"year":2026,"month":5,"search_volume":403},{"year":2026,"month":6,"search_volume":376},{"year":2026,"month":7,"search_volume":350},{"year":2026,"month":8,"search_volume":403},{"year":2026,"month":9,"search_volume":376}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_a15ed53c734ad951', 'transfer cinema 4d c4d project with textures', 'transfer cinema 4d c4d project with textures', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 62, 95, 0,
  10, 15, 9, 9,
  'Primary Anchor — /transfer-cinema-4d-c4d-files', 'Low-KD (18/100 < 25) transactional opportunity (450/mo, $4.30 CPC) in United States.', '/transfer-cinema-4d-c4d-files', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_a15ed53c734ad951', 'United States', 'English', 450, 4.3, 0.39,
  39, 18, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":414},{"year":2025,"month":11,"search_volume":477},{"year":2025,"month":12,"search_volume":446},{"year":2026,"month":1,"search_volume":414},{"year":2026,"month":2,"search_volume":477},{"year":2026,"month":3,"search_volume":446},{"year":2026,"month":4,"search_volume":414},{"year":2026,"month":5,"search_volume":477},{"year":2026,"month":6,"search_volume":446},{"year":2026,"month":7,"search_volume":414},{"year":2026,"month":8,"search_volume":477},{"year":2026,"month":9,"search_volume":446}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_d8ea510b1769a3fa', 'deliver protools ptx session folder to mixing engineer', 'deliver protools ptx session folder to mixing engineer', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  10, 14, 9, 9,
  'Primary Anchor — /deliver-protools-ptx-files', 'Low-KD (17/100 < 25) transactional opportunity (490/mo, $3.90 CPC) in United States.', '/deliver-protools-ptx-files', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_d8ea510b1769a3fa', 'United States', 'English', 490, 3.9, 0.38,
  38, 17, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":451},{"year":2025,"month":11,"search_volume":519},{"year":2025,"month":12,"search_volume":485},{"year":2026,"month":1,"search_volume":451},{"year":2026,"month":2,"search_volume":519},{"year":2026,"month":3,"search_volume":485},{"year":2026,"month":4,"search_volume":451},{"year":2026,"month":5,"search_volume":519},{"year":2026,"month":6,"search_volume":485},{"year":2026,"month":7,"search_volume":451},{"year":2026,"month":8,"search_volume":519},{"year":2026,"month":9,"search_volume":485}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_849eeee46bf37f20', 'transfer logic pro x package without zipping', 'transfer logic pro x package without zipping', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  10, 14, 9, 9,
  'Primary Anchor — /transfer-logic-pro-x-sessions', 'Low-KD (19/100 < 25) transactional opportunity (520/mo, $3.60 CPC) in United States.', '/transfer-logic-pro-x-sessions', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_849eeee46bf37f20', 'United States', 'English', 520, 3.6, 0.37,
  37, 19, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":478},{"year":2025,"month":11,"search_volume":551},{"year":2025,"month":12,"search_volume":515},{"year":2026,"month":1,"search_volume":478},{"year":2026,"month":2,"search_volume":551},{"year":2026,"month":3,"search_volume":515},{"year":2026,"month":4,"search_volume":478},{"year":2026,"month":5,"search_volume":551},{"year":2026,"month":6,"search_volume":515},{"year":2026,"month":7,"search_volume":478},{"year":2026,"month":8,"search_volume":551},{"year":2026,"month":9,"search_volume":515}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_6047a8af94a39a13', 'send 25gb file free without account', 'send 25gb file free without account', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'HIGH COMMERCIAL INTENT', 64, 95, 0,
  13, 14, 9, 9,
  'Primary Anchor — /send-25gb-file', 'Low-KD (21/100 < 25) transactional opportunity (880/mo, $3.10 CPC) in United States.', '/send-25gb-file', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_6047a8af94a39a13', 'United States', 'English', 880, 3.1, 0.42,
  42, 21, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":810},{"year":2025,"month":11,"search_volume":933},{"year":2025,"month":12,"search_volume":871},{"year":2026,"month":1,"search_volume":810},{"year":2026,"month":2,"search_volume":933},{"year":2026,"month":3,"search_volume":871},{"year":2026,"month":4,"search_volume":810},{"year":2026,"month":5,"search_volume":933},{"year":2026,"month":6,"search_volume":871},{"year":2026,"month":7,"search_volume":810},{"year":2026,"month":8,"search_volume":933},{"year":2026,"month":9,"search_volume":871}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_1b0d0ed27ceb5dbf', 'deliver 20gb file to client without login', 'deliver 20gb file to client without login', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  10, 14, 9, 9,
  'Primary Anchor — /deliver-20gb-file', 'Low-KD (20/100 < 25) transactional opportunity (740/mo, $3.45 CPC) in United States.', '/deliver-20gb-file', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_1b0d0ed27ceb5dbf', 'United States', 'English', 740, 3.45, 0.41,
  41, 20, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":681},{"year":2025,"month":11,"search_volume":784},{"year":2025,"month":12,"search_volume":733},{"year":2026,"month":1,"search_volume":681},{"year":2026,"month":2,"search_volume":784},{"year":2026,"month":3,"search_volume":733},{"year":2026,"month":4,"search_volume":681},{"year":2026,"month":5,"search_volume":784},{"year":2026,"month":6,"search_volume":733},{"year":2026,"month":7,"search_volume":681},{"year":2026,"month":8,"search_volume":784},{"year":2026,"month":9,"search_volume":733}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_def136bcfdd7c984', 'send 30gb file online pay as you go', 'send 30gb file online pay as you go', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  10, 14, 9, 9,
  'Primary Anchor — /send-30gb-file', 'Low-KD (19/100 < 25) transactional opportunity (590/mo, $3.65 CPC) in United States.', '/send-30gb-file', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_def136bcfdd7c984', 'United States', 'English', 590, 3.65, 0.4,
  40, 19, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":543},{"year":2025,"month":11,"search_volume":625},{"year":2025,"month":12,"search_volume":584},{"year":2026,"month":1,"search_volume":543},{"year":2026,"month":2,"search_volume":625},{"year":2026,"month":3,"search_volume":584},{"year":2026,"month":4,"search_volume":543},{"year":2026,"month":5,"search_volume":625},{"year":2026,"month":6,"search_volume":584},{"year":2026,"month":7,"search_volume":543},{"year":2026,"month":8,"search_volume":625},{"year":2026,"month":9,"search_volume":584}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_ab3f10b0e5f8658a', 'transfer 50gb video file in one link', 'transfer 50gb video file in one link', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'HIGH COMMERCIAL INTENT', 64, 95, 0,
  13, 14, 9, 9,
  'Primary Anchor — /send-50gb-file', 'Low-KD (22/100 < 25) transactional opportunity (820/mo, $3.95 CPC) in United States.', '/send-50gb-file', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_ab3f10b0e5f8658a', 'United States', 'English', 820, 3.95, 0.44,
  44, 22, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":754},{"year":2025,"month":11,"search_volume":869},{"year":2025,"month":12,"search_volume":812},{"year":2026,"month":1,"search_volume":754},{"year":2026,"month":2,"search_volume":869},{"year":2026,"month":3,"search_volume":812},{"year":2026,"month":4,"search_volume":754},{"year":2026,"month":5,"search_volume":869},{"year":2026,"month":6,"search_volume":812},{"year":2026,"month":7,"search_volume":754},{"year":2026,"month":8,"search_volume":869},{"year":2026,"month":9,"search_volume":812}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_1c38a95c88306341', 'send 100gb file without monthly subscription', 'send 100gb file without monthly subscription', 'dataforseo_discovery', NULL, 'cluster_business_model',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  10, 14, 9, 9,
  'Highlight $20 / 100GB Prepaid Pack', 'Low-KD (21/100 < 25) commercial opportunity (680/mo, $4.50 CPC) in United States.', '/send-100gb-file', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_1c38a95c88306341', 'United States', 'English', 680, 4.5, 0.45,
  45, 21, 'commercial', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":626},{"year":2025,"month":11,"search_volume":721},{"year":2025,"month":12,"search_volume":673},{"year":2026,"month":1,"search_volume":626},{"year":2026,"month":2,"search_volume":721},{"year":2026,"month":3,"search_volume":673},{"year":2026,"month":4,"search_volume":626},{"year":2026,"month":5,"search_volume":721},{"year":2026,"month":6,"search_volume":673},{"year":2026,"month":7,"search_volume":626},{"year":2026,"month":8,"search_volume":721},{"year":2026,"month":9,"search_volume":673}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_4fd663fc6f8680d7', 'send 500gb raw footage online', 'send 500gb raw footage online', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'HIGH COMMERCIAL INTENT', 62, 95, 0,
  10, 15, 9, 9,
  'Primary Anchor — /send-500gb-file', 'Low-KD (20/100 < 25) transactional opportunity (430/mo, $5.10 CPC) in United States.', '/send-500gb-file', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_4fd663fc6f8680d7', 'United States', 'English', 430, 5.1, 0.43,
  43, 20, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":396},{"year":2025,"month":11,"search_volume":456},{"year":2025,"month":12,"search_volume":426},{"year":2026,"month":1,"search_volume":396},{"year":2026,"month":2,"search_volume":456},{"year":2026,"month":3,"search_volume":426},{"year":2026,"month":4,"search_volume":396},{"year":2026,"month":5,"search_volume":456},{"year":2026,"month":6,"search_volume":426},{"year":2026,"month":7,"search_volume":396},{"year":2026,"month":8,"search_volume":456},{"year":2026,"month":9,"search_volume":426}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_cbd54c2549e6ef89', 'send 2tb production archive online', 'send 2tb production archive online', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'HIGH COMMERCIAL INTENT', 59, 95, 0,
  8, 14, 9, 9,
  'Primary Anchor — /send-2tb-file', 'Low-KD (18/100 < 25) commercial opportunity (310/mo, $5.85 CPC) in United States.', '/send-2tb-file', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_cbd54c2549e6ef89', 'United States', 'English', 310, 5.85, 0.39,
  39, 18, 'commercial', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":285},{"year":2025,"month":11,"search_volume":329},{"year":2025,"month":12,"search_volume":307},{"year":2026,"month":1,"search_volume":285},{"year":2026,"month":2,"search_volume":329},{"year":2026,"month":3,"search_volume":307},{"year":2026,"month":4,"search_volume":285},{"year":2026,"month":5,"search_volume":329},{"year":2026,"month":6,"search_volume":307},{"year":2026,"month":7,"search_volume":285},{"year":2026,"month":8,"search_volume":329},{"year":2026,"month":9,"search_volume":307}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_a8cb38264724aa25', 'bypass wetransfer 2gb limit free', 'bypass wetransfer 2gb limit free', 'dataforseo_discovery', NULL, 'cluster_competitor',
  'HIGH COMMERCIAL INTENT', 64, 95, 0,
  13, 14, 9, 9,
  'Primary Anchor — /wetransfer-2gb-limit-bypass', 'Low-KD (23/100 < 25) transactional opportunity (1,600/mo, $3.40 CPC) in United States.', '/wetransfer-2gb-limit-bypass', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_a8cb38264724aa25', 'United States', 'English', 1600, 3.4, 0.46,
  46, 23, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":1472},{"year":2025,"month":11,"search_volume":1696},{"year":2025,"month":12,"search_volume":1584},{"year":2026,"month":1,"search_volume":1472},{"year":2026,"month":2,"search_volume":1696},{"year":2026,"month":3,"search_volume":1584},{"year":2026,"month":4,"search_volume":1472},{"year":2026,"month":5,"search_volume":1696},{"year":2026,"month":6,"search_volume":1584},{"year":2026,"month":7,"search_volume":1472},{"year":2026,"month":8,"search_volume":1696},{"year":2026,"month":9,"search_volume":1584}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_e202dbb62961cee8', 'fix google drive download quota exceeded for clients', 'fix google drive download quota exceeded for clients', 'dataforseo_discovery', NULL, 'cluster_problem',
  'UNDEREXPOSED', 61, 95, 0,
  13, 11, 9, 9,
  'Primary Anchor — /google-drive-download-quota-exceeded-fix', 'Low-KD (22/100 < 25) informational opportunity (1,900/mo, $2.95 CPC) in United States.', '/google-drive-download-quota-exceeded-fix', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_e202dbb62961cee8', 'United States', 'English', 1900, 2.95, 0.38,
  38, 22, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":1748},{"year":2025,"month":11,"search_volume":2014},{"year":2025,"month":12,"search_volume":1881},{"year":2026,"month":1,"search_volume":1748},{"year":2026,"month":2,"search_volume":2014},{"year":2026,"month":3,"search_volume":1881},{"year":2026,"month":4,"search_volume":1748},{"year":2026,"month":5,"search_volume":2014},{"year":2026,"month":6,"search_volume":1881},{"year":2026,"month":7,"search_volume":1748},{"year":2026,"month":8,"search_volume":2014},{"year":2026,"month":9,"search_volume":1881}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_516542f1effd28e0', 'dropbox transfer 100gb limit alternative', 'dropbox transfer 100gb limit alternative', 'dataforseo_discovery', NULL, 'cluster_competitor',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  10, 14, 9, 9,
  'Primary Anchor — /dropbox-file-size-limit-bypass', 'Low-KD (19/100 < 25) commercial opportunity (540/mo, $4.25 CPC) in United States.', '/dropbox-file-size-limit-bypass', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_516542f1effd28e0', 'United States', 'English', 540, 4.25, 0.42,
  42, 19, 'commercial', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":497},{"year":2025,"month":11,"search_volume":572},{"year":2025,"month":12,"search_volume":535},{"year":2026,"month":1,"search_volume":497},{"year":2026,"month":2,"search_volume":572},{"year":2026,"month":3,"search_volume":535},{"year":2026,"month":4,"search_volume":497},{"year":2026,"month":5,"search_volume":572},{"year":2026,"month":6,"search_volume":535},{"year":2026,"month":7,"search_volume":497},{"year":2026,"month":8,"search_volume":572},{"year":2026,"month":9,"search_volume":535}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_2cfb3c980dcdeaf3', 'pay as you go large file transfer no subscription', 'pay as you go large file transfer no subscription', 'dataforseo_discovery', NULL, 'cluster_business_model',
  'HIGH COMMERCIAL INTENT', 61, 95, 0,
  10, 14, 9, 9,
  'Highlight $20/100GB & $180/1TB (12-Month Credits)', 'Low-KD (18/100 < 25) commercial opportunity (720/mo, $4.80 CPC) in United States.', '/plans', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_2cfb3c980dcdeaf3', 'United States', 'English', 720, 4.8, 0.44,
  44, 18, 'commercial', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":662},{"year":2025,"month":11,"search_volume":763},{"year":2025,"month":12,"search_volume":713},{"year":2026,"month":1,"search_volume":662},{"year":2026,"month":2,"search_volume":763},{"year":2026,"month":3,"search_volume":713},{"year":2026,"month":4,"search_volume":662},{"year":2026,"month":5,"search_volume":763},{"year":2026,"month":6,"search_volume":713},{"year":2026,"month":7,"search_volume":662},{"year":2026,"month":8,"search_volume":763},{"year":2026,"month":9,"search_volume":713}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_7492ffa3dbbe9248', 'masv alternative cheaper per gb', 'masv alternative cheaper per gb', 'dataforseo_discovery', NULL, 'cluster_competitor',
  'HIGH COMMERCIAL INTENT', 60, 95, 0,
  8, 14, 10, 9,
  'Compare $0.18/GB ($180/1TB) + 25GB Free vs MASV $0.25/GB', 'Low-KD (15/100 < 25) commercial opportunity (390/mo, $5.60 CPC) in United States.', '/compare', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_7492ffa3dbbe9248', 'United States', 'English', 390, 5.6, 0.41,
  41, 15, 'commercial', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":359},{"year":2025,"month":11,"search_volume":413},{"year":2025,"month":12,"search_volume":386},{"year":2026,"month":1,"search_volume":359},{"year":2026,"month":2,"search_volume":413},{"year":2026,"month":3,"search_volume":386},{"year":2026,"month":4,"search_volume":359},{"year":2026,"month":5,"search_volume":413},{"year":2026,"month":6,"search_volume":386},{"year":2026,"month":7,"search_volume":359},{"year":2026,"month":8,"search_volume":413},{"year":2026,"month":9,"search_volume":386}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_f08673172bfa395a', 'send revit rvt and navisworks bim models', 'send revit rvt and navisworks bim models', 'dataforseo_discovery', NULL, 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 62, 95, 0,
  10, 15, 9, 9,
  'Primary Anchor — /send-revit-rvt-bim-models', 'Low-KD (16/100 < 25) transactional opportunity (460/mo, $4.45 CPC) in United States.', '/send-revit-rvt-bim-models', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_f08673172bfa395a', 'United States', 'English', 460, 4.45, 0.37,
  37, 16, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":423},{"year":2025,"month":11,"search_volume":488},{"year":2025,"month":12,"search_volume":455},{"year":2026,"month":1,"search_volume":423},{"year":2026,"month":2,"search_volume":488},{"year":2026,"month":3,"search_volume":455},{"year":2026,"month":4,"search_volume":423},{"year":2026,"month":5,"search_volume":488},{"year":2026,"month":6,"search_volume":455},{"year":2026,"month":7,"search_volume":423},{"year":2026,"month":8,"search_volume":488},{"year":2026,"month":9,"search_volume":455}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_61afeba5b3467e5c', 'how to send ableton live project with samples', 'how to send ableton live project with samples', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'EMERGING', 58, 95, 0,
  10, 11, 9, 9,
  'Primary Anchor — /how-to-send-ableton-live-projects', 'Low-KD (17/100 < 25) informational opportunity (610/mo, $3.15 CPC) in United States.', '/how-to-send-ableton-live-projects', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_61afeba5b3467e5c', 'United States', 'English', 610, 3.15, 0.35,
  35, 17, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":561},{"year":2025,"month":11,"search_volume":647},{"year":2025,"month":12,"search_volume":604},{"year":2026,"month":1,"search_volume":561},{"year":2026,"month":2,"search_volume":647},{"year":2026,"month":3,"search_volume":604},{"year":2026,"month":4,"search_volume":561},{"year":2026,"month":5,"search_volume":647},{"year":2026,"month":6,"search_volume":604},{"year":2026,"month":7,"search_volume":561},{"year":2026,"month":8,"search_volume":647},{"year":2026,"month":9,"search_volume":604}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_43654dc4d079ec6a', 'share multitrack wav stems without client login', 'share multitrack wav stems without client login', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 62, 95, 0,
  10, 14, 10, 9,
  'Primary Anchor — /share-multitrack-audio-stems', 'Low-KD (15/100 < 25) transactional opportunity (440/mo, $3.55 CPC) in United States.', '/share-multitrack-audio-stems', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_43654dc4d079ec6a', 'United States', 'English', 440, 3.55, 0.36,
  36, 15, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":405},{"year":2025,"month":11,"search_volume":466},{"year":2025,"month":12,"search_volume":436},{"year":2026,"month":1,"search_volume":405},{"year":2026,"month":2,"search_volume":466},{"year":2026,"month":3,"search_volume":436},{"year":2026,"month":4,"search_volume":405},{"year":2026,"month":5,"search_volume":466},{"year":2026,"month":6,"search_volume":436},{"year":2026,"month":7,"search_volume":405},{"year":2026,"month":8,"search_volume":466},{"year":2026,"month":9,"search_volume":436}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_dbb7520d91f17fb6', 'send drone orthomosaic geotiff to client', 'send drone orthomosaic geotiff to client', 'dataforseo_discovery', NULL, 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 63, 95, 0,
  10, 15, 10, 9,
  'Target Drone Mapping & GIS Deliverables', 'Low-KD (13/100 < 25) transactional opportunity (580/mo, $4.90 CPC) in United States.', '/best-way-to-share-large-files-with-clients', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_dbb7520d91f17fb6', 'United States', 'English', 580, 4.9, 0.34,
  34, 13, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":534},{"year":2025,"month":11,"search_volume":615},{"year":2025,"month":12,"search_volume":574},{"year":2026,"month":1,"search_volume":534},{"year":2026,"month":2,"search_volume":615},{"year":2026,"month":3,"search_volume":574},{"year":2026,"month":4,"search_volume":534},{"year":2026,"month":5,"search_volume":615},{"year":2026,"month":6,"search_volume":574},{"year":2026,"month":7,"search_volume":534},{"year":2026,"month":8,"search_volume":615},{"year":2026,"month":9,"search_volume":574}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_388a40bd9abb99ea', 'transfer lidar las laz point cloud files online', 'transfer lidar las laz point cloud files online', 'dataforseo_discovery', NULL, 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 63, 95, 0,
  10, 15, 10, 9,
  'Target LiDAR Survey Point Cloud Transfer', 'Low-KD (12/100 < 25) transactional opportunity (510/mo, $5.25 CPC) in United States.', '/send-50gb-file', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_388a40bd9abb99ea', 'United States', 'English', 510, 5.25, 0.33,
  33, 12, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":469},{"year":2025,"month":11,"search_volume":541},{"year":2025,"month":12,"search_volume":505},{"year":2026,"month":1,"search_volume":469},{"year":2026,"month":2,"search_volume":541},{"year":2026,"month":3,"search_volume":505},{"year":2026,"month":4,"search_volume":469},{"year":2026,"month":5,"search_volume":541},{"year":2026,"month":6,"search_volume":505},{"year":2026,"month":7,"search_volume":469},{"year":2026,"month":8,"search_volume":541},{"year":2026,"month":9,"search_volume":505}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_ea55db295f5da510', 'how to share pix4d and dronedeploy exports with clients', 'how to share pix4d and dronedeploy exports with clients', 'dataforseo_discovery', NULL, 'cluster_profession',
  'EMERGING', 58, 95, 0,
  8, 12, 10, 9,
  'Target Photogrammetry Client Handoff', 'Low-KD (11/100 < 25) informational opportunity (360/mo, $4.70 CPC) in United States.', '/best-way-to-share-large-files-with-clients', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_ea55db295f5da510', 'United States', 'English', 360, 4.7, 0.31,
  31, 11, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":331},{"year":2025,"month":11,"search_volume":382},{"year":2025,"month":12,"search_volume":356},{"year":2026,"month":1,"search_volume":331},{"year":2026,"month":2,"search_volume":382},{"year":2026,"month":3,"search_volume":356},{"year":2026,"month":4,"search_volume":331},{"year":2026,"month":5,"search_volume":382},{"year":2026,"month":6,"search_volume":356},{"year":2026,"month":7,"search_volume":331},{"year":2026,"month":8,"search_volume":382},{"year":2026,"month":9,"search_volume":356}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_1f677b3ccd5c3a79', 'send uncompressed 8k raw video footage', 'send uncompressed 8k raw video footage', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 62, 95, 0,
  10, 15, 9, 9,
  'Target 8K RED R3D & Cinema Workflow', 'Low-KD (19/100 < 25) transactional opportunity (490/mo, $5.15 CPC) in United States.', '/transfer-r3d-raw-footage', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_1f677b3ccd5c3a79', 'United States', 'English', 490, 5.15, 0.4,
  40, 19, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":451},{"year":2025,"month":11,"search_volume":519},{"year":2025,"month":12,"search_volume":485},{"year":2026,"month":1,"search_volume":451},{"year":2026,"month":2,"search_volume":519},{"year":2026,"month":3,"search_volume":485},{"year":2026,"month":4,"search_volume":451},{"year":2026,"month":5,"search_volume":519},{"year":2026,"month":6,"search_volume":485},{"year":2026,"month":7,"search_volume":451},{"year":2026,"month":8,"search_volume":519},{"year":2026,"month":9,"search_volume":485}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_6aceada05ad73465', 'transfer premiere pro project with proxy and raw media', 'transfer premiere pro project with proxy and raw media', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 62, 95, 0,
  10, 15, 9, 9,
  'Primary Anchor — /transfer-premiere-pro-project', 'Low-KD (18/100 < 25) transactional opportunity (670/mo, $4.05 CPC) in United States.', '/transfer-premiere-pro-project', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_6aceada05ad73465', 'United States', 'English', 670, 4.05, 0.39,
  39, 18, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":616},{"year":2025,"month":11,"search_volume":710},{"year":2025,"month":12,"search_volume":663},{"year":2026,"month":1,"search_volume":616},{"year":2026,"month":2,"search_volume":710},{"year":2026,"month":3,"search_volume":663},{"year":2026,"month":4,"search_volume":616},{"year":2026,"month":5,"search_volume":710},{"year":2026,"month":6,"search_volume":663},{"year":2026,"month":7,"search_volume":616},{"year":2026,"month":8,"search_volume":710},{"year":2026,"month":9,"search_volume":663}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_55addec8e8a712f7', 'how to send blender blend files with baked cache', 'how to send blender blend files with baked cache', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'EMERGING', 58, 95, 0,
  10, 11, 9, 9,
  'Primary Anchor — /how-to-send-blender-blend-files', 'Low-KD (16/100 < 25) informational opportunity (530/mo, $3.75 CPC) in United States.', '/how-to-send-blender-blend-files', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_55addec8e8a712f7', 'United States', 'English', 530, 3.75, 0.35,
  35, 16, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":488},{"year":2025,"month":11,"search_volume":562},{"year":2025,"month":12,"search_volume":525},{"year":2026,"month":1,"search_volume":488},{"year":2026,"month":2,"search_volume":562},{"year":2026,"month":3,"search_volume":525},{"year":2026,"month":4,"search_volume":488},{"year":2026,"month":5,"search_volume":562},{"year":2026,"month":6,"search_volume":525},{"year":2026,"month":7,"search_volume":488},{"year":2026,"month":8,"search_volume":562},{"year":2026,"month":9,"search_volume":525}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_33470fc2c9fbfc42', 'how to transfer unreal engine 5 project folder', 'how to transfer unreal engine 5 project folder', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'EMERGING', 62, 95, 0,
  13, 12, 9, 9,
  'Primary Anchor — /how-to-transfer-unreal-engine-project', 'Low-KD (21/100 < 25) informational opportunity (890/mo, $4.20 CPC) in United States.', '/how-to-transfer-unreal-engine-project', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_33470fc2c9fbfc42', 'United States', 'English', 890, 4.2, 0.41,
  41, 21, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":819},{"year":2025,"month":11,"search_volume":943},{"year":2025,"month":12,"search_volume":881},{"year":2026,"month":1,"search_volume":819},{"year":2026,"month":2,"search_volume":943},{"year":2026,"month":3,"search_volume":881},{"year":2026,"month":4,"search_volume":819},{"year":2026,"month":5,"search_volume":943},{"year":2026,"month":6,"search_volume":881},{"year":2026,"month":7,"search_volume":819},{"year":2026,"month":8,"search_volume":943},{"year":2026,"month":9,"search_volume":881}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_241b222c0a787741', 'file transfer time calculator for 50gb and 100gb', 'file transfer time calculator for 50gb and 100gb', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'EMERGING', 58, 95, 0,
  10, 10, 10, 9,
  'Primary Anchor — /tools/transfer-speed-calculator', 'Low-KD (14/100 < 25) informational opportunity (760/mo, $2.30 CPC) in United States.', '/tools/transfer-speed-calculator', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_241b222c0a787741', 'United States', 'English', 760, 2.3, 0.29,
  29, 14, 'informational', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":699},{"year":2025,"month":11,"search_volume":806},{"year":2025,"month":12,"search_volume":752},{"year":2026,"month":1,"search_volume":699},{"year":2026,"month":2,"search_volume":806},{"year":2026,"month":3,"search_volume":752},{"year":2026,"month":4,"search_volume":699},{"year":2026,"month":5,"search_volume":806},{"year":2026,"month":6,"search_volume":752},{"year":2026,"month":7,"search_volume":699},{"year":2026,"month":8,"search_volume":806},{"year":2026,"month":9,"search_volume":752}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_bc7c7373312dc555', 'send large files to clients without making them sign up', 'send large files to clients without making them sign up', 'dataforseo_discovery', NULL, 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 65, 95, 0,
  13, 15, 9, 9,
  'Highlight Zero-Account Client Download', 'Low-KD (20/100 < 25) transactional opportunity (1,150/mo, $4.65 CPC) in United States.', '/best-way-to-share-large-files-with-clients', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_bc7c7373312dc555', 'United States', 'English', 1150, 4.65, 0.43,
  43, 20, 'transactional', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":1058},{"year":2025,"month":11,"search_volume":1219},{"year":2025,"month":12,"search_volume":1139},{"year":2026,"month":1,"search_volume":1058},{"year":2026,"month":2,"search_volume":1219},{"year":2026,"month":3,"search_volume":1139},{"year":2026,"month":4,"search_volume":1058},{"year":2026,"month":5,"search_volume":1219},{"year":2026,"month":6,"search_volume":1139},{"year":2026,"month":7,"search_volume":1058},{"year":2026,"month":8,"search_volume":1219},{"year":2026,"month":9,"search_volume":1139}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_12a47fc824541511', 'cloudflare r2 edge file transfer zero egress', 'cloudflare r2 edge file transfer zero egress', 'dataforseo_discovery', NULL, 'cluster_business_model',
  'HIGH COMMERCIAL INTENT', 60, 95, 0,
  8, 14, 10, 9,
  'Highlight 335+ Edge PoPs & Zero Egress Architecture', 'Low-KD (11/100 < 25) commercial opportunity (340/mo, $5.50 CPC) in United States.', '/fastest-way-to-send-large-files', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  cluster_id = excluded.cluster_id,
  opportunity_status = excluded.opportunity_status,
  opportunity_score = excluded.opportunity_score,
  product_fit_score = excluded.product_fit_score,
  market_demand_score = excluded.market_demand_score,
  commercial_intent_score = excluded.commercial_intent_score,
  ranking_upside_score = excluded.ranking_upside_score,
  trend_score = excluded.trend_score,
  recommended_action = excluded.recommended_action,
  action_reason = excluded.action_reason,
  target_landing_page = excluded.target_landing_page,
  updated_at = datetime('now');

INSERT INTO seo_keyword_metrics (
  keyword_id, location_name, language_name, search_volume, cpc, competition,
  competition_index, keyword_difficulty, search_intent, search_intent_prob,
  foreign_intent, foreign_intent_prob, trend_status, monthly_volume_history_json,
  visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
  'kw_12a47fc824541511', 'United States', 'English', 340, 5.5, 0.32,
  32, 11, 'commercial', 0.91,
  'commercial', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":313},{"year":2025,"month":11,"search_volume":360},{"year":2025,"month":12,"search_volume":337},{"year":2026,"month":1,"search_volume":313},{"year":2026,"month":2,"search_volume":360},{"year":2026,"month":3,"search_volume":337},{"year":2026,"month":4,"search_volume":313},{"year":2026,"month":5,"search_volume":360},{"year":2026,"month":6,"search_volume":337},{"year":2026,"month":7,"search_volume":313},{"year":2026,"month":8,"search_volume":360},{"year":2026,"month":9,"search_volume":337}]',
  0, 'DataForSEO Low-KD (<25) Discovery [United States / en]', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT OR REPLACE INTO seo_dataforseo_requests (
  id, endpoint, method, payload_summary, status_code, cost, execution_time_ms, cache_hit, created_at
) VALUES (
  'req_low_kd_100_discovery',
  '/v3/dataforseo_labs/google/keyword_suggestions/live',
  'POST',
  'DataForSEO Labs Low-KD (<25) Discovery: 100 high-intent keywords (60 Brazil pt-BR + 40 US English) with bulk KD < 25 filter',
  200,
  0.085,
  512,
  0,
  datetime('now')
);