import React from 'react';
import { css } from '../../deps/emotion.ts';
import { cssAnimationFunction, cssAnimationSpeed } from '../../theme.ts';

export interface IconLinkProps {
  href: string | null | undefined;
  icon: JSX.Element;
}

export function IconLink({ href, icon }: IconLinkProps) {
  if (!href) {
    return null;
  }

  const styles = css`
    background: rgba(0, 0, 0, 0);
    padding: 10px;
    border-radius: 8px;
    transform: scale(1);
    transition: background ${cssAnimationSpeed.medium}
        ${cssAnimationFunction.bouncy},
      transform ${cssAnimationSpeed.medium} ${cssAnimationFunction.bouncy};

    &:hover {
      background: rgba(0, 0, 0, 0.9);
      transform: scale(1.5);
    }
  `;

  // const {
  //   props: { title },
  // } = icon;

  return (
    <a href={href} className={`no-external ${styles}`}>
      {icon}
      {/* {title ? <span>{title}</span> : null} */}
    </a>
  );
}
