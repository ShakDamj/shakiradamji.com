import { Language, tr, Translatable } from '../atoms/Lang.tsx';

const EXTRACT_TOKEN = '<!-- extract -->';

export function getExtract(
  content: Translatable | string[] | null | undefined,
  lang: Language
) {
  if (!content) {
    return null;
  }

  const value = tr(content, lang);

  if (!value) {
    return null;
  }

  if (value.includes(EXTRACT_TOKEN)) {
    const extract = value.split(EXTRACT_TOKEN)[0];
    return extract;
  }

  if (value.length < 150) {
    return value;
  }

  const cropAt = value.indexOf('\n', 150);
  return value.slice(0, cropAt).trim();
}
