const ERROR = require("../constants/error");

exports.catchError = (fn, errorType, errorStatus) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.log(err);
    const error = new Error(ERROR[errorType]);
    error.status = errorStatus;
    next(error);
  }
};