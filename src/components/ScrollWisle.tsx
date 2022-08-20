import React from 'react';
import { assetsDir, Script } from '../generate/mod.ts';

const scrollWisle = await Deno.readTextFile(
  `${assetsDir.resolve('js/scroll-wisle.js')}`
);

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
      <Script>{scrollWisle}</Script>
      {React.createElement(_as, {
        ...props,
        'data-scrollclass': scrollClass,
        'data-scrolloffset': scrollOffset,
        'data-scrolltolerance': scrollTolerance,
      })}
    </>
  );
}
