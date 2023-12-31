import { getKeypressCount } from "./keypresscount.mjs";
import { getScore } from "./scorecount.mjs";
import { keyPress } from "./keypress.mjs";
import { textInputKeypressRemoveEventListener, textInputSubmitBtnRemoveEventListener } from "./textinput.mjs";
import { rank, getRank } from "./rank.mjs";
import { keypressFinalTextJudgement, textInputFinalTextJudgement } from "./finaltextjudgement.mjs";
import { getStartTypeTime } from "./eachtexttypetime.mjs";
import { storeRank, concatUserGrades, getUserRecord } from "./storegrades.mjs";
import { showScore } from "./showscore.mjs";

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

  if(gameStartBtn.getAttribute("data-method") === "keypress"){
    document.removeEventListener("keypress", keyPress);
    keypressFinalTextJudgement(
      typedField.textContent,
      untypedField.textContent,
      getStartTypeTime()
    );
  } else if(gameStartBtn.getAttribute("data-method") === "textinput"){
    textInputKeypressRemoveEventListener();
    textInputSubmitBtnRemoveEventListener();
    textInputFinalTextJudgement(
      untypedField.textContent,
      document.querySelector("input[type='text']").value,
      getStartTypeTime()
    );
  }

  typedField.textContent = "";
  untypedField.textContent = "";

  btnField.innerHTML = `
    <button onclick="location.href='/'">
      <span class="btn_inside">
        <span class="material-symbols-outlined">replay</span>
        <span class="btn_text">&nbsp;Replay</span>
      </span>
    </button>
  `;

  untypedField.textContent = "Game Over";
  titleMsg.classList.add("final");
  titleMsg.innerHTML = `
    ${rank(getKeypressCount(), getScore())}<br>
    <span id="see-details-btn">Click here to see score details<span>
  `;

  storeRank(
    getRank(getScore()),
    getKeypressCount(),
    getScore(),
    `${Math.floor(Number(getScore()/getKeypressCount()*100))}%`
  );

  concatUserGrades();

  showScore();
};

export { gameOver };