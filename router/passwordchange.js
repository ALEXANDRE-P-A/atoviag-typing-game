const router = require("express").Router();
const tokens = new (require("csrf"))();
const bcrypt = require("bcrypt");
const { MySQLClient, sql } = require("../lib/database/client.js");
const { passchageMail } = require("../lib/mailer/certify_email.js");

router.get("/", async (req, res) => {
  let secret, token;
  let email = "", reemail = "";
  secret = await tokens.secret(); // issuing a secret
  token = tokens.create(secret); // generate secret and token. The secret is kept by the server (session), and the token is returned by the client (cookie)
  req.session.atoviag_changepassrequest = secret; // save secret in session atoviag_changepassrequest
  res.cookie("atoviag_changepassrequest", token); // save token in cookie atoviag_changepassrequest

  res.render("./passwordchange/passwordconsult.ejs", { message: "Please enter your registered email address", email, reemail });
});

router.post("/", (req, res) => {
  let { email, reemail } = req.body;
  res.render("./passwordchange/passwordconsult.ejs", { message: "Please enter your registered email address", email, reemail });
});

router.post("/confirm", async (req, res, next) => {
  let { email, reemail } = req.body;
  let result;

  if(email !== reemail){
    res.render("./passwordchange/passwordconsult.ejs", { message: "", alert: "Please enter email address correctly", email, reemail  });
    return;
  }

  try{
    result = await MySQLClient.executeQuery(
      await sql("CHECK_IF_EMAIL_EXISTS"),
      [email]
    );
    if(result[0].count === 0){
      res.render("./passwordchange/passwordconsult.ejs", { message: "", alert: "Account Not Found", email, reemail  });
      return;
    }
  }catch(err){
    next(err);
  }

  res.render("./passwordchange/emailconfirm.ejs", { email, reemail });
});

router.post("/execute", async (req, res, next) => {
  let { email } = req.body;

  try{
    /* ----- check if account is certified starts here ----- */
    const result = await MySQLClient.executeQuery(
      await sql("SELECT_CERTIFY_STATUS_BY_EMAIL"),
      [email]
    ); 
    if(result[0].certifyAt === null){
      res.render("./signup/completed", { email, date: result[0].createdAt });
      return;
    }
    /* ----- check if account is certified ends here ----- */

    await MySQLClient.executeQuery(
      await sql("UPDATE_COOKIE_AND_SESSION"),
      [req.cookies.atoviag_changepassrequest, req.session.atoviag_changepassrequest, email]
    );
  }catch(err){
    next(err);
  }

  passchageMail(email, req.cookies.atoviag_changepassrequest, req.session.atoviag_changepassrequest, req.get("host"));

  delete req.session.atoviag_changepassrequest; // If the operation is successful, destroy the session
  res.clearCookie("atoviag_changepassrequest"); // If the operation is successful, instruct to discard cookies

  res.redirect(`/passwordchange/mailsent?email=${email}`);
});

router.get("/mailsent", (req, res) => {
  res.render("./passwordchange/mailsent.ejs", { email: req.query.email, date: new Date() });
});

router.get("/passchangeaction", async (req, res, next) => {
  let secret, token;
  secret = await tokens.secret(); // secret issue
  token = tokens.create(secret); // generate secret and token. The secret is kept by the server (session), and the token is returned by the client (cookie)
  req.session.atoviag_changepass = secret; // セッションatoviag_changepassにsecretを保存
  res.cookie("atoviag_changepass", token); // クッキーatoviag_changepassにtokenを保存

  let result;

  try{
    result = await MySQLClient.executeQuery(
      await sql("SELECT_CERTIFY_STATUS"),
      [req.query.cookie, req.query.session]
    );
    if(result.length === 0 || (result[0].last_cookie === null && result[0].last_session === null)){
      res.redirect("/");
      return;
    }
  }catch(err){
    next();
  }

  res.render("./passwordchange/changeform.ejs", { email: result[0].email, message: `Please set a new password for ${result[0].email}`, alert: "", password: "", repassword: "" });
});

router.post("/changeform", (req, res) => {
  const { email, password, repassword } = req.body;
  res.render("./passwordchange/changeform.ejs", { message: "", alert: "", email, password, repassword });
});

router.post("/newpasswordconfirm", (req, res) => {
  const { email, password, repassword } = req.body;

  if(password !== repassword){
    res.render("./passwordchange/changeform.ejs", { message: "", alert: "Check the password", email, password, repassword });
    return;
  }
  
  res.render("./passwordchange/changeconfirm.ejs", { message: "The new password will be update as below" , email, password, repassword, });
});

router.post("/update", async (req, res, next) => {
  const { email, password } = req.body;

  /* ----- hashing password(starts here) ----- */
  let salt = await bcrypt.genSalt(10, "b");
  let hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  /* ----- hashing password(ends here) ----- */

  try{
    await MySQLClient.executeQuery(
      await sql("UPDATE_PASSWORD"),
      [hashedPassword, email]
    );
  
    await MySQLClient.executeQuery(
      await sql("UPDATE_COOKIE_AND_SESSION"),
      [null, null, email]
    );
  }catch(err){
    next(err);
  }

  delete req.session.atoviag_changepass; // if the operation is successful, destroy the session
  res.clearCookie("atoviag_changepass"); // if the operation is successful, instruct to discard cookies.

  res.redirect(`/passwordchange/completed?email=${email}`);
});

router.get("/completed", (req, res) => {
  res.render("./passwordchange/changecompleted.ejs", { email: req.query.email, date: new Date() });
});

module.exports = router;