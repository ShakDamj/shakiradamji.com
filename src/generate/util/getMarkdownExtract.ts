import { getMarkdownReferences } from './getMarkdownReferences.ts';

const EXTRACT_TOKEN = '<!-- end extract -->';
const CROP_IF_LONGER_THAN = 150;
const CROP_AFTER = 150;

export function getMarkdownExtract(value: null | undefined): null;
export function getMarkdownExtract(value: string): string;
export function getMarkdownExtract(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  if (value.includes(EXTRACT_TOKEN)) {
    const extract = value.split(EXTRACT_TOKEN)[0];
    return `${extract}\n\n${getMarkdownReferences(value)}`;
  }

  if (value.length < CROP_IF_LONGER_THAN) {
    return value;
  }

  const cropAt = value.indexOf('\n', CROP_AFTER);
  const chunk = value.slice(0, cropAt).trim();
  return `${chunk}\n\n${getMarkdownReferences(value)}`;
}
