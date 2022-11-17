const User = require("../models/User");

const createClientEncryption = require("../configs/createClientEncryption");

async function getDecryptedData(userId, passwordId) {
  const { clientEncryption } = await createClientEncryption();

  try {
    const result = await User.findOne(
      {
        _id: userId,
        "passwordList._id": passwordId,
      },
      {
        "passwordList.$": 1,
      }
    );

    let passwordData = result.passwordList[0];
    passwordData.password = await clientEncryption.decrypt(
      passwordData.password
    );

    return passwordData;
  } catch (err) {
    return "serverError";
  }
}

module.exports = getDecryptedData;
