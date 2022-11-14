const sendEmail = require("../../utils/sendEmail");
const createLowerUpperNumPassword = require("../../services/createLowerUpperNumPassword");

const ERROR = require("../../constants/error");

module.exports = {
  confirmEmail: async function (req, res, next) {
    const { email } = req.body;

    // email 형식, 중복 확인에 따른 res 전달

    const randomString = createLowerUpperNumPassword(6);
    const emailTitle = "Verify your Email";
    const emailBody = `<h2>Thank you for signing up!</h2><br /><h3>To activate your account, please fill in the Confirmation Code below to verify your email address.</h3><h2>Confirmation Code: ${randomString}</h2><br /><h3>Best Regards,</h3><h3>One Pass Team</h3>`;

    try {
      await sendEmail(email, emailTitle, emailBody);
      res.status(200).json(randomString);
    } catch (err) {
      err.status = 500;
      err.message = ERROR.SERVER_ERROR;
      next(err);
    }
  },
};
