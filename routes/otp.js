const express = require("express");
const router = express.Router();

const { sendOTP } = require("./controllers/otpController");
const { catchError } = require("../middlewares/catchError");

router.post("/", catchError(sendOTP));

module.exports = router;
