import { pagesDir } from '../paths.ts';
import { SitePage } from '../types/SitePage.ts';
import { getFilesRecursively } from './getFilesRecursively.ts';

export async function getPagesFromDisk() {
  return (await getFilesRecursively(pagesDir))
    .filter((x) => !x.endsWith('/_template.tsx'))
    .map(SitePage.from);
}
