import { getPageMetadata } from './getPageMetadata.ts';
import { getPagesFromDisk } from './getPagesFromDisk.ts';

export async function getAllPages() {
  const pages = await getPagesFromDisk();
  const promises = pages.map(getPageMetadata);
  return Promise.all(promises);
}
