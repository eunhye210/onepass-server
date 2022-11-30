const express = require("express");
const router = express.Router();

const { signup, confirmEmail } = require("./controllers/signupController");
const { catchError } = require("../middlewares/catchError");

router.post("/", catchError(signup));
router.post("/confirm-email", catchError(confirmEmail));

module.exports = router;
