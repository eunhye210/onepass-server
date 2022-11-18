const User = require("../../models/User");

const saveEncryptedData = require("../../services/saveEncryptedData");
const getDecryptedData = require("../../services/getDecryptedData");
const updateEncryptedData = require("../../services/updateEncryptedData");

const ERROR = require("../../constants/error");

module.exports = {
  getUserInfo: async function (req, res, next) {
    const { userId } = req.params;
    try {
      const userData = await User.findById(userId);
      const { passwordList } = userData;

      const result = passwordList.map((item) => {
        return {
          id: item._id,
          url: item.name,
          username: item.username,
        };
      });

      res.status(200).json(result);
    } catch (err) {
      err.status = 500;
      err.errorMessage = ERROR.SERVER_ERROR;
      next(err);
    }
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
  getPassword: async function (req, res, next) {
    const { userId, passwordId } = req.params;

    try {
      const result = await getDecryptedData(userId, passwordId);

      if (result === "serverError") {
        throw new Error(ERROR.SERVER_ERROR);
      }

      res.status(200).json(result);
    } catch (err) {
      err.status = 500;
      next(err);
    }
  },
  updatePassword: async function (req, res, next) {
    const { userId, passwordId } = req.params;
    const { password } = req.body;

    try {
      const result = await updateEncryptedData(userId, passwordId, password);

      if (result === "serverError") {
        throw new Error(ERROR.SERVER_ERROR);
      }

      res.status(200).json("Your password has been successfully updated");
    } catch (err) {
      err.status = 500;
      next(err);
    }
  },
  deletePassword: async function (req, res, next) {
    const { userId, passwordId } = req.params;

    try {
      await User.findByIdAndUpdate(userId, {
        $pull: {
          passwordList: { _id: passwordId },
        },
      });

      res.sendStatus(200);
    } catch (err) {
      err.status = 500;
      err.errorMessage = ERROR.SERVER_ERROR;
      next(err);
    }
  },
  deleteAccount: async function (req, res, next) {
    const { userId } = req.params;

    try {
      await User.findByIdAndDelete(userId);
      res.sendStatus(200);
    } catch (err) {
      err.status = 500;
      err.errorMessage = ERROR.SERVER_ERROR;
      next(err);
    }
  },
  changeMasterPassword: async function (req, res, next) {
    const { userId } = req.params;
    const { salt, verifier } = req.body;

    try {
      await User.updateOne(
        { _id: userId },
        {
          $set: { verifier: JSON.stringify({ salt, verifier }) },
        }
      );

      res.sendStatus(200);
    } catch (err) {
      err.status = 500;
      err.errorMessage = ERROR.SERVER_ERROR;
      next(err);
    }
  },
};
