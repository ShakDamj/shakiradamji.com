import React, { FunctionComponent } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { flushCss } from '../deps/emotion.ts';
import { UtilsProvider } from '../components/PageUtils.tsx';
import { flushScripts } from '../components/Script.tsx';
import { PageProps } from '../types/PageProps.ts';
import { Path } from '../types/Path.ts';
import { SitePage } from '../types/SitePage.ts';

// HACK: this is necessary for emotion to work
// deno-lint-ignore no-explicit-any
(globalThis as any).document = undefined;

export async function renderTsx<P extends PageProps>(
  source: SitePage,
  props: P
): Promise<string>;
export async function renderTsx<P extends PageProps>(
  source: Path,
  props: P,
  pageOverride: SitePage
): Promise<string>;
export async function renderTsx<P extends PageProps>(
  source: Path | SitePage,
  { lang, path, ...props }: P,
  pageOverride?: SitePage
) {
  const mod = await import(`${source}`);
  const Page = validateModule(source, mod);

  const html = renderToStaticMarkup(
    <UtilsProvider
      page={(pageOverride || source) as SitePage}
      root={path}
      lang={lang}
    >
      <Page {...props} />
    </UtilsProvider>
  );

  return processHtmlPage(html);
}

// deno-lint-ignore no-explicit-any
function validateModule<T extends { default: FunctionComponent<any> }>(
  file: Path,
  module: T
) {
  const Page = module.default;

  if (!Page) {
    throw new Error(`Page ${file} doesn't have default export!`);
  }

  if (typeof Page !== 'function') {
    throw new Error(`Page ${file} doesn't export a function component`);
  }

  return Page;
}

function processHtmlPage(content: string) {
  const html = content.replace(/<script><\/script>/g, '');

  // Extract CSS classes created by emotion and inject them in the HTML
  const css = flushCss();
  const scripts = flushScripts();

  const source = scripts
    .join('\n')
    // because this string will be a string.replace() argument
    // $ can be used to replace
    //
    //     'a'.replace('a', '$$') === '$'
    //
    // and we have to inject for because this "$$" escaped
    .replace(/\$/g, '$$$$');

  const htmlWithAssets = html
    .replace('STYLES_PLACEHOLDER', css.join('\n'))
    .replace('SCRIPTS_PLACEHOLDER', `<script>${source}</script>`);

  return `<!DOCTYPE html>${htmlWithAssets}`;
}
