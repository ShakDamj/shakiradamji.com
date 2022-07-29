import React, { ReactElement, ReactPortal } from 'react';
import { relative } from 'std/path/mod.ts';
import { SitePage } from '../types/SitePage.ts';
import { Lang, Translatable } from './Lang.tsx';
import { Path } from '../types/Path.ts';
import { SitePath } from '../types/SitePath.ts';

export function createPageLinkComponent(path: SitePath, root: Path) {
  return function Link({
    className,
    href,
    page,
    isParent,
    children,
  }: {
    className?: string;
    href?: string;
    page?: SitePage;
    isParent?: boolean;
    children: Translatable | ReactElement | string | ReactPortal;
  }) {
    const target = href ? cleanPath(href) : page!.getPublishedPath(root);

    const isActive = target === path;
    const isContained = isParent && !isActive && path.startsWith(target);

    const classes = [
      className,
      isActive ? 'active' : null,
      isContained ? 'parent' : null,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <a href={relative(`${path}`, `${target}`) || '.'} className={classes}>
        <Lang tr={children} />
      </a>
    );
  };
}

function cleanPath(path: string) {
  return path.replace(/\/\/+/g, '/');
}
