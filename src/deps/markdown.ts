import { highlightText } from 'https://deno.land/x/speed_highlight_js@1.1.7/src/index.js';
import { Marked } from 'markdown';

const cacheHightlight = new Map<string, string>();
const promises = [] as Array<Promise<string>>;

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

    promises.push(processing);

    processing.then((x) => cacheHightlight.set(code, x));

    return 'LOADING...';
  },
});

const blockRules = [
  {
    regex: /^<details>\n((?:\n|.)*)\n<\/details>/m,
    handler: ([, content]: string[]) =>
      content && `<details open>${Marked.parse(content).content}</details>`,
  },
];

export function isMarkedReady() {
  return Promise.all(promises).then(() => null);
}

export function parseMarkdown(markdown: string) {
  let modified = markdown;

  for (const { regex, handler } of blockRules) {
    const match = modified.match(regex);

    if (match) {
      modified = modified.replace(match[0], handler(match));
    }
  }

  const { content } = Marked.parse(modified);

  const contentWithFixes = content.replace(/<\/?pre>/g, '');

  return `<div class="md">${contentWithFixes}</div>`;
}
