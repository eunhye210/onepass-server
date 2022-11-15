const express = require("express");
const router = express.Router();

const { signup, confirmEmail } = require("./controllers/signupController");

router.post("/", signup);
router.post("/confirm-email", confirmEmail);

module.exports = router;
