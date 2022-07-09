import React from 'react';

const alreadyIncluded = new Set();
const headScripts = new Set();

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

  if (asap) {
    headScripts.add(children);
    return null;
  }

  const html = children.replace(/(\s|\n)+/g, ' ');

  return (
    <script defer={!immediate} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
