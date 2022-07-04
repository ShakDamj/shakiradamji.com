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
  const path = getPagePath(urlToSitePage(page));

  function Link({
    className,
    href,
    children,
  }: {
    className?: string;
    href: string;
    children: Translatable | JSX.Element;
  }) {
    const target = getPagePath(urlToSitePage(href));

    const isActive = target === path;
    const isContained = !isActive && path.startsWith(target);
    const classes = [
      className,
      isActive ? 'active' : null,
      isContained ? 'parent' : null,
    ]
      .filter(Boolean)
      .join(' ');

    console.log({ page, href, path, target, result: relative(path, target) });

    return (
      <a href={relative(path, target)} className={classes}>
        <Lang tr={children} />
      </a>
    );
  }

  function getBasePath() {
    return `/${root}`;
  }

  return { Link, getBasePath };
}

export type PageUtils = ReturnType<typeof createPageUtils>;
