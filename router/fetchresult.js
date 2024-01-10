const router = require("express").Router();

router.post("/", async (req, res, next) => {
  const { 
    id,
    email,
    device,
    date,
    play_type,
    rank,
    keypress_time,
    score,
    type_accurancy
  } = req.body;

  console.log(`id : ${id}`);
  console.log(`email : ${email}`);
  console.log(`device : ${device}`);
  console.log(`date : ${date}`);
  console.log(`play type : ${play_type}`);
  console.log(`rank : ${rank}`);
  console.log(`keypress_time : ${keypress_time}`);
  console.log(`score : ${score}`);
  console.log(`type_accurancy : ${type_accurancy}`);
});

module.exports = router;