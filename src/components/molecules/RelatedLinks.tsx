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
import { cssBreakpoint, cssColor } from '../../theme.ts';

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
      <IconLink href={links.github} icon={<GithubIcon title="Code" />} />
      <IconLink href={links.tests} icon={<FlaskIcon title="Tests" />} />
      <IconLink href={links.video} icon={<VideoIcon title="Video" />} />
      <IconLink href={links.slides} icon={<SlidesIcon title="Slides" />} />
      <IconLink href={links.live} icon={<PlayIcon title="Demo" />} />
    </nav>
  );
}
