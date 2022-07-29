import React from 'react';
import { Container } from '../../components/atoms/Container.tsx';
import { Heading2 } from '../../components/atoms/Heading.tsx';
import { Time } from '../../components/atoms/Time.tsx';
import { css } from '../../deps/emotion.ts';
import { usePageUtils, PageMetadata, Markdown } from '../../generate/mod.ts';
import { ExpandableList } from '../../components/organisms/ExpandableList.tsx';
import { AmqHeader } from '../../components/organisms/AmqHeader.tsx';
import { AmqDocument } from '../../components/templates/AmqDocument.tsx';
import {
  cssAnimationFunction,
  cssAnimationSpeed,
  cssBreakpoint,
  cssColor,
} from '../../theme.ts';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';
import { ResponsiveHeader } from '../../components/molecules/ResponsiveHeader.tsx';

const { blog: posts } = await getAllPagesBySection();

export default (props: PageMetadata) => {
  const { Link } = usePageUtils();

  const itemStyles = css`
    padding: 3rem 0 5rem;

    & + & {
      border-top: 1px solid ${cssColor.border};
    }
  `;

  const headerStyles = css`
    ${cssBreakpoint.medium} {
      a {
        letter-spacing: 1px;
        transition: transform ${cssAnimationSpeed.medium}
          ${cssAnimationFunction.bouncy};
        transform: translateX(0px);
      }

      &:hover a:not(:active) {
        transform: translateX(20px);
      }
    }
  `;

  const articleStyles = css`
    h2 {
      font-size: 1.5rem;
    }
  `;

  return (
    <AmqDocument {...props} title="Blog">
      <AmqHeader />

      <Container>
        <ExpandableList list={posts}>
          {(item) => (
            <li key={item.id} className={itemStyles}>
              <ResponsiveHeader as={Heading2} className={headerStyles}>
                <Link page={item.file}>{item.title}</Link>
                <Time value={item.published} />
              </ResponsiveHeader>

              <Markdown className={articleStyles} readMore={item.file}>
                {item.content}
              </Markdown>
            </li>
          )}
        </ExpandableList>
      </Container>
    </AmqDocument>
  );
};
