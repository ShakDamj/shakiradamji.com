import React from 'react';
import { ShakDocument } from '../components/ShakDocument.tsx';
import { ShakHeader } from '../components/ShakHeader.tsx';
import { getAllPagesBySection } from '../util/getAllPagesBySection.ts';
import { Img } from '../generate/mod.ts';

const sections = await getAllPagesBySection();

// deno-lint-ignore no-explicit-any
export default (props: any) => {
  return (
    <ShakDocument {...props}>
      <ShakHeader></ShakHeader>

      <h1>Hello, I'm a Senior Product Designer looking for projects I'm passionate about.</h1>
      <p>8 years experience working as a product designer on a variety of different projects.</p>
    </ShakDocument>
  );
};
