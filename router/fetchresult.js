const router = require("express").Router();

router.post("/", async (req, res, next) => {
  console.log(req.body);
});

module.exports = router;