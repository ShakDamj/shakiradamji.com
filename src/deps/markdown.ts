import { Marked } from 'markdown';
import { highlightText } from 'speed_highlight_js';

const cacheHightlight = new Map<string, string>();
const promises = [] as Array<Promise<string>>;

function highlight(code: string, lang?: string) {
  if (cacheHightlight.has(code)) {
    return cacheHightlight.get(code)!;
  }

  const processing = highlightText(
    code,
    // FIXME: Support TSX highlighting
    lang === 'tsx' ? 'ts' : lang || 'js'
  ) as unknown as Promise<string>;

  promises.push(processing);

  processing.then((x) => cacheHightlight.set(code, x));

  return 'LOADING...';
}

const options = {
  langPrefix: 'code-block shj-lang-',
  highlight,
};

// class AMQRenderer extends Renderer {}

Marked.setOptions({
  ...options,
  // FIXME: this fails
  // renderer: new AMQRenderer(options),
});

export function isMarkedReady() {
  return Promise.all(promises).then(() => null);
}

export function parseMarkdown(markdown: string) {
  return Marked.parse(markdown);
}
