const router = require("express").Router();
const tokens = new (require("csrf"))();
const bcrypt = require("bcrypt");

const { MySQLClient, sql } = require("../lib/database/client.js");
const { mail } = require("../lib/mailer/certify_email.js");


router.get("/", async (req, res) => { // csrfの入口

  let secret, token;
  secret = await tokens.secret(); // secretの発行
  token = tokens.create(secret); // secretとtokenの生成。secretはサーバー保持(セッション)、tokenはクライアント返却(クッキー)
  req.session.atoviag_csrf = secret; // セッションatoviag_csrfにsecretを保存
  res.cookie("atoviag_csrf", token); // クッキーatoviag_csrfにtokenを保存

  let error = "", name = "", email = "", reemail = "", password = "", repassword = "", age = 0, region = 0;
  res.render("./signup/signup.ejs", { error, name, email, reemail, password, repassword, age, region });
});

router.post("/", (req, res) => {
  let { error, name, email, reemail, password, repassword, age, region } = req.body;
  res.render("./signup/signup.ejs", { error, name, email, reemail, password, repassword, age, region });
});

router.post("/confirm", async (req, res, next) => {
  let { name, email, reemail, password, repassword, age, region } = req.body;
  let error = {}, error_count = 0;

  try {
    const result = await MySQLClient.executeQuery(
      await sql("CHECK_IF_EMAIL_EXISTS"),
      [email]
    );
    if(result[0].count != 0){
      error_count++;
      error.duplicate = "This Email address is already used for other account";
    }
  } catch(err) {
    next(err);
  }

  if(email !== reemail){
    error_count++;
    error.email = "Please check the E-mail address";
  }

  if(password !== repassword){
    error_count++;
    error.password = "Please check the password";
  }

  if(age == 0){
    error_count++;
    error.age = "Please select your age";
  }

  if(region == 0){
    error_count++;
    error.region = "Please select your region";
  }

  if(error_count == 0)
    res.render("./signup/confirm.ejs", { name, email, reemail, password, repassword, age, region });
  else
    res.render("./signup/signup.ejs", { error, name, email, reemail, password, repassword, age, region });

  return;
});

router.post("/execute", async (req, res, next) => { // トークンの確認(csrfの出口)、最後に破棄
  let secret = req.session.atoviag_csrf; // セッションからsecretを取り出す
  let token = req.cookies.atoviag_csrf;  // クッキーからtokenを取り出す

  if(tokens.verify(secret, token) === false){ // secretとtokenが正しいかを確認(不正なアクセスの可能性を意味する)
    next(new Error("Invalid Token..."));
    return;
  }

  let { name, email, password, age, region } = req.body;

  /* ----- hashing password(starts here) ----- */
  let salt = await bcrypt.genSalt(10, "b");
  let hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  /* ----- hashing password(ends here) ----- */

  try {
    await MySQLClient.executeQuery(
      await sql("INSERT_NEW_USER"),
      [
        name,
        email,
        hashedPassword,
        age,
        region,
        req.cookies.atoviag_csrf,
        req.session.atoviag_csrf
      ]
    );
  } catch(err) {
    next(err);
  }

  mail(email, req.cookies.atoviag_csrf, req.session.atoviag_csrf, req.get("host"));  

  delete req.session.atoviag_csrf; // if the operation is successful, destroy the session
  res.clearCookie("atoviag_csrf"); // if the operation is successful, instruct to discard cookies.

  res.redirect(`/signup/completed?email=${email}`);
});

router.get("/completed", (req, res) => {
  res.render("./signup/completed.ejs", { email: req.query.email, date: new Date() });
});

module.exports = router;