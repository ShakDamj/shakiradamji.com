import React from 'react';
import { ShakDocument } from '../../components/ShakDocument.tsx';
import { ShakHeader } from '../../components/ShakHeader.tsx';
import { usePageUtils, PageMetadata, Markdown } from '../../generate/mod.ts';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';

const { blog } = await getAllPagesBySection();

export default (props: PageMetadata) => {
  const { Link } = usePageUtils();

  return (
    <ShakDocument {...props} title="Blog">
      <ShakHeader />

      {blog.map((post) => (
        <article key={post.title}>
          <h2>
            <Link page={post.file}>{post.title}</Link>
          </h2>
          <Markdown readMore={post.file}>{post.content}</Markdown>
        </article>
      ))}
    </ShakDocument>
  );
};
