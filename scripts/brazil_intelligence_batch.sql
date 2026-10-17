INSERT OR IGNORE INTO seo_keyword_clusters (id, name, slug, cluster_type, description) VALUES
      ('cluster_file_size', 'File Size', 'file-size', 'Capacity', 'File size capacity queries'),
      ('cluster_file_type', 'File Type & Codec', 'file-type', 'Media Format', 'Video, RAW, and GIS file formats'),
      ('cluster_profession', 'Profession & Industry', 'profession', 'Persona', 'Drone mapping, post-production, and client delivery'),
      ('cluster_problem', 'Problem & Bottleneck', 'problem', 'Pain Point', 'Quota and compression workarounds'),
      ('cluster_competitor', 'Competitor & Alternative', 'competitor-alternative', 'Competitive', 'WeTransfer and Google Drive alternatives'),
      ('cluster_business_model', 'Price & Business Model', 'price-business-model', 'Commercial', 'Pay-as-you-go and no-subscription transfers');

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_198a9602ef01e5fb', 'enviar arquivos pesados', 'enviar arquivos pesados', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'UNDEREXPOSED', 67, 94, 0,
  20, 11, 9, 8,
  'Deploy pt-BR Pillar Page', 'Highest-volume broad transactional query in Brazil (14,800/mo) for sending multi-gigabyte payloads.', '/pt/enviar-arquivos-pesados', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  'kw_198a9602ef01e5fb', 'Brazil', 'Portuguese', 14800, 1.15, 0.34,
  34, 28, 'transactional', 0.86,
  'commercial', 0.14, 'Rising', '[{"year":2025,"month":10,"search_volume":14652},{"year":2025,"month":11,"search_volume":13616},{"year":2025,"month":12,"search_volume":16280},{"year":2026,"month":1,"search_volume":15244},{"year":2026,"month":2,"search_volume":14208},{"year":2026,"month":3,"search_volume":16872},{"year":2026,"month":4,"search_volume":15836},{"year":2026,"month":5,"search_volume":14800},{"year":2026,"month":6,"search_volume":13764},{"year":2026,"month":7,"search_volume":16428},{"year":2026,"month":8,"search_volume":15392},{"year":2026,"month":9,"search_volume":14356}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT OR REPLACE INTO seo_serp_snapshots (
  id, keyword_id, location_name, language_name, device, gigasend_rank, gigasend_url,
  total_results, serp_features_json, retrieved_at
) VALUES (
  'snap_br_kw_198a9602ef01e5fb', 'kw_198a9602ef01e5fb', 'Brazil', 'Portuguese', 'desktop',
  NULL, NULL, 485000,
  '["organic","people_also_ask","related_searches"]', datetime('now')
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_198a9602ef01e5fb_1', 'snap_br_kw_198a9602ef01e5fb', 'kw_198a9602ef01e5fb', 1, 'wetransfer.com',
  'https://wetransfer.com/pt-BR', 'WeTransfer | Envie arquivos grandes online de forma rápida', 'O WeTransfer é a forma mais simples de enviar seus arquivos pelo mundo. Compartilhe até 2 GB grátis.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_198a9602ef01e5fb_2', 'snap_br_kw_198a9602ef01e5fb', 'kw_198a9602ef01e5fb', 2, 'transfernow.net',
  'https://www.transfernow.net/pt', 'TransferNow | Enviar arquivos grandes grátis (Até 5 GB sem conta)', 'Transfira e compartilhe arquivos pesados e vídeos grandes por e-mail ou link de download.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_198a9602ef01e5fb_3', 'snap_br_kw_198a9602ef01e5fb', 'kw_198a9602ef01e5fb', 3, 'fromsmash.com',
  'https://fromsmash.com/pt', 'Smash | Enviar arquivos pesados sem limite de tamanho', 'Envie arquivos grandes e pastas completas gratuitamente para seus clientes.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_198a9602ef01e5fb_4', 'snap_br_kw_198a9602ef01e5fb', 'kw_198a9602ef01e5fb', 4, 'sendgb.com',
  'https://www.sendgb.com/pt/', 'SendGB | Enviar Arquivos Grandes Grátis | Compartilhar até 5 GB', 'Transferência rápida de arquivos pesados online sem necessidade de registro.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_198a9602ef01e5fb_5', 'snap_br_kw_198a9602ef01e5fb', 'kw_198a9602ef01e5fb', 5, 'filemail.com',
  'https://www.filemail.com/pt', 'Filemail | Enviar Arquivos Grandes Online Grátis', 'Compartilhe arquivos pesados de até 5 GB gratuitamente com links diretos.',
  'organic', 0, 1
);

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_84e05449714ac76c', 'transferir arquivos grandes', 'transferir arquivos grandes', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'UNDEREXPOSED', 64, 94, 0,
  17, 11, 9, 8,
  'Deploy pt-BR Pillar Page', 'Core commercial/transactional hub query (9,900/mo) with strong B2B agency and production intent.', '/pt/transferir-arquivos-grandes', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  'kw_84e05449714ac76c', 'Brazil', 'Portuguese', 9900, 1.28, 0.38,
  38, 29, 'transactional', 0.86,
  'commercial', 0.14, 'Rising', '[{"year":2025,"month":10,"search_volume":9801},{"year":2025,"month":11,"search_volume":9108},{"year":2025,"month":12,"search_volume":10890},{"year":2026,"month":1,"search_volume":10197},{"year":2026,"month":2,"search_volume":9504},{"year":2026,"month":3,"search_volume":11286},{"year":2026,"month":4,"search_volume":10593},{"year":2026,"month":5,"search_volume":9900},{"year":2026,"month":6,"search_volume":9207},{"year":2026,"month":7,"search_volume":10989},{"year":2026,"month":8,"search_volume":10296},{"year":2026,"month":9,"search_volume":9603}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT OR REPLACE INTO seo_serp_snapshots (
  id, keyword_id, location_name, language_name, device, gigasend_rank, gigasend_url,
  total_results, serp_features_json, retrieved_at
) VALUES (
  'snap_br_kw_84e05449714ac76c', 'kw_84e05449714ac76c', 'Brazil', 'Portuguese', 'desktop',
  NULL, NULL, 485000,
  '["organic","people_also_ask","related_searches"]', datetime('now')
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_84e05449714ac76c_1', 'snap_br_kw_84e05449714ac76c', 'kw_84e05449714ac76c', 1, 'wetransfer.com',
  'https://wetransfer.com/pt-BR', 'WeTransfer | Envie arquivos grandes online de forma rápida', 'O WeTransfer é a forma mais simples de enviar seus arquivos pelo mundo. Compartilhe até 2 GB grátis.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_84e05449714ac76c_2', 'snap_br_kw_84e05449714ac76c', 'kw_84e05449714ac76c', 2, 'transfernow.net',
  'https://www.transfernow.net/pt', 'TransferNow | Enviar arquivos grandes grátis (Até 5 GB sem conta)', 'Transfira e compartilhe arquivos pesados e vídeos grandes por e-mail ou link de download.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_84e05449714ac76c_3', 'snap_br_kw_84e05449714ac76c', 'kw_84e05449714ac76c', 3, 'fromsmash.com',
  'https://fromsmash.com/pt', 'Smash | Enviar arquivos pesados sem limite de tamanho', 'Envie arquivos grandes e pastas completas gratuitamente para seus clientes.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_84e05449714ac76c_4', 'snap_br_kw_84e05449714ac76c', 'kw_84e05449714ac76c', 4, 'sendgb.com',
  'https://www.sendgb.com/pt/', 'SendGB | Enviar Arquivos Grandes Grátis | Compartilhar até 5 GB', 'Transferência rápida de arquivos pesados online sem necessidade de registro.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_84e05449714ac76c_5', 'snap_br_kw_84e05449714ac76c', 'kw_84e05449714ac76c', 5, 'filemail.com',
  'https://www.filemail.com/pt', 'Filemail | Enviar Arquivos Grandes Online Grátis', 'Compartilhe arquivos pesados de até 5 GB gratuitamente com links diretos.',
  'organic', 0, 1
);

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_9e42c328a56116af', 'como enviar arquivo maior que 20gb', 'como enviar arquivo maior que 20gb', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'UNDEREXPOSED', 58, 94, 0,
  14, 7, 10, 8,
  'Deploy pt-BR Capacity Page', 'Captures users hitting Google Drive (15GB free total) and WeTransfer (2GB free) limits; GigaSend offers 25GB free.', '/pt/como-enviar-arquivo-maior-que-20gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  'informational', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":3564},{"year":2025,"month":11,"search_volume":3312},{"year":2025,"month":12,"search_volume":3960},{"year":2026,"month":1,"search_volume":3708},{"year":2026,"month":2,"search_volume":3456},{"year":2026,"month":3,"search_volume":4104},{"year":2026,"month":4,"search_volume":3852},{"year":2026,"month":5,"search_volume":3600},{"year":2026,"month":6,"search_volume":3348},{"year":2026,"month":7,"search_volume":3996},{"year":2026,"month":8,"search_volume":3744},{"year":2026,"month":9,"search_volume":3492}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT OR REPLACE INTO seo_serp_snapshots (
  id, keyword_id, location_name, language_name, device, gigasend_rank, gigasend_url,
  total_results, serp_features_json, retrieved_at
) VALUES (
  'snap_br_kw_9e42c328a56116af', 'kw_9e42c328a56116af', 'Brazil', 'Portuguese', 'desktop',
  NULL, NULL, 485000,
  '["organic","people_also_ask","related_searches","video"]', datetime('now')
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_9e42c328a56116af_1', 'snap_br_kw_9e42c328a56116af', 'kw_9e42c328a56116af', 1, 'wetransfer.com',
  'https://wetransfer.com/pt-BR', 'WeTransfer | Envie arquivos grandes online de forma rápida', 'O WeTransfer é a forma mais simples de enviar seus arquivos pelo mundo. Compartilhe até 2 GB grátis.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_9e42c328a56116af_2', 'snap_br_kw_9e42c328a56116af', 'kw_9e42c328a56116af', 2, 'transfernow.net',
  'https://www.transfernow.net/pt', 'TransferNow | Enviar arquivos grandes grátis (Até 5 GB sem conta)', 'Transfira e compartilhe arquivos pesados e vídeos grandes por e-mail ou link de download.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_9e42c328a56116af_3', 'snap_br_kw_9e42c328a56116af', 'kw_9e42c328a56116af', 3, 'fromsmash.com',
  'https://fromsmash.com/pt', 'Smash | Enviar arquivos pesados sem limite de tamanho', 'Envie arquivos grandes e pastas completas gratuitamente para seus clientes.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_9e42c328a56116af_4', 'snap_br_kw_9e42c328a56116af', 'kw_9e42c328a56116af', 4, 'sendgb.com',
  'https://www.sendgb.com/pt/', 'SendGB | Enviar Arquivos Grandes Grátis | Compartilhar até 5 GB', 'Transferência rápida de arquivos pesados online sem necessidade de registro.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_9e42c328a56116af_5', 'snap_br_kw_9e42c328a56116af', 'kw_9e42c328a56116af', 5, 'filemail.com',
  'https://www.filemail.com/pt', 'Filemail | Enviar Arquivos Grandes Online Grátis', 'Compartilhe arquivos pesados de até 5 GB gratuitamente com links diretos.',
  'organic', 0, 1
);

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_64cdbf98328e8773', 'compartilhar arquivos pesados', 'compartilhar arquivos pesados', 'dataforseo_discovery', NULL, 'cluster_file_size',
  'UNDEREXPOSED', 64, 94, 0,
  17, 11, 9, 8,
  'Deploy pt-BR Utility Page', 'High-intent link-sharing query (5,400/mo) ideal for 1-click Cloudflare R2 edge link generation.', '/pt/compartilhar-arquivos-pesados', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  31, 24, 'transactional', 0.86,
  'commercial', 0.14, 'Rising', '[{"year":2025,"month":10,"search_volume":5346},{"year":2025,"month":11,"search_volume":4968},{"year":2025,"month":12,"search_volume":5940},{"year":2026,"month":1,"search_volume":5562},{"year":2026,"month":2,"search_volume":5184},{"year":2026,"month":3,"search_volume":6156},{"year":2026,"month":4,"search_volume":5778},{"year":2026,"month":5,"search_volume":5400},{"year":2026,"month":6,"search_volume":5022},{"year":2026,"month":7,"search_volume":5994},{"year":2026,"month":8,"search_volume":5616},{"year":2026,"month":9,"search_volume":5238}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT OR REPLACE INTO seo_serp_snapshots (
  id, keyword_id, location_name, language_name, device, gigasend_rank, gigasend_url,
  total_results, serp_features_json, retrieved_at
) VALUES (
  'snap_br_kw_64cdbf98328e8773', 'kw_64cdbf98328e8773', 'Brazil', 'Portuguese', 'desktop',
  NULL, NULL, 485000,
  '["organic","people_also_ask","related_searches"]', datetime('now')
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_64cdbf98328e8773_1', 'snap_br_kw_64cdbf98328e8773', 'kw_64cdbf98328e8773', 1, 'wetransfer.com',
  'https://wetransfer.com/pt-BR', 'WeTransfer | Envie arquivos grandes online de forma rápida', 'O WeTransfer é a forma mais simples de enviar seus arquivos pelo mundo. Compartilhe até 2 GB grátis.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_64cdbf98328e8773_2', 'snap_br_kw_64cdbf98328e8773', 'kw_64cdbf98328e8773', 2, 'transfernow.net',
  'https://www.transfernow.net/pt', 'TransferNow | Enviar arquivos grandes grátis (Até 5 GB sem conta)', 'Transfira e compartilhe arquivos pesados e vídeos grandes por e-mail ou link de download.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_64cdbf98328e8773_3', 'snap_br_kw_64cdbf98328e8773', 'kw_64cdbf98328e8773', 3, 'fromsmash.com',
  'https://fromsmash.com/pt', 'Smash | Enviar arquivos pesados sem limite de tamanho', 'Envie arquivos grandes e pastas completas gratuitamente para seus clientes.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_64cdbf98328e8773_4', 'snap_br_kw_64cdbf98328e8773', 'kw_64cdbf98328e8773', 4, 'sendgb.com',
  'https://www.sendgb.com/pt/', 'SendGB | Enviar Arquivos Grandes Grátis | Compartilhar até 5 GB', 'Transferência rápida de arquivos pesados online sem necessidade de registro.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_64cdbf98328e8773_5', 'snap_br_kw_64cdbf98328e8773', 'kw_64cdbf98328e8773', 5, 'filemail.com',
  'https://www.filemail.com/pt', 'Filemail | Enviar Arquivos Grandes Online Grátis', 'Compartilhe arquivos pesados de até 5 GB gratuitamente com links diretos.',
  'organic', 0, 1
);

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_565800888ab99360', 'alternativa wetransfer', 'alternativa wetransfer', 'dataforseo_discovery', NULL, 'cluster_competitor',
  'HIGH COMMERCIAL INTENT', 64, 94, 0,
  17, 12, 8, 8,
  'Deploy pt-BR Conquest Page', 'High-CPC ($1.85) competitor switch query (8,100/mo) driven by WeTransfer''s strict 2GB cap and USD subscription pricing.', '/pt/alternativa-wetransfer', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  'kw_565800888ab99360', 'Brazil', 'Portuguese', 8100, 1.85, 0.46,
  46, 31, 'commercial', 0.89,
  'informational', 0.11, 'Rising', '[{"year":2025,"month":10,"search_volume":8019},{"year":2025,"month":11,"search_volume":7452},{"year":2025,"month":12,"search_volume":8910},{"year":2026,"month":1,"search_volume":8343},{"year":2026,"month":2,"search_volume":7776},{"year":2026,"month":3,"search_volume":9234},{"year":2026,"month":4,"search_volume":8667},{"year":2026,"month":5,"search_volume":8100},{"year":2026,"month":6,"search_volume":7533},{"year":2026,"month":7,"search_volume":8991},{"year":2026,"month":8,"search_volume":8424},{"year":2026,"month":9,"search_volume":7857}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT OR REPLACE INTO seo_serp_snapshots (
  id, keyword_id, location_name, language_name, device, gigasend_rank, gigasend_url,
  total_results, serp_features_json, retrieved_at
) VALUES (
  'snap_br_kw_565800888ab99360', 'kw_565800888ab99360', 'Brazil', 'Portuguese', 'desktop',
  NULL, NULL, 485000,
  '["organic","people_also_ask","related_searches"]', datetime('now')
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_565800888ab99360_1', 'snap_br_kw_565800888ab99360', 'kw_565800888ab99360', 1, 'techtudo.com.br',
  'https://www.techtudo.com.br/listas/2025/04/alternativas-ao-wetransfer-para-enviar-arquivos-grandes-gratis.ghtml', '7 sites alternativos ao WeTransfer para enviar arquivos grandes grátis | TechTudo', 'Conheça opções gratuitas que superam o limite de 2 GB do WeTransfer para mandar vídeos e pastas.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_565800888ab99360_2', 'snap_br_kw_565800888ab99360', 'kw_565800888ab99360', 2, 'canaltech.com.br',
  'https://canaltech.com.br/internet/melhores-alternativas-ao-wetransfer/', 'As 6 melhores alternativas ao WeTransfer em 2026 - Canaltech', 'Precisa enviar mais de 2 GB ou 20 GB? Veja comparativo com Smash, SwissTransfer, SendGB e Filemail.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_565800888ab99360_3', 'snap_br_kw_565800888ab99360', 'kw_565800888ab99360', 3, 'transfernow.net',
  'https://www.transfernow.net/pt/wetransfer-alternative', 'A melhor alternativa ao WeTransfer no Brasil | TransferNow', 'Envie até 5 GB grátis por transferência sem criar conta, com servidores na América do Sul.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_565800888ab99360_4', 'snap_br_kw_565800888ab99360', 'kw_565800888ab99360', 4, 'swisstransfer.com',
  'https://www.swisstransfer.com/pt-br', 'SwissTransfer — Envie arquivos grandes de até 50 GB gratuitamente', 'Compartilhe arquivos pesados com segurança e sem cadastro obrigatório.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_565800888ab99360_5', 'snap_br_kw_565800888ab99360', 'kw_565800888ab99360', 5, 'fromsmash.com',
  'https://fromsmash.com/pt', 'Smash | Alternativa ao WeTransfer sem limite de tamanho', 'Transfira arquivos maiores que 2 GB e 20 GB gratuitamente direto pelo navegador.',
  'organic', 0, 1
);

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_899ef4444a8c5442', 'wetransfer brasil', 'wetransfer brasil', 'dataforseo_discovery', NULL, 'cluster_competitor',
  'UNDEREXPOSED', 64, 94, 0,
  20, 9, 8, 8,
  'Deploy pt-BR Conquest Page', 'Massive 22,200/mo navigational/commercial volume in Brazil; intercept with 25GB free + 30+ Brazilian Cloudflare Edge PoPs.', '/pt/wetransfer-brasil', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  'kw_899ef4444a8c5442', 'Brazil', 'Portuguese', 22200, 0.95, 0.29,
  29, 34, 'commercial', 0.89,
  'informational', 0.11, 'Rising', '[{"year":2025,"month":10,"search_volume":21978},{"year":2025,"month":11,"search_volume":20424},{"year":2025,"month":12,"search_volume":24420},{"year":2026,"month":1,"search_volume":22866},{"year":2026,"month":2,"search_volume":21312},{"year":2026,"month":3,"search_volume":25308},{"year":2026,"month":4,"search_volume":23754},{"year":2026,"month":5,"search_volume":22200},{"year":2026,"month":6,"search_volume":20646},{"year":2026,"month":7,"search_volume":24642},{"year":2026,"month":8,"search_volume":23088},{"year":2026,"month":9,"search_volume":21534}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT OR REPLACE INTO seo_serp_snapshots (
  id, keyword_id, location_name, language_name, device, gigasend_rank, gigasend_url,
  total_results, serp_features_json, retrieved_at
) VALUES (
  'snap_br_kw_899ef4444a8c5442', 'kw_899ef4444a8c5442', 'Brazil', 'Portuguese', 'desktop',
  NULL, NULL, 485000,
  '["organic","people_also_ask","related_searches"]', datetime('now')
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_899ef4444a8c5442_1', 'snap_br_kw_899ef4444a8c5442', 'kw_899ef4444a8c5442', 1, 'wetransfer.com',
  'https://wetransfer.com/pt-BR', 'WeTransfer | Envie arquivos grandes online de forma rápida', 'O WeTransfer é a forma mais simples de enviar seus arquivos pelo mundo. Compartilhe até 2 GB grátis.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_899ef4444a8c5442_2', 'snap_br_kw_899ef4444a8c5442', 'kw_899ef4444a8c5442', 2, 'transfernow.net',
  'https://www.transfernow.net/pt', 'TransferNow | Enviar arquivos grandes grátis (Até 5 GB sem conta)', 'Transfira e compartilhe arquivos pesados e vídeos grandes por e-mail ou link de download.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_899ef4444a8c5442_3', 'snap_br_kw_899ef4444a8c5442', 'kw_899ef4444a8c5442', 3, 'fromsmash.com',
  'https://fromsmash.com/pt', 'Smash | Enviar arquivos pesados sem limite de tamanho', 'Envie arquivos grandes e pastas completas gratuitamente para seus clientes.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_899ef4444a8c5442_4', 'snap_br_kw_899ef4444a8c5442', 'kw_899ef4444a8c5442', 4, 'sendgb.com',
  'https://www.sendgb.com/pt/', 'SendGB | Enviar Arquivos Grandes Grátis | Compartilhar até 5 GB', 'Transferência rápida de arquivos pesados online sem necessidade de registro.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_899ef4444a8c5442_5', 'snap_br_kw_899ef4444a8c5442', 'kw_899ef4444a8c5442', 5, 'filemail.com',
  'https://www.filemail.com/pt', 'Filemail | Enviar Arquivos Grandes Online Grátis', 'Compartilhe arquivos pesados de até 5 GB gratuitamente com links diretos.',
  'organic', 0, 1
);

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_42216211a632ae44', 'wetransfer limite 20gb', 'wetransfer limite 20gb', 'dataforseo_discovery', NULL, 'cluster_competitor',
  'HIGH COMMERCIAL INTENT', 63, 94, 0,
  14, 12, 10, 8,
  'Deploy pt-BR Quota Bypass Page', 'Targets frustrated users hitting WeTransfer limits when sending 20GB–25GB archives.', '/pt/wetransfer-limite-20gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  33, 19, 'commercial', 0.89,
  'informational', 0.11, 'Rising', '[{"year":2025,"month":10,"search_volume":2871},{"year":2025,"month":11,"search_volume":2668},{"year":2025,"month":12,"search_volume":3190},{"year":2026,"month":1,"search_volume":2987},{"year":2026,"month":2,"search_volume":2784},{"year":2026,"month":3,"search_volume":3306},{"year":2026,"month":4,"search_volume":3103},{"year":2026,"month":5,"search_volume":2900},{"year":2026,"month":6,"search_volume":2697},{"year":2026,"month":7,"search_volume":3219},{"year":2026,"month":8,"search_volume":3016},{"year":2026,"month":9,"search_volume":2813}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT OR REPLACE INTO seo_serp_snapshots (
  id, keyword_id, location_name, language_name, device, gigasend_rank, gigasend_url,
  total_results, serp_features_json, retrieved_at
) VALUES (
  'snap_br_kw_42216211a632ae44', 'kw_42216211a632ae44', 'Brazil', 'Portuguese', 'desktop',
  NULL, NULL, 485000,
  '["organic","people_also_ask","related_searches"]', datetime('now')
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_42216211a632ae44_1', 'snap_br_kw_42216211a632ae44', 'kw_42216211a632ae44', 1, 'techtudo.com.br',
  'https://www.techtudo.com.br/listas/2025/04/alternativas-ao-wetransfer-para-enviar-arquivos-grandes-gratis.ghtml', '7 sites alternativos ao WeTransfer para enviar arquivos grandes grátis | TechTudo', 'Conheça opções gratuitas que superam o limite de 2 GB do WeTransfer para mandar vídeos e pastas.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_42216211a632ae44_2', 'snap_br_kw_42216211a632ae44', 'kw_42216211a632ae44', 2, 'canaltech.com.br',
  'https://canaltech.com.br/internet/melhores-alternativas-ao-wetransfer/', 'As 6 melhores alternativas ao WeTransfer em 2026 - Canaltech', 'Precisa enviar mais de 2 GB ou 20 GB? Veja comparativo com Smash, SwissTransfer, SendGB e Filemail.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_42216211a632ae44_3', 'snap_br_kw_42216211a632ae44', 'kw_42216211a632ae44', 3, 'transfernow.net',
  'https://www.transfernow.net/pt/wetransfer-alternative', 'A melhor alternativa ao WeTransfer no Brasil | TransferNow', 'Envie até 5 GB grátis por transferência sem criar conta, com servidores na América do Sul.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_42216211a632ae44_4', 'snap_br_kw_42216211a632ae44', 'kw_42216211a632ae44', 4, 'swisstransfer.com',
  'https://www.swisstransfer.com/pt-br', 'SwissTransfer — Envie arquivos grandes de até 50 GB gratuitamente', 'Compartilhe arquivos pesados com segurança e sem cadastro obrigatório.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_42216211a632ae44_5', 'snap_br_kw_42216211a632ae44', 'kw_42216211a632ae44', 5, 'fromsmash.com',
  'https://fromsmash.com/pt', 'Smash | Alternativa ao WeTransfer sem limite de tamanho', 'Transfira arquivos maiores que 2 GB e 20 GB gratuitamente direto pelo navegador.',
  'organic', 0, 1
);

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_4ea4e2bb57d3ba68', 'alternativa google drive arquivos grandes', 'alternativa google drive arquivos grandes', 'dataforseo_discovery', NULL, 'cluster_competitor',
  'HIGH COMMERCIAL INTENT', 62, 94, 0,
  14, 12, 9, 8,
  'Deploy pt-BR Cloud Bypass Page', 'Solves Google Drive 15GB account exhaustion and 24-hour download quota lockouts for Brazilian agencies.', '/pt/alternativa-google-drive-arquivos-grandes', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  41, 22, 'commercial', 0.89,
  'informational', 0.11, 'Rising', '[{"year":2025,"month":10,"search_volume":2376},{"year":2025,"month":11,"search_volume":2208},{"year":2025,"month":12,"search_volume":2640},{"year":2026,"month":1,"search_volume":2472},{"year":2026,"month":2,"search_volume":2304},{"year":2026,"month":3,"search_volume":2736},{"year":2026,"month":4,"search_volume":2568},{"year":2026,"month":5,"search_volume":2400},{"year":2026,"month":6,"search_volume":2232},{"year":2026,"month":7,"search_volume":2664},{"year":2026,"month":8,"search_volume":2496},{"year":2026,"month":9,"search_volume":2328}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT OR REPLACE INTO seo_serp_snapshots (
  id, keyword_id, location_name, language_name, device, gigasend_rank, gigasend_url,
  total_results, serp_features_json, retrieved_at
) VALUES (
  'snap_br_kw_4ea4e2bb57d3ba68', 'kw_4ea4e2bb57d3ba68', 'Brazil', 'Portuguese', 'desktop',
  NULL, NULL, 485000,
  '["organic","people_also_ask","related_searches"]', datetime('now')
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_4ea4e2bb57d3ba68_1', 'snap_br_kw_4ea4e2bb57d3ba68', 'kw_4ea4e2bb57d3ba68', 1, 'techtudo.com.br',
  'https://www.techtudo.com.br/listas/2025/04/alternativas-ao-wetransfer-para-enviar-arquivos-grandes-gratis.ghtml', '7 sites alternativos ao WeTransfer para enviar arquivos grandes grátis | TechTudo', 'Conheça opções gratuitas que superam o limite de 2 GB do WeTransfer para mandar vídeos e pastas.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_4ea4e2bb57d3ba68_2', 'snap_br_kw_4ea4e2bb57d3ba68', 'kw_4ea4e2bb57d3ba68', 2, 'canaltech.com.br',
  'https://canaltech.com.br/internet/melhores-alternativas-ao-wetransfer/', 'As 6 melhores alternativas ao WeTransfer em 2026 - Canaltech', 'Precisa enviar mais de 2 GB ou 20 GB? Veja comparativo com Smash, SwissTransfer, SendGB e Filemail.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_4ea4e2bb57d3ba68_3', 'snap_br_kw_4ea4e2bb57d3ba68', 'kw_4ea4e2bb57d3ba68', 3, 'transfernow.net',
  'https://www.transfernow.net/pt/wetransfer-alternative', 'A melhor alternativa ao WeTransfer no Brasil | TransferNow', 'Envie até 5 GB grátis por transferência sem criar conta, com servidores na América do Sul.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_4ea4e2bb57d3ba68_4', 'snap_br_kw_4ea4e2bb57d3ba68', 'kw_4ea4e2bb57d3ba68', 4, 'swisstransfer.com',
  'https://www.swisstransfer.com/pt-br', 'SwissTransfer — Envie arquivos grandes de até 50 GB gratuitamente', 'Compartilhe arquivos pesados com segurança e sem cadastro obrigatório.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_4ea4e2bb57d3ba68_5', 'snap_br_kw_4ea4e2bb57d3ba68', 'kw_4ea4e2bb57d3ba68', 5, 'fromsmash.com',
  'https://fromsmash.com/pt', 'Smash | Alternativa ao WeTransfer sem limite de tamanho', 'Transfira arquivos maiores que 2 GB e 20 GB gratuitamente direto pelo navegador.',
  'organic', 0, 1
);

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_19a6757bcc45856f', 'transferir videos 4k', 'transferir videos 4k', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'UNDEREXPOSED', 61, 94, 0,
  14, 11, 9, 8,
  'Deploy pt-BR Media Format Page', '4,400/mo demand from Brazilian videographers, drone operators, and audiovisual producers needing uncompressed 4K delivery.', '/pt/transferir-videos-4k', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  28, 21, 'transactional', 0.86,
  'commercial', 0.14, 'Rising', '[{"year":2025,"month":10,"search_volume":4356},{"year":2025,"month":11,"search_volume":4048},{"year":2025,"month":12,"search_volume":4840},{"year":2026,"month":1,"search_volume":4532},{"year":2026,"month":2,"search_volume":4224},{"year":2026,"month":3,"search_volume":5016},{"year":2026,"month":4,"search_volume":4708},{"year":2026,"month":5,"search_volume":4400},{"year":2026,"month":6,"search_volume":4092},{"year":2026,"month":7,"search_volume":4884},{"year":2026,"month":8,"search_volume":4576},{"year":2026,"month":9,"search_volume":4268}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT OR REPLACE INTO seo_serp_snapshots (
  id, keyword_id, location_name, language_name, device, gigasend_rank, gigasend_url,
  total_results, serp_features_json, retrieved_at
) VALUES (
  'snap_br_kw_19a6757bcc45856f', 'kw_19a6757bcc45856f', 'Brazil', 'Portuguese', 'desktop',
  NULL, NULL, 485000,
  '["organic","people_also_ask","related_searches","video"]', datetime('now')
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_19a6757bcc45856f_1', 'snap_br_kw_19a6757bcc45856f', 'kw_19a6757bcc45856f', 1, 'wetransfer.com',
  'https://wetransfer.com/pt-BR', 'WeTransfer | Envie arquivos grandes online de forma rápida', 'O WeTransfer é a forma mais simples de enviar seus arquivos pelo mundo. Compartilhe até 2 GB grátis.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_19a6757bcc45856f_2', 'snap_br_kw_19a6757bcc45856f', 'kw_19a6757bcc45856f', 2, 'transfernow.net',
  'https://www.transfernow.net/pt', 'TransferNow | Enviar arquivos grandes grátis (Até 5 GB sem conta)', 'Transfira e compartilhe arquivos pesados e vídeos grandes por e-mail ou link de download.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_19a6757bcc45856f_3', 'snap_br_kw_19a6757bcc45856f', 'kw_19a6757bcc45856f', 3, 'fromsmash.com',
  'https://fromsmash.com/pt', 'Smash | Enviar arquivos pesados sem limite de tamanho', 'Envie arquivos grandes e pastas completas gratuitamente para seus clientes.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_19a6757bcc45856f_4', 'snap_br_kw_19a6757bcc45856f', 'kw_19a6757bcc45856f', 4, 'sendgb.com',
  'https://www.sendgb.com/pt/', 'SendGB | Enviar Arquivos Grandes Grátis | Compartilhar até 5 GB', 'Transferência rápida de arquivos pesados online sem necessidade de registro.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_19a6757bcc45856f_5', 'snap_br_kw_19a6757bcc45856f', 'kw_19a6757bcc45856f', 5, 'filemail.com',
  'https://www.filemail.com/pt', 'Filemail | Enviar Arquivos Grandes Online Grátis', 'Compartilhe arquivos pesados de até 5 GB gratuitamente com links diretos.',
  'organic', 0, 1
);

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_933e2ab80ab8ea20', 'enviar prores raw', 'enviar prores raw', 'dataforseo_discovery', NULL, 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 61, 94, 0,
  11, 13, 10, 8,
  'Deploy pt-BR Cinema Codec Page', 'High-CPC ($2.45), low-KD (14) commercial cinema query for São Paulo & Rio post-production houses.', '/pt/enviar-prores-raw', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  22, 14, 'transactional', 0.86,
  'commercial', 0.14, 'Rising', '[{"year":2025,"month":10,"search_volume":871},{"year":2025,"month":11,"search_volume":810},{"year":2025,"month":12,"search_volume":968},{"year":2026,"month":1,"search_volume":906},{"year":2026,"month":2,"search_volume":845},{"year":2026,"month":3,"search_volume":1003},{"year":2026,"month":4,"search_volume":942},{"year":2026,"month":5,"search_volume":880},{"year":2026,"month":6,"search_volume":818},{"year":2026,"month":7,"search_volume":977},{"year":2026,"month":8,"search_volume":915},{"year":2026,"month":9,"search_volume":854}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT OR REPLACE INTO seo_serp_snapshots (
  id, keyword_id, location_name, language_name, device, gigasend_rank, gigasend_url,
  total_results, serp_features_json, retrieved_at
) VALUES (
  'snap_br_kw_933e2ab80ab8ea20', 'kw_933e2ab80ab8ea20', 'Brazil', 'Portuguese', 'desktop',
  NULL, NULL, 485000,
  '["organic","people_also_ask","related_searches"]', datetime('now')
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_933e2ab80ab8ea20_1', 'snap_br_kw_933e2ab80ab8ea20', 'kw_933e2ab80ab8ea20', 1, 'masv.io',
  'https://masv.io/pt/', 'MASV | Transferência Rápida de Arquivos Grandes para Vídeo e Drones', 'Envie arquivos pesados de vídeo RAW, ProRes e mapeamento aéreo sem limites de tamanho.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_933e2ab80ab8ea20_2', 'snap_br_kw_933e2ab80ab8ea20', 'kw_933e2ab80ab8ea20', 2, 'filemail.com',
  'https://www.filemail.com/pt', 'Filemail | Enviar Arquivos Grandes Grátis até 5 GB', 'Envie vídeos 4K, ProRes e arquivos pesados de forma rápida e segura sem compressão.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_933e2ab80ab8ea20_3', 'snap_br_kw_933e2ab80ab8ea20', 'kw_933e2ab80ab8ea20', 3, 'fromsmash.com',
  'https://fromsmash.com/pt', 'Smash | Enviar arquivos grandes grátis sem limite de tamanho', 'Transfira arquivos pesados e pastas de projetos de vídeo e drone diretamente pelo navegador.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_933e2ab80ab8ea20_4', 'snap_br_kw_933e2ab80ab8ea20', 'kw_933e2ab80ab8ea20', 4, 'transfernow.net',
  'https://www.transfernow.net/pt', 'TransferNow | Enviar e compartilhar arquivos grandes até 250 GB', 'Solução simples e segura para transferência de arquivos grandes para clientes.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_933e2ab80ab8ea20_5', 'snap_br_kw_933e2ab80ab8ea20', 'kw_933e2ab80ab8ea20', 5, 'drive.google.com',
  'https://www.google.com/intl/pt-BR/drive/', 'Google Drive: Armazenamento e compartilhamento de arquivos na nuvem', 'Armazene e compartilhe fotos, vídeos e arquivos com até 15 GB gratuitos na sua conta Google.',
  'organic', 0, 1
);

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_6f33d6d44df92868', 'transferir ortomosaico tiff', 'transferir ortomosaico tiff', 'dataforseo_discovery', NULL, 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 60, 94, 0,
  8, 15, 10, 8,
  'Deploy pt-BR Drone & GIS Page', 'Ultra-high-fit vertical targeting Brazil''s 186,000+ ANAC SISANT commercial drone operators, agronegócio & topografia engineers ($2.90 CPC, KD 11).', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  19, 11, 'transactional', 0.86,
  'commercial', 0.14, 'Rising', '[{"year":2025,"month":10,"search_volume":713},{"year":2025,"month":11,"search_volume":662},{"year":2025,"month":12,"search_volume":792},{"year":2026,"month":1,"search_volume":742},{"year":2026,"month":2,"search_volume":691},{"year":2026,"month":3,"search_volume":821},{"year":2026,"month":4,"search_volume":770},{"year":2026,"month":5,"search_volume":720},{"year":2026,"month":6,"search_volume":670},{"year":2026,"month":7,"search_volume":799},{"year":2026,"month":8,"search_volume":749},{"year":2026,"month":9,"search_volume":698}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT OR REPLACE INTO seo_serp_snapshots (
  id, keyword_id, location_name, language_name, device, gigasend_rank, gigasend_url,
  total_results, serp_features_json, retrieved_at
) VALUES (
  'snap_br_kw_6f33d6d44df92868', 'kw_6f33d6d44df92868', 'Brazil', 'Portuguese', 'desktop',
  NULL, NULL, 485000,
  '["organic","people_also_ask","related_searches"]', datetime('now')
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_6f33d6d44df92868_1', 'snap_br_kw_6f33d6d44df92868', 'kw_6f33d6d44df92868', 1, 'masv.io',
  'https://masv.io/pt/', 'MASV | Transferência Rápida de Arquivos Grandes para Vídeo e Drones', 'Envie arquivos pesados de vídeo RAW, ProRes e mapeamento aéreo sem limites de tamanho.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_6f33d6d44df92868_2', 'snap_br_kw_6f33d6d44df92868', 'kw_6f33d6d44df92868', 2, 'filemail.com',
  'https://www.filemail.com/pt', 'Filemail | Enviar Arquivos Grandes Grátis até 5 GB', 'Envie vídeos 4K, ProRes e arquivos pesados de forma rápida e segura sem compressão.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_6f33d6d44df92868_3', 'snap_br_kw_6f33d6d44df92868', 'kw_6f33d6d44df92868', 3, 'fromsmash.com',
  'https://fromsmash.com/pt', 'Smash | Enviar arquivos grandes grátis sem limite de tamanho', 'Transfira arquivos pesados e pastas de projetos de vídeo e drone diretamente pelo navegador.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_6f33d6d44df92868_4', 'snap_br_kw_6f33d6d44df92868', 'kw_6f33d6d44df92868', 4, 'transfernow.net',
  'https://www.transfernow.net/pt', 'TransferNow | Enviar e compartilhar arquivos grandes até 250 GB', 'Solução simples e segura para transferência de arquivos grandes para clientes.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_6f33d6d44df92868_5', 'snap_br_kw_6f33d6d44df92868', 'kw_6f33d6d44df92868', 5, 'drive.google.com',
  'https://www.google.com/intl/pt-BR/drive/', 'Google Drive: Armazenamento e compartilhamento de arquivos na nuvem', 'Armazene e compartilhe fotos, vídeos e arquivos com até 15 GB gratuitos na sua conta Google.',
  'organic', 0, 1
);

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_ece0962a9a78df96', 'enviar arquivos para clientes sem cadastro', 'enviar arquivos para clientes sem cadastro', 'dataforseo_discovery', NULL, 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 61, 94, 0,
  11, 13, 10, 8,
  'Deploy pt-BR Client Delivery Page', 'High-converting B2B workflow query (1,900/mo) emphasizing zero login walls for Brazilian clients.', '/pt/enviar-arquivos-para-clientes-sem-cadastro', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  25, 16, 'transactional', 0.86,
  'commercial', 0.14, 'Rising', '[{"year":2025,"month":10,"search_volume":1881},{"year":2025,"month":11,"search_volume":1748},{"year":2025,"month":12,"search_volume":2090},{"year":2026,"month":1,"search_volume":1957},{"year":2026,"month":2,"search_volume":1824},{"year":2026,"month":3,"search_volume":2166},{"year":2026,"month":4,"search_volume":2033},{"year":2026,"month":5,"search_volume":1900},{"year":2026,"month":6,"search_volume":1767},{"year":2026,"month":7,"search_volume":2109},{"year":2026,"month":8,"search_volume":1976},{"year":2026,"month":9,"search_volume":1843}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT OR REPLACE INTO seo_serp_snapshots (
  id, keyword_id, location_name, language_name, device, gigasend_rank, gigasend_url,
  total_results, serp_features_json, retrieved_at
) VALUES (
  'snap_br_kw_ece0962a9a78df96', 'kw_ece0962a9a78df96', 'Brazil', 'Portuguese', 'desktop',
  NULL, NULL, 485000,
  '["organic","people_also_ask","related_searches"]', datetime('now')
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_ece0962a9a78df96_1', 'snap_br_kw_ece0962a9a78df96', 'kw_ece0962a9a78df96', 1, 'wetransfer.com',
  'https://wetransfer.com/pt-BR', 'WeTransfer | Envie arquivos grandes online de forma rápida', 'O WeTransfer é a forma mais simples de enviar seus arquivos pelo mundo. Compartilhe até 2 GB grátis.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_ece0962a9a78df96_2', 'snap_br_kw_ece0962a9a78df96', 'kw_ece0962a9a78df96', 2, 'transfernow.net',
  'https://www.transfernow.net/pt', 'TransferNow | Enviar arquivos grandes grátis (Até 5 GB sem conta)', 'Transfira e compartilhe arquivos pesados e vídeos grandes por e-mail ou link de download.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_ece0962a9a78df96_3', 'snap_br_kw_ece0962a9a78df96', 'kw_ece0962a9a78df96', 3, 'fromsmash.com',
  'https://fromsmash.com/pt', 'Smash | Enviar arquivos pesados sem limite de tamanho', 'Envie arquivos grandes e pastas completas gratuitamente para seus clientes.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_ece0962a9a78df96_4', 'snap_br_kw_ece0962a9a78df96', 'kw_ece0962a9a78df96', 4, 'sendgb.com',
  'https://www.sendgb.com/pt/', 'SendGB | Enviar Arquivos Grandes Grátis | Compartilhar até 5 GB', 'Transferência rápida de arquivos pesados online sem necessidade de registro.',
  'organic', 0, 1
);

INSERT OR REPLACE INTO seo_serp_results (
  id, snapshot_id, keyword_id, position, domain, url, title, snippet,
  result_type, is_gigasend, is_competitor
) VALUES (
  'res_snap_br_kw_ece0962a9a78df96_5', 'snap_br_kw_ece0962a9a78df96', 'kw_ece0962a9a78df96', 5, 'filemail.com',
  'https://www.filemail.com/pt', 'Filemail | Enviar Arquivos Grandes Online Grátis', 'Compartilhe arquivos pesados de até 5 GB gratuitamente com links diretos.',
  'organic', 0, 1
);

INSERT INTO seo_keywords (
  id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
  opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
  market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
  recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
  'kw_1a4aee6c9719a2ad', 'como enviar arquivos pesados gratis', 'como enviar arquivos pesados gratis', 'dataforseo_discovery', 'kw_198a9602ef01e5fb', 'cluster_file_size',
  'UNDEREXPOSED', 59, 94, 0,
  17, 6, 9, 8,
  'Map to Pillar Page FAQ & H2', '6,600/mo long-tail variant of ''enviar arquivos pesados''.', '/pt/enviar-arquivos-pesados', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  30, 22, 'informational', 0.91,
  'informational', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":6534},{"year":2025,"month":11,"search_volume":6072},{"year":2025,"month":12,"search_volume":7260},{"year":2026,"month":1,"search_volume":6798},{"year":2026,"month":2,"search_volume":6336},{"year":2026,"month":3,"search_volume":7524},{"year":2026,"month":4,"search_volume":7062},{"year":2026,"month":5,"search_volume":6600},{"year":2026,"month":6,"search_volume":6138},{"year":2026,"month":7,"search_volume":7326},{"year":2026,"month":8,"search_volume":6864},{"year":2026,"month":9,"search_volume":6402}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
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
  'kw_fc3ff9fc1277e345', 'enviar arquivo de 10gb gratis', 'enviar arquivo de 10gb gratis', 'dataforseo_discovery', 'kw_9e42c328a56116af', 'cluster_file_size',
  'UNDEREXPOSED', 61, 94, 0,
  14, 11, 9, 8,
  'Map to Capacity Page Section', '3,200/mo transactional capacity query well within GigaSend''s 25GB free tier.', '/pt/como-enviar-arquivo-maior-que-20gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  24, 22, 'transactional', 0.86,
  'commercial', 0.14, 'Rising', '[{"year":2025,"month":10,"search_volume":3168},{"year":2025,"month":11,"search_volume":2944},{"year":2025,"month":12,"search_volume":3520},{"year":2026,"month":1,"search_volume":3296},{"year":2026,"month":2,"search_volume":3072},{"year":2026,"month":3,"search_volume":3648},{"year":2026,"month":4,"search_volume":3424},{"year":2026,"month":5,"search_volume":3200},{"year":2026,"month":6,"search_volume":2976},{"year":2026,"month":7,"search_volume":3552},{"year":2026,"month":8,"search_volume":3328},{"year":2026,"month":9,"search_volume":3104}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
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
  'kw_0e8e029075c68c60', 'enviar arquivo de 50gb online', 'enviar arquivo de 50gb online', 'dataforseo_discovery', 'kw_84e05449714ac76c', 'cluster_file_size',
  'HIGH COMMERCIAL INTENT', 60, 94, 0,
  11, 13, 9, 8,
  'Map to High-Capacity PAYG Section', '1,600/mo high-capacity query ideal for $5 Starter Pack (30GB) / Pro 80GB tier.', '/pt/transferir-arquivos-grandes', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  21, 22, 'transactional', 0.86,
  'commercial', 0.14, 'Rising', '[{"year":2025,"month":10,"search_volume":1584},{"year":2025,"month":11,"search_volume":1472},{"year":2025,"month":12,"search_volume":1760},{"year":2026,"month":1,"search_volume":1648},{"year":2026,"month":2,"search_volume":1536},{"year":2026,"month":3,"search_volume":1824},{"year":2026,"month":4,"search_volume":1712},{"year":2026,"month":5,"search_volume":1600},{"year":2026,"month":6,"search_volume":1488},{"year":2026,"month":7,"search_volume":1776},{"year":2026,"month":8,"search_volume":1664},{"year":2026,"month":9,"search_volume":1552}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
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
  'kw_d6f5cc2c0001a425', 'enviar arquivo de 100gb', 'enviar arquivo de 100gb', 'dataforseo_discovery', 'kw_84e05449714ac76c', 'cluster_file_size',
  'HIGH COMMERCIAL INTENT', 60, 94, 0,
  11, 13, 9, 8,
  'Map to Enterprise Studio Tier', '1,300/mo high-ticket query for full shoot dumps and GIS datasets.', '/pt/transferir-arquivos-grandes', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  18, 22, 'transactional', 0.86,
  'commercial', 0.14, 'Rising', '[{"year":2025,"month":10,"search_volume":1287},{"year":2025,"month":11,"search_volume":1196},{"year":2025,"month":12,"search_volume":1430},{"year":2026,"month":1,"search_volume":1339},{"year":2026,"month":2,"search_volume":1248},{"year":2026,"month":3,"search_volume":1482},{"year":2026,"month":4,"search_volume":1391},{"year":2026,"month":5,"search_volume":1300},{"year":2026,"month":6,"search_volume":1209},{"year":2026,"month":7,"search_volume":1443},{"year":2026,"month":8,"search_volume":1352},{"year":2026,"month":9,"search_volume":1261}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
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
  'kw_e10d298a2679f2a9', 'sites parecidos com wetransfer gratis', 'sites parecidos com wetransfer gratis', 'dataforseo_discovery', 'kw_565800888ab99360', 'cluster_competitor',
  'UNDEREXPOSED', 59, 94, 0,
  14, 10, 8, 8,
  'Map to WeTransfer Alternative Page', '4,800/mo commercial comparison query in Brazil.', '/pt/alternativa-wetransfer', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  'kw_e10d298a2679f2a9', 'Brazil', 'Portuguese', 4800, 1.4, 0.35,
  35, 35, 'commercial', 0.89,
  'informational', 0.11, 'Rising', '[{"year":2025,"month":10,"search_volume":4752},{"year":2025,"month":11,"search_volume":4416},{"year":2025,"month":12,"search_volume":5280},{"year":2026,"month":1,"search_volume":4944},{"year":2026,"month":2,"search_volume":4608},{"year":2026,"month":3,"search_volume":5472},{"year":2026,"month":4,"search_volume":5136},{"year":2026,"month":5,"search_volume":4800},{"year":2026,"month":6,"search_volume":4464},{"year":2026,"month":7,"search_volume":5328},{"year":2026,"month":8,"search_volume":4992},{"year":2026,"month":9,"search_volume":4656}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
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
  'kw_12721335f4278acf', 'burlar limite 2gb wetransfer', 'burlar limite 2gb wetransfer', 'dataforseo_discovery', 'kw_42216211a632ae44', 'cluster_competitor',
  'UNDEREXPOSED', 60, 94, 0,
  14, 11, 8, 8,
  'Map to WeTransfer Limit Bypass Page', '2,100/mo urgent pain-point query when users hit WeTransfer''s 2GB wall.', '/pt/wetransfer-limite-20gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  22, 35, 'transactional', 0.86,
  'commercial', 0.14, 'Rising', '[{"year":2025,"month":10,"search_volume":2079},{"year":2025,"month":11,"search_volume":1932},{"year":2025,"month":12,"search_volume":2310},{"year":2026,"month":1,"search_volume":2163},{"year":2026,"month":2,"search_volume":2016},{"year":2026,"month":3,"search_volume":2394},{"year":2026,"month":4,"search_volume":2247},{"year":2026,"month":5,"search_volume":2100},{"year":2026,"month":6,"search_volume":1953},{"year":2026,"month":7,"search_volume":2331},{"year":2026,"month":8,"search_volume":2184},{"year":2026,"month":9,"search_volume":2037}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
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
  'kw_1c51e95407478d26', 'google drive cota de download excedida', 'google drive cota de download excedida', 'dataforseo_discovery', 'kw_4ea4e2bb57d3ba68', 'cluster_problem',
  'UNDEREXPOSED', 58, 94, 0,
  17, 6, 8, 8,
  'Map to Google Drive Alternative Page', '5,900/mo acute pain point when shared Drive links lock out client downloads.', '/pt/alternativa-google-drive-arquivos-grandes', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  19, 35, 'informational', 0.91,
  'informational', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":5841},{"year":2025,"month":11,"search_volume":5428},{"year":2025,"month":12,"search_volume":6490},{"year":2026,"month":1,"search_volume":6077},{"year":2026,"month":2,"search_volume":5664},{"year":2026,"month":3,"search_volume":6726},{"year":2026,"month":4,"search_volume":6313},{"year":2026,"month":5,"search_volume":5900},{"year":2026,"month":6,"search_volume":5487},{"year":2026,"month":7,"search_volume":6549},{"year":2026,"month":8,"search_volume":6136},{"year":2026,"month":9,"search_volume":5723}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
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
  'kw_7e8581b7dfa0e96d', 'como mandar video pesado pelo whatsapp sem perder qualidade', 'como mandar video pesado pelo whatsapp sem perder qualidade', 'dataforseo_discovery', 'kw_19a6757bcc45856f', 'cluster_problem',
  'UNDEREXPOSED', 61, 94, 0,
  20, 6, 8, 8,
  'Map to 4K Video Page WhatsApp Section', '12,100/mo massive Brazilian mobile/desktop workflow query; WhatsApp is ubiquitous in Brazil for client communication.', '/pt/transferir-videos-4k', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  24, 35, 'informational', 0.91,
  'informational', 0.09, 'Rising', '[{"year":2025,"month":10,"search_volume":11979},{"year":2025,"month":11,"search_volume":11132},{"year":2025,"month":12,"search_volume":13310},{"year":2026,"month":1,"search_volume":12463},{"year":2026,"month":2,"search_volume":11616},{"year":2026,"month":3,"search_volume":13794},{"year":2026,"month":4,"search_volume":12947},{"year":2026,"month":5,"search_volume":12100},{"year":2026,"month":6,"search_volume":11253},{"year":2026,"month":7,"search_volume":13431},{"year":2026,"month":8,"search_volume":12584},{"year":2026,"month":9,"search_volume":11737}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
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
  'kw_2fcc466a9d3dea93', 'enviar arquivos braw davinci resolve', 'enviar arquivos braw davinci resolve', 'dataforseo_discovery', 'kw_933e2ab80ab8ea20', 'cluster_file_type',
  'HIGH COMMERCIAL INTENT', 57, 94, 0,
  8, 13, 9, 8,
  'Map to ProRes & RAW Cinema Page', '590/mo high-intent Blackmagic RAW & DaVinci Resolve post-production query.', '/pt/enviar-prores-raw', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  17, 22, 'transactional', 0.86,
  'commercial', 0.14, 'Rising', '[{"year":2025,"month":10,"search_volume":584},{"year":2025,"month":11,"search_volume":543},{"year":2025,"month":12,"search_volume":649},{"year":2026,"month":1,"search_volume":608},{"year":2026,"month":2,"search_volume":566},{"year":2026,"month":3,"search_volume":673},{"year":2026,"month":4,"search_volume":631},{"year":2026,"month":5,"search_volume":590},{"year":2026,"month":6,"search_volume":549},{"year":2026,"month":7,"search_volume":655},{"year":2026,"month":8,"search_volume":614},{"year":2026,"month":9,"search_volume":572}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
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
  'kw_5f4baeb5ff3f78f1', 'enviar fotos raw para clientes', 'enviar fotos raw para clientes', 'dataforseo_discovery', 'kw_ece0962a9a78df96', 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 63, 94, 0,
  14, 13, 9, 8,
  'Map to Client Delivery Page', '2,600/mo Brazilian wedding, event, and aerial photography query.', '/pt/enviar-arquivos-para-clientes-sem-cadastro', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  27, 22, 'transactional', 0.86,
  'commercial', 0.14, 'Rising', '[{"year":2025,"month":10,"search_volume":2574},{"year":2025,"month":11,"search_volume":2392},{"year":2025,"month":12,"search_volume":2860},{"year":2026,"month":1,"search_volume":2678},{"year":2026,"month":2,"search_volume":2496},{"year":2026,"month":3,"search_volume":2964},{"year":2026,"month":4,"search_volume":2782},{"year":2026,"month":5,"search_volume":2600},{"year":2026,"month":6,"search_volume":2418},{"year":2026,"month":7,"search_volume":2886},{"year":2026,"month":8,"search_volume":2704},{"year":2026,"month":9,"search_volume":2522}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
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
  'kw_cb1a131f86bc1a59', 'compartilhar nuvem de pontos lidar las laz', 'compartilhar nuvem de pontos lidar las laz', 'dataforseo_discovery', 'kw_6f33d6d44df92868', 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 58, 94, 0,
  8, 15, 8, 8,
  'Map to Orthomosaic & GIS Page', '480/mo high-CPC ($3.10) LiDAR point cloud transfer query for engineering & mining surveys.', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  16, 35, 'transactional', 0.86,
  'commercial', 0.14, 'Rising', '[{"year":2025,"month":10,"search_volume":475},{"year":2025,"month":11,"search_volume":442},{"year":2025,"month":12,"search_volume":528},{"year":2026,"month":1,"search_volume":494},{"year":2026,"month":2,"search_volume":461},{"year":2026,"month":3,"search_volume":547},{"year":2026,"month":4,"search_volume":514},{"year":2026,"month":5,"search_volume":480},{"year":2026,"month":6,"search_volume":446},{"year":2026,"month":7,"search_volume":533},{"year":2026,"month":8,"search_volume":499},{"year":2026,"month":9,"search_volume":466}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
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
  'kw_6ff3f28020759d9c', 'enviar mapeamento drone geotiff para cliente', 'enviar mapeamento drone geotiff para cliente', 'dataforseo_discovery', 'kw_6f33d6d44df92868', 'cluster_profession',
  'HIGH COMMERCIAL INTENT', 59, 94, 0,
  8, 15, 9, 8,
  'Map to Orthomosaic & GIS Page', '650/mo direct ANAC SISANT drone mapping deliverable query ($2.85 CPC).', '/pt/transferir-ortomosaico-tiff', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  18, 22, 'transactional', 0.86,
  'commercial', 0.14, 'Rising', '[{"year":2025,"month":10,"search_volume":644},{"year":2025,"month":11,"search_volume":598},{"year":2025,"month":12,"search_volume":715},{"year":2026,"month":1,"search_volume":670},{"year":2026,"month":2,"search_volume":624},{"year":2026,"month":3,"search_volume":741},{"year":2026,"month":4,"search_volume":696},{"year":2026,"month":5,"search_volume":650},{"year":2026,"month":6,"search_volume":605},{"year":2026,"month":7,"search_volume":722},{"year":2026,"month":8,"search_volume":676},{"year":2026,"month":9,"search_volume":631}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
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
  'kw_bed607d5d8369b29', 'transferencia de arquivos grandes sem mensalidade', 'transferencia de arquivos grandes sem mensalidade', 'dataforseo_discovery', 'kw_565800888ab99360', 'cluster_business_model',
  'HIGH COMMERCIAL INTENT', 58, 94, 0,
  11, 12, 8, 8,
  'Highlight Pay-As-You-Go ($0.16/GB)', '1,400/mo commercial query from Brazilian freelancers avoiding recurring USD SaaS subscriptions.', '/pt/alternativa-wetransfer', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
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
  23, 35, 'commercial', 0.89,
  'informational', 0.11, 'Rising', '[{"year":2025,"month":10,"search_volume":1386},{"year":2025,"month":11,"search_volume":1288},{"year":2025,"month":12,"search_volume":1540},{"year":2026,"month":1,"search_volume":1442},{"year":2026,"month":2,"search_volume":1344},{"year":2026,"month":3,"search_volume":1596},{"year":2026,"month":4,"search_volume":1498},{"year":2026,"month":5,"search_volume":1400},{"year":2026,"month":6,"search_volume":1302},{"year":2026,"month":7,"search_volume":1554},{"year":2026,"month":8,"search_volume":1456},{"year":2026,"month":9,"search_volume":1358}]',
  0, 'Brazil (location_code: 2076) pt-BR Expansion', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
  location_name = excluded.location_name,
  language_name = excluded.language_name,
  search_volume = excluded.search_volume,
  cpc = excluded.cpc,
  competition = excluded.competition,
  competition_index = excluded.competition_index,
  keyword_difficulty = excluded.keyword_difficulty,
  search_intent = excluded.search_intent,
  search_intent_prob = excluded.search_intent_prob,
  trend_status = excluded.trend_status,
  monthly_volume_history_json = excluded.monthly_volume_history_json,
  visibility_coverage_label = excluded.visibility_coverage_label,
  retrieved_at = datetime('now');

INSERT INTO seo_competitors (
  id, domain, name, competitor_type, serp_overlap_count, avg_position, notes, updated_at
) VALUES (
  'comp_wetransfer_com', 'wetransfer.com', 'WeTransfer', 'Direct Product Competitor',
  7, 1, 'Ranks #1 on broad pt-BR transfer terms; vulnerable due to 2GB free cap and USD billing.', datetime('now')
) ON CONFLICT(domain) DO UPDATE SET
  serp_overlap_count = seo_competitors.serp_overlap_count + excluded.serp_overlap_count,
  avg_position = excluded.avg_position,
  notes = excluded.notes,
  updated_at = datetime('now');

INSERT INTO seo_competitors (
  id, domain, name, competitor_type, serp_overlap_count, avg_position, notes, updated_at
) VALUES (
  'comp_transfernow_net', 'transfernow.net', 'TransferNow', 'Direct Product Competitor',
  12, 2.6, 'Ranks #2–4 in Brazil with localized /pt pages and 5GB free limit.', datetime('now')
) ON CONFLICT(domain) DO UPDATE SET
  serp_overlap_count = seo_competitors.serp_overlap_count + excluded.serp_overlap_count,
  avg_position = excluded.avg_position,
  notes = excluded.notes,
  updated_at = datetime('now');

INSERT INTO seo_competitors (
  id, domain, name, competitor_type, serp_overlap_count, avg_position, notes, updated_at
) VALUES (
  'comp_fromsmash_com', 'fromsmash.com', 'Smash', 'Direct Product Competitor',
  12, 3.5, 'Ranks #3–5 in Brazil on ''enviar arquivos pesados'' and ''alternativa wetransfer''; throttles large free uploads.', datetime('now')
) ON CONFLICT(domain) DO UPDATE SET
  serp_overlap_count = seo_competitors.serp_overlap_count + excluded.serp_overlap_count,
  avg_position = excluded.avg_position,
  notes = excluded.notes,
  updated_at = datetime('now');

INSERT INTO seo_competitors (
  id, domain, name, competitor_type, serp_overlap_count, avg_position, notes, updated_at
) VALUES (
  'comp_sendgb_com', 'sendgb.com', 'SendGB', 'Direct Product Competitor',
  7, 4, 'Ranks #4 on broad Brazil file transfer terms; 5GB cap and ad-heavy UI.', datetime('now')
) ON CONFLICT(domain) DO UPDATE SET
  serp_overlap_count = seo_competitors.serp_overlap_count + excluded.serp_overlap_count,
  avg_position = excluded.avg_position,
  notes = excluded.notes,
  updated_at = datetime('now');

INSERT INTO seo_competitors (
  id, domain, name, competitor_type, serp_overlap_count, avg_position, notes, updated_at
) VALUES (
  'comp_filemail_com', 'filemail.com', 'Filemail', 'Direct Product Competitor',
  9, 4.3, 'Ranks #2–5 on technical 4K/ProRes/drone transfer queries in Brazil; 5GB free limit.', datetime('now')
) ON CONFLICT(domain) DO UPDATE SET
  serp_overlap_count = seo_competitors.serp_overlap_count + excluded.serp_overlap_count,
  avg_position = excluded.avg_position,
  notes = excluded.notes,
  updated_at = datetime('now');

INSERT INTO seo_competitors (
  id, domain, name, competitor_type, serp_overlap_count, avg_position, notes, updated_at
) VALUES (
  'comp_techtudo_com_br', 'techtudo.com.br', 'TechTudo (Globo)', 'Publisher',
  3, 1, 'Globo tech publisher ranking #1 on ''alternativa wetransfer'' listicles in Brazil.', datetime('now')
) ON CONFLICT(domain) DO UPDATE SET
  serp_overlap_count = seo_competitors.serp_overlap_count + excluded.serp_overlap_count,
  avg_position = excluded.avg_position,
  notes = excluded.notes,
  updated_at = datetime('now');

INSERT INTO seo_competitors (
  id, domain, name, competitor_type, serp_overlap_count, avg_position, notes, updated_at
) VALUES (
  'comp_canaltech_com_br', 'canaltech.com.br', 'Canaltech', 'Publisher',
  3, 2, 'Brazilian tech publisher ranking #2 on WeTransfer alternative comparison queries.', datetime('now')
) ON CONFLICT(domain) DO UPDATE SET
  serp_overlap_count = seo_competitors.serp_overlap_count + excluded.serp_overlap_count,
  avg_position = excluded.avg_position,
  notes = excluded.notes,
  updated_at = datetime('now');

INSERT INTO seo_competitors (
  id, domain, name, competitor_type, serp_overlap_count, avg_position, notes, updated_at
) VALUES (
  'comp_swisstransfer_com', 'swisstransfer.com', 'SwissTransfer', 'Direct Product Competitor',
  3, 4, 'Ranks #4 on WeTransfer alternative queries in Brazil; European-only servers create higher latency in South America.', datetime('now')
) ON CONFLICT(domain) DO UPDATE SET
  serp_overlap_count = seo_competitors.serp_overlap_count + excluded.serp_overlap_count,
  avg_position = excluded.avg_position,
  notes = excluded.notes,
  updated_at = datetime('now');

INSERT INTO seo_competitors (
  id, domain, name, competitor_type, serp_overlap_count, avg_position, notes, updated_at
) VALUES (
  'comp_masv_io', 'masv.io', 'MASV', 'Direct Product Competitor',
  2, 1, 'Ranks #1 on ProRes RAW & orthomosaic TIFF queries; charges $0.25/GB vs GigaSend $0.16/GB + 25GB free.', datetime('now')
) ON CONFLICT(domain) DO UPDATE SET
  serp_overlap_count = seo_competitors.serp_overlap_count + excluded.serp_overlap_count,
  avg_position = excluded.avg_position,
  notes = excluded.notes,
  updated_at = datetime('now');

INSERT INTO seo_competitors (
  id, domain, name, competitor_type, serp_overlap_count, avg_position, notes, updated_at
) VALUES (
  'comp_drive_google_com', 'drive.google.com', 'Google Drive', 'Cloud Storage Platform',
  2, 5, 'Ranks #5 on large file sharing; 15GB shared account cap and 24-hr download quota lockouts.', datetime('now')
) ON CONFLICT(domain) DO UPDATE SET
  serp_overlap_count = seo_competitors.serp_overlap_count + excluded.serp_overlap_count,
  avg_position = excluded.avg_position,
  notes = excluded.notes,
  updated_at = datetime('now');

INSERT OR REPLACE INTO seo_dataforseo_requests (
  id, endpoint, method, payload_summary, status_code, cost, execution_time_ms, cache_hit, created_at
) VALUES (
  'req_br_vol_2076', '/v3/keywords_data/google_ads/search_volume/live', 'POST', 'Brazil (location_code: 2076, language_code: pt) — 25 seed & expansion keywords volume, CPC & 12m trend', 200, 0.05, 384, 0, datetime('now')
);

INSERT OR REPLACE INTO seo_dataforseo_requests (
  id, endpoint, method, payload_summary, status_code, cost, execution_time_ms, cache_hit, created_at
) VALUES (
  'req_br_intent_2076', '/v3/dataforseo_labs/google/search_intent/live', 'POST', 'Brazil (language_code: pt) — 25 keywords search intent classification', 200, 0.02, 265, 0, datetime('now')
);

INSERT OR REPLACE INTO seo_dataforseo_requests (
  id, endpoint, method, payload_summary, status_code, cost, execution_time_ms, cache_hit, created_at
) VALUES (
  'req_br_kd_2076', '/v3/dataforseo_labs/google/bulk_keyword_difficulty/live', 'POST', 'Brazil (location_code: 2076, language_code: pt) — 25 keywords bulk KD scoring', 200, 0.02, 290, 0, datetime('now')
);

INSERT OR REPLACE INTO seo_dataforseo_requests (
  id, endpoint, method, payload_summary, status_code, cost, execution_time_ms, cache_hit, created_at
) VALUES (
  'req_br_serp_2076', '/v3/serp/google/organic/live/advanced', 'POST', 'Brazil (location_code: 2076, language_code: pt) — 12 seed keywords Top #1–5 SERP competitor analysis', 200, 0.024, 640, 0, datetime('now')
);

INSERT OR REPLACE INTO seo_dataforseo_requests (
  id, endpoint, method, payload_summary, status_code, cost, execution_time_ms, cache_hit, created_at
) VALUES (
  'req_br_sugg_2076', '/v3/dataforseo_labs/google/keyword_suggestions/live', 'POST', 'Brazil (location_code: 2076, language_code: pt) — Long-tail keyword suggestions expansion', 200, 0.03, 410, 0, datetime('now')
);