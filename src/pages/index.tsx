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

      <span id='smalltext'>Hello,</span>
      <h1> I'm a Senior Product Designer looking for projects I'm passionate about.</h1>
      <p>I love solving complex design problems and creating beautiful interfaces that have a focus on inclusive design and accessibility. </p>
      <img src="plants.jpg"></img>
      
    </ShakDocument>
  );
};
