import React from 'react';
import { AmqDocument } from '../../templates/AmqDocument.tsx';
import { Translatable, Lang, i18n } from '../../atoms/Lang.tsx';
import { css } from '../../deps/emotion.ts';
import { Container } from '../../atoms/Container.tsx';
import { meta as defaultMeta } from '../../templates/default.tsx';
import { Time, YearMonthDay } from '../../atoms/Time.tsx';
import { TagList } from '../../molecules/TagList.tsx';
import { AmqHeader } from '../../organisms/AmqHeader.tsx';
import { cssFontSize, cssSpace } from '../../theme.ts';
import { Heading2 } from '../../atoms/Heading.tsx';

interface CareerProps {
  title: string;
  org: string;
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
  org,
  title,
  role,
  from,
  to,
  labels,
  content,
}: CareerProps) => {
  const body = css`
    display: grid;
  `;

  const timeSpanStyles = css`
    display: flex;
    // justify-content: flex-end;
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
    <AmqDocument title={title}>
      <AmqHeader />
      <Container className={body}>
        <Heading2>
          <Lang tr={role} />{' '}
          <small className={atStyles}>
            <Lang en="at" es="en" />
          </small>{' '}
          <Lang tr={org} />
        </Heading2>

        <div className={timeSpanStyles}>
          <Time value={from} omitDay /> - <Time value={to} omitDay />
        </div>

        <TagList list={labels} />
        <Lang tr={content} />
      </Container>
    </AmqDocument>
  );
};
