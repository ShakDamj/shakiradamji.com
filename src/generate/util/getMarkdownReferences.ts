const uniq = <T>(arr: T[]) => Array.from(new Set(arr));

const MD_REFERENCE = /^\[\d+\]: .*$/gm;

export function getMarkdownReferences(markdown: string) {
  const matches = markdown.matchAll(MD_REFERENCE);
  const references = Array.from(matches).map((x) => x[0]);
  return uniq(references).join('\n');
}
