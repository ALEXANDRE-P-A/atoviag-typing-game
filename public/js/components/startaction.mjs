import { rulesUncheckEffect } from "./rulesuncheckeffect.mjs";
import { removeRules } from "./removerules.mjs";
import { counToStart } from "./counttostart.mjs";

const checkWindow = document.getElementById("check-window");
const gameStartBtn = document.getElementById("game-start-btn");

const startAction = _ => {
  const appType = gameStartBtn.getAttribute("data-method");
  gameStartBtn.disabled = true;
  rulesUncheckEffect();
  removeRules();
  checkWindow.classList.add("hidden");
  counToStart(appType);
};

export { startAction };