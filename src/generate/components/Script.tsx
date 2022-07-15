import React from 'react';

const alreadyIncluded = new Set<string>();
const headScripts = new Set<string>();

export function flushScripts() {
  alreadyIncluded.clear();

  const scripts = Array.from(headScripts);
  headScripts.clear();

  return scripts;
}

export interface ScriptProps {
  asap?: boolean;
  immediate?: boolean;
  once?: boolean;
  children: string;
}

export function Script({ asap, immediate, once, children }: ScriptProps) {
  if (once) {
    if (alreadyIncluded.has(children)) {
      return null;
    } else {
      alreadyIncluded.add(children);
    }
  }

  const html = `;(async () => {${children}})();`;

  // minification toggle
  // .replace(/(\s|\n)+/g, ' ');

  if (asap) {
    headScripts.add(html);
    return null;
  }

  return (
    <script
      type="module"
      defer={!immediate}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
