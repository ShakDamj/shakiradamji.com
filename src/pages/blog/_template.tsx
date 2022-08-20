import React from 'react';
import { AmqDocument } from '../../components/AmqDocument.tsx';
import { AmqHeader } from '../../components/AmqHeader.tsx';
import { Img, Lang, Markdown } from '../../generate/mod.ts';

export default ({ title, published, myImagePath, content }: any) => {
  return (
    <AmqDocument title={title}>
      <AmqHeader />
      <h2>
        {title}
        {published.toString()}
      </h2>
      <Img src={myImagePath} alt={'My image'} />
      <Markdown>{content}</Markdown>
    </AmqDocument>
  );
};
