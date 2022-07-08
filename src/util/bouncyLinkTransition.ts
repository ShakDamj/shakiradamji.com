import { cssAnimationFunction, cssAnimationSpeed } from '../theme.ts';

export const bouncyLinkClass = 'bouncy-box';

export function bouncyLinkStyles() {
  const selector = `:where(.${bouncyLinkClass}, article a)`;

  return `
    ${selector} {
      z-index: 1;
      position: relative;
      display: inline-block;

      --underline-width: 1px;
      --padding: 8;

      transform: scale(1) rotate(0);
      transition: transform ${cssAnimationSpeed.medium} ${cssAnimationFunction.bouncy};
    }

    ${selector}:hover {
      transform: scale(1.1) rotate(0);
    }

    ${selector}:before {
      content: '';
      position: absolute;
      z-index: -1;
      border-radius: 8px;

      opacity: 1;
      background: var(--color-primary);
      inset: calc(100% - var(--underline-width)) 0 0 0;
      height: var(--underline-width);

      transition-property: inset, opacity, height, background;
      transition-duration: ${cssAnimationSpeed.medium};
      transition-timing-function: ${cssAnimationFunction.startquick};
    }

    ${selector}:hover:before {
      inset: calc(var(--padding) * -1px) calc(var(--padding) * -2px);
      background: black;
      opacity: 0.9;
      height: calc(100% + calc(var(--padding) * 2px));
    }
  `;
}
