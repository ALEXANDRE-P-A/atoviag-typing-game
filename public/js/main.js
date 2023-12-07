/* ----- page access actiom starts here ----- */
const title = "Welcome to Atoviag Typing Game";

const typedField = document.getElementById("typed");
const untypedField = document.getElementById("untyped");
const textArea = document.getElementById("text_area");

typedField.textContent = "";
untypedField.textContent = title;
typedField.textContent += untypedField.textContent.substring(0,1);
untypedField.textContent = untypedField.textContent.substring(1);
let openingAction = setInterval(_ => {
  typedField.textContent += untypedField.textContent.substring(0,1);
  untypedField.textContent = untypedField.textContent.substring(1);
  if(untypedField.textContent.length === 0){
    clearInterval(openingAction);
    textArea.classList.add("initial-effect");
    let openingActionFinish = setInterval(_ => {
      textArea.classList.remove("initial-effect");
      typedField.textContent = "";
      untypedField.textContent = title;
      clearInterval(openingActionFinish);
    }, 100);
  }
}, 75);
/* ----- page access actiom ends here ----- */

/* ----- initializing variables starts here ----- */
let currentGameType;
// let time = 60;
// let startTime , startType;

/* ----- initializing variables ends here ----- */

/* ----- obtaining the required HTML elements starts here ----- */

/* ----- obtaining the required HTML elements ends here ----- */

const keypresstypeBtn = document.getElementById("keypresstype_btn");
const textinputtypeBtn = document.getElementById("textinputype_btn");
const checkWindow = document.getElementById("check-window");
const checkWindowCloseBtn = document.querySelector(".check-window-close-btn");
const checkItems = document.getElementById("check_items");
const gameStartBtn = document.getElementById("game-start-btn");
const keypressTypeRules = [
  "Use English keyboard only",
  "The time limit is 60 seconds",
  "Invalid string input will not be accepted",
  "All characters entered will be subject to evaluation",
  "Uppercase and lowercase input is sensitive",
  "Game starts after 3 seconds after pressing the button",
  "Score will be displayed after the game ends"
];
const textinputTypeRules = [
  "Use English keyboard only",
  "Copy paste function cannot be used",
  "Confirm your input with the Enter key or Enter button",
  "Confirmation of incorrect string will not be accepted",
  "All characters entered will be subject to evaluation",
  "Uppercase and lowercase input is sensitive",
  "Game starts after 3 seconds after pressing the button",
  "Score will be displayed after the game ends"
]; 
const textList = [
  "I have a pen","Hello World","Typing App","How are you?","Pien Pien","Paohn Paohn",
  "I am sad!","GAL PEACE","NAETA","One Chance","KUSA!","TikTok","Twitter","Instagram",
  "Google","Amazon","Facebook","Apple","YouTube","Orkut","ICQ","UOL",
  "DIOGO","SOPHIA","YASMIM","ISABELLA","ARTHUR","LARISSA","Isabella","We are the best Sisters!",
  "I love candy","Sinderella Man","POP CORN","BTS","Black Pink","AKB48"
];

/* ----- ----- ----- functions starts here ----- ----- ----- */
/* ----- (function) add rules in modal window ----- */
const addRules = rules => {
  for(let i = 0;i < rules.length;i++){
    const list = document.createElement("li");
    list.textContent = rules[i];
    checkItems.appendChild(list);
  }
};

/* ----- (function) remove rules in modal window ----- */
const removeRules = _ => {
  while(checkItems.firstChild)
    checkItems.removeChild(checkItems.firstChild);
};

/* ----- (function) check items effect ----- */
const checkEffect = _ => {
  let itemNumber = 0;
  const checkIntervalTime = 250;

  let makeCheck = setInterval(_ => {
    if(itemNumber === checkItems.children.length - 1){
      setTimeout(_ => {
        gameStartBtn.disabled = false;
        checkWindowCloseBtn.classList.add("show");
      }, checkIntervalTime);
      clearInterval(makeCheck);
    }
    checkItems.children[itemNumber].classList.add("li_effect");
    itemNumber++;
  }, checkIntervalTime);
};

/* ----- (function) check items effect return (when click close button) ----- */
const disableCheckEffect = _ => {
  for(let i = 0;i < checkItems.children.length - 1; i++ )
    checkItems.children[i].classList.remove("li_effect");
  gameStartBtn.disabled = true;
  checkWindowCloseBtn.classList.remove("show");
};

/* ----- (function) game count to start (when click start button) ----- */
const timeLeft = document.getElementById("time_left");

const countToStart = _ => {
  let toStartTime = 3000;
  timeLeft.classList.remove("hidden");
  typedField.textContent = "";
  untypedField.textContent =  "- texts appear here -";
  const btnField = document.querySelector(".btn_field");
  if(gameStartBtn.getAttribute("data-method") === "keypresstype"){
    btnField.innerHTML = `
      <div class="keypress-type-area">
        <span class="material-symbols-outlined">double_arrow</span>
        <input type="text" id="keypress-type-field" class="form-control">
        <span class="material-symbols-outlined">keyboard_double_arrow_left</span>
      <div>
    `;
  } else if(gameStartBtn.getAttribute("data-method") === "textinputtype"){
    btnField.innerHTML = `
      <div style="width: 100%; display: flex; justify-content: center; align-items: center">
        <input type="text" id="text-input-field" class="form-control">
        <button id="text_input_submit_btn">
          <span class="material-symbols-outlined">check</span>
          Check
        </button>
      </div>
    `;
  }
  let intervalToStart = setInterval(_ => {
    timeLeft.textContent = toStartTime/1000;
    if(toStartTime <= 0){
      timeLeft.textContent = "start!";
      clearInterval(intervalToStart);
      setTimeout(_ => {
      }, 500);
      createText();
      document.querySelector("input[type='text']").focus();
    }
    timeLeft.classList.add("counting");
    setTimeout(_ => {
      timeLeft.classList.remove("counting");
    }, 500);
    toStartTime -= 1000;
  }, 1000);
};

/* ----- (function) display random text ----- */
const typedText = document.getElementById("typed");

const createText = _ => {
  typedText.textContent = "";
  let rand = Math.floor(Math.random() * textList.length);
  untypedField.textContent = textList[rand];
  // startTime = time;
  if(currentGameType === "keypresstype"){
    console.log(currentGameType);
  } else if(currentGameType === "textinputytpe"){
    console.log(currentGameType);
    // startType = 0;
  }
};
/* ----- ----- ----- ----- ----- functions ends here ----- ----- ----- ----- ----- */

/* ----- ----- ----- modal window action starts here ----- ----- ----- */
/* ----- keypress type button action ----- */
keypresstypeBtn.addEventListener("click", _ => {
  addRules(keypressTypeRules);
  checkWindow.classList.remove("hidden");
  checkEffect();
  gameStartBtn.setAttribute("data-method", "keypresstype");
});

/* ----- textinput type button action ----- */
textinputtypeBtn.addEventListener("click", _ => {
  addRules(textinputTypeRules);
  checkWindow.classList.remove("hidden");
  checkEffect();
  gameStartBtn.setAttribute("data-method", "textinputtype");
});

/* ----- close button action ----- */
checkWindowCloseBtn.addEventListener("click", _ => {
  checkWindow.classList.add("hidden");
  disableCheckEffect();
  removeRules();
});

/* ----- game start action starts here ----- */
gameStartBtn.addEventListener("click", _ => {
  gameStartBtn.disabled = true;
  checkWindow.classList.add("hidden");
  disableCheckEffect();
  removeRules();
  countToStart();
  currentGameType = gameStartBtn.getAttribute("data-method");
});
/* ----- game start action ends here ----- */
/* ----- ----- ----- modal window action ends here ----- ----- ----- */

/* ----- ----- ----- game start count starts here ----- ----- ----- */

/* ----- ----- ----- game start count ends here ----- ----- ----- */