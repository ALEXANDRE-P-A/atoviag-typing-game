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