import React from 'react';
import { AmqDocument } from '../components/templates/AmqDocument.tsx';
import { AmqHeader } from '../components/organisms/AmqHeader.tsx';
import { AmqPageList } from '../components/organisms/AmqPageList.tsx';
import { Container } from '../components/atoms/Container.tsx';
import { getAllPagesBySection } from '../util/getAllPagesBySection.ts';
import { Img } from "../generate/mod.ts";

const sections = await getAllPagesBySection();

// deno-lint-ignore no-explicit-any
export default (props: any) => {
  return (
    <AmqDocument {...props}>

<AmqHeader></AmqHeader>

 <p>A description about Shakira goes here...</p>
 <Img src="pensieve.png" alt={""}/>
    </AmqDocument>
  );
};
