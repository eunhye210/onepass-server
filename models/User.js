const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  verifier: { type: String, required: true },
  privateKey: { type: String },
  cookie: { type: Array },
  sessionKey: { type: String },
  oneTimePassword: { type: String },
  cookieExpire: { type: String, default: "3h" },
  passwordStrength: { type: String, default: "good" },
  passwordList: [
    {
      url: { type: String },
      name: { type: String },
      username: { type: String },
      password: { type: mongoose.Mixed },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
