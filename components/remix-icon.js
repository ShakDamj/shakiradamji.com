class RemixIcon extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'line-only', 'label'];
  }

  connectedCallback() {
    const i = document.createElement('i');
    update(this, i);
    this.appendChild(i);
  }

  update() {
    update(this, this.firstElementChild);
  }
}

window.customElements.define('remix-icon', RemixIcon);

function update(el, i) {
  const name = el.getAttribute('name') || '';
  if (!name) return;

  const paintMode = el.hasAttribute('fill') ? 'fill' : 'line';
  const label = el.getAttribute('label') || name;

  i.setAttribute('class', `ri-${name}-${paintMode}`);
  i.setAttribute('title', label);
  i.setAttribute('aria-label', label);
}
