const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  verifier: { type: String, required: true },
  privateKey: { type: String },
  oneTimePassword: { type: String },
});

module.exports = mongoose.model("User", userSchema);
