const checkItems = document.getElementById("check_items");
const titleMsg = document.getElementById("title_msg");

const addRules = item => {
  titleMsg.classList.remove("show");
  for(let i = 0;i < item.length; i++){
    const list = document.createElement("li");
    list.textContent =  item[i];
    checkItems.appendChild(list);
  }
};

export { addRules };