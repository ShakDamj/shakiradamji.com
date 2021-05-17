import React from 'react';

import { Moment } from '../components/Moment';
import { Tag } from '../components/Tag';
import { TagList } from '../components/TagList';
import {
  getKeyFrom,
  Translatable,
  TranslatableString
} from '../components/Translatable';
import { Month } from '../types';
import { Article } from './Article';

export interface JobPosition extends Article {
  from: Month;
  to: Month;
  org: string;
  link: string;
  role: TranslatableString;
  tags: TranslatableString[];
}

export function JobPositionView({ from, to, org, link, role, tags, content }: JobPosition) {
  const title = <Translatable value={org} />;
  const orgElement = link ? (
    <a target="_blank" href={link}>
      {title}
    </a>
  ) : (
    title
  );

  return (
    <details className="JobPositionView">
      <summary className="JobPositionView__summary">
        <span className="JobPositionView__duration">
          <Moment month={from} />
        </span>
        <h4 className="JobPositionView__title">
          {role} at {orgElement}
        </h4>
      </summary>

      <Translatable
        value={content}
        render={x => <div className="markdown" dangerouslySetInnerHTML={{ __html: x }}></div>}
      />

      <TagList tags={tags} />
    </details>
  );
}
