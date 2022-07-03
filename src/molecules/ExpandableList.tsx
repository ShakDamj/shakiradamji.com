import React from 'react';
import { css } from '../deps/emotion.ts';
import { cssColor, cssFontSize, cssSpace } from '../theme.ts';
import { Lang, Translatable } from '../atoms/Lang.tsx';

export interface ExpandableListProps<T> {
  className?: string;
  hideAfter?: number;
  title: Translatable;
  list: T[];
  children: (item: T) => React.ReactNode;
}

export function ExpandableList<T>({
  className = '',
  title,
  list,
  hideAfter = 5,
  children,
}: ExpandableListProps<T>) {
  const styles = css`
    position: relative;
  `;

  const headerStyles = css`
    font-size: ${cssFontSize.md};
    color: ${cssColor.foreground};
  `;

  const viewMoreStyles = css`
    position: absolute;
    list-style: none;
    font-size: ${cssFontSize.xs};
    top: ${cssSpace.md};
    right: 0;
    cursor: pointer;
  `;

  const top = list.slice(0, hideAfter);
  const bottom = list.slice(hideAfter);

  return (
    <div className={`${styles} ${className}`}>
      <h3 className={headerStyles}>
        <Lang tr={title} />
      </h3>
      <ul>{top.map(children)}</ul>

      {bottom.length ? (
        <details>
          <summary className={viewMoreStyles}>
            <Lang en="View all" es="Ver todo" />
          </summary>
          <ul>{bottom.map(children)}</ul>
        </details>
      ) : null}
    </div>
  );
}
