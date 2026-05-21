INSERT OR REPLACE INTO stripe_products (id, product_id, updated_at)
VALUES ('prod_SS3o4MjxO0XKuv', 'prod_SS3o4MjxO0XKuv', datetime('now'));

INSERT OR REPLACE INTO stripe_plans (id, product_id, name, plan_id, updated_at)
VALUES
  ('plan_SS3ojFaklgnMGD', 'prod_SS3o4MjxO0XKuv', 'starter', 'plan_SS3ojFaklgnMGD', datetime('now')),
  ('plan_SS3o4FBwFilpwb', 'prod_SS3o4MjxO0XKuv', 'pro', 'plan_SS3o4FBwFilpwb', datetime('now')),
  ('plan_SS3oq2cHb5OXSn', 'prod_SS3o4MjxO0XKuv', 'studio', 'plan_SS3oq2cHb5OXSn', datetime('now')),
  ('plan_SS3ogg7xF2CSpd', 'prod_SS3o4MjxO0XKuv', 'agency', 'plan_SS3ogg7xF2CSpd', datetime('now'));
