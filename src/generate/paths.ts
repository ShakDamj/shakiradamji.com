import { pathAbsoluteFrom } from './util/pathAbsoluteFrom.ts';

const root = pathAbsoluteFrom('../..', import.meta.url);

export const assetsDir = root('./assets');
export const pagesDir = root('./src/pages');
export const targetDir = root('./dist');
