require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  security: {
    SESSION_SECRET: "SESSION-SECRET-STRING",
    ACCOUNT_LOCK_WINDOW: 30,
    ACCOUNT_LOCK_THRESHOLD: 5,
    ACCOUNT_LOCK_TIME: 60,
    MAX_LOGIN_HISTORY: 30
  }
};