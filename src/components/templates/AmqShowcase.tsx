import React, { IframeHTMLAttributes } from 'react';
import { css } from '../../deps/emotion.ts';
import { cssSpace } from '../../theme.ts';
import { Heading2 } from '../../components/atoms/Heading.tsx';
import {
  AmqMarkdownPage,
  AmqMarkdownPageProps,
} from '../../components/templates/AmqMarkdownPage.tsx';
import {
  RelatedLinks,
  RelatedLinksProps,
} from '../../components/molecules/RelatedLinks.tsx';
import { Translatable, Lang, useLang, tr } from '../../generate/mod.ts';

export interface AmqShowcaseProps extends AmqMarkdownPageProps {
  links: RelatedLinksProps['links'];
  iframe?: IframeHTMLAttributes<unknown> & { src: Translatable };
}

export default ({
  title,
  links,
  labels,
  iframe,
  content,
}: AmqShowcaseProps) => {
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

      {iframe && <iframe {...iframe} src={tr(iframe.src, useLang())} />}
    </AmqMarkdownPage>
  );
};
