const fetchTextlist = async _ => {
  let list = [];
  await fetch("/textlist")
    .then(data => data.json())
    .then(res => {
      let i = 0;
      while(res.split(",")[i] !== undefined){
        list.push(res.split(",")[i]);
        i++
      }
    });
  return list;
};

const textList = await fetchTextlist();

export { textList };