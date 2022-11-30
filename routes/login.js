const express = require("express");
const router = express.Router();

const { catchError } = require("../middlewares/catchError");

const {
  login,
  sendVerifier,
  checkOTP,
  deleteOTP,
} = require("./controllers/loginController");

router.post("/", login);
router.get("/:email", sendVerifier);
router
  .route("/otp/:email")
  .get(catchError(checkOTP))
  .delete(catchError(deleteOTP));

module.exports = router;
