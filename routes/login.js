const express = require("express");
const router = express.Router();

const { login, sendVerifier } = require("./controllers/loginController");

router.post("/", login);
router.get("/:email", sendVerifier);

module.exports = router;
