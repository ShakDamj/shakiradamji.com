import React from 'react';
import { AmqDocument } from '../../components/AmqDocument.tsx';
import { AmqHeader } from '../../components/AmqHeader.tsx';
import { usePageUtils, PageMetadata, Markdown } from '../../generate/mod.ts';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';

const { career } = await getAllPagesBySection();

export default (props: PageMetadata) => {
  const { Link } = usePageUtils();

  return (
    <AmqDocument {...props} title="Blog">
      <AmqHeader />

      {career.map((post) => (
        <article key={post.title}>
          <h2>
            <Link page={post.file}>{post.title}</Link>
          </h2>
          <Markdown>{post.content}</Markdown>
        </article>
      ))}
    </AmqDocument>
  );
};
