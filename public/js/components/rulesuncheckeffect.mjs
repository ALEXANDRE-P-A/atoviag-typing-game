const checkItems = document.getElementById("check_items");
const gameStartBtn = document.getElementById("game-start-btn");

const rulesUncheckEffect = _ => {
  for(let i = 0;i < checkItems.children.length - 1;i++)
    checkItems.children[i].classList.remove("li_effect");
  gameStartBtn.disabled = true;
};

export { rulesUncheckEffect };