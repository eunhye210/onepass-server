const CryptoJS = require("crypto-js");

function encryptData(data, sessionKey) {
  const cipherText = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    sessionKey
  ).toString();

  return cipherText;
}

function decryptData(data, sessionKey) {
  const bytes = CryptoJS.AES.decrypt(data, sessionKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptedData;
}

module.exports = { encryptData, decryptData };
