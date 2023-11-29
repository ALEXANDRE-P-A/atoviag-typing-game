const router = require("express").Router();
const { 
  authenticate,
  // authorize,
  // PRIVILEGE
} = require("../lib/security/accesscontrol.js");

router.get("/", (req, res) => {
  res.render("./signin/signin.ejs");
});

router.post("/", authenticate());

router.get("/logout", (req, res, next) => {
  req.logout(err => {
    if(err)
      return next();
    res.redirect("/");
    return;
  });
});

module.exports = router;