const createLowerUpperNumPassword = require("../services/createLowerUpperNumPassword");
const createLowerUpperNumSymbolPassword = require("../services/createLowerUpperNumSymbolPassword");
const createWordBasedPassword = require("../services/createWordBasedPassword");

function createRandomPassword(type) {
  if (type === "good") {
    const result = createLowerUpperNumPassword(12);
    return result;
  }

  if (type === "strong") {
    const result = createLowerUpperNumSymbolPassword(12);
    return result;
  }

  if (type === "weak") {
    const result = createWordBasedPassword();
    return result;
  }
}

module.exports = createRandomPassword;
