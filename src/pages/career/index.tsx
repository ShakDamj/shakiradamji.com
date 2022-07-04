import React from 'react';
import { Container } from '../../atoms/Container.tsx';
import { Heading3 } from '../../atoms/Heading.tsx';
import { Lang } from '../../atoms/Lang.tsx';
import { RawHtml } from '../../atoms/RawHtml.tsx';
import { Time } from '../../atoms/Time.tsx';
import { css } from '../../deps/emotion.ts';
import { getAllPages, getPagesBySection } from '../../generate/pages.ts';
import { usePageUtils } from '../../generate/PageUtils.tsx';
import { TagList } from '../../molecules/TagList.tsx';
import { AmqHeader } from '../../organisms/AmqHeader.tsx';
import { AmqDocument } from '../../templates/AmqDocument.tsx';

const experience = getPagesBySection(await getAllPages()).career.reverse();
const SHOW_OPEN_ONLY_TOP = 3;

// deno-lint-ignore no-explicit-any
export default (props: any) => {
  const { Link } = usePageUtils();

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
        <ol>
          {experience.map((item, index) => (
            <li key={item.file} className={itemStyles}>
              <details open={index < SHOW_OPEN_ONLY_TOP}>
                <summary>
                  <Heading3 className={headerStyles}>
                    <Lang tr={item.title} />
                    <Time className={timeStyles} value={item.date} />
                  </Heading3>

                  {item.labels ? <TagList list={item.labels} /> : null}
                </summary>

                <RawHtml html={item.content} />
              </details>
            </li>
          ))}
        </ol>
      </Container>
    </AmqDocument>
  );
};
