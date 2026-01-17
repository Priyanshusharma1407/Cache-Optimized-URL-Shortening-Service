const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function encode(num) {
  let base62 = "";
  while (num > 0) {
    base62 = chars[num % 62] + base62;
    num = Math.floor(num / 62);
  }
  return base62;
}

module.exports = { encode };
