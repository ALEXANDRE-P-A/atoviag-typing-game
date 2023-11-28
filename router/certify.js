const router = require("express").Router();
const { MySQLClient, sql } = require("../lib/database/client.js");

router.get("/", async (req, res, next) => {
  if(!req.query.cookie && !req.query.session){
    res.redirect("/");
    return;
  }
  try {
    let result = await MySQLClient.executeQuery(
      await sql("SELECT_CERTIFY_STATUS"),
      [req.query.cookie, req.query.session]
    );
    if(result.length === 0){
      res.redirect("/");
      return;
    }  
    if(result[0].certifyAt === null){
      await MySQLClient.executeQuery(
        await sql("CERTIFY_ACCT"),
        [req.query.cookie, req.query.session]
      );
    }

  } catch(err) {
    next(err);
  }

  res.render("./certify/certify.ejs");
});

module.exports = router;