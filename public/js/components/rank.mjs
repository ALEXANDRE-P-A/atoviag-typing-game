const rank = (keys, score) => {
  let text;
  const typeAccurancy = Math.floor(Number(score/keys*100));
  if(score < 100)
    text = `Your rank is C and you are ${100 - score} characters away from B rank`;
  else if(score < 180)
    text = `Your rank is B and you are ${180 - score} characters away from A rank`;
  else if(score < 250)
    text = `Your rank is A and you are ${250 - score} characters away from S rank`;
  else if(score >= 250)
    text = "Your rank is S. Congratulations!";

  return `
    You hit ${score} 
    characters.<br>${text}
    <br>Your type accurancy is ${typeAccurancy}%
  `;
};

const getRank = score => {
  if(score < 100)
    return "C";
  else if(score < 180)
    return "B";
  else if(score < 250)
    return "A";
  else if(score >= 250)
    return "S";
};

export { 
  rank,
  getRank
};