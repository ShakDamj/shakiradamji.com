import { parse } from 'std/encoding/yaml.ts';
import { Path } from '../types/Path.ts';
import { getMarkdownReferences } from '../util/getMarkdownReferences.ts';

const templatesDir = new Path('../../components/templates/', import.meta.url);

export async function readMarkdown(file: Path) {
  const fileContent = await Deno.readTextFile(`${file}`);

  const references = getMarkdownReferences(fileContent);
  const [head, ...parts] = fileContent
    .split(/^---$/gm)
    .filter(Boolean)
    .map((x) => x.trim());

  const data = parse(head) as Record<string, unknown>;
  const body = parts.map((x) => `${x}\n\n${references}`);

  const template = await getTemplatePath(data, file);
  const base = await import(`${template}`);
  const meta = base?.meta || (() => undefined);

  return {
    data: {
      ...meta(data, file),
      ...data,
    },

    template,
    content: body,
  };
}

async function getTemplatePath(data: Record<string, unknown>, file: Path) {
  if (typeof data.template === 'string') {
    return templatesDir.resolve(data.template);
  }

  const folderTemplate = file.sibling('_template.tsx');
  const stat = await Deno.stat(`${folderTemplate}`).catch(() => null);

  if (stat?.isFile) {
    return folderTemplate;
  }

  return templatesDir.resolve('default.tsx');
}
