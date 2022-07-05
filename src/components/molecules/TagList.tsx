import React from 'react';
import { Tag } from '../atoms/Tag.tsx';
import { css } from '../../deps/emotion.ts';
import { Translatable } from '../../generate/mod.ts';
import { cssSpace } from '../../theme.ts';

interface TagListProps {
  className?: string;
  list: Translatable[];
}

export function TagList({ className = '', list }: TagListProps) {
  const labelsContainer = css`
    display: flex;
    flex-wrap: wrap;
    gap: ${cssSpace.md};
    margin: ${cssSpace.md} 0;
  `;

  return (
    <div className={`${labelsContainer} ${className}`}>
      {list.map((x) => (
        <Tag>{x}</Tag>
      ))}
    </div>
  );
}
