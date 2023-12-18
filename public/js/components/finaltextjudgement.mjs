import { storeTextAndTime } from "./storegrades.mjs";

const keypressFinalTextJudgement = (typed, untyped, time) => {
  let toConcat = "";
  for(let i = 0;i < untyped.length;i++){
    toConcat += "_";
  }
  const toStore = typed + toConcat;
  storeTextAndTime(toStore, time);
};

const textInputFinalTextJudgement = (text, input, time) => {
  console.log(`text : ${text}`);
  console.log(`input : ${input}`);
  console.log(`time : ${time}`);
};

export { 
  keypressFinalTextJudgement,
  textInputFinalTextJudgement
};