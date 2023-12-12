/* ----- initializing variables starts here ----- */
let currentGameType;
let time;
let startTime = 0;
let startType;
let endTime = 0;
let keypressCount = 0;
let score = 0;
let keypressValue = 0;
/* ----- initializing variables ends here ----- */

/* ----- obtaining the required HTML elements starts here ----- */
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

let doneTextList = [];

const titleMsgOne = document.getElementById("title_msg_one");
const titleMsgTwo = document.getElementById("title_msg_two");
const titleMsgs = document.querySelectorAll(".title_msgs");
/* ----- obtaining the required HTML elements ends here ----- */

/* ----- page access action starts here ----- */
const title = "Welcome to Atoviag Typing Game";

const typedField = document.getElementById("typed");
const untypedField = document.getElementById("untyped");
const textArea = document.getElementById("text_area");

typedField.textContent = "";
untypedField.textContent = title;
setTimeout(_ => {
  titleMsgs.forEach(msg => {
    msg.classList.add("show");
  });
  titleMsgOne.textContent = "This is an application that measures your typing speed";
  titleMsgTwo.textContent = "Use English keyboard only";
}, 3000);

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
};

/* ----- (function) game count to start (when click start button) ----- */
const timeLeft = document.getElementById("time_left");

const countToStart = _ => {
  /* ----- remove title messages starts here ----- */
  titleMsgs.forEach(msg => {
    msg.classList.remove("show");
  });
  titleMsgOne.textContent = "";
  titleMsgTwo.textContent = "";
  /* ----- remove title messages ends here ----- */
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
      timeLeft.textContent = (currentGameType === "keypresstype") ? "60" : "75" ;
      clearInterval(intervalToStart);
      setTimeout(_ => {
      }, 500);
      document.querySelector("input[type='text']").focus();
      timer();
      createText();
      if(currentGameType === "keypresstype") // if keypress type add event keyPress
        document.addEventListener("keypress", keyPress);
      else if(currentGameType === "textinputtype"){ // if textinputtype is selected
        document.getElementById("text-input-field").value = ""; // reset the input field
        document.addEventListener("keypress", textInputTypeKeyPress); // if text input type add event textInputTypeKeyPress
        document.getElementById("text_input_submit_btn").addEventListener("click", _ => { // enter button event
          keypressValue = 0; // reset keypressValue
          textInputConfirmedAction();
        });
        document.getElementById("text-input-field").addEventListener("keydown", e => { // add event when enter key pressed
          if(e.keyCode === 13){
            textInputConfirmedAction();
            keypressValue--; // discount enter key press from keypressValue
            keypressCount--; // discount enter key press from keypressCount
            startType--; // discount enter key press from startType
          }
        });
      }
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
  typedText.textContent = ""; // reset the typed field textcontent
  let rand = Math.floor(Math.random() * textList.length); // make a random index number
  untypedField.textContent = textList[rand]; // add in untyped text field a random inde text from text list 
  startTime = parseFloat(time).toFixed(2); // register the time the text appears
  if(currentGameType === "textinputtype"){ // if the game type is text input
    startType = 0; // reset start type counter
    document.getElementById("text-input-field").value = ""; // reset the text input
  }
};

/* ----- (function) count timer ----- */
const timer = _ => {
  time = Math.round(parseFloat(timeLeft.textContent)).toFixed(2);
  let id = setInterval(_ => {
    time -= 0.01;
    timeLeft.textContent = parseFloat(time).toFixed(2);
    if(time <= 0)
      gameOver(id);
  }, 10);
};

/* ----- (function) keypress type typing function starts here ----- */
const keyPress = e => {
  keypressCount++; // count keypress times
  setTimeout(_ => { // reset the input field
    document.getElementById("keypress-type-field").value = "";
  }, 100);
  /* ----- if incorrect input action starts here ----- */
  if(e.key !== untypedField.textContent.substring(0, 1)){
    textArea.classList.add("mistyped"); // add mistyped class(background)
    untypedField.classList.add("mistyped"); // add mistyped class(text color)
    setTimeout(_ => { // remove mistyped class after 0.1seconds
      textArea.classList.remove("mistyped");
      untypedField.classList.remove("mistyped");
    }, 100);
    if(untypedField.textContent.substring(0, 1) === " ") // if the next key is space
      document.querySelector(".alert_text").textContent = "input the space key"; // add in alert msg the textcontent
    else // if the next key is not space
      document.querySelector(".alert_text").textContent = `input the key ${untypedField.textContent.substring(0, 1)}`; // add the next key in alert msg textcontent
    document.getElementById("alert_msg").classList.remove("hidden"); // remove hidden from alert msg
    setTimeout(_=>{ // add hidden in alert msg class agter 1.5seconds
      document.getElementById("alert_msg").classList.add("hidden");
    },1500);
    return; // restart the loop
  }
  /* ----- if incorrect input action ends here ----- */
  score++; // count score
  typedField.textContent += untypedField.textContent.substring(0, 1); // move the first string of untyped field to typed field
  untypedField.textContent = untypedField.textContent.substring(1); // update the untyped field
  /* ----- if untyped field is empty action starts here ----- */
  if(untypedField.textContent === ""){
    textList.forEach((key, index) => { // remove the typed text from text list to avoid its appear again
      if(typedField.textContent == key)
        textList.splice(index, 1);
    });
    endTime = parseFloat(time).toFixed(2); // regist the end time
    doneTextList.push([typedField.textContent, parseFloat(startTime - endTime).toFixed(2)]); // push into done text list the typed text and the typd time
    createText(); // create the next text
  }
  /* ----- if untyped field is empty action ends here ----- */
};
/* ----- (function) keypress type typing function ends here ----- */

/* ----- (function)  text type keypress function starts here ----- */
const textInputTypeKeyPress = e => {
  if(e.key){ // when key is pressed
    keypressValue++; // count keypressValue
    keypressCount++; // count keypressCount
    startType++; // startType
    if(!document.getElementById("text-input-field").blur()) // if text input field is not focused
      document.getElementById("text-input-field").focus(); // focus text input field
  }
};
/* ----- (function)  text type keypress function ends here ----- */

/* ----- (function) game over action ----- */
const gameOver = id => {
  doneTextList.push([typedField.textContent, parseFloat(startTime - 0).toFixed(2)]); // push the last typed text into done text list
  document.removeEventListener("keypress", keyPress); // remove the keypress event listener
  clearInterval(id); // clear the timer
  typedField.textContent = ""; // reset the typed field textcontent
  untypedField.textContent = "Game Over"; // update the untyped textcontent
  document.querySelector("input[type='text']").blur(); // unfocus the text input field
  doneTextList.unshift([keypressCount, score, `${parseFloat(score/keypressCount).toFixed(2)*100}%`]); // shift the done text list
  timeLeft.classList.add("hidden"); // hide the timer
};

/* ----- (function) text input comfirmed action starts here ----- */
const textInputConfirmedAction = _ => {
  let accurancyCheck = untypedField.textContent === document.getElementById("text-input-field").value; // check the input and text accurancy
  let textLength = untypedField.textContent.length; // text length
  let typeCheck = startType >= textLength;
  if(accurancyCheck && typeCheck){
    score += textLength; // count score
    textArea.classList.add("correct_text");
    setTimeout(_ => { // remove mistyped class after 0.1seconds
      textArea.classList.remove("correct_text");
    }, 100);
    createText();
  } else {
    textArea.classList.add("incorrect_text");
    setTimeout(_ => { // remove mistyped class after 0.1seconds
      textArea.classList.remove("incorrect_text");
    }, 100);
    document.getElementById("text-input-field").value = "";
  }
};
/* ----- (function) text input comfirmed action starts here ----- */
/* ----- ----- ----- functions ends here ----- ----- ----- */

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
  keypressCount = 0;
});
/* ----- game start action ends here ----- */
/* ----- ----- ----- modal window action ends here ----- ----- ----- */

/* ----- ----- ----- game start count starts here ----- ----- ----- */

/* ----- ----- ----- game start count ends here ----- ----- ----- */