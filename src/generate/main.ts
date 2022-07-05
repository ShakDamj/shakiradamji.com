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
await generate(sources, 'en');
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
  const perf = [];

  for (const file of sources) {
    const start = performance.now();
    const dist = getPageDestinationOnDisk(file, path);

    let html: string;

    if (isTsx(file)) {
      html = await renderTsx(file, props);
    } else if (isMarkdown(file)) {
      html = await renderMd(file, props);
    } else {
      throw new Error(`Unkown handler for ${relative(file)}`);
    }

    const generated = performance.now();

    await Deno.mkdir(dirname(dist), { recursive: true });
    await Deno.writeTextFile(dist, html);

    const end = performance.now();

    perf.push({ start, generated, end });
  }

  report(sources, perf);
}

function report(sources: SitePage[], perf: PagePerf[]) {
  const sum =
    (from: keyof PagePerf, to: keyof PagePerf) =>
    (acc: number, curr: PagePerf) =>
      acc + curr[to] - curr[from];

  const print = (x: number) =>
    `${x}ms (${Math.round(x / sources.length)}ms avg)`;

  const total = perf.reduce(sum('start', 'end'), 0);
  const generated = perf.reduce(sum('start', 'generated'), 0);
  const write = perf.reduce(sum('generated', 'end'), 0);

  console.log(
    `Processed ${sources.length} pages in ${print(
      total
    )} | Generation in ${print(generated)} | Disk write in ${print(write)}`
  );
}

interface PagePerf {
  start: number;
  generated: number;
  end: number;
}
