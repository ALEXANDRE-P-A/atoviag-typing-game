const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("./lib/log/logger.js");
const applicationlogger = require("./lib/log/applicationlogger.js");
const accesslogger = require("./lib/log/accesslogger.js");

const PORT = process.env.PORT || 3000;

// express settings
const app = express();
app.set("view engine", "ejs");
app.disable("x-powered-by");

// static resources
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));

// set access logger
app.use(accesslogger());

// dynamic resources
app.use("/", require("./router/index.js"));

// set application logger
app.use(applicationlogger());

// execute application
app.listen(PORT, _ => {
  logger.application.info(`Application listening at http://127.0.0.1:${PORT}`);
});