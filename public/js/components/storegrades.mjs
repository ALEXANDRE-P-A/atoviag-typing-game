let gradesArray = [];

const initializeGrades = _ => {
  gradesArray = new Array();
};

const storeTextAndTime = (text, time) => {
  gradesArray.push([text, time]);
};

const getGrades = _ => {
  return gradesArray;
};

export { 
  initializeGrades,
  storeTextAndTime,
  getGrades
};