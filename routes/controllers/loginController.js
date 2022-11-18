const User = require("../../models/User");

const ERROR = require("../../constants/error");
const SRP6JavascriptServerSession = require("../../constants/encryptionAlgorithms");

module.exports = {
  login: async function (req, res, next) {
    try {
      const { email, A, M1 } = req.body;

      const user = await User.findOne({ email });

      const newPrivate = JSON.parse(user.privateKey);
      const server = new SRP6JavascriptServerSession();
      server.fromPrivateStoreState(newPrivate);

      const M2 = server.step2(A, M1);
      const sessionKey = encodeURIComponent(M2);

      res.status(200).json({ userId: user._id, sessionKey });
    } catch (err) {
      const error = new Error();
      error.status = 400;
      error.message = ERROR.FAIL_LOGIN;
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
      err.status = 400;
      err.message = ERROR.NO_ACCOUNT;
      next(err);
    }
  },
};
