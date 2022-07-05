import { getPagesRoot } from '../pages.ts';
import { SitePage } from '../types/SitePage.ts';
import { getFilesRecursively } from './getFilesRecursively.ts';

export async function getPagesFromDisk() {
  const files = await getFilesRecursively(getPagesRoot());
  return files.filter((x) => !x.endsWith('/_template.tsx')) as SitePage[];
}
