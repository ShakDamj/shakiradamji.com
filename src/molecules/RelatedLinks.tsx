import React from 'react';
import { FlaskIcon, GithubIcon, PlayIcon, VideoIcon } from '../atoms/icons.tsx';
import { css } from '../deps/emotion.ts';

export interface RelatedLinksProps {
  className?: string;
  links: {
    github?: string;
    live?: string;
    tests?: string;
    video?: string;
  };
}

export function RelatedLinks({ className = '', links }: RelatedLinksProps) {
  const styles = css`
    display: inline-flex;
  `;

  return (
    <nav className={`${className} ${styles}`}>
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
        <a href={links.video} children={<VideoIcon title="View video" />} />
      ) : null}

      {links.live ? (
        <a href={links.live} children={<PlayIcon title="Open demo" />} />
      ) : null}
    </nav>
  );
}
