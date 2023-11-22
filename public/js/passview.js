const visibilityBtn = document.querySelectorAll(".visibility");
const passInputs = document.querySelectorAll("input[type='password']");
const passShowBtns = document.querySelectorAll(".pass_show_btn");

visibilityBtn.forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    if(passInputs[0].type == "password" &&  passInputs[1].type == "password"){
      passInputs.forEach(input => {
        input.type = "text";
      });
      passShowBtns.forEach(btn => {
        btn.textContent = "hide_source";
      });
    } else {
      passInputs.forEach(input => {
        input.type = "password";
      });
      passShowBtns.forEach(btn => {
        btn.textContent = "visibility";
      });
    }
  });
});