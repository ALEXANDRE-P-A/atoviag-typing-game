const router = require("express").Router();

router.get("/", (req, res) => {
  if(req.user)
    console.log(req.user.certification);
  res.render("./index.ejs");
});

router.use("/signup", require("./signup.js"));
router.use("/certify", require("./certify.js"));
router.use("/signin", require("./signin.js"));

module.exports = router;