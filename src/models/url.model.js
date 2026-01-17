const db = require("../config/db");

function insertUrl(longUrl, expiresAt) {
  const result = db
    .prepare(`INSERT INTO url_mapping (long_url, expires_at) VALUES (?, ?)`)
    .run(longUrl, expiresAt);
  return result.lastInsertRowid;
}

function updateShortCode(id, shortCode) {
  db.prepare(`UPDATE url_mapping SET short_code = ? WHERE id = ?`).run(
    shortCode,
    id
  );
}

function findByShortCode(code) {
  return db.prepare(`SELECT * FROM url_mapping WHERE short_code = ?`).get(code);
}

function incrementClickCount(id) {
  db.prepare(
    `UPDATE url_mapping SET click_count = click_count + 1 WHERE id = ?`
  ).run(id);
}
function incrementClickCountByShortCode(shortCode) {
  db.prepare(
    `UPDATE url_mapping
     SET click_count = click_count + 1
     WHERE short_code = ?`
  ).run(shortCode);
}



function getStatsByShortCode(shortCode) {
  return db
    .prepare(
      `
      SELECT short_code, long_url, click_count, created_at, expires_at
      FROM url_mapping
      WHERE short_code = ?
    `
    )
    .get(shortCode);
}


module.exports = {
  insertUrl,
  updateShortCode,
  findByShortCode,
  incrementClickCount,
  getStatsByShortCode,
  incrementClickCountByShortCode,
};
