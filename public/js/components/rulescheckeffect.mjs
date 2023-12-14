const checkIntervalTime = 250;

const checkItems = document.getElementById("check_items");
const gameStartBtn = document.getElementById("game-start-btn");

const rulesCheckEffect = _ => {
  let itemNumber = 0;
  let makeCheck = setInterval(_ => {
    if(itemNumber === checkItems.children.length - 1){      
      gameStartBtn.disabled = false;
      clearInterval(makeCheck);
    }
    checkItems.children[itemNumber].classList.add("li_effect");
    itemNumber++;
  }, checkIntervalTime);
};

export { rulesCheckEffect };