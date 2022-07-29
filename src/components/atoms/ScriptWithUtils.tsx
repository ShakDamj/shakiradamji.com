import React from 'react';
import { assetsDir, Script, ScriptProps } from '../../generate/mod.ts';

const scriptsDir = assetsDir.resolve('js/');

export const frontendScript = (x: string) =>
  Deno.readTextFile(`${scriptsDir.resolve(x)}`);

const utils = await frontendScript('utils.js');

export function ScriptWithUtils(props: ScriptProps) {
  return (
    <>
      <Script asap>{utils}</Script>
      <Script {...props} />
    </>
  );
}
