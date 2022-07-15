import React from 'react';
import { css } from '../../deps/emotion.ts';
import { Lang, Script } from '../../generate/mod.ts';
import {
  cssAnimationFunction,
  cssAnimationSpeed,
  cssBreakpoint,
  cssColor,
} from '../../theme.ts';
import { getExternalLinkBackground } from '../../util/externalLinkStyles.ts';
import { noindent } from '../../util/noindent.ts';
import { frontendScript, ScriptWithUtils } from '../atoms/ScriptWithUtils.tsx';

const loadPrimaryColor = await frontendScript('primaryColor.js');

// Some day...
// https://caniuse.com/mdn-css_at-rules_property
// @property --size {
//   syntax: '<length>';
//   inherits: false;
//   initial-value: 1rem;
// }
// transition: --size ${cssAnimationSpeed.medium} ${cssAnimationFunction.bouncy};

export function PrimaryColorPicker() {
  const styles = css`
    display: none;

    ${cssBreakpoint.medium} {
      display: block;
      position: fixed;
      overflow: hidden;
      background-color: ${cssColor.primary};

      --size: 2rem;
      bottom: calc(var(--size) * -1);
      right: calc(var(--size) * -1);
      height: calc(var(--size) * 2);
      width: calc(var(--size) * 2);

      border-radius: var(--size);
      transition-duration: ${cssAnimationSpeed.medium};
      transition-timing-function: ${cssAnimationFunction.bouncy};
      transition-property: border-radius, bottom, right, height, width;

      &:hover,
      &:focus-within {
        --size: 6rem;

        p {
          transform: rotate(0deg);
          opacity: 1;
        }
      }

      input {
        margin-top: -10rem;
        margin-left: -10rem;
      }

      p {
        opacity: 0;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 16px;
        padding: 0.3em 1em;
        position: fixed;
        bottom: 2rem;
        right: 7rem;
        color: var(--color-primary);
        font-weight: bold;
        transform: rotate(90deg);
        transform-origin: 100% 1000%;
        transition: transform ${cssAnimationSpeed.medium},
          opacity ${cssAnimationSpeed.slow};
      }
    }
  `;

  return (
    <label htmlFor="color-picker" className={styles}>
      <input type="color" id="color-picker" defaultValue="#00ffe1" />
      <p>
        <Lang en="Change the main color!" es="Cambia el color principal!" />
      </p>

      <ScriptWithUtils once asap>
        {noindent`
          const getExternalLinkBackground = ${getExternalLinkBackground};
          ${loadPrimaryColor}
        `}
      </ScriptWithUtils>
    </label>
  );
}
