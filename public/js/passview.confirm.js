const visibilityBtn = document.querySelector(".visibility");
const passInput = document.querySelector("input[type='password']");
const passShowBtn = document.querySelector(".pass_show_btn");

visibilityBtn.addEventListener("click", e => {
  e.preventDefault();
  if(passInput.type == "password"){
    passInput.type = "text";
    passShowBtn.textContent = "hide_source";
  } else {
    passInput.type = "password";
    passShowBtn.textContent = "visibility";
  }
});