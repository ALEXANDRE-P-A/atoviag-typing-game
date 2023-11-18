/* ----- 変数の初期化 ----- */
const title = "Welcome to Atoviag Typing Game";

/* ----- HTML要素の取得 ----- */
const typedField = document.getElementById("typed");
const untypedField = document.getElementById("untyped");
const textArea = document.getElementById("text_area");

/* ------------------ ページをアクセスした時のアクション ------------------ */
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
    setInterval(_ => {
      textArea.classList.remove("initial-effect");
      typedField.textContent = "";
      untypedField.textContent = title;
    }, 100);
  }
}, 75);