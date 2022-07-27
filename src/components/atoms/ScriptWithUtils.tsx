import React from 'react';
import { assetsDir, Script, ScriptProps } from '../../generate/mod.ts';

const scriptsDir = new URL('js/', `file://${assetsDir}/`);

export const frontendScript = (x: string) =>
  Deno.readTextFile(new URL(x, scriptsDir));

const utils = await frontendScript('utils.js');

export function ScriptWithUtils(props: ScriptProps) {
  return (
    <>
      <Script asap>{utils}</Script>
      <Script {...props} />
    </>
  );
}
