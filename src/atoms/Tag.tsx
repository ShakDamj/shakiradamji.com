import React from 'react';
import { css } from '../deps/emotion.ts';
import { Lang, Translatable } from '../generate/mod.ts';
import { cssColor } from '../theme.ts';

export interface TagProps {
  className?: string;
  children: Translatable;
}

export function Tag({ className = '', children }: TagProps) {
  const styles = css`
    background-color: ${cssColor.backgroundDark};
    color: ${cssColor.foreground};
    border: 1px solid ${cssColor.border};
    border-radius: 4px;
    padding: 0.3rem 1rem;
    display: inline-block;
  `;

  return (
    <span className={`${styles} ${className}`}>
      <Lang tr={children} />
    </span>
  );
}
