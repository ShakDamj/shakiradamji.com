class ExternalLink extends HTMLElement {
  static get observedAttributes() {
    return ['href'];
  }

  connectedCallback() {
    this.innerHTML = `
      <a target="_blank">
        ${this.innerHTML}
        <i class="ri-external-link-line"></i>
      </a>
    `;

    update(this);
  }

  update() {
    update(this);
  }
}

window.customElements.define('external-link', ExternalLink);

function update(el) {
  const a = el.firstElementChild;
  const href = el.getAttribute('href') || '';

  if (href) {
    a.setAttribute('href', href);
  }
}
