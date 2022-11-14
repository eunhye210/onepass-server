const express = require('express');
const router = express.Router();

const { confirmEmail } = require("./controllers/signupController");

router.post("/confirm-email", confirmEmail);

module.exports = router;
