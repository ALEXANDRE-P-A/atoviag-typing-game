  const rulesCheck = document.querySelector(".check");
  const gameStartBtn = document.getElementById("game-start-btn");

  const checkAction = _ => {
    if(rulesCheck.textContent === "check_box_outline_blank"){
      rulesCheck.textContent = "check_box";
      rulesCheck.classList.add("checked");
      gameStartBtn.disabled = false;
    } else if(rulesCheck.textContent === "check_box") {
      rulesCheck.textContent = "check_box_outline_blank";
      rulesCheck.classList.remove("checked");
      gameStartBtn.disabled = true;
    } 
  };
  
  export { checkAction };