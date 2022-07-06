import React from 'react';
import { Container } from '../../components/atoms/Container.tsx';
import { Heading3 } from '../../components/atoms/Heading.tsx';
import { Time } from '../../components/atoms/Time.tsx';
import { TagList } from '../../components/molecules/TagList.tsx';
import { AmqHeader } from '../../components/organisms/AmqHeader.tsx';
import { AmqPageList } from '../../components/organisms/AmqPageList.tsx';
import { AmqDocument } from '../../components/templates/AmqDocument.tsx';
import { css } from '../../deps/emotion.ts';
import { Lang, RawHtml } from '../../generate/mod.ts';
import { cssAnimationSpeed, cssSpace } from '../../theme.ts';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';

const { career, talks } = await getAllPagesBySection();
const SHOW_OPEN_ONLY_TOP = 1;

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

  const detailStyles = css`
    summary {
      margin-top: 1rem;
      cursor: pointer;
      list-style: none;

      &::before {
        content: '';
        display: inline-block;
        border-width: 0.4rem;
        border-style: solid;
        border-color: transparent transparent transparent #fff;
        margin-right: ${cssSpace.md};
        transform-origin: 0.2rem 50%;
        transition: transform ${cssAnimationSpeed.medium} ease,
          opacity ${cssAnimationSpeed.medium} ease;
        transform: rotate(0deg);
        opacity: 0;

        position: absolute;
        margin-top: 0.35em;
        margin-left: -1.3em;
      }

      &:hover::before {
        opacity: 1;
      }
    }

    &[open] summary::before {
      transform: rotate(90deg);
    }
  `;

  return (
    <AmqDocument title="A. Matías Quezada" {...props}>
      <AmqHeader />

      <Container>
        <ol>
          {career.map((item, index) => (
            <li key={item.file} className={itemStyles}>
              <details
                open={index < SHOW_OPEN_ONLY_TOP}
                className={detailStyles}
              >
                <summary>
                  <Heading3 className={headerStyles}>
                    <Time className={timeStyles} value={item.date} />
                    <Lang tr={item.title} />
                  </Heading3>
                  ,
                </summary>
                {item.labels ? (
                  <TagList className={tagsStyles} list={item.labels} />
                ) : null}

                <RawHtml html={item.content} />
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
