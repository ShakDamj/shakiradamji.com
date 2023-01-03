import React from 'react';
import { ShakDocument } from '../../components/ShakDocument.tsx';
import { ShakHeader } from '../../components/ShakHeader.tsx';
import { css, Lang, Markdown } from '../../generate/mod.ts';

// deno-lint-ignore no-explicit-any
export default ({ title, link, org, role, from, to, skills, content }: any) => {
  const styles = css`
  width: 65%;
  margin: 0 0 1rem 1rem;

img {
  width: 20%;
}`

  return (
    <ShakDocument title={title}>
      <ShakHeader />
      <article className={styles}>
      <h1>{org}</h1>
      <p>{role} {from} {to}</p>
      <p>{skills}</p>
      <Markdown>{content}</Markdown>
      </article>
    </ShakDocument>
  );
};