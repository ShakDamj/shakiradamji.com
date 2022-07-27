import { Marked } from 'markdown';
import { highlightText } from 'speed_highlight_js';

const cacheHightlight = new Map<string, string>();
const promises = [] as Array<Promise<string>>;

function highlight(code: string, lang?: string) {
  const clean = code.trim();

  if (cacheHightlight.has(clean)) {
    return cacheHightlight.get(clean)!;
  }

  const processing = highlightText(
    clean,
    // FIXME: Support TSX highlighting
    lang === 'tsx' ? 'ts' : lang || 'js',
    false
  ) as unknown as Promise<string>;

  promises.push(processing);

  processing.then((x) => cacheHightlight.set(clean, x));

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

export function whenMarkedReady() {
  return Promise.all(promises).then(() => null);
}

export function parseMarkdown(markdown: string) {
  return Marked.parse(markdown);
}
