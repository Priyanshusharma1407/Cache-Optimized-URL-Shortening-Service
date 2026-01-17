const validator = require("validator");
const service = require("../services/url.service");

exports.createShortUrl = (req, res) => {
  const { longUrl, expiryDays } = req.body;

  if (!validator.isURL(longUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const shortCode = service.createShortUrl(longUrl, expiryDays);
  res.json({ shortUrl: `http://localhost:3000/${shortCode}` });
};

exports.getStats = (req, res) => {
  const { shortCode } = req.params;
  const stats = service.getUrlStats(shortCode);

  if (!stats) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.json(stats);
};
exports.redirect = (req, res) => {
  console.log("REQUEST:", req.originalUrl);

  const { shortCode } = req.params;

  const record = service.resolveShortUrlWithRecord(shortCode);

  if (!record) {
    return res.status(404).json({ error: "URL not found or expired" });
  }

  service.incrementClick(shortCode);

  res.redirect(record.long_url);
};




