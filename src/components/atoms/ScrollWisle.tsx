import React from 'react';
import { frontendScript, ScriptWithUtils } from './ScriptWithUtils.tsx';

const scrollWisle = await frontendScript('scroll-wisle.js');

export interface ScrollWisleProps {
  as: string;
  scrollClass: string;
  scrollOffset?: number;
  scrollTolerance?: number;
}

export function ScrollWisle({
  as: _as,
  scrollClass,
  scrollOffset,
  scrollTolerance,
  ...props
}: ScrollWisleProps & Record<string, unknown>) {
  return (
    <>
      <ScriptWithUtils>{scrollWisle}</ScriptWithUtils>
      {React.createElement(_as, {
        ...props,
        'data-scrollclass': scrollClass,
        'data-scrolloffset': scrollOffset,
        'data-scrolltolerance': scrollTolerance,
      })}
    </>
  );
}
