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
  cssFontSize,
  cssSpace,
} from '../../theme.ts';

const root = getPagesRoot();

export interface AmqHeaderProps {
  className?: string;
}

export function AmqHeader({
  className = '',
}: React.PropsWithChildren<AmqHeaderProps>) {
  const { Link } = usePageUtils();

  const styles = css`
    padding: ${cssSpace.lg} 0;
    margin-bottom: ${cssSpace.lg};
    background-color: ${cssColor.backgroundDark};
    color: ${cssColor.foreground};
    border-bottom: 2px solid ${cssColor.border};

    ${cssBreakpoint.medium} {
      position: sticky;
      top: 0;
      z-index: 1;
    }
  `;

  const containerStyles = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    ${cssBreakpoint.medium} {
      flex-direction: row;
    }
  `;

  const navStyles = css`
    display: flex;
    gap: ${cssSpace.md};

    a {
      color: ${cssColor.link};
      text-decoration: none;
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
    <header className={`${styles} ${className}`}>
      <Container className={containerStyles}>
        <AMatiasQuezada />

        <Eyes />

        <nav className={navStyles}>
          <Link page={`${root}/blog`} isParent>
            Blog
          </Link>
          <Link page={`${root}/career`} isParent>
            <Lang en="Career" es="Experiencia" />
          </Link>
          <Link page={`${root}/projects`} isParent>
            <Lang en="Projects" es="Proyectos" />
          </Link>
          <LangSelector />
        </nav>
      </Container>
    </header>
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

function AMatiasQuezada() {
  const { Link } = usePageUtils();

  const nameStyles = css`
    font-size: ${cssFontSize.md};
    text-decoration: none;
    color: ${cssColor.primaryContrast};
    display: flex;
    align-items: baseline;
    letter-spacing: 1px;

    abbr {
      display: inline-block;
      width: 0.8em;
      margin-right: 0.35em;
      overflow: hidden;
      transition: width ${cssAnimationSpeed.medium} ease;
    }

    &:hover abbr {
      width: 3.75em;
    }
  `;

  return (
    <h2>
      <Link className={nameStyles} page={root}>
        <abbr>Adrian</abbr> Matías Quezada
      </Link>
    </h2>
  );
}

function Eyes() {
  return null;
}
