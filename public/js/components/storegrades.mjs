const gradesArray = [];

const initializeGrades = _ => {
  gradesArray = [];
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