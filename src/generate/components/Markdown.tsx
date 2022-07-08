import React from 'react';
import { css } from '../../deps/emotion.ts';
import { parseMarkdown } from '../../deps/markdown.ts';
import { cssFontFamily, cssSpace } from '../../theme.ts';
import { getMarkdownReferences } from '../util/getMarkdownReferences.ts';
import { highlightTheme } from '../util/highlightTheme.ts';
import { Lang, tr, Translatable, useLang } from './Lang.tsx';
import { usePageUtils } from './PageUtils.tsx';
import { RawHtml } from './RawHtml.tsx';

const EXTRACT_TOKEN = '<!-- end extract -->';
const CROP_IF_LONGER_THAN = 150;
const CROP_AFTER = 150;

const blockRules = [
  {
    regex: /^<details>\n((?:\n|.)*)\n<\/details>/m,
    handler: ([, content]: string[]) =>
      content && `<details open>${parseMarkdown(content).content}</details>`,
  },
];

export interface MarkdownProps {
  className?: string;
  readMore?: string;
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

    .code-block {
      display: block;
      font-family: ${cssFontFamily.code};
      width: var(--available-width);
      padding-bottom: 10px;
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
  return content
    .replace(/<p>\[\d+\]: (.|\n)*<\/p>/g, '')
    .replace(/<\/?pre>/g, '');
}

function getMarkdownExtract(value: null | undefined): null;
function getMarkdownExtract(value: string): string;
function getMarkdownExtract(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  if (value.includes(EXTRACT_TOKEN)) {
    const extract = value.split(EXTRACT_TOKEN)[0];
    return `${extract}\n\n${getMarkdownReferences(value)}`;
  }

  if (value.length < CROP_IF_LONGER_THAN) {
    return value;
  }

  const cropAt = value.indexOf('\n', CROP_AFTER);
  const chunk = value.slice(0, cropAt).trim();
  return `${chunk}\n\n${getMarkdownReferences(value)}`;
}
