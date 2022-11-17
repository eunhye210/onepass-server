const { MongoClient } = require("mongodb");
const { ClientEncryption } = require("mongodb-client-encryption");

async function createClientEncryption() {
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

  return { provider, masterKey, clientEncryption };
}

module.exports = createClientEncryption;
