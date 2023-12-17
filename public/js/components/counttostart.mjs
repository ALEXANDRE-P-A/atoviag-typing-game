import { start } from "./start.mjs";

const titleMsg = document.getElementById("title_msg");
const timeLeft = document.getElementById("time_left");
const typedField = document.getElementById("typed");
const untypedField = document.getElementById("untyped");
const btnField = document.querySelector(".btn_field");

const counToStart = (appType) => {
  let toStartTime = 3000;

  titleMsg.textContent = "";

  timeLeft.classList.remove("hidden");

  typedField.textContent = "";
  untypedField.textContent =  "text displays here";

  if(appType === "keypress"){
    btnField.innerHTML = `
      <div class="keypress-type-area">
      <span class="material-symbols-outlined">keyboard_double_arrow_right</span>
      <input type="text" id="keypress-type-field" class="form-control">
      <span class="material-symbols-outlined">keyboard_double_arrow_left</span>
      <div>
    `;
  } else if(appType === "textinput"){
    btnField.innerHTML = `
      <div style="width: 100%; display: flex; justify-content: center; align-items: center">
        <input type="text" id="text-input-field" class="form-control">
        <button type="submit" id="text_input_submit_btn">
          <span class="material-symbols-outlined">check</span>
          Check
        </button>
      </div>
    `;
  }

  let intervalToStart = setInterval(_ => {
    document.querySelector("input[type='text']").focus();

    timeLeft.textContent = toStartTime/1000;

    if(toStartTime !== 0){
      timeLeft.classList.add("counting");
      setTimeout(_ => {
        timeLeft.classList.remove("counting");
      }, 500);
    } else if(toStartTime <= 0){
      clearInterval(intervalToStart);
      start(appType);
    }

    toStartTime -= 1000;
    
  }, 1000);
};

export { counToStart };