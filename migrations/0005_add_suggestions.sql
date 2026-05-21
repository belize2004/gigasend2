CREATE TABLE IF NOT EXISTS suggestions (
  id TEXT PRIMARY KEY,
  message TEXT NOT NULL,
  page_url TEXT,
  user_agent TEXT,
  user_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_suggestions_created_at ON suggestions(created_at);
CREATE INDEX IF NOT EXISTS idx_suggestions_user_id ON suggestions(user_id);
