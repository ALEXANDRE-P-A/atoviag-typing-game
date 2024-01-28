const router = require("express").Router();

const { MySQLClient, sql } = require("../lib/database/client.js");

router.post("/", async (req, res, next) => {
  let transaction;
  let string_to_store = "";

  const test = "test";
  const { 
    id,
    email,
    device,
    date,
    play_type,
    rank,
    keypress_time,
    score,
    type_accurancy,
    gradesArray
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
  console.log(`grades_array : ${gradesArray}`);
  console.log(`type of gradeArray : ${gradesArray}`);
  console.log(`gradesArray Length : ${gradesArray.length}`);
  console.log(`gradesArray first element : ${gradesArray[0]}`);
  console.log(`gradesArray last element : ${gradesArray[gradesArray.length - 1]}`);
  gradesArray.forEach(element => string_to_store += element + ",");
  console.log(`string to store : ${string_to_store}`);

  try{
    transaction = await MySQLClient.beginTransaction();
    transaction.executeQuery(
      await sql("INSERT_RECORD"),
      [id, email, device, play_type, rank, keypress_time, score, type_accurancy, string_to_store]
    );
    await transaction.commit();
  } catch(err){
    await transaction.rollback();
    next(err);
  }
});

module.exports = router;