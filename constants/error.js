const ERROR = {
  NO_EMAIL: "Email is required.",
  NO_PASSWORD: "Password is required.",
  INVALID_EMAIL: "Invalid email address.",
  INVALID_PASSWORD:
    "Password must contain letters and numbers and be at least 8 chars long.",
  PASSWORDS_NOT_MATCH: "Passwords do not match.",
  EMAIL_DUPLICATE: "This email is already taken. Please try another.",
  FAIL_LOGIN: "Incorrect password.",
  NO_ACCOUNT: "No account found.",
  SERVER_ERROR: "Internal server error. Please try again",
  AUTH_ERROR: "Authentication error",
};

module.exports = ERROR;
