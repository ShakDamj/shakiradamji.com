import React from 'react';
import { Container } from '../atoms/Container.tsx';
import { usePageUtils } from '../generate/PageUtils.tsx';
import { css } from '../deps/emotion.ts';
import { getPagesRoot } from '../generate/pages.ts';
import { cssBreakpoint, cssColor, cssFontSize, cssSpace } from '../theme.ts';
import { Lang, useLang } from '../atoms/Lang.tsx';

const root = getPagesRoot();

export interface AmqHeaderProps {
  className?: string;
}

export function AmqHeader({
  className = '',
}: React.PropsWithChildren<AmqHeaderProps>) {
  const { Link, getBasePath } = usePageUtils();
  const lang = useLang();

  const styles = css`
    padding: ${cssSpace.lg} 0;
    margin-bottom: ${cssSpace.lg};
    background-color: ${cssColor.backgroundDark};
    color: ${cssColor.foreground};
    border-bottom: 2px solid ${cssColor.border};
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

  console.log({ root });

  return (
    <header className={`${styles} ${className}`}>
      <Container className={containerStyles}>
        <h2>
          <Link className={nameStyles} href={root}>
            A. Matías Quezada
          </Link>
        </h2>

        <nav className={navStyles}>
          <Link href={`${root}/blog`}>Blog</Link>
          <Link href={`${root}/career`}>
            <Lang en="Career" es="Experiencia" />
          </Link>
          <Link href={`${root}/projects`}>
            <Lang en="Projects" es="Proyectos" />
          </Link>

          {lang !== 'en' ? <Link href={`${getBasePath()}`}>🇬🇧</Link> : null}
          {lang !== 'es' ? <Link href={`${getBasePath()}/es`}>🇪🇸</Link> : null}
        </nav>
      </Container>
    </header>
  );
}
