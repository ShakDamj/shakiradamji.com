import React from 'react';
import { css } from '../../deps/emotion.ts';
import { frontendScript, ScriptWithUtils } from '../atoms/ScriptWithUtils.tsx';

const lightThemeClass = 'light-scheme';
const loadColorScheme = await frontendScript('colorScheme.js');

export function ColorSchemeToggle() {
  const dark = `
    span:first-child {
      display: none;
    }
  `;

  const light = `
    span:last-child {
      display: none;
    }
  `;

  const styles = css`
    ${colorScheme('&', dark, light)}
    appearance: none;
    background: none;
    border: none;
  `;

  return (
    <>
      <button className={styles} data-togglecolorscheme>
        <span>🌑</span>
        <span>☀️</span>
      </button>

      <ScriptWithUtils once asap>
        {loadColorScheme}
      </ScriptWithUtils>
    </>
  );
}

export function colorScheme(selector: string, dark: string, light: string) {
  const nonRootSelector = selector === ':root' ? '' : selector;

  return `
    html:not(.${lightThemeClass}) ${nonRootSelector} { ${dark} }

    @media (prefers-color-scheme: light) {
      html ${nonRootSelector} { ${light} }
    }

    @media (prefers-color-scheme: dark) {
      html:not(.${lightThemeClass}) ${nonRootSelector} { ${dark} }
    }

    html.${lightThemeClass} ${nonRootSelector} { ${light} }
  `;
}
