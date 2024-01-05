// import { rulesUncheckEffect } from "./rulesuncheckeffect.mjs";
import { uncheckAction } from "./rulescheck.mjs";
import { removeRules } from "./removerules.mjs";
import { counToStart } from "./counttostart.mjs";

const checkWindow = document.getElementById("check-window");
const gameStartBtn = document.getElementById("game-start-btn");
const itemCheckBox = document.querySelector(".item-check-box");

const startAction = _ => {
  const appType = gameStartBtn.getAttribute("data-method");
  gameStartBtn.disabled = true;
  // rulesUncheckEffect();
  setTimeout(_=>{
    removeRules();
    itemCheckBox.remove();
    uncheckAction();
  },1500);
  checkWindow.classList.add("hidden");
  
  counToStart(appType);
};

export { startAction };