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
  setPasswordStrength,
  checkUrlData
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

router.get("/:userId/url/:url", checkUrlData);

module.exports = router;
