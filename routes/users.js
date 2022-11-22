const express = require("express");
const router = express.Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const {
  getUserInfo,
  addPassword,
  getPassword,
  updatePassword,
  deletePassword,
  deleteAccount,
  changeMasterPassword,
  getAccountSetting,
  setAccountSetting,
  checkUrlData,
  createRandomPassword
} = require("./controllers/usersController");

router.get("/:userId", ensureAuthenticated, getUserInfo);

router.route("/:userId/password").post(ensureAuthenticated, addPassword);

router
  .route("/:userId/password/:passwordId")
  .get(ensureAuthenticated, getPassword)
  .patch(ensureAuthenticated, updatePassword)
  .delete(ensureAuthenticated, deletePassword);

router.delete("/:userId/withdraw", ensureAuthenticated, deleteAccount);

router.patch("/:userId/reset-password", ensureAuthenticated, changeMasterPassword);

router
  .route("/:userId/account-setting")
  .get(ensureAuthenticated, getAccountSetting)
  .post(ensureAuthenticated, setAccountSetting);

router.get("/:userId/url/:url", checkUrlData);

router.get("/:userId/random-password", createRandomPassword);

module.exports = router;
