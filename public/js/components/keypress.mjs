import { createText } from "./createtext.mjs";
import { keypressPlus } from "./keypresscount.mjs";
import { scorePlus } from "./scorecount.mjs";
import { registEndTypeTime, getTypedTime } from "./eachtexttypetime.mjs";
import { getTime } from "./timer.mjs";
import { storeTextAndTime } from "./storegrades.mjs";

const typedField = document.getElementById("typed");
const untypedField = document.getElementById("untyped");
const textArea = document.getElementById("text_area");
const titleMsg = document.getElementById("title_msg");

const alert = keyName => {
  if(getTime() >= 2){
    if(keyName === " "){
      titleMsg.textContent = "press the space key";
      titleMsg.classList.add("show");
      setTimeout(_ => {
        titleMsg.classList.remove("show");
        titleMsg.textContent = "";
      }, 1500);
    } else {
      titleMsg.textContent = `press the key ${keyName}`;
      titleMsg.classList.add("show");
      setTimeout(_ => {
        titleMsg.classList.remove("show");
        titleMsg.textContent = "";
      }, 1500);
    }
  }
};

const keyPress = e => {
  keypressPlus();
  if(e.key !== untypedField.textContent.substring(0, 1)){
    setTimeout(_ => { // reset the input field
      document.getElementById("keypress-type-field").value = "";
    }, 100);
    alert(untypedField.textContent.substring(0, 1));
    textArea.classList.add("mistyped");
    untypedField.classList.add("mistyped");
    setTimeout(_ => { // remove mistyped class after 0.1seconds
      textArea.classList.remove("mistyped");
      untypedField.classList.remove("mistyped");
    }, 100);
    return;
  }

  scorePlus();
  typedField.textContent += untypedField.textContent.substring(0,1);
  untypedField.textContent = untypedField.textContent.substring(1);
  setTimeout(_ => { // reset the input field
    document.getElementById("keypress-type-field").value = "";
  }, 100);

  if(untypedField.textContent === ""){
    registEndTypeTime(getTime());
    storeTextAndTime(typedField.textContent, getTypedTime());
    createText();
  }
};

export { keyPress };