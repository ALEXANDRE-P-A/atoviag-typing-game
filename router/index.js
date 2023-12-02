const router = require("express").Router();
const { MySQLClient, sql } = require("../lib/database/client.js");

router.get("/", async (req, res, next) => {
  if(req.user){
    try {
      const result = await MySQLClient.executeQuery(
        await sql("SELECT_USER_BY_EMAIL"),
        [req.user.email]
      );
      if(result[0].certifyAt == null){
        res.render("./signup/completed.ejs", { email: req.user.email, date: req.user.created_date });
        return;
      }
    } catch(err) {
      console.log(err);
      next();
    }
  }

  res.render("./index.ejs");
});

router.use("/signup", require("./signup.js"));
router.use("/certify", require("./certify.js"));
router.use("/signin", require("./signin.js"));

module.exports = router;