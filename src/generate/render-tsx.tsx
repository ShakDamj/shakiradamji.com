import { extname } from 'std/path/mod.ts';
import React, { FunctionComponent } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LangProvider } from '../atoms/Lang.tsx';
import { cache, flush } from '../deps/emotion.ts';
import { createPageUtils, UtilsProvider } from './PageUtils.tsx';
import type { PageProps } from './main.ts';

// HACK: this is necessary for emotion to work
// deno-lint-ignore no-explicit-any
(globalThis as any).document = undefined;

export function isTsx(file: string) {
  const extension = extname(file);
  return extension === '.ts' || extension === '.tsx';
}

export async function renderTsx<P extends PageProps>(
  file: string,
  { lang, path, ...props }: P,
  filePath?: string
) {
  const mod = await import(file);
  const Page = validateModule(file, mod);
  const utils = createPageUtils(filePath || file, path);

  const html = renderToStaticMarkup(
    <UtilsProvider value={utils}>
      <LangProvider value={lang}>
        <Page {...props} />
      </LangProvider>
    </UtilsProvider>
  ).replace(/<script><\/script>/g, '');

  const css = Object.values(cache.inserted);
  const htmlWithStyles = html.replace('STYLES_PLACEHOLDER', css.join('\n'));

  flush();

  return `<!DOCTYPE html>${htmlWithStyles}`;
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
