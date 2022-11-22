const User = require("../../models/User");

const setMaxAge = require("../../services/setMaxAge");

const ERROR = require("../../constants/error");
const SRP6JavascriptServerSession = require("../../constants/encryptionAlgorithms");

module.exports = {
  login: async function (req, res, next) {
    try {
      const { email, A, M1 } = req.body;

      const user = await User.findOne({ email });
      const expireTime = user.cookieExpire;

      const newPrivate = JSON.parse(user.privateKey);
      const server = new SRP6JavascriptServerSession();
      server.fromPrivateStoreState(newPrivate);

      const M2 = server.step2(A, M1);
      const sessionKey = encodeURIComponent(M2);

      await User.findOneAndUpdate(
        { email },
        { $push: { sessionKey: sessionKey } }
      );

      if (expireTime === "unlimited") {
        res.cookie("sessionKey", sessionKey);
      } else {
        const time = setMaxAge(expireTime);
        res.cookie("sessionKey", sessionKey, { maxAge: time });
      }

      res.status(200).json({ userId: user._id, sessionKey });
    } catch (err) {
      const error = new Error(ERROR.FAIL_LOGIN);
      error.status = 400;
      next(error);
    }
  },
  sendVerifier: async function (req, res, next) {
    try {
      const { email } = req.params;

      const user = await User.findOne({ email });
      const data = JSON.parse(user.verifier);
      const { salt, verifier } = data;

      const encryptionServer = new SRP6JavascriptServerSession();
      const B = encryptionServer.step1(email, salt, verifier);
      const privateState = encryptionServer.toPrivateStoreState();

      await User.updateOne(
        { email },
        { $set: { privateKey: JSON.stringify(privateState) } }
      );

      res.status(200).json(JSON.stringify({ salt, B }));
    } catch (err) {
      const error = new Error(ERROR.NO_ACCOUNT);
      error.status = 400;
      next(error);
    }
  },
  checkOTP: async function (req, res, next) {
    try {
      const { email } = req.params;
      const user = await User.findOne({ email });

      if (user.oneTimePassword) {
        return res
          .status(200)
          .json({ type: true, otp: user.oneTimePassword, userId: user._id });
      } else {
        return res.status(200).json({ type: false });
      }
    } catch (err) {
      const error = new Error(ERROR.SERVER_ERROR);
      error.status = 500;
      next(error);
    }
  },
  deleteOTP: async function (req, res, next) {
    try {
      const { email } = req.params;

      const user = await User.findOneAndUpdate(
        { email },
        { $set: { oneTimePassword: "" } }
      );

      const expireTime = user.cookieExpire;

      await User.findOneAndUpdate(
        { email },
        { $push: { sessionKey: user.oneTimePassword } }
      );

      if (expireTime === "unlimited") {
        res.cookie("sessionKey", user.oneTimePassword);
      } else {
        const time = setMaxAge(expireTime);
        res.cookie("sessionKey", user.oneTimePassword, { maxAge: 1000 * 30 });
      }

      res.status(200).json({ userId: user._id });
    } catch (err) {
      const error = new Error(ERROR.SERVER_ERROR);
      error.status = 500;
      next(error);
    }
  },
};
