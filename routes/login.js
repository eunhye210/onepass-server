const express = require("express");
const router = express.Router();

const {
  login,
  sendVerifier,
  checkOTP,
  deleteOTP,
} = require("./controllers/loginController");

const { catchError } = require("../middlewares/catchError");

router.post("/", catchError(login, "FAIL_LOGIN", 400));
router.get("/:email", catchError(sendVerifier, "NO_ACCOUNT", 400));
router
  .route("/otp/:email")
  .get(catchError(checkOTP, "SERVER_ERROR", 500))
  .delete(catchError(deleteOTP, "SERVER_ERROR", 500));

module.exports = router;
