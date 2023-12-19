let gradesArray = [];

const initializeGrades = _ => {
  gradesArray = new Array();
};

const storeTextAndTime = (text, time) => {
  gradesArray.push([text, time]);
};

const storeFinalTextAndTime = (typed, time, untyped) => {
  gradesArray.push([typed, time, untyped]);
};

const getGrades = _ => {
  return gradesArray;
};

export { 
  initializeGrades,
  storeTextAndTime,
  storeFinalTextAndTime,
  getGrades
};