import React from 'react';
import {
  FlaskIcon,
  GithubIcon,
  PlayIcon,
  SlidesIcon,
  VideoIcon,
} from '../atoms/icons.tsx';
import { css } from '../../deps/emotion.ts';
import { IconLink } from '../atoms/IconLink.tsx';

export interface RelatedLinksProps {
  className?: string;
  links?: {
    github?: string;
    live?: string;
    tests?: string;
    video?: string;
    slides?: string;
  };
}

export function RelatedLinks({ className = '', links }: RelatedLinksProps) {
  if (!links) {
    return null;
  }

  const styles = css`
    display: inline-flex;
  `;

  return (
    <nav className={`${className} ${styles}`}>
      <IconLink
        href={links.github}
        icon={<GithubIcon title="View source code" />}
      />

      <IconLink
        href={links.tests}
        icon={<FlaskIcon title="View unit tests" />}
      />

      <IconLink href={links.video} icon={<VideoIcon title="View video" />} />
      <IconLink href={links.slides} icon={<SlidesIcon title="View slides" />} />
      <IconLink href={links.live} icon={<PlayIcon title="Open demo" />} />
    </nav>
  );
}
