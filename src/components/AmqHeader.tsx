import React from 'react';
import { css, usePageUtils, pagesDir, Lang } from '../generate/mod.ts';
import { cssBreakpoint } from '../theme.ts';
import { ScrollWisle } from './ScrollWisle.tsx';

export interface AmqHeaderProps {
  className?: string;
}

export function AmqHeader({
  className = '',
}: React.PropsWithChildren<AmqHeaderProps>) {
  const { Link } = usePageUtils();

  const styles = css`
    ${cssBreakpoint.medium} {
      transition: padding 0.2s ease-in-out, font-size 0.2s ease-in-out;

      &.scrolled {
        padding: 16px 0;
        font-size: inherit;
      }
    }
  `;

  return (
    <ScrollWisle
      as="header"
      className={`${styles} ${className}`}
      scrollClass="scrolled"
      scrollOffset={50}
      scrollTolerance={50}
    >
      <h1> Shakira Damji</h1>

      <nav>
        <Link page={pagesDir.resolve('blog')} isParent>
          Blog
        </Link>
        <Link page={pagesDir.resolve('projects')} isParent>
          <Lang en="Projects" es="Proyectos" />
        </Link>
        <Link page={pagesDir.resolve('career')} isParent>
          CV
        </Link>
      </nav>
    </ScrollWisle>
  );
}
