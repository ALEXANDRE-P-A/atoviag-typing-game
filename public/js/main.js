import { opening } from "./components/openingaction.mjs";
import { keypressTypeWindowAction, textInputTypeWindowAction } from "./components/appselectaction.mjs";

const header = document.querySelector("header");
const keypresstypeBtn = document.getElementById("keypresstype_btn");
const textinputtypeBtn = document.getElementById("textinputype_btn");
const titleMsg = document.getElementById("title_msg");

/* ----- page access action  ----- */
opening();

/* ----- keypress type button action ----- */
keypresstypeBtn.addEventListener("click", keypressTypeWindowAction);

/* ----- textinput type button action ----- */
textinputtypeBtn.addEventListener("click", textInputTypeWindowAction);

/* ----- Processing to prevent the main part 
        of the screen from being hidden when 
        displaying the keyboard on a smartphone ----- */
visualViewport.onresize = function () {
  if(visualViewport.height < document.documentElement.clientHeight)
    header.classList.add("onkeyboard");
  else 
    header.classList.remove("onkeyboard");
};

/* ----- Keyboard judgment ----- */
window.addEventListener('keydown', e => {
  if(e.isComposing || e.key === 'Process' || e.keyCode === 229){  
    document.getElementById("keypress-type-field").value = "";
    titleMsg.textContent = "use english keyboard only";
    titleMsg.classList.add("show");
    setTimeout(_ => {
      titleMsg.classList.remove("show");
      titleMsg.textContent = "";
    }, 1500);
  }
});