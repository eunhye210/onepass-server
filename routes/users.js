const express = require("express");
const router = express.Router();

const {
  getUserInfo,
  addPassword,
  getPassword,
  updatePassword,
  deletePassword,
  deleteAccount,
  changeMasterPassword,
  setPasswordStrength
} = require("./controllers/usersController");

router.get("/:userId", getUserInfo);

router.route("/:userId/password").post(addPassword);

router
  .route("/:userId/password/:passwordId")
  .get(getPassword)
  .patch(updatePassword)
  .delete(deletePassword);

router.delete("/:userId/withdraw", deleteAccount);

router.patch("/:userId/reset-password", changeMasterPassword);

router.post("/:userId/account/password-strength", setPasswordStrength);

module.exports = router;
