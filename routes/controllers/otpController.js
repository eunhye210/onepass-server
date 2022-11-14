const sendEmail = require("../../utils/sendEmail");
const createLowerUpperNumPassword = require("../../services/createLowerUpperNumPassword");

const ERROR = require("../../constants/error");

module.exports = {
  sendOTP: async function (req, res, next) {
    const { email } = req.body;

    // 유저 존재하는지 확인 { errorMessage: "No account found." }
    // 유저 DB 내 OTP에 저장
    const password = createLowerUpperNumPassword(16);

    const emailTitle = "One Time Password";
    const emailBody = `<h2>Hello OnePass User!</h2><br /><h3>This OTP is valid for only once. Please Login with this OTP and securely change your password in 'My Account'.</h3><h2>OTP: ${password}</h2><br /><h3>Best Regards,</h3><h3>One Pass Team</h3>`;

    try {
      await sendEmail(email, emailTitle, emailBody);
      res.sendStatus(200);
    } catch (err) {
      err.status = 500;
      err.message = ERROR.SERVER_ERROR;
      next(err);
    }
  },
};
