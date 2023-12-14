import { rulesUncheckEffect } from "./rulesuncheckeffect.mjs";
import { removeRules } from "./removerules.mjs";

const checkWindow = document.getElementById("check-window");
const checkWindowCloseBtn = document.querySelector(".check-window-close-btn");

const closeWindow = _ => {
  checkWindow.classList.add("hidden");
  rulesUncheckEffect();
  removeRules();

  checkWindowCloseBtn.removeEventListener("click", closeWindow);
};

export { closeWindow };