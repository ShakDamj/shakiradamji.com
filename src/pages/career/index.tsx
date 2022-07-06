import React from 'react';
import { Container } from '../../components/atoms/Container.tsx';
import { Heading2, Heading3 } from '../../components/atoms/Heading.tsx';
import { Time } from '../../components/atoms/Time.tsx';
import { TagList } from '../../components/molecules/TagList.tsx';
import { AmqHeader } from '../../components/organisms/AmqHeader.tsx';
import { AmqDocument } from '../../components/templates/AmqDocument.tsx';
import { css } from '../../deps/emotion.ts';
import { usePageUtils, Lang, RawHtml } from '../../generate/mod.ts';
import { cssFontSize, cssSpace } from '../../theme.ts';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';

const { career, talks } = await getAllPagesBySection();
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
    gap: ${cssSpace.lg};
  `;

  const timeStyles = css`
    font-size: 0.8em;
  `;

  const tagsStyles = css`
    font-size: 0.9rem;
  `;

  const showDetailsStyle = css`
    margin-top: 1rem;
    cursor: pointer;
  `;

  const talkStyles = css`
    ${headerStyles}
    font-size: ${cssFontSize.md};
    margin: 1rem 0;

    &:last-child {
      margin-bottom: 3rem;
    }
  `;

  return (
    <AmqDocument title="A. Matías Quezada" {...props}>
      <AmqHeader />

      <Container>
        <ol>
          {career.map((item, index) => {
            const content = (
              <>
                {item.labels ? (
                  <TagList className={tagsStyles} list={item.labels} />
                ) : null}

                <RawHtml html={item.content} />
              </>
            );

            return (
              <li key={item.file} className={itemStyles}>
                <Heading3 className={headerStyles}>
                  <Time className={timeStyles} value={item.date} />
                  <Lang tr={item.title} />
                </Heading3>

                {index < SHOW_OPEN_ONLY_TOP ? (
                  content
                ) : (
                  <details>
                    <summary className={showDetailsStyle}>Show details</summary>
                    {content}
                  </details>
                )}
              </li>
            );
          })}
        </ol>

        <Heading2>
          <Lang en="Talks" es="Charlas" />
        </Heading2>

        <ol>
          {talks.map((item) => (
            <li key={item.file} className={talkStyles}>
              <Time className={timeStyles} value={item.date} omitDay />
              <Link page={item.file}>
                <Lang tr={item.title} />
              </Link>
              {/* </Heading3> */}
            </li>
          ))}
        </ol>
      </Container>
    </AmqDocument>
  );
};
