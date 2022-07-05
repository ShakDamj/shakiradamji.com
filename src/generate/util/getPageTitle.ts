import { basename, extname } from 'std/path/mod.ts';
import { SitePage } from '../types/SitePage.ts';

export function getPageTitle(page: SitePage) {
  const extension = extname(page);
  const filename = removeDate(basename(page));

  const result = filename
    .replace(extension, '')
    .replace(/-(\w)/, (x) => x[1].toUpperCase());

  return firstUppercase(result) || page;
}

function firstUppercase(text: string) {
  return text[0].toUpperCase() + text.slice(1);
}

function removeDate(text: string) {
  return text.replace(/^\d{4}-(\d{2}-){0,2}/, '');
}
