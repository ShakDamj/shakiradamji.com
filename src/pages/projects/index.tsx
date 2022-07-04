import React from 'react';
import { Container } from '../../atoms/Container.tsx';
import { Heading3 } from '../../atoms/Heading.tsx';
import { Lang, tr, useLang } from '../../atoms/Lang.tsx';
import { RawHtml } from '../../atoms/RawHtml.tsx';
import { css } from '../../deps/emotion.ts';
import { getAllPages, getPagesBySection } from '../../generate/pages.ts';
import { usePageUtils } from '../../generate/PageUtils.tsx';
import { RelatedLinks } from '../../molecules/RelatedLinks.tsx';
import { AmqHeader } from '../../organisms/AmqHeader.tsx';
import { AmqDocument } from '../../templates/AmqDocument.tsx';

const { projects, experiments } = getPagesBySection(await getAllPages());

projects.reverse();
experiments.reverse();

// deno-lint-ignore no-explicit-any
export default (props: any) => {
  const { Link } = usePageUtils();
  const lang = useLang();

  const listStyles = css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
  `;

  const itemStyles = css`
    margin: 3rem 0;
  `;

  const headerStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `;

  const iconStyles = css`
    gap: 1rem;
  `;

  return (
    <AmqDocument title="A. Matías Quezada" {...props}>
      <AmqHeader />

      <Container>
        <ol className={listStyles}>
          {projects.map((item) => (
            <li key={item.file} className={itemStyles}>
              <Heading3 className={headerStyles}>
                <Link page={item.file}>{item.title}</Link>
                <RelatedLinks className={iconStyles} links={item.links} />
              </Heading3>

              <RawHtml html={item.extract} />
            </li>
          ))}
        </ol>
      </Container>
    </AmqDocument>
  );
};
