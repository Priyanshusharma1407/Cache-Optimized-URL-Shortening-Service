const { encode } = require("../utils/base62");
const cache = require("../utils/cache");
const model = require("../models/url.model");

function createShortUrl(longUrl, expiryDays) {
  const expiresAt = expiryDays
    ? new Date(Date.now() + expiryDays * 86400000).toISOString()
    : null;

  const id = model.insertUrl(longUrl, expiresAt);
  const shortCode = encode(id);

  model.updateShortCode(id, shortCode);
  cache.set(shortCode, longUrl);

  return shortCode;
}

function resolveShortUrlWithRecord(shortCode) {
  let record = cache.get(shortCode);

  if (record) {
    return record;
  }

  record = model.findByShortCode(shortCode);
  if (!record) return null;

  if (record.expires_at && new Date(record.expires_at) < new Date()) {
    return null;
  }

  cache.set(shortCode, record);
  return record;
}

function incrementClick(shortCode) {
  model.incrementClickCountByShortCode(shortCode);
}
function getUrlStats(shortCode) {
  return model.getStatsByShortCode(shortCode);
}


module.exports = {
  resolveShortUrlWithRecord,
  incrementClick,
  createShortUrl,
  getUrlStats
};



