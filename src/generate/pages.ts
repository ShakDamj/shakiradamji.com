import { basename, extname } from 'std/path/mod.ts';
import { YearMonthDay } from '../atoms/Time.tsx';
import { path } from '../util/path.ts';
import { getFilesRecursively } from './getFilesRecursively.ts';
import { isMarkdown, readMarkdown } from './render-md.tsx';

export type SitePage = 'snowflake SitePage';

const { fromRoot } = path('../..', import.meta.url);
const source = fromRoot('./src/pages');
const target = fromRoot('./dist');

export function getPagesRoot() {
  return source;
}

export async function getPagesFromDisk() {
  const files = await getFilesRecursively(source);
  return files.filter(x => !x.endsWith('/_template.tsx')) as SitePage[];
}

export function getPageDestinationOnDisk(page: SitePage, path = '') {
  const extension = extname(page);
  const filename = basename(page);
  const isIndex = filename.replace(extension, '') === 'index';
  const newExtension = isIndex ? '.html' : '/index.html';
  return page.replace(source, `${target}${path}`).replace(extension, newExtension);
}

export function getPagePath(page: SitePage, path = '') {
  const extension = extname(page);
  const filename = basename(page);
  const isIndex = filename.replace(extension, '') === 'index';
  const flat = page.replace(source, path).replace(extension, '');
  const final = isIndex ? flat.replace(/\/index$/, '') : flat;
  return final || '/';
}

export function getPagesBySection(pages: PageMetadata[]) {
  const sections: Record<string, PageMetadata[]> = {};

  for (const page of pages) {
    const [, section] = page.path.split('/');
    if (!sections[section]) sections[section] = [page];
    else sections[section].push(page);
  }

  return sections;
}

export interface PageMetadata {
  type: 'md' | 'tsx';
  file: SitePage;
  path: string;
  title: string;
  date: YearMonthDay | null;
}

export async function getPageMetadata(page: SitePage): Promise<PageMetadata> {
  const base: Omit<PageMetadata, 'type'> = {
    file: page,
    path: getPagePath(page),
    title: getPageTitle(page),
    date: getDateFrom(basename(page)),
  };

  if (isMarkdown(page)) {
    const { data, ...rest } = await readMarkdown(page);

    return {
      type: 'md',
      ...base,
      ...data,
      ...rest,
    };
  }

  return { type: 'tsx', ...base };
}

function getPageTitle(page: SitePage) {
  const extension = extname(page);
  const filename = removeDate(basename(page));
  const result = filename.replace(extension, '').replace(/-(\w)/, x => x[1].toUpperCase());
  return firstUppercase(result) || page;
}

function firstUppercase(text: string) {
  return text[0].toUpperCase() + text.slice(1);
}

function getDateFrom(text: string) {
  const match = text.match(/^\d{4}(-\d{2}){0,2}/);
  return match && (match[0] as YearMonthDay);
}

function removeDate(text: string) {
  return text.replace(/^\d{4}-(\d{2}-){0,2}/, '');
}

export async function getAllPages() {
  const pages = await getPagesFromDisk();
  const promises = pages.map(getPageMetadata);
  return Promise.all(promises);
}
