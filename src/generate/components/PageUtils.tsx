import React, { createContext, PropsWithChildren, useContext } from 'react';
import { SitePage } from '../types/SitePage.ts';
import { Language } from './Lang.tsx';
import { Path } from '../types/Path.ts';
import { SitePath } from '../types/SitePath.ts';
import { createPageLinkComponent } from './Link.tsx';
import { relative } from 'std/path/mod.ts';

// deno-lint-ignore no-explicit-any
const Context = createContext<PageUtils>(null as any);

export function usePageUtils() {
  return useContext(Context);
}

export type PageUtils = ReturnType<typeof createPageUtils>;

export interface UtilsProviderProps extends PropsWithChildren<{}> {
  page: SitePage;
  root: Path;
  lang: Language;
}

export function UtilsProvider({
  page,
  root,
  lang,
  children,
}: UtilsProviderProps) {
  const utils = createPageUtils(page, root, lang);

  return <Context.Provider value={utils}>{children}</Context.Provider>;
}

function createPageUtils(page: SitePage, root: Path, lang: Language) {
  const pagePath = page.getPublishedPath();
  const siteRoot = root.join(pagePath) as SitePath;

  const asset = (path: string) => relative(`${siteRoot}`, path);

  return {
    Link: createPageLinkComponent(siteRoot, root),
    asset,
    root,
    path: pagePath,
    lang,
  };
}
