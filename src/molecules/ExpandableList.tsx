import React from 'react';
import { css } from '../deps/emotion.ts';
import { cssFontSize, cssSpace } from '../theme.ts';
import { HiddenContent } from '../atoms/HiddenContent.tsx';
import { Heading2 } from '../atoms/Heading.tsx';
import { Translatable, useTr, Lang } from '../generate/mod.ts';

export interface ExpandableListProps<T> {
  className?: string;
  hideAfter?: number;
  title?: Translatable;
  list: T[];
  children: (item: T) => React.ReactNode;
}

export function ExpandableList<T>({
  className = '',
  title,
  list,
  hideAfter = 0,
  children,
}: ExpandableListProps<T>) {
  const viewMore = useTr('View all', 'Ver todo');
  const viewLess = useTr('View less', 'Ver menos');

  const styles = css`
    position: relative;

    details summary {
      list-style: none;
    }

    details summary::after {
      content: '${viewMore}';
      display: block;
      white-space: nowrap;
      position: absolute;
      list-style: none;
      font-size: ${cssFontSize.xs};
      top: ${cssSpace.md};
      right: 0;
      cursor: pointer;
    }

    details[open] summary::after {
      content: '${viewLess}';
    }
  `;

  const headerStyles = css`
    margin-bottom: ${cssSpace.lg};
  `;

  const top = hideAfter ? list.slice(0, hideAfter) : list;
  const bottom = hideAfter ? list.slice(hideAfter) : [];

  return (
    <div className={`${styles} ${className}`}>
      {title ? (
        <Heading2 className={headerStyles}>
          <Lang tr={title} />
        </Heading2>
      ) : null}

      <ol>{top.map(children)}</ol>

      {bottom.length ? (
        <details>
          <summary>
            <HiddenContent>{viewMore}</HiddenContent>
          </summary>
          <ol>{bottom.map(children)}</ol>
        </details>
      ) : null}
    </div>
  );
}
