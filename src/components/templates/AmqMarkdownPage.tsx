import React, { PropsWithChildren } from 'react';
import { Container } from '../atoms/Container.tsx';
import { css } from '../../deps/emotion.ts';
import { Translatable, Markdown } from '../../generate/mod.ts';
import { TagList } from '../molecules/TagList.tsx';
import { AmqHeader } from '../organisms/AmqHeader.tsx';
import { cssSpace } from '../../theme.ts';
import { AmqDocument } from './AmqDocument.tsx';

export interface AmqMarkdownPageProps extends PropsWithChildren<{}> {
  title: Translatable;
  labels?: Translatable[];
  content: Translatable;
  footer?: JSX.Element | null;
}

export function AmqMarkdownPage({
  title,
  labels,
  content,
  children,
  footer = null,
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
        <Markdown>{content}</Markdown>
        {footer}
      </Container>
    </AmqDocument>
  );
}
