import React from 'react';
import { Container } from '../atoms/Container.tsx';
import { css } from '../../deps/emotion.ts';
import { usePageUtils, getPagesRoot } from '../../generate/mod.ts';
import {
  cssAnimationSpeed,
  cssBreakpoint,
  cssColor,
  cssSpace,
} from '../../theme.ts';
import { ScrollWisle } from '../atoms/ScrollWisle.tsx';
import { AMatiasQuezada } from '../molecules/AMatiasQuezada.tsx';
import { ColorSchemeToggle } from '../molecules/ColorSchemeToggle.tsx';
import { LangSelector } from '../molecules/LangSelector.tsx';

export const root = getPagesRoot();

export interface AmqHeaderProps {
  className?: string;
}

export function AmqHeader({
  className = '',
}: React.PropsWithChildren<AmqHeaderProps>) {
  const { Link } = usePageUtils();

  const styles = css`
    background-color: ${cssColor.backgroundStrong};
    color: ${cssColor.foreground};
    border-bottom: 2px solid ${cssColor.border};
    padding: ${cssSpace.xl} 0;
    font-size: 1.2em;

    ${cssBreakpoint.medium} {
      position: sticky;
      top: 0;
      z-index: 1;

      transition: padding ${cssAnimationSpeed.fast} ease-in-out,
        font-size ${cssAnimationSpeed.fast} ease-in-out;

      &.scrolled {
        padding: ${cssSpace.md} 0;
        font-size: inherit;
      }
    }
  `;

  const containerStyles = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: column wrap;
    gap: ${cssSpace.lg};

    ${cssBreakpoint.narrow} {
      flex-direction: row;
    }
  `;

  const navStyles = css`
    display: flex;
    align-items: center;
    white-space: nowrap;
  `;

  const pageLinkStyles = css`
    color: ${cssColor.link};
    margin-right: ${cssSpace.lg};
    border-bottom: 1px solid transparent;
    transform: translate(0px, 0px);

    &.parent {
      border-bottom: 1px solid ${cssColor.border};
    }

    &:hover {
      border-bottom: 1px solid ${cssColor.link};
      transition: transform ${cssAnimationSpeed.slow} ease;
      transform: translate(0px, -3px);
    }
  `;

  const emojiButtonStyles = css`
    font-size: 1.5rem;
    ${cssBreakpoint.medium} {
      font-size: 2rem;
    }
  `;

  const colorSchemeStyles = css`
    ${emojiButtonStyles};
    margin-top: -5px;
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
          <Link className={pageLinkStyles} page={`${root}/blog`} isParent>
            Blog
          </Link>
          <Link className={pageLinkStyles} page={`${root}/career`} isParent>
            CV
          </Link>
          <LangSelector className={emojiButtonStyles} />
          <ColorSchemeToggle className={colorSchemeStyles} />
        </nav>
      </Container>
    </ScrollWisle>
  );
}

function Eyes() {
  return null;
}
