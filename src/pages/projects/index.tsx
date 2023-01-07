import React from 'react';
import { ShakDocument } from '../../components/ShakDocument.tsx';
import { ShakHeader } from '../../components/ShakHeader.tsx';
import { usePageUtils, PageMetadata, Markdown, css } from '../../generate/mod.ts';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';

const { projects } = await getAllPagesBySection();

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

  `
  // I have added the class name to the full article to apply the styles to the index page
  return (
    <ShakDocument {...props} title="Blog">
      <ShakHeader />

      {projects.map((post) => (
        <article key={post.title} className={styles}>
          <h2>
            <Link page={post.file}>{post.title}</Link>
          </h2>
          <Markdown readMore={post.file}>{post.content}</Markdown>
        </article>
      ))}
    </ShakDocument>
  );
};
