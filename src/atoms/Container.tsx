import React, { PropsWithChildren } from 'react';
import { css } from '../deps/emotion.ts';
import { cssBreakpoint } from '../theme.ts';

export interface ContainerProps {
  className?: string;
}

export function Container({ className, children }: PropsWithChildren<ContainerProps>) {
  const styles = css`
    width: 30rem;
    margin: 0 auto;
    padding: 0 1rem;

    ${cssBreakpoint.medium} {
      width: 50rem;
      padding: 0 5rem;
    }

    ${cssBreakpoint.wide} {
      width: 60rem;
      padding: 0 5rem;
    }
  `;

  return <div className={`${styles} ${className || ''}`}>{children}</div>;
}
