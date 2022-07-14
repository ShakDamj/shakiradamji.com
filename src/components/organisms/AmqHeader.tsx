import React from 'react';
import { Container } from '../atoms/Container.tsx';
import { css } from '../../deps/emotion.ts';
import {
  usePageUtils,
  useLang,
  Lang,
  getPagesRoot,
} from '../../generate/mod.ts';
import {
  cssAnimationSpeed,
  cssBreakpoint,
  cssColor,
  cssSpace,
} from '../../theme.ts';
import { ScrollWisle } from '../atoms/ScrollWisle.tsx';
import { AMatiasQuezada } from '../molecules/AMatiasQuezada.tsx';

export const root = getPagesRoot();

export interface AmqHeaderProps {
  className?: string;
}

export function AmqHeader({
  className = '',
}: React.PropsWithChildren<AmqHeaderProps>) {
  const { Link } = usePageUtils();

  const styles = css`
    background-color: ${cssColor.backgroundDark};
    color: ${cssColor.foreground};
    border-bottom: 2px solid ${cssColor.border};
    padding: ${cssSpace.md} 0;
    transition: padding ${cssAnimationSpeed.fast} ease-in-out,
      font-size ${cssAnimationSpeed.fast} ease-in-out;

    ${cssBreakpoint.medium} {
      position: sticky;
      top: 0;
      z-index: 1;
    }

    &:not(.scrolled) {
      padding: ${cssSpace.xl} 0;
      font-size: 1.2em;
    }
  `;

  const containerStyles = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: ${cssSpace.lg};

    ${cssBreakpoint.medium} {
      flex-direction: row;
    }
  `;

  const navStyles = css`
    display: flex;
    gap: ${cssSpace.md};

    a {
      color: ${cssColor.link};
      margin-left: ${cssSpace.md};
      border-bottom: 1px solid transparent;
      transform: translate(0px, 0px);
    }

    a.parent {
      border-bottom: 1px solid ${cssColor.border};
    }

    a:hover {
      border-bottom: 1px solid ${cssColor.link};
      transition: transform ${cssAnimationSpeed.slow} ease;
      transform: translate(0px, -3px);
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
      <Container className={containerStyles}>
        <AMatiasQuezada />

        <Eyes />

        <nav className={navStyles}>
          <Link page={`${root}/blog`} isParent>
            Blog
          </Link>
          <Link page={`${root}/projects`} isParent>
            <Lang en="Projects" es="Proyectos" />
          </Link>
          <Link page={`${root}/career`} isParent>
            CV
          </Link>
          <LangSelector />
        </nav>
      </Container>
    </ScrollWisle>
  );
}

function LangSelector() {
  const { Link, path } = usePageUtils();
  const lang = useLang();

  return (
    <>
      {lang !== 'en' ? <Link href={`/${path}`}>🇬🇧</Link> : null}
      {lang !== 'es' ? <Link href={`/es/${path}`}>🇪🇸</Link> : null}
      {/* {lang !== 'cat' ? <Link href={`/cat/${path}`}>CAT</Link> : null} */}
    </>
  );
}

function Eyes() {
  return null;
}
