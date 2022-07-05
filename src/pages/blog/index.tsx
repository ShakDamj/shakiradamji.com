import React from 'react';
import { Container } from '../../components/atoms/Container.tsx';
import { Heading3 } from '../../components/atoms/Heading.tsx';
import { Time } from '../../components/atoms/Time.tsx';
import { css } from '../../deps/emotion.ts';
import { usePageUtils, Lang, RawHtml } from '../../generate/mod.ts';
import { ExpandableList } from '../../components/molecules/ExpandableList.tsx';
import { AmqHeader } from '../../components/organisms/AmqHeader.tsx';
import { AmqDocument } from '../../components/templates/AmqDocument.tsx';
import { highlightTheme } from '../../components/templates/AmqMarkdownPage.tsx';
import { cssColor } from '../../theme.ts';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';

const { blog: posts } = await getAllPagesBySection();

// deno-lint-ignore no-explicit-any
export default (props: any) => {
  const { Link } = usePageUtils();

  const itemStyles = css`
    padding: 3rem 0;

    & + & {
      border-top: 1px solid ${cssColor.border};
    }
  `;

  const headerStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `;

  const timeStyles = css`
    font-size: 0.8em;
  `;

  return (
    <AmqDocument title="Blog" styles={highlightTheme()} {...props}>
      <AmqHeader />

      <Container>
        <ExpandableList list={posts}>
          {(item) => (
            <li key={item.file} className={itemStyles}>
              <Heading3 className={headerStyles}>
                <Lang tr={item.title} />
                <Time className={timeStyles} value={item.published} />
              </Heading3>

              <RawHtml html={item.extract} />

              <Link page={item.file}>
                <Lang en="Read more" es="Leer más" />
              </Link>
            </li>
          )}
        </ExpandableList>
      </Container>
    </AmqDocument>
  );
};
