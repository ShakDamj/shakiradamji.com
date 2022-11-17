import React from 'react';
import { ShakDocument } from '../../components/ShakDocument.tsx';
import { ShakHeader } from '../../components/ShakHeader.tsx';
import { css, Lang, Markdown } from '../../generate/mod.ts';

// deno-lint-ignore no-explicit-any
export default ({ title, link, org, role, from, to, labels, content }: any) => {
  const styles = css`
width:50%;

img {
  width: 50%;
}`

  return (
    <ShakDocument title={title}>
      <ShakHeader />
      <article className={styles}>
      <h1>{org} </h1>
      <p>{role} </p>
      <Markdown>{content}</Markdown>
      </article>
    </ShakDocument>
  );
};