/* ----- initializing variables starts here ----- */

/* ----- initializing variables ends here ----- */

/* ----- obtaining the required HTML elements starts here ----- */

/* ----- obtaining the required HTML elements ends here ----- */

/* ----- modal window action starts here ----- */
const keypresstypeBtn = document.getElementById("keypresstype_btn");
const keypressCheckWindow = document.getElementById("keypress-check-window");
const keypressCheckWindowCloseBtn = document.querySelector(".keypress-check-window-close-btn");
const checkItems = document.getElementById("check_items");
const gameStartBtn = document.getElementById("game-start-btn");

const checkEffect = _ => {
  let itemNumber = 0;
  const checkIntervalTime = 500;

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

const disableCheckEffect = _ => {
  for(let i = 0;i < checkItems.children.length; i++ )
    checkItems.children[i].classList.remove("li_effect");
  gameStartBtn.disabled = true;
};

keypresstypeBtn.addEventListener("click", _ => {
  keypressCheckWindow.classList.remove("hidden");
  checkEffect();
});

keypressCheckWindowCloseBtn.addEventListener("click", _ => {
  keypressCheckWindow.classList.add("hidden");
  disableCheckEffect();
});
/* ----- modal window action ends here ----- */
