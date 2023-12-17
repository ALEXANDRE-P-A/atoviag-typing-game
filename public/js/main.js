import { opening } from "./components/openingaction.mjs";
import { keypressTypeRules, textinputTypeRules } from "./components/rules.mjs";
import { appRulesWindowAction } from "./components/appselectaction.mjs";

let keypressCount = 0;

const keypresstypeBtn = document.getElementById("keypresstype_btn");
const textinputtypeBtn = document.getElementById("textinputype_btn");

/* ----- page access action  ----- */
opening();

/* ----- keypress type button action ----- */
keypresstypeBtn.addEventListener("click",_ => { appRulesWindowAction(keypressTypeRules, "keypress") });

/* ----- textinput type button action ----- */
textinputtypeBtn.addEventListener("click",_ => { appRulesWindowAction(textinputTypeRules, "textinput") });

/* ----- (function) rank score ----- */
const rank = (keys, score) => {
  let text;
  const typeAccurancy = Math.floor(Number(score/keys*100));
  if(score < 100)
    text = `Your rank is C. You are ${100 - score} characters away from B rank`;
  else if(score < 180)
    text = `Your rank is B. You are ${180 - score} characters away from A rank`;
  else if(score < 250)
    text = `Your rank is A. You are ${250 - score} characters away from S rank`;
  else if(score >= 250)
    text = "Your rank is S. Congratulations!";

  return `
    You hit ${score} 
    characters.<br>${text}
    <br>Your type accurancy is ${typeAccurancy}%
  `;
};

/* ----- ----- ----- functions ends here ----- ----- ----- */