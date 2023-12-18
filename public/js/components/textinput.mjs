import { createText } from "./createtext.mjs";
import { addTypedTextLength } from "./scorecount.mjs";
import { getTime } from "./timer.mjs";
import { registEndTypeTime, getTypedTime } from "./eachtexttypetime.mjs";
import { storeTextAndTime, getGrades } from "./storegrades.mjs";
import { keypressPlus } from "./keypresscount.mjs";

let typeCounter = 0;

const untypedField = document.getElementById("untyped");
const textArea = document.getElementById("text_area");
const titleMsg = document.getElementById("title_msg");

const alert = inputText => {
  if(getTime() >= 2){
    titleMsg.textContent = `✖ ${inputText}`;
    titleMsg.classList.add("show");
    setTimeout(_ => {
      titleMsg.classList.remove("show");
      titleMsg.textContent = "";
    }, 1500);
  }
};

const textInputConfirmedAction = typeCounter => {
  let accurancyCheck = untypedField.textContent === document.getElementById("text-input-field").value;
  let textLength = untypedField.textContent.length;
  let typeCheck = typeCounter >= textLength;
  if(accurancyCheck && typeCheck){
    registEndTypeTime(getTime());
    storeTextAndTime(untypedField.textContent, getTypedTime());
    addTypedTextLength(textLength);
    textArea.classList.add("correct_text");
    setTimeout(_ => {
      textArea.classList.remove("correct_text");
    }, 100);
    createText();
  } else {
    textArea.classList.add("incorrect_text");
    setTimeout(_ => {
      textArea.classList.remove("incorrect_text");
    }, 100);
    alert(document.getElementById("text-input-field").value);
    document.getElementById("text-input-field").value = "";
  }
};

const textInputKeypressAddEventListener = _ => {
  document.addEventListener("keypress", e => {
    if(e.keyCode === 13){
      textInputConfirmedAction(typeCounter);
      typeCounter = 0;
      return;
    }
    keypressPlus();
    typeCounter++;
  });
};

const textInputSubmitBtnAddEventListener = _ => {
  document.getElementById("text_input_submit_btn").addEventListener("click", _ => { 
    textInputConfirmedAction(typeCounter)
    typeCounter = 0;
  });
};

const textInputKeypressRemoveEventListener = _ => {
  document.addEventListener("keypress", e => {
    if(e.keyCode === 13){
      textInputConfirmedAction(typeCounter);
      typeCounter = 0;
      return;
    }
    keypressPlus();
    typeCounter++;
  });
};

const textInputSubmitBtnRemoveEventListener = _ => {
  document.getElementById("text_input_submit_btn").addEventListener("click", _ => { 
    textInputConfirmedAction(typeCounter)
    typeCounter = 0;
  });
};

export { 
  textInputConfirmedAction,
  textInputKeypressAddEventListener,
  textInputSubmitBtnAddEventListener,
  textInputKeypressRemoveEventListener,
  textInputSubmitBtnRemoveEventListener
};