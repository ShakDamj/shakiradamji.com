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
  getPagesFromDisk(),
  // emptyDirectory(target),
]);

// HACK: We need to wait for async markdown parsing to finish
await Promise.all([
  generate(sources, 'en', '/en'),
  generate(sources, 'es', '/es'),
]);
await isMarkedReady();
// end HACK

await Promise.all([
  generate(sources, 'en', '/en'),
  generate(sources, 'es', '/es'),
  generate(sources, 'en'),
]);

console.log('Done');

// EXECUTION END

async function generate(sources: SitePage[], lang: Language, path = '') {
  const props = { lang, path } as PageProps;
  const perf: PagePerf[] = [];

  for (const file of sources) {
    // console.log(`Processing ${relative(file)} => ${relative(dest)}`);

    const start = performance.now();
    const html = await processInputFile(file, props);
    const dest = getPageDestinationOnDisk(file, path);
    const generated = performance.now();

    await generateDirectoryStructure(dest);
    await writeResultToDisk(dest, html);

    const end = performance.now();

    perf.push({ start, generated, end, size: html.length });
  }

  report(sources, perf);
}

function processInputFile(file: string, props: PageProps) {
  if (isTsx(file)) {
    return renderTsx(file, props);
  }

  if (isMarkdown(file)) {
    return renderMd(file, props);
  }

  throw new Error(`Unkown handler for ${relative(file)}`);
}

function generateDirectoryStructure(dest: string) {
  return Deno.mkdir(dirname(dest), { recursive: true });
}

function writeResultToDisk(dest: string, html: string) {
  return Deno.writeTextFile(dest, html);
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
