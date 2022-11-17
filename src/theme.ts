export const cssBreakpoint = {
  onlyNarrow: '@media (max-width: 610px)',
  narrow: '@media (min-width: 610px)',
  medium: '@media (min-width: 769px)',
  wide: '@media (min-width: 1200px)',
};

// These fonts are automatically downloaded from google fonts
const fonts = ['Marcellus', 'Marcellus SC', 'Mulish'];

export const cssDeps = [
  `https://fonts.googleapis.com/css2?display=swap&${fonts
    .map((x) => `family=${x.replace(/\s/g, '+')}:wght@400;700;800;900`)
    .join('&')}`,
];

export const cssGlobal = newFunction();

// Imported from https://github.com/jensimmons/cssremedy/blob/master/css/remedy.css
export const cssReset = `
  *, ::before, ::after { box-sizing: border-box; }

  html { line-sizing: normal; }


  #homeText{
    width: 45%; 
    float: left;
    padding: 1em;
  }

  #homeImg { 
    width: 50%; 
    float: right;
    padding: 1em;
   }

  span {
    font-family: "Marcellus SC";
    font-size: 1.25rem;
    display: block;
    margin-top: 1rem;
  }

  body {
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.5px;
    margin: 50px;
  }

  H1 {
    margin: 0 0 1rem 0;
    font-size: 2.5rem;
    font-family: "Marcellus";
  }

  H2 {
    font-size: 1.5em;
    font-family: "Marcellus";
  }

  H3 {
    font-family: "Marcellus";
  }

  p {
    font-size: 1em;
    font-family: "Mulish";
  }

  a {
    color: #000000;
    font-size: 1em;
    font-family: "Mulish";
    padding: 0.75em;
    margin: 0.5em 1em 0 0;
    display: inline-block;
  }

  a.TextLink {
    padding: 0;
    margin: 0;
    font-family: inherit;
  }

  a.primary {
    background-color: #A5F4D1;
  }

  a.secondary{
    border: 1px solid #A5F4D1;
  }

  [hidden] { display: none; }

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

  ${cssBreakpoint.onlyNarrow} {
    #homeText{
      width: 100%; 
      padding: 1em;
    }
  
    #homeImg { 
      width: 100%; 
      padding: 1em;
     }

  }
`;



function newFunction() {
  return `
  :root {
    --color-primary: #00FBFF;
    --color-foreground: #FDFBF8;
    --color-foregroundStrong: #FFFFFF;
    --color-background: #263238;
    --color-backgroundStrong: #161b22;
    --color-border: #586369;
  }
`;
}
