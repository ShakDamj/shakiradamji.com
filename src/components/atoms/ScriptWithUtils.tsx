import React from 'react';
import { Script, ScriptProps } from '../../generate/mod.ts';

const scriptsDir = new URL('../../assets/js/', import.meta.url);
const frontendScriptUrl = (x: string) => new URL(x, scriptsDir);

export const frontendScript = (x: string) =>
  Deno.readTextFile(frontendScriptUrl(x));

const utils = await frontendScript('utils.js');

export function ScriptWithUtils(props: ScriptProps) {
  return (
    <>
      <Script once asap>
        {utils}
      </Script>
      <Script {...props} />
    </>
  );
}
