import React from 'react';
import { ShakDocument } from '../../components/ShakDocument.tsx';
import { ShakHeader } from '../../components/ShakHeader.tsx';
import { Lang, Markdown } from '../../generate/mod.ts';

// deno-lint-ignore no-explicit-any
export default ({ title, link, org, role, from, to, labels, content }: any) => {
  return (
    <ShakDocument title={title}>
      <ShakHeader />
      <h1>{org} </h1>
      <p>{role} </p>
      <Markdown>{content}</Markdown>
    </ShakDocument>
  );
};