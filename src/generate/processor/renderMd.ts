import { PageProps } from '../types/PageProps.ts';
import { SitePage } from '../types/SitePage.ts';
import { readMarkdown } from './readMarkdown.ts';
import { renderTsx } from './renderTsx.tsx';

export async function renderMd<P extends PageProps>(file: SitePage, props: P) {
  const { data, template, content } = await readMarkdown(file);
  return renderTsx(template, { ...props, ...data, content }, file);
}
