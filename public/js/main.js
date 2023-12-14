import { opening } from "./components/openingaction.mjs";
import { keypressTypeRules, textinputTypeRules } from "./components/rules.mjs";
import { appRulesWindowAction } from "./components/appselectaction.mjs";


const keypresstypeBtn = document.getElementById("keypresstype_btn");
const textinputtypeBtn = document.getElementById("textinputype_btn");

/* ----- page access action  ----- */
opening();

/* ----- keypress type button action ----- */
keypresstypeBtn.addEventListener("click",_ => { appRulesWindowAction(keypressTypeRules, "keypress") });

/* ----- textinput type button action ----- */
textinputtypeBtn.addEventListener("click",_ => { appRulesWindowAction(textinputTypeRules, "textinput") });


/* ----- initializing variables starts here ----- */
let currentGameType;
let time;
let startTime = 0;
let startType;
let endTime = 0;
let keypressCount = 0;
let score = 0;
let btnField;
/* ----- initializing variables ends here ----- */

/* ----- obtaining the required HTML elements starts here ----- */
const typedField = document.getElementById("typed");
const untypedField = document.getElementById("untyped");
const textArea = document.getElementById("text_area");
const textList = [
  "I have a pen","Hello World","Typing App","How are you?","Pien Pien","Paohn Paohn",
  "I am sad!","GAL PEACE","NAETA","One Chance","KUSA!","TikTok","Twitter","Instagram",
  "Google","Amazon","Facebook","Apple","YouTube","Orkut","ICQ","UOL",
  "DIOGO","SOPHIA","YASMIM","ISABELLA","ARTHUR","LARISSA","Isabella","We are the best Sisters!",
  "I love candy","Sinderella Man","POP CORN","BTS","Black Pink","AKB48"
];

let doneTextList = [];

const titleMsg = document.getElementById("title_msg");
/* ----- obtaining the required HTML elements ends here ----- */

/* ----- ----- ----- functions starts here ----- ----- ----- */
/* ----- (function) game count to start (when click start button) ----- */
const timeLeft = document.getElementById("time_left");

// const countToStart = _ => {
//   /* ----- remove title messages starts here ----- */
//   titleMsg.classList.remove("show");
//   titleMsg.textContent = "";
//   /* ----- remove title messages ends here ----- */
//   let toStartTime = 3000;
//   timeLeft.classList.remove("hidden");
//   typedField.textContent = "";
//   untypedField.textContent =  "- texts appear here -";
//   btnField = document.querySelector(".btn_field");
//   if(gameStartBtn.getAttribute("data-method") === "keypresstype"){
//     btnField.innerHTML = `
//       <div class="keypress-type-area">
//         <span class="material-symbols-outlined">double_arrow</span>
//         <input type="text" id="keypress-type-field" class="form-control">
//         <span class="material-symbols-outlined">keyboard_double_arrow_left</span>
//       <div>
//     `;
//   } else if(gameStartBtn.getAttribute("data-method") === "textinputtype"){
//     btnField.innerHTML = `
//       <div style="width: 100%; display: flex; justify-content: center; align-items: center">
//         <input type="text" id="text-input-field" class="form-control">
//         <button type="submit" id="text_input_submit_btn">
//           <span class="material-symbols-outlined">check</span>
//           Check
//         </button>
//       </div>
//     `;
//   }
//   let intervalToStart = setInterval(_ => {
//     timeLeft.textContent = toStartTime/1000;
//     if(toStartTime <= 0){
//       timeLeft.textContent = (currentGameType === "keypresstype") ? "60" : "75" ;
//       clearInterval(intervalToStart);
//       setTimeout(_ => {
//       }, 500);
//       document.querySelector("input[type='text']").focus();
//       timer();
//       createText();
//       if(currentGameType === "keypresstype") // if keypress type add event keyPress
//         document.addEventListener("keypress", keyPress);
//       else if(currentGameType === "textinputtype"){ // if textinputtype is selected
//         document.getElementById("text-input-field").value = ""; // reset the input field
//         document.addEventListener("keypress", textInputTypeKeyPress); // if text input type add event textInputTypeKeyPress
//         document.getElementById("text_input_submit_btn").addEventListener("click", textInputConfirmedAction);
//       }
//     }
//     timeLeft.classList.add("counting");
//     setTimeout(_ => {
//       timeLeft.classList.remove("counting");
//     }, 500);
//     toStartTime -= 1000;
//   }, 1000);
// };

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
    /* ----- diplay alert msg in case of mistype starts here ----- */
    if(untypedField.textContent.substring(0, 1) === " "){ // if the next key is space
      titleMsg.textContent = "input the space key";
      titleMsg.classList.add("show");
      setTimeout(_ => {
        titleMsg.classList.remove("show");
        titleMsg.textContent = "";
      }, 1500);
    } else { // if the next key is not space
      titleMsg.textContent = `input the key ${untypedField.textContent.substring(0, 1)}`;
      titleMsg.classList.add("show");
      setTimeout(_ => {
        titleMsg.classList.remove("show");
        titleMsg.textContent = "";
      }, 1500);
    }
    /* ----- diplay alert msg in case of mistype ends here ----- */
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
  if(e.keyCode === 13){
    textInputConfirmedAction();
  } else if(e.key){ // when key is pressed
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
  doneTextList.unshift([currentGameType, keypressCount, score, `${parseFloat(score/keypressCount).toFixed(2)*100}%`]); // shift the done text list
  clearInterval(id); // clear the timer
  untypedField.textContent = "Game Over"; // update the untyped textcontent
  document.querySelector("input[type='text']").blur(); // unfocus the text input field
  timeLeft.classList.add("hidden"); // hide the timer
  if(currentGameType === "keypresstype"){
    document.removeEventListener("keypress", keyPress); // remove the keypress event listener
    typedField.textContent = ""; // reset the typed field textcontent
  } else if(currentGameType === "textinputtype"){
    document.removeEventListener("keypress", textInputTypeKeyPress); // remove the keypress event listener
    document.getElementById("text_input_submit_btn").removeEventListener("click", textInputConfirmedAction);
    
  }
  console.log(doneTextList);
  console.log(btnField.length);
  btnField.innerHTML = `
    <button style="display: flex; justify-content: center; align-items: center;" type="submit" id="retry_btn">
      <span class="material-symbols-outlined">replay</span>
      Retry
    </button>
  `;
  titleMsg.innerHTML = `${rank(keypressCount, score)}<br>to see your score details, <a href='https://bangbros.com'>click here</a>`;
  titleMsg.classList.add("show");
  titleMsg.classList.add("final");
};

/* ----- (function) text input comfirmed action starts here ----- */
const textInputConfirmedAction = _ => {
  let accurancyCheck = untypedField.textContent === document.getElementById("text-input-field").value; // check the input and text accurancy ... 1
  let textLength = untypedField.textContent.length; // text length
  let typeCheck = startType >= textLength; // check if the input is really typed .... 2
  if(accurancyCheck && typeCheck){ // if the input is correct 
    score += textLength; // count score
    textArea.classList.add("correct_text"); // add correct animation class
    setTimeout(_ => { // remove class after 0.1seconds
      textArea.classList.remove("correct_text");
    }, 100);
    textList.forEach((key, index) => { // remove the typed text from text list to avoid its appear again
      if(untypedField.textContent == key)
        textList.splice(index, 1);
    });
    endTime = parseFloat(time).toFixed(2); // regist the end time
    doneTextList.push([untypedField.textContent, parseFloat(startTime - endTime).toFixed(2)]); //  regist the done text
    createText(); // display the next text
  } else {
    textArea.classList.add("incorrect_text"); // add incorrect animation class
    setTimeout(_ => { // remove mistyped class after 0.1seconds
      textArea.classList.remove("incorrect_text");
    }, 100);
    document.getElementById("text-input-field").value = ""; //  reset the input field
  }
};
/* ----- (function) text input comfirmed action starts here ----- */
/* ----- ----- ----- functions ends here ----- ----- ----- */