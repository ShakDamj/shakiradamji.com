import React from 'react';
import { css, pagesDir, usePageUtils } from '../../generate/mod.ts';
import {
  cssAnimationSpeed,
  cssBreakpoint,
  cssColor,
  cssSpace,
} from '../../theme.ts';

export function AMatiasQuezada() {
  const { Link } = usePageUtils();

  const styles = css`
    display: flex;
    gap: ${cssSpace.md};
    align-items: center;
    margin: 0;
    font-size: 1.3em;

    ${cssBreakpoint.medium} {
      font-size: 1.5em;
    }
  `;

  const nameStyles = css`
    color: ${cssColor.foregroundStrong};
    display: flex;
    align-items: baseline;
    letter-spacing: 1px;
    white-space: nowrap;

    abbr {
      display: inline-flex;
      width: 0.79em;
      overflow: hidden;
      transition: width ${cssAnimationSpeed.medium} ease;
    }

    abbr,
    span + span {
      margin-left: 0.4em;
    }

    &:hover {
      abbr {
        width: 3.3em;
      }
      .dot {
        display: none;
      }
  `;

  return (
    <h2 className={styles}>
      <Link className={`${nameStyles} inactive`} page={pagesDir}>
        <>
          <span>{'{ '}</span>
          <abbr>Adrian</abbr>
          <span className="dot">.</span>
          <span>Matías Quezada</span>
          <span>{' }'}</span>
        </>
      </Link>
    </h2>
  );
}
