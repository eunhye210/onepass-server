const { MongoClient } = require("mongodb");
const { ClientEncryption } = require("mongodb-client-encryption");

const User = require("../models/User");

async function saveEncryptedData(userId, userDataArr) {
  const keyVaultDatabase = "encryption";
  const keyVaultCollection = "__keyVault";
  const keyVaultNamespace = `${keyVaultDatabase}.${keyVaultCollection}`;

  const mongodbURL = process.env.MONGOOSE_URL;
  const provider = "aws";
  const kmsProviders = {
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  };
  const masterKey = {
    key: process.env.AWS_KEY_ARN,
    region: process.env.AWS_KEY_REGION,
  };

  const mongoClient = new MongoClient(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await mongoClient.connect();

  const clientEncryption = new ClientEncryption(mongoClient, {
    keyVaultNamespace,
    kmsProviders,
  });

  // 처음 데이터 저장할 때
  try {
    // 처음 dataKeyId 생성
    const dataKeyId = await clientEncryption.createDataKey(provider, {
      masterKey,
      keyAltNames: [userId],
    });

    userDataArr.forEach(async (data) => {
      const encryptedPassword = await clientEncryption.encrypt(data.password, {
        algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
        keyId: dataKeyId,
      });

      await User.findByIdAndUpdate(userId, {
        $push: {
          passwordList: {
            url: data.url,
            username: data.username,
            password: encryptedPassword,
          },
        },
      });
    });

    return "success";
  } catch (err) {
    return "serverError";
  }
}

module.exports = saveEncryptedData;
