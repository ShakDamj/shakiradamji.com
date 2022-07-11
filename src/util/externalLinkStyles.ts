export const externalLink = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='COLOR' stroke='COLOR'%3E%3Cpath d='M6 17c2.269-9.881 11-11.667 11-11.667v-3.333l7 6.637-7 6.696v-3.333s-6.17-.171-11 5zm12 .145v2.855h-16v-12h6.598c.768-.787 1.561-1.449 2.339-2h-10.937v16h20v-6.769l-2 1.914z'/%3E%3C/svg%3E")`;

export function externalLinkStyles(color: string) {
  return `
    :root{
      --external-link: ${externalLink.replace(/COLOR/g, color)};
    }

    a[href^="http"]:not(.no-external)::after {
      content: '';
      margin-left: 0.5em;
      width: 0.8em;
      height: 0.8em;
      display: inline-block;
      background-image: var(--external-link);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
  `;
}
