import React from 'react';
import { css } from '../../deps/emotion.ts';
import { parseMarkdown } from '../../deps/markdown.ts';
import { cssColor, cssSpace } from '../../theme.ts';
import { SitePage } from '../types/SitePage.ts';
import { getMarkdownExtract } from '../util/getMarkdownExtract.ts';
import { highlightTheme } from '../util/highlightTheme.ts';
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
  const { Link } = usePageUtils();
  const lang = useLang();

  const localeMd = tr(children, lang);
  const toProcess = readMore ? getMarkdownExtract(localeMd) : localeMd;
  const processed = applyBlockRules(toProcess);
  const { content } = parseMarkdown(processed);
  const contentWithFixes = clearMarkdownResult(content);

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
      margin: ${cssSpace.lg} 0;
      text-align: justify;
    }

    blockquote {
      border-left: 5px solid ${cssColor.border};
      margin-left: 0;
      padding-left: 1em;
    }

    code:not(.code-block) {
      background-color: ${cssColor.backgroundStrong};
      padding: ${cssSpace.xs};
      border-radius: ${cssSpace.xs};
    }

    pre {
      --code-block-margin: 3em;
      --code-block-padding: 1em;
      --code-inline-padding: min(3em, var(--container-side-gap));

      margin: var(--code-block-margin) 0;
      padding: var(--code-block-padding) 0;
      position: relative;
      white-space: pre;

      .code-block {
        display: block;
        width: var(--available-width);
        white-space: pre;
        text-shadow: none;
        font-size: 18px;
        line-height: 24px;
        box-sizing: border-box;
        max-width: var(--available-width);
        overflow-x: auto;
        color: #abb2bf;
      }

      &::before {
        content: '';
        inset: calc(var(--code-block-padding) * -1)
          calc(var(--code-inline-padding) * -1);
        background: #161b22;
        border-radius: 10px;
        box-shadow: 0 0 5px #0001;
        position: absolute;
        z-index: -1;
        max-width: 100vw;
      }
    }
  `;

  const highlightStyles = content.includes(`shj`) ? css(highlightTheme()) : '';

  return (
    <article className={`md ${styles} ${highlightStyles} ${className}`}>
      <RawHtml html={contentWithFixes} />

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
