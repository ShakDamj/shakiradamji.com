import React from 'react';
import { ShakDocument } from '../../components/ShakDocument.tsx';
import { ShakHeader } from '../../components/ShakHeader.tsx';
import { css, Lang, Markdown } from '../../generate/mod.ts';

// This is the template that is used across each of the .md files. 
// deno-lint-ignore no-explicit-any
export default ({ title, content }: any) => {
  const styles = css`
width:50%;

img {
  width: 50%;
}
`
  return (
    <ShakDocument title={title}>
      <ShakHeader />
      <article className={styles}>
      <h1>{title}</h1>
      <Markdown>{content}</Markdown>
      </article>
    </ShakDocument>
  );
};

