import React from 'react';
import { css } from '../../generate/mod.ts';
import { cssAnimationFunction, cssAnimationSpeed } from '../../theme.ts';

export interface IconLinkProps {
  className?: string;
  href: string;
  icon: JSX.Element;
}

export function IconLink({ className, href, icon }: IconLinkProps) {
  const styles = css`
    --icon-size: 2rem;

    display: inline-flex;
    align-items: center;
    gap: 1rem;
    background: rgba(0, 0, 0, 0);
    padding: 10px;
    border-radius: 8px;
    transform: scale(1);
    transition: background ${cssAnimationSpeed.medium}
        ${cssAnimationFunction.bouncy},
      transform ${cssAnimationSpeed.medium} ${cssAnimationFunction.bouncy};

    :hover {
      background: rgba(0, 0, 0, 0.9);
      transform: scale(1.5);
    }

    ::after {
      margin-left: 0 !important;
    }

    span {
      font-size: 1rem;
    }

    svg {
      width: var(--icon-size);
      height: var(--icon-size);
    }
  `;

  const {
    props: { title },
  } = icon;

  return (
    <a href={href} className={`${styles} ${className}`}>
      {icon}
      <span>{title}</span>
    </a>
  );
}
