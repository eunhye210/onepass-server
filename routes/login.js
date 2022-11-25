const express = require("express");
const router = express.Router();

const {
  login,
  sendVerifier,
  checkOTP,
  deleteOTP,
} = require("./controllers/loginController");

router.post("/", login);
router.get("/:email", sendVerifier);
router.route("/otp/:email").get(checkOTP).delete(deleteOTP);

module.exports = router;
