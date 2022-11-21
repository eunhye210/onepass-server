const path = require("path");
const cors = require("cors");
const logger = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const otpRouter = require("./routes/otp");
const usersRouter = require("./routes/users");

const ensureAuthenticated = require("./middlewares/ensureAuthenticated");
const connectMongoDB = require("./configs/connectMongoDB");
connectMongoDB();

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());


app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/otp", otpRouter);
app.use("/users", ensureAuthenticated, usersRouter);

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
