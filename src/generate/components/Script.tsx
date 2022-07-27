import React from 'react';

const alreadyIncluded = new Set<string>();
const headScripts = new Set<string>();

export function flushScripts() {
  alreadyIncluded.clear();

  const scripts = [...headScripts];
  headScripts.clear();

  return scripts;
}

export interface ScriptProps {
  /** Include the script in the header, before any dom element */
  asap?: boolean;
  /** Scripts are only included once by default, use this flag to allow */
  repeatable?: boolean;
  /** Script source as string */
  children: string;
}

export function Script({ asap, repeatable, children }: ScriptProps) {
  if (!repeatable) {
    if (alreadyIncluded.has(children)) {
      return null;
    } else {
      alreadyIncluded.add(children);
    }
  }

  const html = `;(async () => {${children}})();`
    // minification toggle
    .replace(/(\s|\n)+/g, ' ');

  if (asap) {
    headScripts.add(html);
    return null;
  }

  return (
    <script type="module" defer dangerouslySetInnerHTML={{ __html: html }} />
  );
}
