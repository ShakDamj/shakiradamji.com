export const cssBreakpoint = {
  onlyNarrow: '@media (max-width: 610px)',
  narrow: '@media (min-width: 610px)',
  medium: '@media (min-width: 769px)',
  wide: '@media (min-width: 1200px)',
};

// These fonts are automatically downloaded from google fonts
const fonts = ['Nunito Sans', 'Nunito', 'Inconsolata'];

export const cssDeps = [
  `https://fonts.googleapis.com/css2?display=swap&${fonts
    .map((x) => `family=${x.replace(/\s/g, '+')}:wght@400;700`)
    .join('&')}`,
];

export const cssGlobal = `
  :root {
    --color-primary: #00FBFF;
    --color-foreground: #FDFBF8;
    --color-foregroundStrong: #FFFFFF;
    --color-background: #263238;
    --color-backgroundStrong: #161b22;
    --color-border: #586369;
  }

  body {
    font-size: 18px;
    line-height: 1.5;
    letter-spacing: 0.5px;
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
