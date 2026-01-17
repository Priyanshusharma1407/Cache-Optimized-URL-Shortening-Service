const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100;

const ipStore = new Map();

function rateLimiter(req, res, next) {
  const ip = req.ip;
  const currentTime = Date.now();

  if (!ipStore.has(ip)) {
    ipStore.set(ip, {
      count: 1,
      windowStart: currentTime,
    });
    return next();
  }

  const data = ipStore.get(ip);

  // Reset window
  if (currentTime - data.windowStart > WINDOW_SIZE) {
    ipStore.set(ip, {
      count: 1,
      windowStart: currentTime,
    });
    return next();
  }

  // Exceeded limit
  if (data.count >= MAX_REQUESTS) {
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
    });
  }

  // Increment count
  data.count++;
  ipStore.set(ip, data);
  next();
}

module.exports = rateLimiter;
