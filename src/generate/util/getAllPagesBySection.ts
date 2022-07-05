import { getPageMetadata } from './getPageMetadata.ts';
import { getPagesFromDisk } from './getPagesFromDisk.ts';
import { groupPagesBySection } from './groupPagesBySection.ts';

export async function getAllPagesBySection() {
  return groupPagesBySection(await getAllPages());
}

async function getAllPages() {
  const pages = await getPagesFromDisk();
  const promises = pages.map(getPageMetadata);
  return Promise.all(promises);
}
