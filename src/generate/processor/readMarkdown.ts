import { parse } from 'std/encoding/yaml.ts';
import { dirname } from 'std/path/mod.ts';
import { getMarkdownReferences } from '../util/getMarkdownReferences.ts';

const templatesDir = '../../components/templates';

export async function readMarkdown(file: string) {
  const fileContent = await Deno.readTextFile(file);

  const references = getMarkdownReferences(fileContent);
  const [head, ...parts] = fileContent
    .split(/^---$/gm)
    .filter(Boolean)
    .map((x) => x.trim());

  const data = parse(head) as Record<string, unknown>;
  const body = parts.map((x) => `${x}\n\n${references}`);

  const template = await getTemplatePath(data, file);
  const templateRelative = new URL(template, import.meta.url).pathname;

  const base = await import(templateRelative);
  const meta = base?.meta || (() => undefined);

  return {
    data: {
      ...meta(data, file),
      ...data,
    },

    template: templateRelative,
    content: body,
  };
}

async function getTemplatePath(data: Record<string, unknown>, file: string) {
  if (data.template) {
    return `${templatesDir}/${data.template}`;
  }

  const folderTemplate = `${dirname(file)}/_template.tsx`;
  const stat = await Deno.stat(folderTemplate).catch(() => null);

  if (stat?.isFile) {
    return folderTemplate;
  }

  return `${templatesDir}/default.tsx`;
}
