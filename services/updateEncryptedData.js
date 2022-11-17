const User = require("../models/User");

const createClientEncryption = require("../configs/createClientEncryption");

async function updateEncryptedData(userId, passwordId, password) {
  const { provider, masterKey, clientEncryption } =
    await createClientEncryption();

  try {
    const encryptedPassword = await clientEncryption.encrypt(password, {
      algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
      keyAltName: userId,
    });

    const result = await User.updateOne(
      { _id: userId, "passwordList._id": passwordId },
      {
        $set: { "passwordList.$.password": encryptedPassword },
      }
    );

    return "success";
  } catch (err) {
    return "serverError";
  }
}

module.exports = updateEncryptedData;
