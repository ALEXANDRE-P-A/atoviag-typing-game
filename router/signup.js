const router = require("express").Router();

router.get("/", (req, res) => {
  let error = "", name = "", email = "", reemail = "", password = "", repassword = "", age = 0, region = 0;
  res.render("./signup/signup.ejs", { error, name, email, reemail, password, repassword, age, region });
});

router.post("/", (req, res) => {
  let { error, name, email, reemail, password, repassword, age, region } = req.body;
  res.render("./signup/signup.ejs", { error, name, email, reemail, password, repassword, age, region });
});

router.post("/confirm", (req, res) => {
  let { name, email, reemail, password, repassword, age, region } = req.body;
  let error = {}, error_count = 0;

  if(email !== reemail){
    error_count++;
    error.email = "Email does not match";
  }

  if(password !== repassword){
    error_count++;
    error.password = "Password does not match";
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
    res.render("./signup/confirm.ejs", { name, email, password, age, region });
  else
    res.render("./signup/signup.ejs", { error, name, email, reemail, password, repassword, age, region });

  return;
});

module.exports = router;