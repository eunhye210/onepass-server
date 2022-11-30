const ERROR = require("../constants/error");

exports.catchError = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    err.message = err.message || ERROR.SERVER_ERROR;
    err.status = err.message ? 400 : 500;

    next(err);
  }
};
