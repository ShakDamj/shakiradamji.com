import { basename, extname } from 'std/path/mod.ts';
import { SitePage } from './types/SitePage.ts';
import { path } from './util/path.ts';

const { fromRoot } = path('../..', import.meta.url);
const source = fromRoot('./src/pages');
const target = fromRoot('./dist');

export function getPagesRoot() {
  return source;
}

export function getPageDestinationOnDisk(page: SitePage, path = '') {
  const extension = extname(page);
  const filename = basename(page);
  const isIndex = filename.replace(extension, '') === 'index';
  const newExtension = isIndex ? '.html' : '/index.html';

  return page
    .replace(getPagesRoot(), `${target}${path}`)
    .replace(extension, newExtension);
}
