const express = require("express");
const router = express.Router();

const { getUserInfo, addPassword } = require("./controllers/usersController");

router.get("/:userId", getUserInfo);

router
  .route("/:userId/password")
  .post(addPassword);

module.exports = router;
