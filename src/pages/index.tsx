import React from 'react';
import { ShakDocument } from '../components/ShakDocument.tsx';
import { ShakHeader } from '../components/ShakHeader.tsx';
import { getAllPagesBySection } from '../util/getAllPagesBySection.ts';
import { css, Img, PageMetadata } from '../generate/mod.ts';

const sections = await getAllPagesBySection();

// deno-lint-ignore no-explicit-any
export default (props: any) => {
  return (
    <ShakDocument {...props}>
      <ShakHeader></ShakHeader>
      <div id="homeText">
      <span id='smalltext'>Hello,</span>
      <h1> I'm a Senior Product Designer looking for projects I'm passionate about.</h1>
      <p>I have 8 years experience working in UX and Product Design. I love solving complex design problems and creating beautiful interfaces that have a focus on inclusive design and accessibility. </p>
      <a href="https://github.com/ShakDamj/shakiradamji.com" className="primary">Check out my work</a> 
      <a href="https://github.com/ShakDamj/shakiradamji.com" className="secondary">Get in touch</a> 
      </div>
      <div id="homeImg">
      <Img src="plants.jpg" alt="" />
      </div>
    </ShakDocument>
  );
};
