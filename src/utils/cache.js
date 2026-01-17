const { LRUCache } = require("lru-cache");

const cache = new LRUCache({
  max: 1000,
  ttl: 1000 * 60 * 60,
});

module.exports = cache;
