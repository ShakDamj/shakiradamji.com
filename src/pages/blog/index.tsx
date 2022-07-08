import React from 'react';
import { Container } from '../../components/atoms/Container.tsx';
import { Heading3 } from '../../components/atoms/Heading.tsx';
import { Time } from '../../components/atoms/Time.tsx';
import { css } from '../../deps/emotion.ts';
import {
  usePageUtils,
  Lang,
  PageMetadata,
  Markdown,
} from '../../generate/mod.ts';
import { ExpandableList } from '../../components/molecules/ExpandableList.tsx';
import { AmqHeader } from '../../components/organisms/AmqHeader.tsx';
import { AmqDocument } from '../../components/templates/AmqDocument.tsx';
import { cssAnimationSpeed, cssBreakpoint, cssColor } from '../../theme.ts';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';
import { ResponsiveHeader } from '../../components/molecules/ResponsiveHeader.tsx';

const { blog: posts } = await getAllPagesBySection();

export default (props: PageMetadata) => {
  const { Link } = usePageUtils();

  const itemStyles = css`
    padding: 3rem 0;

    & + & {
      border-top: 1px solid ${cssColor.border};
    }
  `;

  const headerStyles = css`
    ${cssBreakpoint.medium} {
      a {
        letter-spacing: 1px;
        transition: transform ${cssAnimationSpeed.fast} ease-in-out;
        transform: translateX(0px);
      }

      &:hover a:not(:active) {
        transform: translateX(10px);
      }
    }
  `;

  const timeStyles = css`
    font-size: 0.8em;
  `;

  return (
    <AmqDocument {...props} title="Blog">
      <AmqHeader />

      <Container>
        <ExpandableList list={posts}>
          {(item) => (
            <li key={item.file} className={itemStyles}>
              <ResponsiveHeader className={headerStyles}>
                <Link page={item.file}>{item.title}</Link>
                <Time className={timeStyles} value={item.published} />
              </ResponsiveHeader>

              <Markdown readMore={item.file}>{item.content}</Markdown>
            </li>
          )}
        </ExpandableList>
      </Container>
    </AmqDocument>
  );
};
