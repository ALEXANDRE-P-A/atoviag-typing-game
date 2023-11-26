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

module.exports = router;