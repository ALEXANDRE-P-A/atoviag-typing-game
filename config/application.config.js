require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  security: {
    SESSION_SECRET: "SESSION-SECRET-STRING"
  }
};