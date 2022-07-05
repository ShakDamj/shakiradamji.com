import React from 'react';
import { css } from '../../deps/emotion.ts';
import { cssSpace } from '../../theme.ts';
import { Heading2 } from '../../components/atoms/Heading.tsx';
import { AmqMarkdownPage } from '../../components/templates/AmqMarkdownPage.tsx';
import {
  RelatedLinks,
  RelatedLinksProps,
} from '../../components/molecules/RelatedLinks.tsx';
import {
  MarkdownPageMetadata,
  Translatable,
  YearMonthDay,
  Lang,
} from '../../generate/mod.ts';

export interface ProjectProps extends MarkdownPageMetadata {
  title: Translatable;
  links: RelatedLinksProps['links'];
  labels: Translatable[];
  from?: YearMonthDay;
  to?: YearMonthDay;
  content: Translatable;
}

export default ({ title, links, labels, content }: ProjectProps) => {
  const iconsNav = css`
    gap: ${cssSpace.lg};
    margin-left: ${cssSpace.lg};
  `;

  return (
    <AmqMarkdownPage title={title} labels={labels} content={content}>
      <Heading2>
        <Lang tr={title} />
        <RelatedLinks className={iconsNav} links={links} />
      </Heading2>

      {/*
        <div className={timeSpanStyles}>
          <Time value={from} omitDay /> - <Time value={to} omitDay />
        </div>
        */}
    </AmqMarkdownPage>
  );
};
