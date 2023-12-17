import { timer } from "./timer.mjs";
import { createText } from "./createtext.mjs";
import { keyPress } from "./keypress.mjs";
import { textInputConfirmedAction } from "./textinput.mjs";
import { initializeKeypressCount, keypressPlus } from "./keypresscount.mjs";
import { initializeScore } from "./scorecount.mjs";

let typeCounter = 0;

let start = apptype => {
  initializeKeypressCount();
  initializeScore();
  timer();
  createText();
  if(apptype === "keypress")
    document.addEventListener("keypress", keyPress);
  else if(apptype === "textinput"){
    document.getElementById("text_input_submit_btn").addEventListener("click", _ => { 
      textInputConfirmedAction(typeCounter)
      typeCounter = 0;
    });
    document.addEventListener("keypress", e => {
      if(e.keyCode === 13){
        textInputConfirmedAction(typeCounter);
        typeCounter = 0;
        return;
      }
      keypressPlus();
      typeCounter++;
    });
  }
};

export { start };