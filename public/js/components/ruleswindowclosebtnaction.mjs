// import { rulesUncheckEffect } from "./rulesuncheckeffect.mjs";
import { removeRules } from "./removerules.mjs";
import { uncheckAction } from "./rulescheck.mjs";

const titleMsg = document.getElementById("title_msg");
const checkWindow = document.getElementById("check-window");
const checkWindowCloseBtn = document.querySelector(".check-window-close-btn");

const closeWindow = _ => {
  setTimeout(_=>{
    removeRules();
    uncheckAction();
  },500);
  titleMsg.classList.add("show");
  checkWindow.classList.add("hidden");
  // rulesUncheckEffect();
  checkWindowCloseBtn.removeEventListener("click", closeWindow);
};

export { closeWindow };