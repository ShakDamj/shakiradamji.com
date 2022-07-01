import React from 'react';
import { css } from '../deps/emotion.ts';
import { cssColor } from '../theme.ts';
import { Lang, Translatable } from './Lang.tsx';

export interface TagProps {
  className?: string;
  children: Translatable;
}

export function Tag({ className = '', children }: TagProps) {
  const styles = css`
    background-color: ${cssColor.primary};
    color: ${cssColor.background};
    border-radius: 1rem;
    padding: 0rem 0.7rem 0.1rem;
    display: inline-block;
  `;

  return (
    <span className={`${styles} ${className}`}>
      <Lang tr={children} />
    </span>
  );
}
