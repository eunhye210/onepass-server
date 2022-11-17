const express = require("express");
const router = express.Router();

const {
  getUserInfo,
  addPassword,
  getPassword,
  updatePassword,
  deletePassword,
} = require("./controllers/usersController");

router.get("/:userId", getUserInfo);

router.route("/:userId/password").post(addPassword);

router
  .route("/:userId/password/:passwordId")
  .get(getPassword)
  .patch(updatePassword)
  .delete(deletePassword);

module.exports = router;
