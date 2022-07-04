import React from 'react';
import { Container } from '../../atoms/Container.tsx';
import { Heading3 } from '../../atoms/Heading.tsx';
import { tr, useLang } from '../../atoms/Lang.tsx';
import { RawHtml } from '../../atoms/RawHtml.tsx';
import { Time } from '../../atoms/Time.tsx';
import { css } from '../../deps/emotion.ts';
import { getAllPages, getPagesBySection } from '../../generate/pages.ts';
import { usePageUtils } from '../../generate/PageUtils.tsx';
import { ExpandableList } from '../../molecules/ExpandableList.tsx';
import { AmqHeader } from '../../organisms/AmqHeader.tsx';
import { AmqDocument } from '../../templates/AmqDocument.tsx';

const posts = getPagesBySection(await getAllPages()).blog.reverse();

// deno-lint-ignore no-explicit-any
export default (props: any) => {
  const { Link } = usePageUtils();
  const lang = useLang();

  const itemStyles = css`
    margin: 3rem 0;
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
    <AmqDocument title="A. Matías Quezada" {...props}>
      <AmqHeader />

      <Container>
        <ExpandableList list={posts}>
          {(item) => (
            <li key={item.file} className={itemStyles}>
              <Heading3 className={headerStyles}>
                <Link page={item.file}>{item.title}</Link>
                <Time className={timeStyles} value={item.date} />
              </Heading3>
              <RawHtml html={item.extract} />
            </li>
          )}
        </ExpandableList>
      </Container>
    </AmqDocument>
  );
};
