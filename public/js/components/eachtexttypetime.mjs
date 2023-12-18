let startTypetime = 0;
let endTypeTime = 0;

const registStartTypeTime = time => {
  startTypetime = time;
};

const registEndTypeTime = time => {
  endTypeTime = time;
};

const getTypedTime = _ => {
  return parseFloat(startTypetime - endTypeTime).toFixed(2);
};

const getStartTypeTime = _ => {
  return parseFloat(startTypetime).toFixed(2);
};

export { 
  registStartTypeTime,
  registEndTypeTime,
  getTypedTime,
  getStartTypeTime
}; 