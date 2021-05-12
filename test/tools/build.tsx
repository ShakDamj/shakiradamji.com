import { join } from 'https://deno.land/std/path/mod.ts';
import { createElement } from 'https://esm.sh/react';
import { renderToString } from 'https://esm.sh/react-dom/server';

import { readConfig, relative } from './util.ts';

const config = await readConfig();

const OUTPUT = relative(config.output);
const PAGES = relative(config.pages);

await writePages();

async function writePages() {
  await resetOutputDir(OUTPUT);

  const encoder = new TextEncoder();

  for await (const [name, html] of renderPages()) {
    const path = join(OUTPUT, `${name}.html`);
    const content = encoder.encode(html);

    console.log(`Writing ${content.byteLength} bytes to ${name}`);
    Deno.writeFile(path, content, { create: true });
  }
}

async function* renderPages() {
  for await (const { name, isFile } of Deno.readDir(PAGES)) {
    if (!isFile) {
      continue;
    }

    const page = await import(join(PAGES, name));
    const component = page.default || Object.values(page)[0];
    const html = renderToString(createElement(component));
    const clean = html.replace(/ data-reactroot=""/, '');

    yield [name.replace(/\.tsx$/, ''), html] as const;
  }
}

async function resetOutputDir(path: string) {
  // try {
  //   await Deno.remove(path, { recursive: true });
  // } catch (err) {}
  // await Deno.mkdir(path);
}
