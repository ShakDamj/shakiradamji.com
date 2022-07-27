const PRIMARY_COLOR_KEY = 'amatiasq.com|color-primary';

function changePrimaryColor(newColor) {
  if (!newColor) return;
  doc.style.setProperty('--color-primary', newColor);
  localStorage.setItem(PRIMARY_COLOR_KEY, newColor);
  primaryColorChanged(newColor);
}

function primaryColorChanged(
  newColor = getComputedStyle(doc).getPropertyValue('--color-primary')
) {
  const event = new CustomEvent('amq-primary-color-changed', {
    detail: newColor,
  });
  doc.dispatchEvent(event);
}

Object.assign(window, { primaryColorChanged });

doc.addEventListener('amq-primary-color-changed', async (event) => {
  const newColor = event.detail;

  doc.style.setProperty('--external-link', getExternalLinkBackground(newColor));

  const $picker = await $('#color-picker');
  $picker.value = newColor.trim();
});

changePrimaryColor(localStorage.getItem(PRIMARY_COLOR_KEY));

doc.dispatchEvent(new Event('amq-primary-color-ready'));

const picker = await $('#color-picker');

picker.addEventListener('input', (e) => changePrimaryColor(e.target.value));
