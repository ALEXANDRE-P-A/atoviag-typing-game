const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("./index.ejs");
});

router.use("/signup", require("./signup.js"));

module.exports = router;