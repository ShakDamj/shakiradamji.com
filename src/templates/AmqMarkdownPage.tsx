import React, { PropsWithChildren } from 'react';
import { Container } from '../atoms/Container.tsx';
import { Heading2 } from '../atoms/Heading.tsx';
import { Lang, Translatable } from '../atoms/Lang.tsx';
import { css } from '../deps/emotion.ts';
import { TagList } from '../molecules/TagList.tsx';
import { AmqHeader } from '../organisms/AmqHeader.tsx';
import { cssSpace } from '../theme.ts';
import { AmqDocument } from './AmqDocument.tsx';

export interface AmqMarkdownPageProps extends PropsWithChildren<{}> {
  title: Translatable;
  labels?: Translatable[];
  content: Translatable;
}

export function AmqMarkdownPage({
  title,
  labels,
  content,
  children,
}: AmqMarkdownPageProps) {
  const body = css`
    display: grid;
    padding-top: ${cssSpace.lg};
    gap: ${cssSpace.md};
  `;

  return (
    <AmqDocument title={title}>
      <AmqHeader />
      <Container className={body}>
        {children}

        {labels ? <TagList list={labels} /> : null}

        <Lang tr={content} />
      </Container>
    </AmqDocument>
  );
}
