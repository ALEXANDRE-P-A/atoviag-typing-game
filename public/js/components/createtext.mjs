import { textList } from "./textlist.mjs";
import { registStartTypeTime } from "./eachtexttypetime.mjs";
import { getTime } from "./timer.mjs";

let startTime;
let appType;

const gameStartBtn = document.getElementById("game-start-btn");
const timeLeft = document.getElementById("time_left");
const typedField = document.getElementById("typed");
const untypedField = document.getElementById("untyped");

const createText = _ => {
  registStartTypeTime(getTime());
  appType = gameStartBtn.getAttribute("data-method");
  typedField.textContent = "";
  let rand = Math.floor(Math.random()*textList.length);
  untypedField.textContent = textList[rand];
  textList.splice(rand, 1);
  startTime = parseFloat(timeLeft.textContent).toFixed(2);
  
  if(appType === "textinput"){
    document.getElementById("text-input-field").value = "";
  }
};

export { createText };
