import React, { PropsWithChildren } from 'react';
import { css } from '../../deps/emotion.ts';
import { cssBreakpoint } from '../../theme.ts';

export interface ContainerProps {
  className?: string;
}

export function Container({
  className,
  children,
}: PropsWithChildren<ContainerProps>) {
  const styles = css`
    --container-side-gap: 2rem;
    --container-width: 40rem;

    --container-sides-gap: calc(var(--container-side-gap) * 2);
    --available-width: min(
      calc(100vw - var(--container-sides-gap)),
      calc(var(--container-width) - var(--container-sides-gap))
    );

    max-width: var(--container-width);
    padding-left: var(--container-side-gap);
    padding-right: var(--container-side-gap);
    margin-left: auto;
    margin-right: auto;

    ${cssBreakpoint.medium} {
      --container-width: 50rem;
      --container-side-gap: 3rem;
    }

    ${cssBreakpoint.wide} {
      --container-width: 60rem;
    }
  `;

  return <div className={`${className || ''} ${styles}`}>{children}</div>;
}
