const User = require("../models/User");

const createClientEncryption = require("../configs/createClientEncryption");

async function saveEncryptedData(userId, userDataArr) {
  const { provider, masterKey, clientEncryption } =
    await createClientEncryption();

  try {
    const dataKeyId = await clientEncryption.createDataKey(provider, {
      masterKey,
    });

    userDataArr.forEach(async (data) => {
      const encryptedPassword = await clientEncryption.encrypt(data.password, {
        algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
        keyId: dataKeyId,
      });

      data.checked &&
        (await User.findByIdAndUpdate(userId, {
          $push: {
            passwordList: {
              name: data.name,
              url: data.url ? data.url : data.name,
              username: data.username,
              password: encryptedPassword,
            },
          },
        }));
    });

    return "success";
  } catch (err) {
    return "serverError";
  }
}

module.exports = saveEncryptedData;
