import { parse } from 'std/encoding/yaml.ts';
import { dirname } from 'std/path/mod.ts';
import { getMarkdownReferences } from '../util/getMarkdownReferences.ts';

const templatesDir = '../../components/templates';

export async function readMarkdown(file: string) {
  const fileContent = await Deno.readTextFile(file);

  const references = getMarkdownReferences(fileContent);
  const [head, ...parts] = fileContent
    .split(/---/g)
    .filter(Boolean)
    .map((x) => x.trim());

  const body = parts.map((x) => `${x}\n\n${references}`);

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
    content: body,
  };
}
