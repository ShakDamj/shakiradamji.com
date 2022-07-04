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

  for (const file of sources) {
    const dist = getPageDestinationOnDisk(file, path);

    // console.log(`Generating ${relative(file)} -> ${relative(dist)}`);

    let html: string;

    if (isTsx(file)) {
      html = await renderTsx(file, props);
    } else if (isMarkdown(file)) {
      html = await renderMd(file, props);
    } else {
      throw new Error(`Unkown handler for ${relative(file)}`);
    }

    await Deno.mkdir(dirname(dist), { recursive: true });
    await Deno.writeTextFile(dist, html);
  }
}

export interface PageProps {
  lang: Language;
  path: string;
}
