/* ----- initializing variables starts here ----- */

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
  let intervalToStart = setInterval(_ => {
    timeLeft.textContent = toStartTime/1000;
    if(toStartTime <= 0){
      clearInterval(intervalToStart);
      setTimeout(_ => {
        timeLeft.classList.add("hidden");
      }, 500);
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
  console.log(gameStartBtn.getAttribute("data-method"));
});
/* ----- game start action ends here ----- */
/* ----- ----- ----- modal window action ends here ----- ----- ----- */

/* ----- ----- ----- game start count starts here ----- ----- ----- */

/* ----- ----- ----- game start count ends here ----- ----- ----- */