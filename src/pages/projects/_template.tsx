import React from 'react';
import { AmqDocument } from '../../templates/AmqDocument.tsx';
import { Translatable, Lang } from '../../atoms/Lang.tsx';
import { css } from '../../deps/emotion.ts';
import { Container } from '../../atoms/Container.tsx';
import { YearMonthDay } from '../../atoms/Time.tsx';
import { TagList } from '../../molecules/TagList.tsx';
import { AmqHeader } from '../../organisms/AmqHeader.tsx';
import { cssSpace } from '../../theme.ts';
import { Heading2 } from '../../atoms/Heading.tsx';
import { FlaskIcon, GithubIcon } from '../../atoms/icons.tsx';
import { PlayIcon } from '../../atoms/icons.tsx';
import { VideoIcon } from '../../atoms/icons.tsx';

interface ProjectProps {
  title: Translatable;
  links: {
    github?: string;
    live?: string;
    tests?: string;
    video?: string;
  };
  labels: Translatable[];
  from?: YearMonthDay;
  to?: YearMonthDay;
  content: Translatable;
}

export default ({ title, links, labels, content }: ProjectProps) => {
  const body = css`
    display: grid;
    padding-top: ${cssSpace.lg};
    gap: ${cssSpace.md};
  `;

  const iconsNav = css`
    display: inline-flex;
    gap: ${cssSpace.lg};
    margin-left: ${cssSpace.lg};
  `;

  return (
    <AmqDocument title={title}>
      <AmqHeader />
      <Container className={body}>
        <Heading2>
          <Lang tr={title} />

          <nav className={iconsNav}>
            {links.github ? (
              <a
                href={links.github}
                children={<GithubIcon title="View source code" />}
              />
            ) : null}

            {links.tests ? (
              <a
                href={links.tests}
                children={<FlaskIcon title="View unit tests" />}
              />
            ) : null}

            {links.video ? (
              <a
                href={links.video}
                children={<VideoIcon title="View video" />}
              />
            ) : null}

            {links.live ? (
              <a href={links.live} children={<PlayIcon title="Open demo" />} />
            ) : null}
          </nav>
        </Heading2>

        {/*
        <div className={timeSpanStyles}>
          <Time value={from} omitDay /> - <Time value={to} omitDay />
        </div>
        */}

        <TagList list={labels} />

        <Lang tr={content} />
      </Container>
    </AmqDocument>
  );
};
