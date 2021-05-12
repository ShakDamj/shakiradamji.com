import { join } from 'https://deno.land/std/path/mod.ts';
import { createElement, FunctionComponent } from 'https://esm.sh/react';
import { renderToString } from 'https://esm.sh/react-dom/server';

import { readConfig, relative } from './util.ts';

const config = await readConfig();

const OUTPUT = relative(config.output);
const PAGES = relative(config.pages);

export async function renderAllPages() {
  const promises = [];

  for await (const file of getPages()) {
    promises.push(renderFile(file));
  }

  return Promise.all(promises);
}

export async function* getPages() {
  for await (const { name, isFile } of Deno.readDir(PAGES)) {
    if (isFile) {
      yield join(PAGES, name);
    }
  }
}

export async function renderFile(file: string) {
  const dest = file.replace(PAGES, OUTPUT).replace(/\.tsx$/, '.html');
  const html = await loadAndRender(file);
  await writeFile(dest, html);
}

function writeFile(uri: string, content: string) {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(content);

  console.log(`Writing ${buffer.byteLength} bytes to ${uri.split('/').pop()}`);
  return Deno.writeFile(uri, buffer, { create: true });
}

async function loadAndRender(uri: string) {
  const component = await loadComponent(uri);
  return renderComponent(component);
}

async function loadComponent(uri: string) {
  const page = await import(uri);
  const component = page.default || Object.values(page)[0];
  return component as FunctionComponent;
}

function renderComponent(component: FunctionComponent) {
  const html = renderToString(createElement(component));
  return html.replace(/ data-reactroot=""/, '');
}

if (import.meta.main) {
  await renderAllPages();
}
