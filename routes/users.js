const express = require("express");
const router = express.Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const { catchError } = require("../middlewares/catchError");

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
  createRandomPassword,
} = require("./controllers/usersController");

router.get("/:userId", ensureAuthenticated, catchError(getUserInfo));

router
  .route("/:userId/password")
  .post(ensureAuthenticated, catchError(addPassword));

router
  .route("/:userId/password/:passwordId")
  .get(ensureAuthenticated, catchError(getPassword))
  .patch(ensureAuthenticated, catchError(updatePassword))
  .delete(ensureAuthenticated, catchError(deletePassword));

router.delete(
  "/:userId/withdraw",
  ensureAuthenticated,
  catchError(deleteAccount)
);

router.patch(
  "/:userId/reset-password",
  ensureAuthenticated,
  catchError(changeMasterPassword)
);

router
  .route("/:userId/account-setting")
  .get(ensureAuthenticated, catchError(getAccountSetting))
  .post(ensureAuthenticated, catchError(setAccountSetting));

router.get("/:userId/url/:url", ensureAuthenticated, catchError(checkUrlData));

router.get(
  "/:userId/random-password",
  ensureAuthenticated,
  catchError(createRandomPassword)
);

module.exports = router;
