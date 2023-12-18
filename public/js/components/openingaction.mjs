const title = "Welcome to Atoviag Typing Game";
const titleMsg = document.getElementById("title_msg");
const typedField = document.getElementById("typed");
const untypedField = document.getElementById("untyped");
const textArea = document.getElementById("text_area");

const addOpeningMsg = _ => {
  titleMsg.classList.add("show");
  titleMsg.textContent = "Application designed specially to measure and enhance your typing skills";
};

const opening = _ => {

  typedField.textContent = "";
  untypedField.textContent = title;

  typedField.textContent += untypedField.textContent.substring(0,1);
  untypedField.textContent = untypedField.textContent.substring(1);

  let openingAction = setInterval(_ => {
    typedField.textContent += untypedField.textContent.substring(0,1);
    untypedField.textContent = untypedField.textContent.substring(1);
    if(untypedField.textContent.length === 0){
      clearInterval(openingAction);
      textArea.classList.add("initial-effect");
      let openingActionFinish = setInterval(_ => {
        textArea.classList.remove("initial-effect");
        typedField.textContent = "";
        untypedField.textContent = title;
        clearInterval(openingActionFinish);
        addOpeningMsg();
      }, 100);
    }
  }, 75);
};

export { opening };