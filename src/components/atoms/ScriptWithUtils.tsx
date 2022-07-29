import React from 'react';
import { Script, ScriptProps } from '../../generate/mod.ts';

// if this is imported from '../../generate/mod.ts' everything breaks
import { assetsDir } from '../../generate/config.ts';

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
