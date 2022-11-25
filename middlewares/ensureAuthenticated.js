const mongoose = require("mongoose");

const User = require("../models/User");

const ERROR = require("../constants/error");

async function ensureAuthenticated(req, res, next) {
  const { userId } = req.params;
  const { cookie } = req.cookies;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ errorMessage: ERROR.SERVER_ERROR });
  }

  const user = await User.findById(userId);

  if (!cookie || !user?.cookie.includes(cookie)) {
    return res.status(404).json({ errorMessage: ERROR.AUTH_ERROR });
  }

  next();
}

module.exports = ensureAuthenticated;
