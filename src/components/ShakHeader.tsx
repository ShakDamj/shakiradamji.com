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
    font-size: 2rem;
    font-family: "Marcellus SC";
    margin: 0 0 1rem 1rem;
    width: 50%;
    display: inline-block;
  }

  nav {
    float: right;
    display: inline-block;
  }

    a {
      font-size: 1.25rem;
      margin-right: 1.5rem;
      padding: 0 0 0.25rem 0;
      color: #000000;
      border-bottom: 4px solid #7FEFBD;
      text-decoration: none;
      font-family: "Marcellus SC";
    }

    a:visited {
      color: #000000;
    }

    a:active {
      color: #000000;
    }

    a:hover {
      border-bottom: 8px solid #7FEFBD;
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
        <Link page={pagesDir.resolve('projects')} isParent>
          Projects
        </Link>
        <Link page={pagesDir.resolve('career')} isParent>
          CV
        </Link>
        <Link page={pagesDir.resolve('blog')} isParent>
          Blog
        </Link>
      </nav>
    </ScrollWisle>
  );
}
