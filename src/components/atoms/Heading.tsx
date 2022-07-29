import React from 'react';
import { css, Lang, ValidTr } from '../../generate/mod.ts';
import { cssFontFamily, cssFontSize, cssFontWeight } from '../../theme.ts';

export interface HeadingProps {
  className?: string;
  children: ValidTr;
}

export function Heading2({ className, children }: HeadingProps) {
  const styles = css`
    font-family: ${cssFontFamily.header};
    font-weight: ${cssFontWeight.bold};
    font-size: ${cssFontSize.lg};
    // line-height: ${cssFontSize.md};
  `;

  return (
    <h2 className={`${className} ${styles}`}>
      <Lang tr={children} />
    </h2>
  );
}

export function Heading3({ className, children }: HeadingProps) {
  const styles = css`
    font-family: ${cssFontFamily.header};
    font-weight: ${cssFontWeight.bold};
    font-size: ${cssFontSize.md};
    line-height: ${cssFontSize.md};
  `;

  return (
    <h3 className={`${className} ${styles}`}>
      <Lang tr={children} />
    </h3>
  );
}
