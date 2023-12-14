const checkItems = document.getElementById("check_items");

const removeRules = _ => {
  while(checkItems.firstChild)
    checkItems.removeChild(checkItems.firstChild);
};

export { removeRules };