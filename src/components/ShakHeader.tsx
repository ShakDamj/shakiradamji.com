import React from 'react';
import { css, usePageUtils, pagesDir, Lang } from '../generate/mod.ts';
import { cssBreakpoint } from '../theme.ts';
import { ScrollWisle } from './ScrollWisle.tsx';

export interface ShakHeaderProps {
  className?: string;
}

export function ShakHeader({
  className = '',
}: React.PropsWithChildren<ShakHeaderProps>) {
  const { Link } = usePageUtils();

  const styles = css`

  div{
    border-bottom: 1px solid #7FEFBD;
    font-size: 2rem;
    font-family: "Marcellus SC";
    margin: 0rem 0.5rem 1rem 0.5rem;
    }

    a {
      font-size: 1.5rem;
      margin-right: 1rem;
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid #ffffff;
    }

    a:visited {
      color: #000000;
    }

    a:hover {
      border: 1px solid #7FEFBD;
    }

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
      <div> Shakira Damji</div>

      <nav>
      <Link page={pagesDir.resolve('index')} >
          Home
        </Link>
        <Link page={pagesDir.resolve('blog')} isParent>
          Blog
        </Link>
        <Link page={pagesDir.resolve('projects')} isParent>
          Projects
        </Link>
        <Link page={pagesDir.resolve('career')} isParent>
          CV
        </Link>
      </nav>
    </ScrollWisle>
  );
}
