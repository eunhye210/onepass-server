const path = require("path");
const cors = require("cors");
const logger = require("morgan");
const express = require("express");

const signupRouter = require("./routes/signup");
const usersRouter = require("./routes/users");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/signup", signupRouter);
app.use("/users", usersRouter);

app.use(function (req, res, next) {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ errorMessage: err.message });
});

module.exports = app;
