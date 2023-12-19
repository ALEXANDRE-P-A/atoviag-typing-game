import { timer } from "./timer.mjs";
import { createText } from "./createtext.mjs";
import { keyPress } from "./keypress.mjs";
import { textInputKeypressAddEventListener, textInputSubmitBtnAddEventListener } from "./textinput.mjs";
import { initializeKeypressCount } from "./keypresscount.mjs";
import { initializeScore } from "./scorecount.mjs";

let start = apptype => {
  initializeKeypressCount();
  initializeScore();
  timer();
  createText();
  if(apptype === "keypress")
    document.addEventListener("keypress", keyPress);
  else if(apptype === "textinput"){
    textInputKeypressAddEventListener();
    textInputSubmitBtnAddEventListener();
  }
};

export { start };