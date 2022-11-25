const User = require("../../models/User");

const sendEmail = require("../../utils/sendEmail");
const createLowerUpperNumPassword = require("../../services/createLowerUpperNumPassword");

const ERROR = require("../../constants/error");

module.exports = {
  signup: async function (req, res, next) {
    if (!req.body) {
      return res.status(400).json({ errorMessage: ERROR.NO_EMAIL });
    }

    const { username, email, verifier, salt } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error(ERROR.EMAIL_DUPLICATE);
      }
    } catch (err) {
      err.status = 400;
      return next(err);
    }

    try {
      await User.create({
        username,
        email,
        verifier: JSON.stringify({ salt, verifier }),
        cookieExpire: "3h",
      });

      res.sendStatus(201);
    } catch (err) {
      err.status = 500;
      err.message = ERROR.SERVER_ERROR;
      next(err);
    }
  },
  confirmEmail: async function (req, res, next) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error(ERROR.EMAIL_DUPLICATE);
      }
    } catch (err) {
      err.status = 400;
      return next(err);
    }

    try {
      const randomString = createLowerUpperNumPassword(6);
      const emailTitle = "Verify your Email";
      const emailBody = `<h2>Thank you for signing up!</h2><br /><h3>To activate your account, please fill in the Confirmation Code below to verify your email address.</h3><h2>Confirmation Code: ${randomString}</h2><br /><h3>Best Regards,</h3><h3>One Pass Team</h3>`;

      await sendEmail(email, emailTitle, emailBody);
      res.status(200).json(randomString);
    } catch (err) {
      const error = new Error(ERROR.SERVER_ERROR);
      error.status = 500;
      next(error);
    }
  },
};
