const User = require("../../models/User");

const createClientEncryption = require("../../configs/createClientEncryption");

const { encryptData, decryptData } = require("../../utils/processCrypto");
const { createRandomPassword } = require("../../services/createRandomPasswords");
const saveEncryptedData = require("../../services/saveEncryptedData");
const getDecryptedData = require("../../services/getDecryptedData");
const updateEncryptedData = require("../../services/updateEncryptedData");

const ERROR = require("../../constants/error");

module.exports = {
  getUserInfo: async function (req, res, next) {
    const { userId } = req.params;

    const user = await User.findById(userId);
    const { passwordList } = user;

    const result = passwordList.map((item) => {
      return {
        id: item._id,
        url: item.name,
        username: item.username,
      };
    });

    const cipherText = encryptData(result, user.sessionKey);
    res.status(200).json(cipherText);
  },
  addPassword: async function (req, res, next) {
    const { userId } = req.params;
    const { cipherText } = req.body;

    const user = await User.findById(userId);

    const decryptedData = decryptData(cipherText, user.sessionKey);
    const result = await saveEncryptedData(userId, decryptedData);

    if (result === "serverError") {
      throw Error;
    }

    res.status(200).json("Your password has been successfully stored");
  },
  getPassword: async function (req, res, next) {
    const { userId, passwordId } = req.params;

    const user = await User.findById(userId);
    const result = await getDecryptedData(userId, passwordId);

    if (result === "serverError") {
      throw Error;
    }

    const cipherText = encryptData(result, user.sessionKey);
    res.status(200).json(cipherText);
  },
  updatePassword: async function (req, res, next) {
    const { userId, passwordId } = req.params;
    const { password } = req.body;

    const user = await User.findById(userId);
    const decryptedData = decryptData(password, user.sessionKey);

    const result = await updateEncryptedData(userId, passwordId, decryptedData);

    if (result === "serverError") {
      throw Error;
    }

    res.status(200).json("Your password has been successfully updated");
  },
  deletePassword: async function (req, res, next) {
    const { userId, passwordId } = req.params;

    await User.findByIdAndUpdate(userId, {
      $pull: {
        passwordList: { _id: passwordId },
      },
    });

    res.sendStatus(200);
  },
  deleteAccount: async function (req, res, next) {
    const { userId } = req.params;

    await User.findByIdAndDelete(userId);
    res.sendStatus(200);
  },
  changeMasterPassword: async function (req, res, next) {
    const { userId } = req.params;
    const { salt, verifier } = req.body;

    await User.updateOne(
      { _id: userId },
      {
        $set: { verifier: JSON.stringify({ salt, verifier }) },
      }
    );

    res.sendStatus(200);
  },
  getAccountSetting: async function (req, res, next) {
    const { userId } = req.params;

    const userData = await User.findById(userId);

    res.status(200).json({
      passwordOption: userData.passwordStrength,
      sessionTimeout: userData.cookieExpire,
    });
  },
  setAccountSetting: async function (req, res, next) {
    const { userId } = req.params;
    const { type, option } = req.body;

    if (type === "password-strength") {
      await User.updateUser("_id", userId, "passwordStrength", option);

      res
        .status(200)
        .json(`Your password generator strength type is "${option}".`);
    }

    if (type === "session-timeout") {
      await User.updateUser("_id", userId, "cookieExpire", option);

      res.status(200).json(`Your login session timeout is "${option}".`);
    }
  },
  checkUrlData: async function (req, res, next) {
    const { userId, url } = req.params;
    const regExp = new RegExp(url, "i");

    const result = await User.findOne(
      {
        _id: userId,
        "passwordList.url": { $regex: regExp },
      },
      {
        "passwordList.$": 1,
      }
    );

    if (result) {
      const user = await User.findById(userId);

      let passwordData = result.passwordList[0];
      const { clientEncryption } = await createClientEncryption();

      passwordData.password = await clientEncryption.decrypt(
        passwordData.password
      );

      const cipherText = encryptData(passwordData, user.sessionKey);
      res.status(200).json(cipherText);
    } else {
      res.status(404).json({ errorMessage: "No Data Found" });
    }
  },
  createRandomPassword: async function (req, res, next) {
    const { userId } = req.params;

    const user = await User.findById(userId);
    const passwordStrength = user.passwordStrength;

    const randomPassword = createRandomPassword(passwordStrength);

    res.status(200).json({ data: randomPassword });
  },
};
