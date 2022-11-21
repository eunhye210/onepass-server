const express = require("express");
const router = express.Router();

const { logout } = require("./controllers/logoutController");

router.post("/", logout);

module.exports = router;
