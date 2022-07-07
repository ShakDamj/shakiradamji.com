export const cssColor = {
  primary: '#EFE751',
  foreground: '#FDFBF8',
  background: '#263238',
  backgroundDark: '#1B2225',
  // primary: '#8BB9F8', // azul
  // primary: '#8BA9FF', // French Sky Blue
  // primary: '#70ACFF', // French Sky Blue 2
  // primary: '#FC9173', // Dark Salmom
  link: '',
  primaryContrast: '#FFFFFF',
  border: '#586369',
};

cssColor.link = cssColor.primary;

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
  xs: '4px',
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

const fonts = ['Nunito Sans', 'Nunito', 'Inconsolata'];

export const cssFontFamily = {
  default: `${fonts[0]}, sans-serif`,
  header: `${fonts[1]}, sans-serif`,
  code: `${fonts[2]}, monospace`,
};

export const cssDeps = [
  `https://fonts.googleapis.com/css2?display=swap&${fonts
    .map((x) => `family=${x.replace(/\s/g, '+')}:wght@400;700`)
    .join('&')}`,
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

  .md p {
    margin: ${cssSpace.lg} 0;
    text-align: justify;
  }

  code {
    font-family: ${cssFontFamily.code};
  }

  code:not(.code-block) {
    background-color: ${cssColor.backgroundDark};
    padding: ${cssSpace.xs};
    border-radius: ${cssSpace.xs};
  }

  .md .code-block {
    display: block;
    font-family: ${cssFontFamily.code};
    margin-left: -1em;
    margin-right: -1em;
    width: calc(var(--available-width) + 2em);
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
