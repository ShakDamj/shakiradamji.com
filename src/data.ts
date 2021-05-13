import fs from 'fs';
import { load as parseYaml } from 'js-yaml';
import { join } from 'path';
import remark from 'remark';
import html from 'remark-html';
import { promisify } from 'util';

import { TranslatableString } from '../components/Translatable';

const DATA_DIR = join(process.cwd(), 'data');
const markdown = remark().use(html);

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

export async function loadAllMds<T>(name: string) {
  const path = join(DATA_DIR, name);
  const files = await readdir(path);
  const promises = files.map(x => loadMd<T>(join(name, x)));
  return Promise.all(promises);
}

export async function loadMd<T>(name: string): Promise<T & { content: TranslatableString }> {
  const path = join(DATA_DIR, /\.md$/.test(name) ? name : `${name}.md`);
  const content = await readFile(path, 'utf8');
  const [, metadata, enRaw, esRaw] = content.split('---').map(x => x.trim());

  const meta = parseYaml(metadata, {}) as T;

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
