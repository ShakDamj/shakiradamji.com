import React from 'react';
import { ShakDocument } from '../../components/ShakDocument.tsx';
import { ShakHeader } from '../../components/ShakHeader.tsx';
import { usePageUtils, PageMetadata, Markdown, css } from '../../generate/mod.ts';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';

const { career } = await getAllPagesBySection();

export default (props: PageMetadata) => {
  const { Link } = usePageUtils();
  const styles = css`

width: 70%;
  
  .md{
    width: 70%
    display: flex;
  }

  img {
    width: 150px;
    float:left;
    display:inline-block;
    margin-right: 5em;
  }

  div{
  }
  `

  return (
    <ShakDocument {...props} title="CV">
      <ShakHeader />

      {career.map((post) => (
        <article key={post.title} className={styles}>
          <h2>
            <Link page={post.file}>{post.title}</Link>
          </h2>
          <h3> {post.role} {post.from} {post.to} </h3>
          <Markdown readMore={post.file}>{post.content}</Markdown>
        </article>
      ))}
    </ShakDocument>
  );
};
