export const cssColor = {
  link: '#EFE751',
  primary: '#0732A0',
  primaryContrast: '#FFFFFF',
  foreground: '#FDFBF8',
  background: '#263238',
  backgroundDark: '#1B2225',
  border: '#586369',
};

export const cssFontSize = {
  xs: '14px',
  sm: '18px',
  md: '24px',
  lg: '32px',
  xl: '46px',
};

export const cssFontWeight = {
  regular: 400,
  bold: 700,
};

export const cssBreakpoint = {
  narrow: '@media (min-width: 375px)',
  medium: '@media (min-width: 769px)',
  wide: '@media (min-width: 1200px)',
};

export const cssSpace = {
  sm: '8px',
  md: '12px',
  lg: '20px',
  xl: '40px',
};

export const cssAnimationSpeed = {
  fast: '0.15s',
  medium: '0.3s',
  slow: '1s',
};

export const cssFontFamily = {
  default: 'Lato, sans-serif',
  header: 'Montserrat, sans-serif',
  code: 'Fira Code, monospace',
};

export const cssDeps = [
  'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&family=Lato:ital,wght@1,400;1,700&family=Montserrat:wght@400;700&display=swap',
];

export const cssGlobal = `
  :root {
    background-color: ${cssColor.background};
    color: ${cssColor.foreground};
    font-family: ${cssFontFamily.default};
    font-size: 18px;
    --border-color: ${cssColor.border};
  }

  header, h1, h2, h3, h4, h5, h6 {
    font-family: ${cssFontFamily.header};
  }

  a {
    color: ${cssColor.link};
  }

  summary {
    list-style:none
  }

  summary::before {
    content: '';
    display: inline-block;
    border-width: .4rem;
    border-style: solid;
    border-color: transparent transparent transparent #fff;
    margin-right: ${cssSpace.md};
    transform: rotate(0deg);
    transform-origin: .2rem 50%;
    transition: transform ${cssAnimationSpeed.fast} ease;
  }

  details summary:hover::before {
    transform: rotate(30deg);
  }

  details[open] summary::before {
    transform: rotate(90deg);
  }

  .md p {
    margin: ${cssSpace.lg} 0;
    text-align: justify;
  }

  code {
    font-family: ${cssFontFamily.code};
  }

  .md .code-block {
    display: block;
    font-family: ${cssFontFamily.code};
    width: var(--available-width);
    padding-bottom: 10px;
  }

  .md h3 {
    margin-top: ${cssSpace.lg};
    margin-bottom: ${cssSpace.lg};
  }

  svg {
    fill: ${cssColor.foreground};
  }
`;

export const cssReset = `
  *, *::before, *::after {
    box-sizing: border-box;
  }

  ul, ol {
    padding: 0;
  }

  body, h1, h2, h3, h4, p, ul, ol, li, figure, figcaption, blockquote, dl, dd {
    margin: 0;
  }

  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }

  ul, ol {
    list-style: none;
  }
  .md ul, .md ol {
    list-style: initial;
    padding: revert;
  }

  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  img {
    max-width: 100%;
    display: block;
  }

  article > * + * {
    margin-top: 1em;
  }

  input, button, textarea, select {
    font: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

function hideScrollbar(selector: string) {
  return `
    ${selector}::-webkit-scrollbar {
      display: none;
    }
    ${selector} {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
  `;
}
