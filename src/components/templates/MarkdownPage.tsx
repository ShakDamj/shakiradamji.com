import React, { PropsWithChildren } from 'react';
import { Container } from '../atoms/Container.tsx';
import { css, Translatable, Markdown } from '../../generate/mod.ts';
import { TagList } from '../molecules/TagList.tsx';
import { AmqHeader } from '../organisms/AmqHeader.tsx';
import { cssSpace } from '../../theme.ts';
import { AmqDocument } from './AmqDocument.tsx';

export interface MarkdownPageProps extends PropsWithChildren<{}> {
  className?: string;
  title: Translatable;
  labels?: Translatable[];
  content: Translatable;
  footer?: JSX.Element | null;
}

export function MarkdownPage({
  className = '',
  title,
  labels,
  content,
  children,
  footer = null,
}: MarkdownPageProps) {
  const body = css`
    display: grid;
    padding-top: ${cssSpace.lg};
    gap: ${cssSpace.md};
  `;

  return (
    <AmqDocument title={title}>
      <AmqHeader />
      <Container className={`${body} ${className}`}>
        {children}
        {labels ? <TagList list={labels} /> : null}
        <Markdown>{content}</Markdown>
        {footer}
      </Container>
    </AmqDocument>
  );
}
