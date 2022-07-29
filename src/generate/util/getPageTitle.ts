import { SitePage } from '../types/SitePage.ts';

export function getPageTitle(page: SitePage) {
  const { extension } = page;
  const filename = page.removeDate().basename;

  const result = filename
    .replace(extension, '')
    .replace(/-(\w)/, (x) => x[1].toUpperCase());

  return firstUppercase(result) || `${page}`;
}

function firstUppercase(text: string) {
  return text[0].toUpperCase() + text.slice(1);
}
