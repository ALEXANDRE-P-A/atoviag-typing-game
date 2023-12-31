import { getUserRecord } from "./storegrades.mjs";
import { rank } from "./rank.mjs";

const checkWindow = document.getElementById("check-window");
const checkWindowTitle = document.querySelector("#check-window p");
const checkWindowDiv = document.querySelector("#check-window div");
const checkWindowOl = document.querySelector("#check-window ol");
const modalWindowBtnArea = document.querySelector(".modal-window-btn-area");

const transformArray = array => {
  let response = "";
  for(let i = 0;i < array.length-1;i++){
    response += `
      <tr>
        <td>${array[i][0]}</td>
        <td>${array[i][1]}</td>
      </tr>
    `;
  }

  if(array[array.length-1].length > 2){
    const lastText = array[array.length-1][0].split("_")[0];
    response += `
      <tr>
        <td><span>${lastText}</span><span style="opacity: .3;">${array[array.length-1][2]}</span></td>
        <td>${array[array.length-1][1]}</td>
      </tr>
    `;
  } else {
    response += `
      <tr>
        <td>${array[array.length-1][0]}</td>
        <td>${array[array.length-1][1]}</td>
      </tr>
    `;
  }
  

  return response;
}

const showScore = _ => {
  const record = getUserRecord();

  checkWindowTitle.textContent = "Congratulations ";
  checkWindow.classList.remove("hidden");

  checkWindowOl.classList.add("hidden");
  checkWindowDiv.classList.add("center");

  const ul = document.createElement("ul");
  checkWindowDiv.appendChild(ul);

  const li = document.createElement("li");
  li.innerHTML = rank(record.keypress_time, record.score);
  ul.appendChild(li);

  const details = document.createElement("details");
  details.innerHTML = `
    <summary>Score details</summary>
    <table class="score_details_table">
      <thead>
        <tr>
          <th>Text</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>    
        ${transformArray(record.gradesArray)}
      </tbody>
    </table>
  `;

  checkWindowDiv.appendChild(details);

  modalWindowBtnArea.innerHTML = `
    <span class="score_check material-symbols-outlined">done</span>
  `;

  console.log(record);
};

export { showScore }; 