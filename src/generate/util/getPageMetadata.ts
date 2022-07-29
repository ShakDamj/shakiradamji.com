import { isMarkdown } from '../processor/isMarkdown.ts';
import { readMarkdown } from '../processor/readMarkdown.ts';
import { PageMetadata } from '../types/PageMetadata.ts';
import { SitePage } from '../types/SitePage.ts';
import { YearMonthDay } from '../types/YearMonthDay.ts';
import { getPageTitle } from './getPageTitle.ts';

export async function getPageMetadata(page: SitePage): Promise<PageMetadata> {
  const base: Omit<PageMetadata, 'type'> = {
    id: `${page}`,
    file: page,
    path: page.getPublishedPath(),
    title: getPageTitle(page),
    date: getDateFrom(page.basename),
  };

  if (isMarkdown(page)) {
    const { data, ...rest } = await readMarkdown(page);

    return {
      type: 'md',
      ...base,
      ...data,
      ...rest,
    };
  }

  return { type: 'tsx', ...base };
}

function getDateFrom(text: string) {
  const match = text.match(/^\d{4}(-\d{2}){0,2}/);
  return match && (match[0] as YearMonthDay);
}
