import { rulesUncheckEffect } from "./rulesuncheckeffect.mjs";
import { removeRules } from "./removerules.mjs";

const titleMsg = document.getElementById("title_msg");
const checkWindow = document.getElementById("check-window");
const checkWindowCloseBtn = document.querySelector(".check-window-close-btn");

const closeWindow = _ => {
  titleMsg.classList.add("show");
  checkWindow.classList.add("hidden");
  rulesUncheckEffect();
  removeRules();

  checkWindowCloseBtn.removeEventListener("click", closeWindow);
};

export { closeWindow };