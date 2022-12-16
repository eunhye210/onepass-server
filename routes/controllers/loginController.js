const User = require("../../models/User");

const setMaxAge = require("../../services/setMaxAge");

const ERROR = require("../../constants/error");
const SRP6JavascriptServerSession = require("../../constants/encryptionAlgorithms");

module.exports = {
  login: async function (req, res, next) {
    try {
      const { email, A, M1 } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errorMessage: ERROR.NO_ACCOUNT });
      }

      const expireTime = user.cookieExpire;

      const newPrivate = JSON.parse(user.privateKey);
      const server = new SRP6JavascriptServerSession();
      server.fromPrivateStoreState(newPrivate);

      const M2 = server.step2(A, M1);
      const cookie = encodeURIComponent(M2);
      const sessionKey = server.getSessionKey();

      await User.findOneAndUpdate({ email }, { $set: { cookie, sessionKey } });

      if (expireTime === "unlimited") {
        res.cookie("cookie", cookie);
      } else {
        const time = setMaxAge(expireTime);
        res.cookie("cookie", cookie, { maxAge: time });
      }

      res.status(200).json({ userId: user._id });
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

      if (!user) {
        return res.status(400).json({ errorMessage: ERROR.NO_ACCOUNT });
      }

      const data = JSON.parse(user.verifier);
      const { salt, verifier } = data;

      const encryptionServer = new SRP6JavascriptServerSession();
      const B = encryptionServer.step1(email, salt, verifier);
      const privateState = encryptionServer.toPrivateStoreState();

      await User.updateUser(
        "email",
        email,
        "privateKey",
        JSON.stringify(privateState)
      );

      res.status(200).json({ salt, B });
    } catch (err) {
      const error = new Error(ERROR.SERVER_ERROR);
      error.status = 500;

      next(error);
    }
  },
  checkOTP: async function (req, res, next) {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error(ERROR.NO_ACCOUNT);
    }

    if (user.oneTimePassword) {
      return res
        .status(200)
        .json({ type: true, otp: user.oneTimePassword, userId: user._id });
    } else {
      return res.status(200).json({ type: false });
    }
  },
  deleteOTP: async function (req, res, next) {
    const { email } = req.params;
    const { OTP } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: { oneTimePassword: "", cookie: OTP, sessionKey: OTP },
      }
    );

    res.cookie("cookie", OTP, { maxAge: 1000 * 60 * 60 * 24 });
    res.status(200).json({ userId: user._id });
  },
};
