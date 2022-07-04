import { Marked } from 'markdown';
import { dirname, extname } from 'std/path/mod.ts';
import { parse } from 'std/encoding/yaml.ts';
import { renderTsx } from './render-tsx.tsx';
import type { PageProps } from './main.ts';

import { highlightText } from 'https://deno.land/x/speed_highlight_js@1.1.7/src/index.js';

const cacheHightlight = new Map<string, string>();

Marked.setOptions({
  langPrefix: 'code-block shj-lang-',

  highlight(code, lang) {
    if (cacheHightlight.has(code)) {
      return cacheHightlight.get(code)!;
    }

    const processing = highlightText(
      code,
      lang || 'js'
    ) as unknown as Promise<string>;
    processing.then((x) => cacheHightlight.set(code, x));

    return 'LOADING...';
  },
});

const templatesDir = '../templates';

export function isMarkdown(file: string) {
  const extension = extname(file);
  return extension === '.md';
}

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

export async function renderMd<P extends PageProps>(file: string, props: P) {
  const { data, template, content } = await readMarkdown(file);
  return renderTsx(template, { ...props, ...data, content }, file);
}

function parseMarkdown(md: string) {
  const { content } = Marked.parse(md);

  const contentWithFixes = content.replace(/<\/?pre>/g, '');

  return `<div class="md">${contentWithFixes}</div>`;
}

const CROP_IF_LONGER_THAN = 150;
const CROP_AFTER = 150;
const EXTRACT_TOKEN = '<!-- extract -->';

function getExtract(value: null | undefined): null;
function getExtract(value: string): string;
function getExtract(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  if (value.includes(EXTRACT_TOKEN)) {
    const extract = value.split(EXTRACT_TOKEN)[0];
    return extract;
  }

  if (value.length < CROP_IF_LONGER_THAN) {
    return value;
  }

  const cropAt = value.indexOf('\n', CROP_AFTER);
  return value.slice(0, cropAt).trim();
}
