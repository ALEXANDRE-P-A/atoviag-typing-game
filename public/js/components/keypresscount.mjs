let keypressCount = 0;

const initializeKeypressCount = _ => {
  keypressCount = 0;
};

const keypressPlus = _ => {
  keypressCount++;
};

const getKeypressCount = _ => {
  return keypressCount;
};

export { 
  initializeKeypressCount,
  keypressPlus,
  getKeypressCount 
};