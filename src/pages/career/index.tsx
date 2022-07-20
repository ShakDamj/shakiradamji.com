import React from 'react';
import { Container } from '../../components/atoms/Container.tsx';
import { Heading2, Heading3 } from '../../components/atoms/Heading.tsx';
import { IconLink } from '../../components/atoms/IconLink.tsx';
import { PdfIcon } from '../../components/atoms/icons.tsx';
import { Time } from '../../components/atoms/Time.tsx';
import { ResponsiveHeader } from '../../components/molecules/ResponsiveHeader.tsx';
import { TagList } from '../../components/molecules/TagList.tsx';
import { AmqHeader } from '../../components/organisms/AmqHeader.tsx';
import { AmqPageList } from '../../components/organisms/AmqPageList.tsx';
import { AmqDocument } from '../../components/templates/AmqDocument.tsx';
import { css } from '../../deps/emotion.ts';
import {
  Lang,
  Markdown,
  PageMetadata,
  tr,
  useLang,
} from '../../generate/mod.ts';
import { cssAnimationSpeed, cssSpace } from '../../theme.ts';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';

const { career, talks } = await getAllPagesBySection();
const SHOW_OPEN_ONLY_TOP = 1;

export default (props: PageMetadata) => {
  const itemStyles = css`
    margin: 3rem 0;
  `;

  const headerStyles = css`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: ${cssSpace.lg};
    margin: 0;
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
    <AmqDocument {...props} title="CV">
      <AmqHeader />

      <Container>
        <ResponsiveHeader as={Heading2}>
          <Lang en="Career" es="Currículum" />
          <IconLink
            href="../cv/"
            icon={
              <PdfIcon
                title={tr(['Download PDF', 'Descargar PDF'], useLang())}
              />
            }
          />
        </ResponsiveHeader>

        <ol>
          {career.map((item, index) => (
            <li key={item.file} className={itemStyles}>
              <details
                open={index < SHOW_OPEN_ONLY_TOP}
                className={detailStyles}
              >
                <summary>
                  <Heading3 className={headerStyles}>
                    <Time value={item.date} />
                    <Lang tr={item.title} />
                  </Heading3>
                </summary>

                {item.labels ? (
                  <TagList className={tagsStyles} list={item.labels} />
                ) : null}

                <Markdown>{item.content}</Markdown>
              </details>
            </li>
          ))}
        </ol>

        <AmqPageList
          name={{ en: '💬  Talks', es: '💬  Charlas' }}
          list={talks}
        />
      </Container>
    </AmqDocument>
  );
};
