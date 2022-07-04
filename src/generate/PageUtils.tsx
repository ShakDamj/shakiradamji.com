import React, { createContext, useContext } from 'react';
import { relative } from 'std/path/mod.ts';
import { getPagePath, SitePage } from '../generate/pages.ts';
import { Lang, Translatable } from '../atoms/Lang.tsx';

// deno-lint-ignore no-explicit-any
const Context = createContext<PageUtils>(null as any);

export function usePageUtils() {
  return useContext(Context);
}

export interface PageUtilProps {
  url: SitePage;
}

export const UtilsProvider = Context.Provider;

const urlToSitePage = (url: string) => url.replace('file://', '') as SitePage;

export function createPageUtils(page: string, root: string) {
  const pagePath = getPagePath(urlToSitePage(page));
  const basePath = `${root.startsWith('/') ? '' : '/'}${root}`;
  const path = `${basePath}/${pagePath}`;

  function Link({
    className,
    href,
    page,
    isParent,
    children,
  }: {
    className?: string;
    href?: string;
    page?: string;
    isParent?: boolean;
    children: Translatable | JSX.Element;
  }) {
    const target = href || getPagePath(urlToSitePage(page!));

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
      <a href={relative(path, target)} className={classes}>
        <Lang tr={children} />
      </a>
    );
  }

  return { Link, basePath, path: pagePath };
}

export type PageUtils = ReturnType<typeof createPageUtils>;
