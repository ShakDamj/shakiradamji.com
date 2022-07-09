import React from 'react';
import { Time } from '../../components/atoms/Time.tsx';
import { Heading2 } from '../../components/atoms/Heading.tsx';
import { AmqMarkdownPage } from '../../components/templates/AmqMarkdownPage.tsx';
import {
  Lang,
  MarkdownPageMetadata,
  YearMonthDay,
} from '../../generate/mod.ts';
import { ResponsiveHeader } from '../../components/molecules/ResponsiveHeader.tsx';
import { AmqComments } from '../../components/organisms/AmqComments.tsx';

export interface BlogPostProps extends MarkdownPageMetadata {
  published: YearMonthDay;
}

export default ({ title, published, content }: BlogPostProps) => {
  return (
    <AmqMarkdownPage title={title} content={content} footer={<AmqComments />}>
      <ResponsiveHeader as={Heading2}>
        <Lang tr={title} />
        <Time value={published} />
      </ResponsiveHeader>
    </AmqMarkdownPage>
  );
};
