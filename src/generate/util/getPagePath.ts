import { basename, extname } from 'std/path/mod.ts';
import { getPagesRoot } from '../pages.ts';
import { SitePage } from '../types/SitePage.ts';
import { cleanPath } from './cleanPath.ts';
import { removeDate } from './removeDate.ts';

export function getPagePath(page: SitePage, path = '') {
  const extension = extname(page);
  const filename = basename(page);
  const isIndex = filename.replace(extension, '') === 'index';

  const flat = removeDate(page)
    .replace(getPagesRoot(), path)
    .replace(extension, '');

  const final = isIndex ? flat.replace(/\/index$/, '') : flat;
  return cleanPath(final) || '/';
}
