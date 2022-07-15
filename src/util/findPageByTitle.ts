import { getAllPages, PageMetadata } from '../generate/mod.ts';

const normalise = (str: string) => str.toLocaleLowerCase();

export async function findPageByTitle<T extends PageMetadata>(target: string) {
  const search = normalise(target);
  const pages = await getAllPages();

  return pages.find(({ title }) => {
    if (typeof title === 'string') return normalise(title) === search;

    if (Array.isArray(title)) {
      return title.some((x) => normalise(x) === search);
    }

    return (
      title.en.toLocaleLowerCase() === search ||
      title.es.toLocaleLowerCase() === search
    );
  }) as T;
}
