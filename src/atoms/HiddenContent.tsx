import React, { PropsWithChildren } from 'react';
import { css } from '../deps/emotion.ts';

export function HiddenContent({ children }: PropsWithChildren<{}>) {
  const styles = css`
    position: absolute;
    top: -9999px;
    left: -9999px;
  `;

  return <div className={styles}>{children}</div>;
}
