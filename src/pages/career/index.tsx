import React from 'react';
import { Container } from '../../components/atoms/Container.tsx';
import { Heading2, Heading3 } from '../../components/atoms/Heading.tsx';
import { Time } from '../../components/atoms/Time.tsx';
import { TagList } from '../../components/molecules/TagList.tsx';
import { AmqHeader } from '../../components/organisms/AmqHeader.tsx';
import { AmqPageList } from '../../components/organisms/AmqPageList.tsx';
import { AmqDocument } from '../../components/templates/AmqDocument.tsx';
import { css } from '../../deps/emotion.ts';
import { usePageUtils, Lang, RawHtml } from '../../generate/mod.ts';
import { cssFontSize, cssSpace } from '../../theme.ts';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';

const { career, talks } = await getAllPagesBySection();
const SHOW_OPEN_ONLY_TOP = 3;

// deno-lint-ignore no-explicit-any
export default (props: any) => {
  const itemStyles = css`
    margin: 3rem 0;
  `;

  const headerStyles = css`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: ${cssSpace.lg};
  `;

  const timeStyles = css`
    font-size: 0.8em;
  `;

  const tagsStyles = css`
    font-size: 0.9rem;
  `;

  const summaryStyle = css`
    margin-top: 1rem;
    cursor: pointer;
    position: relative;

    &::before {
      position: absolute;
      top: 0.3em;
      left: 3.7em;
    }

    & time {
      margin-right: 1.3em;
    }
  `;

  const items = career.map(
    (item) =>
      [
        item.file,
        <Heading3 className={headerStyles}>
          <Time className={timeStyles} value={item.date} />
          <Lang tr={item.title} />
        </Heading3>,
        <>
          {item.labels ? (
            <TagList className={tagsStyles} list={item.labels} />
          ) : null}

          <RawHtml html={item.content} />
        </>,
      ] as const
  );

  const top = items.slice(0, SHOW_OPEN_ONLY_TOP);
  const rest = items.slice(SHOW_OPEN_ONLY_TOP);

  return (
    <AmqDocument title="A. Matías Quezada" {...props}>
      <AmqHeader />

      <Container>
        <ol>
          {top.map(([file, header, content]) => (
            <li key={file} className={itemStyles}>
              {header}
              {content}
            </li>
          ))}
          {rest.map(([file, header, content]) => (
            <li key={file} className={itemStyles}>
              <details>
                <summary className={summaryStyle}>{header}</summary>
                {content}
              </details>
            </li>
          ))}
        </ol>

        <AmqPageList
          name={{ en: '🪧  Talks', es: '🪧  Charlas' }}
          list={talks}
        />
      </Container>
    </AmqDocument>
  );
};
