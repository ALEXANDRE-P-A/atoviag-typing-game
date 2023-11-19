const router = require("express").Router();

router.get("/", (req, res) => {
  let name = "", email = "", reemail = "", password = "", repassword = "", region = "";
  res.render("./signup/signup.ejs", { name, email, reemail, password, repassword, region });
});

router.post("/confirm", (req, res) => {
  let { name, email, reemail, password, repassword, region } = req.body;
  res.render("./signup/confirm.ejs", { name, email, reemail, password, repassword, region });
});

module.exports = router;