import React from 'react';
import { css } from '../../deps/emotion.ts';
import { usePageUtils, useLang, RawHtml } from '../../generate/mod.ts';
import { Container } from '../../components/atoms/Container.tsx';
import { Heading3 } from '../../components/atoms/Heading.tsx';
import { RelatedLinks } from '../../components/molecules/RelatedLinks.tsx';
import { AmqHeader } from '../../components/organisms/AmqHeader.tsx';
import { AmqDocument } from '../../components/templates/AmqDocument.tsx';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';

const { projects, experiments } = await getAllPagesBySection();

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
