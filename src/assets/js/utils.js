const onDomLoaded = new Promise((resolve) =>
  addEventListener('DOMContentLoaded', resolve)
);

async function $(selector) {
  await onDomLoaded;
  return document.querySelector(selector);
}

async function $$(selector) {
  await onDomLoaded;
  return [...document.querySelectorAll(selector)];
}

onDomLoaded.then(() => {
  $ = (selector) => Promise.resolve(document.querySelector(selector));
  $$ = (selector) => Promise.resolve([...document.querySelectorAll(selector)]);
});
