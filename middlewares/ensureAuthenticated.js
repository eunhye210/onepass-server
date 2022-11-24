const mongoose = require("mongoose");

const User = require("../models/User");

const ERROR = require("../constants/error");

async function ensureAuthenticated(req, res, next) {
  const { userId } = req.params;
  const { sessionKey } = req.cookies;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ errorMessage: "error1" }); // ERROR.SERVER_ERROR
  }

  const user = await User.findById(userId);

  if (!sessionKey || !user?.sessionKey.includes(sessionKey)) {
    return res.status(404).json({ errorMessage: "error2" }); // ERROR.AUTH_ERROR
  }

  next();
}

module.exports = ensureAuthenticated;
