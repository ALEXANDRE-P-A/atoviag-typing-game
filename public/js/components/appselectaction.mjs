import { addRules } from "./addrules.mjs";
import { rulesCheckEffect } from "./rulescheckeffect.mjs";
import { startAction } from "./startaction.mjs";
import { closeWindow } from "./ruleswindowclosebtnaction.mjs";
import { keypressTypeRules, textinputTypeRules } from "./rules.mjs";

const checkWindow = document.getElementById("check-window");
const gameStartBtn = document.getElementById("game-start-btn");
const checkWindowCloseBtn = document.querySelector(".check-window-close-btn");

const keypressTypeWindowAction = _ => {
  checkWindow.classList.remove("hidden");
  gameStartBtn.setAttribute("data-method", "keypress");
  addRules(keypressTypeRules);
  rulesCheckEffect();
  gameStartBtn.addEventListener("click", startAction);
  checkWindowCloseBtn.addEventListener("click", closeWindow);
};

const textInputTypeWindowAction = _ => {
  checkWindow.classList.remove("hidden");
  gameStartBtn.setAttribute("data-method", "textinput");
  addRules(textinputTypeRules);
  rulesCheckEffect();
  gameStartBtn.addEventListener("click", startAction);
  checkWindowCloseBtn.addEventListener("click", closeWindow);
};

export { 
  keypressTypeWindowAction,
  textInputTypeWindowAction
 };