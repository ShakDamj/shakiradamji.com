const PRIMARY_COLOR_KEY = 'amatiasq.com|color-primary';

function changePrimaryColor(newColor) {
  if (!newColor) return;

  const root = document.documentElement.style;

  root.setProperty('--color-primary', newColor);
  root.setProperty(
    '--external-link',
    `EXTERNAL_LINK`.replace(/COLOR/g, newColor.replace('#', '%23'))
  );

  localStorage.setItem(PRIMARY_COLOR_KEY, newColor);

  $('#color-picker').then(($picker) => {
    $picker.value = newColor;
  });
}

changePrimaryColor(localStorage.getItem(PRIMARY_COLOR_KEY));
