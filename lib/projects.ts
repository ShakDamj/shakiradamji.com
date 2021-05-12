import fs from 'fs';
import { load } from 'js-yaml';
import { join } from 'path';
import remark from 'remark';
import html from 'remark-html';

import { ProjectSummaryProps } from '../components/ProjectSummary';

const PROJECTS_DIR = join(process.cwd(), 'data');
const markdown = remark().use(html);

type UnPromisify<T> = T extends Promise<infer U> ? U : T;

export type Project = UnPromisify<ReturnType<typeof loadProject>>;

export async function loadProject(name: string) {
  const path = join(PROJECTS_DIR, `${name}.md`);
  const content = fs.readFileSync(path, 'utf8');
  const [, metadata, enRaw, esRaw] = content.split('---').map(x => x.trim());

  const meta = load(metadata, {}) as ProjectSummaryProps;

  if (!esRaw) {
    return { ...meta, content: await markdownToHtml(enRaw) };
  }

  const [en, es] = await Promise.all([markdownToHtml(enRaw), markdownToHtml(esRaw)]);

  return { ...meta, content: { en, es } };
}

async function markdownToHtml(text: string) {
  const result = await markdown.process(text);
  return result.toString().trim();
}
