import { pagesDir } from '../paths.ts';
import { SitePage } from '../types/SitePage.ts';
import { getFilesRecursively } from './getFilesRecursively.ts';

export async function getPagesFromDisk() {
  const files = await getFilesRecursively(pagesDir);
  return files.filter((x) => !x.endsWith('/_template.tsx')) as SitePage[];
}
