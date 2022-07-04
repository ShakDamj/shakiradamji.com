const CROP_IF_LONGER_THAN = 150;
const CROP_AFTER = 150;
const EXTRACT_TOKEN = '<!-- extract -->';

export function getExtract(value: null | undefined): null;
export function getExtract(value: string): string;
export function getExtract(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  if (value.includes(EXTRACT_TOKEN)) {
    const extract = value.split(EXTRACT_TOKEN)[0];
    return extract;
  }

  if (value.length < CROP_IF_LONGER_THAN) {
    return value;
  }

  const cropAt = value.indexOf('\n', CROP_AFTER);
  return value.slice(0, cropAt).trim();
}
