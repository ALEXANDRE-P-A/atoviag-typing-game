let gradesArray = [];
let user_id, user_email, user_device, play_date, rank, keypress_time, score, type_accurancy;
let user_record = {};

const initializeUserInfo = _ => {
  user_id = null;
  user_email = null;
  play_date = null;
  user_device = null;
  rank = null,
  keypress_time = null,
  score = null,
  type_accurancy = null
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

  user_record = {
    id: user_id,
    email: user_email,
    device: user_device,
    date: play_date
  };
};

const storePlayType = type => {
  user_record.play_type = type;
};

const storeTextAndTime = (text, time) => {
  gradesArray.push([text, time]);
};

const storeFinalTextAndTime = (typed, time, untyped) => {
  gradesArray.push([typed, time, untyped]);
};

const storeRank = (rank, keypresstime, score, typeaccurancy) => {
  user_record.rank = rank;
  user_record.keypress_time = keypresstime;
  user_record.score = score;
  user_record.type_accurancy = typeaccurancy;
};

const concatUserGrades = _ => {
  user_record.gradesArray = gradesArray;
};

const getUserRecord = _ => {
  return user_record;
};

export { 
  initializeUserInfo,
  storeUserInfo,
  initializeGrades,
  storePlayType,
  storeTextAndTime,
  storeFinalTextAndTime,
  storeRank,
  concatUserGrades,
  getUserRecord
};