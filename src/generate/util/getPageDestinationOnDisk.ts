import { basename, extname } from 'std/path/mod.ts';
import { pagesDir, targetDir } from '../paths.ts';
import { SitePage } from '../types/SitePage.ts';
import { removeDate } from '../util/removeDate.ts';

export function getPageDestinationOnDisk(page: SitePage, path = '') {
  const extension = extname(page);
  const filename = basename(page);
  const isIndex = filename.replace(extension, '') === 'index';
  const newExtension = isIndex ? '.html' : '/index.html';

  return removeDate(page)
    .replace(pagesDir, `${targetDir}${path}`)
    .replace(extension, newExtension);
}
