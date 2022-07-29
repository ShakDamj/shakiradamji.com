import { whenMarkedReady } from '../deps/markdown.ts';
import { Language } from './components/Lang.tsx';
import { rootDir } from './paths.ts';
import { isMarkdown } from './processor/isMarkdown.ts';
import { isTsx } from './processor/isTsx.ts';
import { renderMd } from './processor/renderMd.ts';
import { renderTsx } from './processor/renderTsx.tsx';
import { PageProps } from './types/PageProps.ts';
import { Path } from './types/Path.ts';
import { SitePage } from './types/SitePage.ts';
import { getPagesFromDisk } from './util/getPagesFromDisk.ts';
// import { emptyDirectory } from './emptyDirectory.ts';

const [sources] = await Promise.all([
  getPagesFromDisk(),
  // emptyDirectory(target),
]);

// HACK: We need to wait for async markdown parsing to finish
await Promise.all([
  generate(sources, 'en', '/en'),
  generate(sources, 'es', '/es'),
]);
await whenMarkedReady();
// end HACK

await Promise.all([
  generate(sources, 'en', '/en'),
  generate(sources, 'es', '/es'),
  generate(sources, 'en'),
]);

console.log('Done');

// EXECUTION END

async function generate(sources: SitePage[], lang: Language, root = '/') {
  const path = new Path(root);
  const props = { lang, path } as PageProps;
  const perf: PagePerf[] = [];

  for (const file of sources) {
    const dest = file.getDestinationOnDisk(path);

    // console.log(
    //   `Processing ${file.relativeTo(rootDir)} => ${dest.relativeTo(rootDir)}`
    // );

    const start = performance.now();
    const html = await processInputFile(file, props);
    const generated = performance.now();

    await generateDirectoryStructure(dest);
    await writeResultToDisk(dest, html);

    const end = performance.now();

    perf.push({ start, generated, end, size: html.length });
  }

  report(sources, perf);
}

function processInputFile(file: SitePage, props: PageProps) {
  if (isTsx(file)) {
    return renderTsx(file, props);
  }

  if (isMarkdown(file)) {
    return renderMd(file, props);
  }

  throw new Error(`Unkown handler for ${file.relativeTo(rootDir)}`);
}

function generateDirectoryStructure(dest: Path) {
  return Deno.mkdir(`${dest.parent}`, { recursive: true });
}

function writeResultToDisk(dest: Path, html: string) {
  return Deno.writeTextFile(`${dest}`, html);
}

function report(sources: SitePage[], perf: PagePerf[]) {
  const sum = (iterator: (x: PagePerf) => number) =>
    perf.reduce((acc: number, curr: PagePerf) => acc + iterator(curr), 0);

  const print = (x: number, unit = 'ms') =>
    `${x}${unit} (${Math.round(x / sources.length)}${unit}/page)`;

  const total = sum((x) => x.end - x.start);
  const size = sum((x) => x.size);
  const kb = print(Math.round(size / 1000), 'Kb');

  console.log(`Processed ${sources.length} pages of ${kb} in ${print(total)}`);
}

interface PagePerf {
  start: number;
  generated: number;
  end: number;
  size: number;
}
