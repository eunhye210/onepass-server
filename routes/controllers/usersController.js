const saveEncryptedData = require("../../configs/saveEncryptedData");

const ERROR = require("../../constants/error");

module.exports = {
  getUserInfo: async function (req, res, next) {
    res.statusSend(200);
  },
  addPassword: async function (req, res, next) {
    const { userId } = req.params;
    const userDataArr = req.body;

    try {
      const result = await saveEncryptedData(userId, userDataArr);

      if (result === "serverError") {
        throw new Error(ERROR.SERVER_ERROR);
      }

      res.status(200).json("Your password has been successfully stored");
    } catch (err) {
      err.status = 500;
      next(err);
    }
  },
};
