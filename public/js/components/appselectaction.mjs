import { addRules } from "./addrules.mjs";
import { rulesCheckEffect } from "./rulescheckeffect.mjs";
import { startAction } from "./startaction.mjs";
import { closeWindow } from "./ruleswindowclosebtnaction.mjs";

const checkWindow = document.getElementById("check-window");
const gameStartBtn = document.getElementById("game-start-btn");
const checkWindowCloseBtn = document.querySelector(".check-window-close-btn");

const appRulesWindowAction = (rules, type) => {
  checkWindow.classList.remove("hidden");
  gameStartBtn.setAttribute("data-method", type);
  addRules(rules);
  rulesCheckEffect();
  gameStartBtn.addEventListener("click", startAction);
  checkWindowCloseBtn.addEventListener("click", closeWindow);
}; 

export { appRulesWindowAction };