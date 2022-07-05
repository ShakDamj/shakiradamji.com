import React from 'react';
import { Container } from '../../atoms/Container.tsx';
import { Heading3 } from '../../atoms/Heading.tsx';
import { Time } from '../../atoms/Time.tsx';
import { css } from '../../deps/emotion.ts';
import { usePageUtils, Lang, RawHtml } from '../../generate/mod.ts';
import { TagList } from '../../molecules/TagList.tsx';
import { AmqHeader } from '../../organisms/AmqHeader.tsx';
import { AmqDocument } from '../../templates/AmqDocument.tsx';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';

const { career } = await getAllPagesBySection();
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

  const tagsStyles = css`
    font-size: 0.9rem;
  `;

  return (
    <AmqDocument title="A. Matías Quezada" {...props}>
      <AmqHeader />

      <Container>
        <ol>
          {career.map((item, index) => (
            <li key={item.file} className={itemStyles}>
              <Heading3 className={headerStyles}>
                <Lang tr={item.title} />
                <Time className={timeStyles} value={item.date} />
              </Heading3>

              {item.labels ? (
                <TagList className={tagsStyles} list={item.labels} />
              ) : null}

              {index < SHOW_OPEN_ONLY_TOP ? (
                <RawHtml html={item.content} />
              ) : (
                <details>
                  <summary>Details</summary>
                  <RawHtml html={item.content} />
                </details>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </AmqDocument>
  );
};
