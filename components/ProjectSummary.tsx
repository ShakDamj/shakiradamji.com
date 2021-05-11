import React, { Component, PropsWithChildren } from 'react';

import { ValidUrl } from '../types';
import { RemixIcon } from './RemixIcon';
import { Translatable, TranslatableString } from './Translatable';

const linkTypes = {
  live: <RemixIcon name="external-link" title={{ en: 'Open', es: 'Abrir' }} />,
  tests: <RemixIcon name="test-tube" title="Test results" fill />,
  video: <RemixIcon name="video" title="Introduction video" />,
  github: (
    <RemixIcon name="github" title={{ en: 'View source code at GitHub', es: 'Ver código fuente en GitHub' }} fill />
  ),
} as const;

type LinkTypes = keyof typeof linkTypes;

export interface ProjectSummaryProps {
  key: string;
  name: TranslatableString;
  links: Partial<Record<LinkTypes, ValidUrl>>;
  media?: Record<ValidUrl, TranslatableString>;
  tags: TranslatableString[];
  content: TranslatableString;
}

export function ProjectSummary({ name, links, media = {}, tags, content }: ProjectSummaryProps) {
  return (
    <div className="project-summary">
      <h4>
        <Translatable value={name} />

        {Object.entries(links).map(([type, url]) => (
          <a key={type} href={url}>
            {linkTypes[type]}
          </a>
        ))}
      </h4>

      <div className="media">
        {Object.entries(media).map(([url, alt]) => (
          <Translatable value={alt} render={x => <img key={url} src={url} alt={x} />} />
        ))}
      </div>

      <Translatable value={content} render={x => <summary dangerouslySetInnerHTML={{ __html: x }}></summary>} />

      <ul className="tech-stack">
        {tags.map((x, i) => (
          <li key={i}>
            <Translatable value={x} />
          </li>
        ))}
      </ul>
    </div>
  );
}
