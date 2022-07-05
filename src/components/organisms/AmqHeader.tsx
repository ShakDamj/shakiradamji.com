import React from 'react';
import { Container } from '../atoms/Container.tsx';
import { css } from '../../deps/emotion.ts';
import {
  usePageUtils,
  useLang,
  Lang,
  getPagesRoot,
} from '../../generate/mod.ts';
import { cssBreakpoint, cssColor, cssFontSize, cssSpace } from '../../theme.ts';

const root = getPagesRoot();

export interface AmqHeaderProps {
  className?: string;
}

export function AmqHeader({
  className = '',
}: React.PropsWithChildren<AmqHeaderProps>) {
  const { Link, path } = usePageUtils();
  const lang = useLang();

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
    }

    a.parent {
      border-bottom: 1px solid ${cssColor.border};
    }

    a:hover {
      border-bottom: 1px solid ${cssColor.link};
    }
  `;

  const nameStyles = css`
    font-size: ${cssFontSize.md};
    text-decoration: none;
    color: ${cssColor.foreground};
  `;

  return (
    <header className={`${styles} ${className}`}>
      <Container className={containerStyles}>
        <h2>
          <Link className={nameStyles} page={root}>
            A. Matías Quezada
          </Link>
        </h2>

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

          {lang !== 'en' ? <Link href={`/${path}`}>🇬🇧</Link> : null}
          {lang !== 'es' ? <Link href={`/es/${path}`}>🇪🇸</Link> : null}
          {/* {lang !== 'cat' ? <Link href={`/cat/${path}`}>CAT</Link> : null} */}
        </nav>
      </Container>
    </header>
  );
}
