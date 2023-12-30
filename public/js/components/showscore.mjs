import { getUserRecord } from "./storegrades.mjs";
import { rank } from "./rank.mjs";

const checkWindow = document.getElementById("check-window");
const checkWindowTitle = document.querySelector("#check-window p");
const checkWindowDiv = document.querySelector("#check-window div");
const checkWindowOl = document.querySelector("#check-window ol");
const modalWindowBtnArea = document.querySelector(".modal-window-btn-area");

const showScore = _ => {
  const record = getUserRecord();

  checkWindowTitle.textContent = "Congratulations ";
  checkWindow.classList.remove("hidden");
  checkWindow.classList.add("width_fit-content");

  checkWindowOl.classList.add("hidden");
  checkWindowDiv.classList.add("center");

  const ul = document.createElement("ul");
  checkWindowDiv.appendChild(ul);

  const li = document.createElement("li");
  li.innerHTML = rank(record.keypress_time, record.score);
  ul.appendChild(li);

  const details = document.createElement("li");
  details.innerHTML = `
    <details>
      <summary>Score details</summary>
      <table class="score_details_table">
        <thead>
          <tr>
            <th>Text</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          ${record.gradesArray}
          ${record.gradesArray.length}
    
          <tr>
            <td>Apple</td>
            <td>3.21</td>
          </tr>
          <tr>
            <td>Google</td>
            <td>23.33</td>
          </tr>
        </tbody>
      </table>
    </details>
  `;

  ul.appendChild(details);

  modalWindowBtnArea.innerHTML = `
    <span class="score_check material-symbols-outlined">done</span>
  `;

  console.log(record);
};

export { showScore }; 