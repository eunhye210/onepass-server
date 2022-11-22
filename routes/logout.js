const express = require("express");
const router = express.Router();

const { logout } = require("./controllers/logoutController");

router.post("/:userId", logout);

module.exports = router;
