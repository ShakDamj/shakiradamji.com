import React, { useMemo } from 'react';
import { usePageUtils } from '../generate/PageUtils.tsx';
import { Time } from '../atoms/Time.tsx';
import { css } from '../deps/emotion.ts';
import { PageMetadata } from '../generate/pages.ts';
import { cssSpace } from '../theme.ts';
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
    // margin: ${cssSpace.xl} 0;
    padding: ${cssSpace.xl} 0;

    & + & {
      border-top: 1px solid #586369;
    }
  `;

  const listItemStyles = css`
    display: flex;
    align-items: center;
    gap: 1rem;
    // justify-content: space-between;
    margin-top: ${cssSpace.sm};

    a {
      text-decoration: none;
    }
  `;

  const reverse = useMemo(() => list.slice().reverse(), [list]);

  return (
    <div className={`${styles} ${className}`}>
      <ExpandableList title={name} list={reverse}>
        {(item) => (
          <li key={item.file} className={listItemStyles}>
            <Time value={item.date} omitDay />
            <Link href={item.file}>{item.title}</Link>
          </li>
        )}
      </ExpandableList>
    </div>
  );
}
