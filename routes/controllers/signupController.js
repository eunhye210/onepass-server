const sendEmail = require("../../utils/sendEmail");
const createRandomString = require("../../utils/createRandomString");

const ERROR = require("../../constants/error");

module.exports = {
  confirmEmail: async function (req, res, next) {
    const { email } = req.body;

    // email 형식, 중복 확인에 따른 res 전달

    const randomString = createRandomString(6);
    const emailTitle = "Verify your Email";
    const emailBody = `<h2>Thank you for signing up!</h2><br />To activate your account, please fill in the Confirmation Code below to verify your email address.<br /><h3>Confirmation Code: ${randomString}</h3>Best Regards,<br />One Pass Team`;

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
