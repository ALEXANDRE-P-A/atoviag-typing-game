const test = document.getElementById("test");

const getDeviceinfo = _ => {
  console.log(navigator.userAgent);
  test.textContent = `${navigator.userAgent}`;
};

export { getDeviceinfo };