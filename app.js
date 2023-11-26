const appconfig = require("./config/application.config.js");
const dbconfig = require("./config/mysql.config.js");
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("./lib/log/logger.js");
const applicationlogger = require("./lib/log/applicationlogger.js");
const accesslogger = require("./lib/log/accesslogger.js");
const cookie = require("cookie-parser");
const session = require("express-session");
const MySqlStore = require("express-mysql-session")(session);
const accesscontrol = require("./lib/security/accesscontrol.js");
const flash = require("connect-flash");

// express settings
const app = express();
app.set("view engine", "ejs");
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));

// set middleware for cookie
app.use(cookie());
app.use(session({
  store: new MySqlStore({
    host: dbconfig.HOST,
    port: dbconfig.PORT,
    user: dbconfig.USERNAME,
    password: dbconfig.PASSWORD,
    database: dbconfig.DATABASE
  }),
  secret: appconfig.security.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  name: "atoviag_sid"
}));
app.use(flash());

// passport initialization
app.use(...accesscontrol.initialize());

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
app.listen(appconfig.PORT, _ => {
  logger.application.info(`Application listening at http://127.0.0.1:${appconfig.PORT}`);
});