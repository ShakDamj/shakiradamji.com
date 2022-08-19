import React from 'react';
import {
  FlaskIcon,
  GithubIcon,
  PlayIcon,
  SlidesIcon,
  VideoIcon,
} from '../atoms/icons.tsx';
import { css } from '../../generate/mod.ts';
import { IconLink } from '../atoms/IconLink.tsx';
import { cssSpace } from '../../theme.ts';

export interface RelatedLinksProps {
  className?: string;
  links?: {
    github?: string | string[];
    live?: string | string[];
    tests?: string | string[];
    video?: string | string[];
    slides?: string | string[];
  };
}

export function RelatedLinks({ className = '', links }: RelatedLinksProps) {
  if (!links) {
    return null;
  }

  const styles = css`
    display: inline-flex;
    gap: ${cssSpace.lg};
  `;

  return (
    <nav className={`${className} ${styles}`}>
      {printLinks(links.live, <PlayIcon title="Open" />)}
      {printLinks(links.github, <GithubIcon title="Code" />)}
      {printLinks(links.tests, <FlaskIcon title="Tests" />)}
      {printLinks(links.video, <VideoIcon title="Video" />)}
      {printLinks(links.slides, <SlidesIcon title="Slides" />)}
    </nav>
  );
}

function printLinks(
  value: null | undefined | string | string[],
  icon: JSX.Element
) {
  if (!value) return null;

  if (!Array.isArray(value)) {
    return <IconLink href={value} icon={icon} />;
  }

  return value.map((x) => <IconLink key={x} href={x} icon={icon} />);
}
