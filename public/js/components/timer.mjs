import { gameOver } from "./gameover.mjs";

let apptype;
let time;

const gameStartBtn = document.getElementById("game-start-btn");
const timeLeft = document.getElementById("time_left");

const timer = _ => {
  apptype = gameStartBtn.getAttribute("data-method");

  if(apptype === "keypress"){
    time = Math.round(parseFloat(60)).toFixed(2);
  } else if(apptype === "textinput"){
    time = Math.round(parseFloat(75)).toFixed(2);
  }
  let id = setInterval(_=>{
    time -= 0.01;
    timeLeft.textContent = parseFloat(time).toFixed(2);
    if(time <= 0)
      gameOver(id);
  }, 10);
};

const getTime = _ => {
  return parseFloat(time).toFixed(2);
};

export { timer, getTime };
