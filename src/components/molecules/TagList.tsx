import React from 'react';
import { css } from '../../deps/emotion.ts';
import { Lang, tr, Translatable } from '../../generate/mod.ts';
import { cssColor, cssSpace } from '../../theme.ts';

interface TagListProps {
  className?: string;
  list: Translatable[];
}

export function TagList({ className = '', list }: TagListProps) {
  const containerStyles = css`
    display: flex;
    flex-wrap: wrap;
    gap: ${cssSpace.sm};
    margin: ${cssSpace.md} 0;
  `;

  const tagStyles = css`
    background-color: ${cssColor.backgroundDark};
    color: ${cssColor.primary};
    border: 2px solid ${cssColor.border};
    border-radius: 1em;
    padding: 0.1em 1em 0.2em;
    display: inline-block;
  `;

  return (
    <div className={`${containerStyles} ${className}`}>
      {list.map((x) => (
        <span key={tr(x, 'en')} className={tagStyles}>
          <Lang tr={x} />
        </span>
      ))}
    </div>
  );
}
