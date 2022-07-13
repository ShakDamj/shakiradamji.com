import React from 'react';
import { Script, ScriptProps } from '../../generate/mod.ts';

const scriptsDir = new URL('../../assets/js/', import.meta.url);

export const frontendScript = (x: string) =>
  Deno.readTextFile(new URL(x, scriptsDir));

const utils = await frontendScript('utils.js');

export function ScriptWithUtils(props: ScriptProps) {
  // console.log(props.children);

  return (
    <>
      <Script once asap>
        {utils}
      </Script>
      <Script {...props} />
    </>
  );
}
