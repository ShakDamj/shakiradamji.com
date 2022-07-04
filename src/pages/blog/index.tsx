import React from 'react';
import { Container } from '../../atoms/Container.tsx';
import { Heading3 } from '../../atoms/Heading.tsx';
import { Lang, tr, useLang } from '../../atoms/Lang.tsx';
import { RawHtml } from '../../atoms/RawHtml.tsx';
import { Time } from '../../atoms/Time.tsx';
import { css } from '../../deps/emotion.ts';
import { getAllPages, getPagesBySection } from '../../generate/pages.ts';
import { usePageUtils } from '../../generate/PageUtils.tsx';
import { ExpandableList } from '../../molecules/ExpandableList.tsx';
import { AmqHeader } from '../../organisms/AmqHeader.tsx';
import { AmqDocument } from '../../templates/AmqDocument.tsx';
import { highlightTheme } from '../../templates/AmqMarkdownPage.tsx';
import { cssColor } from '../../theme.ts';

const posts = getPagesBySection(await getAllPages()).blog.reverse();

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
                <Time className={timeStyles} value={item.date} />
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
