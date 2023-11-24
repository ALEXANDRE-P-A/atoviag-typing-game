/* ----- HTMLの取得 ----- */
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const reemailInput = document.getElementById("reemail");
const passwordInput = document.getElementById("password");
const repasswordInput = document.getElementById("repassword");
const ageSelect = document.getElementById("age");
const regionSelect = document.getElementById("region");
const recaptchaField = document.querySelector(".g-recaptcha");

/* ----- 関数の設定 ----- */
let checkField = _ => {
  if(
    nameInput.value != ""
    && emailInput.value != ""
    && reemailInput.value != ""
    && passwordInput.value != ""
    && repasswordInput.value != ""
    && ageSelect.value != 0
    && regionSelect.value != 0
  )
    recaptchaField.classList.remove("hidden");
  else 
    recaptchaField.classList.add("hidden");
};

/* ----- イベントの発火(初期画面) ----- */
checkField();

/* ----- イベントリスナーの設定 ----- */
nameInput.addEventListener("input", checkField);
emailInput.addEventListener("input", checkField);
reemailInput.addEventListener("input", checkField);
passwordInput.addEventListener("input", checkField);
repasswordInput.addEventListener("input", checkField);
ageSelect.addEventListener("input", checkField);
regionSelect.addEventListener("input", checkField);