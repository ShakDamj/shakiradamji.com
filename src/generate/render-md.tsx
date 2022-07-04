import { Marked } from 'markdown';
import { dirname, extname } from 'std/path/mod.ts';
import { parse } from 'std/encoding/yaml.ts';
import { renderTsx } from './render-tsx.tsx';
import type { PageProps } from './main.ts';

const templatesDir = '../templates';

export function isMarkdown(file: string) {
  const extension = extname(file);
  return extension === '.md';
}

export async function readMarkdown(file: string) {
  const content = await Deno.readTextFile(file);

  const [head, ...body] = content
    .split(/---/g)
    .filter(Boolean)
    .map((x) => x.trim());

  const data = parse(head) as Record<string, unknown>;

  let template = `${templatesDir}/default.tsx`;

  if (data.template) {
    template = `${templatesDir}/${data.template}`;
  } else {
    const folderTemplate = `${dirname(file)}/_template.tsx`;

    try {
      const stat = await Deno.stat(folderTemplate);

      if (stat.isFile) {
        template = folderTemplate;
      }

      // deno-lint-ignore no-empty
    } catch {}
  }

  const templateRelative = new URL(template, import.meta.url).pathname;

  const base = await import(templateRelative);
  const meta = base?.meta || (() => ({}));

  return {
    data: {
      ...meta(data, file),
      ...data,
    },
    template: templateRelative,
    content: body.map(
      (x) => `<div class="md">${Marked.parse(x).content}</div>`
    ),
  };
}

export async function renderMd<P extends PageProps>(file: string, props: P) {
  const { data, template, content } = await readMarkdown(file);
  return renderTsx(template, { ...props, ...data, content }, file);
}
