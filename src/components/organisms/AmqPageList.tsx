import React, { useMemo } from 'react';
import { Time } from '../atoms/Time.tsx';
import { css } from '../../deps/emotion.ts';
import {
  cssAnimationSpeed,
  cssBreakpoint,
  cssColor,
  cssSpace,
} from '../../theme.ts';
import { ExpandableList } from '../organisms/ExpandableList.tsx';
import {
  Translatable,
  PageMetadata,
  usePageUtils,
} from '../../generate/mod.ts';

export interface AmqPageListProps {
  className?: string;
  name: Translatable;
  list: PageMetadata[];
}

export function AmqPageList({ className = '', name, list }: AmqPageListProps) {
  const { Link } = usePageUtils();

  const styles = css`
    padding: 32px 0;
    user-select: none;

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

      &:hover a:not(:active) {
        transform: translateX(10px);
      }
    }
  `;

  const timeStyles = css`
    font-size: 0.9em;
  `;

  const linkStyles = css`
    letter-spacing: 1px;
    transition: transform ${cssAnimationSpeed.fast} ease-in-out;
    transform: translateX(0px);
  `;

  return (
    <div className={`${styles} ${className}`}>
      <ExpandableList title={name} list={list} hideAfter={5}>
        {(item) => (
          <li key={item.id} className={listItemStyles}>
            <Time className={timeStyles} value={item.date} omitDay />
            <Link className={linkStyles} page={item.file}>
              {item.title}
            </Link>
          </li>
        )}
      </ExpandableList>
    </div>
  );
}
