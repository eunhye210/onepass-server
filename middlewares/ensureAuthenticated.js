const ERROR = require("../constants/error");

function ensureAuthenticated(req, res, next) {
  const { sessionKey } = req.cookies; // sessionKey 확인 로직 필요

  if (!sessionKey) {
    return res.status(404).json({ errorMessage: ERROR.AUTH_ERROR });
  }

  next();
}

module.exports = ensureAuthenticated;
