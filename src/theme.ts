import { bouncyLinkStyles } from './util/bouncyLinkTransition.ts';
import { externalLinkStyles } from './util/externalLinkStyles.ts';

const primaryColor = '#00FBFF';

export const cssColor = {
  primary: 'var(--color-primary)',
  foreground: '#FDFBF8',
  background: '#263238',
  backgroundDark: '#161b22',
  link: 'var(--color-primary)',
  primaryContrast: '#FFFFFF',
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
  onlyNarrow: '@media (max-width: 375px)',
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
  fastest: '0.05s',
  fast: '0.15s',
  medium: '0.3s',
  slow: '1s',
};

export const cssAnimationFunction = {
  startquick: 'cubic-bezier(0,.5,0,1)',
  bouncy: 'cubic-bezier(0.25, 0.1, 0, 2.05)',
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
    line-height: 1.5;
    letter-spacing: 0.5px;

    --color-primary: ${primaryColor};
  }

  header, h1, h2, h3, h4, h5, h6 {
    font-family: ${cssFontFamily.header};
  }

  a {
    color: ${cssColor.link};
    text-decoration: none;
  }
  ${externalLinkStyles(primaryColor)}
  ${bouncyLinkStyles()}

  ol { padding: 0; }
  li { list-style: none; }

  code {
    font-family: ${cssFontFamily.code};
  }

  svg {
    fill: ${cssColor.foreground};
  }
`;

// Imported from https://github.com/jensimmons/cssremedy/blob/master/css/remedy.css
export const cssReset = `
  *, ::before, ::after { box-sizing: border-box; }

  html { line-sizing: normal; }

  body { margin: 0; }

  [hidden] { display: none; }

  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.17rem; }
  h4 { font-size: 1.00rem; }
  h5 { font-size: 0.83rem; }
  h6 { font-size: 0.67rem; }

  h1 { margin: 0.67em 0; }

  pre { white-space: pre-wrap; }

  hr {
    border-style: solid;
    border-width: 1px 0 0;
    color: inherit;
    height: 0;
    overflow: visible;
  }

  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
    max-width: 100%;
  }
  audio:not([controls]) { display:none; }

  picture { display: contents; }
  source { display: none; }

  img, svg, video, canvas {
    height: auto;
  }

  audio { width: 100%; }

  img { border-style: none; }

  svg { overflow: hidden; }

  article, aside, details, figcaption, figure, footer, header, hgroup, main, nav, section {
    display: block;
  }

  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-name: none !important;
      transition: none !important;
    }
  }
`;
