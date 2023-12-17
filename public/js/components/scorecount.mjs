let score = 0;

const initializeScore = _ => {
  score = 0;
};

const scorePlus = _ => {
  score++;
  return score;
};

const addTypedTextLength = cnt => {
  score += cnt;
  return score;
};

const getScore = _ => {
  return score;
};

export { initializeScore, scorePlus, addTypedTextLength, getScore };