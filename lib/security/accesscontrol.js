const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { MySQLClient, sql } = require("../database/client.js");
const bcrypt = require("bcrypt");
const moment = require("moment");
const PRIVILEGE = { // authority
  NORMAL: "normal"// normal privileges
};
const {
//   ACCOUNT_LOCK_WINDOW,
  ACCOUNT_LOCK_THRESHOLD,
  ACCOUNT_LOCK_TIME,
  MAX_LOGIN_HISTORY
} = require("../../config/application.config.js").security;

const LOGIN_STATUS = {
  SUCCESS: 1,
  FAILURE: 0
};

let initialize, authenticate, authorize;

passport.serializeUser((user, done) => { // Processing that is retained in the session when responding from the server to the client
  done(null, user); // I won't do anything this time
});

passport.deserializeUser((user, done) => { // The process of restoring information from the session when requesting from the client to the server.
  done(null, user); // I won't do anything this time
});

passport.use( // Set the authentication method
  "local-strategy", // Key to call the authentication method used for login processing
  new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, async (req, email, password, done) => {  // Specific implementation of authentication method (main process)
    let results, user;
    let now =  new Date();

    /* ----- take the user info by email (starts here) ----- */
    try {
      results = await MySQLClient.executeQuery(
        await sql("SELECT_USER_BY_EMAIL"),
        [email]
      );
    } catch(err) {
      return done(err);
    }
    /* ----- take the user info by email (ends here) ----- */

    /* ----- check if account exists (starts here) ----- */
    if(results.length === 0) // if does not exist, message
      done(null, false, req.flash("message", "Account Not Found"));
    else { // if account exists

      /* ----- store user info (starts here) ----- */
      user = {
        id: results[0].id,
        name: results[0].username,
        email: results[0].email,
        created_date: results[0].createdAt,
        certification: results[0].certifyAt,
        permissions: [PRIVILEGE.NORMAL]
      };
      /* ----- store user info (ends here) ----- */

      /* ----- check if password matches (starts here) ----- */
        if(!await bcrypt.compare(password, results[0].password)){

          /* ----- insert failure login history (starts here) ----- */
          await MySQLClient.executeQuery(
            await sql("INSERT_LOGIN_HISTORY"),
            [results[0].id, new Date(), 0]
          );
          /* ----- insert failure login history (ends here) ----- */

          /* ----- count account failure login history (starts here) ----- */
          let cnt = await MySQLClient.executeQuery(
            await sql("COUNT_LOGIN_HISTORY"),
            [user.id, LOGIN_STATUS.FAILURE]
          );
          /* ----- count account failure login history (ends here) ----- */

          /* ----- lock account if need (starts here) ----- */
          if(cnt[0].count > ACCOUNT_LOCK_THRESHOLD){
            await MySQLClient.executeQuery(
              await sql("UPDATE_ACCOUNT_LOCK_STATUS"),
              [now, user.id]
            );

            /* ----- delete login failures (starts here) ----- */
            await MySQLClient.executeQuery(
              await sql("DELETE_LOGIN_FAILURES"),
              [user.id, LOGIN_STATUS.FAILURE]
            );
            /* ----- delete login failures (starts here) ----- */
          }
          /* ----- lock account if need (ends here) ----- */

          done(null, false, req.flash("message", "Invalid email or password")); // if does not exist, message

        } else { // if exists

          /* ----- check if account is locked (starts here) ----- */
          if(results[0].locked && 
            moment(now).isSameOrBefore(
              moment(results[0].locked).add(ACCOUNT_LOCK_TIME, "minutes")
            )){
            return done(null, false, req.flash("message", `Account is locked. Please try again after ${moment(results[0].locked).add(ACCOUNT_LOCK_TIME + 540, "minutes").format("MMMM Do YYYY, hh:mm:ss a")}`));
          }
          /* ----- check if account is locked (ends here) ----- */

          /* ----- insert success login history (starts here) ----- */
          await MySQLClient.executeQuery(
            await sql("INSERT_LOGIN_HISTORY"),
            [results[0].id, new Date(), LOGIN_STATUS.SUCCESS]
          );
          /* ----- insert success login history (ends here) ----- */

          /* ----- delete excess success login history (starts here) ----- */
            await MySQLClient.executeQuery(
              await sql("DELETE_EXCESS_ACCOUNT_HISTORY"),
              [user.id, user.id, MAX_LOGIN_HISTORY]
            );
          /* ----- delete excess success login history (ends here) ----- */

           /* ----- delete login failures (starts here) ----- */
           await MySQLClient.executeQuery(
            await sql("DELETE_LOGIN_FAILURES"),
            [user.id, LOGIN_STATUS.FAILURE]
          );
          /* ----- delete login failures (starts here) ----- */

          /* ----- regenerate session and login (starts here) ----- */
          req.session.regenerate(err => { // recreating session after login
            if(err) // If an error occurs, return with an error
              done(err);  
            else
              done(null, user); // -> authenticate() -> serializeUser()
          });
          /* ----- regenerate session and login (ends here) ----- */
          
        }
      /* ----- check if password matches (ends here) ----- */

    }
    /* ----- check if account exists (ends here) ----- */
  })
);

initialize = _ => {
  return [
    passport.initialize(),
    passport.session(),
    (req, res, next) => { // middleware that makes it easier to check login status
      if(req.user) // object that stores login state
        res.locals.user = req.user; // handing over user information
      next();
    }
  ];
};

authenticate = _ => { // initializing middleware for login processing
  return passport.authenticate(
    "local-strategy",
    {
      successRedirect: "/", // redirect destination on success
      failureRedirect: "/signin" // redirect destination in case of failure
    }
  );
};

authorize = privilege => {
  return (req, res, next) => {
    if(req.authenticate() &&
    (req.user.permissions || []).indexOf(privilege) >= 0)
      next();
    else
      res.redirect("/signin");
  };
};

module.exports = {
  initialize,
  authenticate,
  authorize,
  PRIVILEGE
};