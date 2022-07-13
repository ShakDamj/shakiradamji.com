import React from 'react';
import { css } from '../../deps/emotion.ts';
import { Lang, Script } from '../../generate/mod.ts';
import {
  cssAnimationFunction,
  cssAnimationSpeed,
  cssBreakpoint,
} from '../../theme.ts';
import {
  externalLinkVariable,
  getExternalLinkBackground,
} from '../../util/externalLinkStyles.ts';
import { noindent } from '../../util/noindent.ts';
import { frontendScript, ScriptWithUtils } from '../atoms/ScriptWithUtils.tsx';

const loadPrimaryColor = await frontendScript('primaryColor.js');

export function PrimaryColorPicker() {
  const styles = css`
    display: none;

    ${cssBreakpoint.medium} {
      --size: 1.5rem;
      display: block;
      position: fixed;
      overflow: hidden;
      bottom: calc(var(--size) * -1);
      right: calc(var(--size) * -1);
      height: calc(var(--size) * 2);
      width: calc(var(--size) * 2);
      border-radius: var(--size);
      transition-duration: ${cssAnimationSpeed.medium};
      transition-timing-function: ${cssAnimationFunction.bouncy};
      transtition-property: height, width;

      &:hover,
      &:focus-within {
        --size: 6rem;

        label {
          transform: rotate(0deg);
          opacity: 1;
        }
      }

      input {
        background: transparent;
        margin: -10px;
        border: none;
        width: calc(var(--size) * 2);
        height: calc(var(--size) * 2);
      }

      label {
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
    <div className={styles}>
      <input type="color" id="color-picker" defaultValue="#00ffe1" />
      <label htmlFor="color-picker">
        <Lang en="Change the main color!" es="Cambia el color principal!" />
      </label>

      <ScriptWithUtils once asap>
        {noindent`
          const externalLinkVariable = '${externalLinkVariable}';
          const getExternalLinkBackground = ${getExternalLinkBackground};
          ${loadPrimaryColor}
        `}
      </ScriptWithUtils>

      <Script once>
        {`
          document.querySelector('#color-picker').addEventListener('input', (e) =>
            changePrimaryColor(e.target.value)
          );
        `}
      </Script>
    </div>
  );
}
