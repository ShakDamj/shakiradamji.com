import { PageMetadata } from '../mod.ts';
import { getPageMetadata } from './getPageMetadata.ts';
import { getPagesFromDisk } from './getPagesFromDisk.ts';

let cache: Promise<PageMetadata[]> | null = null;

export function getAllPages() {
  if (!cache) {
    cache = getAllPagesInternal();
  }

  return cache.then((x) => [...x]);
}

async function getAllPagesInternal() {
  const pages = await getPagesFromDisk();
  const promises = pages.map(getPageMetadata);
  return Promise.all(promises);
}
