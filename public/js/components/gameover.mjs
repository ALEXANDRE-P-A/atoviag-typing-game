import { getKeypressCount } from "./keypresscount.mjs";
import { getScore } from "./scorecount.mjs";
import { keyPress } from "./keypress.mjs";
import { textInputKeypressRemoveEventListener, textInputSubmitBtnRemoveEventListener } from "./textinput.mjs";
import { rank } from "./rank.mjs";

const titleMsg = document.getElementById("title_msg");
const timeLeft = document.getElementById("time_left");
const typedField = document.getElementById("typed");
const untypedField = document.getElementById("untyped");
const gameStartBtn = document.getElementById("game-start-btn");
const btnField = document.querySelector(".btn_field");

const gameOver = id => {
  document.querySelector("input[type='text']").blur();

  clearInterval(id);

  titleMsg.textContent = "";
  timeLeft.classList.add("hidden");

  typedField.textContent = "";
  untypedField.textContent = "";

  if(gameStartBtn.getAttribute("data-method") === "keypress"){
    document.removeEventListener("keypress", keyPress);
  } else if(gameStartBtn.getAttribute("data-method") === "textinput"){
    textInputKeypressRemoveEventListener();
    textInputSubmitBtnRemoveEventListener();
  }

  btnField.innerHTML = `
    <button onclick="location.href='#'">
      <span class="btn_inside">
        <span class="material-symbols-outlined">replay</span>
        <span class="btn_text">&nbsp;Replay</span>
      </span>
    </button>
  `;

  untypedField.textContent = "Game Over";
  titleMsg.classList.add("final");
  titleMsg.innerHTML = `${rank(getKeypressCount(), getScore())}`;
};

export { gameOver };