import { Language } from './components/Lang.tsx';
import { whenMarkedReady } from './deps/markdown.ts';
import { generateSingleLanguage } from './generateSingleLanguage.ts';
import { reportStats } from './reportStats.ts';
import { SitePage } from './types/SitePage.ts';
import { getPagesFromDisk } from './util/getPagesFromDisk.ts';

export async function generate(langs: Record<string, Language>) {
  const sources = await getPagesFromDisk();

  // HACK: We need to wait for async markdown parsing to finish
  // We need to render each language once
  // then wait for the async syntax highlighting to finish
  // then render again for good
  //
  const eachLanguageOnce = uniqueValues(langs);
  await generateInternal(sources, eachLanguageOnce, { log: false });
  await whenMarkedReady();
  // end HACK

  // Once the HACK is removed we can embed generateInternal's body here
  await generateInternal(sources, langs, { log: true });
}

function generateInternal(
  pages: SitePage[],
  langs: Record<string, Language>,
  { log }: { log: boolean }
) {
  const promises = Object.entries(langs).map(async ([root, lang]) => {
    const perf = await generateSingleLanguage(pages, lang, root);

    if (log) {
      reportStats(pages, perf);
    }
  });

  return Promise.all(promises);
}

function uniqueValues<T extends string>(target: Record<string, T>) {
  return reverseObject(reverseObject(target));
}

function reverseObject<U extends string, V extends string>(
  target: Record<U, V>
): Record<V, U> {
  return Object.fromEntries(
    Object.entries(target).map(([key, value]) => [value, key])
  );
}
