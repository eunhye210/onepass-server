const path = require("path");
const cors = require("cors");
const logger = require("morgan");
const express = require("express");

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const otpRouter = require("./routes/otp");
const usersRouter = require("./routes/users");

const connectMongoDB = require("./configs/connectMongoDB");
connectMongoDB();
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/otp", otpRouter);
// sessionKey 확인 로직 들어가기
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
