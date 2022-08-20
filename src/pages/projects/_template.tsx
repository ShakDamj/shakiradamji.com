import React from 'react';
import { ShakDocument } from '../../components/ShakDocument.tsx';
import { ShakHeader } from '../../components/ShakHeader.tsx';
import { Lang, Markdown } from '../../generate/mod.ts';

export default ({ title, content }: any) => {
  return (
    <ShakDocument title={title}>
      <ShakHeader />
      <h2>{title}</h2>
      <Markdown>{content}</Markdown>
    </ShakDocument>
  );
};
