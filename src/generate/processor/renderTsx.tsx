import React, { FunctionComponent } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { flushCss } from '../../deps/emotion.ts';
import { UtilsProvider } from '../components/PageUtils.tsx';
import { flushScripts } from '../components/Script.tsx';
import { PageProps } from '../types/PageProps.ts';

// HACK: this is necessary for emotion to work
// deno-lint-ignore no-explicit-any
(globalThis as any).document = undefined;

export async function renderTsx<P extends PageProps>(
  file: string,
  { lang, path, ...props }: P,
  filePath?: string
) {
  const mod = await import(file);
  const Page = validateModule(file, mod);

  const html = renderToStaticMarkup(
    <UtilsProvider page={filePath || file} root={path} lang={lang}>
      <Page {...props} />
    </UtilsProvider>
  ).replace(/<script><\/script>/g, '');

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

// deno-lint-ignore no-explicit-any
function validateModule<T extends { default: FunctionComponent<any> }>(
  file: string,
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
