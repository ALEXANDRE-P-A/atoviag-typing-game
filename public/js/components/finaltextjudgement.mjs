import { storeFinalTextAndTime } from "./storegrades.mjs";

const keypressFinalTextJudgement = (typed, untyped, time) => {
  if(typed === "")
    return;

  let toConcat = "";
  for(let i = 0;i < untyped.length;i++){
    toConcat += "_";
  }
  const toStore = typed + toConcat;
  storeFinalTextAndTime(toStore, time, untyped);
};

const textInputFinalTextJudgement = (text, input, time) => {
  if(input === "")
    return;
  
  let toStore = "";
  let untyped = "";
  for(let i = 0;i < text.length;i++){
    if(text[i] === input[i])
      toStore += text[i];
    else {
      toStore += "_";
      untyped += text[i];
    }
  }

  storeFinalTextAndTime(toStore, time, untyped);
};

export { 
  keypressFinalTextJudgement,
  textInputFinalTextJudgement
};