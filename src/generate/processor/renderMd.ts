import { PageProps } from '../types/PageProps.ts';
import { readMarkdown } from './readMarkdown.ts';
import { renderTsx } from './renderTsx.tsx';

export async function renderMd<P extends PageProps>(file: string, props: P) {
  const { data, template, content } = await readMarkdown(file);
  return renderTsx(template, { ...props, ...data, content }, file);
}
