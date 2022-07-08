import { dirname } from 'std/path/mod.ts';
import { isMarkedReady } from '../deps/markdown.ts';
import { Language } from './components/Lang.tsx';
import { getPageDestinationOnDisk } from './pages.ts';
import { isMarkdown } from './processor/isMarkdown.ts';
import { isTsx } from './processor/isTsx.ts';
import { renderMd } from './processor/renderMd.ts';
import { renderTsx } from './processor/renderTsx.tsx';
import { PageProps } from './types/PageProps.ts';
import { SitePage } from './types/SitePage.ts';
import { getPagesFromDisk } from './util/getPagesFromDisk.ts';
import { path } from './util/path.ts';
// import { emptyDirectory } from './emptyDirectory.ts';

const { relative } = path('../..', import.meta.url);

const [sources] = await Promise.all([
  // multiline
  getPagesFromDisk(),
  // emptyDirectory(target),
]);

// HACK: We need to wait for async markdown parsing to finish
await Promise.all([
  // multiline
  generate(sources, 'en'),
  generate(sources, 'es'),
]);
await isMarkedReady();
// end HACK

await Promise.all([
  // multiline
  generate(sources, 'en', '/en'),
  generate(sources, 'es', '/es'),
  generate(sources, 'en'),
]);

console.log('Done');

// EXECUTION END

async function generate(sources: SitePage[], lang: Language, path = '') {
  const props: PageProps = { lang, path };
  const perf: PagePerf[] = [];

  for (const file of sources) {
    const start = performance.now();
    const dest = getPageDestinationOnDisk(file, path);

    // console.log(`Processing ${relative(file)} => ${relative(dest)}`);

    let html: string;

    if (isTsx(file)) {
      html = await renderTsx(file, props);
    } else if (isMarkdown(file)) {
      html = await renderMd(file, props);
    } else {
      throw new Error(`Unkown handler for ${relative(file)}`);
    }

    const generated = performance.now();

    await Deno.mkdir(dirname(dest), { recursive: true });
    await Deno.writeTextFile(dest, html);

    const end = performance.now();

    perf.push({ start, generated, end, size: html.length });
  }

  report(sources, perf);
}

function report(sources: SitePage[], perf: PagePerf[]) {
  const sum = (iterator: (x: PagePerf) => number) =>
    perf.reduce((acc: number, curr: PagePerf) => acc + iterator(curr), 0);

  const print = (x: number, unit = 'ms') =>
    `${x}${unit} (${Math.round(x / sources.length)}${unit}/page)`;

  const total = sum((x) => x.end - x.start);
  // const generated = sum((x) => x.generated - x.start);
  // const write = sum((x) => x.end - x.generated);
  const size = sum((x) => x.size);
  const kb = print(Math.round(size / 1000), 'Kb');

  console.log(
    `Processed ${sources.length} pages of ${kb} in ${print(total)}`
    // | G ${print(generated)} | W ${print(write)}`
  );
}

interface PagePerf {
  start: number;
  generated: number;
  end: number;
  size: number;
}
