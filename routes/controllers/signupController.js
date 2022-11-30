const User = require("../../models/User");

const sendEmail = require("../../utils/sendEmail");
const { createLowerUpperNumPassword } = require("../../services/createRandomPasswords");

const ERROR = require("../../constants/error");

module.exports = {
  signup: async function (req, res, next) {
    if (!req.body) {
      throw new Error(ERROR.NO_EMAIL);
    }

    const { username, email, verifier, salt } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw new Error(ERROR.EMAIL_DUPLICATE);
    }

    await User.create({
      username,
      email,
      verifier: JSON.stringify({ salt, verifier }),
      cookieExpire: "3h",
    });

    res.sendStatus(201);
  },
  confirmEmail: async function (req, res, next) {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw new Error(ERROR.EMAIL_DUPLICATE);
    }

    const randomString = createLowerUpperNumPassword(6);
    const emailTitle = "Verify your Email";
    const emailBody = `<h2>Thank you for signing up!</h2><br /><h3>To activate your account, please fill in the Confirmation Code below to verify your email address.</h3><h2>Confirmation Code: ${randomString}</h2><br /><h3>Best Regards,</h3><h3>One Pass Team</h3>`;

    await sendEmail(email, emailTitle, emailBody);
    res.status(200).json(randomString);
  },
};
