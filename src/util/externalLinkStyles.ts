import { svgToUrl } from './svgToUrl.ts';

const svg = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="COLOR"
    stroke="COLOR"
    viewBox="0 0 24 24"
  >
    <path d="M6 17c2.269-9.881 11-11.667 11-11.667v-3.333l7 6.637-7 6.696v-3.333s-6.17-.171-11 5zm12 .145v2.855h-16v-12h6.598c.768-.787 1.561-1.449 2.339-2h-10.937v16h20v-6.769l-2 1.914z"/>
  </svg>
`;

export const externalLinkVariable = '--external-link';

// This function will be also injected in the frontend
// it should include all it's dependendcies in it's body
// so when it's stringified they are included
export const getExternalLinkBackground = new Function(
  'color',
  `
    ${svgToUrl}
    const svg = \`${svg}\`
    return svgToUrl(svg.replace('COLOR', color));
  `
);

export function externalLinkStyles(color: string) {
  const selector = [
    'a',
    '[href^="http"]',
    ':not([href^="https://repos.amatiasq.com"])',
    ':not(.no-external)',
  ].join('');

  return `
    :root {
      ${externalLinkVariable}: ${getExternalLinkBackground(color)};
    }

    ${selector}::after {
      content: '';
      margin-left: 0.5em;
      width: 0.8em;
      height: 0.8em;
      display: inline-block;
      background-image: var(${externalLinkVariable});
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
  `;
}
