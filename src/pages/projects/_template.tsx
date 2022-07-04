import React from 'react';
import { Translatable, Lang } from '../../atoms/Lang.tsx';
import { css } from '../../deps/emotion.ts';
import { YearMonthDay } from '../../atoms/Time.tsx';
import { cssSpace } from '../../theme.ts';
import { Heading2 } from '../../atoms/Heading.tsx';
import { AmqMarkdownPage } from '../../templates/AmqMarkdownPage.tsx';
import { PageMetadata } from '../../generate/pages.ts';
import {
  RelatedLinks,
  RelatedLinksProps,
} from '../../molecules/RelatedLinks.tsx';

export interface ProjectProps extends PageMetadata {
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
