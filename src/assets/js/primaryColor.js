const PRIMARY_COLOR_KEY = 'amatiasq.com|color-primary';

async function changePrimaryColor(newColor) {
  if (!newColor) return;

  const root = document.documentElement.style;

  root.setProperty('--color-primary', newColor);
  root.setProperty(externalLinkVariable, getExternalLinkBackground(newColor));

  localStorage.setItem(PRIMARY_COLOR_KEY, newColor);

  const $picker = await $('#color-picker');
  $picker.value = newColor;
}

changePrimaryColor(localStorage.getItem(PRIMARY_COLOR_KEY));
