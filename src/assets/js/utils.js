const onDomLoaded = new Promise((resolve) =>
  addEventListener('DOMContentLoaded', resolve)
);

let $ = (selector) => onDomLoaded.then(() => document.querySelector(selector));

onDomLoaded.then(
  () => ($ = (selector) => Promise.resolve(document.querySelector(selector)))
);
