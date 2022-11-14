const mailjet = require("node-mailjet");

async function sendEmail(emailAddress, emailTitle, emailBody) {
  const mailjetClient = mailjet.connect(
    process.env.MAILJET_APIKEY_PUBLIC,
    process.env.MAILJET_APIKEY_SECRET
  );

  await mailjetClient.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "tkrhd0210@gmail.com",
          Name: "OnePass",
        },
        To: [
          {
            Email: emailAddress,
          },
        ],
        Subject: emailTitle,
        HTMLPart: emailBody,
      },
    ],
  });
}

module.exports = sendEmail;
