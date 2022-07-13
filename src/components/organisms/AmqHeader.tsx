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
import { ScrollWisle } from '../atoms/ScrollWisle.tsx';

const root = getPagesRoot();

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
    padding: ${cssSpace.lg} 0;

    ${cssBreakpoint.medium} {
      position: sticky;
      top: 0;
      z-index: 1;
    }

    &.scrolled {
      padding: 0;
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

function AMatiasQuezada() {
  const { Link } = usePageUtils();

  const styles = css`
    display: flex;
    gap: ${cssSpace.md};
    align-items: center;
  `;

  const nameStyles = css`
    font-size: ${cssFontSize.md};
    color: white;
    display: flex;
    align-items: baseline;
    gap: ${cssSpace.md};
    letter-spacing: 1px;

    abbr {
      display: inline-block;
      width: 0.8em;
      overflow: hidden;
      transition: width ${cssAnimationSpeed.medium} ease;
    }

    &:hover abbr {
      width: 3.3em;
    }
  `;

  return (
    <h2 className={styles}>
      {/* <BracketsIcon title="Coder" /> */}
      <Link className={`${nameStyles} inactive`} page={root}>
        <>
          {'{ '}
          <abbr>Adrian</abbr> Matías Quezada{' }'}
        </>
      </Link>
    </h2>
  );
}

function Eyes() {
  return null;
}
