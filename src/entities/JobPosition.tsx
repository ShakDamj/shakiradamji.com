import React from 'react';

import { Moment } from '../components/Moment';
import { Translatable, TranslatableString } from '../components/Translatable';
import { Article } from './Article';

export interface JobPosition extends Article {
  from: string;
  to: string;
  org: string;
  link: string;
  role: TranslatableString;
  tags: TranslatableString[];
}

export function JobPositionView({ from, to, org, link, role, tags, content }: JobPosition) {
  const title = <Translatable value={org} />;

  return (
    <div className="job-position">
      <h4>
        {role}
        <Moment value={from} /> - <Moment value={to} />
      </h4>

      <h5>
        {link ? (
          <a target="_blank" href={link}>
            {title}
          </a>
        ) : (
          title
        )}
      </h5>

      <Translatable
        value={content}
        render={x => <div className="markdown" dangerouslySetInnerHTML={{ __html: x }}></div>}
      />

      {tags?.length ? (
        <ul className="tech-stack">
          {tags.map((x, i) => (
            <li key={i}>
              <Translatable value={x} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
