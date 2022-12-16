const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  verifier: { type: String, required: true },
  privateKey: { type: String },
  cookie: { type: String },
  sessionKey: { type: String },
  oneTimePassword: { type: String },
  cookieExpire: { type: String, default: "3h" },
  passwordStrength: { type: String, default: "good" },
  passwordList: [
    {
      url: { type: String, required: true },
      domainName: { type: String, required: true },
      username: { type: String, required: true },
      password: { type: mongoose.Mixed, required: true },
    },
  ],
});

userSchema.statics.updateUser = async function (
  field,
  fieldData,
  setField,
  setData
) {
  return await this.updateOne(
    { [field]: fieldData },
    { $set: { [setField]: setData } }
  );
};

module.exports = mongoose.model("User", userSchema);
