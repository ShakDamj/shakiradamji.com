import React from 'react';
import { css, ValidTr } from '../../generate/mod.ts';
import { cssBreakpoint } from '../../theme.ts';
import { Heading2, Heading3 } from '../atoms/Heading.tsx';

export interface ResponsiveHeaderProps {
  as?: typeof Heading2 | typeof Heading3 | 'h1' | 'h2' | 'h3';
  className?: string;
  children: ValidTr;
}

export function ResponsiveHeader({
  as: _as = Heading3,
  className = '',
  children,
}: ResponsiveHeaderProps) {
  const styles = css`
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    ${cssBreakpoint.medium} {
      flex-direction: row;
      align-items: center;
    }
  `;

  return React.createElement(_as, {
    className: `${styles} ${className}`,
    children,
  });
}
