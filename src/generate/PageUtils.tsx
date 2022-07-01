import React, { createContext, useContext } from 'react';
import { relative } from 'std/path/mod.ts';
import { getPagePath, SitePage } from '../generate/pages.ts';
import { tr, Translatable } from '../atoms/Lang.tsx';

const Context = createContext<PageUtils>(null as any);

export function usePageUtils() {
  return useContext(Context);
}

export interface PageUtilProps {
  url: SitePage;
}

export const UtilsProvider = Context.Provider;

const urlToSitePage = (url: string) => url.replace('file://', '') as SitePage;

export function createPageUtils(page: string) {
  const path = getPagePath(urlToSitePage(page));

  function Link({ href, children }: { href: string; children: Translatable | JSX.Element }) {
    const target = getPagePath(urlToSitePage(href));

    const isActive = target === path;
    const isContained = !isActive && path.startsWith(target);
    const classes = [isActive ? 'active' : null, isContained ? 'parent' : null].filter(Boolean).join(' ');

    return (
      <a href={relative(path, target)} className={classes}>
        {isJsxElement(children) ? children : tr(children)}
      </a>
    );
  }

  return { Link };
}

export type PageUtils = ReturnType<typeof createPageUtils>;

function isJsxElement(target: any): target is JSX.Element {
  return React.isValidElement(target);
}
