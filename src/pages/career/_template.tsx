import React from 'react';
import { AmqDocument } from '../../components/AmqDocument.tsx';
import { AmqHeader } from '../../components/AmqHeader.tsx';
import { Lang, Markdown } from '../../generate/mod.ts';

export default ({ title, link, org, role, from, to, labels, content }: any) => {
  return (
    <AmqDocument title={title}>
      <AmqHeader />
      <h2>
        {role}
        {org}
      </h2>
      <Markdown>{content}</Markdown>
    </AmqDocument>
  );
};
