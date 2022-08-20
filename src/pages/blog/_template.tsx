import React from 'react';
import { ShakDocument } from '../../components/ShakDocument.tsx';
import { ShakHeader } from '../../components/ShakHeader.tsx';
import { Img, Lang, Markdown } from '../../generate/mod.ts';

export default ({ title, published, myImagePath, content }: any) => {
  return (
    <ShakDocument title={title}>
      <ShakHeader />
      <h2>
        {title}
        {published.toString()}
      </h2>
      <Img src={myImagePath} alt={'My image'} />
      <Markdown>{content}</Markdown>
    </ShakDocument>
  );
};
