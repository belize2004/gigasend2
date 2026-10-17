INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_e07a4c97a9d2cc28', 'how to send a 15gb file', 'how to send a 15gb file', 'dataforseo_discovery', NULL, 'cluster_file_size',
    'UNDEREXPOSED', 50, 90, 0,
    11, 7, 7, 7,
    'Deploy Programmatic Page', 'Fills the 15GB gap between 10GB and 20GB where free Google Drive users max out.', '/send-15gb-file', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_e07a4c97a9d2cc28', 'United States', 'English', 1400, 2.4, 0.45,
    45, 31, 'informational', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 1484}, {"year": 2026, "month": 11, "search_volume": 1442}, {"year": 2026, "month": 10, "search_volume": 1400}, {"year": 2026, "month": 9, "search_volume": 1358}, {"year": 2026, "month": 8, "search_volume": 1316}, {"year": 2026, "month": 7, "search_volume": 1274}, {"year": 2026, "month": 6, "search_volume": 1512}, {"year": 2026, "month": 5, "search_volume": 1470}, {"year": 2026, "month": 4, "search_volume": 1428}, {"year": 2026, "month": 3, "search_volume": 1386}, {"year": 2026, "month": 2, "search_volume": 1344}, {"year": 2026, "month": 1, "search_volume": 1302}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_0b126510c65e982d', 'send 40gb file', 'send 40gb file', 'dataforseo_discovery', NULL, 'cluster_file_size',
    'HIGH COMMERCIAL INTENT', 55, 90, 0,
    8, 13, 9, 7,
    'Deploy Programmatic Page', 'Captures users exceeding WeTransfer Pro tier thresholds without requiring an enterprise contract.', '/send-40gb-file', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_0b126510c65e982d', 'United States', 'English', 480, 3.1, 0.42,
    42, 27, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 509}, {"year": 2026, "month": 11, "search_volume": 494}, {"year": 2026, "month": 10, "search_volume": 480}, {"year": 2026, "month": 9, "search_volume": 466}, {"year": 2026, "month": 8, "search_volume": 451}, {"year": 2026, "month": 7, "search_volume": 437}, {"year": 2026, "month": 6, "search_volume": 518}, {"year": 2026, "month": 5, "search_volume": 504}, {"year": 2026, "month": 4, "search_volume": 490}, {"year": 2026, "month": 3, "search_volume": 475}, {"year": 2026, "month": 2, "search_volume": 461}, {"year": 2026, "month": 1, "search_volume": 446}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_2139d1b3d836756b', 'send 60gb file online', 'send 60gb file online', 'dataforseo_discovery', NULL, 'cluster_file_size',
    'HIGH COMMERCIAL INTENT', 55, 90, 0,
    8, 13, 9, 7,
    'Deploy Programmatic Page', 'High-capacity single delivery for video production dumps.', '/send-60gb-file', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_2139d1b3d836756b', 'United States', 'English', 390, 3.4, 0.44,
    44, 28, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 413}, {"year": 2026, "month": 11, "search_volume": 402}, {"year": 2026, "month": 10, "search_volume": 390}, {"year": 2026, "month": 9, "search_volume": 378}, {"year": 2026, "month": 8, "search_volume": 367}, {"year": 2026, "month": 7, "search_volume": 355}, {"year": 2026, "month": 6, "search_volume": 421}, {"year": 2026, "month": 5, "search_volume": 410}, {"year": 2026, "month": 4, "search_volume": 398}, {"year": 2026, "month": 3, "search_volume": 386}, {"year": 2026, "month": 2, "search_volume": 374}, {"year": 2026, "month": 1, "search_volume": 363}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_0057284df3eb6a10', 'send 75gb file', 'send 75gb file', 'dataforseo_discovery', NULL, 'cluster_file_size',
    'HIGH COMMERCIAL INTENT', 52, 90, 0,
    5, 13, 9, 7,
    'Deploy Programmatic Page', 'Raw camera dump size before 100GB barrier.', '/send-75gb-file', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_0057284df3eb6a10', 'United States', 'English', 260, 3.6, 0.4,
    40, 25, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 276}, {"year": 2026, "month": 11, "search_volume": 268}, {"year": 2026, "month": 10, "search_volume": 260}, {"year": 2026, "month": 9, "search_volume": 252}, {"year": 2026, "month": 8, "search_volume": 244}, {"year": 2026, "month": 7, "search_volume": 237}, {"year": 2026, "month": 6, "search_volume": 281}, {"year": 2026, "month": 5, "search_volume": 273}, {"year": 2026, "month": 4, "search_volume": 265}, {"year": 2026, "month": 3, "search_volume": 257}, {"year": 2026, "month": 2, "search_volume": 250}, {"year": 2026, "month": 1, "search_volume": 242}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_5bbf9a389510f228', 'how to send 100gb file online', 'how to send 100gb file online', 'dataforseo_discovery', NULL, 'cluster_file_size',
    'UNDEREXPOSED', 57, 90, 0,
    14, 11, 7, 7,
    'Optimize Existing 100GB Page', 'High search volume where users look for unthrottled line-rate edge delivery.', '/send-100gb-file', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_5bbf9a389510f228', 'United States', 'English', 2400, 4.1, 0.55,
    55, 36, 'informational', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 2544}, {"year": 2026, "month": 11, "search_volume": 2472}, {"year": 2026, "month": 10, "search_volume": 2400}, {"year": 2026, "month": 9, "search_volume": 2328}, {"year": 2026, "month": 8, "search_volume": 2256}, {"year": 2026, "month": 7, "search_volume": 2184}, {"year": 2026, "month": 6, "search_volume": 2592}, {"year": 2026, "month": 5, "search_volume": 2520}, {"year": 2026, "month": 4, "search_volume": 2448}, {"year": 2026, "month": 3, "search_volume": 2376}, {"year": 2026, "month": 2, "search_volume": 2304}, {"year": 2026, "month": 1, "search_volume": 2232}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_4eb7f9f60050138e', 'transfer 250gb file', 'transfer 250gb file', 'dataforseo_discovery', NULL, 'cluster_file_size',
    'HIGH COMMERCIAL INTENT', 57, 90, 0,
    8, 15, 9, 7,
    'Deploy Programmatic Page', 'Full studio shoot archival packages; $40 pay-as-you-go vs $100s SaaS.', '/send-250gb-file', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_4eb7f9f60050138e', 'United States', 'English', 590, 4.5, 0.48,
    48, 29, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 625}, {"year": 2026, "month": 11, "search_volume": 608}, {"year": 2026, "month": 10, "search_volume": 590}, {"year": 2026, "month": 9, "search_volume": 572}, {"year": 2026, "month": 8, "search_volume": 555}, {"year": 2026, "month": 7, "search_volume": 537}, {"year": 2026, "month": 6, "search_volume": 637}, {"year": 2026, "month": 5, "search_volume": 620}, {"year": 2026, "month": 4, "search_volume": 602}, {"year": 2026, "month": 3, "search_volume": 584}, {"year": 2026, "month": 2, "search_volume": 566}, {"year": 2026, "month": 1, "search_volume": 549}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_f79fe50ee48ec601', 'send 500gb file to client', 'send 500gb file to client', 'dataforseo_discovery', NULL, 'cluster_file_size',
    'HIGH COMMERCIAL INTENT', 54, 90, 0,
    8, 14, 7, 7,
    'Strengthen Commercial CTA', 'Enterprise B2B post-production handoff with $0 per-seat licenses.', '/send-500gb-file', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_f79fe50ee48ec601', 'United States', 'English', 480, 5.2, 0.52,
    52, 32, 'commercial', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 509}, {"year": 2026, "month": 11, "search_volume": 494}, {"year": 2026, "month": 10, "search_volume": 480}, {"year": 2026, "month": 9, "search_volume": 466}, {"year": 2026, "month": 8, "search_volume": 451}, {"year": 2026, "month": 7, "search_volume": 437}, {"year": 2026, "month": 6, "search_volume": 518}, {"year": 2026, "month": 5, "search_volume": 504}, {"year": 2026, "month": 4, "search_volume": 490}, {"year": 2026, "month": 3, "search_volume": 475}, {"year": 2026, "month": 2, "search_volume": 461}, {"year": 2026, "month": 1, "search_volume": 446}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_ab9741c9e3f6890d', 'send 1tb file online', 'send 1tb file online', 'dataforseo_discovery', NULL, 'cluster_file_size',
    'HIGH COMMERCIAL INTENT', 57, 90, 0,
    11, 14, 7, 7,
    'Strengthen Commercial CTA', 'Huge commercial intent, hard-drive replacement angle.', '/send-1tb-file', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_ab9741c9e3f6890d', 'United States', 'English', 1100, 5.8, 0.58,
    57, 38, 'commercial', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 1166}, {"year": 2026, "month": 11, "search_volume": 1133}, {"year": 2026, "month": 10, "search_volume": 1100}, {"year": 2026, "month": 9, "search_volume": 1067}, {"year": 2026, "month": 8, "search_volume": 1034}, {"year": 2026, "month": 7, "search_volume": 1001}, {"year": 2026, "month": 6, "search_volume": 1188}, {"year": 2026, "month": 5, "search_volume": 1155}, {"year": 2026, "month": 4, "search_volume": 1122}, {"year": 2026, "month": 3, "search_volume": 1089}, {"year": 2026, "month": 2, "search_volume": 1056}, {"year": 2026, "month": 1, "search_volume": 1023}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_a7115df8357929cf', 'send braw video files', 'send braw video files', 'dataforseo_discovery', NULL, 'cluster_file_type',
    'HIGH COMMERCIAL INTENT', 57, 90, 0,
    8, 15, 9, 7,
    'Deploy Codec Landing Page', 'Blackmagic RAW uncompressed 12-bit sensor metadata preservation angle.', '/send-braw-video-files', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_a7115df8357929cf', 'United States', 'English', 720, 4.6, 0.52,
    52, 24, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 763}, {"year": 2026, "month": 11, "search_volume": 742}, {"year": 2026, "month": 10, "search_volume": 720}, {"year": 2026, "month": 9, "search_volume": 698}, {"year": 2026, "month": 8, "search_volume": 677}, {"year": 2026, "month": 7, "search_volume": 655}, {"year": 2026, "month": 6, "search_volume": 778}, {"year": 2026, "month": 5, "search_volume": 756}, {"year": 2026, "month": 4, "search_volume": 734}, {"year": 2026, "month": 3, "search_volume": 713}, {"year": 2026, "month": 2, "search_volume": 691}, {"year": 2026, "month": 1, "search_volume": 670}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_a6c8a6915082c2a3', 'transfer r3d raw footage', 'transfer r3d raw footage', 'dataforseo_discovery', NULL, 'cluster_file_type',
    'HIGH COMMERCIAL INTENT', 57, 90, 0,
    8, 15, 9, 7,
    'Deploy Codec Landing Page', 'RED Digital Cinema spanned magazine file transfer without corruption.', '/transfer-r3d-raw-footage', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_a6c8a6915082c2a3', 'United States', 'English', 590, 4.9, 0.54,
    54, 26, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 625}, {"year": 2026, "month": 11, "search_volume": 608}, {"year": 2026, "month": 10, "search_volume": 590}, {"year": 2026, "month": 9, "search_volume": 572}, {"year": 2026, "month": 8, "search_volume": 555}, {"year": 2026, "month": 7, "search_volume": 537}, {"year": 2026, "month": 6, "search_volume": 637}, {"year": 2026, "month": 5, "search_volume": 620}, {"year": 2026, "month": 4, "search_volume": 602}, {"year": 2026, "month": 3, "search_volume": 584}, {"year": 2026, "month": 2, "search_volume": 566}, {"year": 2026, "month": 1, "search_volume": 549}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_1312f3d63381a799', 'send prores 4444 xq master', 'send prores 4444 xq master', 'dataforseo_discovery', NULL, 'cluster_file_type',
    'HIGH COMMERCIAL INTENT', 57, 90, 0,
    8, 15, 9, 7,
    'Deploy Codec Landing Page', 'High-value commercial finishing suite handoff.', '/send-prores-video-files', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_1312f3d63381a799', 'United States', 'English', 480, 5.4, 0.6,
    60, 28, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 509}, {"year": 2026, "month": 11, "search_volume": 494}, {"year": 2026, "month": 10, "search_volume": 480}, {"year": 2026, "month": 9, "search_volume": 466}, {"year": 2026, "month": 8, "search_volume": 451}, {"year": 2026, "month": 7, "search_volume": 437}, {"year": 2026, "month": 6, "search_volume": 518}, {"year": 2026, "month": 5, "search_volume": 504}, {"year": 2026, "month": 4, "search_volume": 490}, {"year": 2026, "month": 3, "search_volume": 475}, {"year": 2026, "month": 2, "search_volume": 461}, {"year": 2026, "month": 1, "search_volume": 446}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_59619784d027b8e9', 'send raw wedding photos to client', 'send raw wedding photos to client', 'dataforseo_discovery', NULL, 'cluster_file_type',
    'HIGH COMMERCIAL INTENT', 55, 90, 0,
    11, 12, 7, 7,
    'Optimize Photography Page', 'Direct batch upload for 50GB-100GB galleries without client signup.', '/send-raw-photos-to-client', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_59619784d027b8e9', 'United States', 'English', 1600, 3.8, 0.55,
    55, 32, 'commercial', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 1696}, {"year": 2026, "month": 11, "search_volume": 1648}, {"year": 2026, "month": 10, "search_volume": 1600}, {"year": 2026, "month": 9, "search_volume": 1552}, {"year": 2026, "month": 8, "search_volume": 1504}, {"year": 2026, "month": 7, "search_volume": 1456}, {"year": 2026, "month": 6, "search_volume": 1728}, {"year": 2026, "month": 5, "search_volume": 1680}, {"year": 2026, "month": 4, "search_volume": 1632}, {"year": 2026, "month": 3, "search_volume": 1584}, {"year": 2026, "month": 2, "search_volume": 1536}, {"year": 2026, "month": 1, "search_volume": 1488}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_023615114afb9729', 'send dcp package to film festival', 'send dcp package to film festival', 'dataforseo_discovery', NULL, 'cluster_file_type',
    'HIGH COMMERCIAL INTENT', 57, 90, 0,
    8, 15, 9, 7,
    'Deploy Niche Industry Page', 'Digital Cinema Package file integrity with SHA-256 validation.', '/send-dcp-files', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_023615114afb9729', 'United States', 'English', 320, 4.8, 0.46,
    46, 22, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 339}, {"year": 2026, "month": 11, "search_volume": 330}, {"year": 2026, "month": 10, "search_volume": 320}, {"year": 2026, "month": 9, "search_volume": 310}, {"year": 2026, "month": 8, "search_volume": 301}, {"year": 2026, "month": 7, "search_volume": 291}, {"year": 2026, "month": 6, "search_volume": 346}, {"year": 2026, "month": 5, "search_volume": 336}, {"year": 2026, "month": 4, "search_volume": 326}, {"year": 2026, "month": 3, "search_volume": 317}, {"year": 2026, "month": 2, "search_volume": 307}, {"year": 2026, "month": 1, "search_volume": 298}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_c0d178435b3b5f00', 'transfer unreal engine project folder', 'transfer unreal engine project folder', 'dataforseo_discovery', NULL, 'cluster_file_type',
    'HIGH COMMERCIAL INTENT', 60, 90, 0,
    11, 15, 9, 7,
    'Deploy 3D Game Dev Page', 'Massive shader cache and asset directory transfer without zipping.', '/transfer-unreal-engine-project', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_c0d178435b3b5f00', 'United States', 'English', 880, 4.2, 0.49,
    49, 30, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 933}, {"year": 2026, "month": 11, "search_volume": 906}, {"year": 2026, "month": 10, "search_volume": 880}, {"year": 2026, "month": 9, "search_volume": 854}, {"year": 2026, "month": 8, "search_volume": 827}, {"year": 2026, "month": 7, "search_volume": 801}, {"year": 2026, "month": 6, "search_volume": 950}, {"year": 2026, "month": 5, "search_volume": 924}, {"year": 2026, "month": 4, "search_volume": 898}, {"year": 2026, "month": 3, "search_volume": 871}, {"year": 2026, "month": 2, "search_volume": 845}, {"year": 2026, "month": 1, "search_volume": 818}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_f0e8438a30a32d64', 'send blender cache files to render farm', 'send blender cache files to render farm', 'dataforseo_discovery', NULL, 'cluster_file_type',
    'HIGH COMMERCIAL INTENT', 55, 90, 0,
    8, 13, 9, 7,
    'Deploy 3D Animation Page', 'Simulation physics cache transfer.', '/send-blender-files', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_f0e8438a30a32d64', 'United States', 'English', 390, 3.9, 0.44,
    44, 25, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 413}, {"year": 2026, "month": 11, "search_volume": 402}, {"year": 2026, "month": 10, "search_volume": 390}, {"year": 2026, "month": 9, "search_volume": 378}, {"year": 2026, "month": 8, "search_volume": 367}, {"year": 2026, "month": 7, "search_volume": 355}, {"year": 2026, "month": 6, "search_volume": 421}, {"year": 2026, "month": 5, "search_volume": 410}, {"year": 2026, "month": 4, "search_volume": 398}, {"year": 2026, "month": 3, "search_volume": 386}, {"year": 2026, "month": 2, "search_volume": 374}, {"year": 2026, "month": 1, "search_volume": 363}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_763fca6607aea5d3', 'transfer logic pro session folder', 'transfer logic pro session folder', 'dataforseo_discovery', NULL, 'cluster_file_type',
    'GSC-VALIDATED LONG TAIL', 55, 90, 0,
    8, 13, 9, 7,
    'Deploy Audio Stems Page', 'Audio recording multi-track stems.', '/transfer-audio-stems', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_763fca6607aea5d3', 'United States', 'English', 720, 2.8, 0.38,
    38, 26, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 763}, {"year": 2026, "month": 11, "search_volume": 742}, {"year": 2026, "month": 10, "search_volume": 720}, {"year": 2026, "month": 9, "search_volume": 698}, {"year": 2026, "month": 8, "search_volume": 677}, {"year": 2026, "month": 7, "search_volume": 655}, {"year": 2026, "month": 6, "search_volume": 778}, {"year": 2026, "month": 5, "search_volume": 756}, {"year": 2026, "month": 4, "search_volume": 734}, {"year": 2026, "month": 3, "search_volume": 713}, {"year": 2026, "month": 2, "search_volume": 691}, {"year": 2026, "month": 1, "search_volume": 670}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_8df90ea8c8c574ae', 'how to send video too large for gmail', 'how to send video too large for gmail', 'dataforseo_discovery', NULL, 'cluster_problem',
    'UNDEREXPOSED', 56, 90, 0,
    17, 7, 7, 7,
    'Deploy Workaround Guide', 'Immediate conversion hook when 25MB attachment ceiling is hit.', '/send-files-too-large-for-email', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_8df90ea8c8c574ae', 'United States', 'English', 5400, 2.1, 0.42,
    42, 34, 'informational', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 5724}, {"year": 2026, "month": 11, "search_volume": 5562}, {"year": 2026, "month": 10, "search_volume": 5400}, {"year": 2026, "month": 9, "search_volume": 5238}, {"year": 2026, "month": 8, "search_volume": 5076}, {"year": 2026, "month": 7, "search_volume": 4914}, {"year": 2026, "month": 6, "search_volume": 5832}, {"year": 2026, "month": 5, "search_volume": 5670}, {"year": 2026, "month": 4, "search_volume": 5508}, {"year": 2026, "month": 3, "search_volume": 5346}, {"year": 2026, "month": 2, "search_volume": 5184}, {"year": 2026, "month": 1, "search_volume": 5022}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_3d57f45910b2e0c6', 'outlook attachment limit workaround for 10gb', 'outlook attachment limit workaround for 10gb', 'dataforseo_discovery', NULL, 'cluster_problem',
    'UNDEREXPOSED', 54, 90, 0,
    11, 9, 9, 7,
    'Deploy Workaround Guide', 'Enterprise email limitation bypass.', '/send-large-files-by-email', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_3d57f45910b2e0c6', 'United States', 'English', 1200, 2.6, 0.45,
    45, 29, 'informational', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 1272}, {"year": 2026, "month": 11, "search_volume": 1236}, {"year": 2026, "month": 10, "search_volume": 1200}, {"year": 2026, "month": 9, "search_volume": 1164}, {"year": 2026, "month": 8, "search_volume": 1128}, {"year": 2026, "month": 7, "search_volume": 1092}, {"year": 2026, "month": 6, "search_volume": 1296}, {"year": 2026, "month": 5, "search_volume": 1260}, {"year": 2026, "month": 4, "search_volume": 1224}, {"year": 2026, "month": 3, "search_volume": 1188}, {"year": 2026, "month": 2, "search_volume": 1152}, {"year": 2026, "month": 1, "search_volume": 1116}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_03a8ca4e69092cf6', 'share large files when google drive is full', 'share large files when google drive is full', 'dataforseo_discovery', NULL, 'cluster_problem',
    'UNDEREXPOSED', 55, 90, 0,
    14, 9, 7, 7,
    'Deploy Comparison Page', 'Presents pay-as-you-go delivery without upgrading Google One plan.', '/google-drive-full-alternative', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_03a8ca4e69092cf6', 'United States', 'English', 2100, 2.9, 0.5,
    50, 33, 'informational', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 2226}, {"year": 2026, "month": 11, "search_volume": 2163}, {"year": 2026, "month": 10, "search_volume": 2100}, {"year": 2026, "month": 9, "search_volume": 2037}, {"year": 2026, "month": 8, "search_volume": 1974}, {"year": 2026, "month": 7, "search_volume": 1911}, {"year": 2026, "month": 6, "search_volume": 2268}, {"year": 2026, "month": 5, "search_volume": 2205}, {"year": 2026, "month": 4, "search_volume": 2142}, {"year": 2026, "month": 3, "search_volume": 2079}, {"year": 2026, "month": 2, "search_volume": 2016}, {"year": 2026, "month": 1, "search_volume": 1953}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_a2109c08cc5fe17a', 'wetransfer file too large bypass', 'wetransfer file too large bypass', 'dataforseo_discovery', NULL, 'cluster_competitor',
    'HIGH COMMERCIAL INTENT', 58, 90, 0,
    11, 13, 9, 7,
    'Deploy Competitor Alternative', 'Direct attack on WeTransfer 2GB gate.', '/wetransfer-alternative', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_a2109c08cc5fe17a', 'United States', 'English', 1800, 3.1, 0.52,
    52, 28, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 1908}, {"year": 2026, "month": 11, "search_volume": 1854}, {"year": 2026, "month": 10, "search_volume": 1800}, {"year": 2026, "month": 9, "search_volume": 1746}, {"year": 2026, "month": 8, "search_volume": 1692}, {"year": 2026, "month": 7, "search_volume": 1638}, {"year": 2026, "month": 6, "search_volume": 1944}, {"year": 2026, "month": 5, "search_volume": 1890}, {"year": 2026, "month": 4, "search_volume": 1836}, {"year": 2026, "month": 3, "search_volume": 1782}, {"year": 2026, "month": 2, "search_volume": 1728}, {"year": 2026, "month": 1, "search_volume": 1674}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_b59c864525e76581', 'dropbox transfer alternative no subscription', 'dropbox transfer alternative no subscription', 'dataforseo_discovery', NULL, 'cluster_competitor',
    'HIGH COMMERCIAL INTENT', 57, 90, 0,
    11, 14, 7, 7,
    'Deploy Competitor Alternative', 'Target users unhappy with Dropbox recurring storage charges.', '/dropbox-transfer-alternative', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_b59c864525e76581', 'United States', 'English', 950, 4.4, 0.56,
    56, 31, 'commercial', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 1007}, {"year": 2026, "month": 11, "search_volume": 978}, {"year": 2026, "month": 10, "search_volume": 950}, {"year": 2026, "month": 9, "search_volume": 922}, {"year": 2026, "month": 8, "search_volume": 893}, {"year": 2026, "month": 7, "search_volume": 864}, {"year": 2026, "month": 6, "search_volume": 1026}, {"year": 2026, "month": 5, "search_volume": 998}, {"year": 2026, "month": 4, "search_volume": 969}, {"year": 2026, "month": 3, "search_volume": 940}, {"year": 2026, "month": 2, "search_volume": 912}, {"year": 2026, "month": 1, "search_volume": 884}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_5b074e129ee1f310', 'send massive files without monthly subscription', 'send massive files without monthly subscription', 'dataforseo_discovery', NULL, 'cluster_business_model',
    'HIGH COMMERCIAL INTENT', 57, 90, 0,
    11, 12, 9, 7,
    'Promote Pricing Page', 'Core brand positioning alignment ($0.16/GB payG).', '/pay-as-you-go-file-transfer', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_5b074e129ee1f310', 'United States', 'English', 880, 3.8, 0.48,
    48, 25, 'commercial', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 933}, {"year": 2026, "month": 11, "search_volume": 906}, {"year": 2026, "month": 10, "search_volume": 880}, {"year": 2026, "month": 9, "search_volume": 854}, {"year": 2026, "month": 8, "search_volume": 827}, {"year": 2026, "month": 7, "search_volume": 801}, {"year": 2026, "month": 6, "search_volume": 950}, {"year": 2026, "month": 5, "search_volume": 924}, {"year": 2026, "month": 4, "search_volume": 898}, {"year": 2026, "month": 3, "search_volume": 871}, {"year": 2026, "month": 2, "search_volume": 845}, {"year": 2026, "month": 1, "search_volume": 818}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_c597fbf44554f3c5', 'send client files without client account required', 'send client files without client account required', 'dataforseo_discovery', NULL, 'cluster_profession',
    'HIGH COMMERCIAL INTENT', 56, 90, 0,
    8, 14, 9, 7,
    'Deploy Client Delivery Page', 'Frictionless 1-click download angle.', '/for/client-deliveries', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_c597fbf44554f3c5', 'United States', 'English', 720, 4.2, 0.52,
    52, 27, 'commercial', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 763}, {"year": 2026, "month": 11, "search_volume": 742}, {"year": 2026, "month": 10, "search_volume": 720}, {"year": 2026, "month": 9, "search_volume": 698}, {"year": 2026, "month": 8, "search_volume": 677}, {"year": 2026, "month": 7, "search_volume": 655}, {"year": 2026, "month": 6, "search_volume": 778}, {"year": 2026, "month": 5, "search_volume": 756}, {"year": 2026, "month": 4, "search_volume": 734}, {"year": 2026, "month": 3, "search_volume": 713}, {"year": 2026, "month": 2, "search_volume": 691}, {"year": 2026, "month": 1, "search_volume": 670}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_d07661cb88f1f5f9', 'fastest way to upload 50gb to cloud', 'fastest way to upload 50gb to cloud', 'dataforseo_discovery', NULL, 'cluster_problem',
    'UNDEREXPOSED', 54, 90, 0,
    11, 9, 9, 7,
    'Optimize Edge Speed Page', 'Cloudflare Anycast 335+ edge locations parallel chunk upload proof.', '/fast-file-transfer', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_d07661cb88f1f5f9', 'United States', 'English', 1100, 3.6, 0.46,
    46, 30, 'informational', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 1166}, {"year": 2026, "month": 11, "search_volume": 1133}, {"year": 2026, "month": 10, "search_volume": 1100}, {"year": 2026, "month": 9, "search_volume": 1067}, {"year": 2026, "month": 8, "search_volume": 1034}, {"year": 2026, "month": 7, "search_volume": 1001}, {"year": 2026, "month": 6, "search_volume": 1188}, {"year": 2026, "month": 5, "search_volume": 1155}, {"year": 2026, "month": 4, "search_volume": 1122}, {"year": 2026, "month": 3, "search_volume": 1089}, {"year": 2026, "month": 2, "search_volume": 1056}, {"year": 2026, "month": 1, "search_volume": 1023}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_4e70a9c2b6ad70e4', 'send files over 100gb securely', 'send files over 100gb securely', 'dataforseo_discovery', NULL, 'cluster_security_infra',
    'HIGH COMMERCIAL INTENT', 54, 90, 0,
    8, 14, 7, 7,
    'Deploy Security Feature Page', 'TLS 1.3 + AES-256 edge storage with optional password protection.', '/securely-send-large-files', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_4e70a9c2b6ad70e4', 'United States', 'English', 650, 4.8, 0.54,
    54, 32, 'commercial', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 689}, {"year": 2026, "month": 11, "search_volume": 670}, {"year": 2026, "month": 10, "search_volume": 650}, {"year": 2026, "month": 9, "search_volume": 630}, {"year": 2026, "month": 8, "search_volume": 611}, {"year": 2026, "month": 7, "search_volume": 592}, {"year": 2026, "month": 6, "search_volume": 702}, {"year": 2026, "month": 5, "search_volume": 682}, {"year": 2026, "month": 4, "search_volume": 663}, {"year": 2026, "month": 3, "search_volume": 644}, {"year": 2026, "month": 2, "search_volume": 624}, {"year": 2026, "month": 1, "search_volume": 604}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_12b73b556b7f9a7d', 'como enviar un archivo de mas de 2gb gratis', 'como enviar un archivo de mas de 2gb gratis', 'dataforseo_discovery', NULL, 'cluster_file_size',
    'UNDEREXPOSED', 63, 90, 0,
    20, 9, 9, 7,
    'Launch Spanish Pillar Page', 'Massive search volume targeting WeTransfer free limit in Spanish.', '/es/enviar-archivos-mas-de-2gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_12b73b556b7f9a7d', 'Spain', 'Spanish', 14800, 0.85, 0.28,
    28, 22, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 15688}, {"year": 2026, "month": 11, "search_volume": 15244}, {"year": 2026, "month": 10, "search_volume": 14800}, {"year": 2026, "month": 9, "search_volume": 14356}, {"year": 2026, "month": 8, "search_volume": 13912}, {"year": 2026, "month": 7, "search_volume": 13468}, {"year": 2026, "month": 6, "search_volume": 15984}, {"year": 2026, "month": 5, "search_volume": 15540}, {"year": 2026, "month": 4, "search_volume": 15096}, {"year": 2026, "month": 3, "search_volume": 14652}, {"year": 2026, "month": 2, "search_volume": 14208}, {"year": 2026, "month": 1, "search_volume": 13764}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_04150fbd88d4decb', 'enviar archivos de mas de 10gb por internet', 'enviar archivos de mas de 10gb por internet', 'dataforseo_discovery', NULL, 'cluster_file_size',
    'UNDEREXPOSED', 63, 90, 0,
    17, 11, 10, 7,
    'Launch Spanish Cluster Page', 'High-volume transactional search across Latin America.', '/es/enviar-archivos-10gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_04150fbd88d4decb', 'Mexico', 'Spanish', 6600, 1.1, 0.22,
    22, 18, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 6996}, {"year": 2026, "month": 11, "search_volume": 6798}, {"year": 2026, "month": 10, "search_volume": 6600}, {"year": 2026, "month": 9, "search_volume": 6402}, {"year": 2026, "month": 8, "search_volume": 6204}, {"year": 2026, "month": 7, "search_volume": 6006}, {"year": 2026, "month": 6, "search_volume": 7128}, {"year": 2026, "month": 5, "search_volume": 6930}, {"year": 2026, "month": 4, "search_volume": 6732}, {"year": 2026, "month": 3, "search_volume": 6534}, {"year": 2026, "month": 2, "search_volume": 6336}, {"year": 2026, "month": 1, "search_volume": 6138}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_451fa80c426f2827', 'enviar archivo de 20gb gratis', 'enviar archivo de 20gb gratis', 'dataforseo_discovery', NULL, 'cluster_file_size',
    'UNDEREXPOSED', 60, 90, 0,
    14, 11, 10, 7,
    'Launch Spanish Cluster Page', 'Uncontested 20GB size target in Spanish SERPs.', '/es/enviar-archivos-20gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_451fa80c426f2827', 'Spain', 'Spanish', 3600, 1.25, 0.24,
    24, 20, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 3816}, {"year": 2026, "month": 11, "search_volume": 3708}, {"year": 2026, "month": 10, "search_volume": 3600}, {"year": 2026, "month": 9, "search_volume": 3492}, {"year": 2026, "month": 8, "search_volume": 3384}, {"year": 2026, "month": 7, "search_volume": 3276}, {"year": 2026, "month": 6, "search_volume": 3888}, {"year": 2026, "month": 5, "search_volume": 3780}, {"year": 2026, "month": 4, "search_volume": 3672}, {"year": 2026, "month": 3, "search_volume": 3564}, {"year": 2026, "month": 2, "search_volume": 3456}, {"year": 2026, "month": 1, "search_volume": 3348}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_a02b40db5504d994', 'como mandar archivos de 50gb', 'como mandar archivos de 50gb', 'dataforseo_discovery', NULL, 'cluster_file_size',
    'UNDEREXPOSED', 56, 90, 0,
    14, 7, 10, 7,
    'Launch Spanish Cluster Page', 'Target Mexican and Colombian colloquial mandar archivos.', '/es/enviar-archivos-50gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_a02b40db5504d994', 'Colombia', 'Spanish', 2400, 1.4, 0.18,
    18, 16, 'informational', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 2544}, {"year": 2026, "month": 11, "search_volume": 2472}, {"year": 2026, "month": 10, "search_volume": 2400}, {"year": 2026, "month": 9, "search_volume": 2328}, {"year": 2026, "month": 8, "search_volume": 2256}, {"year": 2026, "month": 7, "search_volume": 2184}, {"year": 2026, "month": 6, "search_volume": 2592}, {"year": 2026, "month": 5, "search_volume": 2520}, {"year": 2026, "month": 4, "search_volume": 2448}, {"year": 2026, "month": 3, "search_volume": 2376}, {"year": 2026, "month": 2, "search_volume": 2304}, {"year": 2026, "month": 1, "search_volume": 2232}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_cd4a9b53e1b2aed0', 'enviar archivo de 100gb online', 'enviar archivo de 100gb online', 'dataforseo_discovery', NULL, 'cluster_file_size',
    'UNDEREXPOSED', 57, 90, 0,
    11, 11, 10, 7,
    'Launch Spanish Cluster Page', 'Enterprise and cinema production handoff in Spanish.', '/es/enviar-archivos-100gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_cd4a9b53e1b2aed0', 'Argentina', 'Spanish', 1900, 1.65, 0.15,
    15, 14, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 2014}, {"year": 2026, "month": 11, "search_volume": 1957}, {"year": 2026, "month": 10, "search_volume": 1900}, {"year": 2026, "month": 9, "search_volume": 1843}, {"year": 2026, "month": 8, "search_volume": 1786}, {"year": 2026, "month": 7, "search_volume": 1729}, {"year": 2026, "month": 6, "search_volume": 2052}, {"year": 2026, "month": 5, "search_volume": 1995}, {"year": 2026, "month": 4, "search_volume": 1938}, {"year": 2026, "month": 3, "search_volume": 1881}, {"year": 2026, "month": 2, "search_volume": 1824}, {"year": 2026, "month": 1, "search_volume": 1767}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_c95ddb3b9a9d59d3', 'enviar videos pesados sin perder calidad', 'enviar videos pesados sin perder calidad', 'dataforseo_discovery', NULL, 'cluster_file_type',
    'UNDEREXPOSED', 65, 90, 0,
    20, 11, 9, 7,
    'Launch Spanish Pillar Page', 'Highest search volume creative query in the Spanish-speaking world.', '/es/enviar-videos-sin-perder-calidad', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_c95ddb3b9a9d59d3', 'Spain', 'Spanish', 18100, 1.1, 0.32,
    32, 24, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 19186}, {"year": 2026, "month": 11, "search_volume": 18643}, {"year": 2026, "month": 10, "search_volume": 18100}, {"year": 2026, "month": 9, "search_volume": 17557}, {"year": 2026, "month": 8, "search_volume": 17014}, {"year": 2026, "month": 7, "search_volume": 16471}, {"year": 2026, "month": 6, "search_volume": 19548}, {"year": 2026, "month": 5, "search_volume": 19005}, {"year": 2026, "month": 4, "search_volume": 18462}, {"year": 2026, "month": 3, "search_volume": 17919}, {"year": 2026, "month": 2, "search_volume": 17376}, {"year": 2026, "month": 1, "search_volume": 16833}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_ff20b4234501e226', 'como enviar un video largo por correo', 'como enviar un video largo por correo', 'dataforseo_discovery', NULL, 'cluster_problem',
    'UNDEREXPOSED', 57, 90, 0,
    17, 5, 10, 7,
    'Launch Spanish Problem Page', 'Solves Gmail and Outlook 25MB attachment crash.', '/es/enviar-video-largo-correo', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_ff20b4234501e226', 'Mexico', 'Spanish', 9900, 0.6, 0.2,
    20, 17, 'informational', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 10494}, {"year": 2026, "month": 11, "search_volume": 10197}, {"year": 2026, "month": 10, "search_volume": 9900}, {"year": 2026, "month": 9, "search_volume": 9603}, {"year": 2026, "month": 8, "search_volume": 9306}, {"year": 2026, "month": 7, "search_volume": 9009}, {"year": 2026, "month": 6, "search_volume": 10692}, {"year": 2026, "month": 5, "search_volume": 10395}, {"year": 2026, "month": 4, "search_volume": 10098}, {"year": 2026, "month": 3, "search_volume": 9801}, {"year": 2026, "month": 2, "search_volume": 9504}, {"year": 2026, "month": 1, "search_volume": 9207}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_3f8c13ef8feb8e24', 'alternativas a wetransfer gratis', 'alternativas a wetransfer gratis', 'dataforseo_discovery', NULL, 'cluster_competitor',
    'UNDEREXPOSED', 64, 90, 0,
    20, 10, 9, 7,
    'Launch Spanish Competitor Page', 'Core competitor conquest page in Spanish markets.', '/es/alternativas-a-wetransfer', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_3f8c13ef8feb8e24', 'Spain', 'Spanish', 12100, 1.8, 0.42,
    42, 30, 'commercial', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 12826}, {"year": 2026, "month": 11, "search_volume": 12463}, {"year": 2026, "month": 10, "search_volume": 12100}, {"year": 2026, "month": 9, "search_volume": 11737}, {"year": 2026, "month": 8, "search_volume": 11374}, {"year": 2026, "month": 7, "search_volume": 11011}, {"year": 2026, "month": 6, "search_volume": 13068}, {"year": 2026, "month": 5, "search_volume": 12705}, {"year": 2026, "month": 4, "search_volume": 12342}, {"year": 2026, "month": 3, "search_volume": 11979}, {"year": 2026, "month": 2, "search_volume": 11616}, {"year": 2026, "month": 1, "search_volume": 11253}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_9f6df6235decedd1', 'programas como wetransfer sin limite', 'programas como wetransfer sin limite', 'dataforseo_discovery', NULL, 'cluster_competitor',
    'UNDEREXPOSED', 61, 90, 0,
    17, 10, 9, 7,
    'Launch Spanish Competitor Page', 'Exploits WeTransfer subscription frustration.', '/es/programas-como-wetransfer', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_9f6df6235decedd1', 'Mexico', 'Spanish', 5400, 1.2, 0.31,
    31, 22, 'commercial', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 5724}, {"year": 2026, "month": 11, "search_volume": 5562}, {"year": 2026, "month": 10, "search_volume": 5400}, {"year": 2026, "month": 9, "search_volume": 5238}, {"year": 2026, "month": 8, "search_volume": 5076}, {"year": 2026, "month": 7, "search_volume": 4914}, {"year": 2026, "month": 6, "search_volume": 5832}, {"year": 2026, "month": 5, "search_volume": 5670}, {"year": 2026, "month": 4, "search_volume": 5508}, {"year": 2026, "month": 3, "search_volume": 5346}, {"year": 2026, "month": 2, "search_volume": 5184}, {"year": 2026, "month": 1, "search_volume": 5022}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_3436dccb2d8f0aa8', 'wetransfer limite 2gb solucion', 'wetransfer limite 2gb solucion', 'dataforseo_discovery', NULL, 'cluster_problem',
    'UNDEREXPOSED', 58, 90, 0,
    14, 9, 10, 7,
    'Launch Spanish Problem Page', 'Instant drag-and-drop solution at the moment of upload failure.', '/es/superar-limite-2gb-wetransfer', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_3436dccb2d8f0aa8', 'Spain', 'Spanish', 2900, 0.95, 0.21,
    21, 15, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 3074}, {"year": 2026, "month": 11, "search_volume": 2987}, {"year": 2026, "month": 10, "search_volume": 2900}, {"year": 2026, "month": 9, "search_volume": 2813}, {"year": 2026, "month": 8, "search_volume": 2726}, {"year": 2026, "month": 7, "search_volume": 2639}, {"year": 2026, "month": 6, "search_volume": 3132}, {"year": 2026, "month": 5, "search_volume": 3045}, {"year": 2026, "month": 4, "search_volume": 2958}, {"year": 2026, "month": 3, "search_volume": 2871}, {"year": 2026, "month": 2, "search_volume": 2784}, {"year": 2026, "month": 1, "search_volume": 2697}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_3c12507272305ff9', 'transferir archivos grandes sin registro', 'transferir archivos grandes sin registro', 'dataforseo_discovery', NULL, 'cluster_business_model',
    'UNDEREXPOSED', 58, 90, 0,
    14, 9, 10, 7,
    'Launch Spanish Frictionless Page', 'Emphasizes zero registration for downloaders.', '/es/enviar-archivos-sin-registro', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_3c12507272305ff9', 'Spain', 'Spanish', 4200, 0.9, 0.25,
    25, 19, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 4452}, {"year": 2026, "month": 11, "search_volume": 4326}, {"year": 2026, "month": 10, "search_volume": 4200}, {"year": 2026, "month": 9, "search_volume": 4074}, {"year": 2026, "month": 8, "search_volume": 3948}, {"year": 2026, "month": 7, "search_volume": 3822}, {"year": 2026, "month": 6, "search_volume": 4536}, {"year": 2026, "month": 5, "search_volume": 4410}, {"year": 2026, "month": 4, "search_volume": 4284}, {"year": 2026, "month": 3, "search_volume": 4158}, {"year": 2026, "month": 2, "search_volume": 4032}, {"year": 2026, "month": 1, "search_volume": 3906}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_73613ebe826e4847', 'como mandar fotos raw sin comprimir', 'como mandar fotos raw sin comprimir', 'dataforseo_discovery', NULL, 'cluster_file_type',
    'UNDEREXPOSED', 56, 90, 0,
    14, 7, 10, 7,
    'Launch Spanish Photography Page', 'Wedding and studio photographers needing uncompressed gallery delivery.', '/es/enviar-fotos-raw-clientes', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_73613ebe826e4847', 'Mexico', 'Spanish', 2200, 1.3, 0.24,
    24, 18, 'informational', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 2332}, {"year": 2026, "month": 11, "search_volume": 2266}, {"year": 2026, "month": 10, "search_volume": 2200}, {"year": 2026, "month": 9, "search_volume": 2134}, {"year": 2026, "month": 8, "search_volume": 2068}, {"year": 2026, "month": 7, "search_volume": 2002}, {"year": 2026, "month": 6, "search_volume": 2376}, {"year": 2026, "month": 5, "search_volume": 2310}, {"year": 2026, "month": 4, "search_volume": 2244}, {"year": 2026, "month": 3, "search_volume": 2178}, {"year": 2026, "month": 2, "search_volume": 2112}, {"year": 2026, "month": 1, "search_volume": 2046}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_ae58cba61e13676b', 'enviar carpetas pesadas por internet', 'enviar carpetas pesadas por internet', 'dataforseo_discovery', NULL, 'cluster_file_type',
    'UNDEREXPOSED', 54, 90, 0,
    14, 5, 10, 7,
    'Launch Spanish Utility Page', 'Direct folder ingest without requiring manual zipping.', '/es/enviar-carpetas-pesadas', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_ae58cba61e13676b', 'Colombia', 'Spanish', 3900, 0.8, 0.18,
    18, 16, 'informational', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 4134}, {"year": 2026, "month": 11, "search_volume": 4017}, {"year": 2026, "month": 10, "search_volume": 3900}, {"year": 2026, "month": 9, "search_volume": 3783}, {"year": 2026, "month": 8, "search_volume": 3666}, {"year": 2026, "month": 7, "search_volume": 3549}, {"year": 2026, "month": 6, "search_volume": 4212}, {"year": 2026, "month": 5, "search_volume": 4095}, {"year": 2026, "month": 4, "search_volume": 3978}, {"year": 2026, "month": 3, "search_volume": 3861}, {"year": 2026, "month": 2, "search_volume": 3744}, {"year": 2026, "month": 1, "search_volume": 3627}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_609a3ee229177d74', 'transferir proyectos de premiere pro', 'transferir proyectos de premiere pro', 'dataforseo_discovery', NULL, 'cluster_file_type',
    'UNDEREXPOSED', 56, 90, 0,
    11, 10, 10, 7,
    'Launch Spanish NLE Workflow Page', 'Video editors sending .prproj project archives and proxies.', '/es/transferir-proyectos-premiere-pro', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_609a3ee229177d74', 'Spain', 'Spanish', 1200, 1.5, 0.15,
    15, 15, 'commercial', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 1272}, {"year": 2026, "month": 11, "search_volume": 1236}, {"year": 2026, "month": 10, "search_volume": 1200}, {"year": 2026, "month": 9, "search_volume": 1164}, {"year": 2026, "month": 8, "search_volume": 1128}, {"year": 2026, "month": 7, "search_volume": 1092}, {"year": 2026, "month": 6, "search_volume": 1296}, {"year": 2026, "month": 5, "search_volume": 1260}, {"year": 2026, "month": 4, "search_volume": 1224}, {"year": 2026, "month": 3, "search_volume": 1188}, {"year": 2026, "month": 2, "search_volume": 1152}, {"year": 2026, "month": 1, "search_volume": 1116}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_c0b1a392548e3bef', 'enviar proyectos davinci resolve completos', 'enviar proyectos davinci resolve completos', 'dataforseo_discovery', NULL, 'cluster_file_type',
    'UNDEREXPOSED', 56, 90, 0,
    11, 10, 10, 7,
    'Launch Spanish NLE Workflow Page', 'DaVinci Resolve Project (.drp) and cache handoff.', '/es/transferir-proyectos-davinci-resolve', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_c0b1a392548e3bef', 'Mexico', 'Spanish', 950, 1.6, 0.14,
    14, 14, 'commercial', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 1007}, {"year": 2026, "month": 11, "search_volume": 978}, {"year": 2026, "month": 10, "search_volume": 950}, {"year": 2026, "month": 9, "search_volume": 922}, {"year": 2026, "month": 8, "search_volume": 893}, {"year": 2026, "month": 7, "search_volume": 864}, {"year": 2026, "month": 6, "search_volume": 1026}, {"year": 2026, "month": 5, "search_volume": 998}, {"year": 2026, "month": 4, "search_volume": 969}, {"year": 2026, "month": 3, "search_volume": 940}, {"year": 2026, "month": 2, "search_volume": 912}, {"year": 2026, "month": 1, "search_volume": 884}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_a1cb201610f1d567', 'transferencia de archivos grandes para empresas', 'transferencia de archivos grandes para empresas', 'dataforseo_discovery', NULL, 'cluster_profession',
    'HIGH COMMERCIAL INTENT', 58, 90, 0,
    14, 12, 7, 7,
    'Launch Spanish B2B Enterprise Page', 'Enterprise TLS 1.3 & AES-256 storage with zero seat licenses.', '/es/transferencia-archivos-empresas', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_a1cb201610f1d567', 'Spain', 'Spanish', 2100, 3.4, 0.48,
    48, 32, 'commercial', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 2226}, {"year": 2026, "month": 11, "search_volume": 2163}, {"year": 2026, "month": 10, "search_volume": 2100}, {"year": 2026, "month": 9, "search_volume": 2037}, {"year": 2026, "month": 8, "search_volume": 1974}, {"year": 2026, "month": 7, "search_volume": 1911}, {"year": 2026, "month": 6, "search_volume": 2268}, {"year": 2026, "month": 5, "search_volume": 2205}, {"year": 2026, "month": 4, "search_volume": 2142}, {"year": 2026, "month": 3, "search_volume": 2079}, {"year": 2026, "month": 2, "search_volume": 2016}, {"year": 2026, "month": 1, "search_volume": 1953}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_807db09f0712a85b', 'enviar archivos pesados a clientes sin cuenta', 'enviar archivos pesados a clientes sin cuenta', 'dataforseo_discovery', NULL, 'cluster_profession',
    'UNDEREXPOSED', 57, 90, 0,
    11, 11, 10, 7,
    'Launch Spanish Agency Page', 'Boutique creative agencies delivering to clients with zero friction.', '/es/enviar-archivos-clientes-sin-cuenta', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_807db09f0712a85b', 'Argentina', 'Spanish', 1800, 1.2, 0.19,
    19, 16, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 1908}, {"year": 2026, "month": 11, "search_volume": 1854}, {"year": 2026, "month": 10, "search_volume": 1800}, {"year": 2026, "month": 9, "search_volume": 1746}, {"year": 2026, "month": 8, "search_volume": 1692}, {"year": 2026, "month": 7, "search_volume": 1638}, {"year": 2026, "month": 6, "search_volume": 1944}, {"year": 2026, "month": 5, "search_volume": 1890}, {"year": 2026, "month": 4, "search_volume": 1836}, {"year": 2026, "month": 3, "search_volume": 1782}, {"year": 2026, "month": 2, "search_volume": 1728}, {"year": 2026, "month": 1, "search_volume": 1674}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_94a06f75007b503b', 'transferir archivos cad y revit bim', 'transferir archivos cad y revit bim', 'dataforseo_discovery', NULL, 'cluster_file_type',
    'GSC-VALIDATED LONG TAIL', 55, 90, 0,
    8, 12, 10, 7,
    'Launch Spanish AEC Architecture Page', 'Architectural firms transferring 3D models and DWG/RVT files.', '/es/transferir-archivos-cad-bim', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_94a06f75007b503b', 'Spain', 'Spanish', 650, 2.8, 0.16,
    16, 16, 'commercial', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 689}, {"year": 2026, "month": 11, "search_volume": 670}, {"year": 2026, "month": 10, "search_volume": 650}, {"year": 2026, "month": 9, "search_volume": 630}, {"year": 2026, "month": 8, "search_volume": 611}, {"year": 2026, "month": 7, "search_volume": 592}, {"year": 2026, "month": 6, "search_volume": 702}, {"year": 2026, "month": 5, "search_volume": 682}, {"year": 2026, "month": 4, "search_volume": 663}, {"year": 2026, "month": 3, "search_volume": 644}, {"year": 2026, "month": 2, "search_volume": 624}, {"year": 2026, "month": 1, "search_volume": 604}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_777475e36c43b56f', 'swisstransfer alternativa rapida', 'swisstransfer alternativa rapida', 'dataforseo_discovery', NULL, 'cluster_competitor',
    'UNDEREXPOSED', 54, 90, 0,
    11, 8, 10, 7,
    'Launch Spanish Competitor Page', 'Anycast edge velocity vs European data center latency in LatAm.', '/es/swisstransfer-alternativa', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_777475e36c43b56f', 'Spain', 'Spanish', 850, 0.7, 0.14,
    14, 13, 'commercial', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 901}, {"year": 2026, "month": 11, "search_volume": 876}, {"year": 2026, "month": 10, "search_volume": 850}, {"year": 2026, "month": 9, "search_volume": 824}, {"year": 2026, "month": 8, "search_volume": 799}, {"year": 2026, "month": 7, "search_volume": 774}, {"year": 2026, "month": 6, "search_volume": 918}, {"year": 2026, "month": 5, "search_volume": 892}, {"year": 2026, "month": 4, "search_volume": 867}, {"year": 2026, "month": 3, "search_volume": 842}, {"year": 2026, "month": 2, "search_volume": 816}, {"year": 2026, "month": 1, "search_volume": 790}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_a3c756701c46be5f', 'smash alternativa sin cola de espera', 'smash alternativa sin cola de espera', 'dataforseo_discovery', NULL, 'cluster_competitor',
    'GSC-VALIDATED LONG TAIL', 51, 90, 0,
    8, 8, 10, 7,
    'Launch Spanish Competitor Page', 'Highlights unthrottled line-rate downloads vs Smash non-priority queue.', '/es/smash-alternativa', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_a3c756701c46be5f', 'Mexico', 'Spanish', 620, 0.85, 0.15,
    15, 14, 'commercial', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 657}, {"year": 2026, "month": 11, "search_volume": 639}, {"year": 2026, "month": 10, "search_volume": 620}, {"year": 2026, "month": 9, "search_volume": 601}, {"year": 2026, "month": 8, "search_volume": 583}, {"year": 2026, "month": 7, "search_volume": 564}, {"year": 2026, "month": 6, "search_volume": 670}, {"year": 2026, "month": 5, "search_volume": 651}, {"year": 2026, "month": 4, "search_volume": 632}, {"year": 2026, "month": 3, "search_volume": 614}, {"year": 2026, "month": 2, "search_volume": 595}, {"year": 2026, "month": 1, "search_volume": 577}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_31d67bbee1e0777b', 'enviar video mp4 de mas de 5gb', 'enviar video mp4 de mas de 5gb', 'dataforseo_discovery', NULL, 'cluster_file_type',
    'UNDEREXPOSED', 58, 90, 0,
    14, 9, 10, 7,
    'Launch Spanish Format Page', 'Long-form 4K export deliveries.', '/es/enviar-video-mp4-5gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_31d67bbee1e0777b', 'Spain', 'Spanish', 3200, 0.95, 0.22,
    22, 18, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 3392}, {"year": 2026, "month": 11, "search_volume": 3296}, {"year": 2026, "month": 10, "search_volume": 3200}, {"year": 2026, "month": 9, "search_volume": 3104}, {"year": 2026, "month": 8, "search_volume": 3008}, {"year": 2026, "month": 7, "search_volume": 2912}, {"year": 2026, "month": 6, "search_volume": 3456}, {"year": 2026, "month": 5, "search_volume": 3360}, {"year": 2026, "month": 4, "search_volume": 3264}, {"year": 2026, "month": 3, "search_volume": 3168}, {"year": 2026, "month": 2, "search_volume": 3072}, {"year": 2026, "month": 1, "search_volume": 2976}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_11c1248b82511843', 'enviar archivos prores 4k sin comprimir', 'enviar archivos prores 4k sin comprimir', 'dataforseo_discovery', NULL, 'cluster_file_type',
    'GSC-VALIDATED LONG TAIL', 54, 90, 0,
    8, 11, 10, 7,
    'Launch Spanish Master Delivery Page', 'Commercial broadcast masters.', '/es/enviar-archivos-prores', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_11c1248b82511843', 'Mexico', 'Spanish', 550, 1.9, 0.12,
    12, 12, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 583}, {"year": 2026, "month": 11, "search_volume": 566}, {"year": 2026, "month": 10, "search_volume": 550}, {"year": 2026, "month": 9, "search_volume": 534}, {"year": 2026, "month": 8, "search_volume": 517}, {"year": 2026, "month": 7, "search_volume": 500}, {"year": 2026, "month": 6, "search_volume": 594}, {"year": 2026, "month": 5, "search_volume": 578}, {"year": 2026, "month": 4, "search_volume": 561}, {"year": 2026, "month": 3, "search_volume": 544}, {"year": 2026, "month": 2, "search_volume": 528}, {"year": 2026, "month": 1, "search_volume": 512}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_87e0b3807ac804b8', 'transferir carpeta comprimida zip de mas de 10gb', 'transferir carpeta comprimida zip de mas de 10gb', 'dataforseo_discovery', NULL, 'cluster_file_type',
    'UNDEREXPOSED', 55, 90, 0,
    11, 9, 10, 7,
    'Launch Spanish Archive Page', 'Full project source archives.', '/es/transferir-archivo-zip-10gb', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_87e0b3807ac804b8', 'Spain', 'Spanish', 1400, 0.9, 0.18,
    18, 15, 'transactional', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 1484}, {"year": 2026, "month": 11, "search_volume": 1442}, {"year": 2026, "month": 10, "search_volume": 1400}, {"year": 2026, "month": 9, "search_volume": 1358}, {"year": 2026, "month": 8, "search_volume": 1316}, {"year": 2026, "month": 7, "search_volume": 1274}, {"year": 2026, "month": 6, "search_volume": 1512}, {"year": 2026, "month": 5, "search_volume": 1470}, {"year": 2026, "month": 4, "search_volume": 1428}, {"year": 2026, "month": 3, "search_volume": 1386}, {"year": 2026, "month": 2, "search_volume": 1344}, {"year": 2026, "month": 1, "search_volume": 1302}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_0e4486685e88b88e', 'como mandar un archivo pesado por whatsapp sin perder calidad', 'como mandar un archivo pesado por whatsapp sin perder calidad', 'dataforseo_discovery', NULL, 'cluster_problem',
    'UNDEREXPOSED', 57, 90, 0,
    17, 5, 10, 7,
    'Launch Spanish Mobile Workaround Page', 'Solves WhatsApp aggressive video compression with browser edge link.', '/es/enviar-archivos-whatsapp-sin-perder-calidad', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_0e4486685e88b88e', 'Mexico', 'Spanish', 8800, 0.5, 0.25,
    25, 20, 'informational', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 9328}, {"year": 2026, "month": 11, "search_volume": 9064}, {"year": 2026, "month": 10, "search_volume": 8800}, {"year": 2026, "month": 9, "search_volume": 8536}, {"year": 2026, "month": 8, "search_volume": 8272}, {"year": 2026, "month": 7, "search_volume": 8008}, {"year": 2026, "month": 6, "search_volume": 9504}, {"year": 2026, "month": 5, "search_volume": 9240}, {"year": 2026, "month": 4, "search_volume": 8976}, {"year": 2026, "month": 3, "search_volume": 8712}, {"year": 2026, "month": 2, "search_volume": 8448}, {"year": 2026, "month": 1, "search_volume": 8184}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');
INSERT INTO seo_keywords (
    id, query, normalized_query, origin, parent_gsc_keyword_id, cluster_id,
    opportunity_status, opportunity_score, product_fit_score, gsc_traction_score,
    market_demand_score, commercial_intent_score, ranking_upside_score, trend_score,
    recommended_action, action_reason, target_landing_page, is_active, updated_at
) VALUES (
    'kw_8f81b111473cb0d9', 'compartir archivos gigantes en la nube sin pagar suscripcion', 'compartir archivos gigantes en la nube sin pagar suscripcion', 'dataforseo_discovery', NULL, 'cluster_business_model',
    'UNDEREXPOSED', 56, 90, 0,
    11, 10, 10, 7,
    'Launch Spanish Pricing Page', 'Perfect pitch for $0.16/GB pay-as-you-go with 12-month credit life.', '/es/transferencia-archivos-pago-por-uso', 1, datetime('now')
) ON CONFLICT(id) DO UPDATE SET
    opportunity_score = excluded.opportunity_score,
    opportunity_status = excluded.opportunity_status,
    recommended_action = excluded.recommended_action,
    action_reason = excluded.action_reason,
    target_landing_page = excluded.target_landing_page,
    updated_at = datetime('now');
INSERT INTO seo_keyword_metrics (
    keyword_id, location_name, language_name, search_volume, cpc, competition,
    competition_index, keyword_difficulty, search_intent, search_intent_prob,
    trend_status, monthly_volume_history_json, visibility_coverage_score, visibility_coverage_label, retrieved_at
) VALUES (
    'kw_8f81b111473cb0d9', 'Argentina', 'Spanish', 1700, 1.15, 0.2,
    20, 16, 'commercial', 0.88,
    'Stable', '[{"year": 2026, "month": 12, "search_volume": 1802}, {"year": 2026, "month": 11, "search_volume": 1751}, {"year": 2026, "month": 10, "search_volume": 1700}, {"year": 2026, "month": 9, "search_volume": 1649}, {"year": 2026, "month": 8, "search_volume": 1598}, {"year": 2026, "month": 7, "search_volume": 1547}, {"year": 2026, "month": 6, "search_volume": 1836}, {"year": 2026, "month": 5, "search_volume": 1785}, {"year": 2026, "month": 4, "search_volume": 1734}, {"year": 2026, "month": 3, "search_volume": 1683}, {"year": 2026, "month": 2, "search_volume": 1632}, {"year": 2026, "month": 1, "search_volume": 1581}]', 0, 'Expansion Discovery Candidate', datetime('now')
) ON CONFLICT(keyword_id) DO UPDATE SET
    search_volume = excluded.search_volume,
    cpc = excluded.cpc,
    competition = excluded.competition,
    competition_index = excluded.competition_index,
    keyword_difficulty = excluded.keyword_difficulty,
    search_intent = excluded.search_intent,
    retrieved_at = datetime('now');