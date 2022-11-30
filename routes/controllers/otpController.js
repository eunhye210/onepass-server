const User = require("../../models/User");

const sendEmail = require("../../utils/sendEmail");
const { createLowerUpperNumPassword } = require("../../services/createRandomPasswords");

const ERROR = require("../../constants/error");

module.exports = {
  sendOTP: async function (req, res, next) {
    const { email } = req.body;
    const password = createLowerUpperNumPassword(12);

    const user = await User.findOneAndUpdate(
      { email },
      { $set: { oneTimePassword: password } }
    );

    if (!user) {
      throw new Error(ERROR.NO_ACCOUNT);
    }

    const emailTitle = "One Time Password";
    const emailBody = `<h2>Hello OnePass User!</h2><br /><h3>This OTP is valid for only once. Please Login with this OTP and securely change your password in 'My Account'.</h3><h2>OTP: ${password}</h2><br /><h3>Best Regards,</h3><h3>One Pass Team</h3>`;

    await sendEmail(email, emailTitle, emailBody);
    res.status(200).json({ data: password });
  },
};
