const router = require("express").Router();
const { MySQLClient, sql } = require("../lib/database/client.js");

router.get("/", async (req, res, next) => {
  try{
    let count = await MySQLClient.executeQuery(await sql("COUNT_TEXTLIST"));
    let rand = Math.floor(Math.random()*(count[0].count) + 1);
    let textlist = await MySQLClient.executeQuery(await sql("SELECT_TEXTLIST_BY_ID"),[rand]);
    res.json(textlist[0].list);
  }catch(err){
    next();
  }

  res.end("Something got wrong... Please contact the administrator");
});

module.exports = router;