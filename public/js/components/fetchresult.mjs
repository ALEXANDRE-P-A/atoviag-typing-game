const fetchResult = record => {

  console.log(record);

  const method = "POST";
  const body = JSON.stringify(record);
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  };

  console.log(body);

  fetch("/fetchresult", { method, headers, body })
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
};

export { fetchResult };