const User = require("../models/User");

const createClientEncryption = require("../configs/createClientEncryption");

async function updateEncryptedData(userId, passwordId, newPassword) {
  const { provider, masterKey, clientEncryption } =
    await createClientEncryption();

  try {
    const dataKeyId = await clientEncryption.createDataKey(provider, {
      masterKey,
    });

    const encryptedPassword = await clientEncryption.encrypt(newPassword, {
      algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
      keyId: dataKeyId,
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
