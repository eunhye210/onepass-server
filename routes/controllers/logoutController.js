const mongoose = require("mongoose");

const User = require("../../models/User");
const ERROR = require("../../constants/error");

module.exports = {
  logout: async function (req, res, next) {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(500).json({ errorMessage: ERROR.SERVER_ERROR });
    }

    await User.findByIdAndUpdate(userId, {
      $set: { sessionKey: "", cookie: "" },
    });

    res.clearCookie("cookie");
    res.sendStatus(200);
  },
};
