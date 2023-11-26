const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("./signin/signin.ejs");
});

module.exports = router;