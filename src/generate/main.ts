import { dirname } from 'std/path/mod.ts';
import { Language } from '../atoms/Lang.tsx';
import { path } from '../util/path.ts';
import {
  getPageDestinationOnDisk,
  getPagesFromDisk,
  SitePage,
} from './pages.ts';
import { isMarkdown, isMarkedReady, renderMd } from './render-md.tsx';
import { isTsx, renderTsx } from './render-tsx.tsx';
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

export interface PageProps {
  lang: Language;
  path: string;
}

interface PagePerf {
  start: number;
  generated: number;
  end: number;
}
