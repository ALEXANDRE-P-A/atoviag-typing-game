import { getKeypressCount } from "./keypresscount.mjs";
import { getScore } from "./scorecount.mjs";

const titleMsg = document.getElementById("title_msg");
const timeLeft = document.getElementById("time_left");

const gameOver = id => {
  clearInterval(id);

  titleMsg.textContent = "";
  timeLeft.classList.add("hidden");

  console.log(`KeyPress Count : ${getKeypressCount()}`);
  console.log(`Score : ${getScore()}`);
};

export { gameOver };