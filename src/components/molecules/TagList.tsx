import React from 'react';
import { css, Lang, tr, Translatable } from '../../generate/mod.ts';
import { cssColor, cssFontFamily, cssSpace } from '../../theme.ts';

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
    border: 2px solid ${cssColor.primary};
    border-radius: 8px;
    padding: 3px 10px;
    color: ${cssColor.backgroundStrong};
    display: inline-block;
    font-family: ${cssFontFamily.code} !important;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: ${cssColor.primary};
      z-index: -1;
      opacity: 0.75;
    }
  `;

  return (
    <div className={`${containerStyles} ${className}`}>
      {list.map((x) => (
        <span key={tr(x, 'en')} className={`tag ${tagStyles}`}>
          <Lang tr={x} />
        </span>
      ))}
    </div>
  );
}
