import React, { useMemo } from 'react';
import { usePageUtils } from '../generate/PageUtils.tsx';
import { Time } from '../atoms/Time.tsx';
import { css } from '../deps/emotion.ts';
import { PageMetadata } from '../generate/pages.ts';
import { cssBreakpoint, cssColor, cssSpace } from '../theme.ts';
import { Translatable } from '../atoms/Lang.tsx';
import { ExpandableList } from '../molecules/ExpandableList.tsx';

export interface AmqPageListProps {
  className?: string;
  name: Translatable;
  list: PageMetadata[];
}

export function AmqPageList({ className = '', name, list }: AmqPageListProps) {
  const { Link } = usePageUtils();

  const styles = css`
    // margin: 32px 0;
    padding: 32px 0;

    & + & {
      border-top: 1px solid ${cssColor.border};
    }
  `;

  const listItemStyles = css`
    display: flex;
    margin-top: ${cssSpace.md};
    flex-direction: column-reverse;

    ${cssBreakpoint.medium} {
      align-items: center;
      flex-direction: row;
      gap: 1rem;
    }

    a {
      text-decoration: none;
    }
  `;

  const linkStyles = css`
    letter-spacing: 1px;
  `;

  const reverse = useMemo(() => list.slice().reverse(), [list]);

  return (
    <div className={`${styles} ${className}`}>
      <ExpandableList title={name} list={reverse}>
        {(item) => (
          <li key={item.file} className={listItemStyles}>
            <Time value={item.date} omitDay />
            <Link className={linkStyles} page={item.file}>
              {item.title}
            </Link>
          </li>
        )}
      </ExpandableList>
    </div>
  );
}
