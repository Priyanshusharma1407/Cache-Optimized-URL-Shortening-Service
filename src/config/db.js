const Database = require("better-sqlite3");

const db = new Database("urls.db");

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS url_mapping (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    short_code TEXT UNIQUE,
    long_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,
    click_count INTEGER DEFAULT 0
  )
`
).run();

module.exports = db;
