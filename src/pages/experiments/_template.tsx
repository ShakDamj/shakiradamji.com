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
  Lang,
} from '../../generate/mod.ts';

export interface ExperimentProps extends MarkdownPageMetadata {
  title: Translatable;
  links: RelatedLinksProps['links'];
  iframe?: boolean;
}

export default ({ title, links, labels, content }: ExperimentProps) => {
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
    </AmqMarkdownPage>
  );
};
