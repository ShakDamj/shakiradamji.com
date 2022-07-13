import React from 'react';
import { frontendScript, ScriptWithUtils } from './ScriptWithUtils.tsx';

const scrollWisle = await frontendScript('scroll-wisle.js');

export function ScrollWisle({
  as: _as,
  scrollClass,
  scrollOffset,
  ...props
}: { as: string; scrollClass: string; scrollOffset?: number } & Record<
  string,
  unknown
>) {
  return (
    <>
      <ScriptWithUtils once>{scrollWisle}</ScriptWithUtils>
      {React.createElement(_as, {
        ...props,
        'data-scrollclass': scrollClass,
        'data-scrolloffset': scrollOffset,
      })}
    </>
  );
}
