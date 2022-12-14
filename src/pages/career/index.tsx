import React from 'react';
import { ShakDocument } from '../../components/ShakDocument.tsx';
import { ShakHeader } from '../../components/ShakHeader.tsx';
import { usePageUtils, PageMetadata, Markdown, css } from '../../generate/mod.ts';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';

const { career } = await getAllPagesBySection();

export default (props: PageMetadata) => {
  const { Link } = usePageUtils();
  const styles = css`

width: 65%;
margin: 0 0 1rem 1rem;
  
  .md{
    width: 70%
    display: flex;
  }

  h2{
    margin-top:2rem;
  }

  div {
    display:flex;
    flex-wrap:wrap;
  }

  a{
    padding:0.5em 0 0 0;
  }

  img {
    width: 12%;
    float:left;
    display:inline-block;
    margin-right: 2em;
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
          <h3>{post.role}, {post.from} - {post.to}</h3>
          <p>{post.skills}</p>
          <Markdown readMore={post.file}>{post.content}</Markdown>
        </article>
      ))}
    </ShakDocument>
  );
};
