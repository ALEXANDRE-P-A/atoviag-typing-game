const window_onpopstate = e => {
  history.pushState(null, null, null);
};

const document_onready = e => {
  history.pushState(null, null, null);
  window.addEventListener("popstate", window_onpopstate);
};

document.addEventListener("DOMContentLoaded", document_onready);