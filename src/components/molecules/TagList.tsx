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
    margin: ${cssSpace.lg} 0 ${cssSpace.xl};
  `;

  const tagStyles = css`
    background-color: ${cssColor.backgroundDark};
    border-radius: 8px;
    padding: 3px 8px;
    color: ${cssColor.primary};
    display: inline-block;
    font-family: var(--monospace-font) !important;
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
