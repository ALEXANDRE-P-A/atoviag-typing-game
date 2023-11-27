const router = require("express").Router();

router.get("/", (req, res) => {
  if(req.user){
    if(req.user.certification == null){
      res.render("./signup/completed.ejs", { email: req.user.email });
    }
  }

  res.render("./index.ejs");
});

router.use("/signup", require("./signup.js"));
router.use("/certify", require("./certify.js"));
router.use("/signin", require("./signin.js"));

module.exports = router;