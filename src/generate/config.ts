import { Path } from './types/Path.ts';
import { SitePage } from './types/SitePage.ts';

export const rootDir = new Path('../..', import.meta.url);

export const assetsDir = rootDir.resolve('./assets/');
export const pagesDir = SitePage.from(rootDir.resolve('./src/pages/'));
export const targetDir = rootDir.resolve('./dist/');
