/* ----- initializing variables starts here ----- */

/* ----- initializing variables ends here ----- */

/* ----- obtaining the required HTML elements starts here ----- */

/* ----- obtaining the required HTML elements ends here ----- */

/* ----- ----- ----- modal window action starts here ----- ----- ----- */
const keypresstypeBtn = document.getElementById("keypresstype_btn");
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

/* ----- add rules in modal window ----- */
const addRules = rules => {
  for(let i = 0;i < rules.length;i++){
    const list = document.createElement("li");
    list.textContent = rules[i];
    checkItems.appendChild(list);
  }
};

/* ----- remove rules in modal window ----- */
const removeRules = _ => {
  console.log(checkItems.children.length);
  while(checkItems.firstChild)
    checkItems.removeChild(checkItems.firstChild);
};

/* ----- check items effect ----- */
const checkEffect = _ => {
  let itemNumber = 0;
  const checkIntervalTime = 500;

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

/* ----- check items effect return(when click close button) ----- */
const disableCheckEffect = _ => {
  for(let i = 0;i < checkItems.children.length - 1; i++ )
    checkItems.children[i].classList.remove("li_effect");
  gameStartBtn.disabled = true;
  checkWindowCloseBtn.classList.remove("show");
};

/* ----- keypress type button action ----- */
keypresstypeBtn.addEventListener("click", _ => {
  addRules(keypressTypeRules);
  checkWindow.classList.remove("hidden");
  checkEffect();
});

/* ----- close button action ----- */
checkWindowCloseBtn.addEventListener("click", _ => {
  checkWindow.classList.add("hidden");
  disableCheckEffect();
  removeRules();
});
/* ----- ----- ----- modal window action ends here ----- ----- ----- */

/* ----- game start action starts here ----- */
gameStartBtn.addEventListener("click", _ => {
  gameStartBtn.disabled = true;
  checkWindow.classList.add("hidden");
  disableCheckEffect();
  removeRules();
});
/* ----- game start action ends here ----- */