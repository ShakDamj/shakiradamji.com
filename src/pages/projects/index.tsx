import React from 'react';
import { css } from '../../deps/emotion.ts';
import { Markdown, PageMetadata, usePageUtils } from '../../generate/mod.ts';
import { Container } from '../../components/atoms/Container.tsx';
import { Heading3 } from '../../components/atoms/Heading.tsx';
import { RelatedLinks } from '../../components/molecules/RelatedLinks.tsx';
import { AmqHeader } from '../../components/organisms/AmqHeader.tsx';
import { AmqDocument } from '../../components/templates/AmqDocument.tsx';
import { getAllPagesBySection } from '../../util/getAllPagesBySection.ts';
import { ResponsiveHeader } from '../../components/molecules/ResponsiveHeader.tsx';
import { cssBreakpoint } from '../../theme.ts';

const { projects, experiments } = await getAllPagesBySection();

export default (props: PageMetadata) => {
  const { Link } = usePageUtils();

  const listStyles = css`
    display: grid;
    grid-gap: 2rem;
    list-style: none;

    ${cssBreakpoint.medium} {
      grid-template-columns: repeat(2, 1fr);
    }
  `;

  const itemStyles = css`
    margin: 3rem 0;
  `;

  const iconStyles = css`
    gap: 1rem;
  `;

  return (
    <AmqDocument {...props} title={{ en: 'Projects', es: 'Projectos' }}>
      <AmqHeader />

      <Container>
        <ol className={listStyles}>
          {projects.map((item) => (
            <li key={item.file} className={itemStyles}>
              <ResponsiveHeader>
                <Link page={item.file}>{item.title}</Link>
                <RelatedLinks className={iconStyles} links={item.links} />
              </ResponsiveHeader>

              <Markdown>{item.content}</Markdown>
            </li>
          ))}
        </ol>
      </Container>
    </AmqDocument>
  );
};
