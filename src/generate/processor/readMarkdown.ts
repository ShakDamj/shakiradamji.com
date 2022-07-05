import { parse } from 'std/encoding/yaml.ts';
import { dirname } from 'std/path/mod.ts';
import { parseMarkdown } from '../../deps/markdown.ts';

const templatesDir = '../../templates';

export async function readMarkdown(file: string) {
  const fileContent = await Deno.readTextFile(file);

  const [head, ...body] = fileContent
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

  const content = body.map(parseMarkdown);
  const extract = body.map(getExtract).map(parseMarkdown);

  return {
    data: {
      ...meta(data, file),
      ...data,
    },

    template: templateRelative,
    content,
    extract,

    get rest() {
      return content.map((x, i) => x.replace(extract[i], ''));
    },
  };
}

const CROP_IF_LONGER_THAN = 150;
const CROP_AFTER = 150;
const EXTRACT_TOKEN = '<!-- end extract -->';

function getExtract(value: null | undefined): null;
function getExtract(value: string): string;
function getExtract(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  if (value.includes(EXTRACT_TOKEN)) {
    const extract = value.split(EXTRACT_TOKEN)[0];
    return `${extract}\n\n${getReferences(value)}`;
  }

  if (value.length < CROP_IF_LONGER_THAN) {
    return value;
  }

  const cropAt = value.indexOf('\n', CROP_AFTER);
  const chunk = value.slice(0, cropAt).trim();
  return `${chunk}\n\n${getReferences(value)}`;
}

function getReferences(markdown: string) {
  const matches = markdown.matchAll(/^\[\d+\]: .*$/gm);
  const references = Array.from(matches).map((x) => x[0]);
  return references.join('\n');
}
