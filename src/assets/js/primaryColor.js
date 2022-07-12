const PRIMARY_COLOR_KEY = 'amatiasq.com|color-primary';

function changePrimaryColor(newColor) {
  if (!newColor) return;

  const root = document.documentElement.style;

  root.setProperty('--color-primary', newColor);
  root.setProperty(exteranLinkVariable, getExternalLinkBackground(newColor));

  localStorage.setItem(PRIMARY_COLOR_KEY, newColor);

  $('#color-picker').then(($picker) => {
    $picker.value = newColor;
  });
}

changePrimaryColor(localStorage.getItem(PRIMARY_COLOR_KEY));
