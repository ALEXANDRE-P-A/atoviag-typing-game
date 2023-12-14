const checkItems = document.getElementById("check_items");

const addRules = item => {
  for(let i = 0;i < item.length; i++){
    const list = document.createElement("li");
    list.textContent =  item[i];
    checkItems.appendChild(list);
  }
};

export { addRules };