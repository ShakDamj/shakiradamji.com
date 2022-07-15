import React from 'react';
import { css } from '../../deps/emotion.ts';
import { frontendScript, ScriptWithUtils } from '../atoms/ScriptWithUtils.tsx';

const lightThemeClass = 'light-scheme';
const loadColorScheme = await frontendScript('colorScheme.js');

export interface ColorSchemeToggleProps {
  className?: string;
}

export function ColorSchemeToggle({ className = '' }: ColorSchemeToggleProps) {
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
    font-size: inherit;
  `;

  return (
    <>
      <button className={`${styles} ${className}`} data-togglecolorscheme>
        <span>🌒</span>
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

    html.${lightThemeClass} ${nonRootSelector} { ${light} }
  `;
}
