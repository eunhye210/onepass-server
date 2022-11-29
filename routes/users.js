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
  createRandomPassword,
} = require("./controllers/usersController");

const { catchError } = require("../middlewares/catchError");

router.get(
  "/:userId",
  ensureAuthenticated,
  catchError(getUserInfo, "SERVER_ERROR", 500)
);

router
  .route("/:userId/password")
  .post(ensureAuthenticated, catchError(addPassword, "SERVER_ERROR", 500));

router
  .route("/:userId/password/:passwordId")
  .get(ensureAuthenticated, catchError(getPassword, "SERVER_ERROR", 500))
  .patch(ensureAuthenticated, catchError(updatePassword, "SERVER_ERROR", 500))
  .delete(ensureAuthenticated, catchError(deletePassword, "SERVER_ERROR", 500));

router.delete(
  "/:userId/withdraw",
  ensureAuthenticated,
  catchError(deleteAccount, "SERVER_ERROR", 500)
);

router.patch(
  "/:userId/reset-password",
  ensureAuthenticated,
  catchError(changeMasterPassword, "SERVER_ERROR", 500)
);

router
  .route("/:userId/account-setting")
  .get(ensureAuthenticated, catchError(getAccountSetting, "SERVER_ERROR", 500))
  .post(
    ensureAuthenticated,
    catchError(setAccountSetting, "SERVER_ERROR", 500)
  );

router.get(
  "/:userId/url/:url",
  ensureAuthenticated,
  catchError(checkUrlData, "SERVER_ERROR", 500)
);

router.get(
  "/:userId/random-password",
  ensureAuthenticated,
  catchError(createRandomPassword, "SERVER_ERROR", 500)
);

module.exports = router;
