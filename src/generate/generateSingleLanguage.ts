import { Language } from './components/Lang.tsx';
import { rootDir } from './config.ts';
import { isMarkdown } from './processor/isMarkdown.ts';
import { isTsx } from './processor/isTsx.ts';
import { renderMd } from './processor/renderMd.ts';
import { renderTsx } from './processor/renderTsx.tsx';
import { PagePerf } from './reportStats.ts';
import { PageProps } from './types/PageProps.ts';
import { Path } from './types/Path.ts';
import { SitePage } from './types/SitePage.ts';

export async function generateSingleLanguage(
  sources: SitePage[],
  lang: Language,
  root = '/'
) {
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

  return perf;
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
