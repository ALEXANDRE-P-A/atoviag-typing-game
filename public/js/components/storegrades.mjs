let gradesArray = [];
let user_id, user_email, user_device, play_date;

const initializeUserInfo = _ => {
  user_id = null;
  user_email = null;
  play_date = null;
  user_device = null;
};

const initializeGrades = _ => {
  gradesArray = new Array();
};

const storeUserInfo = (id, email, device) => {
  initializeGrades();
  user_id = id;
  user_email = email;
  user_device = device;
  play_date = new Date();
  gradesArray.push([user_id, user_email, user_device, play_date]);
  console.log([user_id, user_email, user_device, play_date]);
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
  initializeUserInfo,
  storeUserInfo,
  initializeGrades,
  storeTextAndTime,
  storeFinalTextAndTime,
  getGrades
};