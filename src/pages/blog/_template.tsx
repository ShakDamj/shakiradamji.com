import React from 'react';
import { css } from '../../deps/emotion.ts';
import { Time } from '../../components/atoms/Time.tsx';
import { Heading2 } from '../../components/atoms/Heading.tsx';
import { AmqMarkdownPage } from '../../components/templates/AmqMarkdownPage.tsx';
import {
  MarkdownPageMetadata,
  Translatable,
  YearMonthDay,
} from '../../generate/mod.ts';

export interface BlogPostProps extends MarkdownPageMetadata {
  title: Translatable;
  published: YearMonthDay;
  content: Translatable;
}

export default ({ title, published, content }: BlogPostProps) => {
  const headerStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `;

  return (
    <AmqMarkdownPage title={title} content={content}>
      <div className={headerStyles}>
        <Heading2>{title}</Heading2>
        <Time value={published} />
      </div>
    </AmqMarkdownPage>
  );
};
