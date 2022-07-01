import React from 'react';
import { usePageUtils } from '../generate/PageUtils.tsx';
import { Time } from '../atoms/Time.tsx';
import { css } from '../deps/emotion.ts';
import { PageMetadata } from '../generate/pages.ts';
import { cssColor, cssFontSize, cssSpace } from '../theme.ts';
import { Lang, Translatable } from '../atoms/Lang.tsx';

export interface AmqPageListProps {
  className?: string;
  name: Translatable;
  list: PageMetadata[];
}

export function AmqPageList({ className = '', name, list }: AmqPageListProps) {
  const { Link } = usePageUtils();

  const styles = css`
    margin: ${cssSpace.lg} 0;
    position: relative;
  `;

  const headerStyles = css`
    font-size: ${cssFontSize.md};
    color: ${cssColor.primary};
    border-bottom: 1px solid ${cssColor.foreground}55;
  `;

  const listItemStyles = css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      text-decoration: none;
    }
  `;

  const viewMoreStyles = css`
    position: absolute;
    list-style: none;
    font-size: ${cssFontSize.xs};
    top: ${cssSpace.md};
    right: 0;
    cursor: pointer;
  `;

  const reverse = list.slice().reverse();
  const top = reverse.slice(0, 5);
  const bottom = reverse.slice(5);

  return (
    <div className={`${styles} ${className}`}>
      <h3 className={headerStyles}>
        <Lang tr={name} />
      </h3>
      <ul>
        {top.map(x => (
          <li key={x.file} className={listItemStyles}>
            <Link href={x.file}>{x.title}</Link>
            <Time value={x.date} omitDay />
          </li>
        ))}
      </ul>

      {bottom.length ? (
        <details>
          <summary className={viewMoreStyles}>View all</summary>
          <ul>
            {bottom.map(x => (
              <li key={x.file} className={listItemStyles}>
                <Link href={x.file}>{x.title}</Link>
                <Time value={x.date} omitDay />
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </div>
  );
}
