const express = require("express");
const router = express.Router();

const { logout } = require("./controllers/logoutController");
const { catchError } = require("../middlewares/catchError");

router.post("/:userId", catchError(logout));

module.exports = router;
