import React from 'react';
import { cssAnimationSpeed, cssFontSize, cssSpace } from '../../theme.ts';
import { HiddenContent } from '../atoms/HiddenContent.tsx';
import { Heading2 } from '../atoms/Heading.tsx';
import { css, Translatable, useTr } from '../../generate/mod.ts';

export interface ExpandableListProps<T> {
  className?: string;
  listClassName?: string;
  hideAfter?: number;
  title?: Translatable;
  list: T[];
  children: (item: T) => React.ReactNode;
}

export function ExpandableList<T>({
  className = '',
  listClassName,
  title,
  list,
  hideAfter = 0,
  children,
}: ExpandableListProps<T>) {
  const viewMore = useTr('View all', 'Ver todo');
  const viewLess = useTr('View less', 'Ver menos');

  const styles = css`
    position: relative;

    ol:not(:last-child) {
      margin-bottom: 0;
    }

    details {
      summary::after {
        content: '${viewMore}';
        display: block;
        white-space: nowrap;
        position: absolute;
        list-style: none;
        font-size: ${cssFontSize.sm};
        top: ${cssSpace.md};
        right: 0;
        cursor: pointer;
        animation: none;
      }

      ol {
        margin-top: 0;
      }

      &[open] {
        summary::after {
          content: '${viewLess}';
        }

        ${animateList('li')}
      }
    }
  `;

  const headerStyles = css`
    margin-bottom: ${cssSpace.lg};
  `;

  const top = hideAfter ? list.slice(0, hideAfter) : list;
  const bottom = hideAfter ? list.slice(hideAfter) : [];

  return (
    <div className={`${styles} ${className}`}>
      {title ? <Heading2 className={headerStyles}>{title}</Heading2> : null}

      <ol className={listClassName}>{top.map(children)}</ol>

      {bottom.length ? (
        <details>
          <summary>
            <HiddenContent>{viewMore}</HiddenContent>
          </summary>
          <ol className={listClassName}>{bottom.map(children)}</ol>
        </details>
      ) : null}
    </div>
  );
}

function animateList(selector: string) {
  const DELAY = 0.03;
  const NTHS = 12;

  const nths = array(NTHS).map(
    (x) => `${selector}:nth-child(${x + 1}) { animation-delay: ${x * DELAY}s; }`
  );

  return `
    ${selector} {
      animation: slide-in ${cssAnimationSpeed.fast} ease-in-out;
      animation-fill-mode: both;
      animation-delay: ${DELAY * NTHS}s;
    }

    ${nths.join('\n')}

    @keyframes slide-in {
      0% {
        opacity: 0;
        transform: translate(-100px, 0);
      }
      100% {
        opacity: 1;
        transform: translate(0, 0);
      }
    }
  `;
}

function array(length: number) {
  return Array.from({ length }, (_, i) => i);
}
