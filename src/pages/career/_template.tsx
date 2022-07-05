import React from 'react';
import { css } from '../../deps/emotion.ts';
import { meta as defaultMeta } from '../../templates/default.tsx';
import { Time } from '../../atoms/Time.tsx';
import { cssFontSize, cssSpace } from '../../theme.ts';
import { Heading2 } from '../../atoms/Heading.tsx';
import { AmqMarkdownPage } from '../../templates/AmqMarkdownPage.tsx';
import {
  MarkdownPageMetadata,
  Translatable,
  YearMonthDay,
  i18n,
  Lang,
} from '../../generate/mod.ts';

export interface CareerProps extends MarkdownPageMetadata {
  title: Translatable;
  org: Translatable;
  link: string;
  role: Translatable;
  from: YearMonthDay;
  to: YearMonthDay;
  labels: Translatable[];
  content: Translatable;
}

export function meta({ org, role }: CareerProps, file: string) {
  return {
    ...defaultMeta({}, file),
    title: i18n`${role} ${{ en: 'at', es: 'en' }} ${org}`,
  };
}

export default ({
  title,
  link,
  org,
  role,
  from,
  to,
  labels,
  content,
}: CareerProps) => {
  const timeSpanStyles = css`
    display: flex;
    align-items: center;
    gap: ${cssSpace.md};

    time {
      font-size: ${cssFontSize.md};
    }
  `;

  const atStyles = css`
    font-size: ${cssFontSize.md};
  `;

  return (
    <AmqMarkdownPage title={title} labels={labels} content={content}>
      <Heading2>
        <Lang tr={role} />{' '}
        <small className={atStyles}>
          <Lang en="at" es="en" />
        </small>{' '}
        {link ? (
          <a href={link} target="_blank">
            <Lang tr={org} />
          </a>
        ) : (
          <Lang tr={org} />
        )}
      </Heading2>

      <div className={timeSpanStyles}>
        <Time value={from} omitDay /> - <Time value={to} omitDay />
      </div>
    </AmqMarkdownPage>
  );
};
