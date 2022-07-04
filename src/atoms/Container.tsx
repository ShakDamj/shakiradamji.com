import React, { PropsWithChildren } from 'react';
import { css } from '../deps/emotion.ts';
import { cssBreakpoint } from '../theme.ts';

export interface ContainerProps {
  className?: string;
}

export function Container({
  className,
  children,
}: PropsWithChildren<ContainerProps>) {
  const styles = css`
    max-width: 30rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;

    ${cssBreakpoint.medium} {
      max-width: 50rem;
      padding-left: 5rem;
      padding-right: 5rem;
    }

    ${cssBreakpoint.wide} {
      max-width: 60rem;
      padding-left: 5rem;
      padding-right: 5rem;
    }
  `;

  return <div className={`${className || ''} ${styles}`}>{children}</div>;
}
