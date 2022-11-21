function setMaxAge(expireTime) {
  if (expireTime === "1h") {
    return 1000 * 60 * 60;
  }

  if (expireTime === "3h") {
    return 1000 * 60 * 60 * 3;
  }

  if (expireTime === "6h") {
    return 1000 * 60 * 60 * 6;
  }

  if (expireTime === "12h") {
    return 1000 * 60 * 60 * 12;
  }
}

module.exports = setMaxAge;
