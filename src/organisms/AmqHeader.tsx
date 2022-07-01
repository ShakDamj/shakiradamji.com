import React from 'react';
import { Container } from '../atoms/Container.tsx';
import { usePageUtils } from '../generate/PageUtils.tsx';
import { css } from '../deps/emotion.ts';
import { getPagesRoot } from '../generate/pages.ts';
import { cssColor, cssFontSize, cssSpace } from '../theme.ts';
import { Lang } from '../atoms/Lang.tsx';

const root = getPagesRoot();

export interface AmqHeaderProps {
  className?: string;
}

export function AmqHeader({ className = '' }: React.PropsWithChildren<AmqHeaderProps>) {
  const { Link } = usePageUtils();

  const styles = css`
    padding: ${cssSpace.md} 0;
    margin-bottom: ${cssSpace.lg};
    background-color: ${cssColor.primary};
    color: ${cssColor.background};
  `;

  const containerStyles = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const navStyles = css`
    display: flex;
    gap: ${cssSpace.md};

    a {
      color: ${cssColor.background};
      text-decoration: none;
      padding: calc(${cssSpace.sm} / 2) ${cssSpace.sm};
      border-radius: 6px;
      border: 1px solid transparent;
    }

    a.parent {
      border: 1px solid ${cssColor.background};
    }

    a:hover {
      border: 1px solid ${cssColor.link};
    }
  `;

  const nameStyles = css`
    font-size: ${cssFontSize.xl};
  `;

  return (
    <header className={`${styles} ${className}`}>
      <Container className={containerStyles}>
        <h2 className={nameStyles}>A. Matías Quezada</h2>

        <nav className={navStyles}>
          <Link href={`${root}/blog`}>Blog</Link>
          <Link href={`${root}/career`}>
            <Lang en="Career" es="Experiencia" />
          </Link>
          <Link href={`${root}/projects`}>
            <Lang en="Projects" es="Proyectos" />
          </Link>
        </nav>
      </Container>
    </header>
  );
}
