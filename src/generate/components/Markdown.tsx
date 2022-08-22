import React from 'react';
import { css } from '../deps/emotion.ts';
import { parseMarkdown } from '../deps/markdown.ts';
import { SitePage } from '../types/SitePage.ts';
import { getMarkdownExtract } from '../util/getMarkdownExtract.ts';
import { highlightTheme } from '../util/highlightTheme.ts';
import { getImgRoot } from './Img.tsx';
import { Lang, tr, Translatable, useLang } from './Lang.tsx';
import { usePageUtils } from './PageUtils.tsx';
import { RawHtml } from './RawHtml.tsx';

const blockRules = [
  {
    regex: /^<details>\n((?:\n|.)*)\n<\/details>/m,
    handler: ([, content]: string[]) =>
      content && `<details open>${parseMarkdown(content).content}</details>`,
  },
];

export interface MarkdownProps {
  className?: string;
  readMore?: SitePage;
  children: Translatable;
}

export function Markdown({
  className = '',
  readMore,
  children,
}: MarkdownProps) {
  const { Link, asset } = usePageUtils();
  const lang = useLang();

  const localeMd = tr(children, lang);
  const toProcess = readMore ? getMarkdownExtract(localeMd) : localeMd;
  const processed = applyBlockRules(toProcess);
  const { content } = parseMarkdown(processed);
  const contentWithFixes = clearMarkdownResult(content);
  const contentWithAssets = contentWithFixes.replace(
    /<img src="([^"]+)"/,
    (_, path) => `<img src="${asset(`${getImgRoot()}/${path}`)}"`
  );

  const styles = css`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';

    li {
      list-style: initial;
    }
    ul,
    ol {
      margin: 20px 0;
      padding: reset;
    }

    p {
      margin: 32px 0;
      text-align: justify;
    }

    blockquote {
      border-left: 5px solid var(--color-border);
      margin-left: 0;
      padding-left: 1em;
    }
  `;

  const highlightStyles = content.includes(`shj`) ? css(highlightTheme()) : '';

  return (
    <article className={`md ${styles} ${highlightStyles} ${className}`}>
      <RawHtml html={contentWithAssets} />

      {readMore ? (
        <Link page={readMore}>
          <Lang en="Read more" es="Leer más" />
        </Link>
      ) : null}
    </article>
  );
}

function applyBlockRules(markdown: string) {
  let modified = markdown;

  for (const { regex, handler } of blockRules) {
    const match = modified.match(regex);

    if (match) {
      modified = modified.replace(match[0], handler(match));
    }
  }

  return modified;
}

function clearMarkdownResult(content: string) {
  return content.replace(/<p>\[\d+\]: (.|\n)*<\/p>/g, '');
  // .replace(/<\/?pre>/g, '');
}
