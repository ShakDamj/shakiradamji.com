const COLOR_SCHEME_KEY = 'amatiasq.com|color-scheme';

if (localStorage.getItem(COLOR_SCHEME_KEY)) {
  doc.classList.toggle('light-scheme');
}

doc.addEventListener('amq-primary-color-ready', () => {
  if (localStorage.getItem(COLOR_SCHEME_KEY)) {
    primaryColorChanged();
  }
});

const button = await $('[data-togglecolorscheme]');

button.addEventListener('click', () => {
  if (doc.classList.toggle('light-scheme')) {
    localStorage.setItem(COLOR_SCHEME_KEY, 'light');
  } else {
    localStorage.removeItem(COLOR_SCHEME_KEY);
  }

  primaryColorChanged ? primaryColorChanged() : null;
});

button.removeAttribute('data-togglecolorscheme');
