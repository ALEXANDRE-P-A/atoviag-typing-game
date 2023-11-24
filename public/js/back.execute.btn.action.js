let cnt = 0;

const submitForm = document.querySelector("form");
const backBtn = document.getElementById("back_btn");
const executeBtn = document.getElementById("execute_btn");

backBtn.addEventListener("click", e => {
  e.preventDefault();
  submitForm.setAttribute("method", backBtn.getAttribute("data-method"));
  submitForm.setAttribute("action", backBtn.getAttribute("data-action"));
  if(cnt === 0){
    cnt++;
    console.log(backBtn.getAttribute("data-method"));
    console.log(backBtn.getAttribute("data-action"));
    submitForm.submit();
  } else {
    console.log("Form submit cancelled", cnt);
    submitForm.addEventListener("submit", _ => {
      return false;
    });
  }
});

executeBtn.addEventListener("click", e => {
  e.preventDefault();
  submitForm.setAttribute("method", executeBtn.getAttribute("data-method"));
  submitForm.setAttribute("action", executeBtn.getAttribute("data-action"));
  if(cnt === 0){
    cnt++;
    console.log(executeBtn.getAttribute("data-method"));
    console.log(executeBtn.getAttribute("data-action"));
    submitForm.submit();
  } else {
    console.log("Form submit cancelled", cnt);
    submitForm.addEventListener("submit", _ => {
      return false;
    });
  }
});